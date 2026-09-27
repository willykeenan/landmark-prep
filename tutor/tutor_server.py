#!/usr/bin/env python3
"""Landmark Prep — local AI tutor service.

Runs on your own computer and answers study questions with the Claude Code CLI
(`claude -p`), using whatever Claude login that CLI has (e.g. a Claude
subscription). Each user gets their own records in a local SQLite database:

  users     who may use the tutor and on what terms (access: granted | paid | none)
  messages  the full conversation, so a student continues with the same tutor
  brain     a short "brainfile" the tutor keeps about each student (goals,
            strengths, weak spots, preferences) and rewrites as it learns
  progress  the latest study-progress snapshot sent by the study app

Safety: the model runs with NO tools (`--tools ""`), no MCP servers, and no
user/project settings or hooks, in an empty temporary directory. It can only
return text. Callers must present the shared bearer token, and the caller
(e.g. a password-protected web page) is responsible for identifying the user.

Python 3.9+ standard library only.
"""
from __future__ import annotations

import argparse
import getpass
import hmac
import json
import os
import re
import shutil
import sqlite3
import subprocess
import sys
import tempfile
import threading
import time
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

HERE = Path(__file__).resolve().parent

# ---------------------------------------------------------------- config

def load_env(path: Path) -> dict:
    """Read KEY=VALUE lines. Refuses files other users can read."""
    env = {}
    if not path.exists():
        return env
    mode = path.stat().st_mode & 0o077
    if mode:
        raise SystemExit(f"refusing {path}: it is readable by other users (chmod 600 it)")
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        env[k.strip()] = v.strip().strip('"').strip("'")
    return env


def find_claude(configured: str) -> str:
    """The claude CLI moves between installs (Homebrew, the native installer's ~/.local/bin),
    and launchd's PATH does not include ~/.local/bin, so check the usual places."""
    candidates = [os.path.expanduser(configured)] if configured else []
    candidates += [shutil.which("claude") or "", os.path.expanduser("~/.local/bin/claude"),
                   "/opt/homebrew/bin/claude", "/usr/local/bin/claude"]
    for c in candidates:
        if c and os.path.isfile(c) and os.access(c, os.X_OK):
            return c
    return configured or "claude"


class Config:
    def __init__(self, env_file: Path | None):
        e = dict(os.environ)
        if env_file:
            e.update(load_env(env_file))
        self.token = e.get("TUTOR_TOKEN", "")
        self.host = e.get("TUTOR_HOST", "127.0.0.1")
        self.port = int(e.get("TUTOR_PORT", "3281"))
        self.data_dir = Path(os.path.expanduser(e.get("TUTOR_DATA_DIR", str(HERE / "data"))))
        self.model = e.get("TUTOR_MODEL", "claude-sonnet-5")
        self.brain_model = e.get("TUTOR_BRAIN_MODEL", self.model)
        self.claude_bin = find_claude(e.get("CLAUDE_BIN", ""))
        self.knowledge_file = Path(os.path.expanduser(e.get("TUTOR_KNOWLEDGE", str(HERE / "knowledge.md"))))
        self.timeout = int(e.get("TUTOR_TIMEOUT", "110"))
        self.per_hour = int(e.get("TUTOR_LIMIT_PER_HOUR", "60"))
        self.per_day = int(e.get("TUTOR_LIMIT_PER_DAY", "400"))
        self.brain_every = int(e.get("TUTOR_BRAIN_EVERY", "4"))  # rewrite brain every N student messages
        # Test hook: a fake model command that reads the prompt on stdin (never set in production).
        self.fake_model = e.get("TUTOR_FAKE_MODEL", "")


# ---------------------------------------------------------------- storage

SCHEMA = """
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  display_name TEXT NOT NULL,
  access TEXT NOT NULL DEFAULT 'none' CHECK (access IN ('granted','paid','none')),
  paid_until TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL REFERENCES users(id),
  role TEXT NOT NULL CHECK (role IN ('user','assistant')),
  content TEXT NOT NULL,
  unit INTEGER,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS messages_user ON messages(user_id, id);
CREATE TABLE IF NOT EXISTS brain (
  user_id TEXT PRIMARY KEY REFERENCES users(id),
  content TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS progress (
  user_id TEXT PRIMARY KEY REFERENCES users(id),
  snapshot TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS usage (
  user_id TEXT NOT NULL,
  at REAL NOT NULL
);
CREATE INDEX IF NOT EXISTS usage_user ON usage(user_id, at);
"""

USER_ID = re.compile(r"^[a-z0-9][a-z0-9_.-]{0,39}$")


def now_iso() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


class Store:
    def __init__(self, data_dir: Path):
        data_dir.mkdir(parents=True, exist_ok=True)
        (data_dir / "brains").mkdir(exist_ok=True)
        os.chmod(data_dir, 0o700)
        self.dir = data_dir
        self.path = data_dir / "tutor.db"
        self.lock = threading.Lock()
        with self.conn() as c:
            c.executescript(SCHEMA)

    def conn(self):
        c = sqlite3.connect(self.path, timeout=15)
        c.row_factory = sqlite3.Row
        c.execute("PRAGMA journal_mode=WAL")
        c.execute("PRAGMA foreign_keys=ON")
        return c

    # users
    def upsert_user(self, uid: str, name: str, access: str, paid_until: str | None = None):
        if not USER_ID.match(uid):
            raise ValueError("bad user id")
        t = now_iso()
        with self.lock, self.conn() as c:
            c.execute(
                "INSERT INTO users(id,display_name,access,paid_until,created_at,updated_at) VALUES(?,?,?,?,?,?) "
                "ON CONFLICT(id) DO UPDATE SET display_name=excluded.display_name, access=excluded.access, "
                "paid_until=excluded.paid_until, updated_at=excluded.updated_at",
                (uid, name, access, paid_until, t, t),
            )

    def user(self, uid: str):
        with self.conn() as c:
            r = c.execute("SELECT * FROM users WHERE id=?", (uid,)).fetchone()
            return dict(r) if r else None

    def users(self):
        with self.conn() as c:
            return [dict(r) for r in c.execute("SELECT * FROM users ORDER BY id")]

    # messages
    def add_message(self, uid: str, role: str, content: str, unit=None) -> int:
        with self.lock, self.conn() as c:
            cur = c.execute(
                "INSERT INTO messages(user_id,role,content,unit,created_at) VALUES(?,?,?,?,?)",
                (uid, role, content, unit, now_iso()),
            )
            return cur.lastrowid

    def recent(self, uid: str, limit: int):
        with self.conn() as c:
            rows = c.execute(
                "SELECT id,role,content,unit,created_at FROM messages WHERE user_id=? ORDER BY id DESC LIMIT ?",
                (uid, limit),
            ).fetchall()
        return [dict(r) for r in reversed(rows)]

    def count_user_messages(self, uid: str) -> int:
        with self.conn() as c:
            return c.execute("SELECT COUNT(*) FROM messages WHERE user_id=? AND role='user'", (uid,)).fetchone()[0]

    # brain
    def brain(self, uid: str) -> dict:
        with self.conn() as c:
            r = c.execute("SELECT content,version,updated_at FROM brain WHERE user_id=?", (uid,)).fetchone()
        return dict(r) if r else {"content": "", "version": 0, "updated_at": None}

    def set_brain(self, uid: str, content: str):
        content = content.strip()[:6000]
        t = now_iso()
        with self.lock, self.conn() as c:
            c.execute(
                "INSERT INTO brain(user_id,content,version,updated_at) VALUES(?,?,1,?) "
                "ON CONFLICT(user_id) DO UPDATE SET content=excluded.content, version=brain.version+1, "
                "updated_at=excluded.updated_at",
                (uid, content, t),
            )
        # Human-readable mirror of the brainfile, one file per user.
        f = self.dir / "brains" / f"{uid}.md"
        tmp = f.with_suffix(".tmp")
        tmp.write_text(f"<!-- brainfile for {uid}, updated {t} -->\n{content}\n")
        os.chmod(tmp, 0o600)
        tmp.replace(f)

    # progress
    def set_progress(self, uid: str, snap: dict):
        s = json.dumps(snap, separators=(",", ":"))[:20000]
        with self.lock, self.conn() as c:
            c.execute(
                "INSERT INTO progress(user_id,snapshot,updated_at) VALUES(?,?,?) "
                "ON CONFLICT(user_id) DO UPDATE SET snapshot=excluded.snapshot, updated_at=excluded.updated_at",
                (uid, s, now_iso()),
            )

    def progress(self, uid: str):
        with self.conn() as c:
            r = c.execute("SELECT snapshot,updated_at FROM progress WHERE user_id=?", (uid,)).fetchone()
        if not r:
            return None
        try:
            return {"snapshot": json.loads(r["snapshot"]), "updated_at": r["updated_at"]}
        except ValueError:
            return None

    # rate limiting
    def allow(self, uid: str, per_hour: int, per_day: int) -> bool:
        t = time.time()
        with self.lock, self.conn() as c:
            c.execute("DELETE FROM usage WHERE at < ?", (t - 86400,))
            day = c.execute("SELECT COUNT(*) FROM usage WHERE user_id=?", (uid,)).fetchone()[0]
            hour = c.execute("SELECT COUNT(*) FROM usage WHERE user_id=? AND at >= ?", (uid, t - 3600)).fetchone()[0]
            if day >= per_day or hour >= per_hour:
                return False
            c.execute("INSERT INTO usage(user_id,at) VALUES(?,?)", (uid, t))
            return True


def has_access(user: dict | None) -> bool:
    if not user:
        return False
    if user["access"] == "granted":
        return True
    if user["access"] == "paid":
        pu = user.get("paid_until")
        return bool(pu) and pu >= now_iso()[:10]
    return False


# ---------------------------------------------------------------- model

class Model:
    def __init__(self, cfg: Config):
        self.cfg = cfg
        self.sem = threading.Semaphore(2)  # at most two model calls at once
        self._ready = (0.0, False)

    def ready(self) -> bool:
        if self.cfg.fake_model:
            return True
        t, ok = self._ready
        if time.time() - t < 60:
            return ok
        ok = False
        try:
            p = subprocess.run([self.cfg.claude_bin, "auth", "status"], capture_output=True, text=True,
                               timeout=20, env=self._env())
            ok = '"loggedIn": true' in p.stdout
        except (OSError, subprocess.TimeoutExpired):
            ok = False
        self._ready = (time.time(), ok)
        return ok

    def _env(self):
        env = {k: v for k, v in os.environ.items() if k in ("HOME", "USER", "LOGNAME", "PATH", "LANG", "TMPDIR", "SHELL")}
        env.setdefault("PATH", "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin")
        # The CLI finds its login in the Keychain by account name; launchd jobs do not set USER.
        name = getpass.getuser()
        env.setdefault("USER", name)
        env.setdefault("LOGNAME", name)
        env.setdefault("HOME", os.path.expanduser("~"))
        # Never let a stray API key switch billing away from the CLI's own login.
        env.pop("ANTHROPIC_API_KEY", None)
        return env

    def run(self, system: str, prompt: str, model: str | None = None) -> str:
        """One text-only completion. Raises RuntimeError on failure."""
        with self.sem:
            if self.cfg.fake_model:
                p = subprocess.run(self.cfg.fake_model, shell=True, input=system + "\n\n" + prompt,
                                   capture_output=True, text=True, timeout=self.cfg.timeout)
                if p.returncode != 0:
                    raise RuntimeError("fake model failed")
                return p.stdout.strip()
            cmd = [
                self.cfg.claude_bin, "-p", "Reply to the student's latest message, following your instructions.",
                "--model", model or self.cfg.model,
                "--output-format", "json",
                "--no-session-persistence",
                "--tools", "",
                "--strict-mcp-config", "--mcp-config", '{"mcpServers":{}}',
                "--setting-sources", "",
                "--system-prompt", system,
            ]
            with tempfile.TemporaryDirectory(prefix="nyre-tutor-") as wd:
                try:
                    p = subprocess.run(cmd, cwd=wd, env=self._env(), input=prompt, capture_output=True,
                                       text=True, timeout=self.cfg.timeout)
                except subprocess.TimeoutExpired:
                    raise RuntimeError("timeout")
            try:
                out = json.loads(p.stdout or "{}")
            except ValueError:
                raise RuntimeError("bad model output")
            if out.get("is_error") or not out.get("result"):
                self._ready = (0.0, False)
                raise RuntimeError(str(out.get("result") or "model error")[:200])
            return str(out["result"]).strip()


# ---------------------------------------------------------------- prompts

TUTOR_RULES = """You are {name}'s personal study tutor for the New York State real estate salesperson exam. You work only with {name}, and you remember them across sessions through the notes below.

How to tutor:
- Be warm, encouraging and direct. Keep answers short (usually under 180 words) unless they ask for depth.
- Teach for the exam: give the rule, the number to memorize, and the common trap. Use a tiny example when it helps.
- When they ask to be quizzed, ask ONE multiple-choice question at a time (A–D), wait for the answer, then explain.
- Use their progress data to focus on weak units and to suggest what to study next.
- Ground answers in the reference notes below (from the official NYS DOS 77-hour syllabus and the Real Estate License Law). If something isn't covered or you're unsure, say so and point them to dos.ny.gov. Never invent laws, fees or numbers.
- Laws change: for fees, deadlines or rules, mention the "as of" date when it matters.
- You are not a lawyer and don't give legal, tax or financial advice for real transactions. Stay on real estate licensing, the exam, and study help. Politely decline unrelated requests.
- Format: plain text with **bold** for key terms and simple "- " bullets. No tables, no headings, no links other than dos.ny.gov.
"""

BRAIN_RULES = """You maintain a private "brainfile" for a tutoring relationship: short notes the tutor reads before every session so it can continue with the same student over time.

Rewrite the brainfile using the previous brainfile plus the new conversation. Keep what is still true, update what changed, drop what is stale. Include only what helps future tutoring:
- Goals and timeline (target exam date, course progress, schedule)
- Strengths and weak spots (by syllabus unit/topic), recurring mistakes
- How the student likes to learn (quizzes vs explanations, pace, tone)
- Open threads to follow up on next time
Never store passwords, financial account numbers, addresses, or other sensitive personal data. Maximum 250 words. Output ONLY the brainfile as short "- " bullets under these headings: Goals, Strengths, Weak spots, Preferences, Follow up."""


def summarize_progress(p: dict | None) -> str:
    if not p:
        return "(no study progress reported yet)"
    s = p.get("snapshot") or {}
    lines = [f"(as of {p.get('updated_at')})"]
    if "readiness" in s:
        lines.append(f"Exam readiness score: {s.get('readiness')}%")
    if s.get("questionsTried") is not None:
        lines.append(f"Practice questions tried: {s.get('questionsTried')}; overall accuracy: {s.get('accuracy')}")
    for u in (s.get("units") or [])[:19]:
        if u.get("seen"):
            lines.append(f"- Unit {u.get('id')} {u.get('title')}: {u.get('seen')}/{u.get('total')} tried, latest accuracy {u.get('acc')}%")
    for e in (s.get("exams") or [])[-3:]:
        lines.append(f"- Mock exam {e.get('date')}: {e.get('score')}/{e.get('total')}")
    if s.get("roadmap"):
        lines.append("Licensing steps done: " + ", ".join(map(str, s["roadmap"])))
    if s.get("cardsMastered") is not None:
        lines.append(f"Flashcards mastered: {s.get('cardsMastered')}")
    return "\n".join(lines)


def build_system(cfg: Config, user: dict, brain: str, progress: dict | None, knowledge: str) -> str:
    return (
        TUTOR_RULES.format(name=user["display_name"])
        + "\n## Your brainfile about " + user["display_name"] + "\n"
        + (brain or "(empty: this is your first session together. Learn their goals and exam timeline.)")
        + "\n\n## Their study progress in the app\n" + summarize_progress(progress)
        + "\n\n## Reference notes\n" + knowledge
        + "\n\nToday's date: " + datetime.now().strftime("%B %d, %Y") + "."
    )


def build_transcript(history: list, name: str) -> str:
    out = []
    for m in history:
        who = name if m["role"] == "user" else "Tutor"
        out.append(f"{who}: {m['content']}")
    return "Conversation so far (most recent last):\n\n" + "\n\n".join(out)


# ---------------------------------------------------------------- app

class App:
    def __init__(self, cfg: Config):
        self.cfg = cfg
        self.store = Store(cfg.data_dir)
        self.model = Model(cfg)
        self.knowledge = cfg.knowledge_file.read_text() if cfg.knowledge_file.exists() else ""
        self.brain_busy = set()
        self.brain_lock = threading.Lock()

    def chat(self, uid: str, message: str, unit=None, progress=None) -> dict:
        user = self.store.user(uid)
        if not has_access(user):
            return {"status": 402, "error": "payment_required"}
        if not self.store.allow(uid, self.cfg.per_hour, self.cfg.per_day):
            return {"status": 429, "error": "slow_down"}
        if isinstance(progress, dict):
            self.store.set_progress(uid, progress)
        self.store.add_message(uid, "user", message, unit)
        history = self.store.recent(uid, 24)
        system = build_system(self.cfg, user, self.store.brain(uid)["content"], self.store.progress(uid), self.knowledge)
        prompt = build_transcript(history, user["display_name"])
        if unit:
            prompt += f"\n\n(The student is currently on Unit {unit} in the study app.)"
        try:
            reply = self.model.run(system, prompt)
        except RuntimeError as e:
            sys.stderr.write(f"{now_iso()} model error for {uid}: {e}\n")
            return {"status": 503, "error": "tutor_unavailable"}
        mid = self.store.add_message(uid, "assistant", reply, unit)
        if self.store.count_user_messages(uid) % self.cfg.brain_every == 0:
            self.update_brain_async(uid)
        return {"status": 200, "reply": reply, "id": mid}

    def update_brain_async(self, uid: str):
        with self.brain_lock:
            if uid in self.brain_busy:
                return
            self.brain_busy.add(uid)

        def work():
            try:
                self.update_brain(uid)
            except Exception as e:  # never crash the server over a memory update
                sys.stderr.write(f"{now_iso()} brain update failed for {uid}: {e}\n")
            finally:
                with self.brain_lock:
                    self.brain_busy.discard(uid)

        threading.Thread(target=work, daemon=True).start()

    def update_brain(self, uid: str):
        user = self.store.user(uid)
        old = self.store.brain(uid)["content"]
        history = self.store.recent(uid, 30)
        prompt = (
            "Previous brainfile:\n" + (old or "(empty)") + "\n\nStudy progress:\n"
            + summarize_progress(self.store.progress(uid)) + "\n\n" + build_transcript(history, user["display_name"])
            + "\n\nWrite the updated brainfile now."
        )
        new = self.model.run(BRAIN_RULES, prompt, self.cfg.brain_model)
        if new and len(new) > 20:
            self.store.set_brain(uid, new)


def make_handler(app: App):
    token = app.cfg.token.encode()

    class H(BaseHTTPRequestHandler):
        server_version = "nyre-tutor"
        sys_version = ""

        def log_message(self, fmt, *args):  # no request bodies or user text in logs
            sys.stderr.write(f"{now_iso()} {self.command} {self.path.split('?')[0]} {args[1] if len(args) > 1 else ''}\n")

        def _send(self, code: int, obj: dict):
            body = json.dumps(obj).encode()
            self.send_response(code)
            self.send_header("Content-Type", "application/json")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)

        def _route(self) -> str:
            p = self.path.split("?")[0]
            return p[len("/ny-tutor"):] if p.startswith("/ny-tutor") else p

        def _authed_user(self):
            auth = self.headers.get("Authorization", "")
            if not token or not auth.startswith("Bearer ") or not hmac.compare_digest(auth[7:].encode(), token):
                self._send(401, {"error": "unauthorized"})
                return None
            uid = (self.headers.get("X-KE-User") or "").strip().lower()
            if not USER_ID.match(uid):
                self._send(400, {"error": "bad_user"})
                return None
            return uid

        def do_GET(self):
            r = self._route()
            if r == "/health":
                return self._send(200, {"ok": True, "model_ready": app.model.ready()})
            uid = self._authed_user()
            if not uid:
                return
            if r == "/history":
                user = app.store.user(uid)
                if not has_access(user):
                    return self._send(402, {"error": "payment_required"})
                msgs = app.store.recent(uid, 60)
                return self._send(200, {"name": user["display_name"], "messages": msgs, "model_ready": app.model.ready()})
            if r == "/brain":
                if not has_access(app.store.user(uid)):
                    return self._send(402, {"error": "payment_required"})
                return self._send(200, app.store.brain(uid))
            self._send(404, {"error": "not_found"})

        def do_POST(self):
            r = self._route()
            uid = self._authed_user()
            if not uid:
                return
            try:
                n = int(self.headers.get("Content-Length") or 0)
            except ValueError:
                n = 0
            if n <= 0 or n > 64_000:
                return self._send(413, {"error": "bad_size"})
            try:
                body = json.loads(self.rfile.read(n))
            except ValueError:
                return self._send(400, {"error": "bad_json"})
            if r == "/chat":
                msg = str(body.get("message") or "").strip()
                if not msg or len(msg) > 4000:
                    return self._send(400, {"error": "bad_message"})
                unit = body.get("unit")
                unit = unit if isinstance(unit, int) and 1 <= unit <= 19 else None
                res = app.chat(uid, msg, unit, body.get("progress"))
                code = res.pop("status")
                return self._send(code, res)
            self._send(404, {"error": "not_found"})

    return H


# ---------------------------------------------------------------- cli

def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--env-file", type=Path, help="KEY=VALUE config file (chmod 600)")
    sub = ap.add_subparsers(dest="cmd")
    sub.add_parser("serve")
    ua = sub.add_parser("user-add", help="create or update a user")
    ua.add_argument("id")
    ua.add_argument("--name", required=True)
    ua.add_argument("--access", choices=["granted", "paid", "none"], default="none")
    ua.add_argument("--paid-until")
    sub.add_parser("users")
    bs = sub.add_parser("brain", help="print a user's brainfile")
    bs.add_argument("id")
    args = ap.parse_args(argv)
    cfg = Config(args.env_file)

    if args.cmd == "user-add":
        Store(cfg.data_dir).upsert_user(args.id.lower(), args.name, args.access, args.paid_until)
        print("ok")
        return
    if args.cmd == "users":
        for u in Store(cfg.data_dir).users():
            print(f"{u['id']}\t{u['display_name']}\t{u['access']}\t{u['paid_until'] or ''}")
        return
    if args.cmd == "brain":
        print(Store(cfg.data_dir).brain(args.id.lower())["content"] or "(empty)")
        return

    if len(cfg.token) < 32:
        raise SystemExit("TUTOR_TOKEN must be set (32+ characters)")
    app = App(cfg)
    srv = ThreadingHTTPServer((cfg.host, cfg.port), make_handler(app))
    sys.stderr.write(f"{now_iso()} tutor listening on {cfg.host}:{cfg.port} (model {cfg.model})\n")
    srv.serve_forever()


if __name__ == "__main__":
    main()

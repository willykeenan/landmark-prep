"""Tests for the local tutor service, using a fake model (no network, no Claude login needed).
Run: python3 tutor/test_tutor.py"""
import json
import os
import sys
import tempfile
import threading
import time
import unittest
import urllib.request
from http.server import ThreadingHTTPServer
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import tutor_server as T  # noqa: E402

TOKEN = "t" * 40
# The fake model echoes a marker and the last student line, so we can check prompts reached it.
FAKE = (
    "python3 -c \"import sys; s=sys.stdin.read(); "
    "last=[l for l in s.splitlines() if l.startswith('Ang: ') or l.startswith('Bob: ')]; "
    "print('BRAIN NOTE - Goals: pass the exam in November' if 'for a tutoring relationship' in s else 'TUTOR SAYS: ' + (last[-1] if last else '?'))\""
)


class TutorTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.TemporaryDirectory()
        os.environ.update({
            "TUTOR_TOKEN": TOKEN,
            "TUTOR_DATA_DIR": cls.tmp.name,
            "TUTOR_FAKE_MODEL": FAKE,
            "TUTOR_BRAIN_EVERY": "2",
            "TUTOR_LIMIT_PER_HOUR": "6",
            "TUTOR_KNOWLEDGE": str(Path(__file__).resolve().parent / "knowledge.md"),
        })
        cls.cfg = T.Config(None)
        cls.app = T.App(cls.cfg)
        cls.app.store.upsert_user("ang", "Ang", "granted")
        cls.app.store.upsert_user("bob", "Bob", "none")
        cls.app.store.upsert_user("pat", "Pat", "paid", "2000-01-01")
        cls.srv = ThreadingHTTPServer(("127.0.0.1", 0), T.make_handler(cls.app))
        cls.base = f"http://127.0.0.1:{cls.srv.server_address[1]}"
        threading.Thread(target=cls.srv.serve_forever, daemon=True).start()

    @classmethod
    def tearDownClass(cls):
        cls.srv.shutdown()
        cls.tmp.cleanup()

    def req(self, path, body=None, user="ang", token=TOKEN, method=None):
        data = None if body is None else json.dumps(body).encode()
        r = urllib.request.Request(self.base + path, data=data, method=method or ("POST" if data else "GET"))
        if token:
            r.add_header("Authorization", "Bearer " + token)
        if user:
            r.add_header("X-KE-User", user)
        r.add_header("Content-Type", "application/json")
        try:
            with urllib.request.urlopen(r, timeout=30) as resp:
                return resp.status, json.loads(resp.read())
        except urllib.error.HTTPError as e:
            return e.code, json.loads(e.read() or b"{}")

    # ---- accounts: sign-up with an invite code, then sign in by email

    def acct(self, path, body, token=TOKEN):
        return self.req(path, body, user=None, token=token)

    def test_password_hash_is_pbkdf2_sha256(self):
        self.assertEqual(T.hash_password("landmark study 2026", "00112233445566778899aabbccddeeff"),
                         "f09043d2da4dca23f50f75cc143111d7e69c39b7ff068e23eaeed464342ff796")

    def test_signup_needs_token_and_a_live_invite(self):
        self.app.store.add_invite("welcome-one", 1, "test")
        good = {"email": "Sam.Lee@Example.com", "name": "Sam", "password": "long enough 1", "invite": "WELCOME-ONE"}
        self.assertEqual(self.acct("/auth/signup", good, token=None)[0], 401)
        self.assertEqual(self.acct("/auth/signup", dict(good, invite="nope"))[0], 403)
        code, j = self.acct("/auth/signup", good)
        self.assertEqual(code, 201)
        self.assertEqual(j["name"], "Sam")
        self.assertRegex(j["id"], r"^sam-lee-[0-9a-f]{4}$")
        # single-use code is spent; the same email can't sign up twice
        self.assertEqual(self.acct("/auth/signup", dict(good, email="other@example.com"))[0], 403)
        self.app.store.add_invite("welcome-two", 2)
        self.assertEqual(self.acct("/auth/signup", dict(good, invite="welcome-two"))[0], 409)
        # the new account is a real tutor user: its study state saves and loads
        self.assertEqual(self.req("/state", {"data": {"x": 1}, "savedAt": 5}, user=j["id"])[0], 200)
        self.assertEqual(self.req("/state", user=j["id"])[1]["data"], {"x": 1})
        # no password material is stored in the clear
        with self.app.store.conn() as c:
            row = dict(c.execute("SELECT * FROM accounts WHERE email='sam.lee@example.com'").fetchone())
        self.assertNotIn("long enough", json.dumps(row))

    def test_signup_validates_fields(self):
        self.app.store.add_invite("valid-many", 20)
        base = {"email": "v@example.com", "name": "Val", "password": "long enough 1", "invite": "valid-many"}
        for field, bad, err in [("email", "not-an-email", "bad_email"), ("email", "a@b", "bad_email"),
                                ("name", "", "bad_name"), ("name", "<script>", "bad_name"), ("name", "x" * 41, "bad_name"),
                                ("password", "short", "bad_password"), ("password", 12345678, "bad_password")]:
            code, j = self.acct("/auth/signup", dict(base, **{field: bad}))
            self.assertEqual((code, j.get("error")), (400, err), (field, bad))
        self.assertEqual(self.acct("/auth/signup", dict(base, name="Mary-Jo O'Neil"))[0], 201)

    def test_login_by_email(self):
        self.app.store.add_invite("login-test", 1)
        self.acct("/auth/signup", {"email": "kim@example.com", "name": "Kim", "password": "kim's password", "invite": "login-test"})
        code, j = self.acct("/auth/login", {"email": " KIM@example.com ", "password": "kim's password"})
        self.assertEqual(code, 200)
        self.assertEqual(j["name"], "Kim")
        self.assertEqual(self.acct("/auth/login", {"email": "kim@example.com", "password": "wrong"})[0], 401)
        self.assertEqual(self.acct("/auth/login", {"email": "nobody@example.com", "password": "x"})[0], 401)
        self.assertEqual(self.acct("/auth/login", {"email": "kim@example.com", "password": "kim's password"}, token=None)[0], 401)

    def test_owner_can_reset_a_forgotten_password(self):
        self.app.store.add_invite("reset-test", 1)
        self.acct("/auth/signup", {"email": "ria@example.com", "name": "Ria", "password": "old password 1", "invite": "reset-test"})
        self.assertTrue(self.app.store.set_password("RIA@example.com", "new password 2"))
        self.assertEqual(self.acct("/auth/login", {"email": "ria@example.com", "password": "old password 1"})[0], 401)
        self.assertEqual(self.acct("/auth/login", {"email": "ria@example.com", "password": "new password 2"})[0], 200)
        self.assertFalse(self.app.store.set_password("nobody@example.com", "new password 2"))
        with self.assertRaises(T.AccountError):
            self.app.store.set_password("ria@example.com", "short")

    def test_login_pauses_after_repeated_wrong_passwords(self):
        self.app.store.add_invite("lock-test", 1)
        self.acct("/auth/signup", {"email": "lee@example.com", "name": "Lee", "password": "right password", "invite": "lock-test"})
        for _ in range(T.LOGIN_TRIES):
            self.assertEqual(self.acct("/auth/login", {"email": "lee@example.com", "password": "wrong"})[0], 401)
        self.assertEqual(self.acct("/auth/login", {"email": "lee@example.com", "password": "right password"})[0], 429)
        self.app.login_fails.clear()
        self.assertEqual(self.acct("/auth/login", {"email": "lee@example.com", "password": "right password"})[0], 200)

    def test_health_is_public_and_minimal(self):
        code, j = self.req("/health", token=None, user=None)
        self.assertEqual(code, 200)
        self.assertEqual(set(j), {"ok", "model_ready"})

    def test_requires_token(self):
        self.assertEqual(self.req("/chat", {"message": "hi"}, token=None)[0], 401)
        self.assertEqual(self.req("/chat", {"message": "hi"}, token="x" * 40)[0], 401)

    def test_rejects_bad_user_id(self):
        self.assertEqual(self.req("/chat", {"message": "hi"}, user="../etc")[0], 400)

    def test_access_levels(self):
        self.assertEqual(self.req("/chat", {"message": "hi"}, user="bob")[0], 402)   # access none
        self.assertEqual(self.req("/chat", {"message": "hi"}, user="pat")[0], 402)   # paid, expired
        self.assertEqual(self.req("/chat", {"message": "hi"}, user="nobody")[0], 402)  # unknown

    def test_chat_history_and_brain(self):
        c1, j1 = self.req("/chat", {"message": "What is a net listing?", "unit": 1,
                                   "progress": {"readiness": 12, "units": [{"id": 1, "title": "License Law", "seen": 3, "total": 48, "acc": 67}]}})
        self.assertEqual(c1, 200)
        self.assertIn("What is a net listing?", j1["reply"])
        c2, j2 = self.req("/chat", {"message": "Quiz me on agency"})
        self.assertEqual(c2, 200)
        # The second student message triggers an async brainfile rewrite (TUTOR_BRAIN_EVERY=2).
        for _ in range(50):
            if self.app.store.brain("ang")["content"]:
                break
            time.sleep(0.1)
        self.assertTrue(self.app.store.brain("ang")["content"].startswith("BRAIN NOTE"))
        self.assertTrue((Path(self.tmp.name) / "brains" / "ang.md").exists())
        code, h = self.req("/history")
        self.assertEqual(code, 200)
        self.assertEqual(h["name"], "Ang")
        roles = [m["role"] for m in h["messages"]]
        self.assertEqual(roles[:4], ["user", "assistant", "user", "assistant"])
        self.assertEqual(self.app.store.progress("ang")["snapshot"]["readiness"], 12)

    def test_users_are_isolated(self):
        self.app.store.upsert_user("iso", "Iso", "granted")
        self.req("/chat", {"message": "secret question from iso"}, user="iso")
        _, h = self.req("/history", user="ang")
        self.assertFalse(any("secret question from iso" in m["content"] for m in h["messages"]))

    def test_study_state_syncs_per_user_and_newest_wins(self):
        self.app.store.upsert_user("syn", "Syn", "granted")
        self.assertEqual(self.req("/state", user="syn"), (200, {"data": None, "savedAt": 0}))
        c, r = self.req("/state", {"data": {"road": {"course": True}, "palette": "blush"}, "savedAt": 2000}, user="syn")
        self.assertEqual(c, 200)
        self.assertEqual(r["data"]["palette"], "blush")
        # An older save from another device must not overwrite a newer one.
        self.req("/state", {"data": {"road": {}}, "savedAt": 1000}, user="syn")
        c, r = self.req("/state", user="syn")
        self.assertEqual((c, r["savedAt"], r["data"]["road"]), (200, 2000, {"course": True}))
        # Other users never see it, and users without access are refused.
        _, other = self.req("/state", user="ang")
        self.assertNotEqual((other.get("data") or {}).get("palette"), "blush")
        self.assertEqual(self.req("/state", user="bob")[0], 402)
        self.assertEqual(self.req("/state", {"data": [], "savedAt": 3000}, user="syn")[0], 400)

    # ---- progress can never be lost: merge, history, restore, backups

    def test_a_fresh_device_cannot_erase_progress(self):
        self.app.store.upsert_user("mrg", "Mrg", "granted")
        full = {"q": {"a": {"s": 3, "r": 2, "w": 1, "last": 1}, "b": {"s": 1, "r": 1, "w": 0, "last": 1}},
                "road": {"course": True}, "read": {"1": True}, "exams": [{"at": 100, "score": 70}], "plan": {"hours": 12}}
        self.req("/state", {"data": full, "savedAt": 1000}, user="mrg")
        # A new phone (or a browser that cleared its storage) studies one question and saves later.
        c, r = self.req("/state", {"data": {"q": {"c": {"s": 1, "r": 0, "w": 1, "last": 0}}, "road": {}, "exams": []}, "savedAt": 5000}, user="mrg")
        self.assertEqual(c, 200)
        d = r["data"]
        self.assertEqual(set(d["q"]), {"a", "b", "c"})
        self.assertEqual((d["road"], d["read"], d["plan"], len(d["exams"])), ({"course": True}, {"1": True}, {"hours": 12}, 1))
        self.assertEqual(r["savedAt"], 5000)

    def test_offline_work_on_two_devices_is_combined(self):
        self.app.store.upsert_user("two", "Two", "granted")
        self.req("/state", {"data": {"q": {"a": {"s": 5, "r": 4, "w": 1, "last": 1}}, "exams": [{"at": 1, "score": 60}]}, "savedAt": 2000}, user="two")
        # The laptop was offline and saves an older copy with different work in it.
        _, r = self.req("/state", {"data": {"q": {"a": {"s": 2, "r": 2, "w": 0, "last": 1}, "z": {"s": 1, "r": 1, "w": 0, "last": 1}},
                                            "exams": [{"at": 2, "score": 80}, {"at": 1, "score": 60}]}, "savedAt": 1500}, user="two")
        d = r["data"]
        self.assertEqual(d["q"]["a"]["s"], 5, "the record with more attempts wins")
        self.assertIn("z", d["q"])
        self.assertEqual([e["at"] for e in d["exams"]], [1, 2], "exams combined without duplicates")

    def test_unchecking_a_step_travels_and_reset_is_deliberate(self):
        self.app.store.upsert_user("unc", "Unc", "granted")
        self.req("/state", {"data": {"road": {"course": True, "exam": True}}, "savedAt": 1000}, user="unc")
        _, r = self.req("/state", {"data": {"road": {"course": True, "exam": False}}, "savedAt": 2000}, user="unc")
        self.assertEqual(r["data"]["road"], {"course": True, "exam": False})
        # "Reset progress" on a device: the newer resetAt wins whole, and the old copy is kept.
        _, r = self.req("/state", {"data": {"q": {}, "road": {}, "resetAt": 3000}, "savedAt": 3000}, user="unc")
        self.assertEqual(r["data"]["road"], {})
        hist = self.app.store.state_history("unc")
        self.assertEqual(hist[-1]["reason"], "before reset")
        # ...so it can be put back.
        self.assertTrue(self.app.store.restore_state("unc", hist[-1]["id"]))
        d = self.app.store.app_state("unc")
        self.assertEqual(d["data"]["road"], {"course": True, "exam": False})
        self.assertGreater(d["data"]["resetAt"], 3000, "a restore wins whole on every device")
        self.assertFalse(self.app.store.restore_state("unc", 999999))
        self.assertFalse(self.app.store.restore_state("ang", hist[-1]["id"]), "snapshots belong to one student")

    def test_history_is_kept_at_most_every_ten_minutes(self):
        self.app.store.upsert_user("his", "His", "granted")
        for i in range(5):
            self.req("/state", {"data": {"q": {str(i): {"s": 1, "r": 1, "w": 0, "last": 1}}}, "savedAt": 1000 + i}, user="his")
        self.assertEqual(len(self.app.store.state_history("his")), 1)

    def test_backup_script_copies_checks_and_rotates(self):
        import backup_db as B
        src = self.app.store.path
        with tempfile.TemporaryDirectory() as d:
            dest = Path(d) / "b"
            self.assertTrue(B.backup_to(src, dest, 2, 0, time.time()).startswith("ok"))
            for i in range(3):
                B.backup_to(src, dest, 2, 0, time.time() + i + 1)
            kept = B.copies(dest)
            self.assertEqual(len(kept), 2)
            import sqlite3
            self.assertEqual(sqlite3.connect(kept[-1]).execute("SELECT COUNT(*) FROM users").fetchone()[0] > 0, True)
            self.assertEqual(oct(kept[-1].stat().st_mode & 0o777), "0o600")
            self.assertEqual(sorted(p.name for p in dest.iterdir() if not p.name.endswith(".db")), [], "no side files left behind")
            self.assertTrue(B.backup_to(src, dest, 2, 24, time.time()).startswith("skip"), "a recent copy is not repeated")
            self.assertIn("not mounted", B.backup_to(src, Path("/", "Volumes", "no-such-drive-xyz", "b"), 2, 0, time.time()))
            self.assertEqual(B.main(["--db", str(src), "--dest", f"{d}/c:3:0"]), 0)

    def test_state_size_limit(self):
        # The server refuses before reading the body, so the client sees either the 413
        # or the connection closing mid-upload; both mean the oversized save was refused.
        big = {"data": {"q": {"x" * 10: "y" * 700_000}}, "savedAt": 5}
        try:
            code = self.req("/state", big)[0]
        except (urllib.error.URLError, ConnectionError):
            code = 413
        self.assertEqual(code, 413)
        self.assertEqual(self.req("/state")[1].get("savedAt"), 0)

    def test_path_prefix_from_tunnel(self):
        self.assertEqual(self.req("/ny-tutor/health", token=None, user=None)[0], 200)

    def test_size_limits(self):
        self.assertEqual(self.req("/chat", {"message": "x" * 5000})[0], 400)
        self.assertEqual(self.req("/chat", {"message": ""})[0], 400)

    def test_rate_limit(self):
        self.app.store.upsert_user("rl", "Rl", "granted")
        codes = [self.req("/chat", {"message": f"q{i}"}, user="rl")[0] for i in range(8)]
        self.assertEqual(codes[:6], [200] * 6)
        self.assertEqual(codes[6], 429)

    def test_env_file_permissions_enforced(self):
        with tempfile.NamedTemporaryFile("w", delete=False) as f:
            f.write("TUTOR_TOKEN=abc\n")
        os.chmod(f.name, 0o644)
        with self.assertRaises(SystemExit):
            T.load_env(Path(f.name))
        os.chmod(f.name, 0o600)
        self.assertEqual(T.load_env(Path(f.name))["TUTOR_TOKEN"], "abc")
        os.unlink(f.name)

    def test_launchd_style_environment_still_finds_the_login(self):
        # launchd jobs run without USER/LOGNAME and without ~/.local/bin on PATH; the CLI needs
        # USER to find its Keychain login, so the model env must fill it in.
        saved = {k: os.environ.pop(k, None) for k in ("USER", "LOGNAME")}
        try:
            env = T.Model(T.Config(None))._env()
        finally:
            for k, v in saved.items():
                if v is not None:
                    os.environ[k] = v
        self.assertTrue(env.get("USER"))
        self.assertEqual(env["USER"], env["LOGNAME"])
        self.assertNotIn("ANTHROPIC_API_KEY", env)

    def test_claude_binary_lookup_skips_missing_paths(self):
        with tempfile.TemporaryDirectory() as d:
            fake = Path(d) / "claude"
            fake.write_text("#!/bin/sh\n")
            fake.chmod(0o755)
            self.assertEqual(T.find_claude(str(fake)), str(fake))
            if T.shutil.which("claude") or os.path.exists(os.path.expanduser("~/.local/bin/claude")):
                self.assertNotEqual(T.find_claude("/definitely/not/here/claude"), "/definitely/not/here/claude")

    def test_real_model_command_is_tool_free(self):
        # Inspect the exact argv used for Claude: no tools, no MCP, no settings/hooks.
        captured = {}
        orig = T.subprocess.run

        def fake_run(cmd, **kw):
            # Earlier tests can leave a brain-rewrite thread running on the fake model; only
            # record the real Claude argv, not a stray shell string from another thread.
            if isinstance(cmd, list) and "--tools" in cmd:
                captured["cmd"] = cmd
                captured["cwd"] = kw.get("cwd")
            class P:
                returncode = 0
                stdout = json.dumps({"result": "ok", "is_error": False})
            return P()

        cfg = T.Config(None)
        cfg.fake_model = ""
        m = T.Model(cfg)
        T.subprocess.run = fake_run
        try:
            self.assertEqual(m.run("sys", "prompt"), "ok")
        finally:
            T.subprocess.run = orig
        cmd = captured["cmd"]
        self.assertEqual(cmd[cmd.index("--tools") + 1], "")
        self.assertIn("--strict-mcp-config", cmd)
        self.assertEqual(cmd[cmd.index("--setting-sources") + 1], "")
        self.assertIn("--no-session-persistence", cmd)
        self.assertTrue(os.path.basename(captured["cwd"]).startswith("nyre-tutor-"))


if __name__ == "__main__":
    unittest.main(verbosity=2)

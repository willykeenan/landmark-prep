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

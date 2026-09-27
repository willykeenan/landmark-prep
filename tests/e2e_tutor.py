"""Browser test for the optional Tutor tab: serves the app with data-tutor-api set, proxies
/api/* to the tutor service (fake model, temp database), and chats through the UI.
Run: python3 tests/e2e_tutor.py   (needs playwright)"""
import json
import os
import sys
import tempfile
import threading
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tutor"))
import tutor_server as T  # noqa: E402
from playwright.sync_api import sync_playwright  # noqa: E402

TOKEN = "k" * 40
tmp = tempfile.TemporaryDirectory()
os.environ.update({
    "TUTOR_TOKEN": TOKEN, "TUTOR_DATA_DIR": tmp.name, "TUTOR_BRAIN_EVERY": "50",
    "TUTOR_KNOWLEDGE": str(ROOT / "tutor" / "knowledge.md"),
    "TUTOR_FAKE_MODEL": "python3 -c \"import sys; s=sys.stdin.read(); print('**Net listings** are illegal in NY.\\n- rule one\\n- rule two')\"",
})
app = T.App(T.Config(None))
app.store.upsert_user("student", "Sam", "granted")
tutor = ThreadingHTTPServer(("127.0.0.1", 0), T.make_handler(app))
threading.Thread(target=tutor.serve_forever, daemon=True).start()
TUTOR = f"http://127.0.0.1:{tutor.server_address[1]}"


class Site(SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=str(ROOT), **k)

    def log_message(self, *a):
        pass

    def _proxy(self, path, body=None):
        r = urllib.request.Request(TUTOR + path, data=body, method="POST" if body else "GET")
        r.add_header("Authorization", "Bearer " + TOKEN)
        r.add_header("X-KE-User", "student")
        r.add_header("Content-Type", "application/json")
        try:
            with urllib.request.urlopen(r, timeout=30) as resp:
                code, data = resp.status, resp.read()
        except urllib.error.HTTPError as e:
            code, data = e.code, e.read()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        if self.path.startswith("/api/history"):
            return self._proxy("/history")
        if self.path in ("/", "/index.html"):
            html = (ROOT / "index.html").read_text().replace('<html lang="en">', '<html lang="en" data-tutor-api="/api" data-logout="/logout" data-no-sw>')
            b = html.encode()
            self.send_response(200)
            self.send_header("Content-Type", "text/html")
            self.end_headers()
            return self.wfile.write(b)
        return super().do_GET()

    def do_POST(self):
        n = int(self.headers.get("Content-Length") or 0)
        return self._proxy("/chat", self.rfile.read(n))


site = ThreadingHTTPServer(("127.0.0.1", 0), Site)
threading.Thread(target=site.serve_forever, daemon=True).start()
BASE = f"http://127.0.0.1:{site.server_address[1]}/"
fails, errors = [], []


def ok(c, m):
    print(("PASS " if c else "FAIL ") + m)
    if not c:
        fails.append(m)


with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1100, "height": 900})
    pg.on("pageerror", lambda e: errors.append(str(e)))
    pg.goto(BASE)
    ok(pg.locator('.tabs a[data-tab="tutor"]').count() == 1, "Tutor tab appears when configured")
    ok("Sign out" in pg.inner_text(".foot"), "sign-out link appears when configured")
    pg.goto(BASE + "#/tutor")
    pg.wait_for_selector(".msg.bot")
    ok("Hi Sam" in pg.inner_text("#chat"), "greets the student by name on first visit")
    pg.fill("#tmsg", "What's a net listing?")
    pg.click("#tsend")
    pg.wait_for_function("document.querySelectorAll('.msg.bot').length >= 2 && !document.querySelector('.msg.typing')")
    last = pg.locator(".msg.bot").last
    ok(last.locator("strong").count() == 1 and last.locator("li").count() == 2, "tutor reply renders bold + bullets safely")
    ok(pg.inner_text("#tstatus") == "online", "status shows online")
    snap = app.store.progress("student")
    ok(bool(snap) and len(snap["snapshot"]["units"]) == 19, "progress snapshot reached the tutor database")
    pg.screenshot(path=str(ROOT / "docs" / "images" / "tutor.png"))
    # Reload: conversation continues from the database.
    pg.goto(BASE + "#/unit/2")
    ok(pg.locator('a[href="#/tutor/unit/2"]').count() == 1, "unit page has Ask the tutor")
    pg.goto(BASE + "#/tutor")
    pg.wait_for_selector(".msg.me")
    ok("What's a net listing?" in pg.inner_text("#chat"), "history persists across page loads")
    # XSS check: student text is escaped
    pg.fill("#tmsg", "<img src=x onerror=alert(1)>")
    pg.click("#tsend")
    pg.wait_for_function("!document.querySelector('.msg.typing')")
    ok(pg.locator(".msg.me img").count() == 0, "student text is escaped (no HTML injection)")
    b.close()

site.shutdown()
tutor.shutdown()
ok(not errors, "no page errors " + " | ".join(errors[:3]))
print("\nTUTOR E2E:", "all passed" if not fails else f"{len(fails)} failed")
sys.exit(1 if fails else 0)

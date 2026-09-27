"""End-to-end check in headless Chromium: every screen renders with no console errors,
and the main flows work (practice, flashcards, math, mock exam, progress export).
Also saves README screenshots to docs/images/.  Run:  python3 tests/e2e.py"""
import http.server, json, os, socketserver, sys, threading, functools
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG = os.path.join(ROOT, "docs", "images")
os.makedirs(IMG, exist_ok=True)

Handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
class Quiet(Handler.func):
    def log_message(self, *a): pass
srv = socketserver.TCPServer(("127.0.0.1", 0), functools.partial(Quiet, directory=ROOT))
port = srv.server_address[1]
threading.Thread(target=srv.serve_forever, daemon=True).start()
BASE = f"http://127.0.0.1:{port}/"

fails, errors = [], []
def ok(cond, msg):
    (print("PASS", msg) if cond else (print("FAIL", msg), fails.append(msg)))

with sync_playwright() as p:
    b = p.chromium.launch()
    for scheme, size, tag in [("light", {"width": 1200, "height": 900}, "desktop"), ("dark", {"width": 390, "height": 844}, "mobile")]:
        ctx = b.new_context(viewport=size, color_scheme=scheme, device_scale_factor=2 if tag == "mobile" else 1)
        pg = ctx.new_page()
        pg.on("pageerror", lambda e: errors.append(str(e)))
        pg.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        pg.on("dialog", lambda d: d.accept())
        pg.goto(BASE)
        if tag == "mobile":
            pg.wait_for_selector("main h1"); pg.screenshot(path=os.path.join(IMG, "mobile-home.png"))
        for route, h1 in [("#/", "Free study kit"), ("#/roadmap", "How to get"), ("#/study", "Study notes"), ("#/unit/2", "Law of Agency"),
                          ("#/cards", "Flashcards"), ("#/practice", "Practice questions"), ("#/math", "Math drills"),
                          ("#/exam", "Mock state exam"), ("#/progress", "Your progress"), ("#/about", "About")]:
            pg.goto(BASE + route); pg.wait_for_selector("main h1")
            ok(h1 in pg.inner_text("main h1"), f"[{tag}] {route} renders")
            w = pg.evaluate("document.documentElement.scrollWidth - window.innerWidth")
            ok(w <= 1, f"[{tag}] {route} has no horizontal scroll ({w}px)")
        if tag == "desktop":
            pg.goto(BASE + "#/"); pg.screenshot(path=os.path.join(IMG, "home.png"))
            pg.goto(BASE + "#/roadmap"); pg.screenshot(path=os.path.join(IMG, "roadmap.png"))
            pg.goto(BASE + "#/unit/9"); pg.screenshot(path=os.path.join(IMG, "study.png"))
        # Practice flow
        pg.goto(BASE + "#/practice/unit/9"); pg.click("[data-count='10']"); pg.click("#start")
        for i in range(10):
            pg.locator(".choice").nth(i % 4).click()
            ok(pg.locator(".feedback").count() == 1, f"[{tag}] practice feedback shown q{i+1}") if i == 0 else None
            if i == 2 and tag == "desktop": pg.screenshot(path=os.path.join(IMG, "practice.png"))
            pg.click("#next")
        ok(pg.locator(".result .big").count() == 1, f"[{tag}] practice summary shown")
        # Flashcards
        pg.goto(BASE + "#/cards/unit/2"); pg.click("#flip")
        ok(pg.locator(".flash .def").count() == 1, f"[{tag}] flashcard flips")
        if tag == "desktop": pg.screenshot(path=os.path.join(IMG, "flashcards.png"))
        pg.click("#got")
        # Math
        pg.goto(BASE + "#/math")
        for i in range(8):
            pg.locator(".choice").first.click(); pg.click("#next")
        ok("/8" in pg.inner_text("main"), f"[{tag}] math counter advances")
        if tag == "desktop":
            pg.locator(".choice").first.click(); pg.screenshot(path=os.path.join(IMG, "math.png"))
        # Exam
        pg.goto(BASE + "#/exam"); pg.click("#startNew")
        n = pg.evaluate("JSON.parse(localStorage.getItem('nyre.examInProgress')).items.length")
        ok(n == 75, f"[{tag}] exam has 75 questions ({n})")
        for i in range(75):
            pg.keyboard.press(str((i % 4) + 1)); pg.keyboard.press("ArrowRight")
        if tag == "desktop": pg.screenshot(path=os.path.join(IMG, "exam.png"))
        pg.click("#submit")
        ok(pg.locator(".result .big").count() == 1, f"[{tag}] exam results shown")
        ok(pg.locator(".qstem").count() == 75, f"[{tag}] exam review lists all 75")
        # Progress export
        pg.goto(BASE + "#/progress")
        with pg.expect_download() as d: pg.click("#exp")
        data = json.load(open(d.value.path()))
        ok(data.get("app") == "ny-real-estate-prep" and data["data"]["exams"], f"[{tag}] progress export works")
        ctx.close()
    b.close()
srv.shutdown()
ok(not errors, "no console/page errors" + ("" if not errors else ": " + " | ".join(errors[:5])))
print("\nE2E:", "all passed" if not fails else f"{len(fails)} failed")
sys.exit(1 if fails else 0)

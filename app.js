/* NY Real Estate Prep — single-page app. Vanilla JS, no build step, works offline.
 * Progress is stored only in this browser (localStorage). Export/import moves it between devices. */
(function () {
  "use strict";
  var N = window.NYRE;
  var UNITS = N.units.slice().sort(function (a, b) { return a.id - b.id; });
  var UNIT = {};
  UNITS.forEach(function (u) { UNIT[u.id] = u; });
  var TOTAL_HOURS = UNITS.reduce(function (s, u) { return s + u.hours; }, 0);
  var EXAM = { count: 75, minutes: 90, pass: 0.7 };
  var $main = document.getElementById("main");
  // Optional hosted features, switched on by attributes on <html> (off in the open-source build):
  //   data-tutor-api="/path"  → shows the Tutor tab (POST {base}/chat, GET {base}/history)
  //   data-logout="/path"     → adds a sign-out link
  //   data-no-sw              → skip the offline service worker
  var TUTOR_API = document.documentElement.getAttribute("data-tutor-api");
  var LOGOUT = document.documentElement.getAttribute("data-logout");
  if (TUTOR_API) {
    var tabs = document.querySelector(".tabs");
    var t = document.createElement("a");
    t.href = "#/tutor"; t.setAttribute("data-tab", "tutor"); t.textContent = "Tutor";
    tabs.insertBefore(t, tabs.children[1]);
  }
  if (LOGOUT) {
    var foot = document.querySelector(".foot p");
    if (foot) { var lo = document.createElement("a"); lo.href = LOGOUT; lo.textContent = "Sign out"; foot.appendChild(document.createTextNode(" · ")); foot.appendChild(lo); }
  }

  /* ---------- helpers ---------- */
  function hash(s) {
    var h = 5381;
    for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
    return h.toString(36);
  }
  N.questions.forEach(function (q) { q.id = "u" + q.u + "-" + hash(q.q); });
  N.glossary.forEach(function (g) { g.id = "g" + g.u + "-" + hash(g.t); });
  var QBY = {};
  N.questions.forEach(function (q) { QBY[q.id] = q; });

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function md(s) {
    return esc(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[\s(])_(.+?)_(?=[\s).,;:]|$)/g, "$1<em>$2</em>");
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function pct(n, d) { return d ? Math.round((n / d) * 100) : 0; }
  function plural(n, w) { return n + " " + w + (n === 1 ? "" : "s"); }
  function fmtTime(sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    return m + ":" + (s < 10 ? "0" : "") + s;
  }
  function today() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  var LETTERS = ["A", "B", "C", "D", "E"];

  /* ---------- storage (localStorage can be unavailable; never crash) ---------- */
  var mem = {};
  var store = {
    get: function (k, d) {
      try {
        var v = localStorage.getItem("nyre." + k);
        return v == null ? (k in mem ? mem[k] : d) : JSON.parse(v);
      } catch { return k in mem ? mem[k] : d; }
    },
    set: function (k, v) {
      mem[k] = v;
      try { localStorage.setItem("nyre." + k, JSON.stringify(v)); } catch { /* private mode, full, etc. */ }
    },
    del: function (k) {
      delete mem[k];
      try { localStorage.removeItem("nyre." + k); } catch {}
    },
  };
  var P = {
    q: store.get("q", {}),          // id -> {s: seen, r: right, w: wrong, last: 1|0}
    cards: store.get("cards", {}),  // id -> {box, due}
    exams: store.get("exams", []),  // [{at, score, total, units:{u:[r,t]}}]
    road: store.get("road", {}),    // stepId -> true
    read: store.get("read", {}),    // unitId -> true
  };
  function save(k) { store.set(k, P[k]); }
  function recordAnswer(id, ok) {
    var r = P.q[id] || { s: 0, r: 0, w: 0, last: 0 };
    r.s++; if (ok) r.r++; else r.w++; r.last = ok ? 1 : 0;
    P.q[id] = r; save("q");
  }

  /* ---------- theme ---------- */
  var themes = ["auto", "light", "dark"];
  function applyTheme(t) {
    if (t === "auto") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", t);
    var btn = document.getElementById("themeBtn");
    if (btn) btn.title = "Theme: " + t;
  }
  applyTheme(store.get("theme", "auto"));
  document.getElementById("themeBtn").addEventListener("click", function () {
    var t = themes[(themes.indexOf(store.get("theme", "auto")) + 1) % themes.length];
    store.set("theme", t); applyTheme(t);
  });

  /* ---------- stats ---------- */
  function unitStats(uid) {
    var qs = N.questions.filter(function (q) { return q.u === uid; });
    var seen = 0, right = 0, answered = 0, lastRight = 0;
    qs.forEach(function (q) {
      var r = P.q[q.id];
      if (r) { seen++; right += r.r; answered += r.s; lastRight += r.last; }
    });
    return { total: qs.length, seen: seen, acc: answered ? right / answered : null, lastAcc: seen ? lastRight / seen : null };
  }
  function readiness() {
    // Weighted by syllabus hours: coverage × most-recent accuracy per unit.
    var score = 0;
    UNITS.forEach(function (u) {
      var s = unitStats(u.id);
      if (!s.total || s.lastAcc == null) return;
      var coverage = Math.min(1, s.seen / Math.max(1, Math.min(s.total, 10)));
      score += (u.hours / TOTAL_HOURS) * coverage * s.lastAcc;
    });
    return Math.round(score * 100);
  }
  function overall() {
    var seen = 0, right = 0, ans = 0;
    Object.keys(P.q).forEach(function (id) { if (!QBY[id]) return; seen++; right += P.q[id].r; ans += P.q[id].s; });
    return { seen: seen, acc: ans ? right / ans : null };
  }

  /* ---------- router ---------- */
  var cleanup = null;
  function route() {
    if (cleanup) { try { cleanup(); } catch {} cleanup = null; }
    var h = location.hash.replace(/^#\/?/, "");
    var parts = h.split("/").filter(Boolean);
    var name = parts[0] || "home";
    var tab = { unit: "study" }[name] || name;
    document.querySelectorAll(".tabs a").forEach(function (a) {
      a.classList.toggle("on", a.getAttribute("data-tab") === tab);
      if (a.getAttribute("data-tab") === tab) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    var view = VIEWS[name] || VIEWS.home;
    view(parts.slice(1));
    window.scrollTo(0, 0);
    $main.focus({ preventScroll: true });
  }
  window.addEventListener("hashchange", route);

  function render(html) { $main.innerHTML = html; }
  function on(sel, ev, fn) {
    $main.querySelectorAll(sel).forEach(function (el) { el.addEventListener(ev, fn); });
  }

  /* ---------- views ---------- */
  var VIEWS = {};

  VIEWS.home = function () {
    var o = overall();
    var road = N.roadmap.steps.filter(function (s) { return P.road[s.id]; }).length;
    var last = P.exams[P.exams.length - 1];
    var readUnits = Object.keys(P.read).length;
    render(
      '<section class="hero"><h1>Free study kit for the NY real estate salesperson exam</h1>' +
      "<p>Everything you need to pass the state exam, for free: notes on all 19 units of the official 77-hour syllabus, " +
      N.glossary.length + " flashcards, " + N.questions.length + " practice questions with explanations, a timed 75-question mock exam, unlimited math drills, and a step-by-step guide to getting licensed.</p></section>" +
      '<div class="stats">' +
      stat(readiness() + "%", "exam readiness") +
      stat(o.seen + "/" + N.questions.length, "questions tried") +
      stat(o.acc == null ? "—" : Math.round(o.acc * 100) + "%", "accuracy") +
      stat(last ? pct(last.score, last.total) + "%" : "—", "last mock exam") +
      "</div>" +
      '<div class="callout info"><strong>Getting licensed can cost as little as $80.</strong> The required 77-hour course is available free from a state-approved school, and many libraries proctor the course final for free. After that it\'s just the $15 exam and the $65 license. <a href="#/roadmap">See the step-by-step roadmap →</a></div>' +
      '<div class="grid">' +
      tile("#/roadmap", "Get licensed", road + " of " + N.roadmap.steps.length + " steps done") +
      tile("#/study", "Study notes", readUnits + " of 19 units marked read") +
      tile("#/cards", "Flashcards", N.glossary.length + " key terms from the syllabus") +
      tile("#/practice", "Practice questions", "By unit, missed, or unseen") +
      tile("#/math", "Math drills", "Unlimited fresh problems") +
      tile("#/exam", "Mock exam", "75 questions · 90 minutes · 70% to pass") +
      "</div>" +
      '<h2>A simple study plan</h2><ol class="small">' +
      "<li><strong>Weeks 1–4:</strong> work through the 77-hour course. After each chapter, read the matching unit here and do its practice questions.</li>" +
      "<li><strong>Every day:</strong> 10 minutes of flashcards (the app brings back the ones you miss).</li>" +
      "<li><strong>Weekly:</strong> a round of math drills until you can do each type without the formula sheet.</li>" +
      "<li><strong>Final 2 weeks:</strong> take a mock exam every few days, then drill your <em>missed</em> questions. Book the state exam once you're scoring 80%+ consistently.</li>" +
      "</ol>"
    );
  };
  function stat(v, k) { return '<div class="stat"><span class="v">' + esc(v) + '</span><span class="k">' + esc(k) + "</span></div>"; }
  function tile(href, t, d) { return '<a class="tile" href="' + href + '"><span class="t">' + esc(t) + '</span><span class="d">' + esc(d) + "</span></a>"; }

  /* ---- Roadmap ---- */
  VIEWS.roadmap = function () {
    var R = N.roadmap;
    var total = R.minimumCost.reduce(function (s, r) { return s + r[1]; }, 0);
    var html = "<h1>How to get your NY salesperson license</h1>" +
      '<p class="muted">Checked against the NY Department of State in ' + esc(R.checkedOn) + ". Fees and school offers change, so confirm with the linked official pages.</p>" +
      '<div class="card"><h2>Minimum out-of-pocket cost</h2><table class="costs">' +
      R.minimumCost.map(function (r) { return "<tr><td>" + esc(r[0]) + "</td><td>$" + r[1] + "</td></tr>"; }).join("") +
      '<tr class="total"><td><strong>Total</strong></td><td>$' + total + "</td></tr></table>" +
      '<p class="small muted" style="margin-top:8px">This study kit covers the exam prep that schools sell as a $50–$200 add-on.</p></div>' +
      '<ol class="steps">' +
      R.steps.map(function (s) {
        var done = !!P.road[s.id];
        return '<li class="step' + (done ? " done" : "") + '"><div class="card">' +
          '<div class="spread"><h2 style="margin:0">' + esc(s.title) + '</h2><span class="cost">' + esc(s.cost) + "</span></div>" +
          '<ul style="margin-top:10px">' + s.body.map(function (b) { return "<li>" + md(b) + "</li>"; }).join("") + "</ul>" +
          (s.links.length ? '<p class="small">' + s.links.map(function (l) { return '<a href="' + esc(l[1]) + '" target="_blank" rel="noopener">' + esc(l[0]) + " ↗</a>"; }).join(" · ") + "</p>" : "") +
          '<label class="check"><input type="checkbox" data-step="' + esc(s.id) + '"' + (done ? " checked" : "") + "> Done</label>" +
          "</div></li>";
      }).join("") + "</ol>";
    render(html);
    on("input[data-step]", "change", function (e) {
      var id = e.target.getAttribute("data-step");
      if (e.target.checked) P.road[id] = true; else delete P.road[id];
      save("road");
      e.target.closest(".step").classList.toggle("done", e.target.checked);
    });
  };

  /* ---- Study ---- */
  VIEWS.study = function () {
    render(
      "<h1>Study notes</h1>" +
      '<p class="muted">All 19 subjects from the official 77-hour syllabus, in syllabus order. Hours show how much class time the state assigns to each unit, a good hint at how much of the exam it covers.</p>' +
      '<div class="card" style="padding:0"><ul class="unit-list">' +
      UNITS.map(function (u) {
        var s = unitStats(u.id);
        var badge = s.lastAcc == null ? "" : '<span class="pill ' + (s.lastAcc >= 0.8 ? "good" : s.lastAcc >= 0.6 ? "warn" : "bad") + '">' + Math.round(s.lastAcc * 100) + "%</span> ";
        return '<li><a href="#/unit/' + u.id + '"><span class="unit-num">' + u.id + '</span><span class="unit-title">' + esc(u.title) +
          (P.read[u.id] ? ' <span class="pill good">read</span>' : "") + '</span><span class="small muted">' + badge + plural(u.hours, "hr") + "</span></a></li>";
      }).join("") + "</ul></div>"
    );
  };

  VIEWS.unit = function (args) {
    var id = parseInt(args[0], 10);
    var u = UNIT[id];
    if (!u) { location.hash = "#/study"; return; }
    var qn = N.questions.filter(function (q) { return q.u === id; }).length;
    var gn = N.glossary.filter(function (g) { return g.u === id; }).length;
    var prev = UNIT[id - 1], next = UNIT[id + 1];
    render(
      '<p class="small"><a href="#/study">← All units</a></p>' +
      '<h1><span class="unit-num" style="margin-right:8px">' + u.id + "</span>" + esc(u.title) + "</h1>" +
      '<p class="muted">' + plural(u.hours, "syllabus hour") + " · " + md(u.intro) + "</p>" +
      '<div class="row no-print" style="margin-bottom:14px">' +
      (qn ? '<a class="btn primary" href="#/practice/unit/' + u.id + '">Practice ' + plural(qn, "question") + "</a>" : "") +
      (u.id === 10 ? '<a class="btn" href="#/math">Math drills</a>' : "") +
      (gn ? '<a class="btn" href="#/cards/unit/' + u.id + '">' + plural(gn, "flashcard") + "</a>" : "") +
      (TUTOR_API ? '<a class="btn" href="#/tutor/unit/' + u.id + '">Ask the tutor</a>' : "") +
      '<button class="btn ghost" id="readBtn" type="button">' + (P.read[u.id] ? "✓ Marked read" : "Mark as read") + "</button></div>" +
      '<div class="notes">' +
      u.sections.map(function (s) {
        return '<div class="card"><h2>' + esc(s.h) + "</h2><ul>" + s.b.map(function (b) { return "<li>" + md(b) + "</li>"; }).join("") + "</ul></div>";
      }).join("") +
      (u.numbers && u.numbers.length ? '<div class="card"><h2>Numbers to know</h2><table class="nums">' +
        u.numbers.map(function (n) { return "<tr><td>" + md(n[0]) + "</td><td>" + md(n[1]) + "</td></tr>"; }).join("") + "</table></div>" : "") +
      (u.traps && u.traps.length ? '<div class="card"><h2>Exam traps</h2><ul class="traps">' +
        u.traps.map(function (t) { return "<li>" + md(t) + "</li>"; }).join("") + "</ul></div>" : "") +
      "</div>" +
      '<div class="spread no-print">' +
      (prev ? '<a class="btn ghost" href="#/unit/' + prev.id + '">← ' + esc(prev.title) + "</a>" : "<span></span>") +
      (next ? '<a class="btn ghost" href="#/unit/' + next.id + '">' + esc(next.title) + " →</a>" : "") +
      "</div>"
    );
    on("#readBtn", "click", function (e) {
      if (P.read[u.id]) delete P.read[u.id]; else P.read[u.id] = true;
      save("read");
      e.target.textContent = P.read[u.id] ? "✓ Marked read" : "Mark as read";
    });
  };

  /* ---- Flashcards (Leitner boxes) ---- */
  var BOX_DAYS = [0, 0, 1, 3, 7, 14];
  function cardState(id) { return P.cards[id] || { box: 1, due: "" }; }
  function isDue(id) { var c = P.cards[id]; return !c || !c.due || c.due <= today(); }
  function addDays(n) {
    var d = new Date(); d.setDate(d.getDate() + n);
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  VIEWS.cards = function (args) {
    var unit = args[0] === "unit" ? parseInt(args[1], 10) : 0;
    var deckAll = N.glossary.filter(function (g) { return !unit || g.u === unit; });
    var mode = "due";
    var deck = [], i = 0, flipped = false;

    function build() {
      var due = deckAll.filter(function (g) { return isDue(g.id); });
      deck = mode === "due" ? shuffle(due) : shuffle(deckAll);
      i = 0; flipped = false;
    }
    function mastered() { return deckAll.filter(function (g) { return cardState(g.id).box >= 4; }).length; }

    function draw() {
      var head = "<h1>Flashcards</h1>" +
        '<div class="spread" style="margin-bottom:12px"><div class="row">' +
        '<select id="unitSel" aria-label="Unit"><option value="0">All units</option>' +
        UNITS.map(function (u) { return '<option value="' + u.id + '"' + (u.id === unit ? " selected" : "") + ">" + u.id + ". " + esc(u.title) + "</option>"; }).join("") +
        "</select>" +
        '<div class="chips"><button class="chip" data-mode="due" aria-pressed="' + (mode === "due") + '">Due</button><button class="chip" data-mode="all" aria-pressed="' + (mode === "all") + '">All</button><button class="chip" data-mode="list" aria-pressed="' + (mode === "list") + '">Browse</button></div>' +
        '</div><span class="small muted">' + mastered() + " of " + deckAll.length + " mastered</span></div>";

      if (mode === "list") {
        render(head + '<input type="search" id="q" placeholder="Search terms…" style="width:100%;margin-bottom:10px" aria-label="Search terms"><div class="card"><dl class="gloss" id="gl"></dl></div>');
        var fill = function () {
          var term = (document.getElementById("q").value || "").toLowerCase();
          document.getElementById("gl").innerHTML = deckAll
            .filter(function (g) { return !term || g.t.toLowerCase().indexOf(term) >= 0 || g.d.toLowerCase().indexOf(term) >= 0; })
            .sort(function (a, b) { return a.t.localeCompare(b.t); })
            .map(function (g) { return "<dt>" + esc(g.t) + ' <span class="pill">Unit ' + g.u + "</span></dt><dd>" + esc(g.d) + "</dd>"; }).join("") || '<p class="muted">No matches.</p>';
        };
        fill();
        on("#q", "input", fill);
      } else if (i >= deck.length) {
        render(head + '<div class="card result"><span class="big">' + (deck.length ? "Done!" : "All caught up") + "</span>" +
          '<p class="muted">' + (deck.length ? "You went through " + plural(deck.length, "card") + ". Missed cards come back soon, and cards you know come back less often." : "No cards are due right now. Come back tomorrow, or review all cards.") + "</p>" +
          '<button class="btn primary" id="again">Review all cards</button></div>');
        on("#again", "click", function () { mode = "all"; build(); draw(); });
      } else {
        var g = deck[i];
        var st = cardState(g.id);
        render(head +
          '<p class="small muted">Card ' + (i + 1) + " of " + deck.length + " · Unit " + g.u + " · box " + st.box + "/5</p>" +
          '<div class="card flash" id="flash" role="button" tabindex="0" aria-label="Flip card">' +
          (flipped
            ? '<div><div class="term" style="font-size:1.05rem;margin-bottom:10px">' + esc(g.t) + '</div><div class="def">' + esc(g.d) + "</div></div>"
            : '<div><div class="term">' + esc(g.t) + '</div><div class="hint">Tap or press Space to see the definition</div></div>') +
          "</div>" +
          '<div class="row" style="justify-content:center">' +
          (flipped
            ? '<button class="btn danger" id="miss">✗ Missed it <span class="muted small">(1)</span></button><button class="btn primary" id="got">✓ Knew it <span class="small">(2)</span></button>'
            : '<button class="btn primary" id="flip">Show definition</button>') +
          "</div>");
        on("#flash", "click", flip);
        on("#flash", "keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } });
        on("#flip", "click", flip);
        on("#got", "click", function () { grade(true); });
        on("#miss", "click", function () { grade(false); });
      }
      on("#unitSel", "change", function (e) {
        var v = parseInt(e.target.value, 10);
        location.hash = v ? "#/cards/unit/" + v : "#/cards";
      });
      on("[data-mode]", "click", function (e) { mode = e.currentTarget.getAttribute("data-mode"); build(); draw(); });
    }
    function flip() { flipped = !flipped; draw(); }
    function grade(ok) {
      var g = deck[i];
      var st = cardState(g.id);
      var box = ok ? Math.min(5, st.box + 1) : 1;
      P.cards[g.id] = { box: box, due: ok ? addDays(BOX_DAYS[box]) : today() };
      save("cards");
      i++; flipped = false; draw();
    }
    function key(e) {
      if (mode === "list" || e.target.tagName === "SELECT" || e.target.tagName === "INPUT") return;
      if (i >= deck.length) return;
      if (e.key === " " && e.target.id !== "flash") { e.preventDefault(); flip(); }
      else if (flipped && e.key === "1") grade(false);
      else if (flipped && e.key === "2") grade(true);
    }
    document.addEventListener("keydown", key);
    cleanup = function () { document.removeEventListener("keydown", key); };
    build(); draw();
  };

  /* ---- Question runner (shared by practice and math) ---- */
  function numVal(s) {
    var m = String(s).replace(/,/g, "").match(/^\s*\$?\s*(-?\d*\.?\d+)/);
    return m ? parseFloat(m[1]) : null;
  }
  // Numeric choice sets are shown in ascending order (like printed exams); everything else is shuffled.
  function prepQuestion(q) {
    var idx = q.c.map(function (_, k) { return k; });
    var vals = q.c.map(numVal);
    var order = vals.every(function (v) { return v !== null; })
      ? idx.sort(function (a, b) { return vals[a] - vals[b]; })
      : shuffle(idx);
    return { q: q, order: order, correct: order.indexOf(q.a) };
  }
  function questionHTML(item, pickedPos, reveal, headText) {
    var q = item.q;
    var html = '<div class="card"><div class="qhead">' + headText + "</div>" +
      '<div class="qstem">' + esc(q.q) + '</div><div class="choices" role="group" aria-label="Answer choices">' +
      item.order.map(function (orig, pos) {
        var cls = "choice";
        if (reveal) {
          if (pos === item.correct) cls += " right";
          else if (pos === pickedPos) cls += " wrong";
        } else if (pos === pickedPos) cls += " sel";
        return '<button class="' + cls + '" data-pos="' + pos + '"' + (reveal ? " disabled" : "") + ' type="button"><span class="k">' + LETTERS[pos] + "</span><span>" + esc(q.c[orig]) + "</span></button>";
      }).join("") + "</div>";
    if (reveal) {
      var ok = pickedPos === item.correct;
      html += '<div class="feedback ' + (ok ? "right" : "wrong") + '" aria-live="polite"><strong>' + (ok ? "Correct." : "Not quite. The answer is " + LETTERS[item.correct] + ".") + "</strong> " + esc(q.e) + "</div>";
    }
    return html + "</div>";
  }

  /* ---- Practice ---- */
  VIEWS.practice = function (args) {
    var sel = {};
    if (args[0] === "unit" && UNIT[parseInt(args[1], 10)]) sel[parseInt(args[1], 10)] = true;
    var cfg = store.get("practiceCfg", { mode: "smart", count: 20 });
    if (args[0] === "missed") cfg.mode = "missed";

    function pool() {
      var units = Object.keys(sel).map(Number);
      var qs = N.questions.filter(function (q) { return !units.length || sel[q.u]; });
      if (cfg.mode === "missed") qs = qs.filter(function (q) { return P.q[q.id] && P.q[q.id].last === 0; });
      if (cfg.mode === "unseen") qs = qs.filter(function (q) { return !P.q[q.id]; });
      if (cfg.mode === "smart") {
        // unseen and missed first, then the rest
        var pri = function (q) { var r = P.q[q.id]; return !r ? 0 : r.last === 0 ? 1 : 2; };
        qs = shuffle(qs).sort(function (a, b) { return pri(a) - pri(b); });
        return qs;
      }
      return shuffle(qs);
    }

    function setup() {
      var n = pool().length;
      render(
        "<h1>Practice questions</h1>" +
        '<p class="muted">Instant feedback and an explanation for every question. Answer choices are shuffled each time, so you learn the answer, not the letter.</p>' +
        '<div class="card"><h3>Units</h3><div class="chips" id="units">' +
        '<button class="chip" data-u="0" aria-pressed="' + (!Object.keys(sel).length) + '">All units</button>' +
        UNITS.map(function (u) { return '<button class="chip" data-u="' + u.id + '" aria-pressed="' + !!sel[u.id] + '" title="' + esc(u.title) + '">' + u.id + ". " + esc(shortTitle(u.title)) + "</button>"; }).join("") +
        "</div><h3>Mode</h3><div class=\"chips\">" +
        modeChip("smart", "Smart (new & missed first)") + modeChip("unseen", "Unseen only") + modeChip("missed", "Missed last time") + modeChip("random", "Random") +
        '</div><h3>How many</h3><div class="chips">' +
        [10, 20, 50, 0].map(function (c) { return '<button class="chip" data-count="' + c + '" aria-pressed="' + (cfg.count === c) + '">' + (c || "All") + "</button>"; }).join("") +
        '</div><div class="spread" style="margin-top:16px"><span class="muted small">' + plural(n, "question") + ' available</span><button class="btn primary" id="start"' + (n ? "" : " disabled") + ">Start</button></div></div>"
      );
      on("[data-u]", "click", function (e) {
        var u = parseInt(e.currentTarget.getAttribute("data-u"), 10);
        if (!u) sel = {}; else if (sel[u]) delete sel[u]; else sel[u] = true;
        setup();
      });
      on("[data-mode]", "click", function (e) { cfg.mode = e.currentTarget.getAttribute("data-mode"); store.set("practiceCfg", cfg); setup(); });
      on("[data-count]", "click", function (e) { cfg.count = parseInt(e.currentTarget.getAttribute("data-count"), 10); store.set("practiceCfg", cfg); setup(); });
      on("#start", "click", function () {
        var qs = pool();
        if (cfg.count) qs = qs.slice(0, cfg.count);
        run(qs);
      });
    }
    function modeChip(m, label) { return '<button class="chip" data-mode="' + m + '" aria-pressed="' + (cfg.mode === m) + '">' + label + "</button>"; }

    function run(qs) {
      var items = qs.map(prepQuestion);
      var i = 0, right = 0, picked = null, log = [];
      function draw() {
        if (i >= items.length) return done();
        var it = items[i];
        var head = "Question " + (i + 1) + " of " + items.length + " · Unit " + it.q.u + ": " + esc(UNIT[it.q.u].title) + " · " + right + " right";
        render('<div class="bar" style="margin-bottom:12px"><span style="width:' + pct(i, items.length) + '%"></span></div>' +
          questionHTML(it, picked, picked != null, head) +
          '<div class="spread"><button class="btn ghost" id="quit">End session</button>' +
          (picked != null ? '<button class="btn primary" id="next">' + (i + 1 < items.length ? "Next →" : "See results") + "</button>" : '<span class="small muted">Keys 1–4 to answer</span>') + "</div>");
        on(".choice", "click", function (e) { answer(parseInt(e.currentTarget.getAttribute("data-pos"), 10)); });
        on("#next", "click", next);
        on("#quit", "click", done);
        var nb = document.getElementById("next"); if (nb) nb.focus();
      }
      function answer(pos) {
        if (picked != null) return;
        picked = pos;
        var it = items[i], ok = pos === it.correct;
        if (ok) right++;
        recordAnswer(it.q.id, ok);
        log.push({ it: it, pos: pos, ok: ok });
        draw();
      }
      function next() { i++; picked = null; draw(); }
      function done() {
        document.removeEventListener("keydown", key);
        var missed = log.filter(function (l) { return !l.ok; });
        render('<div class="card result"><span class="big">' + right + " / " + log.length + '</span><p class="muted">' + (log.length ? pct(right, log.length) + "% correct" : "No questions answered") + "</p>" +
          '<div class="row" style="justify-content:center"><a class="btn primary" href="#/practice">New session</a>' +
          (missed.length ? '<a class="btn" href="#/practice/missed">Drill missed questions</a>' : "") + "</div></div>" +
          (missed.length ? "<h2>Review what you missed</h2>" + missed.map(function (l) { return questionHTML(l.it, l.pos, true, "Unit " + l.it.q.u); }).join("") : ""));
      }
      function key(e) {
        if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;
        if (picked == null && /^[1-4]$/.test(e.key)) { var p = parseInt(e.key, 10) - 1; if (p < items[i].order.length) answer(p); }
        else if (picked != null && (e.key === "Enter" || e.key === "ArrowRight")) { e.preventDefault(); next(); }
      }
      document.addEventListener("keydown", key);
      cleanup = function () { document.removeEventListener("keydown", key); };
      draw();
    }
    setup();
  };
  function shortTitle(t) {
    return t.replace("Legal Issues: Estates, Liens, Deeds, Closings", "Legal Issues")
      .replace("The Contract of Sales and Leases", "Contracts & Leases")
      .replace("Construction and Environmental Issues", "Construction & Environment")
      .replace("Valuation Process and Pricing Properties", "Valuation")
      .replace("Human Rights and Fair Housing", "Fair Housing")
      .replace("Commercial and Investment Properties", "Commercial & Investment")
      .replace("Income Tax Issues in Real Estate Transactions", "Income Tax")
      .replace("Condominiums and Cooperatives", "Condos & Co-ops")
      .replace("License Law and Regulations", "License Law")
      .replace("Real Estate Mathematics", "Math")
      .replace("Real Estate Finance", "Finance")
      .replace("Land Use Regulations", "Land Use")
      .replace("Taxes and Assessments", "Taxes & Assessments");
  }

  /* ---- Math drills ---- */
  VIEWS.math = function () {
    var kind = store.get("mathKind", "");
    var streak = 0, best = store.get("mathBest", 0), item = null, picked = null, done = 0, right = 0;
    function newItem() { item = prepQuestion(N.math.generate(kind || null)); picked = null; }
    function draw() {
      render("<h1>Math drills</h1>" +
        '<p class="muted">Every problem is freshly generated with new numbers, so you can practice as long as you like. The explanation shows the method.</p>' +
        '<div class="spread" style="margin-bottom:12px"><select id="kind" aria-label="Problem type"><option value="">All problem types</option>' +
        N.math.kinds.map(function (k) { return '<option value="' + k + '"' + (k === kind ? " selected" : "") + ">" + esc(N.math.labels[k]) + "</option>"; }).join("") +
        '</select><span class="small muted">Streak ' + streak + " · best " + best + " · " + right + "/" + done + "</span></div>" +
        questionHTML({ q: item.q, order: item.order, correct: item.correct }, picked, picked != null, esc(item.q.topic)) +
        '<div class="spread"><a class="btn ghost" href="#/unit/10">Formula notes</a>' +
        (picked != null ? '<button class="btn primary" id="next">Next problem →</button>' : '<button class="btn ghost" id="skip">Skip</button>') + "</div>");
      on(".choice", "click", function (e) { answer(parseInt(e.currentTarget.getAttribute("data-pos"), 10)); });
      on("#next", "click", function () { newItem(); draw(); });
      on("#skip", "click", function () { newItem(); draw(); });
      on("#kind", "change", function (e) { kind = e.target.value; store.set("mathKind", kind); newItem(); draw(); });
      var nb = document.getElementById("next"); if (nb) nb.focus();
    }
    function answer(pos) {
      if (picked != null) return;
      picked = pos; done++;
      if (pos === item.correct) { right++; streak++; if (streak > best) { best = streak; store.set("mathBest", best); } }
      else streak = 0;
      draw();
    }
    function key(e) {
      if (e.target.tagName === "SELECT") return;
      if (picked == null && /^[1-4]$/.test(e.key)) answer(parseInt(e.key, 10) - 1);
      else if (picked != null && (e.key === "Enter" || e.key === "ArrowRight")) { e.preventDefault(); newItem(); draw(); }
    }
    document.addEventListener("keydown", key);
    cleanup = function () { document.removeEventListener("keydown", key); };
    newItem(); draw();
  };

  /* ---- Mock exam ---- */
  function buildExam() {
    // Allocate 75 questions across units in proportion to syllabus hours (largest remainder, min 1 each).
    var avail = {};
    UNITS.forEach(function (u) { avail[u.id] = shuffle(N.questions.filter(function (q) { return q.u === u.id; })); });
    var alloc = N.examAllocation(UNITS, EXAM.count);
    // Cap by availability, then refill from other units.
    var picked = [], spare = [];
    UNITS.forEach(function (u) {
      var take = avail[u.id].slice(0, alloc[u.id]);
      picked = picked.concat(take);
      spare = spare.concat(avail[u.id].slice(alloc[u.id]));
    });
    spare = shuffle(spare);
    while (picked.length < EXAM.count && spare.length) picked.push(spare.pop());
    // Keep a syllabus-order feel but mix within the exam.
    return shuffle(picked).map(function (q) {
      var p = prepQuestion(q);
      return { id: q.id, order: p.order, correct: p.correct, pick: null, flag: false };
    });
  }

  VIEWS.exam = function () {
    var ex = store.get("examInProgress", null);
    if (ex && ex.items && ex.items.some(function (it) { return !QBY[it.id]; })) { ex = null; store.del("examInProgress"); }
    var timerId = null;

    function intro() {
      var hist = P.exams.slice(-5).reverse();
      render("<h1>Mock state exam</h1>" +
        '<div class="card"><p><strong>' + EXAM.count + " questions · " + EXAM.minutes + " minutes · pass at " + Math.round(EXAM.pass * 100) + "% (" + Math.ceil(EXAM.count * EXAM.pass) + " correct)</strong></p>" +
        '<p class="muted">Like the real exam, you get no feedback until you submit. Questions are drawn from every unit in proportion to its syllabus hours. You can flag questions and jump around. If you close the page, your exam is saved.</p>' +
        '<div class="row">' + (ex ? '<button class="btn primary" id="resume">Resume exam in progress</button><button class="btn" id="startNew">Start over</button>' : '<button class="btn primary" id="startNew">Start the exam</button>') + "</div></div>" +
        (hist.length ? '<div class="card"><h2>Recent results</h2><table class="nums">' + hist.map(function (h) {
          var p = pct(h.score, h.total);
          return "<tr><td>" + esc(new Date(h.at).toLocaleDateString()) + ' <span class="pill ' + (p >= 70 ? "good" : "bad") + '">' + (p >= 70 ? "pass" : "fail") + "</span></td><td>" + h.score + "/" + h.total + " (" + p + "%)</td></tr>";
        }).join("") + "</table></div>" : ""));
      on("#resume", "click", function () { take(); });
      on("#startNew", "click", function () {
        if (ex && !confirm("Discard the exam in progress and start a new one?")) return;
        ex = { items: buildExam(), cur: 0, started: Date.now(), limit: EXAM.minutes * 60 };
        store.set("examInProgress", ex);
        take();
      });
    }

    function remaining() { return ex.limit - (Date.now() - ex.started) / 1000; }

    function take() {
      function drawQ() {
        var it = ex.items[ex.cur], q = QBY[it.id];
        var answered = ex.items.filter(function (x) { return x.pick != null; }).length;
        render(
          '<div class="spread" style="margin-bottom:10px"><strong>Mock exam</strong><span class="timer" id="timer">' + fmtTime(remaining()) + "</span></div>" +
          '<div class="bar" style="margin-bottom:12px"><span style="width:' + pct(answered, ex.items.length) + '%"></span></div>' +
          questionHTML({ q: q, order: it.order, correct: it.correct }, it.pick, false, "Question " + (ex.cur + 1) + " of " + ex.items.length + (it.flag ? " · ⚑ flagged" : "")) +
          '<div class="spread"><div class="row"><button class="btn" id="prev"' + (ex.cur ? "" : " disabled") + '>← Prev</button><button class="btn" id="flag">' + (it.flag ? "Unflag" : "⚑ Flag") + '</button></div><div class="row">' +
          (ex.cur + 1 < ex.items.length ? '<button class="btn primary" id="nextQ">Next →</button>' : "") +
          '<button class="btn' + (ex.cur + 1 < ex.items.length ? "" : " primary") + '" id="submit">Submit exam</button></div></div>' +
          '<div class="card" style="margin-top:14px"><div class="spread" style="margin-bottom:8px"><strong>Questions</strong><span class="small muted">' + answered + " answered</span></div><div class=\"navgrid\">" +
          ex.items.map(function (x, n) {
            return '<button class="' + (x.pick != null ? "done " : "") + (n === ex.cur ? "cur " : "") + (x.flag ? "flag" : "") + '" data-go="' + n + '" aria-label="Question ' + (n + 1) + '">' + (n + 1) + "</button>";
          }).join("") + "</div></div>"
        );
        on(".choice", "click", function (e) { it.pick = parseInt(e.currentTarget.getAttribute("data-pos"), 10); persist(); drawQ(); });
        on("#prev", "click", function () { ex.cur--; persist(); drawQ(); });
        on("#nextQ", "click", function () { ex.cur++; persist(); drawQ(); });
        on("#flag", "click", function () { it.flag = !it.flag; persist(); drawQ(); });
        on("[data-go]", "click", function (e) { ex.cur = parseInt(e.currentTarget.getAttribute("data-go"), 10); persist(); drawQ(); });
        on("#submit", "click", function () {
          var left = ex.items.filter(function (x) { return x.pick == null; }).length;
          if (!confirm(left ? "You have " + plural(left, "unanswered question") + ". Submit anyway?" : "Submit your exam?")) return;
          finish();
        });
      }
      function tick() {
        var t = document.getElementById("timer");
        var rem = remaining();
        if (rem <= 0) { finish(true); return; }
        if (t) { t.textContent = fmtTime(rem); t.classList.toggle("low", rem < 300); }
      }
      function key(e) {
        if (/^[1-4]$/.test(e.key)) { ex.items[ex.cur].pick = parseInt(e.key, 10) - 1; persist(); drawQ(); }
        else if (e.key === "ArrowRight" && ex.cur + 1 < ex.items.length) { ex.cur++; persist(); drawQ(); }
        else if (e.key === "ArrowLeft" && ex.cur > 0) { ex.cur--; persist(); drawQ(); }
      }
      if (remaining() <= 0) { finish(true); return; }
      document.addEventListener("keydown", key);
      timerId = setInterval(tick, 1000);
      cleanup = function () { clearInterval(timerId); document.removeEventListener("keydown", key); };
      drawQ();
    }
    function persist() { store.set("examInProgress", ex); }

    function finish(timeUp) {
      if (timerId) clearInterval(timerId);
      if (cleanup) { try { cleanup(); } catch {} cleanup = null; }
      var score = 0, units = {};
      ex.items.forEach(function (it) {
        var q = QBY[it.id], ok = it.pick === it.correct;
        if (ok) score++;
        units[q.u] = units[q.u] || [0, 0];
        units[q.u][1]++; if (ok) units[q.u][0]++;
        if (it.pick != null) recordAnswer(it.id, ok);
      });
      var result = { at: Date.now(), score: score, total: ex.items.length, units: units, time: Math.min(ex.limit, Math.round((Date.now() - ex.started) / 1000)) };
      P.exams.push(result); save("exams");
      var finished = ex; ex = null; store.del("examInProgress");
      var p = pct(score, result.total), passed = score >= Math.ceil(result.total * EXAM.pass);
      var weak = Object.keys(units).map(Number).sort(function (a, b) { return units[a][0] / units[a][1] - units[b][0] / units[b][1]; });
      render(
        '<div class="card result"><span class="pill ' + (passed ? "good" : "bad") + '" style="font-size:0.95rem">' + (passed ? "PASS" : "NOT YET") + "</span>" +
        '<span class="big">' + score + " / " + result.total + "</span>" +
        '<p class="muted">' + p + "% · " + (timeUp ? "time expired" : "finished in " + fmtTime(result.time)) + " · passing is " + Math.ceil(result.total * EXAM.pass) + " correct</p>" +
        '<div class="row" style="justify-content:center"><a class="btn primary" href="#/practice/missed">Drill missed questions</a><button class="btn" id="again">New exam</button></div></div>' +
        '<div class="card"><h2>By unit (weakest first)</h2><table class="nums">' +
        weak.map(function (u) {
          var r = units[u], up = pct(r[0], r[1]);
          return '<tr><td><a href="#/unit/' + u + '">' + u + ". " + esc(UNIT[u].title) + "</a></td><td>" + r[0] + "/" + r[1] + ' <span class="pill ' + (up >= 80 ? "good" : up >= 60 ? "warn" : "bad") + '">' + up + "%</span></td></tr>";
        }).join("") + "</table></div>" +
        "<h2>Review every question</h2>" +
        finished.items.map(function (it, n) {
          var q = QBY[it.id];
          var pick = it.pick == null ? -1 : it.pick;
          return questionHTML({ q: q, order: it.order, correct: it.correct }, pick, true, "Question " + (n + 1) + " · Unit " + q.u + (it.pick == null ? " · unanswered" : ""));
        }).join("")
      );
      on("#again", "click", function () { location.hash = "#/exam"; VIEWS.exam(); });
    }

    intro();
  };

  /* ---- Progress ---- */
  VIEWS.progress = function () {
    var o = overall();
    render("<h1>Your progress</h1>" +
      '<p class="muted">Saved only in this browser on this device. Use export and import to move it to another device.</p>' +
      '<div class="stats">' + stat(readiness() + "%", "exam readiness") + stat(o.seen + "/" + N.questions.length, "questions tried") +
      stat(o.acc == null ? "—" : Math.round(o.acc * 100) + "%", "overall accuracy") + stat(String(P.exams.length), "mock exams taken") + "</div>" +
      '<div class="card"><h2>By unit</h2><table class="nums">' +
      UNITS.map(function (u) {
        var s = unitStats(u.id);
        var la = s.lastAcc == null ? null : Math.round(s.lastAcc * 100);
        return '<tr><td><a href="#/unit/' + u.id + '">' + u.id + ". " + esc(shortTitle(u.title)) + '</a><div class="bar ' + (la == null ? "" : la >= 80 ? "good" : la >= 60 ? "warn" : "bad") + '" style="margin-top:6px"><span style="width:' + pct(s.seen, s.total) + '%"></span></div></td>' +
          '<td class="small">' + s.seen + "/" + s.total + " seen" + (la == null ? "" : "<br>" + la + "% right") + "</td></tr>";
      }).join("") + "</table>" +
      '<p class="small muted" style="margin-top:8px">Bar length = share of the unit\'s questions you\'ve tried. Color = accuracy on your latest attempt at each (green 80%+, amber 60%+, red below).</p></div>' +
      '<div class="card"><h2>Backup</h2><div class="row"><button class="btn" id="exp">Export progress</button><label class="btn" for="imp">Import progress</label><input type="file" id="imp" accept="application/json" style="display:none"><button class="btn danger" id="reset">Reset everything</button></div></div>'
    );
    on("#exp", "click", function () {
      var blob = new Blob([JSON.stringify({ app: "ny-real-estate-prep", v: 1, at: new Date().toISOString(), data: P }, null, 1)], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = "ny-re-prep-progress-" + today() + ".json";
      document.body.appendChild(a); a.click(); a.remove();
    });
    on("#imp", "change", function (e) {
      var f = e.target.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        try {
          var j = JSON.parse(r.result);
          if (!j || j.app !== "ny-real-estate-prep" || !j.data) throw new Error("bad file");
          ["q", "cards", "exams", "road", "read"].forEach(function (k) { if (j.data[k]) { P[k] = j.data[k]; save(k); } });
          alert("Progress imported."); VIEWS.progress();
        } catch { alert("That file doesn't look like a progress export."); }
      };
      r.readAsText(f);
    });
    on("#reset", "click", function () {
      if (!confirm("Erase all progress, flashcard boxes, exam history and checklist marks on this device?")) return;
      ["q", "cards", "exams", "road", "read", "examInProgress"].forEach(store.del);
      P.q = {}; P.cards = {}; P.exams = []; P.road = {}; P.read = {};
      VIEWS.progress();
    });
  };

  /* ---- Tutor (hosted builds only) ---- */
  function progressSnapshot() {
    var o = overall();
    return {
      readiness: readiness(),
      questionsTried: o.seen,
      accuracy: o.acc == null ? null : Math.round(o.acc * 100) + "%",
      units: UNITS.map(function (u) {
        var s = unitStats(u.id);
        return { id: u.id, title: shortTitle(u.title), seen: s.seen, total: s.total, acc: s.lastAcc == null ? null : Math.round(s.lastAcc * 100) };
      }),
      exams: P.exams.slice(-3).map(function (e) { return { date: new Date(e.at).toISOString().slice(0, 10), score: e.score, total: e.total }; }),
      roadmap: N.roadmap.steps.filter(function (st) { return P.road[st.id]; }).map(function (st) { return st.title; }),
      cardsMastered: N.glossary.filter(function (g) { return cardState(g.id).box >= 4; }).length,
      unitsRead: Object.keys(P.read).map(Number),
    };
  }
  function tutorText(s) {
    var lines = esc(s).split(/\n/), out = "", inList = false;
    lines.forEach(function (l) {
      var b = l.match(/^\s*[-•*]\s+(.*)$/);
      l = (b ? b[1] : l).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      if (b) { if (!inList) { out += "<ul>"; inList = true; } out += "<li>" + l + "</li>"; }
      else { if (inList) { out += "</ul>"; inList = false; } if (l.trim()) out += "<p>" + l + "</p>"; }
    });
    return out + (inList ? "</ul>" : "");
  }
  VIEWS.tutor = function (args) {
    if (!TUTOR_API) { location.hash = "#/"; return; }
    var unit = args[0] === "unit" && UNIT[parseInt(args[1], 10)] ? parseInt(args[1], 10) : null;
    var busy = false;
    render('<div class="spread"><h1 style="margin:0">Your tutor</h1><span class="pill" id="tstatus">connecting…</span></div>' +
      '<p class="muted small" style="margin-top:6px">Ask anything about the exam or the course. Your tutor remembers your past sessions and can see your progress in this app.</p>' +
      '<div class="card chat" id="chat" aria-live="polite"><p class="muted">Loading your conversation…</p></div>' +
      '<div class="chips" id="sugg" style="margin-bottom:10px">' +
      ["Quiz me on my weakest unit", "Explain dual agency with designated sales agents", "Make me a study plan for the next 2 weeks", "What numbers should I memorize for license law?"]
        .map(function (q) { return '<button class="chip" data-q="' + esc(q) + '">' + esc(q) + "</button>"; }).join("") + "</div>" +
      '<form id="tform" class="chatform"><textarea id="tmsg" rows="2" maxlength="4000" placeholder="Ask your tutor…" aria-label="Message"></textarea>' +
      '<button class="btn primary" id="tsend" type="submit">Send</button></form>');
    var chat = document.getElementById("chat"), box = document.getElementById("tmsg");
    try { box.value = sessionStorage.getItem("nyre.tdraft") || (unit ? "Help me with Unit " + unit + ": " + UNIT[unit].title + ". " : ""); } catch {}
    function bubble(role, text, extra) {
      var d = document.createElement("div");
      d.className = "msg " + (role === "user" ? "me" : "bot") + (extra ? " " + extra : "");
      d.innerHTML = role === "user" ? "<p>" + esc(text).replace(/\n/g, "<br>") + "</p>" : tutorText(text);
      chat.appendChild(d);
      chat.scrollTop = chat.scrollHeight;
      return d;
    }
    function status(ok, text) {
      var el = document.getElementById("tstatus");
      if (el) { el.textContent = text; el.className = "pill " + (ok ? "good" : "warn"); }
    }
    fetch(TUTOR_API + "/history", { credentials: "same-origin" }).then(function (r) {
      return r.json().then(function (j) { return { ok: r.ok, code: r.status, j: j }; });
    }).then(function (res) {
      chat.innerHTML = "";
      if (!res.ok) {
        status(false, res.code === 402 ? "no access" : "offline");
        bubble("assistant", res.code === 402 ? "Your tutor access isn't active." : "Your tutor is offline right now (the computer it runs on may be asleep). Your study tools all still work. Try again later.");
        return;
      }
      status(res.j.model_ready, res.j.model_ready ? "online" : "starting up");
      if (!res.j.messages.length) bubble("assistant", "Hi " + res.j.name + "! I'm your study tutor for the NY salesperson exam. Tell me when you're planning to take the exam and how far along you are in the 77-hour course, and we'll make a plan. Or tap one of the suggestions below.");
      res.j.messages.forEach(function (m) { bubble(m.role, m.content); });
    }).catch(function () {
      chat.innerHTML = "";
      status(false, "offline");
      bubble("assistant", "I can't reach your tutor right now. Check your connection and try again.");
    });
    function send(text) {
      text = (text || "").trim();
      if (!text || busy) return;
      busy = true;
      document.getElementById("tsend").disabled = true;
      bubble("user", text);
      box.value = ""; try { sessionStorage.removeItem("nyre.tdraft"); } catch {}
      var wait = bubble("assistant", "Thinking…", "typing");
      fetch(TUTOR_API + "/chat", {
        method: "POST", credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, unit: unit, progress: progressSnapshot() }),
      }).then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (j) { return { code: r.status, j: j }; });
      }).then(function (res) {
        wait.remove();
        if (res.code === 200 && res.j.reply) { bubble("assistant", res.j.reply); status(true, "online"); }
        else if (res.code === 429) bubble("assistant", "Let's take a short breather. You've sent a lot of messages in the last hour. Try again in a few minutes.", "err");
        else if (res.code === 401) { bubble("assistant", "Your session expired. Please sign in again.", "err"); }
        else { status(false, "offline"); bubble("assistant", "Your tutor didn't answer (it may be offline or busy). Your message was kept, so try again in a minute.", "err"); }
      }).catch(function () {
        wait.remove();
        bubble("assistant", "Network error. Try again.", "err");
      }).then(function () {
        busy = false;
        var b = document.getElementById("tsend"); if (b) b.disabled = false;
      });
    }
    on("#tform", "submit", function (e) { e.preventDefault(); send(box.value); });
    on("#tmsg", "keydown", function (e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(box.value); } });
    on("#tmsg", "input", function () { try { sessionStorage.setItem("nyre.tdraft", box.value); } catch {} });
    on("[data-q]", "click", function (e) { send(e.currentTarget.getAttribute("data-q")); });
  };

  /* ---- About ---- */
  VIEWS.about = function () {
    render("<h1>About this study kit</h1>" +
      '<div class="card"><p><strong>What it is:</strong> a free, open-source study aid for the New York State real estate salesperson exam. It follows the official 77-hour syllabus (effective Dec. 21, 2022) and the Department of State\'s Real Estate License Law booklet (March 2026 edition), plus later changes checked in September 2026 (for example, the 2024 Property Condition Disclosure amendments, the updated DOS-2156 form, the 3-year Division of Human Rights filing window, and the NYC FARE Act).</p>' +
      "<p><strong>What it is not:</strong> it does <em>not</em> replace the 77-hour course. NY law requires that course from a DOS-approved school before you can be licensed (see <a href=\"#/roadmap\">Get licensed</a> for a free option). It is not legal, tax or financial advice. Laws and fees change, so always confirm with the <a href=\"https://dos.ny.gov/real-estate-agent\" rel=\"noopener\">Department of State</a>.</p>" +
      "<p><strong>Questions and notes</strong> are original writing. They are not copied from any exam, course or book, and they aren't real state exam questions. Where a rule comes from a statute or regulation, the explanation names it so you can look it up.</p>" +
      '<p><strong>Privacy:</strong> no accounts, no tracking. Your progress stays in your browser.</p>' +
      '<p><strong>Open source:</strong> code under the MIT license, content under CC BY 4.0. Found a mistake or have a better question? Contributions are welcome at <a href="https://github.com/willykeenan/ny-real-estate-prep" rel="noopener">github.com/willykeenan/ny-real-estate-prep</a>.</p></div>' +
      '<div class="card"><h2>Primary sources</h2><ul class="small">' +
      '<li><a href="https://dos.ny.gov/real-estate-salesperson-77-hour-curriculum-eff-12212022" rel="noopener">NYS DOS 77-hour salesperson curriculum</a></li>' +
      '<li><a href="https://dos.ny.gov/system/files/documents/2026/03/real-estate-license-law_03.2026.pdf" rel="noopener">NY Real Estate License Law, March 2026 (RPL Art. 12-A, 19 NYCRR Parts 175–179)</a></li>' +
      '<li><a href="https://dos.ny.gov/real-estate-agent" rel="noopener">DOS: Become a Real Estate Salesperson</a> and <a href="https://dos.ny.gov/real-estate-salesperson-frequently-asked-questions" rel="noopener">FAQ</a></li>' +
      '<li><a href="https://dos.ny.gov/housing-and-anti-discrimination-disclosure-form" rel="noopener">DOS-2156 Housing and Anti-Discrimination Disclosure Form</a></li>' +
      '<li><a href="https://dos.ny.gov/real-estate-course-providers" rel="noopener">DOS approved schools</a></li>' +
      "</ul></div>" +
      '<p class="small muted">' + N.questions.length + " questions · " + N.glossary.length + " flashcards · " + N.math.kinds.length + " math problem types · 19 units</p>");
  };

  /* ---------- boot ---------- */
  route();
  if (!document.documentElement.hasAttribute("data-no-sw") && "serviceWorker" in navigator && /^https?:$/.test(location.protocol) && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }
})();

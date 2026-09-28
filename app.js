/* Landmark Prep — single-page app. Vanilla JS, no build step, works offline.
 * Two tracks: "ny" (full New York 77-hour syllabus) and "us" (national exam core for every other state).
 * Progress is stored only in this browser (localStorage). Export/import moves it between devices. */
(function () {
  "use strict";
  var N = window.NYRE;
  N.nationalUnits = N.nationalUnits || [];
  N.states = N.states || [];
  var $main = document.getElementById("main");
  var ROOT = document.documentElement;
  // Optional hosted features, switched on by attributes on <html> (all off in the open-source build):
  //   data-tutor-api="/path"     → shows the Tutor tab (POST {base}/chat, GET {base}/history)
  //   data-logout="/path"        → adds a sign-out link
  //   data-default-state="NY"    → preselects a state for a private deployment
  //   data-no-sw                 → skip the offline service worker
  //   data-default-palette="blush" → starting color theme for a private deployment
  //   data-user-name="Sam"       → greets the signed-in student by name
  //   data-default-ai="claude"   → which assistant the "Ask" buttons open (default ChatGPT)
  // With data-tutor-api set, study progress also syncs to the student's account ({base}/state).
  var TUTOR_API = ROOT.getAttribute("data-tutor-api");
  var LOGOUT = ROOT.getAttribute("data-logout");
  var DEFAULT_STATE = ROOT.getAttribute("data-default-state");
  var DEFAULT_PALETTE = ROOT.getAttribute("data-default-palette") || "classic";
  var USER_NAME = ROOT.getAttribute("data-user-name");
  var DEFAULT_AI = ROOT.getAttribute("data-default-ai") || "chatgpt";

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
  function ymd(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function today() { return ymd(new Date()); }
  function fmtDate(iso) { return new Date(iso + "T12:00:00").toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" }); }
  function addDays(n) { var d = new Date(); d.setDate(d.getDate() + n); return ymd(d); }
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
      onStoreSet(k);
    },
    del: function (k) {
      delete mem[k];
      try { localStorage.removeItem("nyre." + k); } catch { /* ignore */ }
    },
  };
  var P = {
    q: store.get("q", {}),          // id -> {s: seen, r: right, w: wrong, last: 1|0}
    cards: store.get("cards", {}),  // id -> {box, due}
    exams: store.get("exams", []),  // [{at, score, total, units:{u:[r,t]}, track}]
    road: store.get("road", {}),    // stepId -> true
    read: store.get("read", {}),    // unitId -> true
    state: store.get("state", DEFAULT_STATE || null),
    plan: store.get("plan", {}),    // {hours: course hours done, target: "YYYY-MM-DD"}
  };
  function save(k) { store.set(k, P[k]); }

  /* ---------- sync (hosted builds): progress follows the student across devices ---------- */
  var SYNC_KEYS = ["q", "cards", "exams", "road", "read", "state", "plan", "palette", "ai"];
  var SYNC_DEFAULTS = { q: {}, cards: {}, exams: [], road: {}, read: {}, state: DEFAULT_STATE || null, plan: {} };
  var sync = { on: !!TUTOR_API, timer: null, quiet: false, status: "local", at: 0 };
  function onStoreSet(k) {
    if (!sync || !sync.on || sync.quiet || SYNC_KEYS.indexOf(k) < 0) return;
    sync.quiet = true; store.set("savedAt", Date.now()); sync.quiet = false;
    clearTimeout(sync.timer); sync.timer = setTimeout(function () { pushState(false); }, 2500);
  }
  function pushState(keepalive) {
    if (!sync.on) return;
    clearTimeout(sync.timer); sync.timer = null;
    var data = {};
    SYNC_KEYS.forEach(function (k) { var v = store.get(k, undefined); if (v !== undefined) data[k] = v; });
    var body = JSON.stringify({ data: data, savedAt: store.get("savedAt", 0) || Date.now() });
    fetch(TUTOR_API + "/state", { method: "POST", credentials: "same-origin", keepalive: !!keepalive && body.length < 60000, headers: { "Content-Type": "application/json" }, body: body })
      .then(function (r) { sync.status = r.ok ? "synced" : "local"; if (r.ok) sync.at = Date.now(); })
      .catch(function () { sync.status = "local"; });
  }
  function pullState() {
    if (!sync.on) return;
    fetch(TUTOR_API + "/state", { credentials: "same-origin" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) { sync.status = "local"; return; }
        var local = store.get("savedAt", 0);
        if (j.data && j.savedAt > local) {
          // Another device saved more recently: take its copy.
          sync.quiet = true;
          SYNC_KEYS.forEach(function (k) {
            if (k === "palette" || k === "ai") { if (j.data[k]) store.set(k, j.data[k]); return; }
            var v = j.data[k] !== undefined ? j.data[k] : SYNC_DEFAULTS[k];
            store.set(k, v); P[k] = v;
          });
          store.set("savedAt", j.savedAt);
          sync.quiet = false;
          applyPalette(store.get("palette", DEFAULT_PALETTE));
          sync.status = "synced"; sync.at = Date.now();
          route();
        } else if (local > (j.savedAt || 0)) {
          pushState(false);
        } else {
          sync.status = "synced"; sync.at = Date.now();
        }
      })
      .catch(function () { sync.status = "local"; });
  }
  function syncLine() {
    if (sync.status !== "synced") return "Saved on this device. It syncs to your account whenever you're online.";
    return "Saved to your account, so it follows you to your phone and laptop" + (sync.at ? " (last synced " + new Date(sync.at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) + ")." : ".");
  }
  function recordAnswer(id, ok) {
    var r = P.q[id] || { s: 0, r: 0, w: 0, last: 0 };
    r.s++; if (ok) r.r++; else r.w++; r.last = ok ? 1 : 0;
    P.q[id] = r; save("q");
  }

  /* ---------- states & tracks ---------- */
  var STATE_NAMES = {
    AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware",
    DC: "District of Columbia", FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
    KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota",
    MS: "Mississippi", MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
    NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon",
    PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah",
    VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
  };
  var FULL_STATES = { NY: true }; // states with a complete state-law course; others use the national core
  var STATE_FACTS = {};
  N.states.forEach(function (s) { STATE_FACTS[s.code] = s; });
  function stateName(c) { return c ? STATE_NAMES[c] || c : null; }
  function track() { return P.state && FULL_STATES[P.state] ? "ny" : "us"; }
  var NY_TERMS = /New York|\bNYS?\b|\bNYC\b|NYCRR|\bRPL\b|\bDOS\b|HSTPA|SONYMA|\bSTAR\b|\bSCAR\b|Article 12-A|Lien Law|Martin Act|Human Rights Law/;
  // Glossary cards from the NY syllabus that also belong in the national core, filed under the national topic.
  var NY_TO_US = { 1: 110, 2: 105, 3: 109, 4: 107, 5: 104, 6: 102, 7: 106, 8: 103, 9: 110, 10: 111, 11: 102, 12: 109, 13: 110, 14: 102, 15: 101, 16: 108, 17: 110, 18: 104, 19: 108 };

  function unitsFor(t) {
    var list = t === "ny" ? N.units : N.nationalUnits;
    return list.slice().sort(function (a, b) { return a.id - b.id; });
  }
  var UNIT = {};
  N.units.concat(N.nationalUnits).forEach(function (u) { UNIT[u.id] = u; });
  function inTrack(u, t) { return t === "ny" ? u >= 1 && u <= 19 : u >= 101 && u <= 111; }
  function questionsFor(t) { return N.questions.filter(function (q) { return inTrack(q.u, t); }); }
  function glossaryFor(t) {
    if (t === "ny") return N.glossary;
    return N.glossary
      .filter(function (g) { return !NY_TERMS.test(g.t + " " + g.d); })
      .map(function (g) { return { id: g.id, t: g.t, d: g.d, u: NY_TO_US[g.u] || 101 }; });
  }
  function examConfig(t) {
    if (t === "ny") return { count: 75, minutes: 90, pass: 0.7, label: "New York salesperson exam format: 75 questions, 90 minutes, 70% to pass." };
    var f = STATE_FACTS[P.state] || {};
    var n = f.nationalQuestions || 80;
    return {
      count: Math.min(n, 100), minutes: Math.round(Math.min(n, 100) * 1.5), pass: 0.7,
      label: "National-portion practice: " + Math.min(n, 100) + " questions" + (f.nationalQuestions ? " (the scored national section in " + stateName(P.state) + ")" : "") + ". Your state section is separate.",
    };
  }
  var MATH_NY_ONLY = { transferTax: true, recordingTax: true, mansionTax: true };
  function mathKinds() { return N.math.kinds.filter(function (k) { return track() === "ny" || !MATH_NY_ONLY[k]; }); }

  /* ---------- header ---------- */
  var tabsEl = document.querySelector(".tabs");
  if (TUTOR_API) {
    var t0 = document.createElement("a");
    t0.href = "#/tutor"; t0.setAttribute("data-tab", "tutor"); t0.textContent = "Tutor";
    tabsEl.insertBefore(t0, tabsEl.children[1]);
  }
  if (LOGOUT) {
    var foot = document.querySelector(".foot p");
    if (foot) { var lo = document.createElement("a"); lo.href = LOGOUT; lo.textContent = "Sign out"; foot.appendChild(document.createTextNode(" · ")); foot.appendChild(lo); }
  }
  function paintStateButton() {
    var b = document.getElementById("stateBtn");
    if (!b) return;
    b.innerHTML = P.state
      ? '<span class="abbr">' + esc(P.state) + '</span><span class="name">' + esc(stateName(P.state)) + "</span>"
      : '<span class="abbr">US</span><span class="name">Choose your state</span>';
  }
  function applyTheme(t) {
    if (t === "auto") ROOT.removeAttribute("data-theme"); else ROOT.setAttribute("data-theme", t);
  }
  applyTheme(store.get("theme", "auto"));
  // Color themes live in styles.css under :root[data-palette="…"]; every text pair is WCAG AA.
  var PALETTES = [
    { id: "classic", name: "Classic", desc: "Navy and gold", swatch: ["#0d1b3e", "#d8a94b", "#f7f5f0"], meta: "#0d1b3e" },
    { id: "blush", name: "Blush", desc: "Pink and white", swatch: ["#c2185b", "#ffc1da", "#ffffff"], meta: "#8c1d4f" },
    { id: "lavender", name: "Lavender", desc: "Soft purple", swatch: ["#6941c6", "#d4c2ff", "#ffffff"], meta: "#3b2a7a" },
  ];
  function applyPalette(id) {
    var pal = PALETTES.filter(function (x) { return x.id === id; })[0] || PALETTES[0];
    if (pal.id === "classic") ROOT.removeAttribute("data-palette"); else ROOT.setAttribute("data-palette", pal.id);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", pal.meta);
  }
  applyPalette(store.get("palette", DEFAULT_PALETTE));

  /* ---------- Work alongside ChatGPT or Claude ----------
   * The "Ask" buttons open the student's own ChatGPT or Claude with a ready-made prompt, so they use
   * their own plan and we never handle their AI account. ChatGPT sends ?q= straight away; Claude
   * fills it in, and we also copy the prompt in case it doesn't. */
  var AIS = {
    chatgpt: { name: "ChatGPT", url: function (q) { return "https://chatgpt.com/?q=" + encodeURIComponent(q); } },
    claude: { name: "Claude", url: function (q) { return "https://claude.ai/new?q=" + encodeURIComponent(q); } },
  };
  // The read-only Landmark Prep connector (MCP) that ChatGPT or Claude can add by address.
  var MCP_URL = "https://landmark-prep.vercel.app/mcp";
  function aiPref() { var a = store.get("ai", DEFAULT_AI); return AIS[a] ? a : "chatgpt"; }
  function aiName() { return AIS[aiPref()].name; }
  function examName() {
    if (track() === "ny") return "New York real estate salesperson exam";
    return P.state ? stateName(P.state) + " real estate salesperson exam (the national portion)" : "real estate salesperson license exam";
  }
  function clip(t, n) { t = String(t); return t.length > n ? t.slice(0, n - 1) + "\u2026" : t; }
  function aiLink(label, prompt, cls) {
    prompt = clip(prompt, 1800);
    return '<a class="btn ' + (cls || "") + ' ai-btn" href="' + esc(AIS[aiPref()].url(prompt)) + '" target="_blank" rel="noopener" data-ai-prompt="' + esc(prompt) + '">' +
      esc(label.replace("{ai}", aiName())) + " \u2197</a>";
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest(".ai-btn");
    if (!a || aiPref() !== "claude" || !navigator.clipboard) return;
    navigator.clipboard.writeText(a.getAttribute("data-ai-prompt")).catch(function () {});
  });
  function promptQuestion(q, pickedText) {
    var correct = q.c[q.a];
    return "I'm studying for the " + examName() + ". Help me understand this practice question.\n\n" +
      "Question: " + q.q + "\nChoices:\n" + q.c.map(function (c, i) { return LETTERS[i] + ") " + c; }).join("\n") +
      "\nCorrect answer: " + correct + (pickedText && pickedText !== correct ? "\nI picked: " + pickedText : "") +
      "\n\nExplain why the correct answer is right and why the others are wrong, give me a memory trick, then ask me one similar question and wait for my answer.";
  }
  function promptUnit(u) {
    return "I'm studying for the " + examName() + '. Teach me the topic "' + u.title + '". Start with the key rules, the numbers to memorize and the common exam traps, in short bullets. ' +
      "Then quiz me one multiple-choice question at a time and wait for my answer before explaining.\n\nMy study notes cover: " + u.sections.map(function (x) { return x.h; }).join("; ") + ".";
  }
  function promptStep(s) {
    return "I'm working toward my " + (P.state ? stateName(P.state) + " " : "") + "real estate salesperson license. My next step is: " + s.title + ". " + stepNext(s) +
      "\n\nWalk me through exactly how to do this: what to prepare, the order of steps, costs, and common mistakes. Ask me anything you need to tailor it to my situation." +
      (track() === "ny" ? " Stick to official sources (dos.ny.gov, dmv.ny.gov) and tell me when something should be double-checked there." : "");
  }
  function promptWeakSpots() {
    var ranked = unitsFor(track()).map(function (u) { return { u: u, st: unitStats(u.id) }; })
      .filter(function (x) { return x.st.seen > 0; })
      .sort(function (a, b) { return (a.st.lastAcc || 0) - (b.st.lastAcc || 0); }).slice(0, 3);
    if (!ranked.length) {
      return "I'm starting to study for the " + examName() + ". Give me a quick overview of what the exam covers, then quiz me with 5 mixed multiple-choice questions, one at a time, waiting for my answer each time.";
    }
    return "I'm studying for the " + examName() + ". My weakest topics right now: " +
      ranked.map(function (x) { return shortTitle(x.u.title) + " (" + Math.round((x.st.lastAcc || 0) * 100) + "% on my latest tries)"; }).join(", ") +
      ". Quiz me on these, one multiple-choice question at a time. Wait for my answer, explain briefly, and keep a running score.";
  }
  function promptMisses(items) {
    return "I'm studying for the " + examName() + ". I missed these questions on a practice exam. For each one, explain the rule behind the correct answer in plain words. Then quiz me on similar questions, one at a time.\n\n" +
      items.slice(0, 6).map(function (q, i) { return (i + 1) + ". " + clip(q.q, 220) + " (Correct: " + clip(q.c[q.a], 120) + ")"; }).join("\n");
  }
  function promptTerm(g) {
    return "I'm studying for the " + examName() + '. Explain the term "' + g.t + '" simply (my notes say: ' + clip(g.d, 300) + "). Give me a real-life example and a memory trick, then quiz me on it with one question.";
  }
  document.getElementById("stateBtn").addEventListener("click", function () { openStatePicker(); });

  /* ---------- state picker (dialog) ---------- */
  function openStatePicker(onPick) {
    var d = document.getElementById("stateDialog");
    if (!d) {
      d = document.createElement("dialog");
      d.id = "stateDialog"; d.className = "sheet";
      document.body.appendChild(d);
    }
    var codes = Object.keys(STATE_NAMES).sort(function (a, b) { return STATE_NAMES[a].localeCompare(STATE_NAMES[b]); });
    d.innerHTML = '<div class="sheet-in"><div class="spread"><div><span class="eyebrow">Where are you getting licensed?</span><h2 style="margin:6px 0 0">Choose your state</h2></div>' +
      '<button class="btn ghost" data-close type="button">Close</button></div>' +
      '<div class="legend"><span><i style="background:var(--navy)"></i>Full state course (state law + national)</span><span><i style="background:var(--surface-2);border:1px solid var(--border-2)"></i>National exam core + your state\'s official requirements (state law coming)</span></div>' +
      '<div class="statepick">' + codes.map(function (c) {
        return '<button type="button" data-state="' + c + '" class="' + (FULL_STATES[c] ? "full " : "") + (c === P.state ? "cur" : "") + '"><span class="abbr">' + c + "</span>" + esc(STATE_NAMES[c]) + "</button>";
      }).join("") + "</div></div>";
    d.querySelectorAll("[data-state]").forEach(function (b) {
      b.addEventListener("click", function () {
        P.state = b.getAttribute("data-state"); save("state");
        paintStateButton();
        close();
        if (onPick) onPick(); else route();
      });
    });
    d.querySelector("[data-close]").addEventListener("click", close);
    function close() { if (d.open) { if (d.close) d.close(); else d.removeAttribute("open"); } }
    if (d.showModal) { if (!d.open) d.showModal(); } else d.setAttribute("open", "");
  }

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
    var units = unitsFor(track());
    var total = units.reduce(function (s, u) { return s + (u.hours || 1); }, 0) || 1;
    var score = 0;
    units.forEach(function (u) {
      var s = unitStats(u.id);
      if (!s.total || s.lastAcc == null) return;
      var coverage = Math.min(1, s.seen / Math.max(1, Math.min(s.total, 10)));
      score += ((u.hours || 1) / total) * coverage * s.lastAcc;
    });
    return Math.round(score * 100);
  }
  function overall() {
    var seen = 0, right = 0, ans = 0, t = track();
    Object.keys(P.q).forEach(function (id) {
      var q = QBY[id]; if (!q || !inTrack(q.u, t)) return;
      seen++; right += P.q[id].r; ans += P.q[id].s;
    });
    return { seen: seen, acc: ans ? right / ans : null, total: questionsFor(t).length };
  }
  function ring(value, light) {
    var r = 50, c = 2 * Math.PI * r, off = c * (1 - Math.max(0, Math.min(100, value)) / 100);
    return '<svg class="ring' + (light ? " onlight" : "") + '" viewBox="0 0 120 120" role="img" aria-label="Exam readiness ' + value + ' percent">' +
      '<circle class="track" cx="60" cy="60" r="' + r + '" fill="none" stroke-width="10"/>' +
      '<circle class="fill" cx="60" cy="60" r="' + r + '" fill="none" stroke-width="10" stroke-linecap="round" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '" transform="rotate(-90 60 60)"/>' +
      '<text x="60" y="69" text-anchor="middle">' + value + "%</text></svg>";
  }

  /* ---------- router ---------- */
  var cleanup = null;
  function route() {
    if (cleanup) { try { cleanup(); } catch { /* ignore */ } cleanup = null; }
    var h = location.hash.replace(/^#\/?/, "");
    var parts = h.split("/").filter(Boolean);
    var name = parts[0] || "home";
    var tab = { unit: "study", terms: "about", privacy: "about", refunds: "about" }[name] || name;
    document.querySelectorAll(".tabs a").forEach(function (a) {
      var on = a.getAttribute("data-tab") === tab;
      a.classList.toggle("on", on);
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    paintStateButton();
    var view = VIEWS[name] || VIEWS.home;
    view(parts.slice(1));
    window.scrollTo(0, 0);
    $main.focus({ preventScroll: true });
  }
  window.addEventListener("hashchange", route);
  function render(html) { $main.innerHTML = html; }
  function on(sel, ev, fn) { $main.querySelectorAll(sel).forEach(function (el) { el.addEventListener(ev, fn); }); }
  function pagehead(eyebrow, title, lead) {
    return '<header class="pagehead"><span class="eyebrow">' + esc(eyebrow) + "</span><h1>" + title + "</h1>" + (lead ? "<p>" + lead + "</p>" : "") + "</header>";
  }
  function stateNudge() {
    if (P.state) return "";
    return '<div class="banner blue"><div><strong>Which state are you getting licensed in?</strong> <span class="muted">Pick yours to tailor the notes, exam and roadmap.</span></div><button class="btn primary" id="pickState" type="button">Choose your state</button></div>';
  }
  function bindNudge() { on("#pickState", "click", function () { openStatePicker(); }); }

  var VIEWS = {};

  /* ---- Home ---- */
  VIEWS.home = function () {
    var t = track(), o = overall(), units = unitsFor(t);
    var last = P.exams.filter(function (e) { return (e.track || "ny") === t; }).slice(-1)[0];
    var sname = P.state ? stateName(P.state) : "real estate";
    var qn = questionsFor(t).length, gn = glossaryFor(t).length;
    var basis = t === "ny" ? "the official New York 77-hour syllabus" : "the national exam content outline";
    // Signed in (private deployment): her next step comes first, greeted by name.
    var first = USER_NAME ? journeyCard() : "";
    render(
      (USER_NAME && !P.state ? '<p class="greet">Hi ' + esc(USER_NAME) + ".</p>" : "") + first +
      '<section class="hero"><div class="hero-grid"><div>' +
      '<span class="eyebrow">Real estate license exam prep' + (P.state ? " · " + esc(stateName(P.state)) : "") + "</span>" +
      "<h1>Pass the " + (P.state ? "<em>" + esc(sname) + "</em> real estate" : "real estate <em>license</em>") + " exam.</h1>" +
      '<p class="lead">Clear study notes, ' + (qn ? qn + " practice questions" : "practice questions") + ' that explain every answer, flashcards that adapt to you, and timed mock exams. Built on ' + basis + (TUTOR_API ? "." : ". Free, no account needed.") + "</p>" +
      '<div class="cta"><a class="btn primary lg" href="#/study">Start studying</a>' +
      (P.state ? '<a class="btn ghost lg" href="#/exam">Take a practice exam</a>' : '<button class="btn ghost lg" id="heroState" type="button">Choose your state</button>') + "</div>" +
      '<div class="trust">' + (TUTOR_API ? ["Every answer explained", "Your own tutor", "Syncs across devices", "Private to you"] : ["Every answer explained", "Works offline", "Open source", "No sign-up"]).map(function (x) { return "<span>" + x + "</span>"; }).join("") + "</div>" +
      "</div>" +
      '<div class="hero-panel"><div class="ringwrap">' + ring(readiness()) + '<div><b>Exam readiness</b><span class="k">Weighted by how much each topic counts. Goes up as you practice.</span></div></div>' +
      '<div class="mini"><div><span class="v">' + o.seen + '</span><span class="k">questions tried</span></div>' +
      '<div><span class="v">' + (o.acc == null ? "—" : Math.round(o.acc * 100) + "%") + '</span><span class="k">accuracy</span></div>' +
      '<div><span class="v">' + (last ? pct(last.score, last.total) + "%" : "—") + '</span><span class="k">last mock</span></div></div></div>' +
      "</div></section>" +
      stateNudge() +
      (first ? "" : journeyCard()) +
      '<div class="bento">' +
      '<a class="tile feature" href="#/roadmap"><span class="eyebrow">Get licensed</span><span class="num">' + (t === "ny" ? "$80" : "Step by step") + '</span><span class="t">' + (t === "ny" ? "The cheapest legal path to a New York license" : "Your state's official path to a license") + '</span><span class="d">' + (t === "ny" ? "A free state-approved course, free library proctoring, the $15 exam and the $65 license." : "Education hours, exam format and where to apply, with links to the official sources.") + '</span><span class="go">See the roadmap →</span></a>' +
      '<a class="tile dark" href="#/exam"><span class="eyebrow" style="color:var(--gold-2)">Mock exam</span><span class="num">' + examConfig(t).count + ' questions</span><span class="t">Timed, weighted like the real thing</span><span class="d">No feedback until you submit, then a full review and a topic-by-topic breakdown.</span><span class="go">Start a mock exam →</span></a>' +
      '<a class="tile" href="#/study"><span class="num">' + units.length + '</span><span class="t">Topics of study notes</span><span class="d">The rule, the number to memorize, and the trap, for every topic.</span><span class="go">Study →</span></a>' +
      '<a class="tile" href="#/practice"><span class="num">' + (qn || "—") + '</span><span class="t">Practice questions</span><span class="d">By topic, unseen, or the ones you missed last time.</span><span class="go">Practice →</span></a>' +
      '<a class="tile" href="#/cards"><span class="num">' + gn + '</span><span class="t">Flashcards</span><span class="d">Spaced repetition brings back what you miss.</span><span class="go">Flip cards →</span></a>' +
      "</div>" +
      "<h2>A simple study plan</h2>" +
      '<div class="plan">' +
      "<div><b>Take the required course</b><span>Every state requires pre-licensing hours from an approved school. Read the matching topic here as you go.</span></div>" +
      "<div><b>10 minutes of flashcards a day</b><span>The deck brings back the cards you miss and spaces out the ones you know.</span></div>" +
      "<div><b>Drill the math weekly</b><span>Unlimited fresh problems until every formula is automatic.</span></div>" +
      "<div><b>Mock exams in the final 2 weeks</b><span>Then drill your misses. Book the real exam once you score 80%+ consistently.</span></div>" +
      "</div>" +
      '<div class="banner ai-banner" style="margin-top:22px"><div><strong>Study with ' + esc(aiName()) + ".</strong> <span class=\"muted\">Every question, topic and step has a button that opens your own " + esc(aiName()) + " with everything it needs to help, on your own plan. Pick ChatGPT or Claude in Settings.</span></div>" +
        '<div class="row">' + aiLink("Quiz me on my weak spots", promptWeakSpots(), "dark") + (TUTOR_API ? '<a class="btn" href="#/tutor">Ask your tutor</a>' : "") + "</div></div>"
    );
    on("#heroState", "click", function () { openStatePicker(); });
    bindNudge();
    bindJourney();
  };

  /* ---- Your next step (the licensing path, one step at a time) ---- */
  function journeySteps() {
    if (!P.state) return [];
    return track() === "ny" ? N.roadmap.steps : genericSteps(P.state);
  }
  function courseStepId() { return track() === "ny" ? "course" : P.state + "-course"; }
  function courseHoursTotal() { return track() === "ny" ? 77 : ((STATE_FACTS[P.state] || {}).prelicenseHours || null); }
  function stepNext(s) { return s.next || (s.body && s.body[0] ? s.body[0].replace(/\*\*/g, "") : ""); }
  function stepAction(s) { return s.action || (s.links && s.links[0]) || null; }
  function paceLine() {
    var total = courseHoursTotal(), plan = P.plan || {};
    if (!total) return "";
    var done = Math.max(0, Math.min(total, Number(plan.hours) || 0)), left = total - done;
    if (left <= 0) return "All " + total + " hours done. Book your course final next.";
    if (!plan.target) return left + " hours to go. Pick a date to finish and you'll get a weekly pace.";
    var days = Math.ceil((new Date(plan.target + "T23:59:59") - Date.now()) / 86400000);
    if (days <= 0) return "That date has passed. Pick a new one.";
    var perWeek = Math.max(1, Math.ceil(left / Math.max(1, days / 7)));
    return "About " + perWeek + " hour" + (perWeek === 1 ? "" : "s") + " a week finishes the remaining " + left + " hours by " + fmtDate(plan.target) + ".";
  }
  function journeyCard() {
    var steps = journeySteps();
    if (!steps.length) return "";
    var open = steps.filter(function (s) { return !P.road[s.id]; });
    var done = steps.length - open.length;
    var bar = '<div class="jbar" role="progressbar" aria-label="Licensing path" aria-valuemin="0" aria-valuemax="' + steps.length + '" aria-valuenow="' + done + '"><span style="width:' + pct(done, steps.length) + '%"></span></div>';
    if (!open.length) return '<section class="card journey' + (USER_NAME ? " top" : "") + '"><span class="eyebrow">' + (USER_NAME ? "Hi " + esc(USER_NAME) + " · your path" : "Your path") + "</span>" + bar + "<h2>Every step is done. You're licensed.</h2><p class=\"muted\">Keep your continuing education on track for renewal.</p></section>";
    var s = open[0], then = open[1], act = stepAction(s), total = courseHoursTotal(), plan = P.plan || {};
    var planRow = !P.road[courseStepId()] && total
      ? '<div class="jplan"><label>Course hours done <input type="number" id="jHours" inputmode="numeric" min="0" max="' + total + '" step="1" value="' + esc(String(plan.hours || "")) + '" placeholder="0"> of ' + total + "</label>" +
        '<label>Finish the course by <input type="date" id="jTarget" min="' + today() + '" value="' + esc(plan.target || "") + '"></label>' +
        '<p class="pace" id="jPace">' + esc(paceLine()) + "</p></div>"
      : "";
    return '<section class="card journey' + (USER_NAME ? " top" : "") + '" aria-labelledby="jTitle"><span class="eyebrow">' + (USER_NAME ? "Hi " + esc(USER_NAME) + " · your next step · " : "Your next step · ") + (done + 1) + " of " + steps.length + "</span>" + bar +
      '<h2 id="jTitle">' + esc(s.title) + "</h2><p>" + esc(stepNext(s)) + "</p>" +
      '<div class="row">' + (act ? '<a class="btn primary" href="' + esc(act[1]) + '" target="_blank" rel="noopener">' + esc(act[0]) + " \u2197</a>" : "") +
      aiLink("Help me with this in {ai}", promptStep(s)) +
      '<button class="btn" type="button" data-jdone="' + esc(s.id) + '">Mark this done</button><a class="btn ghost" href="#/roadmap">See every step</a></div>' +
      planRow + (then ? '<p class="small muted jthen">Then: ' + esc(then.title) + "</p>" : "") + "</section>";
  }
  function bindJourney() {
    on("[data-jdone]", "click", function (e) { P.road[e.currentTarget.getAttribute("data-jdone")] = true; save("road"); VIEWS.home(); });
    function savePlan() {
      var h = document.getElementById("jHours"), t = document.getElementById("jTarget");
      if (!h || !t) return;
      var total = courseHoursTotal() || 0, hours = Math.max(0, Math.min(total, parseInt(h.value, 10) || 0));
      P.plan = { hours: hours, target: t.value || "" }; save("plan");
      var pace = document.getElementById("jPace"); if (pace) pace.textContent = paceLine();
    }
    on("#jHours", "change", savePlan);
    on("#jTarget", "change", savePlan);
  }

  /* ---- Roadmap ---- */
  function nyRoadmap() {
    var R = N.roadmap;
    var total = R.minimumCost.reduce(function (s, r) { return s + r[1]; }, 0);
    return pagehead("New York", "How to get your NY salesperson license", "Checked against the NY Department of State in " + esc(R.checkedOn) + ". Fees and school offers change, so confirm on the linked official pages.") +
      '<div class="card costhero"><div class="fig">$' + total + "<small>minimum out-of-pocket</small></div>" +
      '<table class="costs">' + R.minimumCost.map(function (r) { return "<tr><td>" + esc(r[0]) + "</td><td>$" + r[1] + "</td></tr>"; }).join("") +
      '<tr class="total"><td><strong>Total</strong></td><td>$' + total + "</td></tr></table></div>" +
      stepsHTML(R.steps);
  }
  function stepsHTML(steps) {
    return '<ol class="steps">' + steps.map(function (s) {
      var done = !!P.road[s.id];
      return '<li class="step' + (done ? " done" : "") + '"><div class="card">' +
        '<div class="spread"><h2>' + esc(s.title) + '</h2><span class="cost">' + esc(s.cost) + "</span></div>" +
        '<div class="notes" style="margin-top:8px"><ul>' + s.body.map(function (b) { return "<li>" + md(b) + "</li>"; }).join("") + "</ul></div>" +
        (s.links && s.links.length ? '<p class="small" style="margin-top:12px">' + s.links.map(function (l) { return '<a href="' + esc(l[1]) + '" target="_blank" rel="noopener">' + esc(l[0]) + " ↗</a>"; }).join(" · ") + "</p>" : "") +
        '<label class="check"><input type="checkbox" data-step="' + esc(s.id) + '"' + (done ? " checked" : "") + "> Mark done</label>" +
        "</div></li>";
    }).join("") + "</ol>";
  }
  function genericSteps(code) {
    var f = STATE_FACTS[code] || {};
    var name = stateName(code);
    var agency = f.agency || name + "'s real estate commission";
    var link = f.url ? [["Official site: " + agency, f.url]] : [];
    var examBits = [];
    if (f.examVendor) examBits.push("The exam is given by **" + f.examVendor + "**.");
    if (f.nationalQuestions || f.stateQuestions) examBits.push("Scored questions: " + (f.nationalQuestions ? "**" + f.nationalQuestions + " national**" : "") + (f.nationalQuestions && f.stateQuestions ? " + " : "") + (f.stateQuestions ? "**" + f.stateQuestions + " state**" : "") + ".");
    if (f.passingScore) examBits.push("Passing score: **" + f.passingScore + "**.");
    return [
      { id: code + "-eligible", title: "Check the requirements", cost: "$0", body: ["Age, education and background rules are set by the **" + agency + "**. Read them on the official site before you pay for anything."], links: link },
      { id: code + "-course", title: "Complete your pre-licensing education", cost: "varies", body: [(f.prelicenseHours ? "**" + f.prelicenseHours + " hours** of pre-licensing education" : "Your state's required pre-licensing hours") + " from a school approved by the " + agency + ". Only an approved school's certificate counts.", "Use Landmark Prep alongside the course to lock in the national concepts and practice for the exam."], links: [] },
      { id: code + "-exam", title: "Schedule and pass the state exam", cost: "varies", body: examBits.length ? examBits : ["Exam scheduling, format and fees are on the official site."], links: link },
      { id: code + "-broker", title: "Find a sponsoring broker", cost: "$0", body: ["Most states require new salespersons to work under a licensed broker. Interview a few about training, splits and fees."], links: [] },
      { id: code + "-apply", title: "Apply for your license", cost: "varies", body: ["Submit the application, fees and any background check or fingerprints your state requires." + (f.notes ? " " + f.notes : "")], links: link },
    ];
  }
  VIEWS.roadmap = function () {
    var html;
    if (track() === "ny") html = nyRoadmap();
    else if (!P.state) {
      html = pagehead("Get licensed", "Your path to a real estate license", "Every state sets its own rules. Choose yours to see the official requirements and steps.") +
        '<div class="card" style="text-align:center;padding:40px"><p class="muted">No state selected yet.</p><button class="btn primary lg" id="pickState" type="button">Choose your state</button></div>';
    } else {
      var f = STATE_FACTS[P.state];
      html = pagehead(stateName(P.state), "How to get your " + esc(stateName(P.state)) + " license", f ? (f.verified ? "Every number here is quoted from an official source, checked " + esc(f.verified) + ". Rules change, so confirm on the official site before you pay for anything." : "We could not confirm this state's numbers from an official source yet. Use the official site below.") : "Detailed requirements for this state are being verified. Until then, follow the official regulator's site.") +
        (f ? factsGrid(f) : "") +
        stepsHTML(genericSteps(P.state)) +
        citations(f);
    }
    render(html);
    bindNudge();
    on("input[data-step]", "change", function (e) {
      var id = e.target.getAttribute("data-step");
      if (e.target.checked) P.road[id] = true; else delete P.road[id];
      save("road");
      e.target.closest(".step").classList.toggle("done", e.target.checked);
    });
  };
  var FACT_LABELS = { prelicenseHours: "Pre-licensing hours", examVendor: "Exam vendor", nationalQuestions: "National questions", stateQuestions: "State questions", passingScore: "Passing score" };
  // Every quoted fact shows the exact words and the official page it came from.
  function citations(f) {
    if (!f) return "";
    var ev = f.evidence || {};
    var keys = Object.keys(FACT_LABELS).filter(function (k) { return ev[k]; });
    if (!keys.length) return '<p class="small muted">Sources: <a href="' + esc(f.url) + '" target="_blank" rel="noopener">' + esc(f.agency || "official site") + "</a></p>";
    return '<details class="card cites"><summary>Where each number comes from</summary><ul>' + keys.map(function (k) {
      var host = ev[k].url.replace(/^https:\/\//, "").split("/")[0];
      return "<li><strong>" + esc(FACT_LABELS[k]) + ":</strong> \u201c" + esc(ev[k].quote) + '\u201d <a href="' + esc(ev[k].url) + '" target="_blank" rel="noopener">' + esc(host) + " \u2197</a></li>";
    }).join("") + "</ul></details>";
  }
  // Confirmed facts get a tile; anything unconfirmed is named once, quietly, instead of five empty tiles.
  function factsGrid(f) {
    var shown = fact("Regulator", f.agency), missing = [];
    Object.keys(FACT_LABELS).forEach(function (k) {
      if (f[k] === null || f[k] === undefined || f[k] === "") missing.push(FACT_LABELS[k].toLowerCase());
      else shown += fact(FACT_LABELS[k], f[k]);
    });
    return '<div class="facts" style="margin-bottom:' + (missing.length ? "8px" : "18px") + '">' + shown + "</div>" +
      (missing.length ? '<p class="small muted" style="margin:0 0 18px">Not confirmed from an official source yet: ' + esc(missing.join(", ")) + ".</p>" : "");
  }
  function fact(k, v) { return '<div class="f"><span class="k">' + esc(k) + '</span><span class="v">' + (v == null || v === "" ? '<span class="muted">not confirmed yet</span>' : esc(v)) + "</span></div>"; }

  /* ---- Study ---- */
  VIEWS.study = function () {
    var t = track(), units = unitsFor(t);
    var head = t === "ny"
      ? pagehead("New York · 77-hour syllabus", "Study notes", "All 19 subjects from the official New York syllabus, in order. Hours show how much class time the state gives each subject, which hints at how much of the exam it covers.")
      : pagehead((P.state ? stateName(P.state) + " · " : "") + "National exam core", "Study notes", "The topics every state's national exam section covers. Your state's own laws are taught in your required pre-licensing course; state-law notes here are coming.");
    if (!units.length) {
      render(head + stateNudge() + '<div class="card" style="text-align:center;padding:40px"><p><strong>National notes are being finalized.</strong></p><p class="muted">Pick New York for the complete course today, or check back soon.</p></div>');
      bindNudge(); return;
    }
    render(head + stateNudge() + '<div class="units">' + units.map(function (u) {
      var s = unitStats(u.id);
      var acc = s.lastAcc == null ? "" : '<span class="pill ' + (s.lastAcc >= 0.8 ? "good" : s.lastAcc >= 0.6 ? "warn" : "bad") + '">' + Math.round(s.lastAcc * 100) + "% right</span>";
      return '<a class="ucard" href="#/unit/' + u.id + '"><div class="top-row"><span class="unit-num">' + unitLabel(u) + '</span><span class="pill">' + plural(u.hours || 1, "hr") + "</span></div>" +
        '<span class="title">' + esc(u.title) + (P.read[u.id] ? ' <span class="pill good">read</span>' : "") + "</span>" +
        '<div class="meter" title="Questions tried"><span style="width:' + pct(s.seen, s.total) + '%"></span></div>' +
        '<div class="meta"><span>' + s.seen + " of " + s.total + " questions tried</span>" + acc + "</div></a>";
    }).join("") + "</div>");
    bindNudge();
  };
  function unitLabel(u) { return u.id > 100 ? String(u.id - 100) : String(u.id); }

  VIEWS.unit = function (args) {
    var id = parseInt(args[0], 10);
    var u = UNIT[id];
    if (!u) { location.hash = "#/study"; return; }
    var t = id > 100 ? "us" : "ny";
    var list = unitsFor(t), idx = list.indexOf(u);
    var prev = list[idx - 1], next = list[idx + 1];
    var qn = N.questions.filter(function (q) { return q.u === id; }).length;
    var gn = glossaryFor(t).filter(function (g) { return g.u === id; }).length;
    render(
      '<section class="unithead"><span class="big">' + unitLabel(u) + '</span><div><span class="eyebrow">' + (t === "ny" ? "New York syllabus" : "National exam core") + " · " + plural(u.hours || 1, "hour") + "</span>" +
      "<h1>" + esc(u.title) + "</h1><p>" + md(u.intro) + "</p>" +
      '<div class="row no-print">' +
      (qn ? '<a class="btn primary" href="#/practice/unit/' + u.id + '">Practice ' + plural(qn, "question") + "</a>" : "") +
      (u.id === 10 || u.id === 111 ? '<a class="btn" href="#/math">Math drills</a>' : "") +
      (gn ? '<a class="btn" href="#/cards/unit/' + u.id + '">' + plural(gn, "flashcard") + "</a>" : "") +
      aiLink("Study this with {ai}", promptUnit(u)) +
      (TUTOR_API ? '<a class="btn" href="#/tutor/unit/' + u.id + '">Ask the tutor</a>' : "") +
      '<button class="btn" id="readBtn" type="button">' + (P.read[u.id] ? "✓ Marked read" : "Mark as read") + "</button></div></div></section>" +
      '<div class="unitlayout"><nav class="toc" aria-label="On this page"><span class="eyebrow">On this page</span>' +
      u.sections.map(function (s, i) { return '<button type="button" data-sec="' + i + '">' + esc(s.h) + "</button>"; }).join("") +
      (u.numbers && u.numbers.length ? '<button type="button" data-sec="nums">Numbers to know</button>' : "") +
      (u.traps && u.traps.length ? '<button type="button" data-sec="traps">Exam traps</button>' : "") +
      '</nav><div class="notes">' +
      u.sections.map(function (s, i) { return '<section class="card" id="sec-' + i + '"><h2>' + esc(s.h) + "</h2><ul>" + s.b.map(function (b) { return "<li>" + md(b) + "</li>"; }).join("") + "</ul></section>"; }).join("") +
      (u.numbers && u.numbers.length ? '<section class="card" id="sec-nums"><h2>Numbers to know</h2><div class="nums">' +
        u.numbers.map(function (n) { return '<div class="n"><span class="k">' + md(n[0]) + '</span><span class="v">' + md(n[1]) + "</span></div>"; }).join("") + "</div></section>" : "") +
      (u.traps && u.traps.length ? '<section class="card traps" id="sec-traps"><h2>Exam traps</h2>' +
        u.traps.map(function (x) { return '<div class="trap"><span>' + md(x) + "</span></div>"; }).join("") + "</section>" : "") +
      '<div class="spread no-print">' +
      (prev ? '<a class="btn ghost" href="#/unit/' + prev.id + '">← ' + esc(prev.title) + "</a>" : "<span></span>") +
      (next ? '<a class="btn ghost" href="#/unit/' + next.id + '">' + esc(next.title) + " →</a>" : "") +
      "</div></div></div>"
    );
    on("[data-sec]", "click", function (e) {
      var el = document.getElementById("sec-" + e.currentTarget.getAttribute("data-sec"));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
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

  VIEWS.cards = function (args) {
    var t = track();
    var unit = args[0] === "unit" ? parseInt(args[1], 10) : 0;
    var all = glossaryFor(t);
    var deckAll = all.filter(function (g) { return !unit || g.u === unit; });
    var mode = "due", deck = [], i = 0, flipped = false;
    function build() {
      deck = mode === "due" ? shuffle(deckAll.filter(function (g) { return isDue(g.id); })) : shuffle(deckAll);
      i = 0; flipped = false;
    }
    function mastered() { return deckAll.filter(function (g) { return cardState(g.id).box >= 4; }).length; }
    function draw() {
      var units = unitsFor(t);
      var head = pagehead("Flashcards", "Flashcards", "Key terms from the " + (t === "ny" ? "New York syllabus" : "national exam") + ". Tap a card to flip it; the ones you miss come back sooner.") +
        '<div class="spread" style="margin-bottom:18px"><div class="row">' +
        '<select id="unitSel" aria-label="Topic"><option value="0">All topics</option>' +
        units.map(function (u) { return '<option value="' + u.id + '"' + (u.id === unit ? " selected" : "") + ">" + unitLabel(u) + ". " + esc(u.title) + "</option>"; }).join("") +
        "</select>" +
        '<div class="chips"><button class="chip" data-mode="due" aria-pressed="' + (mode === "due") + '">Due</button><button class="chip" data-mode="all" aria-pressed="' + (mode === "all") + '">All</button><button class="chip" data-mode="list" aria-pressed="' + (mode === "list") + '">Browse</button></div>' +
        '</div><span class="pill blue">' + mastered() + " of " + deckAll.length + " mastered</span></div>";
      if (mode === "list") {
        render(head + '<input type="search" id="q" placeholder="Search terms…" style="width:100%;margin-bottom:12px" aria-label="Search terms"><div class="card"><dl class="gloss" id="gl"></dl></div>');
        var fill = function () {
          var term = (document.getElementById("q").value || "").toLowerCase();
          document.getElementById("gl").innerHTML = deckAll
            .filter(function (g) { return !term || g.t.toLowerCase().indexOf(term) >= 0 || g.d.toLowerCase().indexOf(term) >= 0; })
            .sort(function (a, b) { return a.t.localeCompare(b.t); })
            .map(function (g) { return "<dt>" + esc(g.t) + "</dt><dd>" + esc(g.d) + "</dd>"; }).join("") || '<p class="muted">No matches.</p>';
        };
        fill(); on("#q", "input", fill);
      } else if (i >= deck.length) {
        render(head + '<div class="card result"><span class="big">' + (deck.length ? "Done" : "All caught up") + "</span>" +
          '<p class="muted">' + (deck.length ? "You went through " + plural(deck.length, "card") + ". Missed cards come back soon; known cards come back less often." : "No cards are due right now. Come back tomorrow, or review the whole deck.") + "</p>" +
          '<button class="btn primary" id="again">Review all cards</button></div>');
        on("#again", "click", function () { mode = "all"; build(); draw(); });
      } else {
        var g = deck[i], st = cardState(g.id);
        var dots = ""; for (var k = 1; k <= 5; k++) dots += "<i" + (k <= st.box ? ' class="on"' : "") + "></i>";
        render(head +
          '<div class="deck"><div class="spread small muted" style="margin-bottom:10px"><span>Card ' + (i + 1) + " of " + deck.length + '</span><span>Memory <span class="boxdots" aria-label="box ' + st.box + ' of 5">' + dots + "</span></span></div>" +
          '<div class="flash' + (flipped ? " flipped" : "") + '" id="flash" role="button" tabindex="0" aria-label="Flip card">' +
          '<div class="face front"><div><div class="term">' + esc(g.t) + '</div><div class="hint">Tap or press Space to flip</div></div></div>' +
          '<div class="face back"><div><div class="defterm">' + esc(g.t) + '</div><div class="def">' + esc(g.d) + "</div></div></div></div></div>" +
          '<div class="row" style="justify-content:center">' +
          (flipped
            ? '<button class="btn danger lg" id="miss">Missed it <span class="muted small">1</span></button><button class="btn primary lg" id="got">Knew it <span class="small">2</span></button>'
            : '<button class="btn primary lg" id="flip">Show definition</button>') +
          "</div>" + (flipped ? '<p class="ask center">' + aiLink("Explain this term with {ai}", promptTerm(g), "sm ghost") + "</p>" : ""));
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
    function flip() {
      flipped = !flipped;
      var el = document.getElementById("flash");
      if (el && flipped) { el.classList.add("flipped"); setTimeout(draw, 10); } else draw();
    }
    function grade(ok) {
      var g = deck[i], st = cardState(g.id);
      var box = ok ? Math.min(5, st.box + 1) : 1;
      P.cards[g.id] = { box: box, due: ok ? addDays(BOX_DAYS[box]) : today() };
      save("cards");
      i++; flipped = false; draw();
    }
    function key(e) {
      if (mode === "list" || e.target.tagName === "SELECT" || e.target.tagName === "INPUT" || i >= deck.length) return;
      if (e.key === " " && e.target.id !== "flash") { e.preventDefault(); flip(); }
      else if (flipped && e.key === "1") grade(false);
      else if (flipped && e.key === "2") grade(true);
    }
    document.addEventListener("keydown", key);
    cleanup = function () { document.removeEventListener("keydown", key); };
    build(); draw();
  };

  /* ---- Question runner (shared by practice, math and exam) ---- */
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
  function questionHTML(item, pickedPos, reveal, headLeft, headRight) {
    var q = item.q;
    var html = '<div class="card qcard"><div class="qhead"><span>' + headLeft + "</span><span>" + (headRight || "") + "</span></div>" +
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
      var pickedText = pickedPos >= 0 && pickedPos < item.order.length ? q.c[item.order[pickedPos]] : "";
      html += '<div class="feedback ' + (ok ? "right" : "wrong") + '" aria-live="polite"><span class="verdict">' + (ok ? "Correct." : "Not quite. The answer is " + LETTERS[item.correct] + ".") + "</span> " + esc(q.e) +
        '<div class="ask no-print">' + aiLink("Go deeper with {ai}", promptQuestion(q, pickedText), "sm") + "</div></div>";
    }
    return html + "</div>";
  }
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

  /* ---- Practice ---- */
  VIEWS.practice = function (args) {
    var t = track();
    var sel = {};
    if (args[0] === "unit" && UNIT[parseInt(args[1], 10)]) sel[parseInt(args[1], 10)] = true;
    var cfg = store.get("practiceCfg", { mode: "smart", count: 20 });
    if (args[0] === "missed") cfg.mode = "missed";
    function base() {
      var units = Object.keys(sel).map(Number);
      var trackForSel = units.length && units[0] > 100 ? "us" : units.length ? "ny" : t;
      return questionsFor(trackForSel).filter(function (q) { return !units.length || sel[q.u]; });
    }
    function pool() {
      var qs = base();
      if (cfg.mode === "missed") qs = qs.filter(function (q) { return P.q[q.id] && P.q[q.id].last === 0; });
      if (cfg.mode === "unseen") qs = qs.filter(function (q) { return !P.q[q.id]; });
      if (cfg.mode === "smart") {
        var pri = function (q) { var r = P.q[q.id]; return !r ? 0 : r.last === 0 ? 1 : 2; };
        return shuffle(qs).sort(function (a, b) { return pri(a) - pri(b); });
      }
      return shuffle(qs);
    }
    function setup() {
      var n = pool().length, units = unitsFor(t);
      render(pagehead("Practice", "Practice questions", "Instant feedback and an explanation for every question. Answer choices are shuffled each time, so you learn the answer, not the letter.") +
        stateNudge() +
        '<div class="card setup"><h3>Topics</h3><div class="chips" id="units">' +
        '<button class="chip" data-u="0" aria-pressed="' + (!Object.keys(sel).length) + '">All topics</button>' +
        units.map(function (u) { return '<button class="chip" data-u="' + u.id + '" aria-pressed="' + !!sel[u.id] + '" title="' + esc(u.title) + '">' + unitLabel(u) + ". " + esc(shortTitle(u.title)) + "</button>"; }).join("") +
        "</div><h3>Mode</h3><div class=\"chips\">" +
        modeChip("smart", "New and missed first") + modeChip("unseen", "Unseen only") + modeChip("missed", "Missed last time") + modeChip("random", "Random") +
        '</div><h3>How many</h3><div class="chips">' +
        [10, 20, 50, 0].map(function (c) { return '<button class="chip" data-count="' + c + '" aria-pressed="' + (cfg.count === c) + '">' + (c || "All") + "</button>"; }).join("") +
        '</div><div class="spread" style="margin-top:22px"><span class="muted small">' + plural(n, "question") + ' available</span><button class="btn primary lg" id="start"' + (n ? "" : " disabled") + ">Start</button></div></div>");
      bindNudge();
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
        render('<div class="qcard"><div class="bar" style="margin-bottom:14px"><span style="width:' + pct(i, items.length) + '%"></span></div></div>' +
          questionHTML(it, picked, picked != null, "Question " + (i + 1) + " of " + items.length + " · " + esc(shortTitle(UNIT[it.q.u].title)), right + " right") +
          '<div class="qcard spread"><button class="btn ghost" id="quit">End session</button>' +
          (picked != null ? '<button class="btn primary" id="next">' + (i + 1 < items.length ? "Next question" : "See results") + "</button>" : '<span class="small muted">Tip: keys 1–4 answer</span>') + "</div>");
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
        render('<div class="card result qcard"><span class="eyebrow">Session complete</span><span class="big">' + right + " / " + log.length + '</span><p class="muted">' + (log.length ? pct(right, log.length) + "% correct" : "No questions answered") + "</p>" +
          '<div class="row" style="justify-content:center"><a class="btn primary" href="#/practice">New session</a>' +
          (missed.length ? '<a class="btn" href="#/practice/missed">Drill missed questions</a>' : "") + "</div></div>" +
          (missed.length ? '<div class="qcard"><h2>Review what you missed</h2></div>' + missed.map(function (l) { return questionHTML(l.it, l.pos, true, esc(shortTitle(UNIT[l.it.q.u].title))); }).join("") : ""));
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

  /* ---- Math drills ---- */
  VIEWS.math = function () {
    var kinds = mathKinds();
    var kind = store.get("mathKind", "");
    if (kind && kinds.indexOf(kind) < 0) kind = "";
    var streak = 0, best = store.get("mathBest", 0), item = null, picked = null, done = 0, right = 0;
    function newItem() {
      var k = kind || kinds[Math.floor(Math.random() * kinds.length)];
      item = prepQuestion(N.math.generate(k)); picked = null;
    }
    function draw() {
      render(pagehead("Math", "Math drills", "Every problem is freshly generated with new numbers, so you can practice as long as you like. The explanation shows the method.") +
        '<div class="qcard spread" style="margin-bottom:14px"><select id="kind" aria-label="Problem type"><option value="">All problem types</option>' +
        kinds.map(function (k) { return '<option value="' + k + '"' + (k === kind ? " selected" : "") + ">" + esc(N.math.labels[k]) + "</option>"; }).join("") +
        '</select><span class="pill blue">Streak ' + streak + " · best " + best + " · " + right + "/" + done + "</span></div>" +
        questionHTML({ q: item.q, order: item.order, correct: item.correct }, picked, picked != null, esc(item.q.topic)) +
        '<div class="qcard spread"><a class="btn ghost" href="#/unit/' + (track() === "ny" ? 10 : 111) + '">Formula notes</a>' +
        (picked != null ? '<button class="btn primary" id="next">Next problem</button>' : '<button class="btn ghost" id="skip">Skip</button>') + "</div>");
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
  function buildExam(t, cfg) {
    var units = unitsFor(t);
    var avail = {};
    units.forEach(function (u) { avail[u.id] = shuffle(N.questions.filter(function (q) { return q.u === u.id; })); });
    var alloc = N.examAllocation(units, cfg.count);
    var picked = [], spare = [];
    units.forEach(function (u) {
      picked = picked.concat(avail[u.id].slice(0, alloc[u.id]));
      spare = spare.concat(avail[u.id].slice(alloc[u.id]));
    });
    spare = shuffle(spare);
    while (picked.length < cfg.count && spare.length) picked.push(spare.pop());
    return shuffle(picked).map(function (q) {
      var p = prepQuestion(q);
      return { id: q.id, order: p.order, correct: p.correct, pick: null, flag: false };
    });
  }
  VIEWS.exam = function () {
    var t = track(), cfg = examConfig(t);
    var ex = store.get("examInProgress", null);
    if (ex && ex.items && ex.items.some(function (it) { return !QBY[it.id]; })) { ex = null; store.del("examInProgress"); }
    var timerId = null;
    function intro() {
      var hist = P.exams.slice(-5).reverse();
      var enough = questionsFor(t).length >= Math.min(cfg.count, 20);
      render(pagehead("Mock exam", "Mock state exam", esc(cfg.label)) +
        stateNudge() +
        '<div class="card"><div class="examfacts"><div><span class="v">' + cfg.count + '</span><span class="k">questions</span></div><div><span class="v">' + cfg.minutes + '</span><span class="k">minutes</span></div><div><span class="v">' + Math.round(cfg.pass * 100) + '%</span><span class="k">to pass (' + Math.ceil(cfg.count * cfg.pass) + " correct)</span></div></div>" +
        '<p class="muted">Like the real exam, you get no feedback until you submit. Questions are drawn from every topic in proportion to its weight. Flag questions and jump around; if you close the page, your exam is saved.</p>' +
        '<div class="row">' + (!enough ? '<span class="muted">The question bank for this track is still being built.</span>' : ex ? '<button class="btn primary lg" id="resume">Resume exam in progress</button><button class="btn" id="startNew">Start over</button>' : '<button class="btn primary lg" id="startNew">Start the exam</button>') + "</div></div>" +
        (hist.length ? '<div class="card"><h2>Recent results</h2><div class="unitbars">' + hist.map(function (h) {
          var p = pct(h.score, h.total);
          return '<div class="ub"><span>' + esc(new Date(h.at).toLocaleDateString()) + ' <span class="pill ' + (p >= 70 ? "good" : "bad") + '">' + (p >= 70 ? "Pass" : "Not yet") + '</span></span><div class="bar"><span style="width:' + p + '%"></span></div><span class="v">' + p + "%</span></div>";
        }).join("") + "</div></div>" : ""));
      bindNudge();
      on("#resume", "click", function () { take(); });
      on("#startNew", "click", function () {
        if (ex && !confirm("Discard the exam in progress and start a new one?")) return;
        ex = { items: buildExam(t, cfg), cur: 0, started: Date.now(), limit: cfg.minutes * 60, track: t, pass: cfg.pass };
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
          '<div class="qcard spread" style="margin-bottom:12px"><span class="eyebrow">Mock exam</span><span class="timer" id="timer">' + fmtTime(remaining()) + "</span></div>" +
          '<div class="qcard"><div class="bar" style="margin-bottom:14px"><span style="width:' + pct(answered, ex.items.length) + '%"></span></div></div>' +
          questionHTML({ q: q, order: it.order, correct: it.correct }, it.pick, false, "Question " + (ex.cur + 1) + " of " + ex.items.length, it.flag ? "⚑ flagged" : "") +
          '<div class="qcard spread"><div class="row"><button class="btn" id="prev"' + (ex.cur ? "" : " disabled") + '>Previous</button><button class="btn" id="flag">' + (it.flag ? "Unflag" : "⚑ Flag") + '</button></div><div class="row">' +
          (ex.cur + 1 < ex.items.length ? '<button class="btn primary" id="nextQ">Next</button>' : "") +
          '<button class="btn' + (ex.cur + 1 < ex.items.length ? "" : " primary") + '" id="submit">Submit exam</button></div></div>' +
          '<div class="card qcard" style="margin-top:16px"><div class="spread" style="margin-bottom:10px"><strong>Questions</strong><span class="small muted">' + answered + " of " + ex.items.length + " answered</span></div><div class=\"navgrid\">" +
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
        var tEl = document.getElementById("timer"), rem = remaining();
        if (rem <= 0) { finish(true); return; }
        if (tEl) { tEl.textContent = fmtTime(rem); tEl.classList.toggle("low", rem < 300); }
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
      if (cleanup) { try { cleanup(); } catch { /* ignore */ } cleanup = null; }
      var score = 0, units = {};
      ex.items.forEach(function (it) {
        var q = QBY[it.id], ok = it.pick === it.correct;
        if (ok) score++;
        units[q.u] = units[q.u] || [0, 0];
        units[q.u][1]++; if (ok) units[q.u][0]++;
        if (it.pick != null) recordAnswer(it.id, ok);
      });
      var passRate = ex.pass || 0.7;
      var result = { at: Date.now(), score: score, total: ex.items.length, units: units, track: ex.track || t, time: Math.min(ex.limit, Math.round((Date.now() - ex.started) / 1000)) };
      P.exams.push(result); save("exams");
      var finished = ex; ex = null; store.del("examInProgress");
      var p = pct(score, result.total), passed = score >= Math.ceil(result.total * passRate);
      var weak = Object.keys(units).map(Number).sort(function (a, b) { return units[a][0] / units[a][1] - units[b][0] / units[b][1]; });
      render(
        '<div class="card result qcard"><span class="pill ' + (passed ? "good" : "bad") + '">' + (passed ? "Pass" : "Not yet") + "</span>" +
        '<span class="big">' + score + " / " + result.total + "</span>" +
        '<p class="muted">' + p + "% · " + (timeUp ? "time expired" : "finished in " + fmtTime(result.time)) + " · passing is " + Math.ceil(result.total * passRate) + " correct</p>" +
        '<div class="row" style="justify-content:center"><a class="btn primary" href="#/practice/missed">Drill missed questions</a>' +
        (function () {
          var misses = finished.items.filter(function (it) { return it.pick !== it.correct; }).map(function (it) { return QBY[it.id]; }).filter(Boolean);
          return misses.length ? aiLink("Go over my misses with {ai}", promptMisses(misses)) : "";
        })() + '<button class="btn" id="again">New exam</button></div></div>' +
        '<div class="card qcard"><h2>By topic, weakest first</h2><div class="unitbars">' +
        weak.map(function (u) {
          var r = units[u], up = pct(r[0], r[1]);
          return '<div class="ub"><a href="#/unit/' + u + '">' + esc(shortTitle(UNIT[u].title)) + '</a><div class="bar"><span style="width:' + up + '%"></span></div><span class="v">' + r[0] + "/" + r[1] + "</span></div>";
        }).join("") + "</div></div>" +
        '<div class="qcard"><h2>Review every question</h2></div>' +
        finished.items.map(function (it, n) {
          var q = QBY[it.id];
          return questionHTML({ q: q, order: it.order, correct: it.correct }, it.pick == null ? -1 : it.pick, true, "Question " + (n + 1) + " · " + esc(shortTitle(UNIT[q.u].title)), it.pick == null ? "unanswered" : "");
        }).join("")
      );
      on("#again", "click", function () { location.hash = "#/exam"; VIEWS.exam(); });
    }
    intro();
  };

  /* ---- Progress ---- */
  VIEWS.progress = function () {
    var t = track(), o = overall(), units = unitsFor(t);
    render(pagehead("Progress", "Your progress", sync.on ? syncLine() : "Saved only in this browser. Use export and import to move it to another device.") +
      '<div class="card" style="display:flex;gap:26px;align-items:center;flex-wrap:wrap">' + ring(readiness(), true) +
      '<div style="flex:1 1 260px"><h2 style="margin:0 0 6px">Exam readiness</h2><p class="muted" style="margin:0">Combines how much of each topic you\'ve covered with how you did on your latest attempt, weighted by how much each topic counts.</p></div></div>' +
      '<div class="stats">' +
      '<div class="stat"><span class="k">Questions tried</span><span class="v">' + o.seen + '<span class="muted" style="font-size:1rem;font-weight:500"> / ' + o.total + "</span></span></div>" +
      '<div class="stat"><span class="k">Overall accuracy</span><span class="v">' + (o.acc == null ? "—" : Math.round(o.acc * 100) + "%") + "</span></div>" +
      '<div class="stat"><span class="k">Mock exams taken</span><span class="v">' + P.exams.filter(function (e) { return (e.track || "ny") === t; }).length + "</span></div>" +
      '<div class="stat"><span class="k">Topics marked read</span><span class="v">' + units.filter(function (u) { return P.read[u.id]; }).length + '<span class="muted" style="font-size:1rem;font-weight:500"> / ' + units.length + "</span></span></div></div>" +
      '<div class="card"><h2>By topic</h2><p class="small muted">Bar = share of the topic\'s questions you\'ve tried. The number is your accuracy on your latest attempt at each.</p><div class="unitbars">' +
      units.map(function (u) {
        var s = unitStats(u.id), la = s.lastAcc == null ? null : Math.round(s.lastAcc * 100);
        return '<div class="ub"><a href="#/unit/' + u.id + '">' + unitLabel(u) + ". " + esc(shortTitle(u.title)) + '</a><div class="bar"><span style="width:' + pct(s.seen, s.total) + '%"></span></div><span class="v">' + (la == null ? '<span class="muted">—</span>' : la + "%") + "</span></div>";
      }).join("") + "</div></div>" +
      '<div class="card"><h2>Backup</h2><div class="row"><button class="btn" id="exp">Export progress</button><label class="btn" for="imp">Import progress</label><input type="file" id="imp" accept="application/json" style="display:none"><button class="btn danger" id="reset">Reset everything</button></div></div>'
    );
    on("#exp", "click", function () {
      // The export id predates the Landmark Prep name; keep it so older backups still import.
      var blob = new Blob([JSON.stringify({ app: "ny-real-estate-prep", v: 1, at: new Date().toISOString(), data: P }, null, 1)], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob); a.download = "landmark-prep-progress-" + today() + ".json";
      document.body.appendChild(a); a.click(); a.remove();
    });
    on("#imp", "change", function (e) {
      var f = e.target.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        try {
          var j = JSON.parse(r.result);
          if (!j || j.app !== "ny-real-estate-prep" || !j.data) throw new Error("bad file");
          ["q", "cards", "exams", "road", "read", "state"].forEach(function (k) { if (j.data[k] != null) { P[k] = j.data[k]; save(k); } });
          alert("Progress imported."); route();
        } catch { alert("That file doesn't look like a progress export."); }
      };
      r.readAsText(f);
    });
    on("#reset", "click", function () {
      if (!confirm("Erase all progress, flashcard boxes, exam history and checklist marks on this device?")) return;
      ["q", "cards", "exams", "road", "read", "examInProgress"].forEach(store.del);
      onStoreSet("road");
      P.q = {}; P.cards = {}; P.exams = []; P.road = {}; P.read = {};
      VIEWS.progress();
    });
  };

  /* ---- Pricing ---- */
  VIEWS.pricing = function () {
    render(pagehead("Plans", "Free, and it works with your AI.", "Everything here is free and open source. For a personal tutor, use the ChatGPT or Claude you already have: every question, topic and step has a button that opens it with everything it needs.") +
      '<div class="pricing">' +
      '<div class="plancard"><span class="eyebrow">Free</span><h2>Study</h2><div class="price">$0</div><p class="muted">No account, no card.</p><ul>' +
      "<li>Study notes for every topic</li><li>" + (questionsFor("ny").length + questionsFor("us").length) + "+ practice questions with explanations</li><li>Adaptive flashcards</li><li>Timed mock exams with full review</li><li>Unlimited math drills</li><li>Your state's licensing path, one step at a time</li></ul>" +
      '<a class="btn" href="#/study">Start studying</a></div>' +
      '<div class="plancard pro"><span class="eyebrow">Your AI</span><h2>Study with ChatGPT or Claude</h2><div class="price">Your plan</div><p class="muted">Free or paid, whichever you use.</p><ul>' +
      "<li>Go deeper on any question you miss</li><li>Get taught any topic, then quizzed</li><li>Get walked through each licensing step</li><li>Quizzed on your weakest topics</li><li>We never see your AI account</li></ul>" +
      '<a class="btn primary" href="#/settings">Choose ChatGPT or Claude</a></div></div>' +
      '<div class="faq narrow" style="margin-top:30px"><h2>Questions</h2>' +
      "<details><summary>Is Landmark Prep a pre-licensing school?</summary><p>No. Every state requires pre-licensing education from a school it approves, and only that school's certificate counts. Landmark Prep is exam prep and study help to use alongside your course. It is not affiliated with any state real estate commission.</p></details>" +
      "<details><summary>Is it really free?</summary><p>Yes. The study notes, questions, flashcards, mock exams and licensing path are free and open source. The AI help runs in your own ChatGPT or Claude, on whatever plan you already have.</p></details>" +
      "<details><summary>How does the ChatGPT or Claude button work?</summary><p>It opens a new chat in your own account with a prompt that already includes the question, topic or step you're on. Nothing is sent to us, and we can't see your chats.</p></details>" +
      "<details><summary>Which states are covered?</summary><p>New York has a complete state course. Every other state gets the national exam core, which is typically the larger section of the exam, plus your state's official requirements. State-law notes for more states are coming.</p></details></div>");
  };

  /* ---- Tutor (hosted builds only) ---- */
  function progressSnapshot() {
    var o = overall(), t = track();
    return {
      state: P.state, track: t, readiness: readiness(), questionsTried: o.seen,
      accuracy: o.acc == null ? null : Math.round(o.acc * 100) + "%",
      units: unitsFor(t).map(function (u) {
        var s = unitStats(u.id);
        return { id: u.id, title: shortTitle(u.title), seen: s.seen, total: s.total, acc: s.lastAcc == null ? null : Math.round(s.lastAcc * 100) };
      }),
      exams: P.exams.slice(-3).map(function (e) { return { date: new Date(e.at).toISOString().slice(0, 10), score: e.score, total: e.total }; }),
      roadmap: Object.keys(P.road),
      cardsMastered: glossaryFor(t).filter(function (g) { return cardState(g.id).box >= 4; }).length,
      unitsRead: Object.keys(P.read).map(Number),
      journey: (function () {
        var st = journeySteps(), open = st.filter(function (s) { return !P.road[s.id]; });
        return { nextStep: open[0] ? open[0].title : (st.length ? "all steps done" : null), stepsDone: st.length - open.length, stepsTotal: st.length,
          courseHoursDone: P.plan && P.plan.hours != null ? P.plan.hours : null, courseTargetDate: (P.plan && P.plan.target) || null };
      })(),
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
    if (!TUTOR_API) { location.hash = "#/pricing"; return; }
    var unit = args[0] === "unit" && UNIT[parseInt(args[1], 10)] ? parseInt(args[1], 10) : null;
    var busy = false;
    render('<div class="narrow"><div class="spread"><div><span class="eyebrow">Tutor</span><h1 style="margin:6px 0 0">Your tutor</h1></div><span class="pill" id="tstatus">connecting…</span></div>' +
      '<p class="muted" style="margin:10px 0 16px">Ask anything about the exam or the course. Your tutor remembers your past sessions and can see your progress here.</p>' +
      '<div class="card chat" id="chat" aria-live="polite"><p class="muted">Loading your conversation…</p></div>' +
      '<div class="chips" id="sugg" style="margin-bottom:12px">' +
      ["Quiz me on my weakest topic", "Explain dual agency simply", "Make me a 2-week study plan", "What numbers should I memorize?"]
        .map(function (q) { return '<button class="chip" data-q="' + esc(q) + '">' + esc(q) + "</button>"; }).join("") + "</div>" +
      '<form id="tform" class="chatform"><textarea id="tmsg" rows="2" maxlength="4000" placeholder="Ask your tutor…" aria-label="Message"></textarea>' +
      '<button class="btn primary" id="tsend" type="submit">Send</button></form></div>');
    var chat = document.getElementById("chat"), box = document.getElementById("tmsg");
    try { box.value = sessionStorage.getItem("nyre.tdraft") || (unit ? "Help me with " + UNIT[unit].title + ". " : ""); } catch { /* ignore */ }
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
        bubble("assistant", res.code === 402 ? "Your tutor access isn't active." : "Your tutor is offline right now. Your study tools all still work. Try again later.");
        return;
      }
      status(res.j.model_ready, res.j.model_ready ? "online" : "starting up");
      if (!res.j.messages.length) bubble("assistant", "Hi " + res.j.name + "! I'm your study tutor. Tell me when you're planning to take the exam and how far along you are in your course, and we'll make a plan. Or tap a suggestion below.");
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
      box.value = ""; try { sessionStorage.removeItem("nyre.tdraft"); } catch { /* ignore */ }
      var wait = bubble("assistant", "Thinking…", "typing");
      fetch(TUTOR_API + "/chat", {
        method: "POST", credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, unit: unit && unit <= 19 ? unit : null, progress: progressSnapshot() }),
      }).then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (j) { return { code: r.status, j: j }; });
      }).then(function (res) {
        wait.remove();
        if (res.code === 200 && res.j.reply) { bubble("assistant", res.j.reply); status(true, "online"); }
        else if (res.code === 429) bubble("assistant", "Let's take a short breather. You've sent a lot of messages in the last hour. Try again in a few minutes.", "err");
        else if (res.code === 401) bubble("assistant", "Your session expired. Please sign in again.", "err");
        else { status(false, "offline"); bubble("assistant", "Your tutor didn't answer (it may be offline or busy). Try again in a minute.", "err"); }
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
    on("#tmsg", "input", function () { try { sessionStorage.setItem("nyre.tdraft", box.value); } catch { /* ignore */ } });
    on("[data-q]", "click", function (e) { send(e.currentTarget.getAttribute("data-q")); });
  };

  /* ---- Settings ---- */
  VIEWS.settings = function () {
    var cur = store.get("palette", DEFAULT_PALETTE), th = store.get("theme", "auto");
    render(pagehead("Settings", "Make it yours", "Pick your colors. Changes save right away" + (sync.on ? " and follow you to your other devices." : " on this device.")) +
      '<div class="card"><h2 style="margin-top:0">Colors</h2><div class="palettes" role="radiogroup" aria-label="Color theme">' +
      PALETTES.map(function (pal) {
        var on_ = pal.id === cur;
        return '<button type="button" class="palette' + (on_ ? " on" : "") + '" role="radio" aria-checked="' + on_ + '" data-pal="' + pal.id + '">' +
          '<span class="sw" aria-hidden="true">' + pal.swatch.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join("") + "</span>" +
          "<b>" + esc(pal.name) + '</b><span class="d">' + esc(pal.desc) + "</span></button>";
      }).join("") + "</div>" +
      '<h2>Light or dark</h2><div class="chips" role="radiogroup" aria-label="Light or dark">' +
      [["auto", "Match my device"], ["light", "Light"], ["dark", "Dark"]].map(function (o) {
        return '<button type="button" class="chip" role="radio" aria-checked="' + (o[0] === th) + '" aria-pressed="' + (o[0] === th) + '" data-mode-opt="' + o[0] + '">' + o[1] + "</button>";
      }).join("") + "</div></div>" +
      '<div class="card"><h2 style="margin-top:0">Your AI</h2><p class="muted">The "Ask" buttons open this, signed in with your own account and plan. Landmark Prep never sees your AI account.</p><div class="chips" role="radiogroup" aria-label="Your AI">' +
      Object.keys(AIS).map(function (k) {
        var cur2 = aiPref() === k;
        return '<button type="button" class="chip" role="radio" aria-checked="' + cur2 + '" aria-pressed="' + cur2 + '" data-ai-opt="' + k + '">' + AIS[k].name + "</button>";
      }).join("") + "</div>" + (aiPref() === "claude" ? '<p class="small muted" style="margin-top:10px">If Claude opens without your question filled in, just paste: we copy it for you.</p>' : "") + "</div>" +
      '<div class="card"><h2 style="margin-top:0">Use Landmark Prep inside your AI</h2><p class="muted">Add this address as a connector and your AI can pull Landmark\'s notes, practice questions and your state\'s requirements right in the chat. No sign-in needed.</p>' +
      '<div class="row"><code class="mcpurl" id="mcpUrl">' + esc(MCP_URL) + '</code><button class="btn sm" type="button" id="copyMcp">Copy</button></div>' +
      '<ul class="small" style="margin-top:12px"><li><strong>Claude</strong> (any plan): Settings, Connectors, Add custom connector, then paste the address.</li>' +
      "<li><strong>ChatGPT</strong> (paid plans): turn on Developer mode in Settings, then create an app with this address and no authentication. Free ChatGPT can't add connectors yet; the Ask buttons work on every plan.</li></ul></div>" +
      '<div class="card"><h2 style="margin-top:0">Your state</h2><p>' + (P.state ? esc(stateName(P.state)) : "Not chosen yet") + '</p><button class="btn" id="chgState" type="button">Change state</button></div>' +
      '<div class="card"><h2 style="margin-top:0">Your progress</h2><p class="muted">' + esc(sync.on ? syncLine() : "Saved in this browser. Export it from the Progress page to move it to another device.") + '</p><a class="btn" href="#/progress">Open progress</a></div>');
    on("[data-pal]", "click", function (e) { var id = e.currentTarget.getAttribute("data-pal"); store.set("palette", id); applyPalette(id); VIEWS.settings(); });
    on("[data-mode-opt]", "click", function (e) { var t = e.currentTarget.getAttribute("data-mode-opt"); store.set("theme", t); applyTheme(t); VIEWS.settings(); });
    on("#chgState", "click", function () { openStatePicker(); });
    on("[data-ai-opt]", "click", function (e) { store.set("ai", e.currentTarget.getAttribute("data-ai-opt")); VIEWS.settings(); });
    on("#copyMcp", "click", function (e) {
      var b = e.currentTarget;
      if (navigator.clipboard) navigator.clipboard.writeText(MCP_URL).then(function () { b.textContent = "Copied"; }).catch(function () {});
    });
  };

  /* ---- About & legal ---- */
  VIEWS.about = function () {
    render(pagehead("About", "About Landmark Prep", "Free, open-source exam prep for real estate license candidates, from KE Studios.") +
      '<div class="card"><p><strong>What it is:</strong> study notes, practice questions, flashcards, mock exams, math drills and a licensing roadmap. New York follows the official 77-hour syllabus and the Department of State\'s Real Estate License Law (March 2026 edition). Every other state gets the national exam core plus its official requirements.</p>' +
      "<p><strong>What it is not:</strong> a pre-licensing school. Every state requires education from a school it approves before you can be licensed. Landmark Prep is not affiliated with any state real estate commission and is not legal advice. Rules and fees change, so always confirm with your state's regulator.</p>" +
      "<p><strong>Questions and notes</strong> are original writing, not copied from any exam, course or book, and not real exam questions.</p>" +
      "<p><strong>Privacy:</strong> no accounts, no tracking, no third-party fonts or scripts. Your progress stays in your browser.</p>" +
      '<p><strong>Open source:</strong> code under the MIT license, content under CC BY 4.0. Contributions welcome at <a href="https://github.com/willykeenan/landmark-prep" rel="noopener">github.com/willykeenan/landmark-prep</a>.</p></div>' +
      '<p class="small muted">' + (questionsFor("ny").length + questionsFor("us").length) + " questions · " + N.glossary.length + " flashcards · " + N.math.kinds.length + " math problem types</p>" +
      '<p class="small muted"><a href="#/terms">Terms of Service</a> · <a href="#/privacy">Privacy Policy</a> · <a href="#/refunds">Cancellation and refunds</a></p>');
  };

  // The policies are short markdown (headings, paragraphs, lists, quotes, bold); render just that.
  function inlineMd(s) {
    return esc(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,})/g, '<a href="mailto:$1">$1</a>');
  }
  function renderMd(md) {
    var out = [];
    md.split(/\n{2,}/).forEach(function (block) {
      var lines = block.split("\n");
      if (lines.every(function (l) { return /^- /.test(l); })) {
        out.push("<ul>" + lines.map(function (l) { return "<li>" + inlineMd(l.slice(2)) + "</li>"; }).join("") + "</ul>");
      } else if (/^## /.test(block)) {
        out.push("<h2>" + inlineMd(block.slice(3)) + "</h2>");
      } else if (/^> /.test(block)) {
        out.push('<div class="banner blue"><div>' + inlineMd(lines.map(function (l) { return l.replace(/^> ?/, ""); }).join(" ")) + "</div></div>");
      } else {
        out.push("<p>" + inlineMd(lines.join(" ")) + "</p>");
      }
    });
    return out.join("");
  }
  ["terms", "privacy", "refunds"].forEach(function (id) {
    VIEWS[id] = function () {
      var page = N.legal && N.legal[id];
      if (!page) return VIEWS.about();
      render(pagehead("Legal", esc(page.title), "") + '<article class="card legal">' + renderMd(page.md) + "</article>");
    };
  });

  /* ---------- boot ---------- */
  route();
  pullState();
  if (sync.on) {
    window.addEventListener("pagehide", function () { if (sync.timer) pushState(true); });
    document.addEventListener("visibilitychange", function () { if (document.visibilityState === "hidden" && sync.timer) pushState(true); });
  }
  if (!ROOT.hasAttribute("data-no-sw") && "serviceWorker" in navigator && /^https?:$/.test(location.protocol) && location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }
})();

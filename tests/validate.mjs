// Content and logic checks for NY Real Estate Prep. Run: node tests/validate.mjs
// Loads the data files the same way the browser does (as classic scripts on `window`).
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const files = ["units-a", "units-b", "units-c", "questions-a", "questions-b", "questions-c", "glossary", "roadmap", "math", "exam-plan"];
const ctx = { window: {}, Math, Number, Object, Array, String, isFinite };
vm.createContext(ctx);
for (const f of files) vm.runInContext(readFileSync(join(root, "data", f + ".js"), "utf8"), ctx, { filename: f + ".js" });
const N = ctx.window.NYRE;

const results = [];
function check(name, fn) {
  try {
    const out = fn();
    results.push({ name, ok: true, info: out || "" });
  } catch (e) {
    results.push({ name, ok: false, info: e.message });
  }
}
function assert(c, msg) { if (!c) throw new Error(msg); }

// Official syllabus (19 NYCRR 176.3): subject -> hours
const SYLLABUS = [3, 11, 10, 3, 5, 3, 5, 3, 6, 1, 2, 1, 1, 3, 4, 10, 3, 1, 2];

check("19 units matching the official syllabus hours (77 total)", () => {
  const u = [...N.units].sort((a, b) => a.id - b.id);
  assert(u.length === 19, "expected 19 units, got " + u.length);
  u.forEach((x, i) => {
    assert(x.id === i + 1, "unit id gap at " + (i + 1));
    assert(x.hours === SYLLABUS[i], `unit ${x.id} hours ${x.hours} != ${SYLLABUS[i]}`);
  });
  const total = u.reduce((s, x) => s + x.hours, 0);
  assert(total === 77, "hours total " + total);
});

check("every unit has an intro, sections with bullets, and well-formed tables", () => {
  let bullets = 0;
  for (const u of N.units) {
    assert(u.title && u.intro, "unit " + u.id + " missing title/intro");
    assert(Array.isArray(u.sections) && u.sections.length >= 2, "unit " + u.id + " needs 2+ sections");
    for (const s of u.sections) {
      assert(s.h && s.b.length, `unit ${u.id} empty section`);
      for (const b of s.b) { assert(typeof b === "string" && b.length > 8, `unit ${u.id} short bullet`); bullets++; }
    }
    for (const n of u.numbers || []) assert(Array.isArray(n) && n.length === 2 && n[0] && n[1], `unit ${u.id} bad numbers row`);
  }
  return bullets + " bullets";
});

check("bold markup is balanced in every string", () => {
  const strings = [];
  for (const u of N.units) {
    strings.push(u.intro, ...(u.traps || []));
    u.sections.forEach((s) => strings.push(s.h, ...s.b));
    (u.numbers || []).forEach((n) => strings.push(n[0], n[1]));
  }
  N.roadmap.steps.forEach((s) => strings.push(...s.body));
  for (const s of strings) assert(((s.match(/\*\*/g) || []).length % 2) === 0, "unbalanced ** in: " + s.slice(0, 80));
});

check("question bank is well-formed", () => {
  const seen = new Set();
  for (const q of N.questions) {
    const where = `u${q.u}: ${q.q.slice(0, 60)}`;
    assert(Number.isInteger(q.u) && q.u >= 1 && q.u <= 19, "bad unit " + where);
    assert(q.q.trim().length > 10, "short stem " + where);
    assert(Array.isArray(q.c) && q.c.length === 4, "need 4 choices " + where);
    assert(new Set(q.c.map((c) => c.trim().toLowerCase())).size === 4, "duplicate choices " + where);
    assert(Number.isInteger(q.a) && q.a >= 0 && q.a < q.c.length, "bad answer index " + where);
    assert(q.e && q.e.trim().length > 3, "missing explanation " + where);
    const key = q.q.trim().toLowerCase();
    assert(!seen.has(key), "duplicate question " + where);
    seen.add(key);
    // Choices are shuffled in the app, so position-dependent options are not allowed.
    for (const c of q.c) assert(!/\b(all|none|both) of the above\b|^both [a-d] and [a-d]$/i.test(c), "position-dependent choice " + where);
  }
  return N.questions.length + " questions";
});

check("every unit has enough practice questions", () => {
  const per = {};
  N.questions.forEach((q) => (per[q.u] = (per[q.u] || 0) + 1));
  for (let u = 1; u <= 19; u++) assert((per[u] || 0) >= 8, `unit ${u} has only ${per[u] || 0} questions`);
  // Enough to fill a 75-question exam in proportion to syllabus hours.
  for (let u = 1; u <= 19; u++) {
    const need = Math.max(1, Math.ceil((75 * SYLLABUS[u - 1]) / 77));
    assert(per[u] >= need, `unit ${u} needs ${need} for a mock exam, has ${per[u]}`);
  }
  return JSON.stringify(per);
});

check("answer positions are balanced in the source data (non-numeric sets)", () => {
  // The app shuffles non-numeric choices anyway; this keeps the raw dataset unbiased for other uses.
  const num = (s) => /^\s*\$?\s*-?\d*\.?\d/.test(String(s).replace(/,/g, ""));
  const pos = [0, 0, 0, 0];
  let n = 0;
  N.questions.forEach((q) => { if (!q.c.every(num)) { pos[q.a]++; n++; } });
  pos.forEach((p, i) => assert(p / n > 0.18 && p / n < 0.32, `position ${"ABCD"[i]} is ${(100 * p / n).toFixed(0)}%`));
  return "A/B/C/D = " + pos.join("/");
});

check("glossary is well-formed with no duplicate terms", () => {
  const seen = new Set();
  for (const g of N.glossary) {
    assert(g.u >= 1 && g.u <= 19, "bad unit for " + g.t);
    assert(g.t && g.d && g.d.length > 8, "empty term/definition " + g.t);
    const k = g.t.toLowerCase();
    assert(!seen.has(k), "duplicate term " + g.t);
    seen.add(k);
  }
  return N.glossary.length + " terms";
});

check("math generators produce valid, unambiguous questions (seeded, 500 each)", () => {
  let seed = 12345;
  const rng = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  let n = 0;
  for (const k of N.math.kinds) {
    for (let i = 0; i < 500; i++) {
      const it = N.math.generate(k, rng);
      const where = k + " #" + i;
      assert(it.q && it.e && it.topic, "missing text " + where);
      assert(it.c.length === 4, "need 4 choices " + where + ": " + JSON.stringify(it.c));
      assert(new Set(it.c).size === 4, "duplicate choices " + where + ": " + JSON.stringify(it.c));
      assert(it.a >= 0 && it.a < 4, "bad index " + where);
      for (const s of [it.q, it.e, ...it.c]) assert(!/NaN|Infinity|undefined/.test(s), "bad number in " + where + ": " + s);
      n++;
    }
  }
  return n + " problems across " + N.math.kinds.length + " types";
});

check("math answers are arithmetically correct (spot checks)", () => {
  // Deterministic rng that always returns 0 picks the first/lowest option everywhere.
  const zero = () => 0;
  const cs = N.math.generate("commissionSplit", zero);
  // price 350,000 at 4%, broker 50%, agent 50% -> 14,000 -> 7,000 -> 3,500
  assert(cs.c[cs.a] === "$3,500", "commissionSplit got " + cs.c[cs.a]);
  const net = N.math.generate("netToSeller", zero);
  // net 300,000 at 4% -> 312,500
  assert(net.c[net.a] === "$312,500", "netToSeller got " + net.c[net.a]);
  const tt = N.math.generate("transferTax", zero);
  // 200,000 -> 400 units -> $800
  assert(tt.c[tt.a] === "$800", "transferTax got " + tt.c[tt.a]);
  const cap = N.math.generate("capValue", zero);
  // NOI 30,000 at 4.5% -> 666,667
  assert(cap.c[cap.a] === "$666,667", "capValue got " + cap.c[cap.a]);
  const dep = N.math.generate("depreciation", zero);
  // 300,000, land 15%, residential -> 255,000 / 27.5 = 9,273
  assert(dep.c[dep.a] === "$9,273", "depreciation got " + dep.c[dep.a]);
});

check("mock exam allocation sums to 75 and follows syllabus weight", () => {
  const alloc = N.examAllocation([...N.units].sort((a, b) => a.id - b.id), 75);
  const sum = Object.values(alloc).reduce((a, b) => a + b, 0);
  assert(sum === 75, "sum " + sum);
  for (let u = 1; u <= 19; u++) {
    const exact = (75 * SYLLABUS[u - 1]) / 77;
    assert(alloc[u] >= 1 && Math.abs(alloc[u] - exact) < 1.05, `unit ${u}: ${alloc[u]} vs exact ${exact.toFixed(2)}`);
  }
  return Object.entries(alloc).map(([k, v]) => k + ":" + v).join(" ");
});

check("roadmap steps are complete and link to https sources", () => {
  const ids = new Set();
  for (const s of N.roadmap.steps) {
    assert(!ids.has(s.id), "duplicate step " + s.id); ids.add(s.id);
    assert(s.title && s.cost && s.body.length, "incomplete step " + s.id);
    for (const l of s.links) assert(/^https:\/\//.test(l[1]), "non-https link " + l[1]);
  }
  const total = N.roadmap.minimumCost.reduce((a, r) => a + r[1], 0);
  assert(total === 80, "minimum cost should be $80 ($15 exam + $65 license), got " + total);
});

check("no known-stale facts slipped in", () => {
  const all = JSON.stringify({ u: N.units, q: N.questions, g: N.glossary, r: N.roadmap });
  const stale = [
    [/fine (?:of )?(?:up to|not exceeding) \$1,000/i, "DOS fine cap is $2,000"],
    [/\$55 license fee/i, "salesperson fee is $65 incl. surcharge"],
    [/(?:give|provide|offer)s? a \$500 credit (?:instead|in lieu)/i, "PCDS $500 credit option was eliminated 3/20/2024"],
    [/within one year (?:with|to) (?:the )?(?:NYS )?Division of Human Rights/i, "DHR window is now 3 years"],
  ];
  for (const [re, why] of stale) assert(!re.test(all), why);
});

const all_passed = results.every((r) => r.ok);
for (const r of results) console.log((r.ok ? "PASS " : "FAIL ") + r.name + (r.info ? "  — " + r.info : ""));
console.log(all_passed ? "\nAll checks passed." : "\nSome checks FAILED.");
writeFileSync(join(root, "tests", "results.json"), JSON.stringify({ all_passed, results }, null, 2) + "\n");
process.exit(all_passed ? 0 : 1);

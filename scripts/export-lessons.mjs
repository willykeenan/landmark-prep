// Builds the Duolingo-style lesson path from the study kit: content/lessons.json, shared by the
// iPhone/Mac app and the web app so both run exactly the same lessons.
//   node scripts/export-lessons.mjs [outFile]
// Each unit becomes a section on the path. Each lesson is a short set of exercises:
// up to 4 practice questions plus one "match the terms" round from that unit's glossary.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const FILES = ["units-a", "units-b", "units-c", "questions-a", "questions-b", "questions-c", "national-units",
  "national-questions-a", "national-questions-b", "glossary", "roadmap", "states"];
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of FILES) vm.runInContext(readFileSync(join(root, "data", f + ".js"), "utf8"), ctx, { filename: f + ".js" });
const N = ctx.window.NYRE;

// Same ids as the web app: unit + short hash of the text.
const hash = (s) => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return h.toString(36); };
for (const q of N.questions) q.id = "u" + q.u + "-" + hash(q.q);
for (const g of N.glossary) g.id = "g" + g.u + "-" + hash(g.t);
const plain = (s) => String(s).replace(/\*\*/g, "");

const NY_TERMS = /New York|\bNYS?\b|\bNYC\b|NYCRR|\bRPL\b|\bDOS\b|HSTPA|SONYMA|\bSTAR\b|\bSCAR\b|Article 12-A|Lien Law|Martin Act|Human Rights Law/;
const NY_TO_US = { 1: 110, 2: 105, 3: 109, 4: 107, 5: 104, 6: 102, 7: 106, 8: 103, 9: 110, 10: 111, 11: 102, 12: 109, 13: 110, 14: 102, 15: 101, 16: 108, 17: 110, 18: 104, 19: 108 };

// Deterministic shuffle so every device builds the same lessons.
function seeded(seed) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
function shuffle(list, seed) { const r = seeded(seed), a = list.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

const QUESTIONS_PER_LESSON = 4;
const PAIRS_PER_MATCH = 4;

function buildTrack(track) {
  const units = (track === "ny" ? N.units : N.nationalUnits).slice().sort((a, b) => a.id - b.id);
  const terms = track === "ny"
    ? N.glossary.map((g) => ({ id: g.id, t: g.t, d: g.d, u: g.u }))
    : N.glossary.filter((g) => !NY_TERMS.test(g.t + " " + g.d)).map((g) => ({ id: g.id, t: g.t, d: g.d, u: NY_TO_US[g.u] || 101 }));
  return units.map((u) => {
    const qs = shuffle(N.questions.filter((q) => q.u === u.id), hash(track + u.id));
    const unitTerms = shuffle(terms.filter((g) => g.u === u.id && g.d.length <= 160), hash("t" + track + u.id));
    // Spread questions evenly (13 questions -> 4, 3, 3, 3), so no lesson is a lone leftover.
    const lessonCount = Math.max(1, Math.ceil(qs.length / QUESTIONS_PER_LESSON));
    const base = Math.floor(qs.length / lessonCount), extra = qs.length % lessonCount;
    const lessons = [];
    let at = 0;
    for (let i = 0; i < lessonCount; i++) {
      const size = base + (i < extra ? 1 : 0);
      const exercises = qs.slice(at, at + size).map((q) => ({ type: "choice", question: q.id }));
      at += size;
      // One match round per lesson, cycling through the unit's terms.
      if (unitTerms.length >= PAIRS_PER_MATCH) {
        const start = (i * PAIRS_PER_MATCH) % unitTerms.length;
        const pairs = [];
        for (let k = 0; k < PAIRS_PER_MATCH; k++) pairs.push(unitTerms[(start + k) % unitTerms.length].id);
        exercises.splice(Math.min(2, exercises.length), 0, { type: "match", terms: [...new Set(pairs)] });
      }
      lessons.push({ id: `${track}-${u.id}-${i + 1}`, title: `${u.title.split(/[:(]/)[0].trim()} ${i + 1}`, exercises });
    }
    return { id: u.id, title: u.title, hours: u.hours, intro: plain(u.intro), lessons };
  });
}

const content = {
  version: 1,
  builtAt: new Date().toISOString().slice(0, 10),
  tracks: { ny: buildTrack("ny"), us: buildTrack("us") },
  questions: Object.fromEntries(N.questions.map((q) => [q.id, { u: q.u, q: q.q, c: q.c, a: q.a, e: plain(q.e) }])),
  terms: Object.fromEntries(N.glossary.map((g) => [g.id, { t: g.t, d: g.d }])),
  roadmap: N.roadmap.steps.map((s) => ({ id: s.id, title: s.title, cost: s.cost, next: plain(s.next || s.body[0]), action: s.action || (s.links && s.links[0]) || null })),
  states: N.states.map((s) => ({ code: s.code, name: s.name, agency: s.agency, url: s.url, prelicenseHours: s.prelicenseHours, examVendor: s.examVendor, verified: s.verified })),
};

const out = process.argv[2] || join(root, "content", "lessons.json");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(content));
const count = (t) => content.tracks[t].reduce((n, u) => n + u.lessons.length, 0);
console.log(`lessons: NY ${count("ny")} across ${content.tracks.ny.length} units, national ${count("us")} across ${content.tracks.us.length} units; ${Object.keys(content.questions).length} questions, ${Object.keys(content.terms).length} terms -> ${out}`);

// Re-checks every state licensing fact against the official page it quotes.
// For each fact in data/states.js with evidence, fetch the cited page (HTML or PDF) and
// confirm the exact quote is still there. Needs network; PDFs need `pdftotext` (poppler).
// Usage: node scripts/check-state-sources.mjs [STATE ...]
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(readFileSync(join(root, "data", "states.js"), "utf8"), ctx);
const only = new Set(process.argv.slice(2).map((s) => s.toUpperCase()));
const states = ctx.window.NYRE.states.filter((s) => !only.size || only.has(s.code));

const norm = (s) =>
  String(s)
    .normalize("NFKC")
    .replace(/[‘’‚′]/g, "'")
    .replace(/[“”„″]/g, '"')
    .replace(/[‐-―−]/g, "-")
    .replace(/­/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const scratch = mkdtempSync(join(tmpdir(), "landmark-sources-"));
let n = 0;
async function pageText(url) {
  const res = await fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(30_000),
    headers: { "user-agent": "Mozilla/5.0 (compatible; LandmarkPrepFactCheck/1.0)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const body = Buffer.from(await res.arrayBuffer());
  if ((res.headers.get("content-type") || "").includes("pdf") || body.subarray(0, 5).toString() === "%PDF-") {
    const file = join(scratch, `page${n++}.pdf`);
    writeFileSync(file, body);
    return execFileSync("pdftotext", ["-q", file, "-"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  }
  return body
    .toString("utf8")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#39;|&#x27;|&rsquo;|&lsquo;/gi, "'")
    .replace(/&quot;|&ldquo;|&rdquo;/gi, '"')
    .replace(/&ndash;|&mdash;/gi, "-");
}

const byUrl = new Map();
for (const s of states) {
  for (const [fact, e] of Object.entries(s.evidence || {})) {
    if (!byUrl.has(e.url)) byUrl.set(e.url, []);
    byUrl.get(e.url).push({ code: s.code, fact, quote: e.quote });
  }
}
const urls = [...byUrl.keys()];
const problems = [];
let next = 0;
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (next < urls.length) {
      const url = urls[next++];
      let text;
      try {
        text = norm(await pageText(url));
      } catch (error) {
        for (const u of byUrl.get(url)) problems.push(`${u.code}.${u.fact}: could not fetch ${url} (${error.message})`);
        continue;
      }
      for (const u of byUrl.get(url)) {
        if (!text.includes(norm(u.quote))) problems.push(`${u.code}.${u.fact}: quote no longer found on ${url}`);
      }
    }
  })
);
rmSync(scratch, { recursive: true, force: true });

const facts = [...byUrl.values()].reduce((sum, list) => sum + list.length, 0);
for (const p of problems) console.log("CHANGED " + p);
console.log(`${facts - problems.length}/${facts} quoted facts still match their official pages (${urls.length} pages).`);
process.exitCode = problems.length ? 1 : 0;

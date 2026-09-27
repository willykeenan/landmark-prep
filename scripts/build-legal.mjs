// Builds data/legal.js from legal/*.md so the static app can show the policies offline.
// Run after editing a policy: node scripts/build-legal.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pages = {};
for (const id of ["terms", "privacy", "refunds"]) {
  const md = readFileSync(join(root, "legal", `${id}.md`), "utf8");
  const title = (md.match(/^# (.+)$/m) || [])[1];
  if (!title) throw new Error(`legal/${id}.md has no # title`);
  pages[id] = { title, md: md.replace(/^# .+\n+/, "") };
}
writeFileSync(
  join(root, "data", "legal.js"),
  "/* Generated from legal/*.md by scripts/build-legal.mjs. Edit the markdown, then rebuild. */\n" +
    "window.NYRE = window.NYRE || {};\nwindow.NYRE.legal = " + JSON.stringify(pages, null, 1) + ";\n"
);
console.log("data/legal.js: " + Object.keys(pages).join(", "));

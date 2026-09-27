// Builds tutor/knowledge.md (the tutor's reference notes) from the study kit's data files.
// Run: node tutor/build_knowledge.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ["units-a", "units-b", "units-c", "roadmap"]) vm.runInContext(readFileSync(join(root, "data", f + ".js"), "utf8"), ctx);
const N = ctx.window.NYRE;
const plain = (s) => s.replace(/\*\*(.+?)\*\*/g, "$1");
let md = "Summary of the official NYS DOS 77-hour salesperson syllabus (eff. 12/21/2022), checked against the DOS Real Estate License Law booklet (March 2026 edition) and DOS pages as of " + N.roadmap.checkedOn + ".\n";
for (const u of [...N.units].sort((a, b) => a.id - b.id)) {
  md += `\n### Unit ${u.id}: ${u.title} (${u.hours} syllabus hours)\n`;
  for (const s of u.sections) {
    md += `${s.h}:\n` + s.b.map((b) => "- " + plain(b)).join("\n") + "\n";
  }
  if (u.numbers?.length) md += "Numbers: " + u.numbers.map((n) => `${plain(n[0])} = ${plain(n[1])}`).join("; ") + "\n";
  if (u.traps?.length) md += "Traps: " + u.traps.map(plain).join(" | ") + "\n";
}
md += "\n### Getting licensed (roadmap)\n";
for (const s of N.roadmap.steps) md += `${s.title} (${s.cost}):\n` + s.body.map((b) => "- " + plain(b)).join("\n") + "\n";
writeFileSync(join(root, "tutor", "knowledge.md"), md);
console.log("knowledge.md:", md.length, "chars");

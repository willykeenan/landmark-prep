"""Merge quote-verified state facts (PowerSwarm fact-check evidence) into data/states.js.

Usage: python3 scripts/merge-state-evidence.py EVIDENCE_DIR
EVIDENCE_DIR holds g1.json..g5.json, each checked by tools/check_evidence.mjs
(every non-null fact quoted verbatim from an official page that was fetched and searched).
"""
import json, re, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FACTS = ["prelicenseHours", "examVendor", "nationalQuestions", "stateQuestions", "passingScore"]
VERIFIED_ON = "2026-09-27"
# Ratio-style scores read naturally only with the quote's own words.
PASSING_TEXT = {
    "IA": "84 correct combined, 28 on the state portion",
    "TX": "56 correct national, 28 correct state",
    "VA": "56 correct national, 30 correct state",
    "IL": "70% / 75% (see the bulletin)",
}
NOTES = {
    "WY": "Wyoming's statute sets a minimum of 30 class hours; approved courses may require more. Confirm with the Wyoming Real Estate Commission.",
    "IA": "A 60-hour pre-license course plus three 12-hour courses (Buying Practices, Listing Practices, and Developing Professionalism and Ethical Practices).",
}

def draft_states():
    out = subprocess.run(
        ["node", "-e", "global.window={};require(process.argv[1]);console.log(JSON.stringify(window.NYRE.states))", str(ROOT / "data" / "states.js")],
        capture_output=True, text=True, check=True).stdout
    return json.loads(out)

def norm(code, fact, value):
    if value is None:
        return None
    if fact == "prelicenseHours":
        return sum(int(x) for x in re.findall(r"\d+", str(value)))
    if fact in ("nationalQuestions", "stateQuestions"):
        return int(value)
    if fact == "passingScore":
        if code in PASSING_TEXT:
            return PASSING_TEXT[code]
        return f"{value} or higher" if isinstance(value, int) or str(value).isdigit() else str(value)
    if fact == "examVendor" and value == "Pearson":
        return "Pearson VUE"
    return value

def main(evidence_dir):
    evidence = {}
    for g in ["g1", "g2", "g3", "g4", "g5"]:
        evidence.update(json.load(open(Path(evidence_dir) / f"{g}.json"))["states"])
    states = []
    for s in draft_states():
        e = evidence[s["code"]]
        row = {"code": s["code"], "name": s["name"], "agency": s["agency"], "url": s["url"]}
        cites = {}
        for f in FACTS:
            fact = e[f]
            row[f] = norm(s["code"], f, fact["value"])
            if fact["value"] is not None:
                cites[f] = {"url": fact["url"], "quote": fact["quote"]}
        row["notes"] = NOTES.get(s["code"], "")
        row["evidence"] = cites
        row["sources"] = sorted({c["url"] for c in cites.values()}) or [s["url"]]
        row["verified"] = VERIFIED_ON if cites else None
        states.append(row)
    body = ",\n".join("    " + json.dumps(r, ensure_ascii=False) for r in states)
    (ROOT / "data" / "states.js").write_text(
        "/* Landmark Prep: entry-level real estate licensing facts for 50 states + DC.\n"
        " * Every non-null fact is quoted verbatim from an official page (regulator, .gov, or exam-vendor\n"
        " * candidate bulletin) and was machine-checked against the live page on " + VERIFIED_ON + ".\n"
        " * null = not confirmed from an official source. Built by scripts/merge-state-evidence.py. Not legal advice. */\n"
        "(function (NYRE) {\n  NYRE.states = [\n" + body + "\n  ];\n})((window.NYRE = window.NYRE || {}));\n")
    confirmed = sum(1 for r in states if r["prelicenseHours"] is not None)
    print(f"{len(states)} states, {confirmed} with quoted hours, {sum(len(r['evidence']) for r in states)} quoted facts")

if __name__ == "__main__":
    main(sys.argv[1])

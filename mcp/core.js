// Landmark Prep MCP server core: read-only study tools that ChatGPT and Claude can call.
// Public content only (the same open-source notes, questions and state facts as the site),
// so it needs no login and keeps no state. Transport-free: handle() takes one parsed JSON-RPC
// message and returns { status, body }. api/mcp.js adapts it to Vercel; tests call it directly.
"use strict";
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const vm = require("node:vm");

const ROOT = join(__dirname, "..");
// Classic (initialize-handshake) protocol versions. Clients that speak the newer stateless
// revision fall back to initialize when a request of theirs is refused with a plain 400.
const VERSIONS = ["2025-11-25", "2025-06-18", "2025-03-26", "2024-11-05"];
const SERVER_INFO = { name: "landmark-prep", title: "Landmark Prep", version: "1.0.0" };
const INSTRUCTIONS =
  "Landmark Prep is free exam prep for the real estate salesperson license in every US state. " +
  "Ask which state the user is getting licensed in if you don't know. New York has the full state course; " +
  "every other state uses the national exam core. Quiz one question at a time: call practice_questions, " +
  "show the question and choices without the answer, wait for the user's reply, then call check_answer. " +
  "State licensing facts are quoted from official sources; cite the source link when you use one.";

/* ---------- content ---------- */
const FILES = ["units-a", "units-b", "units-c", "questions-a", "questions-b", "questions-c", "national-units",
  "national-questions-a", "national-questions-b", "glossary", "roadmap", "states"];
function loadContent() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  for (const f of FILES) vm.runInContext(readFileSync(join(ROOT, "data", f + ".js"), "utf8"), ctx, { filename: f + ".js" });
  const N = ctx.window.NYRE;
  // Same question ids as the app (unit + a short hash of the question text).
  const hash = (s) => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0; return h.toString(36); };
  for (const q of N.questions) q.id = "u" + q.u + "-" + hash(q.q);
  return N;
}
const N = loadContent();
const QBY = new Map(N.questions.map((q) => [q.id, q]));
const STATES = new Map(N.states.map((s) => [s.code, s]));
const LETTERS = ["A", "B", "C", "D"];

const plain = (s) => String(s).replace(/\*\*/g, "");
function stateCode(v) {
  if (v == null || v === "") return null;
  const s = String(v).trim().toUpperCase();
  if (STATES.has(s)) return s;
  for (const st of N.states) if (st.name.toUpperCase() === s) return st.code;
  return undefined; // given but not recognized
}
function unitsFor(code) {
  const list = code === "NY" ? N.units : N.nationalUnits;
  return list.slice().sort((a, b) => a.id - b.id);
}
function trackLabel(code) {
  return code === "NY" ? "the New York 77-hour course" : "the national exam core" + (code ? " (" + STATES.get(code).name + " state law is not covered yet)" : "");
}
function findUnits(code, topic) {
  const units = unitsFor(code);
  const t = String(topic || "").trim().toLowerCase();
  if (!t) return [];
  const byId = units.find((u) => String(u.id) === t);
  if (byId) return [byId];
  const words = t.split(/\W+/).filter((w) => w.length > 2);
  const scored = units.map((u) => {
    const title = u.title.toLowerCase();
    const body = (u.intro + " " + u.sections.map((s) => s.h + " " + s.b.join(" ")).join(" ")).toLowerCase();
    let score = title.includes(t) ? 50 : 0;
    for (const w of words) score += (title.includes(w) ? 8 : 0) + Math.min(5, body.split(w).length - 1);
    return { u, score };
  }).filter((x) => x.score > 0).sort((a, b) => b.score - a.score);
  // A second topic only when it matches nearly as well as the best one.
  return scored.filter((x, i) => i === 0 || (i === 1 && x.score >= scored[0].score * 0.6)).map((x) => x.u);
}

/* ---------- tools ---------- */
const STATE_PROP = { type: "string", description: "Two-letter state code or state name, e.g. NY or New York." };
const TOOLS = [
  {
    name: "licensing_steps",
    title: "Licensing steps for a state",
    description: "The step-by-step path to a real estate salesperson license in a state: what to do next at each step, costs, and official links.",
    inputSchema: { type: "object", properties: { state: STATE_PROP }, required: ["state"], additionalProperties: false },
  },
  {
    name: "state_requirements",
    title: "State licensing requirements",
    description: "Pre-licensing hours, exam vendor, question counts and passing score for a state, each quoted from an official source with a link.",
    inputSchema: { type: "object", properties: { state: STATE_PROP }, required: ["state"], additionalProperties: false },
  },
  {
    name: "list_topics",
    title: "List study topics",
    description: "The study topics (units) for a state's exam, with ids to use with study_notes and practice_questions.",
    inputSchema: { type: "object", properties: { state: STATE_PROP }, additionalProperties: false },
  },
  {
    name: "study_notes",
    title: "Study notes for a topic",
    description: "Landmark Prep's notes for one topic: the rules, the numbers to memorize and the exam traps. Topic can be a unit id or keywords like 'dual agency'.",
    inputSchema: {
      type: "object",
      properties: { state: STATE_PROP, topic: { type: "string", description: "Unit id (e.g. 2 or 105) or keywords." } },
      required: ["topic"], additionalProperties: false,
    },
  },
  {
    name: "practice_questions",
    title: "Practice questions",
    description: "Original multiple-choice practice questions without answers. Show one at a time, wait for the user's answer, then call check_answer.",
    inputSchema: {
      type: "object",
      properties: {
        state: STATE_PROP,
        topic: { type: "string", description: "Optional unit id or keywords; leave empty for a mix." },
        count: { type: "integer", minimum: 1, maximum: 10, description: "How many questions (default 5)." },
      },
      additionalProperties: false,
    },
  },
  {
    name: "check_answer",
    title: "Check an answer",
    description: "Check the user's answer to a practice question and get the explanation.",
    inputSchema: {
      type: "object",
      properties: {
        question_id: { type: "string", description: "The id from practice_questions." },
        answer: { type: "string", description: "The letter (A-D) or the text of the chosen answer." },
      },
      required: ["question_id", "answer"], additionalProperties: false,
    },
  },
].map((t) => ({ ...t, annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false } }));

class ToolError extends Error {}
function needState(args, required) {
  const code = stateCode(args.state);
  if (code === undefined) throw new ToolError(`Unknown state "${args.state}". Use a two-letter code like NY or TX.`);
  if (code === null && required) throw new ToolError("Which state? Pass a two-letter code like NY or TX.");
  return code;
}

const FACTS = [["prelicenseHours", "Pre-licensing hours"], ["examVendor", "Exam vendor"], ["nationalQuestions", "National questions"],
  ["stateQuestions", "State questions"], ["passingScore", "Passing score"]];

function genericSteps(code) {
  const f = STATES.get(code);
  const hours = f.prelicenseHours ? `${f.prelicenseHours} hours of pre-licensing education` : "the required pre-licensing education";
  return [
    { title: "Check the requirements", next: `Read the eligibility rules on the ${f.agency} site.`, cost: "$0", links: [[f.agency, f.url]] },
    { title: "Complete your pre-licensing education", next: `Finish ${hours} at a school approved by the ${f.agency}.`, cost: "varies", links: [] },
    { title: "Schedule and pass the state exam", next: f.examVendor ? `The exam is given by ${f.examVendor}. Book it once your practice scores are strong.` : "Book the state exam; format and fees are on the official site.", cost: "varies", links: [[f.agency, f.url]] },
    { title: "Find a sponsoring broker", next: "Most states require new salespersons to work under a licensed broker.", cost: "$0", links: [] },
    { title: "Apply for your license", next: "Submit the application, fees and any background check your state requires.", cost: "varies", links: [[f.agency, f.url]] },
  ];
}

function callTool(name, args) {
  args = args && typeof args === "object" ? args : {};
  if (name === "licensing_steps") {
    const code = needState(args, true);
    const steps = code === "NY"
      ? N.roadmap.steps.map((s) => ({ title: s.title, next: plain(s.next || s.body[0]), cost: s.cost, details: s.body.map(plain), links: s.links || [] }))
      : genericSteps(code);
    const text = `Licensing steps for ${STATES.get(code).name}` + (code === "NY" ? ` (checked against the NY Department of State, ${N.roadmap.checkedOn}):` : ":") + "\n\n" +
      steps.map((s, i) => `${i + 1}. ${s.title} (${s.cost})\n   Next: ${s.next}` + (s.links.length ? "\n   Links: " + s.links.map((l) => `${l[0]} ${l[1]}`).join(" | ") : "")).join("\n\n") +
      (code === "NY" ? "\n\nMinimum total: $80 (free approved 77-hour course, free library proctoring, $15 exam, $65 license)." : "\n\nConfirm every step on the official site.");
    return { text, structured: { state: code, steps } };
  }
  if (name === "state_requirements") {
    const code = needState(args, true);
    const f = STATES.get(code);
    const facts = FACTS.map(([k, label]) => ({ key: k, label, value: f[k] ?? null, quote: f.evidence?.[k]?.quote || null, source: f.evidence?.[k]?.url || null }));
    const text = `${f.name} (regulator: ${f.agency}, ${f.url})\n` +
      facts.map((x) => x.value == null ? `- ${x.label}: not confirmed from an official source` : `- ${x.label}: ${x.value}\n  Quote: "${x.quote}"\n  Source: ${x.source}`).join("\n") +
      (f.notes ? `\nNote: ${f.notes}` : "") + (f.verified ? `\nChecked ${f.verified}.` : "");
    return { text, structured: { state: code, agency: f.agency, url: f.url, verified: f.verified, facts } };
  }
  if (name === "list_topics") {
    const code = needState(args, false);
    const units = unitsFor(code).map((u) => ({ id: u.id, title: u.title, hours: u.hours }));
    return { text: `Topics for ${trackLabel(code)}:\n` + units.map((u) => `${u.id}. ${u.title}`).join("\n"), structured: { units } };
  }
  if (name === "study_notes") {
    const code = needState(args, false);
    const found = findUnits(code, args.topic);
    if (!found.length) throw new ToolError(`No topic matches "${args.topic}". Call list_topics to see the ids.`);
    const parts = found.map((u) =>
      `# ${u.id}. ${u.title}\n${plain(u.intro)}\n\n` +
      u.sections.map((s) => `## ${s.h}\n` + s.b.map((b) => "- " + plain(b)).join("\n")).join("\n\n") +
      (u.numbers && u.numbers.length ? "\n\n## Numbers to know\n" + u.numbers.map((n) => `- ${plain(n[0])}: ${plain(n[1])}`).join("\n") : "") +
      (u.traps && u.traps.length ? "\n\n## Exam traps\n" + u.traps.map((t) => "- " + plain(t)).join("\n") : ""));
    const text = parts.join("\n\n").slice(0, 12000);
    return { text, structured: { units: found.map((u) => ({ id: u.id, title: u.title })) } };
  }
  if (name === "practice_questions") {
    const code = needState(args, false);
    const count = Math.max(1, Math.min(10, parseInt(args.count, 10) || 5));
    let unitIds = unitsFor(code).map((u) => u.id);
    if (args.topic) {
      const found = findUnits(code, args.topic);
      if (!found.length) throw new ToolError(`No topic matches "${args.topic}". Call list_topics to see the ids.`);
      unitIds = found.map((u) => u.id);
    }
    const pool = N.questions.filter((q) => unitIds.includes(q.u));
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    const picked = pool.slice(0, count).map((q) => ({ question_id: q.id, question: q.q, choices: q.c.map((c, i) => `${LETTERS[i]}) ${c}`) }));
    const text = picked.map((q, i) => `Q${i + 1} [id ${q.question_id}]\n${q.question}\n${q.choices.join("\n")}`).join("\n\n") +
      "\n\nAsk these one at a time and wait for the user's answer before calling check_answer.";
    return { text, structured: { questions: picked } };
  }
  if (name === "check_answer") {
    const q = QBY.get(String(args.question_id || ""));
    if (!q) throw new ToolError("Unknown question_id. Use an id returned by practice_questions.");
    const a = String(args.answer || "").trim();
    let pick = LETTERS.indexOf(a.toUpperCase().replace(/[).\s]/g, ""));
    if (pick < 0) pick = q.c.findIndex((c) => c.trim().toLowerCase() === a.toLowerCase());
    if (pick < 0) throw new ToolError("Answer with a letter A-D or the exact text of a choice.");
    const correct = pick === q.a;
    const text = (correct ? "Correct." : `Not quite. The answer is ${LETTERS[q.a]}) ${q.c[q.a]}.`) + " " + plain(q.e);
    return { text, structured: { correct, correct_answer: LETTERS[q.a], correct_text: q.c[q.a], explanation: plain(q.e) } };
  }
  throw new ToolError(`Unknown tool: ${name}`);
}

/* ---------- JSON-RPC ---------- */
const reply = (id, result) => ({ status: 200, body: { jsonrpc: "2.0", id, result } });
const fail = (id, code, message, status = 200) => ({ status, body: { jsonrpc: "2.0", id: id ?? null, error: { code, message } } });

function handle(msg, headers = {}) {
  if (!msg || typeof msg !== "object" || Array.isArray(msg) || msg.jsonrpc !== "2.0") {
    return fail(null, -32600, "Send one JSON-RPC 2.0 message per request.", 400);
  }
  const isRequest = msg.id !== undefined && msg.id !== null && typeof msg.method === "string";
  if (!isRequest) return { status: 202, body: null }; // notifications and responses are accepted, nothing to do
  const { id, method, params = {} } = msg;
  if (method === "initialize") {
    const asked = params && params.protocolVersion;
    return reply(id, {
      protocolVersion: VERSIONS.includes(asked) ? asked : VERSIONS[0],
      capabilities: { tools: { listChanged: false } },
      serverInfo: SERVER_INFO,
      instructions: INSTRUCTIONS,
    });
  }
  // A request in the newer stateless style (a version we don't speak, no handshake) gets a plain
  // 400 so the client falls back to initialize.
  const v = headers["mcp-protocol-version"];
  if (v && !VERSIONS.includes(v)) {
    return fail(id, -32600, `Unsupported protocol version ${v}. This server speaks ${VERSIONS.join(", ")}; start with initialize.`, 400);
  }
  if (method === "ping") return reply(id, {});
  if (method === "tools/list") return reply(id, { tools: TOOLS });
  if (method === "tools/call") {
    const name = params.name;
    if (!TOOLS.some((t) => t.name === name)) return fail(id, -32602, `Unknown tool: ${name}`);
    try {
      const out = callTool(name, params.arguments);
      return reply(id, { content: [{ type: "text", text: out.text }], structuredContent: out.structured, isError: false });
    } catch (e) {
      if (e instanceof ToolError) return reply(id, { content: [{ type: "text", text: e.message }], isError: true });
      throw e;
    }
  }
  if (method === "resources/list") return reply(id, { resources: [] });
  if (method === "prompts/list") return reply(id, { prompts: [] });
  return fail(id, -32601, `Method not found: ${method}`);
}

module.exports = { handle, TOOLS, VERSIONS, SERVER_INFO, questionCount: N.questions.length };

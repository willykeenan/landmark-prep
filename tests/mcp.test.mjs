// Protocol and tool checks for the MCP server (api/mcp.js + mcp/core.js), run over real HTTP
// against the same handler Vercel runs. No dependencies. Run: node tests/mcp.test.mjs
import http from "node:http";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const handler = require("../api/mcp.js");
const server = http.createServer((req, res) => handler(req, res));
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const URL_ = `http://127.0.0.1:${server.address().port}/api/mcp`;

let failed = 0, passed = 0;
const ok = (cond, name) => { if (cond) { passed++; console.log("PASS " + name); } else { failed++; console.log("FAIL " + name); } };
let nextId = 1;
async function rpc(method, params, extraHeaders = {}) {
  const res = await fetch(URL_, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream", ...extraHeaders },
    body: JSON.stringify({ jsonrpc: "2.0", id: nextId++, method, params }),
  });
  return { status: res.status, body: res.status === 202 ? null : await res.json() };
}
const call = async (name, args) => (await rpc("tools/call", { name, arguments: args }, { "MCP-Protocol-Version": "2025-06-18" })).body.result;

try {
  const init = await rpc("initialize", { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "test", version: "1" } });
  ok(init.status === 200 && init.body.result.protocolVersion === "2025-06-18" && init.body.result.serverInfo.name === "landmark-prep" && init.body.result.capabilities.tools, "initialize negotiates the client's version and offers tools");
  const newer = await rpc("initialize", { protocolVersion: "2099-01-01", capabilities: {}, clientInfo: { name: "t", version: "1" } });
  ok(newer.body.result.protocolVersion === "2025-11-25", "an unknown version gets our latest instead");
  const note = await fetch(URL_, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) });
  ok(note.status === 202 && (await note.text()) === "", "notifications get 202 with no body");

  const list = (await rpc("tools/list", {}, { "MCP-Protocol-Version": "2025-06-18" })).body.result.tools;
  const names = list.map((t) => t.name).sort().join(",");
  ok(names === "check_answer,licensing_steps,list_topics,practice_questions,state_requirements,study_notes", "tools/list offers the six study tools");
  ok(list.every((t) => t.inputSchema && t.inputSchema.type === "object" && t.annotations.readOnlyHint === true), "every tool has an input schema and is read-only");

  const steps = await call("licensing_steps", { state: "New York" });
  ok(!steps.isError && steps.content[0].text.includes("Get your New York photo ID") && steps.content[0].text.includes("learncycle.com"), "licensing_steps for New York includes the free course and the NY ID step");
  const tx = await call("licensing_steps", { state: "tx" });
  ok(!tx.isError && tx.structuredContent.steps.length === 5 && tx.content[0].text.includes("Pearson VUE"), "licensing_steps works for other states");
  const req = await call("state_requirements", { state: "FL" });
  ok(req.content[0].text.includes("63") && req.content[0].text.includes("Quote:") && req.content[0].text.includes("https://"), "state_requirements gives quoted facts with sources");
  const ct = await call("state_requirements", { state: "CT" });
  ok(ct.content[0].text.includes("not confirmed"), "unconfirmed facts are labelled, never guessed");
  const topics = await call("list_topics", { state: "NY" });
  ok(topics.structuredContent.units.length === 19, "list_topics gives the 19 New York units");
  const natl = await call("list_topics", {});
  ok(natl.structuredContent.units.length === 11, "without a state, list_topics gives the national core");
  const notes = await call("study_notes", { state: "NY", topic: "dual agency" });
  ok(!notes.isError && /agency/i.test(notes.structuredContent.units[0].title) && notes.content[0].text.includes("## "), "study_notes finds a topic by keywords");
  const agencyQs = await call("practice_questions", { state: "NY", topic: "agency", count: 10 });
  ok(agencyQs.structuredContent.questions.every((q) => q.question_id.startsWith("u2-")), "a keyword topic draws questions from the matching unit only");
  const byId = await call("study_notes", { topic: "105" });
  ok(byId.structuredContent.units[0].id === 105, "study_notes finds a topic by id");

  const qs = await call("practice_questions", { state: "NY", topic: "2", count: 3 });
  const q0 = qs.structuredContent.questions[0];
  ok(qs.structuredContent.questions.length === 3 && q0.choices.length === 4 && q0.question_id.startsWith("u2-"), "practice_questions returns questions for a topic");
  ok(!JSON.stringify(qs).match(/"(correct|explanation|a)":/), "practice_questions never includes the answers");
  let right = null;
  for (const L of ["A", "B", "C", "D"]) {
    const r = await call("check_answer", { question_id: q0.question_id, answer: L });
    if (r.structuredContent.correct) right = L;
  }
  ok(right !== null, "exactly one letter checks as correct");
  const wrong = await call("check_answer", { question_id: q0.question_id, answer: right === "A" ? "B" : "A" });
  ok(wrong.structuredContent.correct === false && wrong.content[0].text.startsWith("Not quite"), "a wrong answer gets the correct one and the explanation");
  const byText = await call("check_answer", { question_id: q0.question_id, answer: q0.choices["ABCD".indexOf(right)].slice(3) });
  ok(byText.structuredContent.correct === true, "answers can be given as the choice text");

  const badState = await call("licensing_steps", { state: "Narnia" });
  ok(badState.isError === true && badState.content[0].text.includes("Unknown state"), "an unknown state is a tool error, not a crash");
  const missing = await call("licensing_steps", {});
  ok(missing.isError === true, "a missing state asks which state");
  const unknownTool = await rpc("tools/call", { name: "nope", arguments: {} });
  ok(unknownTool.body.error && unknownTool.body.error.code === -32602, "an unknown tool is an invalid-params error");
  const unknownMethod = await rpc("sampling/createMessage", {});
  ok(unknownMethod.body.error && unknownMethod.body.error.code === -32601, "unknown methods get method-not-found");
  const modern = await rpc("tools/list", {}, { "MCP-Protocol-Version": "2026-07-28" });
  ok(modern.status === 400 && modern.body.error.code === -32600 && modern.body.error.message.includes("initialize"), "a stateless-era request gets a plain 400 so the client falls back to initialize");

  const get = await fetch(URL_, { headers: { Accept: "text/event-stream" } });
  ok(get.status === 405, "GET is 405 (no SSE stream offered)");
  const opt = await fetch(URL_, { method: "OPTIONS" });
  ok(opt.status === 204 && opt.headers.get("access-control-allow-origin") === "*", "CORS preflight is allowed");
  const junk = await fetch(URL_, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{not json" });
  ok(junk.status === 400 && (await junk.json()).error.code === -32700, "malformed JSON is a parse error");
  const batch = await fetch(URL_, { method: "POST", headers: { "Content-Type": "application/json" }, body: "[]" });
  ok(batch.status === 400, "batches are refused (one message per request)");
} finally {
  server.close();
}
console.log(`\nMCP: ${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);

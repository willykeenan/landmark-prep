// Vercel function for the Landmark Prep MCP server (see mcp/core.js). Streamable HTTP:
// POST one JSON-RPC message, get one JSON response. No SSE stream, no sessions, no login.
"use strict";
const { handle } = require("../mcp/core.js");

function readBody(req) {
  if (req.body !== undefined) return Promise.resolve(typeof req.body === "string" ? req.body : JSON.stringify(req.body));
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (c) => { data += c; if (data.length > 256 * 1024) reject(new Error("too large")); });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

module.exports = async (req, res) => {
  // Public, read-only content, so any origin may call it (ChatGPT and Claude call from their servers).
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, Authorization, Mcp-Protocol-Version, Mcp-Session-Id, Mcp-Method, Mcp-Name");
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") { res.statusCode = 204; return res.end(); }
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Allow", "POST, OPTIONS");
    return res.end();
  }
  let msg;
  try {
    msg = JSON.parse(await readBody(req));
  } catch {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }));
  }
  const out = handle(msg, { "mcp-protocol-version": req.headers["mcp-protocol-version"] });
  res.statusCode = out.status;
  if (out.body === null) return res.end();
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(out.body));
};

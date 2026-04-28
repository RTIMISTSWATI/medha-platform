const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const app = express();
const PORT = 5001;

// ── Temp file paths ───────────────────────────────────────────
const TEMP_CODE = path.join(__dirname, "temp.py");
const TEMP_INPUT = path.join(__dirname, "input.txt");

// ── Middleware ────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Health check ──────────────────────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok", service: "code-execution" }));

// ── Helpers ───────────────────────────────────────────────────
function runPython(input) {
  fs.writeFileSync(TEMP_INPUT, input);
  return new Promise((resolve) => {
    exec(
      `python "${TEMP_CODE}" < "${TEMP_INPUT}"`,
      { timeout: 10000 },
      (error, stdout, stderr) => {
        if (error) {
          resolve({ error: stderr.trim() || error.message });
        } else {
          resolve({ output: stdout });
        }
      }
    );
  });
}

// ── POST /execute ─────────────────────────────────────────────
// Supports two modes:
//   Playground : { language, code, input }          → returns { output } | { error }
//   Judge      : { language, code, testCases }       → returns { status, results }
app.post("/execute", async (req, res) => {
  const { language, code, input, testCases } = req.body;

  if (!language || !code) {
    return res.status(400).json({ error: "language and code are required" });
  }

  if (language !== "python") {
    return res.status(400).json({ error: `Language "${language}" is not supported yet` });
  }

  fs.writeFileSync(TEMP_CODE, code);

  // ── Judge mode ──────────────────────────────────────────────
  if (Array.isArray(testCases) && testCases.length > 0) {
    const results = [];

    for (let i = 0; i < testCases.length; i++) {
      const { input: tcInput = "", expectedOutput = "" } = testCases[i];
      const result = await runPython(tcInput);

      if (result.error) {
        results.push({ testCase: i + 1, status: "Runtime Error", error: result.error });
        return res.json({ status: "Runtime Error", results });
      }

      const actual = result.output.trim();
      const expected = expectedOutput.trim();

      if (actual === expected) {
        results.push({ testCase: i + 1, status: "Passed" });
      } else {
        results.push({ testCase: i + 1, status: "Wrong Answer", expected, actual });
        return res.json({ status: "Wrong Answer", results });
      }
    }

    return res.json({ status: "Accepted", results });
  }

  // ── Playground mode ─────────────────────────────────────────
  const result = await runPython(input ?? "");
  return res.json(result);
});

// ── Start ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[code-execution] Judge running on http://localhost:${PORT}`);
});

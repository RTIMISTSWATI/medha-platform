const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ── Health ────────────────────────────────────────────────────
app.get("/health", (_req, res) => res.json({ status: "ok", service: "server" }));

// ── Routes (Phase 2) ──────────────────────────────────────────
// app.use("/api/auth",     require("./routes/auth"));
// app.use("/api/problems", require("./routes/problems"));
// app.use("/api/users",    require("./routes/users"));

module.exports = app;

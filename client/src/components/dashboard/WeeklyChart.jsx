// ADDED
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Custom tooltip styled to match the dark academia theme
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(20,16,12,0.92)",
      border: "1px solid rgba(194,168,120,0.25)",
      borderRadius: 8,
      padding: "8px 14px",
      fontSize: 12,
      color: "#e8dcc7",
    }}>
      <p style={{ color: "#c2a878", fontWeight: 700, marginBottom: 2 }}>{label}</p>
      <p>{payload[0].value} task{payload[0].value !== 1 ? "s" : ""} completed</p>
    </div>
  );
}

// ADDED
export default function WeeklyChart({ data }) {
  // SAFETY: always work with a valid array
  const safeData = Array.isArray(data) && data.length > 0 ? data : [
    { day: "Sun", count: 0 },
    { day: "Mon", count: 0 },
    { day: "Tue", count: 0 },
    { day: "Wed", count: 0 },
    { day: "Thu", count: 0 },
    { day: "Fri", count: 0 },
    { day: "Sat", count: 0 },
  ];

  // ADDED: debug log
  console.log("Weekly Data:", safeData);

  return (
    <div style={{
      background: "var(--bg-surface, #1e293b)",
      border: "1px solid var(--border, #334155)",
      borderRadius: 14,
      padding: "20px 20px 12px",
    }}>
      <div style={{ marginBottom: 14 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text, #e2e8f0)" }}>
          📊 Weekly Activity
        </span>
        <span style={{ fontSize: 11, color: "var(--text-muted, #94a3b8)", marginLeft: 10 }}>
          Completed tasks · last 7 days
        </span>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={safeData} margin={{ top: 8, right: 16, left: -20, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(194,168,120,0.08)"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={{ stroke: "rgba(194,168,120,0.12)" }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(194,168,120,0.15)" }} />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#c2a878"
            strokeWidth={2}
            dot={{ fill: "#c2a878", r: 4, strokeWidth: 0 }}
            activeDot={{ fill: "#f0e6d3", r: 5, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

import React from "react";
import styles from "./OverviewCards.module.css";

const CARDS = [
  { key: "studyHours",       label: "Study Hours",         icon: "⏱️", unit: "h",  accent: "#3b82f6" },
  { key: "completedTasks",   label: "Tasks Completed",     icon: "✅", unit: "",   accent: "#22c55e" },
  { key: "notesCount",       label: "Notes Created",       icon: "📝", unit: "",   accent: "#a855f7" },
  { key: "productivityScore",label: "Productivity Score",  icon: "⚡", unit: "%",  accent: "#f59e0b" },
  { key: "pendingTasks",     label: "Pending Tasks",       icon: "⏳", unit: "",   accent: "#ef4444" },
];

export default function OverviewCards({ stats }) {
  if (!stats) return null;

  return (
    <div className={styles.grid}>
      {CARDS.map((card) => (
        <div key={card.key} className={styles.card} style={{ "--accent": card.accent }}>
          <div className={styles.glow} />
          <div className={styles.top}>
            <span className={styles.icon}>{card.icon}</span>
            <span className={styles.label}>{card.label}</span>
          </div>
          <div className={styles.value}>
            {stats[card.key] ?? 0}
            <span className={styles.unit}>{card.unit}</span>
          </div>
          <div className={styles.bar}>
            <div
              className={styles.barFill}
              style={{
                width: card.unit === "%" ? `${Math.min(100, stats[card.key] ?? 0)}%` : "100%",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

import React from "react";
import styles from "./StatsBar.module.css";

function StatCard({ icon, label, value, sub, accent }) {
  return (
    <div className={styles.card} style={{ "--card-accent": accent }}>
      <div className={styles.cardIcon}>{icon}</div>
      <div className={styles.cardBody}>
        <span className={styles.cardValue}>{value}</span>
        <span className={styles.cardLabel}>{label}</span>
        {sub && <span className={styles.cardSub}>{sub}</span>}
      </div>
    </div>
  );
}

export default function StatsBar({ stats }) {
  return (
    <div className={styles.bar}>
      <StatCard
        icon="✅"
        label="Completed Today"
        value={stats.completedToday}
        sub={`of ${stats.totalToday} due today`}
        accent="#22c55e"
      />
      <StatCard
        icon="📈"
        label="Weekly Progress"
        value={`${stats.weeklyPct}%`}
        sub="last 7 days"
        accent="#3b82f6"
      />
      <StatCard
        icon="⚡"
        label="Productivity"
        value={`${stats.productivityScore}%`}
        sub="all-time score"
        accent="#a855f7"
      />
      <StatCard
        icon="⏳"
        label="Pending Tasks"
        value={stats.totalPending}
        sub={`${stats.totalCompleted} completed`}
        accent="#f59e0b"
      />
    </div>
  );
}

import React from "react";
import { WEEK_DAYS, CHART_COLORS } from "../../constants/dashboard";
import { PLANNER_SUBJECTS } from "../../constants/planner";
import styles from "./ProgressCharts.module.css";

function WeeklyChart({ weeklyData }) {
  const max = Math.max(...weeklyData, 1);
  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <span className={styles.chartTitle}>📈 Weekly Consistency</span>
        <span className={styles.chartSub}>Tasks completed per day</span>
      </div>
      <div className={styles.barChart}>
        {WEEK_DAYS.map((day, i) => {
          const val = weeklyData[i] ?? 0;
          const pct = Math.round((val / max) * 100);
          const isToday = i === new Date().getDay() - 1;
          return (
            <div key={day} className={styles.barCol}>
              <span className={styles.barVal}>{val > 0 ? val : ""}</span>
              <div className={styles.barTrack}>
                <div
                  className={`${styles.barFill} ${isToday ? styles.barToday : ""}`}
                  style={{ height: `${Math.max(pct, val > 0 ? 8 : 0)}%` }}
                />
              </div>
              <span className={`${styles.barDay} ${isToday ? styles.barDayToday : ""}`}>{day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SubjectProgress({ subjectMap }) {
  const subjects = PLANNER_SUBJECTS.filter((s) => subjectMap[s.id]?.total > 0);

  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <span className={styles.chartTitle}>🧩 Subject Progress</span>
        <span className={styles.chartSub}>Tasks by subject</span>
      </div>
      {subjects.length === 0 ? (
        <div className={styles.emptyChart}>Add tasks to see subject breakdown</div>
      ) : (
        <div className={styles.subjectList}>
          {subjects.map((s) => {
            const data = subjectMap[s.id];
            const pct  = Math.round((data.done / data.total) * 100);
            const color = CHART_COLORS[s.id] ?? "#3b82f6";
            return (
              <div key={s.id} className={styles.subjectRow}>
                <div className={styles.subjectMeta}>
                  <span className={styles.subjectIcon}>{s.icon}</span>
                  <span className={styles.subjectLabel}>{s.label}</span>
                  <span className={styles.subjectCount}>{data.done}/{data.total}</span>
                  <span className={styles.subjectPct} style={{ color }}>{pct}%</span>
                </div>
                <div className={styles.subjectTrack}>
                  <div
                    className={styles.subjectFill}
                    style={{ width: `${pct}%`, background: color, boxShadow: `0 0 6px ${color}60` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ProgressCharts({ stats }) {
  if (!stats) return null;
  return (
    <div className={styles.row}>
      <WeeklyChart weeklyData={stats.weeklyData} />
      <SubjectProgress subjectMap={stats.subjectMap} />
    </div>
  );
}

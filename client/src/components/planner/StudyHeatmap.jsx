import React, { useMemo } from "react";
import { HEATMAP_WEEKS } from "../../constants/planner";
import styles from "./StudyHeatmap.module.css";

function getIntensityClass(count) {
  if (!count || count === 0) return styles.cell0;
  if (count === 1)           return styles.cell1;
  if (count <= 3)            return styles.cell2;
  if (count <= 5)            return styles.cell3;
  return                            styles.cell4;
}

function buildGrid(heatmap) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Start from HEATMAP_WEEKS * 7 days ago, aligned to Sunday
  const totalDays = HEATMAP_WEEKS * 7;
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - totalDays + 1);
  // Align to Sunday
  startDate.setDate(startDate.getDate() - startDate.getDay());

  const weeks = [];
  let current = new Date(startDate);

  while (current <= today) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const dateStr = current.toISOString().split("T")[0];
      const isFuture = current > today;
      week.push({
        date: dateStr,
        count: heatmap[dateStr] ?? 0,
        isFuture,
        isToday: current.toDateString() === today.toDateString(),
      });
      current.setDate(current.getDate() + 1);
    }
    weeks.push(week);
  }
  return weeks;
}

const MONTH_LABELS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function StudyHeatmap({ heatmap }) {
  const weeks = useMemo(() => buildGrid(heatmap), [heatmap]);

  const totalDays = useMemo(
    () => Object.values(heatmap).filter((v) => v > 0).length,
    [heatmap]
  );
  const totalTasks = useMemo(
    () => Object.values(heatmap).reduce((a, b) => a + b, 0),
    [heatmap]
  );

  // Month label positions
  const monthLabels = useMemo(() => {
    const labels = [];
    weeks.forEach((week, wi) => {
      const firstDay = week[0];
      if (!firstDay.isFuture) {
        const d = new Date(firstDay.date);
        if (d.getDate() <= 7) {
          labels.push({ wi, month: MONTH_LABELS[d.getMonth()] });
        }
      }
    });
    return labels;
  }, [weeks]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>📅 Study Consistency Heatmap</h3>
          <p className={styles.subtitle}>
            {totalDays} active days · {totalTasks} tasks completed
          </p>
        </div>
        <div className={styles.legend}>
          <span className={styles.legendLabel}>Less</span>
          {[styles.cell0, styles.cell1, styles.cell2, styles.cell3, styles.cell4].map((cls, i) => (
            <span key={i} className={`${styles.legendCell} ${cls}`} />
          ))}
          <span className={styles.legendLabel}>More</span>
        </div>
      </div>

      <div className={styles.gridWrap}>
        {/* Day labels */}
        <div className={styles.dayLabels}>
          {DAY_LABELS.map((d, i) => (
            <span key={i} className={styles.dayLabel}>{i % 2 === 1 ? d : ""}</span>
          ))}
        </div>

        <div className={styles.gridScroll}>
          {/* Month labels */}
          <div className={styles.monthRow}>
            {weeks.map((_, wi) => {
              const ml = monthLabels.find((m) => m.wi === wi);
              return (
                <span key={wi} className={styles.monthLabel}>{ml?.month ?? ""}</span>
              );
            })}
          </div>

          {/* Grid */}
          <div className={styles.grid}>
            {weeks.map((week, wi) => (
              <div key={wi} className={styles.week}>
                {week.map((cell) => (
                  <div
                    key={cell.date}
                    className={`${styles.cell} ${cell.isFuture ? styles.cellFuture : getIntensityClass(cell.count)} ${cell.isToday ? styles.cellToday : ""}`}
                    title={`${cell.date}${cell.count ? ` — ${cell.count} task${cell.count > 1 ? "s" : ""}` : ""}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { RESUME_CHECKLIST } from "../../constants/dashboard";
import styles from "./ResumeTracker.module.css";

function ScoreArc({ score }) {
  const r    = 28;
  const circ = 2 * Math.PI * r;
  const fill = circ - (score / 100) * circ;
  const color = score >= 80 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <div className={styles.arc}>
      <svg width="70" height="70" viewBox="0 0 70 70">
        <circle cx="35" cy="35" r={r} fill="none" stroke="var(--bg-card)" strokeWidth="6" />
        <circle cx="35" cy="35" r={r} fill="none" stroke={color} strokeWidth="6"
          strokeDasharray={circ} strokeDashoffset={fill} strokeLinecap="round"
          transform="rotate(-90 35 35)"
          style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)", filter: `drop-shadow(0 0 5px ${color})` }}
        />
      </svg>
      <div className={styles.arcLabel}>
        <span style={{ color, fontSize: 14, fontWeight: 900 }}>{score}</span>
        <span style={{ fontSize: 9, color: "var(--text-muted)" }}>/ 100</span>
      </div>
    </div>
  );
}

export default function ResumeTracker({ resumeChecks, resumeScore, onToggle }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>📄 Resume Readiness</h3>
          <p className={styles.sub}>Track your resume completeness</p>
        </div>
        <ScoreArc score={resumeScore} />
      </div>

      <div className={styles.list}>
        {RESUME_CHECKLIST.map((item) => {
          const checked = resumeChecks.includes(item.id);
          return (
            <button
              key={item.id}
              className={`${styles.item} ${checked ? styles.itemDone : ""}`}
              onClick={() => onToggle(item.id)}
            >
              <span className={`${styles.check} ${checked ? styles.checkDone : ""}`}>
                {checked ? "✓" : ""}
              </span>
              <span className={styles.itemLabel}>{item.label}</span>
              <span className={styles.itemWeight}>+{item.weight}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.footer}>
        <span className={styles.footerText}>
          {resumeScore >= 80 ? "🎉 ATS-ready resume!" : resumeScore >= 50 ? "📈 Good progress, keep going" : "🚀 Start filling your resume"}
        </span>
      </div>
    </div>
  );
}

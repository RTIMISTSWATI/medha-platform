import React from "react";
import { TARGET_ROLES } from "../../constants/dashboard";
import styles from "./SkillGapAnalyzer.module.css";

function ReadinessRing({ score }) {
  const r   = 36;
  const circ = 2 * Math.PI * r;
  const fill = circ - (score / 100) * circ;
  const color = score >= 70 ? "#22c55e" : score >= 40 ? "#f59e0b" : "#ef4444";

  return (
    <div className={styles.ring}>
      <svg width="90" height="90" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r={r} fill="none" stroke="var(--bg-card)" strokeWidth="7" />
        <circle
          cx="45" cy="45" r={r}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeDasharray={circ}
          strokeDashoffset={fill}
          strokeLinecap="round"
          transform="rotate(-90 45 45)"
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)", filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div className={styles.ringLabel}>
        <span className={styles.ringScore} style={{ color }}>{score}%</span>
        <span className={styles.ringText}>Ready</span>
      </div>
    </div>
  );
}

export default function SkillGapAnalyzer({
  targetRole, setTargetRole,
  currentSkills, setCurrentSkills,
  gapResult, onAnalyze,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>🎯 Skill Gap Analyzer</h3>
          <p className={styles.sub}>Find what's missing for your target role</p>
        </div>
      </div>

      <div className={styles.form}>
        {/* Role selector */}
        <div className={styles.field}>
          <label className={styles.label}>Target Role</label>
          <div className={styles.roleGrid}>
            {TARGET_ROLES.map((r) => (
              <button
                key={r.id}
                className={`${styles.roleBtn} ${targetRole === r.id ? styles.roleBtnActive : ""}`}
                onClick={() => setTargetRole(r.id)}
              >
                <span>{r.icon}</span>
                <span>{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skills input */}
        <div className={styles.field}>
          <label className={styles.label}>Your Current Skills <span className={styles.hint}>(comma or newline separated)</span></label>
          <textarea
            className={styles.textarea}
            placeholder={"e.g. Java, React, SQL, DSA, Git, REST APIs"}
            value={currentSkills}
            onChange={(e) => setCurrentSkills(e.target.value)}
            rows={3}
          />
        </div>

        <button className={styles.analyzeBtn} onClick={onAnalyze}>
          ⚡ Analyze My Readiness
        </button>
      </div>

      {/* Results */}
      {gapResult && (
        <div className={styles.results}>
          <div className={styles.resultsTop}>
            <ReadinessRing score={gapResult.readiness} />
            <div className={styles.resultsSummary}>
              <div className={styles.resultStat}>
                <span className={styles.statNum} style={{ color: "#22c55e" }}>{gapResult.matched.length}</span>
                <span className={styles.statLabel}>Skills Matched</span>
              </div>
              <div className={styles.resultStat}>
                <span className={styles.statNum} style={{ color: "#ef4444" }}>{gapResult.missing.length}</span>
                <span className={styles.statLabel}>Skills Missing</span>
              </div>
              <div className={styles.resultStat}>
                <span className={styles.statNum} style={{ color: "#f59e0b" }}>{gapResult.nice.length}</span>
                <span className={styles.statLabel}>Nice to Have</span>
              </div>
            </div>
          </div>

          {gapResult.missing.length > 0 && (
            <div className={styles.skillSection}>
              <span className={styles.skillSectionLabel}>❌ Missing Skills — Learn These First</span>
              <div className={styles.skillTags}>
                {gapResult.missing.map((s) => (
                  <span key={s} className={`${styles.skillTag} ${styles.skillMissing}`}>{s}</span>
                ))}
              </div>
            </div>
          )}

          {gapResult.matched.length > 0 && (
            <div className={styles.skillSection}>
              <span className={styles.skillSectionLabel}>✅ Skills You Have</span>
              <div className={styles.skillTags}>
                {gapResult.matched.map((s) => (
                  <span key={s} className={`${styles.skillTag} ${styles.skillMatched}`}>{s}</span>
                ))}
              </div>
            </div>
          )}

          <div className={styles.skillSection}>
            <span className={styles.skillSectionLabel}>⭐ Nice to Have</span>
            <div className={styles.skillTags}>
              {gapResult.nice.map((s) => (
                <span key={s} className={`${styles.skillTag} ${styles.skillNice}`}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

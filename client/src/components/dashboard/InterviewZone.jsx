import React, { useState } from "react";
import { DSA_TOPICS, CORE_SUBJECTS, HR_QUESTIONS } from "../../constants/dashboard";
import styles from "./InterviewZone.module.css";

const TABS = ["DSA", "Core Subjects", "HR Questions", "Mock Interviews"];

export default function InterviewZone({
  dsaProgress, onUpdateDSA, totalDSASolved, totalDSAProblems,
  coreProgress, onUpdateCore,
  hrProgress, onToggleHR,
  mockDone, onIncrementMock,
}) {
  const [tab, setTab] = useState("DSA");

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>🎯 Interview Prep Zone</h3>
          <p className={styles.sub}>Track your interview readiness</p>
        </div>
        <div className={styles.totalBadge}>
          <span className={styles.totalNum}>{totalDSASolved}</span>
          <span className={styles.totalLabel}>/ {totalDSAProblems} DSA solved</span>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {TABS.map((t) => (
          <button
            key={t}
            className={`${styles.tab} ${tab === t ? styles.tabActive : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* DSA */}
      {tab === "DSA" && (
        <div className={styles.dsaList}>
          {DSA_TOPICS.map((topic) => {
            const solved = dsaProgress[topic.id] ?? 0;
            const pct    = Math.round((solved / topic.total) * 100);
            return (
              <div key={topic.id} className={styles.dsaRow}>
                <div className={styles.dsaMeta}>
                  <span className={styles.dsaLabel}>{topic.label}</span>
                  <div className={styles.dsaControls}>
                    <button className={styles.ctrlBtn} onClick={() => onUpdateDSA(topic.id, solved - 1)}>−</button>
                    <span className={styles.dsaCount}>{solved}<span className={styles.dsaTotal}>/{topic.total}</span></span>
                    <button className={styles.ctrlBtn} onClick={() => onUpdateDSA(topic.id, Math.min(topic.total, solved + 1))}>+</button>
                  </div>
                </div>
                <div className={styles.dsaTrack}>
                  <div
                    className={styles.dsaFill}
                    style={{
                      width: `${pct}%`,
                      background: pct === 100 ? "#22c55e" : pct >= 50 ? "#3b82f6" : "#f59e0b",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Core Subjects */}
      {tab === "Core Subjects" && (
        <div className={styles.coreList}>
          {CORE_SUBJECTS.map((s) => {
            const done = coreProgress[s.id] ?? 0;
            const pct  = Math.round((done / s.chapters) * 100);
            return (
              <div key={s.id} className={styles.coreRow}>
                <div className={styles.coreMeta}>
                  <span className={styles.coreIcon}>{s.icon}</span>
                  <span className={styles.coreLabel}>{s.label}</span>
                  <div className={styles.dsaControls}>
                    <button className={styles.ctrlBtn} onClick={() => onUpdateCore(s.id, done - 1)}>−</button>
                    <span className={styles.dsaCount}>{done}<span className={styles.dsaTotal}>/{s.chapters} ch</span></span>
                    <button className={styles.ctrlBtn} onClick={() => onUpdateCore(s.id, Math.min(s.chapters, done + 1))}>+</button>
                  </div>
                </div>
                <div className={styles.dsaTrack}>
                  <div className={styles.dsaFill} style={{ width: `${pct}%`, background: pct === 100 ? "#22c55e" : "#8b5cf6" }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* HR Questions */}
      {tab === "HR Questions" && (
        <div className={styles.hrList}>
          <div className={styles.hrProgress}>
            <span className={styles.hrCount}>{hrProgress.length} / {HR_QUESTIONS.length} prepared</span>
            <div className={styles.hrTrack}>
              <div className={styles.hrFill} style={{ width: `${Math.round((hrProgress.length / HR_QUESTIONS.length) * 100)}%` }} />
            </div>
          </div>
          {HR_QUESTIONS.map((q) => {
            const done = hrProgress.includes(q);
            return (
              <button
                key={q}
                className={`${styles.hrItem} ${done ? styles.hrItemDone : ""}`}
                onClick={() => onToggleHR(q)}
              >
                <span className={`${styles.hrCheck} ${done ? styles.hrCheckDone : ""}`}>{done ? "✓" : ""}</span>
                <span className={styles.hrLabel}>{q}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Mock Interviews */}
      {tab === "Mock Interviews" && (
        <div className={styles.mockSection}>
          <div className={styles.mockCount}>
            <span className={styles.mockNum}>{mockDone}</span>
            <span className={styles.mockLabel}>Mock Interviews Done</span>
          </div>
          <div className={styles.mockDots}>
            {Array.from({ length: Math.max(10, mockDone + 3) }, (_, i) => (
              <div key={i} className={`${styles.mockDot} ${i < mockDone ? styles.mockDotDone : ""}`} />
            ))}
          </div>
          <button className={styles.mockBtn} onClick={onIncrementMock}>
            ✅ Mark Mock Interview Done
          </button>
          <div className={styles.mockTips}>
            <p>💡 Aim for at least <strong>5 mock interviews</strong> before placement season.</p>
            <p>🎯 Use platforms like Pramp, Interviewing.io, or practice with peers.</p>
          </div>
        </div>
      )}
    </div>
  );
}

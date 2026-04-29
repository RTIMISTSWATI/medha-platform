import React from "react";
import { DSA_TOPICS, CS_SUBJECTS } from "../../constants/questions";
import styles from "./QZSidebar.module.css";

const SECTIONS = [
  { id: "dsa",      label: "DSA Problems",    icon: "🧩" },
  { id: "cs",       label: "Core CS",         icon: "📚" },
  { id: "revision", label: "Revision Queue",  icon: "🔁" },
  { id: "today",    label: "Today's Flow",    icon: "⚡" },
];

function MiniRing({ pct, color }) {
  const r = 10, circ = 2 * Math.PI * r;
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" className={styles.ring}>
      <circle cx="13" cy="13" r={r} fill="none" stroke="var(--bg-card)" strokeWidth="3" />
      <circle cx="13" cy="13" r={r} fill="none" stroke={color} strokeWidth="3"
        strokeDasharray={circ}
        strokeDashoffset={circ - (pct / 100) * circ}
        strokeLinecap="round"
        transform="rotate(-90 13 13)"
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
    </svg>
  );
}

export default function QZSidebar({
  activeSection, setActiveSection,
  activeTopic, setActiveTopic,
  topicStats, revisionCount,
}) {
  return (
    <aside className={styles.sidebar}>
      {/* Section nav */}
      <div className={styles.sectionNav}>
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`${styles.sectionBtn} ${activeSection === s.id ? styles.sectionActive : ""}`}
            onClick={() => setActiveSection(s.id)}
          >
            <span className={styles.sectionIcon}>{s.icon}</span>
            <span className={styles.sectionLabel}>{s.label}</span>
            {s.id === "revision" && revisionCount > 0 && (
              <span className={styles.revBadge}>{revisionCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* DSA topic list */}
      {activeSection === "dsa" && (
        <div className={styles.topicList}>
          <span className={styles.listLabel}>Topics</span>

          <button
            className={`${styles.topicBtn} ${activeTopic === "all" ? styles.topicActive : ""}`}
            onClick={() => setActiveTopic("all")}
          >
            <span className={styles.topicIcon}>🔢</span>
            <span className={styles.topicLabel}>All Problems</span>
            <span className={styles.topicCount}>{Object.values(topicStats).reduce((a, b) => a + b.solved, 0)}</span>
          </button>

          {DSA_TOPICS.map((t) => {
            const s   = topicStats[t.id] ?? { total: 0, solved: 0 };
            const pct = s.total > 0 ? Math.round((s.solved / s.total) * 100) : 0;
            return (
              <button
                key={t.id}
                className={`${styles.topicBtn} ${activeTopic === t.id ? styles.topicActive : ""}`}
                onClick={() => setActiveTopic(t.id)}
              >
                <span className={styles.topicIcon}>{t.icon}</span>
                <span className={styles.topicLabel}>{t.label}</span>
                <div className={styles.topicRight}>
                  <span className={styles.topicCount}>{s.solved}/{s.total}</span>
                  <MiniRing pct={pct} color={t.color} />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* CS subject list */}
      {activeSection === "cs" && (
        <div className={styles.topicList}>
          <span className={styles.listLabel}>Subjects</span>
          {CS_SUBJECTS.map((s) => (
            <button
              key={s.id}
              className={`${styles.topicBtn} ${activeTopic === s.id ? styles.topicActive : ""}`}
              onClick={() => setActiveTopic(s.id)}
            >
              <span className={styles.topicIcon}>{s.icon}</span>
              <span className={styles.topicLabel}>{s.label}</span>
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}

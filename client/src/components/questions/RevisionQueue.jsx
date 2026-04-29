import React from "react";
import { DSA_TOPICS, MOCK_PROBLEMS } from "../../constants/questions";
import ProblemCard from "./ProblemCard";
import styles from "./RevisionQueue.module.css";

const FREQ_TOPICS = [
  { label: "Arrays & Hashing",    freq: "Very High", companies: "Amazon, Google, Microsoft" },
  { label: "Two Pointers",        freq: "High",      companies: "Amazon, Facebook" },
  { label: "Sliding Window",      freq: "High",      companies: "Amazon, Google" },
  { label: "Binary Search",       freq: "High",      companies: "Google, Microsoft" },
  { label: "Trees & BST",         freq: "Very High", companies: "Amazon, Microsoft, Adobe" },
  { label: "Dynamic Programming", freq: "Very High", companies: "Google, Amazon, Facebook" },
  { label: "Graphs (BFS/DFS)",    freq: "High",      companies: "Google, Amazon" },
  { label: "System Design",       freq: "Very High", companies: "All Product Companies" },
];

export default function RevisionQueue({
  revisionQueue, solved, favorites, notes, revision,
  topicStats, onToggleSolved, onToggleFavorite, onOpenNote,
}) {
  const weakTopics = DSA_TOPICS.filter((t) => {
    const s = topicStats[t.id];
    return s.total > 0 && (s.solved / s.total) < 0.4;
  });

  return (
    <div className={styles.wrap}>

      {/* Due revisions */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>🔁 Revision Due Today</span>
          <span className={styles.sectionCount}>{revisionQueue.length} problems</span>
        </div>
        {revisionQueue.length === 0 ? (
          <div className={styles.empty}>
            <span>🎉</span>
            <p>No revisions due! Solve problems to build your revision queue.</p>
          </div>
        ) : (
          <div className={styles.cardList}>
            {revisionQueue.map((p) => (
              <ProblemCard
                key={p.id} problem={p}
                isSolved={!!solved[p.id]} isFavorite={favorites.includes(p.id)}
                hasNote={!!notes[p.id]} revisionDate={revision[p.id]}
                onToggleSolved={onToggleSolved} onToggleFavorite={onToggleFavorite} onOpenNote={onOpenNote}
              />
            ))}
          </div>
        )}
      </div>

      {/* Weak topics */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>⚠️ Weak Topics — Focus Here</span>
          <span className={styles.sectionCount}>{weakTopics.length} topics</span>
        </div>
        {weakTopics.length === 0 ? (
          <div className={styles.empty}><span>💪</span><p>No weak topics! Great work.</p></div>
        ) : (
          <div className={styles.weakGrid}>
            {weakTopics.map((t) => {
              const s   = topicStats[t.id];
              const pct = Math.round((s.solved / s.total) * 100);
              return (
                <div key={t.id} className={styles.weakCard} style={{ "--c": t.color }}>
                  <span className={styles.weakIcon}>{t.icon}</span>
                  <span className={styles.weakLabel}>{t.label}</span>
                  <span className={styles.weakPct} style={{ color: t.color }}>{pct}%</span>
                  <div className={styles.weakBar}>
                    <div className={styles.weakFill} style={{ width: `${pct}%`, background: t.color }} />
                  </div>
                  <span className={styles.weakSub}>{s.solved}/{s.total} solved</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Frequently asked */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>🏢 Frequently Asked Interview Topics</span>
        </div>
        <div className={styles.freqGrid}>
          {FREQ_TOPICS.map((f) => (
            <div key={f.label} className={styles.freqCard}>
              <div className={styles.freqTop}>
                <span className={styles.freqLabel}>{f.label}</span>
                <span className={`${styles.freqBadge} ${f.freq === "Very High" ? styles.freqVH : styles.freqH}`}>
                  {f.freq}
                </span>
              </div>
              <span className={styles.freqCompanies}>{f.companies}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

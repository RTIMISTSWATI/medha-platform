import React from "react";
import { DIFFICULTY } from "../../constants/questions";
import ProblemCard from "./ProblemCard";
import styles from "./TodayFlow.module.css";

export default function TodayFlow({
  recommendations, solved, favorites, notes, revision,
  onToggleSolved, onToggleFavorite, onOpenNote, overallStats,
}) {
  const solvedToday = Object.values(solved).filter((s) => {
    return new Date(s.solvedAt).toDateString() === new Date().toDateString();
  }).length;

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className={styles.wrap}>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <h2 className={styles.heroTitle}>{greeting()} 👋 Here's your plan for today</h2>
          <p className={styles.heroSub}>
            Based on your weak topics, revision schedule, and preparation gaps — Medha recommends:
          </p>
        </div>
        <div className={styles.heroStats}>
          <div className={styles.heroStat}>
            <span className={styles.heroStatNum}>{solvedToday}</span>
            <span className={styles.heroStatLabel}>Solved Today</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatNum}>{overallStats.dueRevisions.length}</span>
            <span className={styles.heroStatLabel}>Revisions Due</span>
          </div>
          <div className={styles.heroStat}>
            <span className={styles.heroStatNum}>{overallStats.weakTopics.length}</span>
            <span className={styles.heroStatLabel}>Weak Topics</span>
          </div>
        </div>
      </div>

      {/* Recommendation logic explanation */}
      <div className={styles.logicRow}>
        <div className={styles.logicCard} style={{ "--lc": "#f59e0b" }}>
          <span>📅</span>
          <div>
            <span className={styles.logicTitle}>Revision First</span>
            <span className={styles.logicSub}>Problems due for spaced repetition</span>
          </div>
        </div>
        <div className={styles.logicCard} style={{ "--lc": "#ef4444" }}>
          <span>⚠️</span>
          <div>
            <span className={styles.logicTitle}>Weak Topics</span>
            <span className={styles.logicSub}>Topics below 40% completion</span>
          </div>
        </div>
        <div className={styles.logicCard} style={{ "--lc": "#22c55e" }}>
          <span>🟢</span>
          <div>
            <span className={styles.logicTitle}>Easy Wins</span>
            <span className={styles.logicSub}>Build momentum with easy problems</span>
          </div>
        </div>
        <div className={styles.logicCard} style={{ "--lc": "#3b82f6" }}>
          <span>🏢</span>
          <div>
            <span className={styles.logicTitle}>High Frequency</span>
            <span className={styles.logicSub}>Asked by 3+ top companies</span>
          </div>
        </div>
      </div>

      {/* Recommended problems */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTitle}>⚡ Recommended for You Today</span>
          <span className={styles.sectionSub}>{recommendations.length} problems selected</span>
        </div>

        {recommendations.length === 0 ? (
          <div className={styles.empty}>
            <span>🎉</span>
            <p>Amazing! You're all caught up. Explore new topics to keep growing.</p>
          </div>
        ) : (
          <div className={styles.recList}>
            {recommendations.map((p) => (
              <div key={p.id} className={styles.recItem}>
                <div className={styles.reasonTag}>{p.reason}</div>
                <ProblemCard
                  problem={p}
                  isSolved={!!solved[p.id]}
                  isFavorite={favorites.includes(p.id)}
                  hasNote={!!notes[p.id]}
                  revisionDate={revision[p.id]}
                  onToggleSolved={onToggleSolved}
                  onToggleFavorite={onToggleFavorite}
                  onOpenNote={onOpenNote}
                />
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

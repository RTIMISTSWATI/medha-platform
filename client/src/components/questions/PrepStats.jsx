import React from "react";
import { DSA_TOPICS } from "../../constants/questions";
import styles from "./PrepStats.module.css";

export default function PrepStats({ stats }) {
  const { totalSolved, totalProblems, accuracy, readinessScore, weakTopics, strongTopics, dueRevisions } = stats;
  const pct = Math.round((totalSolved / totalProblems) * 100);

  return (
    <div className={styles.wrap}>
      {/* Main metrics */}
      <div className={styles.metrics}>
        <div className={styles.metric} style={{ "--c": "#3b82f6" }}>
          <span className={styles.metricVal}>{totalSolved}<span className={styles.metricOf}>/{totalProblems}</span></span>
          <span className={styles.metricLabel}>Problems Solved</span>
          <div className={styles.metricBar}><div className={styles.metricFill} style={{ width: `${pct}%` }} /></div>
        </div>
        <div className={styles.metric} style={{ "--c": "#22c55e" }}>
          <span className={styles.metricVal}>{accuracy}<span className={styles.metricOf}>%</span></span>
          <span className={styles.metricLabel}>Completion Rate</span>
          <div className={styles.metricBar}><div className={styles.metricFill} style={{ width: `${accuracy}%` }} /></div>
        </div>
        <div className={styles.metric} style={{ "--c": "#a855f7" }}>
          <span className={styles.metricVal}>{readinessScore}<span className={styles.metricOf}>%</span></span>
          <span className={styles.metricLabel}>Interview Readiness</span>
          <div className={styles.metricBar}><div className={styles.metricFill} style={{ width: `${readinessScore}%` }} /></div>
        </div>
        <div className={styles.metric} style={{ "--c": "#f59e0b" }}>
          <span className={styles.metricVal}>{dueRevisions.length}</span>
          <span className={styles.metricLabel}>Revisions Due</span>
          <div className={styles.metricBar}><div className={styles.metricFill} style={{ width: `${Math.min(100, dueRevisions.length * 10)}%` }} /></div>
        </div>
      </div>

      {/* Strong / Weak */}
      <div className={styles.topicBadges}>
        <div className={styles.badgeGroup}>
          <span className={styles.badgeGroupLabel}>💪 Strong Topics</span>
          <div className={styles.badges}>
            {strongTopics.length === 0
              ? <span className={styles.badgeEmpty}>Keep solving to build strengths</span>
              : strongTopics.map((id) => {
                  const t = DSA_TOPICS.find((x) => x.id === id);
                  return <span key={id} className={styles.badgeStrong}>{t?.icon} {t?.label}</span>;
                })
            }
          </div>
        </div>
        <div className={styles.badgeGroup}>
          <span className={styles.badgeGroupLabel}>⚠️ Weak Topics</span>
          <div className={styles.badges}>
            {weakTopics.length === 0
              ? <span className={styles.badgeEmpty}>No weak topics yet!</span>
              : weakTopics.map((id) => {
                  const t = DSA_TOPICS.find((x) => x.id === id);
                  return <span key={id} className={styles.badgeWeak}>{t?.icon} {t?.label}</span>;
                })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

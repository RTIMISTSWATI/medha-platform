import React from "react";
import { LEVELS } from "../../constants/planner";
import styles from "./StreakPanel.module.css";

const MOTIVATIONS = [
  "Every expert was once a beginner. Keep going! 🚀",
  "Consistency beats intensity. Show up every day. 💪",
  "You're building something great. One task at a time. ⚡",
  "The grind is real. So is the reward. 🏆",
  "Small progress is still progress. Keep pushing! 🔥",
  "Your future self will thank you for today's effort. 🌟",
];

export default function StreakPanel({ xp, levelInfo, streak }) {
  const nextLevel = LEVELS.find((l) => l.level === levelInfo.level + 1);
  const xpInLevel = xp - levelInfo.minXP;
  const xpNeeded  = (nextLevel?.minXP ?? levelInfo.maxXP) - levelInfo.minXP;
  const pct       = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));
  const motivation = MOTIVATIONS[streak.count % MOTIVATIONS.length];

  return (
    <div className={styles.panel}>
      {/* Level badge */}
      <div className={styles.levelRow}>
        <div className={styles.levelBadge}>
          <span className={styles.levelNum}>Lv.{levelInfo.level}</span>
          <span className={styles.levelTitle}>{levelInfo.title}</span>
        </div>
        <div className={styles.streakBadge}>
          <span className={styles.streakFire}>🔥</span>
          <span className={styles.streakCount}>{streak.count}</span>
          <span className={styles.streakLabel}>day streak</span>
        </div>
      </div>

      {/* XP bar */}
      <div className={styles.xpSection}>
        <div className={styles.xpHeader}>
          <span className={styles.xpLabel}>⚡ XP Progress</span>
          <span className={styles.xpValue}>{xp} XP</span>
        </div>
        <div className={styles.xpTrack}>
          <div className={styles.xpFill} style={{ width: `${pct}%` }} />
        </div>
        <div className={styles.xpFooter}>
          <span>{xpInLevel} / {xpNeeded} XP</span>
          {nextLevel && <span>Next: {nextLevel.title}</span>}
        </div>
      </div>

      {/* Motivation */}
      <div className={styles.motivation}>
        <p>{motivation}</p>
      </div>

      {/* XP legend */}
      <div className={styles.rewards}>
        <span className={styles.rewardItem}>✅ Task done → +20 XP</span>
        <span className={styles.rewardItem}>🔴 High priority → +10 XP</span>
        <span className={styles.rewardItem}>🔥 Daily streak → +15 XP</span>
      </div>
    </div>
  );
}

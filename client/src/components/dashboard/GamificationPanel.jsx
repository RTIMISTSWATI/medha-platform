import React from "react";
import { LEVELS } from "../../constants/planner";
import { BADGES } from "../../constants/dashboard";
import styles from "./GamificationPanel.module.css";

const RANK_COLORS = {
  1: "#94a3b8", 2: "#94a3b8", 3: "#22c55e",
  4: "#3b82f6", 5: "#8b5cf6", 6: "#f59e0b",
  7: "#ef4444", 8: "#fbbf24",
};

export default function GamificationPanel({ xp, levelInfo, streak, earnedBadges }) {
  const nextLevel  = LEVELS.find((l) => l.level === levelInfo.level + 1);
  const xpInLevel  = xp - levelInfo.minXP;
  const xpNeeded   = (nextLevel?.minXP ?? levelInfo.maxXP) - levelInfo.minXP;
  const pct        = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));
  const rankColor  = RANK_COLORS[levelInfo.level] ?? "#94a3b8";

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>🏆 Gamification & Ranks</h3>
        <p className={styles.sub}>Level up your preparation journey</p>
      </div>

      {/* Level + Streak */}
      <div className={styles.topRow}>
        <div className={styles.levelCard} style={{ "--rank": rankColor }}>
          <div className={styles.levelGlow} />
          <span className={styles.levelNum}>Lv.{levelInfo.level}</span>
          <span className={styles.levelTitle}>{levelInfo.title}</span>
          <span className={styles.levelXP}>{xp} XP total</span>
        </div>

        <div className={styles.streakCard}>
          <span className={styles.streakFire}>🔥</span>
          <span className={styles.streakNum}>{streak.count}</span>
          <span className={styles.streakLabel}>Day Streak</span>
          {streak.count >= 7 && <span className={styles.streakBadge}>🏅 Week Warrior</span>}
        </div>
      </div>

      {/* XP bar */}
      <div className={styles.xpSection}>
        <div className={styles.xpHeader}>
          <span className={styles.xpLabel}>Progress to {nextLevel?.title ?? "Max Level"}</span>
          <span className={styles.xpVal}>{xpInLevel} / {xpNeeded} XP</span>
        </div>
        <div className={styles.xpTrack}>
          <div className={styles.xpFill} style={{ width: `${pct}%` }} />
          {pct > 10 && (
            <span className={styles.xpPct}>{pct}%</span>
          )}
        </div>
      </div>

      {/* Rank progression */}
      <div className={styles.rankRow}>
        {LEVELS.map((l) => (
          <div
            key={l.level}
            className={`${styles.rankStep} ${l.level <= levelInfo.level ? styles.rankDone : ""} ${l.level === levelInfo.level ? styles.rankCurrent : ""}`}
            title={`${l.title} — ${l.minXP} XP`}
          >
            <div className={styles.rankDot} style={l.level <= levelInfo.level ? { background: RANK_COLORS[l.level] } : {}} />
            <span className={styles.rankLabel}>{l.title.slice(0, 4)}</span>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className={styles.badgesSection}>
        <span className={styles.badgesTitle}>🎖️ Badges — {earnedBadges.length} / {BADGES.length} earned</span>
        <div className={styles.badgeGrid}>
          {BADGES.map((badge) => {
            const earned = earnedBadges.some((b) => b.id === badge.id);
            return (
              <div
                key={badge.id}
                className={`${styles.badge} ${earned ? styles.badgeEarned : styles.badgeLocked}`}
                title={`${badge.label}: ${badge.desc} (${badge.xpRequired} XP)`}
              >
                <span className={styles.badgeIcon}>{earned ? badge.icon : "🔒"}</span>
                <span className={styles.badgeLabel}>{badge.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

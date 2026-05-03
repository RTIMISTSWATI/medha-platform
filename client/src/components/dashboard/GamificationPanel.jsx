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
  // FIXED: levelInfo fallback must include minXP/maxXP to prevent NaN in XP bar
  const safeLevel = {
    level: 1, title: 'Beginner', minXP: 0, maxXP: 100,
    ...(levelInfo || {}),
  };
  const safeStreak  = streak  || { count: 0, lastDate: null };
  const safeBadges  = Array.isArray(earnedBadges) ? earnedBadges : [];
  const safeXp      = typeof xp === 'number' ? xp : 0;

  const nextLevel  = LEVELS.find((l) => l.level === safeLevel.level + 1);
  const xpInLevel  = safeXp - (safeLevel.minXP ?? 0);
  const xpNeeded   = Math.max(1, (nextLevel?.minXP ?? safeLevel.maxXP ?? 100) - (safeLevel.minXP ?? 0));
  // FIXED: clamp pct so NaN/Infinity never reach style
  const rawPct     = (xpInLevel / xpNeeded) * 100;
  const pct        = Number.isFinite(rawPct) ? Math.min(100, Math.round(rawPct)) : 0;
  const rankColor  = RANK_COLORS[safeLevel.level] ?? '#94a3b8';

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
          <span className={styles.levelNum}>Lv.{safeLevel.level}</span>
          <span className={styles.levelTitle}>{safeLevel.title}</span>
          <span className={styles.levelXP}>{safeXp} XP total</span>
        </div>

        <div className={styles.streakCard}>
          <span className={styles.streakFire}>🔥</span>
          <span className={styles.streakNum}>{safeStreak.count}</span>
          <span className={styles.streakLabel}>Day Streak</span>
          {safeStreak.count >= 7 && <span className={styles.streakBadge}>🏅 Week Warrior</span>}
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
            className={`${styles.rankStep} ${l.level <= safeLevel.level ? styles.rankDone : ""} ${l.level === safeLevel.level ? styles.rankCurrent : ""}`}
            title={`${l.title} — ${l.minXP} XP`}
          >
            <div className={styles.rankDot} style={l.level <= safeLevel.level ? { background: RANK_COLORS[l.level] } : {}} />
            <span className={styles.rankLabel}>{l.title.slice(0, 4)}</span>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className={styles.badgesSection}>
        <span className={styles.badgesTitle}>🎖️ Badges — {safeBadges.length} / {BADGES.length} earned</span>
        <div className={styles.badgeGrid}>
          {BADGES.map((badge) => {
            const earned = safeBadges.some((b) => b.id === badge.id);
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

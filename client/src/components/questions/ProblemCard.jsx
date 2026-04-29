import React from "react";
import { DIFFICULTY } from "../../constants/questions";
import styles from "./ProblemCard.module.css";

function formatDate(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

export default function ProblemCard({
  problem, isSolved, isFavorite, hasNote, revisionDate,
  onToggleSolved, onToggleFavorite, onOpenNote,
}) {
  const diff = DIFFICULTY[problem.difficulty];

  return (
    <div className={`${styles.card} ${isSolved ? styles.cardSolved : ""}`}>

      {/* Left accent stripe */}
      <div className={styles.accent} style={{ background: diff.color }} />

      {/* Inner: checkbox + body + actions */}
      <div className={styles.inner}>

        {/* Checkbox */}
        <button
          className={`${styles.checkbox} ${isSolved ? styles.checkboxDone : ""}`}
          onClick={() => onToggleSolved(problem.id)}
          title={isSolved ? "Mark unsolved" : "Mark solved"}
        >
          {isSolved && <span className={styles.checkmark}>✓</span>}
        </button>

        {/* Body */}
        <div className={styles.body}>
          <div className={styles.titleRow}>
            <span className={styles.title}>{problem.title}</span>
            <span
              className={styles.diffBadge}
              style={{ color: diff.color, background: diff.bg, borderColor: `${diff.color}40` }}
            >
              {diff.label}
            </span>
          </div>

          <div className={styles.meta}>
            {problem.companies.slice(0, 3).map((c) => (
              <span key={c} className={styles.companyTag}>{c}</span>
            ))}
            {problem.companies.length > 3 && (
              <span className={styles.companyTag}>+{problem.companies.length - 3}</span>
            )}
            <span className={styles.acceptTag}>✓ {problem.acceptance}%</span>
            {revisionDate && (
              <span className={styles.revTag}>🔁 Rev: {formatDate(revisionDate)}</span>
            )}
            {isSolved && (
              <span className={styles.solvedTag}>✅ Solved</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={`${styles.actionBtn} ${isFavorite ? styles.favActive : ""}`}
            onClick={() => onToggleFavorite(problem.id)}
            title={isFavorite ? "Remove favorite" : "Add to favorites"}
          >⭐</button>
          <button
            className={`${styles.actionBtn} ${hasNote ? styles.noteActive : ""}`}
            onClick={() => onOpenNote(problem.id)}
            title="Add note"
          >📝</button>
        </div>

      </div>
    </div>
  );
}

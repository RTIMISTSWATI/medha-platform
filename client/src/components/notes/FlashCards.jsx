import React, { useState, useMemo } from "react";
import { DEFAULT_FLASHCARDS, SUBJECTS } from "../../constants/notes";
import styles from "./FlashCards.module.css";

export default function FlashCards({ activeSubject }) {
  const [flipped, setFlipped] = useState(null);
  const [idx, setIdx] = useState(0);

  const cards = useMemo(() => {
    if (activeSubject === "all" || activeSubject === "pinned") return DEFAULT_FLASHCARDS;
    return DEFAULT_FLASHCARDS.filter((c) => c.subject === activeSubject);
  }, [activeSubject]);

  const card = cards[idx] ?? null;
  const subject = card ? SUBJECTS.find((s) => s.id === card.subject) : null;

  const prev = () => { setIdx((i) => (i - 1 + cards.length) % cards.length); setFlipped(null); };
  const next = () => { setIdx((i) => (i + 1) % cards.length); setFlipped(null); };

  return (
    <aside className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelTitle}>⚡ Quick Revision</span>
        <span className={styles.counter}>{cards.length > 0 ? `${idx + 1} / ${cards.length}` : "0"}</span>
      </div>

      {card ? (
        <>
          <div
            className={`${styles.card} ${flipped === card.id ? styles.flipped : ""}`}
            onClick={() => setFlipped(flipped === card.id ? null : card.id)}
          >
            <div className={styles.cardInner}>
              <div className={styles.cardFront}>
                <span className={styles.cardSubject}>{subject?.icon} {subject?.label}</span>
                <p className={styles.cardTerm}>{card.term}</p>
                <span className={styles.tapHint}>Tap to reveal →</span>
              </div>
              <div className={styles.cardBack}>
                <p className={styles.cardDef}>{card.definition}</p>
              </div>
            </div>
          </div>

          <div className={styles.nav}>
            <button className={styles.navBtn} onClick={prev}>‹ Prev</button>
            <button className={styles.navBtn} onClick={next}>Next ›</button>
          </div>
        </>
      ) : (
        <div className={styles.empty}>No flashcards for this subject yet.</div>
      )}

      <div className={styles.divider} />

      <div className={styles.tipsSection}>
        <span className={styles.tipsTitle}>📎 Quick Tips</span>
        <ul className={styles.tipsList}>
          <li>Use <strong>Ctrl+S</strong> to save quickly</li>
          <li>Pin important notes for fast access</li>
          <li>Use code blocks for snippets</li>
          <li>Highlight key formulas in yellow</li>
        </ul>
      </div>
    </aside>
  );
}

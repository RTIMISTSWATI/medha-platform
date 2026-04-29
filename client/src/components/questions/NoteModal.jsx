import React from "react";
import { MOCK_PROBLEMS } from "../../constants/questions";
import styles from "./NoteModal.module.css";

export default function NoteModal({ problemId, noteText, onChange, onSave, onClose }) {
  const problem = MOCK_PROBLEMS.find((p) => p.id === problemId);
  if (!problemId) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h3 className={styles.title}>📝 Personal Note</h3>
            <p className={styles.sub}>{problem?.title}</p>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        <textarea
          className={styles.textarea}
          placeholder="Write your approach, key insight, edge cases, or revision notes…"
          value={noteText}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          autoFocus
        />
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button className={styles.saveBtn} onClick={onSave}>💾 Save Note</button>
        </div>
      </div>
    </div>
  );
}

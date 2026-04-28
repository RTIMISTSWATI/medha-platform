import React from "react";
import { SUBJECTS } from "../../constants/notes";
import styles from "./NotesList.module.css";

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, "").trim();
}

function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export default function NotesList({ notes, activeNote, onOpen, onPin, onDelete }) {
  if (notes.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>🗒️</span>
        <p>No notes here yet.</p>
        <span>Click "＋ New Note" to get started.</span>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {notes.map((note) => {
        const subject = SUBJECTS.find((s) => s.id === note.subject);
        const isActive = activeNote?.id === note.id;

        return (
          <div
            key={note.id}
            className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
            onClick={() => onOpen(note)}
          >
            <div className={styles.cardTop}>
              <span className={styles.subjectTag}>
                {subject?.icon} {subject?.label}
              </span>
              <div className={styles.cardActions} onClick={(e) => e.stopPropagation()}>
                <button
                  className={`${styles.iconBtn} ${note.pinned ? styles.pinned : ""}`}
                  title={note.pinned ? "Unpin" : "Pin"}
                  onClick={() => onPin(note.id)}
                >
                  📌
                </button>
                <button
                  className={`${styles.iconBtn} ${styles.deleteBtn}`}
                  title="Delete"
                  onClick={() => onDelete(note.id)}
                >
                  🗑️
                </button>
              </div>
            </div>

            <h3 className={styles.cardTitle}>{note.title || "Untitled"}</h3>
            <p className={styles.cardPreview}>{stripHtml(note.content) || "No content yet…"}</p>
            <span className={styles.cardDate}>{formatDate(note.updatedAt)}</span>
          </div>
        );
      })}
    </div>
  );
}

import React from "react";
import { SUBJECTS } from "../../constants/notes";
import styles from "./NotesSidebar.module.css";

export default function NotesSidebar({ notes, activeSubject, onSelectSubject, onNewNote }) {
  const countFor = (id) => notes.filter((n) => n.subject === id).length;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.brandIcon}>📝</span>
        <span className={styles.brandName}>Smart Notes</span>
      </div>

      <button
        className={styles.newBtn}
        onClick={() => onNewNote(activeSubject === "all" || activeSubject === "pinned" ? "dsa" : activeSubject)}
      >
        <span>＋</span> New Note
      </button>

      <nav className={styles.nav}>
        <span className={styles.navLabel}>Workspace</span>

        <button
          className={`${styles.navItem} ${activeSubject === "all" ? styles.active : ""}`}
          onClick={() => onSelectSubject("all")}
        >
          <span className={styles.navIcon}>🗂️</span>
          <span className={styles.navText}>All Notes</span>
          <span className={styles.badge}>{notes.length}</span>
        </button>

        <button
          className={`${styles.navItem} ${activeSubject === "pinned" ? styles.active : ""}`}
          onClick={() => onSelectSubject("pinned")}
        >
          <span className={styles.navIcon}>📌</span>
          <span className={styles.navText}>Pinned</span>
          <span className={styles.badge}>{notes.filter((n) => n.pinned).length}</span>
        </button>
      </nav>

      <nav className={styles.nav}>
        <span className={styles.navLabel}>Subjects</span>
        {SUBJECTS.map((s) => (
          <button
            key={s.id}
            className={`${styles.navItem} ${activeSubject === s.id ? styles.active : ""}`}
            onClick={() => onSelectSubject(s.id)}
          >
            <span className={styles.navIcon}>{s.icon}</span>
            <span className={styles.navText}>{s.label}</span>
            {countFor(s.id) > 0 && (
              <span className={styles.badge}>{countFor(s.id)}</span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
}

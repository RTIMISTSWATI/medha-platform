import React from "react";
import styles from "./NotesSearchBar.module.css";

export default function NotesSearchBar({ query, onChange, totalCount, filteredCount }) {
  return (
    <div className={styles.bar}>
      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          className={styles.input}
          type="text"
          placeholder="Search notes by title or content…"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
        />
        {query && (
          <button className={styles.clearBtn} onClick={() => onChange("")}>✕</button>
        )}
      </div>
      <span className={styles.count}>
        {query ? `${filteredCount} of ${totalCount}` : `${totalCount} notes`}
      </span>
    </div>
  );
}

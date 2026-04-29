import React from "react";
import { COMPANIES } from "../../constants/questions";
import ProblemCard from "./ProblemCard";
import styles from "./ProblemList.module.css";

const DIFFS = [
  { id: "all",    label: "All" },
  { id: "easy",   label: "Easy" },
  { id: "medium", label: "Medium" },
  { id: "hard",   label: "Hard" },
];

export default function ProblemList({
  problems, solved, favorites, notes, revision,
  searchQuery, setSearchQuery,
  diffFilter, setDiffFilter,
  companyFilter, setCompanyFilter,
  onToggleSolved, onToggleFavorite, onOpenNote,
}) {
  const solvedCount = problems.filter((p) => solved[p.id]).length;

  return (
    <div className={styles.container}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            className={styles.search}
            type="text"
            placeholder="Search problems…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className={styles.clearBtn} onClick={() => setSearchQuery("")}>✕</button>
          )}
        </div>

        <div className={styles.filters}>
          {DIFFS.map((d) => (
            <button
              key={d.id}
              className={`${styles.filterBtn} ${diffFilter === d.id ? styles.filterActive : ""}`}
              onClick={() => setDiffFilter(d.id)}
            >
              {d.label}
            </button>
          ))}
        </div>

        <select
          className={styles.companySelect}
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
        >
          <option value="all">All Companies</option>
          {COMPANIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <span className={styles.countBadge}>{solvedCount}/{problems.length}</span>
      </div>

      {/* List */}
      {problems.length === 0 ? (
        <div className={styles.empty}>
          <span>🔍</span>
          <p>No problems match your filters.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {problems.map((p) => (
            <ProblemCard
              key={p.id}
              problem={p}
              isSolved={!!solved[p.id]}
              isFavorite={favorites.includes(p.id)}
              hasNote={!!notes[p.id]}
              revisionDate={revision[p.id]}
              onToggleSolved={onToggleSolved}
              onToggleFavorite={onToggleFavorite}
              onOpenNote={onOpenNote}
            />
          ))}
        </div>
      )}
    </div>
  );
}

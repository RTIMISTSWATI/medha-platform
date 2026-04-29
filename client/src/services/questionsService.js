// ─────────────────────────────────────────────────────────────
// questionsService.js
// Phase 1 : localStorage
// Phase 2 : swap to serverApi
//   GET    /questions/progress
//   PUT    /questions/:id/solve
//   PUT    /questions/:id/favorite
//   PUT    /questions/:id/note
//   GET    /questions/revision-queue
// ─────────────────────────────────────────────────────────────

const KEYS = {
  solved:    "medha_q_solved",    // { [id]: { solvedAt, attempts } }
  favorites: "medha_q_favorites", // [id, ...]
  notes:     "medha_q_notes",     // { [id]: string }
  revision:  "medha_q_revision",  // { [id]: nextRevisionDate }
  csProgress:"medha_cs_progress", // { [subjectId]: solvedCount }
};

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function save(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

export const questionsService = {
  // ── Solved ────────────────────────────────────────────────
  getSolved()    { return load(KEYS.solved, {}); },
  markSolved(id) {
    const solved = load(KEYS.solved, {});
    const existing = solved[id];
    solved[id] = {
      solvedAt:  new Date().toISOString(),
      attempts:  (existing?.attempts ?? 0) + 1,
    };
    save(KEYS.solved, solved);
    return solved;
  },
  unmarkSolved(id) {
    const solved = load(KEYS.solved, {});
    delete solved[id];
    save(KEYS.solved, solved);
    return solved;
  },

  // ── Favorites ─────────────────────────────────────────────
  getFavorites() { return load(KEYS.favorites, []); },
  toggleFavorite(id) {
    const favs = load(KEYS.favorites, []);
    const next = favs.includes(id) ? favs.filter((x) => x !== id) : [...favs, id];
    save(KEYS.favorites, next);
    return next;
  },

  // ── Notes ─────────────────────────────────────────────────
  getNotes()          { return load(KEYS.notes, {}); },
  saveNote(id, text)  {
    const notes = load(KEYS.notes, {});
    if (text.trim()) notes[id] = text;
    else delete notes[id];
    save(KEYS.notes, notes);
    return notes;
  },

  // ── Revision ──────────────────────────────────────────────
  getRevision() { return load(KEYS.revision, {}); },
  scheduleRevision(id, daysFromNow = 3) {
    const rev  = load(KEYS.revision, {});
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    rev[id] = date.toISOString().split("T")[0];
    save(KEYS.revision, rev);
    return rev;
  },
  getDueRevisions() {
    const rev   = load(KEYS.revision, {});
    const today = new Date().toISOString().split("T")[0];
    return Object.entries(rev)
      .filter(([, date]) => date <= today)
      .map(([id]) => id);
  },

  // ── CS Subject progress ───────────────────────────────────
  getCSProgress()           { return load(KEYS.csProgress, {}); },
  updateCSProgress(id, val) {
    const p = load(KEYS.csProgress, {});
    p[id] = Math.max(0, val);
    save(KEYS.csProgress, p);
    return p;
  },
};

// ─────────────────────────────────────────────────────────────
// notesService.js
// Phase 1 : localStorage persistence
// Phase 2 : swap each function body to use serverApi calls below
// ─────────────────────────────────────────────────────────────
// import serverApi from "./serverApi";
// POST   /notes/create   → serverApi.post("/notes/create", note)
// GET    /notes          → serverApi.get("/notes")
// PUT    /notes/:id      → serverApi.put(`/notes/${id}`, updates)
// DELETE /notes/:id      → serverApi.delete(`/notes/${id}`)
// ─────────────────────────────────────────────────────────────

const STORAGE_KEY = "medha_notes";

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

function persist(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export const notesService = {
  getAll() {
    return Promise.resolve(load());
  },

  create(note) {
    const notes = load();
    const created = {
      ...note,
      id: `note-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    persist([created, ...notes]);
    return Promise.resolve(created);
  },

  update(id, updates) {
    const notes = load().map((n) =>
      n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n
    );
    persist(notes);
    return Promise.resolve(notes.find((n) => n.id === id));
  },

  remove(id) {
    const notes = load().filter((n) => n.id !== id);
    persist(notes);
    return Promise.resolve({ id });
  },
};

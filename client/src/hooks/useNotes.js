import { useState, useEffect, useCallback } from "react";
import { notesService } from "../services/notesService";
import { EMPTY_NOTE } from "../constants/notes";

export function useNotes() {
  const [notes, setNotes]               = useState([]);
  const [activeNote, setActiveNote]     = useState({ ...EMPTY_NOTE });
  const [activeSubject, setActiveSubject] = useState("all");
  const [searchQuery, setSearchQuery]   = useState("");
  const [isSaving, setIsSaving]         = useState(false);
  const [saveStatus, setSaveStatus]     = useState("idle"); // idle | saved | error
  const [isNewNote, setIsNewNote]       = useState(true);

  // ── Load all notes on mount ───────────────────────────────
  useEffect(() => {
    notesService.getAll().then(setNotes);
  }, []);

  // ── Derived: filtered list ────────────────────────────────
  const filteredNotes = notes.filter((n) => {
    const matchSubject = activeSubject === "all" || n.subject === activeSubject;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      n.title.toLowerCase().includes(q) ||
      n.content.replace(/<[^>]+>/g, "").toLowerCase().includes(q);
    return matchSubject && matchSearch;
  });

  const pinnedNotes   = filteredNotes.filter((n) => n.pinned);
  const unpinnedNotes = filteredNotes.filter((n) => !n.pinned);
  const displayNotes  = [...pinnedNotes, ...unpinnedNotes];

  // ── Open existing note ────────────────────────────────────
  const openNote = useCallback((note) => {
    setActiveNote({ ...note });
    setIsNewNote(false);
    setSaveStatus("idle");
  }, []);

  // ── Start a new note ──────────────────────────────────────
  const newNote = useCallback((subject = "dsa") => {
    setActiveNote({ ...EMPTY_NOTE, subject });
    setIsNewNote(true);
    setSaveStatus("idle");
  }, []);

  // ── Field updates ─────────────────────────────────────────
  const updateField = useCallback((field, value) => {
    setActiveNote((prev) => ({ ...prev, [field]: value }));
    setSaveStatus("idle");
  }, []);

  // ── Save (create or update) ───────────────────────────────
  const saveNote = useCallback(async () => {
    if (!activeNote.title.trim()) return;
    setIsSaving(true);
    try {
      if (isNewNote) {
        const created = await notesService.create(activeNote);
        setNotes((prev) => [created, ...prev]);
        setActiveNote(created);
        setIsNewNote(false);
      } else {
        const updated = await notesService.update(activeNote.id, activeNote);
        setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
        setActiveNote(updated);
      }
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  }, [activeNote, isNewNote]);

  // ── Delete ────────────────────────────────────────────────
  const deleteNote = useCallback(async (id) => {
    await notesService.remove(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (activeNote.id === id) {
      setActiveNote({ ...EMPTY_NOTE });
      setIsNewNote(true);
    }
  }, [activeNote.id]);

  // ── Toggle pin ────────────────────────────────────────────
  const togglePin = useCallback(async (id) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    const updated = await notesService.update(id, { pinned: !note.pinned });
    setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));
    if (activeNote.id === id) setActiveNote(updated);
  }, [notes, activeNote.id]);

  return {
    notes,
    displayNotes,
    activeNote,
    activeSubject,
    searchQuery,
    isSaving,
    saveStatus,
    isNewNote,
    setActiveSubject,
    setSearchQuery,
    openNote,
    newNote,
    updateField,
    saveNote,
    deleteNote,
    togglePin,
  };
}

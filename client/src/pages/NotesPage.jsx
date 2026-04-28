import React, { useEffect, useCallback } from "react";
import { useNotes } from "../hooks/useNotes";
import NotesSidebar from "../components/notes/NotesSidebar";
import NotesList from "../components/notes/NotesList";
import NoteEditor from "../components/notes/NoteEditor";
import FlashCards from "../components/notes/FlashCards";
import NotesSearchBar from "../components/notes/NotesSearchBar";
import styles from "./NotesPage.module.css";

export default function NotesPage() {
  const {
    notes,
    displayNotes,
    activeNote,
    activeSubject,
    searchQuery,
    isSaving,
    saveStatus,
    setActiveSubject,
    setSearchQuery,
    openNote,
    newNote,
    updateField,
    saveNote,
    deleteNote,
    togglePin,
  } = useNotes();

  // Ctrl+S / Cmd+S to save
  const handleKeyDown = useCallback(
    (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        saveNote();
      }
    },
    [saveNote]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Filter pinned notes when "pinned" subject is selected
  const visibleNotes =
    activeSubject === "pinned" ? displayNotes.filter((n) => n.pinned) : displayNotes;

  return (
    <div className={styles.page}>
      {/* ── Left Sidebar ── */}
      <NotesSidebar
        notes={notes}
        activeSubject={activeSubject}
        onSelectSubject={setActiveSubject}
        onNewNote={newNote}
      />

      {/* ── Middle: List + Editor ── */}
      <div className={styles.center}>
        {/* Notes list column */}
        <div className={styles.listColumn}>
          <NotesSearchBar
            query={searchQuery}
            onChange={setSearchQuery}
            totalCount={notes.length}
            filteredCount={visibleNotes.length}
          />
          <NotesList
            notes={visibleNotes}
            activeNote={activeNote}
            onOpen={openNote}
            onPin={togglePin}
            onDelete={deleteNote}
          />
        </div>

        {/* Editor column */}
        <div className={styles.editorColumn}>
          <NoteEditor
            note={activeNote}
            onTitleChange={(v) => updateField("title", v)}
            onContentChange={(v) => updateField("content", v)}
            onSubjectChange={(v) => updateField("subject", v)}
            onSave={saveNote}
            onPin={togglePin}
            isSaving={isSaving}
            saveStatus={saveStatus}
          />
        </div>
      </div>

      {/* ── Right: FlashCards ── */}
      <FlashCards activeSubject={activeSubject} />
    </div>
  );
}

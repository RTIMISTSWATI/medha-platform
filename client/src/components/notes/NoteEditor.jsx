import React, { useMemo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { SUBJECTS } from "../../constants/notes";
import styles from "./NoteEditor.module.css";

const TOOLBAR = [
  [{ header: [1, 2, 3, false] }],
  [{ font: [] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }],
  ["blockquote", "code-block"],
  ["link"],
  ["clean"],
];

const QUILL_MODULES = { toolbar: TOOLBAR };
const QUILL_FORMATS = [
  "header", "font",
  "bold", "italic", "underline", "strike",
  "color", "background",
  "list", "bullet", "indent",
  "blockquote", "code-block",
  "link",
];

export default function NoteEditor({
  note, onTitleChange, onContentChange, onSubjectChange,
  onSave, onPin, isSaving, saveStatus,
}) {
  const saveLabel = useMemo(() => {
    if (isSaving) return "Saving…";
    if (saveStatus === "saved") return "✓ Saved";
    if (saveStatus === "error") return "⚠ Error";
    return "Save Note";
  }, [isSaving, saveStatus]);

  return (
    <div className={styles.editor}>
      {/* ── Editor Topbar ── */}
      <div className={styles.topbar}>
        <select
          className={styles.subjectSelect}
          value={note.subject}
          onChange={(e) => onSubjectChange(e.target.value)}
        >
          {SUBJECTS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.icon} {s.label}
            </option>
          ))}
        </select>

        <div className={styles.topbarActions}>
          <button
            className={`${styles.pinBtn} ${note.pinned ? styles.pinActive : ""}`}
            onClick={() => note.id && onPin(note.id)}
            title={note.pinned ? "Unpin note" : "Pin note"}
          >
            📌 {note.pinned ? "Pinned" : "Pin"}
          </button>

          <button
            className={`${styles.saveBtn} ${saveStatus === "saved" ? styles.saveBtnSaved : ""} ${saveStatus === "error" ? styles.saveBtnError : ""}`}
            onClick={onSave}
            disabled={isSaving || !note.title.trim()}
          >
            {saveLabel}
          </button>
        </div>
      </div>

      {/* ── Title ── */}
      <input
        className={styles.titleInput}
        type="text"
        placeholder="Note title…"
        value={note.title}
        onChange={(e) => onTitleChange(e.target.value)}
      />

      {/* ── Rich Text Editor ── */}
      <div className={styles.quillWrapper}>
        <ReactQuill
          theme="snow"
          value={note.content}
          onChange={onContentChange}
          modules={QUILL_MODULES}
          formats={QUILL_FORMATS}
          placeholder="Start writing your note…"
        />
      </div>
    </div>
  );
}

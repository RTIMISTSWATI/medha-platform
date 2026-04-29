import React from "react";
import { PRIORITIES, PLANNER_SUBJECTS } from "../../constants/planner";
import styles from "./TaskForm.module.css";

const TIME_OPTIONS = ["30m", "1h", "1.5h", "2h", "2.5h", "3h", "4h", "5h+"];

export default function TaskForm({ form, onChange, onSubmit, onClose, isEditing }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleGroup}>
            <span className={styles.modalIcon}>{isEditing ? "✏️" : "➕"}</span>
            <div>
              <h2 className={styles.modalTitle}>
                {isEditing ? "Edit Task" : "New Study Task"}
              </h2>
              <p className={styles.modalSub}>
                {isEditing ? "Update your task details" : "Add a task to your study plan"}
              </p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>

          {/* Title */}
          <div className={styles.field}>
            <label className={styles.label}>Task Title <span className={styles.required}>*</span></label>
            <input
              className={styles.input}
              type="text"
              placeholder="e.g. Solve 10 DP problems on LeetCode"
              value={form.title}
              onChange={(e) => onChange("title", e.target.value)}
              autoFocus
              required
            />
          </div>

          {/* Description */}
          <div className={styles.field}>
            <label className={styles.label}>Description <span className={styles.optional}>(optional)</span></label>
            <textarea
              className={styles.textarea}
              placeholder="Add notes, links, or context for this task…"
              value={form.description}
              onChange={(e) => onChange("description", e.target.value)}
              rows={2}
            />
          </div>

          {/* Priority — visual selector */}
          <div className={styles.field}>
            <label className={styles.label}>Priority</label>
            <div className={styles.priorityGroup}>
              {PRIORITIES.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  className={`${styles.priorityBtn} ${form.priority === p.value ? styles.priorityActive : ""}`}
                  style={{ "--p-color": p.color }}
                  onClick={() => onChange("priority", p.value)}
                >
                  <span className={styles.priorityDot} style={{ background: p.color }} />
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Subject + Time */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Subject</label>
              <select
                className={styles.select}
                value={form.subject}
                onChange={(e) => onChange("subject", e.target.value)}
              >
                {PLANNER_SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>{s.icon} {s.label}</option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Estimated Time</label>
              <select
                className={styles.select}
                value={form.estimatedTime}
                onChange={(e) => onChange("estimatedTime", e.target.value)}
              >
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Deadline + Pin */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Deadline</label>
              <input
                className={styles.input}
                type="date"
                value={form.deadline}
                onChange={(e) => onChange("deadline", e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Pin Task</label>
              <button
                type="button"
                className={`${styles.pinToggle} ${form.pinned ? styles.pinToggleActive : ""}`}
                onClick={() => onChange("pinned", !form.pinned)}
              >
                <span>📌</span>
                <span>{form.pinned ? "Pinned — stays on top" : "Pin this task"}</span>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={!form.title.trim()}
            >
              {isEditing ? "✓ Save Changes" : "➕ Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

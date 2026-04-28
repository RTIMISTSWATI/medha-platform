import React from "react";
import { PRIORITIES, PLANNER_SUBJECTS } from "../../constants/planner";
import styles from "./TaskForm.module.css";

export default function TaskForm({ form, onChange, onSubmit, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>➕ New Study Task</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Title */}
          <div className={styles.field}>
            <label className={styles.label}>Task Title *</label>
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

          {/* Subject + Priority */}
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
              <label className={styles.label}>Priority</label>
              <select
                className={styles.select}
                value={form.priority}
                onChange={(e) => onChange("priority", e.target.value)}
              >
                {PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Time + Deadline */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Estimated Time</label>
              <select
                className={styles.select}
                value={form.estimatedTime}
                onChange={(e) => onChange("estimatedTime", e.target.value)}
              >
                {["30m","1h","1.5h","2h","2.5h","3h","4h","5h+"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Deadline</label>
              <input
                className={styles.input}
                type="date"
                value={form.deadline}
                onChange={(e) => onChange("deadline", e.target.value)}
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn} disabled={!form.title.trim()}>
              ➕ Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

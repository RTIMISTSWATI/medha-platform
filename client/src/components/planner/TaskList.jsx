import React from "react";
import { PRIORITIES, PLANNER_SUBJECTS } from "../../constants/planner";
import styles from "./TaskList.module.css";

function PriorityDot({ priority }) {
  const p = PRIORITIES.find((x) => x.value === priority);
  return (
    <span className={styles.priorityDot} style={{ background: p?.color ?? "#94a3b8" }} title={p?.label} />
  );
}

function formatDeadline(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  const today = new Date(); today.setHours(0,0,0,0);
  const diff = Math.round((d - today) / 86400000);
  if (diff === 0) return { label: "Today", urgent: true };
  if (diff === 1) return { label: "Tomorrow", urgent: false };
  if (diff < 0)  return { label: `${Math.abs(diff)}d overdue`, overdue: true };
  return { label: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }), urgent: false };
}

export default function TaskList({ tasks, filterTab, onFilterChange, onComplete, onUncomplete, onDelete }) {
  const TABS = [
    { id: "all",       label: "All" },
    { id: "today",     label: "Today" },
    { id: "pending",   label: "Pending" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <div className={styles.container}>
      {/* Filter tabs */}
      <div className={styles.tabs}>
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`${styles.tab} ${filterTab === t.id ? styles.tabActive : ""}`}
            onClick={() => onFilterChange(t.id)}
          >
            {t.label}
          </button>
        ))}
        <span className={styles.taskCount}>{tasks.length} tasks</span>
      </div>

      {/* Task cards */}
      {tasks.length === 0 ? (
        <div className={styles.empty}>
          <span>🎯</span>
          <p>No tasks here. Add one to get started!</p>
        </div>
      ) : (
        <div className={styles.list}>
          {tasks.map((task) => {
            const subject = PLANNER_SUBJECTS.find((s) => s.id === task.subject);
            const deadline = formatDeadline(task.deadline);
            return (
              <div
                key={task.id}
                className={`${styles.card} ${task.completed ? styles.cardDone : ""}`}
              >
                {/* Priority stripe */}
                <div
                  className={styles.priorityStripe}
                  style={{
                    background: PRIORITIES.find((p) => p.value === task.priority)?.color ?? "#94a3b8",
                  }}
                />

                {/* Checkbox */}
                <button
                  className={`${styles.checkbox} ${task.completed ? styles.checkboxDone : ""}`}
                  onClick={() => task.completed ? onUncomplete(task.id) : onComplete(task.id)}
                  title={task.completed ? "Mark incomplete" : "Mark complete"}
                >
                  {task.completed ? "✓" : ""}
                </button>

                {/* Content */}
                <div className={styles.content}>
                  <div className={styles.titleRow}>
                    <span className={styles.taskTitle}>{task.title}</span>
                    <div className={styles.meta}>
                      <span className={styles.subjectTag}>{subject?.icon} {subject?.label}</span>
                      <span className={styles.timeTag}>⏱ {task.estimatedTime}</span>
                      {deadline && (
                        <span
                          className={`${styles.deadlineTag} ${deadline.urgent ? styles.urgent : ""} ${deadline.overdue ? styles.overdue : ""}`}
                        >
                          📅 {deadline.label}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Delete */}
                <button
                  className={styles.deleteBtn}
                  onClick={() => onDelete(task.id)}
                  title="Delete task"
                >
                  🗑️
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

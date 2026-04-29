import React from "react";
import { PRIORITIES, PLANNER_SUBJECTS } from "../../constants/planner";
import styles from "./TaskList.module.css";

const TABS = [
  { id: "all",       label: "All",       icon: "◈" },
  { id: "today",     label: "Today",     icon: "☀" },
  { id: "pending",   label: "Pending",   icon: "⏳" },
  { id: "completed", label: "Completed", icon: "✓" },
];

function formatDeadline(dateStr) {
  if (!dateStr) return null;
  const d     = new Date(dateStr + "T00:00:00");
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const diff  = Math.round((d - today) / 86400000);
  if (diff === 0)  return { label: "Due Today",    cls: "urgent" };
  if (diff === 1)  return { label: "Due Tomorrow", cls: "" };
  if (diff < 0)    return { label: `${Math.abs(diff)}d overdue`, cls: "overdue" };
  if (diff <= 3)   return { label: `${diff}d left`, cls: "soon" };
  return { label: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }), cls: "" };
}

export default function TaskList({
  tasks, filterTab, onFilterChange,
  onComplete, onUncomplete, onEdit, onPin, onDelete,
  xpFlash,
}) {
  return (
    <div className={styles.container}>

      {/* Filter tabs */}
      <div className={styles.tabsWrap}>
        <div className={styles.tabs}>
          {TABS.map((t) => (
            <button
              key={t.id}
              className={`${styles.tab} ${filterTab === t.id ? styles.tabActive : ""}`}
              onClick={() => onFilterChange(t.id)}
            >
              <span className={styles.tabIcon}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>
        <span className={styles.taskCount}>{tasks.length} task{tasks.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Empty state */}
      {tasks.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🎯</div>
          <p className={styles.emptyTitle}>No tasks here</p>
          <p className={styles.emptySub}>Click "Add Task" to build your study plan</p>
        </div>
      ) : (
        <div className={styles.list}>
          {tasks.map((task) => {
            const subject  = PLANNER_SUBJECTS.find((s) => s.id === task.subject);
            const priority = PRIORITIES.find((p) => p.value === task.priority);
            const deadline = formatDeadline(task.deadline);
            const isFlashing = xpFlash?.id === task.id;

            return (
              <div
                key={task.id}
                className={`
                  ${styles.card}
                  ${task.completed ? styles.cardDone : ""}
                  ${task.pinned    ? styles.cardPinned : ""}
                `}
              >
                {/* Priority stripe */}
                <div
                  className={styles.stripe}
                  style={{ background: priority?.color ?? "#94a3b8" }}
                />

                {/* Checkbox */}
                <button
                  className={`${styles.checkbox} ${task.completed ? styles.checkboxDone : ""}`}
                  onClick={() => task.completed ? onUncomplete(task.id) : onComplete(task.id)}
                  title={task.completed ? "Mark incomplete" : "Mark complete"}
                >
                  {task.completed && <span className={styles.checkmark}>✓</span>}
                </button>

                {/* Body */}
                <div className={styles.body}>
                  <div className={styles.topRow}>
                    <span className={styles.taskTitle}>{task.title}</span>
                    {task.pinned && <span className={styles.pinBadge}>📌</span>}
                  </div>

                  {task.description && (
                    <p className={styles.description}>{task.description}</p>
                  )}

                  <div className={styles.meta}>
                    <span className={styles.tag} style={{ color: priority?.color, borderColor: `${priority?.color}30`, background: `${priority?.color}10` }}>
                      {priority?.label}
                    </span>
                    <span className={styles.tag}>
                      {subject?.icon} {subject?.label}
                    </span>
                    <span className={styles.tag}>⏱ {task.estimatedTime}</span>
                    {deadline && (
                      <span className={`${styles.tag} ${styles[deadline.cls]}`}>
                        📅 {deadline.label}
                      </span>
                    )}
                  </div>
                </div>

                {/* XP flash */}
                {isFlashing && (
                  <div className={styles.xpFlash}>+{xpFlash.amount} XP ⚡</div>
                )}

                {/* Actions */}
                <div className={styles.actions}>
                  <button
                    className={`${styles.actionBtn} ${task.pinned ? styles.actionBtnActive : ""}`}
                    onClick={() => onPin(task.id)}
                    title={task.pinned ? "Unpin" : "Pin"}
                  >
                    📌
                  </button>
                  <button
                    className={styles.actionBtn}
                    onClick={() => onEdit(task)}
                    title="Edit task"
                  >
                    ✏️
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    onClick={() => onDelete(task.id)}
                    title="Delete task"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

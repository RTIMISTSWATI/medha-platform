// ADDED
// ─────────────────────────────────────────────────────────────
// reminderService.js
// Checks incomplete tasks and fires browser notifications for:
//   • Tasks due today (upcoming reminder)
//   • Tasks past their deadline (overdue reminder)
//
// Deduplication: notified task IDs are tracked in a module-level
// Set so the same notification is never shown twice per session.
// ─────────────────────────────────────────────────────────────

const TASKS_KEY = "medha_planner_tasks";

// In-memory sets — reset on page reload, which is intentional.
// A full reload means the user is back and should be reminded again.
const _notifiedUpcoming = new Set();
const _notifiedOverdue  = new Set();

function loadTasks() {
  try {
    const raw = localStorage.getItem(TASKS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function fireNotification(title, body) {
  try {
    // eslint-disable-next-line no-new
    new Notification(title, {
      body,
      icon: "/favicon.svg",
      silent: false,
    });
  } catch {
    // Notification API unavailable — fail silently
  }
}

export async function requestNotificationPermission() {
  try {
    if (!("Notification" in window)) return;
    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }
  } catch {
    // Permission request failed — fail silently
  }
}

export function checkReminders() {
  try {
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") return;

    const tasks = loadTasks();
    const now   = new Date();

    // Normalise today to midnight for date-only comparisons
    const todayMidnight = new Date(now);
    todayMidnight.setHours(0, 0, 0, 0);
    const todayStr = todayMidnight.toISOString().split("T")[0];

    tasks.forEach((task) => {
      // SAFETY: skip completed tasks and tasks without a deadline
      if (!task || task.completed || !task.deadline) return;

      const taskId   = String(task.id ?? "");
      const title    = task.title ?? "Untitled task";
      const deadline = new Date(task.deadline + "T00:00:00"); // parse as local date

      if (isNaN(deadline.getTime())) return; // SAFETY: skip invalid dates

      const deadlineStr = task.deadline;

      // ── Overdue: deadline date is strictly before today ──────
      if (deadline < todayMidnight && !_notifiedOverdue.has(taskId)) {
        _notifiedOverdue.add(taskId);
        fireNotification(
          "⚠️ Overdue Task — Medha",
          `"${title}" was due on ${deadlineStr}. Don't let it slip further!`
        );
        return;
      }

      // ── Upcoming: deadline is today ──────────────────────────
      // "Within 1 hour" for a date-only deadline means: due today
      // and the current hour is 23 (last hour of the day), OR simply
      // due today as a general reminder — we fire once per session.
      if (deadlineStr === todayStr && !_notifiedUpcoming.has(taskId)) {
        _notifiedUpcoming.add(taskId);
        fireNotification(
          "⏰ Task Due Today — Medha",
          `"${title}" is due today. Time to get it done!`
        );
      }
    });
  } catch {
    // Never crash the app
  }
}

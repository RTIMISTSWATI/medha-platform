// ─────────────────────────────────────────────────────────────
// dashboardService.js
// Computes dashboard metrics from localStorage data
// ─────────────────────────────────────────────────────────────

// SAFETY FIX: centralised safe localStorage reader
function safeLoad(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

// UPDATED: returns [{day, count}] for the last 7 days (Sun→Sat order)
// Uses task.completedAt; skips tasks with missing/invalid dates
function getWeeklyData(tasks) {
  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const weekData = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dayLabel = DAY_NAMES[date.getDay()];

    const count = tasks.filter(task => {
      // SAFETY FIX: only count completed tasks with a valid completedAt date
      if (!task?.completed || !task?.completedAt) return false;
      const d = new Date(task.completedAt);
      if (isNaN(d.getTime())) return false;          // SAFETY FIX: skip invalid dates
      d.setHours(0, 0, 0, 0);
      return d.getTime() === date.getTime();
    }).length;

    weekData.push({ day: dayLabel, count });
  }

  return weekData;
}

// ADDED: consecutive-day streak based on completed tasks
// Returns the number of consecutive days (ending today or yesterday) with ≥1 completed task
function getStreak(tasks) {
  // SAFETY FIX: guard against non-array input
  if (!Array.isArray(tasks) || tasks.length === 0) return 0;

  // Collect unique calendar dates that have at least one completed task
  const completedDates = new Set();
  tasks.forEach(task => {
    if (!task?.completed || !task?.completedAt) return;
    const d = new Date(task.completedAt);
    if (isNaN(d.getTime())) return;                  // SAFETY FIX: skip invalid dates
    // Normalise to YYYY-MM-DD so time-of-day doesn't matter
    completedDates.add(d.toISOString().split('T')[0]);
  });

  if (completedDates.size === 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split('T')[0];

  // Streak must include today; if today has no completed task → streak is 0
  if (!completedDates.has(todayStr)) return 0;

  // Walk backwards from today counting consecutive days
  let streak = 0;
  const cursor = new Date(today);

  while (true) {
    const dateStr = cursor.toISOString().split('T')[0];
    if (!completedDates.has(dateStr)) break;
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export const dashboardService = {
  getDashboardData() {
    // SAFETY FIX: all reads use safeLoad with typed fallbacks
    const tasks      = safeLoad('medha_planner_tasks', []);
    const notes      = safeLoad('medha_notes',         []);   // UPDATED: correct key
    const studyHours = safeLoad('medha_study_hours',   0);

    // Ensure tasks is always an array before any .filter / .forEach
    const safeTasks = Array.isArray(tasks) ? tasks : [];  // SAFETY FIX
    const safeNotes = Array.isArray(notes) ? notes : [];  // SAFETY FIX

    const completedTasks = safeTasks.filter(t => t?.completed === true).length;
    const notesCount     = safeNotes.length;

    // UPDATED: capped at 100, safe defaults
    const rawScore       = (completedTasks * 10) + (Number(studyHours) || 0) * 5;
    const productivityScore = Math.min(100, rawScore);  // UPDATED

    // UPDATED: uses completedAt, handles invalid dates
    const weeklyData = getWeeklyData(safeTasks);

    // ADDED: task-based consecutive streak
    const streak = getStreak(safeTasks);

    const totalTasks   = safeTasks.length;
    const pendingTasks = safeTasks.filter(t => !t?.completed).length;

    // Subject breakdown for ProgressCharts
    const subjectMap = {};
    safeTasks.forEach(task => {
      const subj = task?.subject;
      if (!subj) return;
      if (!subjectMap[subj]) subjectMap[subj] = { total: 0, done: 0 };
      subjectMap[subj].total++;
      if (task?.completed) subjectMap[subj].done++;
    });

    return {
      studyHours,
      completedTasks,
      notesCount,
      productivityScore,  // UPDATED: capped at 100
      weeklyData,         // UPDATED: uses completedAt
      streak,             // ADDED
      totalTasks,
      pendingTasks,
      subjectMap,
    };
  },
};

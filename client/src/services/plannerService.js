// ─────────────────────────────────────────────────────────────
// plannerService.js
// Phase 1 : localStorage
// Phase 2 : swap bodies to use serverApi
//   POST   /planner/tasks         → create task
//   GET    /planner/tasks         → get all tasks
//   PUT    /planner/tasks/:id     → update task
//   DELETE /planner/tasks/:id     → delete task
//   GET    /planner/stats         → get XP, streak, heatmap
// ─────────────────────────────────────────────────────────────

const KEYS = {
  tasks:   "medha_planner_tasks",
  xp:      "medha_planner_xp",
  streak:  "medha_planner_streak",
  heatmap: "medha_planner_heatmap",
};

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ── Tasks ─────────────────────────────────────────────────────
export const plannerService = {
  getTasks() {
    return Promise.resolve(load(KEYS.tasks, []));
  },

  createTask(task) {
    const tasks = load(KEYS.tasks, []);
    const created = {
      ...task,
      id: `task-${Date.now()}`,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    save(KEYS.tasks, [created, ...tasks]);
    return Promise.resolve(created);
  },

  updateTask(id, updates) {
    const tasks = load(KEYS.tasks, []).map((t) =>
      t.id === id ? { ...t, ...updates } : t
    );
    save(KEYS.tasks, tasks);
    return Promise.resolve(tasks.find((t) => t.id === id));
  },

  deleteTask(id) {
    save(KEYS.tasks, load(KEYS.tasks, []).filter((t) => t.id !== id));
    return Promise.resolve({ id });
  },

  // ── XP ──────────────────────────────────────────────────────
  getXP()       { return load(KEYS.xp, 0); },
  addXP(amount) {
    const xp = load(KEYS.xp, 0) + amount;
    save(KEYS.xp, xp);
    return xp;
  },

  // ── Streak ──────────────────────────────────────────────────
  getStreak() { return load(KEYS.streak, { count: 0, lastDate: null }); },
  updateStreak() {
    const today = new Date().toDateString();
    const streak = load(KEYS.streak, { count: 0, lastDate: null });
    if (streak.lastDate === today) return streak;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const newCount = streak.lastDate === yesterday ? streak.count + 1 : 1;
    const updated = { count: newCount, lastDate: today };
    save(KEYS.streak, updated);
    return updated;
  },

  // ── Heatmap ──────────────────────────────────────────────────
  getHeatmap() { return load(KEYS.heatmap, {}); },
  markHeatmap(dateStr, count = 1) {
    const heatmap = load(KEYS.heatmap, {});
    heatmap[dateStr] = (heatmap[dateStr] ?? 0) + count;
    save(KEYS.heatmap, heatmap);
    return heatmap;
  },
};

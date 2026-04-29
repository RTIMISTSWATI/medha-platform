// ─────────────────────────────────────────────────────────────
// dashboardService.js
// Reads REAL data from existing Medha localStorage keys.
// Mock data fills sections not yet tracked (problems, resume, etc.)
// Phase 2: replace mock sections with real API calls.
// ─────────────────────────────────────────────────────────────

const KEYS = {
  tasks:        "medha_planner_tasks",
  xp:           "medha_planner_xp",
  streak:       "medha_planner_streak",
  heatmap:      "medha_planner_heatmap",
  notes:        "medha_notes",
  dsaProgress:  "medha_dsa_progress",
  coreProgress: "medha_core_progress",
  hrProgress:   "medha_hr_progress",
  resumeChecks: "medha_resume_checks",
  mockDone:     "medha_mock_done",
};

function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}

export function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const dashboardService = {
  // ── Real data ──────────────────────────────────────────────
  getTasks()   { return load(KEYS.tasks,   []); },
  getNotes()   { return load(KEYS.notes,   []); },
  getXP()      { return load(KEYS.xp,      0);  },
  getStreak()  { return load(KEYS.streak,  { count: 0, lastDate: null }); },
  getHeatmap() { return load(KEYS.heatmap, {}); },

  // ── Interview progress (persisted) ────────────────────────
  getDSAProgress()  { return load(KEYS.dsaProgress,  {}); },
  getCoreProgress() { return load(KEYS.coreProgress, {}); },
  getHRProgress()   { return load(KEYS.hrProgress,   []); },
  getMockDone()     { return load(KEYS.mockDone,      0);  },

  saveDSAProgress(data)  { save(KEYS.dsaProgress,  data); },
  saveCoreProgress(data) { save(KEYS.coreProgress, data); },
  saveHRProgress(data)   { save(KEYS.hrProgress,   data); },
  saveMockDone(n)        { save(KEYS.mockDone,      n);   },

  // ── Resume checklist (persisted) ──────────────────────────
  getResumeChecks() { return load(KEYS.resumeChecks, []); },
  saveResumeChecks(data) { save(KEYS.resumeChecks, data); },

  // ── Derived stats ──────────────────────────────────────────
  computeStats() {
    const tasks   = load(KEYS.tasks, []);
    const notes   = load(KEYS.notes, []);
    const heatmap = load(KEYS.heatmap, {});

    const completedTasks = tasks.filter((t) => t.completed).length;
    const pendingTasks   = tasks.filter((t) => !t.completed).length;
    const notesCount     = notes.length;

    // Study hours: estimate from completed tasks' estimatedTime
    const studyHours = tasks
      .filter((t) => t.completed)
      .reduce((acc, t) => {
        const h = parseFloat(t.estimatedTime) || 1;
        return acc + h;
      }, 0);

    // Weekly consistency: last 7 days heatmap
    const today   = new Date();
    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - i));
      return d.toISOString().split("T")[0];
    });
    const weeklyData = weekDays.map((d) => heatmap[d] ?? 0);

    // Subject breakdown from tasks
    const subjectMap = {};
    tasks.forEach((t) => {
      if (!subjectMap[t.subject]) subjectMap[t.subject] = { total: 0, done: 0 };
      subjectMap[t.subject].total++;
      if (t.completed) subjectMap[t.subject].done++;
    });

    // Productivity score
    const productivityScore = tasks.length > 0
      ? Math.round((completedTasks / tasks.length) * 100)
      : 0;

    return {
      studyHours:       Math.round(studyHours * 10) / 10,
      completedTasks,
      pendingTasks,
      notesCount,
      productivityScore,
      weeklyData,
      weekDays,
      subjectMap,
    };
  },
};

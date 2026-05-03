import { useState, useEffect, useCallback, useMemo } from "react";
import { plannerService } from "../services/plannerService";
import { XP_REWARDS, LEVELS } from "../constants/planner";

const EMPTY_TASK = {
  title: "",
  description: "",
  subject: "dsa",
  priority: "medium",
  estimatedTime: "1h",
  deadline: new Date().toISOString().split("T")[0],
  pinned: false,
};

export function usePlanner() {
  const [tasks,      setTasks]      = useState([]);
  const [xp,         setXp]         = useState(0);
  const [streak,     setStreak]     = useState({ count: 0, lastDate: null });
  const [heatmap,    setHeatmap]    = useState({});
  const [form,       setForm]       = useState({ ...EMPTY_TASK });
  const [formOpen,   setFormOpen]   = useState(false);
  const [editingId,  setEditingId]  = useState(null); // null = create, id = edit
  const [filterTab,  setFilterTab]  = useState("all");
  const [sortBy,     setSortBy]     = useState("createdAt"); // ADDED: default sort
  const [xpFlash,    setXpFlash]    = useState(null); // { id, amount } for animation

  // ── Bootstrap ──────────────────────────────────────────────
  useEffect(() => {
    plannerService.getTasks().then((loadedTasks) => {
      setTasks(loadedTasks);
      // Sync with dashboard integration key
      localStorage.setItem('tasks', JSON.stringify(loadedTasks));
    });
    setXp(plannerService.getXP());
    setStreak(plannerService.getStreak());
    setHeatmap(plannerService.getHeatmap());
  }, []);

  // ── Derived: level ─────────────────────────────────────────
  const levelInfo = useMemo(() => {
    return LEVELS.findLast((l) => xp >= l.minXP) ?? LEVELS[0];
  }, [xp]);

  // ── Derived: stats ─────────────────────────────────────────
  const today    = new Date().toDateString();
  const todayStr = new Date().toISOString().split("T")[0];

  const stats = useMemo(() => {
    const completedToday = tasks.filter(
      (t) => t.completed && new Date(t.completedAt).toDateString() === today
    ).length;
    const totalToday     = tasks.filter((t) => t.deadline === todayStr).length;
    const totalCompleted = tasks.filter((t) => t.completed).length;
    const totalPending   = tasks.filter((t) => !t.completed).length;

    const now     = new Date();
    const weekAgo = new Date(now - 7 * 86400000);
    const weeklyTotal = tasks.filter((t) => {
      const d = new Date(t.deadline);
      return d >= weekAgo && d <= now;
    }).length;
    const weeklyDone = tasks.filter((t) => {
      const d = new Date(t.completedAt);
      return t.completed && d >= weekAgo && d <= now;
    }).length;

    const weeklyPct = weeklyTotal > 0 ? Math.round((weeklyDone / weeklyTotal) * 100) : 0;
    const productivityScore = Math.min(
      100,
      Math.round((totalCompleted / Math.max(tasks.length, 1)) * 100)
    );
    return { completedToday, totalToday, totalCompleted, totalPending, weeklyPct, productivityScore };
  }, [tasks, today, todayStr]);

  // ── Derived: filtered + sorted tasks ──────────────────────
  // UPDATED: added sortBy dimension after filter + pinned-first
  const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }; // ADDED

  const filteredTasks = useMemo(() => {
    let list;
    switch (filterTab) {
      case "today":     list = tasks.filter((t) => t.deadline === todayStr); break;
      case "completed": list = tasks.filter((t) => t.completed);             break;
      case "pending":   list = tasks.filter((t) => !t.completed);            break;
      default:          list = [...tasks];
    }

    // Pinned always first, then apply sortBy within each group
    return list.sort((a, b) => {
      // Pinned-first stays regardless of sort
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;

      // ADDED: secondary sort by sortBy
      if (sortBy === "priority") {
        const pa = PRIORITY_ORDER[a.priority] ?? 1;
        const pb = PRIORITY_ORDER[b.priority] ?? 1;
        if (pa !== pb) return pa - pb; // high(0) before low(2)
      }

      if (sortBy === "dueDate") {
        // SAFETY: tasks without deadline sort to the end
        const da = a.deadline ? new Date(a.deadline).getTime() : Infinity;
        const db = b.deadline ? new Date(b.deadline).getTime() : Infinity;
        if (da !== db) return da - db; // earliest first
      }

      // Default / tiebreaker: newest created first
      return new Date(b.createdAt ?? 0) - new Date(a.createdAt ?? 0);
    });
  }, [tasks, filterTab, sortBy, todayStr]);

  // ── Form helpers ───────────────────────────────────────────
  const updateForm = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const openCreateForm = useCallback(() => {
    setForm({ ...EMPTY_TASK });
    setEditingId(null);
    setFormOpen(true);
  }, []);

  const openEditForm = useCallback((task) => {
    setForm({
      title:         task.title,
      description:   task.description ?? "",
      subject:       task.subject,
      priority:      task.priority,
      estimatedTime: task.estimatedTime,
      deadline:      task.deadline,
      pinned:        task.pinned ?? false,
    });
    setEditingId(task.id);
    setFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setFormOpen(false);
    setEditingId(null);
    setForm({ ...EMPTY_TASK });
  }, []);

  // ── Submit (create or update) ──────────────────────────────
  const submitTask = useCallback(async () => {
    if (!form.title.trim()) return;

    if (editingId) {
      const updated = await plannerService.updateTask(editingId, form);
      setTasks((prev) => {
        const newTasks = prev.map((t) => (t.id === editingId ? updated : t));
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        return newTasks;
      });
    } else {
      const created = await plannerService.createTask({
        ...form,
        id: Date.now(),
        completed: false,
        createdAt: new Date().toISOString()
      });
      setTasks((prev) => {
        const newTasks = [created, ...prev];
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        return newTasks;
      });
    }
    closeForm();
  }, [form, editingId, closeForm]);

  // ── Complete / uncomplete ──────────────────────────────────
  const completeTask = useCallback(async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task || task.completed) return;

    const updated = await plannerService.updateTask(id, {
      completed: true,
      completedAt: new Date().toISOString(),
    });
    setTasks((prev) => {
      const newTasks = prev.map((t) => (t.id === id ? updated : t));
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    });

    let earned = XP_REWARDS.completeTask;
    if (task.priority === "high") earned += XP_REWARDS.highPriority;
    const newXp = plannerService.addXP(earned);
    setXp(newXp);

    // XP flash animation
    setXpFlash({ id, amount: earned });
    setTimeout(() => setXpFlash(null), 1800);

    const newStreak = plannerService.updateStreak();
    setStreak(newStreak);
    const newHeatmap = plannerService.markHeatmap(todayStr);
    setHeatmap(newHeatmap);
  }, [tasks, todayStr]);

  const uncompleteTask = useCallback(async (id) => {
    const updated = await plannerService.updateTask(id, {
      completed: false,
      completedAt: null,
    });
    setTasks((prev) => {
      const newTasks = prev.map((t) => (t.id === id ? updated : t));
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    });
  }, []);

  // ── Pin ────────────────────────────────────────────────────
  const pinTask = useCallback(async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const updated = await plannerService.updateTask(id, { pinned: !task.pinned });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }, [tasks]);

  // ── Delete ─────────────────────────────────────────────────
  const deleteTask = useCallback(async (id) => {
    await plannerService.deleteTask(id);
    setTasks((prev) => {
      const newTasks = prev.filter((t) => t.id !== id);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    });
  }, []);

  return {
    tasks, filteredTasks, stats, xp, levelInfo, streak, heatmap,
    form, formOpen, editingId, filterTab, sortBy, xpFlash, // UPDATED: added sortBy
    openCreateForm, openEditForm, closeForm,
    setFilterTab, setSortBy, updateForm, submitTask,       // UPDATED: added setSortBy
    completeTask, uncompleteTask, pinTask, deleteTask,
  };
}

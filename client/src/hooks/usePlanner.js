import { useState, useEffect, useCallback, useMemo } from "react";
import { plannerService } from "../services/plannerService";
import { XP_REWARDS, LEVELS } from "../constants/planner";

const EMPTY_TASK = {
  title: "",
  subject: "dsa",
  priority: "medium",
  estimatedTime: "1h",
  deadline: new Date().toISOString().split("T")[0],
};

export function usePlanner() {
  const [tasks,     setTasks]     = useState([]);
  const [xp,        setXp]        = useState(0);
  const [streak,    setStreak]    = useState({ count: 0, lastDate: null });
  const [heatmap,   setHeatmap]   = useState({});
  const [form,      setForm]      = useState({ ...EMPTY_TASK });
  const [formOpen,  setFormOpen]  = useState(false);
  const [filterTab, setFilterTab] = useState("all"); // all | today | completed | pending

  // ── Bootstrap ─────────────────────────────────────────────
  useEffect(() => {
    plannerService.getTasks().then(setTasks);
    setXp(plannerService.getXP());
    setStreak(plannerService.getStreak());
    setHeatmap(plannerService.getHeatmap());
  }, []);

  // ── Derived: level ────────────────────────────────────────
  const levelInfo = useMemo(() => {
    return LEVELS.findLast((l) => xp >= l.minXP) ?? LEVELS[0];
  }, [xp]);

  // ── Derived: stats ────────────────────────────────────────
  const today = new Date().toDateString();
  const todayStr = new Date().toISOString().split("T")[0];

  const stats = useMemo(() => {
    const completedToday = tasks.filter(
      (t) => t.completed && new Date(t.completedAt).toDateString() === today
    ).length;
    const totalToday = tasks.filter(
      (t) => t.deadline === todayStr
    ).length;
    const totalCompleted = tasks.filter((t) => t.completed).length;
    const totalPending   = tasks.filter((t) => !t.completed).length;
    const weeklyTotal    = tasks.filter((t) => {
      const d = new Date(t.deadline);
      const now = new Date();
      const weekAgo = new Date(now - 7 * 86400000);
      return d >= weekAgo && d <= now;
    }).length;
    const weeklyDone = tasks.filter((t) => {
      const d = new Date(t.completedAt);
      const now = new Date();
      const weekAgo = new Date(now - 7 * 86400000);
      return t.completed && d >= weekAgo && d <= now;
    }).length;
    const weeklyPct = weeklyTotal > 0 ? Math.round((weeklyDone / weeklyTotal) * 100) : 0;
    const productivityScore = Math.min(
      100,
      Math.round((totalCompleted / Math.max(tasks.length, 1)) * 100)
    );
    return { completedToday, totalToday, totalCompleted, totalPending, weeklyPct, productivityScore };
  }, [tasks, today, todayStr]);

  // ── Derived: filtered tasks ───────────────────────────────
  const filteredTasks = useMemo(() => {
    switch (filterTab) {
      case "today":     return tasks.filter((t) => t.deadline === todayStr);
      case "completed": return tasks.filter((t) => t.completed);
      case "pending":   return tasks.filter((t) => !t.completed);
      default:          return tasks;
    }
  }, [tasks, filterTab, todayStr]);

  // ── Form handlers ─────────────────────────────────────────
  const updateForm = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const submitTask = useCallback(async () => {
    if (!form.title.trim()) return;
    const created = await plannerService.createTask(form);
    setTasks((prev) => [created, ...prev]);
    setForm({ ...EMPTY_TASK });
    setFormOpen(false);
  }, [form]);

  // ── Complete task ─────────────────────────────────────────
  const completeTask = useCallback(async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task || task.completed) return;

    const updated = await plannerService.updateTask(id, {
      completed: true,
      completedAt: new Date().toISOString(),
    });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));

    // XP
    let earned = XP_REWARDS.completeTask;
    if (task.priority === "high") earned += XP_REWARDS.highPriority;
    const newXp = plannerService.addXP(earned);
    setXp(newXp);

    // Streak + heatmap
    const newStreak = plannerService.updateStreak();
    setStreak(newStreak);
    const newHeatmap = plannerService.markHeatmap(todayStr);
    setHeatmap(newHeatmap);
  }, [tasks, todayStr]);

  // ── Uncomplete task ───────────────────────────────────────
  const uncompleteTask = useCallback(async (id) => {
    const updated = await plannerService.updateTask(id, {
      completed: false,
      completedAt: null,
    });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }, []);

  // ── Delete task ───────────────────────────────────────────
  const deleteTask = useCallback(async (id) => {
    await plannerService.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    tasks, filteredTasks, stats, xp, levelInfo, streak, heatmap,
    form, formOpen, filterTab,
    setFormOpen, setFilterTab,
    updateForm, submitTask,
    completeTask, uncompleteTask, deleteTask,
  };
}

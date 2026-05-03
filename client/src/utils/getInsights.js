// ADDED
const FALLBACK = ["Keep showing up — every session counts. 📚"];

/**
 * getInsights(data)
 * Accepts the stats object from useDashboard and returns an array of
 * human-readable insight strings derived from real user behaviour.
 */
export function getInsights(data) {
  try {
    const streak        = Number(data?.streak)        || 0;
    const completed     = Number(data?.completedTasks) || 0;
    const totalTasks    = Number(data?.totalTasks)     || 0;
    const weeklyData    = Array.isArray(data?.weeklyData) ? data.weeklyData : [];

    const insights = [];

    // ── Streak insight ──────────────────────────────────────────
    if (streak >= 7) {
      insights.push(`🔥 ${streak}-day streak! You're on fire — don't break the chain.`);
    } else if (streak >= 3) {
      insights.push(`⚡ ${streak}-day streak going strong. Keep the momentum!`);
    } else if (streak === 1) {
      insights.push("✅ Day 1 streak started. Come back tomorrow to keep it alive!");
    } else {
      insights.push("🚀 No active streak yet. Complete a task today to start one!");
    }

    // ── Completed tasks insight ─────────────────────────────────
    if (completed >= 20) {
      insights.push(`🏆 ${completed} tasks completed — you're a productivity machine!`);
    } else if (completed >= 10) {
      insights.push(`📈 ${completed} tasks done. You're making serious progress.`);
    } else if (completed >= 1) {
      insights.push(`👍 ${completed} task${completed > 1 ? "s" : ""} completed. Every step counts!`);
    } else {
      insights.push("📋 No tasks completed yet. Add one in the Study Planner to get started.");
    }

    // ── Pending tasks nudge ─────────────────────────────────────
    const pending = totalTasks - completed;
    if (pending > 5) {
      insights.push(`⏳ ${pending} tasks pending — pick the highest-priority one and tackle it now.`);
    } else if (pending > 0) {
      insights.push(`🎯 Just ${pending} task${pending > 1 ? "s" : ""} left. You're almost there!`);
    }

    // ── Most productive day from weeklyData ─────────────────────
    if (weeklyData.length > 0) {
      const best = weeklyData.reduce(
        (max, d) => ((d?.count ?? 0) > (max?.count ?? 0) ? d : max),
        weeklyData[0]
      );
      if ((best?.count ?? 0) > 0) {
        insights.push(`📅 Your most productive day this week was ${best.day} with ${best.count} task${best.count > 1 ? "s" : ""} completed.`);
      } else {
        insights.push("📅 No tasks completed this week yet. Start today to see your activity chart grow!");
      }
    }

    return insights.length > 0 ? insights : FALLBACK;
  } catch {
    // SAFETY: never crash even if data is malformed
    return FALLBACK;
  }
}

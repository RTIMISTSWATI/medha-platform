import React, { useState } from "react";
import { aiService } from "../../services/aiService";
import { ROADMAP_GOALS } from "../../constants/planner";
import styles from "./AIStudyPlanner.module.css";

const DAY_COLORS = {
  Monday: "#3b82f6", Tuesday: "#8b5cf6", Wednesday: "#06b6d4",
  Thursday: "#10b981", Friday: "#f59e0b", Saturday: "#ef4444", Sunday: "#ec4899",
};

const TAG_COLORS = {
  DSA: "#3b82f6", Theory: "#8b5cf6", OS: "#06b6d4", DBMS: "#10b981",
  Java: "#f59e0b", Spring: "#f97316", Design: "#a855f7", Soft: "#22c55e",
  Mock: "#ef4444", Career: "#ec4899", Review: "#94a3b8", CN: "#0ea5e9",
  Quant: "#3b82f6", Logic: "#8b5cf6", Verbal: "#10b981", DI: "#6366f1",
  Project: "#f97316",
};

const WEAK_SUGGESTIONS = {
  dsa_placement: ["Arrays", "DP", "Graphs", "Trees", "Binary Search"],
  gate:          ["Discrete Math", "Networks", "Compiler Design", "OS"],
  interview:     ["System Design", "Behavioral", "LLD", "Concurrency"],
  java:          ["Multithreading", "Spring Boot", "Java 8"],
  aptitude:      ["DI", "Logical Reasoning", "Verbal"],
};

export default function AIStudyPlanner() {
  const [goal,       setGoal]       = useState("dsa_placement");
  const [hoursDay,   setHoursDay]   = useState(2);
  const [weakInput,  setWeakInput]  = useState("");
  const [weakTopics, setWeakTopics] = useState([]);
  const [result,     setResult]     = useState(null);
  const [loading,    setLoading]    = useState(false);

  const goalMeta = ROADMAP_GOALS.find((g) => g.id === goal);
  const suggestions = WEAK_SUGGESTIONS[goal] ?? [];

  function addWeak(topic) {
    const t = topic.trim();
    if (t && !weakTopics.includes(t)) setWeakTopics((p) => [...p, t]);
    setWeakInput("");
  }

  function removeWeak(t) {
    setWeakTopics((p) => p.filter((x) => x !== t));
  }

  function handleWeakKey(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addWeak(weakInput);
    }
  }

  async function generate() {
    setLoading(true);
    setResult(null);
    try {
      const data = await aiService.generateStudyPlan({ goal, hoursPerDay: hoursDay, weakTopics });
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>🤖 AI Study Planner</h2>
          <p className={styles.subtitle}>Tell Medha your goal — get a personalized weekly plan</p>
        </div>
        <span className={styles.badge}>AI</span>
      </div>

      {/* Goal */}
      <div className={styles.section}>
        <label className={styles.label}>Preparation Goal</label>
        <div className={styles.goalGrid}>
          {ROADMAP_GOALS.map((g) => (
            <button
              key={g.id}
              className={`${styles.goalBtn} ${goal === g.id ? styles.goalActive : ""}`}
              onClick={() => { setGoal(g.id); setResult(null); setWeakTopics([]); }}
            >
              <span>{g.icon}</span>
              <span>{g.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hours + Weak topics row */}
      <div className={styles.row}>
        {/* Hours */}
        <div className={styles.section}>
          <label className={styles.label}>Study Hours / Day</label>
          <div className={styles.hoursRow}>
            {[1, 1.5, 2, 2.5, 3, 4].map((h) => (
              <button
                key={h}
                className={`${styles.hourBtn} ${hoursDay === h ? styles.hourActive : ""}`}
                onClick={() => setHoursDay(h)}
              >
                {h}h
              </button>
            ))}
          </div>
        </div>

        {/* Weak topics */}
        <div className={`${styles.section} ${styles.weakSection}`}>
          <label className={styles.label}>Weak Topics <span className={styles.optional}>(optional)</span></label>
          <div className={styles.chipInput}>
            {weakTopics.map((t) => (
              <span key={t} className={styles.chip}>
                {t}
                <button className={styles.chipRemove} onClick={() => removeWeak(t)}>×</button>
              </span>
            ))}
            <input
              className={styles.weakInput}
              placeholder="Type & press Enter…"
              value={weakInput}
              onChange={(e) => setWeakInput(e.target.value)}
              onKeyDown={handleWeakKey}
            />
          </div>
          {/* Quick suggestions */}
          <div className={styles.suggestions}>
            {suggestions.filter((s) => !weakTopics.includes(s)).map((s) => (
              <button key={s} className={styles.suggBtn} onClick={() => addWeak(s)}>
                + {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generate button */}
      <button className={styles.generateBtn} onClick={generate} disabled={loading}>
        {loading ? <span className={styles.spinner} /> : "✨"}
        {loading ? "Generating your plan…" : "Generate AI Plan"}
      </button>

      {/* Result */}
      {result && (
        <div className={styles.result}>
          {/* Insights */}
          <div className={styles.insights}>
            <span className={styles.insightIcon}>💡</span>
            <div className={styles.insightList}>
              {result.insights.map((ins, i) => (
                <p key={i} className={styles.insightText}>{ins}</p>
              ))}
            </div>
          </div>

          {/* Plan header */}
          <div className={styles.planHeader}>
            <span className={styles.planTitle}>{goalMeta?.icon} {goalMeta?.label} — {hoursDay}h/day</span>
            <span className={styles.planWeek}>AI-Personalized · Week 1</span>
          </div>

          {/* Day cards */}
          <div className={styles.planGrid}>
            {result.plan.map((item, i) => {
              const dayColor = DAY_COLORS[item.day] ?? "#3b82f6";
              const tagColor = TAG_COLORS[item.tag] ?? "#94a3b8";
              return (
                <div
                  key={i}
                  className={`${styles.dayCard} ${item.isWeak ? styles.dayCardWeak : ""}`}
                  style={{ "--day-color": dayColor }}
                >
                  {item.isWeak && <span className={styles.weakBadge}>⚠ Weak</span>}
                  <div className={styles.dayHeader}>
                    <span className={styles.dayName}>{item.day}</span>
                    <span className={styles.dayEst}>{item.est}</span>
                  </div>
                  <p className={styles.dayTopic}>{item.topic}</p>
                  <span
                    className={styles.dayTag}
                    style={{ color: tagColor, borderColor: `${tagColor}40`, background: `${tagColor}12` }}
                  >
                    {item.tag}
                  </span>
                </div>
              );
            })}
          </div>

          <p className={styles.note}>
            💡 Add these as tasks in your Daily Planner to track completion and earn XP.
          </p>
        </div>
      )}
    </div>
  );
}

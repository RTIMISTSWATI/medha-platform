import React, { useState } from "react";
import { ROADMAP_GOALS, ROADMAP_TEMPLATES } from "../../constants/planner";
import styles from "./RoadmapGenerator.module.css";

const DAY_COLORS = {
  Monday:    "#3b82f6",
  Tuesday:   "#8b5cf6",
  Wednesday: "#06b6d4",
  Thursday:  "#10b981",
  Friday:    "#f59e0b",
  Saturday:  "#ef4444",
  Sunday:    "#ec4899",
};

const TAG_COLORS = {
  DSA:     "#3b82f6", Theory: "#8b5cf6", OS:    "#06b6d4",
  DBMS:    "#10b981", Java:   "#f59e0b", Spring:"#f97316",
  Design:  "#a855f7", Soft:   "#22c55e", Mock:  "#ef4444",
  Career:  "#ec4899", Review: "#94a3b8", CN:    "#0ea5e9",
  Applied: "#14b8a6", Practice:"#f59e0b",DI:   "#6366f1",
  Quant:   "#3b82f6", Logic:  "#8b5cf6", Verbal:"#10b981",
  Project: "#f97316",
};

export default function RoadmapGenerator() {
  const [goal,      setGoal]      = useState("dsa_placement");
  const [hoursDay,  setHoursDay]  = useState(2);
  const [generated, setGenerated] = useState(false);

  const roadmap = ROADMAP_TEMPLATES[goal] ?? [];
  const goalMeta = ROADMAP_GOALS.find((g) => g.id === goal);

  const generate = () => setGenerated(true);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>🗺️ Weekly Roadmap Generator</h2>
          <p className={styles.subtitle}>Auto-generate your personalized study plan</p>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label className={styles.controlLabel}>Preparation Goal</label>
          <div className={styles.goalGrid}>
            {ROADMAP_GOALS.map((g) => (
              <button
                key={g.id}
                className={`${styles.goalBtn} ${goal === g.id ? styles.goalActive : ""}`}
                onClick={() => { setGoal(g.id); setGenerated(false); }}
              >
                <span>{g.icon}</span>
                <span>{g.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.controlRow}>
          <div className={styles.controlGroup}>
            <label className={styles.controlLabel}>Study Hours / Day</label>
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

          <button className={styles.generateBtn} onClick={generate}>
            ⚡ Generate Roadmap
          </button>
        </div>
      </div>

      {/* Roadmap output */}
      {generated && (
        <div className={styles.roadmapSection}>
          <div className={styles.roadmapHeader}>
            <span className={styles.roadmapTitle}>
              {goalMeta?.icon} {goalMeta?.label} — {hoursDay}h/day
            </span>
            <span className={styles.roadmapWeek}>Week 1 Plan</span>
          </div>

          <div className={styles.roadmapGrid}>
            {roadmap.map((item, i) => {
              const dayColor = DAY_COLORS[item.day] ?? "#3b82f6";
              const tagColor = TAG_COLORS[item.tag] ?? "#94a3b8";
              return (
                <div key={i} className={styles.dayCard} style={{ "--day-color": dayColor }}>
                  <div className={styles.dayHeader}>
                    <span className={styles.dayName}>{item.day}</span>
                    <span className={styles.dayEst}>{item.est}</span>
                  </div>
                  <p className={styles.dayTopic}>{item.topic}</p>
                  <span className={styles.dayTag} style={{ color: tagColor, borderColor: `${tagColor}40`, background: `${tagColor}12` }}>
                    {item.tag}
                  </span>
                </div>
              );
            })}
          </div>

          <p className={styles.roadmapNote}>
            💡 Tip: Add these as tasks in your Daily Planner to track completion and earn XP.
          </p>
        </div>
      )}
    </div>
  );
}

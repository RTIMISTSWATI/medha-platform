import React from "react";
import { usePlanner } from "../hooks/usePlanner";
import StatsBar from "../components/planner/StatsBar";
import StreakPanel from "../components/planner/StreakPanel";
import TaskForm from "../components/planner/TaskForm";
import TaskList from "../components/planner/TaskList";
import RoadmapGenerator from "../components/planner/RoadmapGenerator";
import StudyHeatmap from "../components/planner/StudyHeatmap";
import styles from "./PlannerPage.module.css";

export default function PlannerPage() {
  const {
    filteredTasks, stats, xp, levelInfo, streak, heatmap,
    form, formOpen, filterTab,
    setFormOpen, setFilterTab,
    updateForm, submitTask,
    completeTask, uncompleteTask, deleteTask,
  } = usePlanner();

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>📅 Study Planner</h1>
          <p className={styles.subtitle}>Plan · Track · Achieve</p>
        </div>
        <button className={styles.addBtn} onClick={() => setFormOpen(true)}>
          ➕ Add Task
        </button>
      </header>

      {/* Stats bar */}
      <StatsBar stats={stats} />

      {/* Main grid */}
      <div className={styles.grid}>
        {/* Left column: Tasks + Roadmap */}
        <div className={styles.leftCol}>
          <TaskList
            tasks={filteredTasks}
            filterTab={filterTab}
            onFilterChange={setFilterTab}
            onComplete={completeTask}
            onUncomplete={uncompleteTask}
            onDelete={deleteTask}
          />
          <RoadmapGenerator />
        </div>

        {/* Right column: Streak + Heatmap */}
        <div className={styles.rightCol}>
          <StreakPanel xp={xp} levelInfo={levelInfo} streak={streak} />
          <StudyHeatmap heatmap={heatmap} />
        </div>
      </div>

      {/* Task form modal */}
      {formOpen && (
        <TaskForm
          form={form}
          onChange={updateForm}
          onSubmit={submitTask}
          onClose={() => setFormOpen(false)}
        />
      )}
    </div>
  );
}

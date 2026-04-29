import React from "react";
import { useDashboard } from "../hooks/useDashboard";
import OverviewCards    from "../components/dashboard/OverviewCards";
import ProgressCharts   from "../components/dashboard/ProgressCharts";
import SkillGapAnalyzer from "../components/dashboard/SkillGapAnalyzer";
import ResumeTracker    from "../components/dashboard/ResumeTracker";
import InterviewZone    from "../components/dashboard/InterviewZone";
import GamificationPanel from "../components/dashboard/GamificationPanel";
import styles from "./DashboardPage.module.css";

export default function DashboardPage() {
  const {
    stats, xp, levelInfo, streak, earnedBadges,
    targetRole, setTargetRole,
    currentSkills, setCurrentSkills,
    gapResult, analyzeSkillGap,
    resumeChecks, resumeScore, toggleResumeCheck,
    dsaProgress, updateDSA, totalDSASolved, totalDSAProblems,
    coreProgress, updateCore,
    hrProgress, toggleHR,
    mockDone, incrementMock,
  } = useDashboard();

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className={styles.page}>

      {/* ── Hero header ── */}
      <header className={styles.hero}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heroTitle}>
            {greeting()} 👋
          </h1>
          <p className={styles.heroSub}>
            Here's your preparation overview — stay consistent, level up every day.
          </p>
        </div>
        <div className={styles.heroBadge}>
          <span className={styles.heroBadgeIcon}>⚡</span>
          <div>
            <span className={styles.heroBadgeLevel}>Lv.{levelInfo.level} {levelInfo.title}</span>
            <span className={styles.heroBadgeXP}>{xp} XP · {streak.count}🔥 streak</span>
          </div>
        </div>
      </header>

      {/* ── Section A: Overview cards ── */}
      <section className={styles.section}>
        <OverviewCards stats={stats} />
      </section>

      {/* ── Section B: Charts ── */}
      <section className={styles.section}>
        <ProgressCharts stats={stats} />
      </section>

      {/* ── Section C + D: Skill Gap + Resume ── */}
      <section className={styles.twoCol}>
        <SkillGapAnalyzer
          targetRole={targetRole}
          setTargetRole={setTargetRole}
          currentSkills={currentSkills}
          setCurrentSkills={setCurrentSkills}
          gapResult={gapResult}
          onAnalyze={analyzeSkillGap}
        />
        <ResumeTracker
          resumeChecks={resumeChecks}
          resumeScore={resumeScore}
          onToggle={toggleResumeCheck}
        />
      </section>

      {/* ── Section E + F: Interview + Gamification ── */}
      <section className={styles.twoCol}>
        <InterviewZone
          dsaProgress={dsaProgress}
          onUpdateDSA={updateDSA}
          totalDSASolved={totalDSASolved}
          totalDSAProblems={totalDSAProblems}
          coreProgress={coreProgress}
          onUpdateCore={updateCore}
          hrProgress={hrProgress}
          onToggleHR={toggleHR}
          mockDone={mockDone}
          onIncrementMock={incrementMock}
        />
        <GamificationPanel
          xp={xp}
          levelInfo={levelInfo}
          streak={streak}
          earnedBadges={earnedBadges}
        />
      </section>

    </div>
  );
}

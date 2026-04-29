import { useState, useEffect, useCallback, useMemo } from "react";
import { dashboardService } from "../services/dashboardService";
import { LEVELS, XP_REWARDS } from "../constants/planner";
import { BADGES, ROLE_SKILLS, RESUME_CHECKLIST, DSA_TOPICS, CORE_SUBJECTS, HR_QUESTIONS } from "../constants/dashboard";

export function useDashboard() {
  const [stats,        setStats]        = useState(null);
  const [xp,           setXp]           = useState(0);
  const [streak,       setStreak]       = useState({ count: 0, lastDate: null });

  // Skill gap
  const [targetRole,   setTargetRole]   = useState("sde");
  const [currentSkills,setCurrentSkills]= useState("");
  const [gapResult,    setGapResult]    = useState(null);

  // Resume
  const [resumeChecks, setResumeChecks] = useState([]);

  // Interview
  const [dsaProgress,  setDsaProgress]  = useState({});
  const [coreProgress, setCoreProgress] = useState({});
  const [hrProgress,   setHrProgress]   = useState([]);
  const [mockDone,     setMockDone]     = useState(0);

  // ── Bootstrap ──────────────────────────────────────────────
  useEffect(() => {
    setStats(dashboardService.computeStats());
    setXp(dashboardService.getXP());
    setStreak(dashboardService.getStreak());
    setResumeChecks(dashboardService.getResumeChecks());
    setDsaProgress(dashboardService.getDSAProgress());
    setCoreProgress(dashboardService.getCoreProgress());
    setHrProgress(dashboardService.getHRProgress());
    setMockDone(dashboardService.getMockDone());
  }, []);

  // ── Level ──────────────────────────────────────────────────
  const levelInfo = useMemo(() => {
    return LEVELS.findLast((l) => xp >= l.minXP) ?? LEVELS[0];
  }, [xp]);

  // ── Badges ────────────────────────────────────────────────
  const earnedBadges = useMemo(() => {
    return BADGES.filter((b) => xp >= b.xpRequired);
  }, [xp]);

  // ── Skill gap analysis ────────────────────────────────────
  const analyzeSkillGap = useCallback(() => {
    const roleData = ROLE_SKILLS[targetRole];
    if (!roleData) return;

    const userSkills = currentSkills
      .split(/[,\n]+/)
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    const missing = roleData.required.filter(
      (s) => !userSkills.some((u) => s.toLowerCase().includes(u) || u.includes(s.toLowerCase()))
    );
    const matched = roleData.required.filter(
      (s) => userSkills.some((u) => s.toLowerCase().includes(u) || u.includes(s.toLowerCase()))
    );
    const readiness = Math.round((matched.length / roleData.required.length) * 100);

    setGapResult({ missing, matched, nice: roleData.nice, readiness });
  }, [targetRole, currentSkills]);

  // ── Resume score ──────────────────────────────────────────
  const resumeScore = useMemo(() => {
    if (resumeChecks.length === 0) return 0;
    return resumeChecks.reduce((acc, id) => {
      const item = RESUME_CHECKLIST.find((r) => r.id === id);
      return acc + (item?.weight ?? 0);
    }, 0);
  }, [resumeChecks]);

  const toggleResumeCheck = useCallback((id) => {
    setResumeChecks((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      dashboardService.saveResumeChecks(next);
      return next;
    });
  }, []);

  // ── DSA progress ──────────────────────────────────────────
  const updateDSA = useCallback((topicId, solved) => {
    setDsaProgress((prev) => {
      const next = { ...prev, [topicId]: Math.max(0, solved) };
      dashboardService.saveDSAProgress(next);
      return next;
    });
  }, []);

  const totalDSASolved = useMemo(() => {
    return DSA_TOPICS.reduce((acc, t) => acc + (dsaProgress[t.id] ?? 0), 0);
  }, [dsaProgress]);

  const totalDSAProblems = useMemo(() => {
    return DSA_TOPICS.reduce((acc, t) => acc + t.total, 0);
  }, []);

  // ── Core subjects ─────────────────────────────────────────
  const updateCore = useCallback((subjectId, chapters) => {
    setCoreProgress((prev) => {
      const next = { ...prev, [subjectId]: Math.max(0, chapters) };
      dashboardService.saveCoreProgress(next);
      return next;
    });
  }, []);

  // ── HR questions ──────────────────────────────────────────
  const toggleHR = useCallback((q) => {
    setHrProgress((prev) => {
      const next = prev.includes(q) ? prev.filter((x) => x !== q) : [...prev, q];
      dashboardService.saveHRProgress(next);
      return next;
    });
  }, []);

  // ── Mock interviews ───────────────────────────────────────
  const incrementMock = useCallback(() => {
    setMockDone((prev) => {
      const next = prev + 1;
      dashboardService.saveMockDone(next);
      return next;
    });
  }, []);

  return {
    stats, xp, levelInfo, streak, earnedBadges,
    targetRole, setTargetRole,
    currentSkills, setCurrentSkills,
    gapResult, analyzeSkillGap,
    resumeChecks, resumeScore, toggleResumeCheck,
    dsaProgress, updateDSA, totalDSASolved, totalDSAProblems,
    coreProgress, updateCore,
    hrProgress, toggleHR,
    mockDone, incrementMock,
  };
}

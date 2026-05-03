import { useState, useEffect, useCallback } from 'react';
import { dashboardService } from '../services/dashboardService';
import { BADGES, RESUME_CHECKLIST } from '../constants/dashboard'; // FIXED: LEVELS lives in planner
import { LEVELS } from '../constants/planner'; // FIXED

function safeLoad(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function useDashboard() {
  const [data, setData] = useState({
    studyHours: 0,
    completedTasks: 0,
    notesCount: 0,
    productivityScore: 0,
    weeklyData: [],   // ADDED: safe default
    streak: 0,        // ADDED: safe default
    totalTasks: 0,
    pendingTasks: 0,
    subjectMap: {},   // ADDED: safe default
  });

  // Load XP and streak from planner service
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState({ count: 0, lastDate: null });

  // Other dashboard state (keeping existing functionality)
  const [targetRole, setTargetRole] = useState('sde');
  const [currentSkills, setCurrentSkills] = useState('');
  const [gapResult, setGapResult] = useState(null);
  const [resumeChecks, setResumeChecks] = useState([]);
  const [dsaProgress, setDsaProgress] = useState({});
  const [coreProgress, setCoreProgress] = useState({});
  const [hrProgress, setHrProgress] = useState([]);
  const [mockDone, setMockDone] = useState(0);

  const refresh = useCallback(() => {
    const dashboardData = dashboardService.getDashboardData();
    setData(dashboardData);
    
    // Load planner data
    setXp(safeLoad('medha_planner_xp', 0));
    setStreak(safeLoad('medha_planner_streak', { count: 0, lastDate: null }));
    
    // Load other data
    setResumeChecks(safeLoad('medha_resume_checks', []));
    setDsaProgress(safeLoad('medha_dsa_progress', {}));
    setCoreProgress(safeLoad('medha_core_progress', {}));
    setHrProgress(safeLoad('medha_hr_progress', []));
    setMockDone(safeLoad('medha_mock_done', 0));
  }, []);

  // Load data on mount
  useEffect(() => {
    refresh();
  }, [refresh]);

  // Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      refresh();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refresh]);

  // FIXED: findLast fallback now includes minXP/maxXP so GamificationPanel never gets NaN
  const levelInfo = (Array.isArray(LEVELS) ? LEVELS : []).findLast?.(l => xp >= l.minXP)
    || { level: 1, title: 'Beginner', minXP: 0, maxXP: 100 };
  
  // Compute earned badges
  const earnedBadges = BADGES?.filter(b => xp >= b.xpRequired) || [];

  // FIXED: use actual RESUME_CHECKLIST weights instead of hardcoded 10
  const resumeScore = resumeChecks.reduce((acc, id) => {
    const item = (Array.isArray(RESUME_CHECKLIST) ? RESUME_CHECKLIST : []).find(r => r.id === id);
    return acc + (item?.weight ?? 0);
  }, 0);

  // DSA totals
  const totalDSASolved = Object.values(dsaProgress).reduce((acc, val) => acc + (val || 0), 0);
  const totalDSAProblems = 145; // Static total

  // Placeholder functions for existing functionality
  const analyzeSkillGap = useCallback(() => {
    // Existing skill gap logic would go here
  }, []);

  const toggleResumeCheck = useCallback((id) => {
    setResumeChecks(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('medha_resume_checks', JSON.stringify(next));
      return next;
    });
  }, []);

  const updateDSA = useCallback((topicId, solved) => {
    setDsaProgress(prev => {
      const next = { ...prev, [topicId]: Math.max(0, solved) };
      localStorage.setItem('medha_dsa_progress', JSON.stringify(next));
      return next;
    });
  }, []);

  const updateCore = useCallback((subjectId, chapters) => {
    setCoreProgress(prev => {
      const next = { ...prev, [subjectId]: Math.max(0, chapters) };
      localStorage.setItem('medha_core_progress', JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleHR = useCallback((q) => {
    setHrProgress(prev => {
      const next = prev.includes(q) ? prev.filter(x => x !== q) : [...prev, q];
      localStorage.setItem('medha_hr_progress', JSON.stringify(next));
      return next;
    });
  }, []);

  const incrementMock = useCallback(() => {
    setMockDone(prev => {
      const next = prev + 1;
      localStorage.setItem('medha_mock_done', JSON.stringify(next));
      return next;
    });
  }, []);

  return {
    stats: data,
    xp,
    levelInfo,
    streak,
    earnedBadges,
    targetRole,
    setTargetRole,
    currentSkills,
    setCurrentSkills,
    gapResult,
    analyzeSkillGap,
    resumeChecks,
    resumeScore,
    toggleResumeCheck,
    dsaProgress,
    updateDSA,
    totalDSASolved,
    totalDSAProblems,
    coreProgress,
    updateCore,
    hrProgress,
    toggleHR,
    mockDone,
    incrementMock,
    refresh
  };
}
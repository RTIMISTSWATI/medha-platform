import { useState, useEffect, useCallback, useMemo } from "react";
import { questionsService } from "../services/questionsService";
import { MOCK_PROBLEMS, DSA_TOPICS, CS_SUBJECTS, REVISION_INTERVALS } from "../constants/questions";

export function useQuestions() {
  const [solved,      setSolved]      = useState({});
  const [favorites,   setFavorites]   = useState([]);
  const [notes,       setNotes]       = useState({});
  const [revision,    setRevision]    = useState({});
  const [csProgress,  setCsProgress]  = useState({});

  // UI state
  const [activeTopic,   setActiveTopic]   = useState("all");
  const [activeSection, setActiveSection] = useState("dsa"); // dsa | cs | revision | today
  const [searchQuery,   setSearchQuery]   = useState("");
  const [diffFilter,    setDiffFilter]    = useState("all");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [noteModal,     setNoteModal]     = useState(null); // problem id
  const [noteText,      setNoteText]      = useState("");

  // ── Bootstrap ──────────────────────────────────────────────
  useEffect(() => {
    setSolved(questionsService.getSolved());
    setFavorites(questionsService.getFavorites());
    setNotes(questionsService.getNotes());
    setRevision(questionsService.getRevision());
    setCsProgress(questionsService.getCSProgress());
  }, []);

  // ── Derived: per-topic stats ───────────────────────────────
  const topicStats = useMemo(() => {
    const map = {};
    DSA_TOPICS.forEach((t) => {
      const all  = MOCK_PROBLEMS.filter((p) => p.topic === t.id);
      const done = all.filter((p) => solved[p.id]);
      map[t.id] = { total: all.length, solved: done.length };
    });
    return map;
  }, [solved]);

  // ── Derived: overall stats ─────────────────────────────────
  const overallStats = useMemo(() => {
    const totalSolved   = Object.keys(solved).length;
    const totalProblems = MOCK_PROBLEMS.length;
    const accuracy      = totalProblems > 0 ? Math.round((totalSolved / totalProblems) * 100) : 0;

    const weakTopics = DSA_TOPICS.filter((t) => {
      const s = topicStats[t.id];
      return s.total > 0 && (s.solved / s.total) < 0.4;
    }).map((t) => t.id);

    const strongTopics = DSA_TOPICS.filter((t) => {
      const s = topicStats[t.id];
      return s.total > 0 && (s.solved / s.total) >= 0.7;
    }).map((t) => t.id);

    const dueRevisions = questionsService.getDueRevisions();

    const readinessScore = Math.min(100, Math.round(
      (totalSolved / totalProblems) * 60 +
      (strongTopics.length / DSA_TOPICS.length) * 40
    ));

    return { totalSolved, totalProblems, accuracy, weakTopics, strongTopics, dueRevisions, readinessScore };
  }, [solved, topicStats]);

  // ── Derived: filtered problems ─────────────────────────────
  const filteredProblems = useMemo(() => {
    let list = activeTopic === "all"
      ? MOCK_PROBLEMS
      : MOCK_PROBLEMS.filter((p) => p.topic === activeTopic);

    if (diffFilter !== "all")
      list = list.filter((p) => p.difficulty === diffFilter);

    if (companyFilter !== "all")
      list = list.filter((p) => p.companies.includes(companyFilter));

    if (searchQuery.trim())
      list = list.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return list;
  }, [activeTopic, diffFilter, companyFilter, searchQuery]);

  // ── Derived: revision queue ────────────────────────────────
  const revisionQueue = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return MOCK_PROBLEMS.filter((p) => revision[p.id] && revision[p.id] <= today);
  }, [revision]);

  // ── Derived: today's recommendations ──────────────────────
  const todayRecommendations = useMemo(() => {
    const recs = [];

    // 1. Due revisions first
    revisionQueue.slice(0, 3).forEach((p) =>
      recs.push({ ...p, reason: "📅 Revision due today", priority: 4 })
    );

    // 2. Weak topic unsolved problems
    overallStats.weakTopics.forEach((topicId) => {
      const unsolved = MOCK_PROBLEMS.filter(
        (p) => p.topic === topicId && !solved[p.id]
      ).slice(0, 2);
      unsolved.forEach((p) =>
        recs.push({ ...p, reason: `⚠️ Weak topic: ${DSA_TOPICS.find((t) => t.id === topicId)?.label}`, priority: 3 })
      );
    });

    // 3. Never attempted easy problems
    const easyUnsolved = MOCK_PROBLEMS.filter(
      (p) => p.difficulty === "easy" && !solved[p.id]
    ).slice(0, 3);
    easyUnsolved.forEach((p) =>
      recs.push({ ...p, reason: "🟢 Easy — build momentum", priority: 2 })
    );

    // 4. High-frequency company problems
    const highFreq = MOCK_PROBLEMS.filter(
      (p) => p.companies.length >= 3 && !solved[p.id]
    ).slice(0, 2);
    highFreq.forEach((p) =>
      recs.push({ ...p, reason: "🏢 Asked by 3+ companies", priority: 2 })
    );

    // Deduplicate by id, sort by priority, take top 8
    const seen = new Set();
    return recs
      .filter((p) => { if (seen.has(p.id)) return false; seen.add(p.id); return true; })
      .sort((a, b) => b.priority - a.priority)
      .slice(0, 8);
  }, [revisionQueue, overallStats.weakTopics, solved]);

  // ── Actions ────────────────────────────────────────────────
  const toggleSolved = useCallback((id) => {
    if (solved[id]) {
      const next = questionsService.unmarkSolved(id);
      setSolved(next);
    } else {
      const next = questionsService.markSolved(id);
      setSolved(next);
      // Auto-schedule revision in 3 days
      const rev = questionsService.scheduleRevision(id, 3);
      setRevision(rev);
    }
  }, [solved]);

  const toggleFavorite = useCallback((id) => {
    const next = questionsService.toggleFavorite(id);
    setFavorites(next);
  }, []);

  const openNoteModal = useCallback((id) => {
    setNoteModal(id);
    setNoteText(notes[id] ?? "");
  }, [notes]);

  const saveNote = useCallback(() => {
    if (!noteModal) return;
    const next = questionsService.saveNote(noteModal, noteText);
    setNotes(next);
    setNoteModal(null);
  }, [noteModal, noteText]);

  const updateCSProgress = useCallback((id, val) => {
    const next = questionsService.updateCSProgress(id, val);
    setCsProgress(next);
  }, []);

  return {
    // data
    solved, favorites, notes, revision, csProgress,
    // ui
    activeTopic, setActiveTopic,
    activeSection, setActiveSection,
    searchQuery, setSearchQuery,
    diffFilter, setDiffFilter,
    companyFilter, setCompanyFilter,
    noteModal, noteText, setNoteText, openNoteModal, saveNote,
    // derived
    topicStats, overallStats, filteredProblems, revisionQueue, todayRecommendations,
    // actions
    toggleSolved, toggleFavorite, updateCSProgress,
  };
}

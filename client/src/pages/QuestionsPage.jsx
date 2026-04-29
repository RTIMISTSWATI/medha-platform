import React from "react";
import { useQuestions } from "../hooks/useQuestions";
import QZSidebar      from "../components/questions/QZSidebar";
import PrepStats      from "../components/questions/PrepStats";
import ProblemList    from "../components/questions/ProblemList";
import CSSubjectPanel from "../components/questions/CSSubjectPanel";
import RevisionQueue  from "../components/questions/RevisionQueue";
import TodayFlow      from "../components/questions/TodayFlow";
import NoteModal      from "../components/questions/NoteModal";
import styles from "./QuestionsPage.module.css";

export default function QuestionsPage() {
  const {
    solved, favorites, notes, revision, csProgress,
    activeTopic, setActiveTopic,
    activeSection, setActiveSection,
    searchQuery, setSearchQuery,
    diffFilter, setDiffFilter,
    companyFilter, setCompanyFilter,
    noteModal, noteText, setNoteText, openNoteModal, saveNote,
    topicStats, overallStats, filteredProblems, revisionQueue, todayRecommendations,
    toggleSolved, toggleFavorite, updateCSProgress,
  } = useQuestions();

  return (
    <div className={styles.page}>
      {/* Sidebar */}
      <QZSidebar
        activeSection={activeSection}
        setActiveSection={(s) => { setActiveSection(s); setActiveTopic("all"); }}
        activeTopic={activeTopic}
        setActiveTopic={setActiveTopic}
        topicStats={topicStats}
        revisionCount={revisionQueue.length}
      />

      {/* Main content */}
      <div className={styles.main}>
        {/* Stats strip — always visible, never scrolls */}
        <div className={styles.statsStrip}>
          <PrepStats stats={overallStats} />
        </div>

        {/* Scrollable section content */}
        <div className={styles.content}>
          {activeSection === "dsa" && (
            <ProblemList
              problems={filteredProblems}
              solved={solved} favorites={favorites}
              notes={notes} revision={revision}
              searchQuery={searchQuery} setSearchQuery={setSearchQuery}
              diffFilter={diffFilter} setDiffFilter={setDiffFilter}
              companyFilter={companyFilter} setCompanyFilter={setCompanyFilter}
              onToggleSolved={toggleSolved}
              onToggleFavorite={toggleFavorite}
              onOpenNote={openNoteModal}
            />
          )}

          {activeSection === "cs" && (
            <CSSubjectPanel
              csProgress={csProgress}
              onUpdateProgress={updateCSProgress}
            />
          )}

          {activeSection === "revision" && (
            <RevisionQueue
              revisionQueue={revisionQueue}
              solved={solved} favorites={favorites}
              notes={notes} revision={revision}
              topicStats={topicStats}
              onToggleSolved={toggleSolved}
              onToggleFavorite={toggleFavorite}
              onOpenNote={openNoteModal}
            />
          )}

          {activeSection === "today" && (
            <TodayFlow
              recommendations={todayRecommendations}
              solved={solved} favorites={favorites}
              notes={notes} revision={revision}
              overallStats={overallStats}
              onToggleSolved={toggleSolved}
              onToggleFavorite={toggleFavorite}
              onOpenNote={openNoteModal}
            />
          )}
        </div>
      </div>

      {/* Note modal */}
      {noteModal && (
        <NoteModal
          problemId={noteModal}
          noteText={noteText}
          onChange={setNoteText}
          onSave={saveNote}
          onClose={() => { saveNote(); }}
        />
      )}
    </div>
  );
}

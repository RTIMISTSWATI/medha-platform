import React, { useState } from "react";
import { aiService } from "../../services/aiService";
import styles from "./AINotesAssistant.module.css";

const ACTIONS = [
  { id: "summary",    label: "Summarize",   icon: "✦", desc: "Condense into key ideas" },
  { id: "keypoints",  label: "Key Points",  icon: "◈", desc: "Extract bullet points"   },
  { id: "flashcards", label: "Flashcards",  icon: "⟐", desc: "Generate Q&A cards"      },
];

export default function AINotesAssistant({ content }) {
  const [activeTab, setActiveTab]   = useState(null);   // "summary" | "keypoints" | "flashcards"
  const [loading,   setLoading]     = useState(null);   // which action is loading
  const [results,   setResults]     = useState({});     // cached results per tab
  const [flipped,   setFlipped]     = useState({});     // flashcard flip state

  const hasContent = content && content.replace(/<[^>]+>/g, "").trim().length > 10;

  async function run(id) {
    if (loading) return;
    // If already cached, just switch tab
    if (results[id] !== undefined) { setActiveTab(id); return; }

    setLoading(id);
    setActiveTab(id);
    try {
      let data;
      if (id === "summary")    data = await aiService.summarizeText(content);
      if (id === "keypoints")  data = await aiService.generateKeyPoints(content);
      if (id === "flashcards") data = await aiService.generateFlashcards(content);
      setResults((p) => ({ ...p, [id]: data }));
    } finally {
      setLoading(null);
    }
  }

  function toggleFlip(i) {
    setFlipped((p) => ({ ...p, [i]: !p[i] }));
  }

  function close() {
    setActiveTab(null);
  }

  return (
    <div className={styles.wrap}>
      {/* ── Toolbar ── */}
      <div className={styles.toolbar}>
        <span className={styles.toolbarLabel}>
          <span className={styles.aiBadge}>AI</span>
          Assistant
        </span>

        <div className={styles.actions}>
          {ACTIONS.map((a) => (
            <button
              key={a.id}
              className={`${styles.actionBtn} ${activeTab === a.id ? styles.actionActive : ""}`}
              onClick={() => run(a.id)}
              disabled={!hasContent || loading === a.id}
              title={a.desc}
            >
              {loading === a.id
                ? <span className={styles.spinner} />
                : <span className={styles.actionIcon}>{a.icon}</span>
              }
              {a.label}
            </button>
          ))}
        </div>

        {!hasContent && (
          <span className={styles.emptyHint}>Write some notes first</span>
        )}
      </div>

      {/* ── Output panel ── */}
      {activeTab && (
        <div className={styles.panel}>
          {/* Panel header */}
          <div className={styles.panelHeader}>
            <div className={styles.panelTabs}>
              {ACTIONS.map((a) => (
                <button
                  key={a.id}
                  className={`${styles.tab} ${activeTab === a.id ? styles.tabActive : ""}`}
                  onClick={() => results[a.id] !== undefined && setActiveTab(a.id)}
                  disabled={results[a.id] === undefined && loading !== a.id}
                >
                  {a.icon} {a.label}
                  {results[a.id] !== undefined && (
                    <span className={styles.tabDot} />
                  )}
                </button>
              ))}
            </div>
            <button className={styles.closeBtn} onClick={close} title="Close">✕</button>
          </div>

          {/* Panel body */}
          <div className={styles.panelBody}>

            {/* Loading state */}
            {loading === activeTab && (
              <div className={styles.loadingState}>
                <span className={styles.spinnerLg} />
                <p className={styles.loadingText}>
                  {activeTab === "summary"    && "Summarizing your notes…"}
                  {activeTab === "keypoints"  && "Extracting key points…"}
                  {activeTab === "flashcards" && "Generating flashcards…"}
                </p>
              </div>
            )}

            {/* Summary */}
            {activeTab === "summary" && results.summary !== undefined && (
              <div className={styles.summaryResult}>
                <p className={styles.summaryText}>{results.summary}</p>
              </div>
            )}

            {/* Key Points */}
            {activeTab === "keypoints" && results.keypoints !== undefined && (
              <ul className={styles.keyList}>
                {results.keypoints.map((pt, i) => (
                  <li key={i} className={styles.keyItem}>
                    <span className={styles.keyDot} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Flashcards */}
            {activeTab === "flashcards" && results.flashcards !== undefined && (
              <div className={styles.cardGrid}>
                {results.flashcards.map((card, i) => (
                  <div
                    key={i}
                    className={`${styles.card} ${flipped[i] ? styles.cardFlipped : ""}`}
                    onClick={() => toggleFlip(i)}
                  >
                    <div className={styles.cardInner}>
                      <div className={styles.cardFront}>
                        <span className={styles.cardSide}>Q</span>
                        <p className={styles.cardText}>{card.q}</p>
                        <span className={styles.cardHint}>tap to reveal</span>
                      </div>
                      <div className={styles.cardBack}>
                        <span className={styles.cardSide}>A</span>
                        <p className={styles.cardText}>{card.a}</p>
                        <span className={styles.cardHint}>tap to flip back</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

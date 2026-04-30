import React, { useState } from "react";
import { aiCodeService } from "../../services/aiService";
import styles from "./AICodeAssistant.module.css";

const ACTIONS = [
  { id: "explain",  label: "Explain Code",  icon: "◎", desc: "Understand what this code does"   },
  { id: "improve",  label: "Improve Code",  icon: "⬆", desc: "Get optimization suggestions"     },
  { id: "issues",   label: "Detect Issues", icon: "⚑", desc: "Find bugs and bad practices"      },
];

const SEVERITY_META = {
  error:   { color: "#f87171", label: "Error",   dot: "●" },
  warning: { color: "#fbbf24", label: "Warning", dot: "●" },
  info:    { color: "#60a5fa", label: "Info",    dot: "●" },
};

const IMPROVE_COLORS = {
  style:         "#a78bfa",
  readability:   "#34d399",
  structure:     "#60a5fa",
  "best-practice": "#fbbf24",
};

export default function AICodeAssistant({ code }) {
  const [activeTab, setActiveTab] = useState(null);
  const [loading,   setLoading]   = useState(null);
  const [results,   setResults]   = useState({});
  const [open,      setOpen]      = useState(false);

  const hasCode = code && code.trim().length > 5;

  async function run(id) {
    if (loading) return;
    setOpen(true);
    setActiveTab(id);
    if (results[id] !== undefined) return;

    setLoading(id);
    try {
      let data;
      if (id === "explain") data = await aiCodeService.explainCode(code);
      if (id === "improve") data = await aiCodeService.improveCode(code);
      if (id === "issues")  data = await aiCodeService.detectIssues(code);
      setResults((p) => ({ ...p, [id]: data }));
    } finally {
      setLoading(null);
    }
  }

  function close() { setOpen(false); setActiveTab(null); }

  const issueCount = results.issues?.length ?? 0;
  const errorCount = results.issues?.filter((i) => i.severity === "error").length ?? 0;

  return (
    <div className={styles.wrap}>
      {/* ── AI Toolbar strip ── */}
      <div className={styles.toolbar}>
        <span className={styles.toolbarLabel}>
          <span className={styles.aiBadge}>AI</span>
          Code Assistant
        </span>

        <div className={styles.actions}>
          {ACTIONS.map((a) => (
            <button
              key={a.id}
              className={`${styles.actionBtn} ${activeTab === a.id && open ? styles.actionActive : ""}`}
              onClick={() => run(a.id)}
              disabled={!hasCode || loading === a.id}
              title={a.desc}
            >
              {loading === a.id
                ? <span className={styles.spinner} />
                : <span className={styles.actionIcon}>{a.icon}</span>
              }
              {a.label}
              {/* Issue badge */}
              {a.id === "issues" && errorCount > 0 && (
                <span className={styles.errorBadge}>{errorCount}</span>
              )}
            </button>
          ))}
        </div>

        {open && (
          <button className={styles.closeBtn} onClick={close} title="Close panel">✕</button>
        )}
      </div>

      {/* ── Output panel ── */}
      {open && activeTab && (
        <div className={styles.panel}>
          {/* Tabs */}
          <div className={styles.panelTabs}>
            {ACTIONS.map((a) => (
              <button
                key={a.id}
                className={`${styles.tab} ${activeTab === a.id ? styles.tabActive : ""}`}
                onClick={() => { setActiveTab(a.id); if (results[a.id] === undefined) run(a.id); }}
              >
                {a.icon} {a.label}
                {results[a.id] !== undefined && <span className={styles.tabDot} />}
              </button>
            ))}
          </div>

          {/* Body */}
          <div className={styles.panelBody}>

            {/* Loading */}
            {loading === activeTab && (
              <div className={styles.loadingState}>
                <span className={styles.spinnerLg} />
                <p className={styles.loadingText}>
                  {activeTab === "explain" && "Reading your code…"}
                  {activeTab === "improve" && "Analyzing for improvements…"}
                  {activeTab === "issues"  && "Scanning for issues…"}
                </p>
              </div>
            )}

            {/* Explain */}
            {activeTab === "explain" && results.explain !== undefined && (
              <div className={styles.explainResult}>
                <div className={styles.explainIcon}>◎</div>
                <p className={styles.explainText}>{results.explain}</p>
              </div>
            )}

            {/* Improve */}
            {activeTab === "improve" && results.improve !== undefined && (
              <div className={styles.improveList}>
                {results.improve.map((s, i) => {
                  const color = IMPROVE_COLORS[s.type] ?? "#94a3b8";
                  return (
                    <div key={i} className={styles.improveItem} style={{ "--c": color }}>
                      <span className={styles.improveType}>{s.type}</span>
                      <p className={styles.improveText}>{s.text}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Issues */}
            {activeTab === "issues" && results.issues !== undefined && (
              <div className={styles.issuesList}>
                {results.issues.length === 0 ? (
                  <div className={styles.noIssues}>
                    <span className={styles.noIssuesIcon}>✓</span>
                    <p>No issues detected. Code looks clean!</p>
                  </div>
                ) : (
                  <>
                    <div className={styles.issueSummary}>
                      {["error", "warning", "info"].map((sev) => {
                        const count = results.issues.filter((i) => i.severity === sev).length;
                        if (!count) return null;
                        const m = SEVERITY_META[sev];
                        return (
                          <span key={sev} className={styles.issuePill} style={{ "--c": m.color }}>
                            {m.dot} {count} {m.label}{count > 1 ? "s" : ""}
                          </span>
                        );
                      })}
                    </div>
                    {results.issues.map((issue, i) => {
                      const m = SEVERITY_META[issue.severity] ?? SEVERITY_META.info;
                      return (
                        <div key={i} className={styles.issueItem} style={{ "--c": m.color }}>
                          <div className={styles.issueLeft}>
                            <span className={styles.issueSev} style={{ color: m.color }}>{m.dot}</span>
                            {issue.line && (
                              <span className={styles.issueLine}>L{issue.line}</span>
                            )}
                          </div>
                          <p className={styles.issueMsg}>{issue.message}</p>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

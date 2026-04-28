import React from "react";
import Editor from "@monaco-editor/react";
import { useCodeEditor } from "../hooks/useCodeEditor";
import styles from "./CodeEditor.module.css";

const LANGUAGES = [
  { value: "python", label: "Python 3" },
];

export default function CodeEditor() {
  const {
    language, code, customInput, output, isError, isRunning,
    setCode, setCustomInput,
    handleLanguageChange, runCode,
  } = useCodeEditor();

  return (
    <div className={styles.container}>
      {/* ── Toolbar ── */}
      <div className={styles.toolbar}>
        <select
          className={styles.select}
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
        >
          {LANGUAGES.map((l) => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>

        <button
          className={`${styles.runBtn} ${isRunning ? styles.running : ""}`}
          onClick={runCode}
          disabled={isRunning}
        >
          {isRunning ? "▶ Running…" : "▶ Run Code"}
        </button>
      </div>

      {/* ── Editor + I/O panel ── */}
      <div className={styles.workspace}>
        {/* Monaco Editor */}
        <div className={styles.editorPane}>
          <Editor
            height="100%"
            language={language}
            value={code}
            theme="vs-dark"
            onChange={(val) => setCode(val ?? "")}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              lineNumbers: "on",
              renderLineHighlight: "line",
              tabSize: 4,
            }}
          />
        </div>

        {/* Input / Output */}
        <div className={styles.ioPane}>
          <div className={styles.ioSection}>
            <label className={styles.ioLabel}>Custom Input</label>
            <textarea
              className={styles.inputArea}
              placeholder="stdin — leave empty if not needed"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              spellCheck={false}
            />
          </div>

          <div className={styles.ioSection}>
            <label className={`${styles.ioLabel} ${isError ? styles.labelError : ""}`}>
              {isError ? "Error" : "Output"}
            </label>
            <pre className={`${styles.outputArea} ${isError ? styles.outputError : ""}`}>
              {output || <span className={styles.placeholder}>Output will appear here…</span>}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

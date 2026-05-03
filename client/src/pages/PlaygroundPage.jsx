// UPDATED
import React, { useState, useMemo, useEffect, useRef } from "react"; // ADDED useEffect, useRef
import Editor from "@monaco-editor/react";
import { useCodeEditor } from "../hooks/useCodeEditor";
import AICodeAssistant from "../components/ai/AICodeAssistant";
import styles from "./PlaygroundPage.module.css";

// ── Problems data (unchanged) ─────────────────────────────────
const PROBLEMS = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    tag: "Arrays",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6",     output: "[1,2]" },
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "Only one valid answer exists."],
    starterCode: `# Two Sum\ndef two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        diff = target - n\n        if diff in seen:\n            return [seen[diff], i]\n        seen[n] = i\n    return []\n\nprint(two_sum([2, 7, 11, 15], 9))\n`,
  },
  {
    id: 2,
    title: "Reverse a String",
    difficulty: "Easy",
    tag: "Strings",
    description: `Write a function that reverses a string. The input string is given as an array of characters s.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.`,
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁵", "s[i] is a printable ASCII character."],
    starterCode: `# Reverse a String\ndef reverse_string(s):\n    left, right = 0, len(s) - 1\n    while left < right:\n        s[left], s[right] = s[right], s[left]\n        left += 1\n        right -= 1\n    return s\n\nprint(reverse_string(["h","e","l","l","o"]))\n`,
  },
  {
    id: 3,
    title: "FizzBuzz",
    difficulty: "Easy",
    tag: "Math",
    description: `Given an integer n, return a string array answer where:\n\n• answer[i] == "FizzBuzz" if i is divisible by 3 and 5.\n• answer[i] == "Fizz" if i is divisible by 3.\n• answer[i] == "Buzz" if i is divisible by 5.\n• answer[i] == i (as a string) otherwise.`,
    examples: [
      { input: "n = 3",  output: '["1","2","Fizz"]' },
      { input: "n = 15", output: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]' },
    ],
    constraints: ["1 ≤ n ≤ 10⁴"],
    starterCode: `# FizzBuzz\ndef fizz_buzz(n):\n    result = []\n    for i in range(1, n + 1):\n        if i % 15 == 0:\n            result.append("FizzBuzz")\n        elif i % 3 == 0:\n            result.append("Fizz")\n        elif i % 5 == 0:\n            result.append("Buzz")\n        else:\n            result.append(str(i))\n    return result\n\nprint(fizz_buzz(15))\n`,
  },
];

// UPDATED: richer difficulty color map
const DIFF_COLOR = { Easy: "#6aaf8a", Medium: "#e6c48a", Hard: "#e07070" };

// ── Left panel — problem sidebar ──────────────────────────────
function ProblemPanel({ problem, activeProblem, onSelect, problems }) {
  const [tab, setTab] = useState("description");

  return (
    <div className={styles.panel}>

      {/* UPDATED: sidebar header */}
      <div className={styles.sidebarHeader}>
        <span className={styles.sidebarTitle}>Problems</span>
      </div>

      {/* ADDED: problem list (replaces dropdown) */}
      <div className={styles.problemList}>
        {problems.map((p) => (
          <button
            key={p.id}
            className={`${styles.problemItem} ${activeProblem.id === p.id ? styles.problemItemActive : ""}`}
            onClick={() => onSelect(p)}
          >
            <span className={styles.problemItemNum}>{p.id}.</span>
            <span className={styles.problemItemTitle}>{p.title}</span>
            <span className={styles.diffBadge} style={{ color: DIFF_COLOR[p.difficulty] }}>
              {p.difficulty}
            </span>
          </button>
        ))}
      </div>

      {/* Active problem detail */}
      <div className={styles.problemMeta}>
        <h2 className={styles.problemTitle}>{problem.title}</h2>
        <div className={styles.problemTags}>
          <span className={styles.diffBadge} style={{ color: DIFF_COLOR[problem.difficulty] }}>
            {problem.difficulty}
          </span>
          <span className={styles.tagBadge}>{problem.tag}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {["description", "examples", "constraints"].map((t) => (
          <button
            key={t}
            className={`${styles.tabBtn} ${tab === t ? styles.tabActive : ""}`}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className={styles.tabContent}>
        {tab === "description" && (
          <p className={styles.description}>{problem.description}</p>
        )}
        {tab === "examples" && (
          <div className={styles.examples}>
            {problem.examples.map((ex, i) => (
              <div key={i} className={styles.example}>
                <span className={styles.exLabel}>Example {i + 1}</span>
                <div className={styles.exRow}>
                  <span className={styles.exKey}>Input:</span>
                  <code className={styles.exVal}>{ex.input}</code>
                </div>
                <div className={styles.exRow}>
                  <span className={styles.exKey}>Output:</span>
                  <code className={styles.exVal}>{ex.output}</code>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "constraints" && (
          <ul className={styles.constraints}>
            {problem.constraints.map((c, i) => (
              <li key={i} className={styles.constraint}>{c}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ── Main PlaygroundPage ───────────────────────────────────────
export default function PlaygroundPage() {
  const [activeProblem, setActiveProblem] = useState(PROBLEMS[0]);

  // ADDED: ref for the workspace element — avoids re-renders on mouse move
  const workspaceRef = useRef(null);

  // ADDED: mouse-follow glow via CSS custom properties — zero re-renders
  useEffect(() => {
    const el = workspaceRef.current;
    if (!el) return;
    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    };
    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ADDED: execution time tracking for output card
  const [execTime, setExecTime] = useState(null);
  const [startTime, setStartTime] = useState(null);

  const {
    language, code, customInput, output, isError, isRunning,
    setCode, setCustomInput,
    handleLanguageChange, runCode,
  } = useCodeEditor();

  const handleProblemSelect = (problem) => {
    setActiveProblem(problem);
    setCode(problem.starterCode);
    setExecTime(null);
  };

  // ADDED: wrap runCode to measure execution time
  const handleRun = async () => {
    const t0 = performance.now();
    setStartTime(t0);
    setExecTime(null);
    await runCode();
    setExecTime(Math.round(performance.now() - t0));
  };

  // ADDED: derive output status
  const outputStatus = useMemo(() => {
    if (!output && execTime === null) return "idle";
    return isError ? "error" : "accepted";
  }, [output, isError, execTime]);

  const statusLabel = { idle: "—", accepted: "Accepted", error: "Error" }[outputStatus];
  const statusClass = {
    idle:     styles.statusIdle,
    accepted: styles.statusAccepted,
    error:    styles.statusError,
  }[outputStatus];

  return (
    <div className={styles.workspace} ref={workspaceRef}>

      {/* ── Left: Problem sidebar ── */}
      <ProblemPanel
        problem={activeProblem}
        activeProblem={activeProblem}
        problems={PROBLEMS}
        onSelect={handleProblemSelect}
      />

      {/* ── Center: Code editor ── */}
      <div className={styles.panel}>
        {/* UPDATED: richer toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <span className={styles.langLabel}>🐍 Python 3</span>
            <span className={styles.editorTitle}>{activeProblem.title}</span>
          </div>
          <button
            className={`${styles.runBtn} ${isRunning ? styles.running : ""}`}
            onClick={handleRun}
            disabled={isRunning}
          >
            {isRunning ? "▶ Running…" : "▶ Run Code"}
          </button>
        </div>

        {/* Monaco editor */}
        <div className={styles.editorWrap}>
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
              fontFamily: "JetBrains Mono, Fira Code, monospace",
            }}
          />
        </div>

        {/* AI assistant */}
        <AICodeAssistant code={code} />
      </div>

      {/* ── Right: Output panel ── */}
      <div className={styles.panel}>

        {/* ADDED: output header with status badge */}
        <div className={styles.outputHeader}>
          <span className={styles.outputHeaderTitle}>Output</span>
          <span className={`${styles.statusBadge} ${statusClass}`}>{statusLabel}</span>
        </div>

        {/* ADDED: runtime / memory stats */}
        <div className={styles.outputMeta}>
          <div className={styles.metaStat}>
            <span className={styles.metaStatLabel}>Runtime</span>
            <span className={styles.metaStatValue}>
              {execTime !== null ? `${execTime} ms` : "—"}
            </span>
          </div>
          <div className={styles.metaStat}>
            <span className={styles.metaStatLabel}>Language</span>
            <span className={styles.metaStatValue}>Python 3</span>
          </div>
        </div>

        {/* Custom input */}
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

        {/* Output */}
        <div className={styles.ioSection}>
          <label className={`${styles.ioLabel} ${isError ? styles.labelError : ""}`}>
            {isError ? "⚠ Error" : "✓ Output"}
          </label>
          <pre className={`${styles.outputArea} ${isError ? styles.outputError : ""}`}>
            {output || <span className={styles.placeholder}>Run your code to see output…</span>}
          </pre>
        </div>

      </div>
    </div>
  );
}

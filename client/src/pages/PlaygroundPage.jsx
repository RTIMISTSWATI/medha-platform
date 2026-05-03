// ADDED
import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { useCodeEditor } from "../hooks/useCodeEditor";
import AICodeAssistant from "../components/ai/AICodeAssistant";
import styles from "./PlaygroundPage.module.css";

// ── Sample problems ───────────────────────────────────────────
const PROBLEMS = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    tag: "Arrays",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
      { input: "nums = [3,2,4], target = 6",     output: "[1,2]" },
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "Only one valid answer exists."],
    starterCode: `# Two Sum
def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        diff = target - n
        if diff in seen:
            return [seen[diff], i]
        seen[n] = i
    return []

print(two_sum([2, 7, 11, 15], 9))
`,
  },
  {
    id: 2,
    title: "Reverse a String",
    difficulty: "Easy",
    tag: "Strings",
    description: `Write a function that reverses a string. The input string is given as an array of characters s.

You must do this by modifying the input array in-place with O(1) extra memory.`,
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]' },
    ],
    constraints: ["1 ≤ s.length ≤ 10⁵", "s[i] is a printable ASCII character."],
    starterCode: `# Reverse a String
def reverse_string(s):
    left, right = 0, len(s) - 1
    while left < right:
        s[left], s[right] = s[right], s[left]
        left += 1
        right -= 1
    return s

print(reverse_string(["h","e","l","l","o"]))
`,
  },
  {
    id: 3,
    title: "FizzBuzz",
    difficulty: "Easy",
    tag: "Math",
    description: `Given an integer n, return a string array answer where:

• answer[i] == "FizzBuzz" if i is divisible by 3 and 5.
• answer[i] == "Fizz" if i is divisible by 3.
• answer[i] == "Buzz" if i is divisible by 5.
• answer[i] == i (as a string) otherwise.`,
    examples: [
      { input: "n = 3",  output: '["1","2","Fizz"]' },
      { input: "n = 15", output: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]' },
    ],
    constraints: ["1 ≤ n ≤ 10⁴"],
    starterCode: `# FizzBuzz
def fizz_buzz(n):
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(str(i))
    return result

print(fizz_buzz(15))
`,
  },
];

const DIFF_COLOR = { Easy: "#4d8b6a", Medium: "#c2a878", Hard: "#e07070" };

// ── Left panel — problem description ─────────────────────────
function ProblemPanel({ problem, onSelect, problems }) {
  const [tab, setTab] = useState("description");

  return (
    <div className={styles.panel}>
      {/* Problem selector */}
      <div className={styles.problemSelector}>
        <select
          className={styles.problemSelect}
          value={problem.id}
          onChange={(e) => {
            const p = problems.find((x) => x.id === Number(e.target.value));
            if (p) onSelect(p);
          }}
        >
          {problems.map((p) => (
            <option key={p.id} value={p.id}>{p.id}. {p.title}</option>
          ))}
        </select>
      </div>

      {/* Title + meta */}
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
                <div className={styles.exRow}><span className={styles.exKey}>Input:</span><code className={styles.exVal}>{ex.input}</code></div>
                <div className={styles.exRow}><span className={styles.exKey}>Output:</span><code className={styles.exVal}>{ex.output}</code></div>
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

  const {
    language, code, customInput, output, isError, isRunning,
    setCode, setCustomInput,
    handleLanguageChange, runCode,
  } = useCodeEditor();

  // Load starter code when problem changes
  const handleProblemSelect = (problem) => {
    setActiveProblem(problem);
    setCode(problem.starterCode);
  };

  return (
    <div className={styles.workspace}>

      {/* ── Left: Problem description ── */}
      <ProblemPanel
        problem={activeProblem}
        problems={PROBLEMS}
        onSelect={handleProblemSelect}
      />

      {/* ── Center: Code editor ── */}
      <div className={styles.panel}>
        {/* Toolbar */}
        <div className={styles.toolbar}>
          <span className={styles.langLabel}>🐍 Python 3</span>
          <button
            className={`${styles.runBtn} ${isRunning ? styles.running : ""}`}
            onClick={runCode}
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
              fontFamily: "var(--font-mono)",
            }}
          />
        </div>

        {/* AI assistant */}
        <AICodeAssistant code={code} />
      </div>

      {/* ── Right: Input + Output ── */}
      <div className={styles.panel}>
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

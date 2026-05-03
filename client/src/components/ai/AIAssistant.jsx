import React, { useState, useRef, useEffect } from "react";
import { aiCodeService } from "../../services/aiService";
import styles from "./AIAssistant.module.css";

// ── Contextual mock responses for free-form questions ─────────
function getMockAnswer(question, code) {
  const q = question.toLowerCase();

  if (q.includes("time complexity") || q.includes("big o"))
    return "Time complexity depends on your algorithm. For nested loops over n elements it's typically O(n²). Binary search is O(log n). Hash map lookups are O(1) average.";
  if (q.includes("space complexity") || q.includes("memory"))
    return "Space complexity measures extra memory used. An in-place algorithm is O(1). Storing n elements in a list is O(n). Recursive calls add O(depth) to the call stack.";
  if (q.includes("recursion") || q.includes("recursive"))
    return "Recursion solves a problem by breaking it into smaller sub-problems of the same type. Always define a base case to stop the recursion, otherwise you'll hit a stack overflow.";
  if (q.includes("dynamic programming") || q.includes(" dp "))
    return "Dynamic programming stores results of sub-problems to avoid recomputation. Start with a recursive solution, identify overlapping sub-problems, then memoize or build a bottom-up table.";
  if (q.includes("two pointer") || q.includes("sliding window"))
    return "Two pointers work well on sorted arrays or when you need pairs. Sliding window is ideal for contiguous subarrays — expand the right pointer, shrink the left when a condition is violated.";
  if (q.includes("graph") || q.includes("bfs") || q.includes("dfs"))
    return "BFS uses a queue and finds shortest paths in unweighted graphs. DFS uses a stack (or recursion) and is better for cycle detection, topological sort, and connected components.";
  if (q.includes("tree") || q.includes("bst"))
    return "For BST problems: inorder traversal gives sorted order. Use recursion for most tree problems. For level-order traversal use BFS with a queue.";
  if (q.includes("hint") || q.includes("stuck") || q.includes("help"))
    return code?.trim()
      ? "Looking at your code — try tracing through a small example by hand first. Identify what the function should return for the simplest possible input, then build up from there."
      : "Break the problem into smaller steps: understand the input/output, think of a brute-force solution first, then optimize.";
  if (q.includes("explain") || q.includes("what does"))
    return code?.trim()
      ? "Use the 'Explain Code' button in the AI toolbar below the editor for a detailed line-by-line explanation of your current code."
      : "Paste your code in the editor and use the AI toolbar to get an explanation.";
  if (q.includes("improve") || q.includes("optimize") || q.includes("better"))
    return "Use the 'Improve Code' button in the AI toolbar for specific optimization suggestions tailored to your code.";
  if (q.includes("bug") || q.includes("error") || q.includes("issue"))
    return "Use the 'Detect Issues' button in the AI toolbar to scan your code for bugs, bad practices, and potential errors.";

  // Generic fallback
  return "Good question! Break the problem into smaller steps: understand the constraints, think of edge cases, start with a brute-force approach, then optimize. If you're stuck, try the AI toolbar below the editor for code-specific analysis.";
}

export default function AIAssistant({ code }) {
  const [open,     setOpen]     = useState(false);
  const [input,    setInput]    = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm your coding assistant. Ask me about algorithms, complexity, hints, or anything related to your problem." }
  ]);
  const [loading,  setLoading]  = useState(false);
  const bottomRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function handleAsk() {
    const q = input.trim();
    if (!q || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setInput("");
    setLoading(true);

    // Simulate network delay then return contextual mock answer
    await new Promise((r) => setTimeout(r, 700));
    const answer = getMockAnswer(q, code);

    setMessages((prev) => [...prev, { role: "assistant", text: answer }]);
    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  }

  return (
    <div className={styles.wrapper}>
      {/* Expanded chat panel */}
      {open && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <span className={styles.aiBadge}>AI</span>
              <span className={styles.headerTitle}>Assistant</span>
            </div>
            <button className={styles.closeBtn} onClick={() => setOpen(false)} title="Close">✕</button>
          </div>

          <div className={styles.messages}>
            {messages.map((m, i) => (
              <div key={i} className={`${styles.msg} ${m.role === "user" ? styles.msgUser : styles.msgBot}`}>
                {m.role === "assistant" && <span className={styles.botDot}>◎</span>}
                <p className={styles.msgText}>{m.text}</p>
              </div>
            ))}
            {loading && (
              <div className={`${styles.msg} ${styles.msgBot}`}>
                <span className={styles.botDot}>◎</span>
                <span className={styles.typing}><span /><span /><span /></span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className={styles.inputRow}>
            <textarea
              className={styles.input}
              placeholder="Ask about algorithms, hints, complexity…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              disabled={loading}
            />
            <button
              className={styles.sendBtn}
              onClick={handleAsk}
              disabled={!input.trim() || loading}
              title="Send (Enter)"
            >
              ↑
            </button>
          </div>
        </div>
      )}

      {/* FAB toggle */}
      <button
        className={`${styles.fab} ${open ? styles.fabOpen : ""}`}
        onClick={() => setOpen((v) => !v)}
        title={open ? "Close AI Assistant" : "Open AI Assistant"}
        aria-label="Toggle AI Assistant"
      >
        {open ? "✕" : "◎"}
      </button>
    </div>
  );
}

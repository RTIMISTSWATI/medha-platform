// ─────────────────────────────────────────────────────────────
// aiService.js  —  Module 6: AI Intelligence Layer
// Phase 1: mock responses  |  Phase 2: swap to real API
// ─────────────────────────────────────────────────────────────

const MOCK_DELAY = 900; // simulate network latency

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// ── Helpers ───────────────────────────────────────────────────

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const TOPIC_BANK = {
  dsa_placement: [
    { topic: "Arrays & Two Pointers",       tag: "DSA",    priority: "high"   },
    { topic: "Linked Lists",                tag: "DSA",    priority: "high"   },
    { topic: "Stacks & Queues",             tag: "DSA",    priority: "medium" },
    { topic: "Binary Search",               tag: "DSA",    priority: "high"   },
    { topic: "Trees & BST",                 tag: "DSA",    priority: "high"   },
    { topic: "Graphs — BFS / DFS",          tag: "DSA",    priority: "high"   },
    { topic: "Dynamic Programming",         tag: "DSA",    priority: "high"   },
    { topic: "Recursion & Backtracking",    tag: "DSA",    priority: "medium" },
    { topic: "Heaps & Priority Queues",     tag: "DSA",    priority: "medium" },
    { topic: "Mock Problems + Revision",    tag: "Review", priority: "medium" },
  ],
  gate: [
    { topic: "Discrete Mathematics",        tag: "Theory", priority: "high"   },
    { topic: "Data Structures",             tag: "DSA",    priority: "high"   },
    { topic: "Algorithm Analysis",          tag: "DSA",    priority: "high"   },
    { topic: "Operating Systems",           tag: "OS",     priority: "high"   },
    { topic: "DBMS + SQL",                  tag: "DBMS",   priority: "high"   },
    { topic: "Computer Networks",           tag: "CN",     priority: "high"   },
    { topic: "Compiler Design",             tag: "Theory", priority: "medium" },
    { topic: "Digital Logic",               tag: "Theory", priority: "medium" },
    { topic: "Previous Year Papers",        tag: "Review", priority: "high"   },
    { topic: "Full Mock Test",              tag: "Mock",   priority: "high"   },
  ],
  interview: [
    { topic: "DSA — Arrays & Hashing",      tag: "DSA",    priority: "high"   },
    { topic: "System Design Basics",        tag: "Design", priority: "high"   },
    { topic: "OOP + Java Concepts",         tag: "Java",   priority: "high"   },
    { topic: "OS + DBMS Concepts",          tag: "Theory", priority: "medium" },
    { topic: "Behavioral + HR Prep",        tag: "Soft",   priority: "medium" },
    { topic: "Mock Interview Practice",     tag: "Mock",   priority: "high"   },
    { topic: "Resume + Portfolio Review",   tag: "Career", priority: "medium" },
    { topic: "Graphs & DP Problems",        tag: "DSA",    priority: "high"   },
    { topic: "LLD — Design Patterns",       tag: "Design", priority: "medium" },
    { topic: "Concurrency & Threading",     tag: "Java",   priority: "medium" },
  ],
  java: [
    { topic: "OOP Fundamentals",            tag: "Java",   priority: "high"   },
    { topic: "Collections Framework",       tag: "Java",   priority: "high"   },
    { topic: "Multithreading",              tag: "Java",   priority: "high"   },
    { topic: "Exception Handling + I/O",    tag: "Java",   priority: "medium" },
    { topic: "Java 8+ Features",            tag: "Java",   priority: "high"   },
    { topic: "Spring Boot Basics",          tag: "Spring", priority: "medium" },
    { topic: "Build a Mini Project",        tag: "Project",priority: "medium" },
  ],
  aptitude: [
    { topic: "Number System + LCM/HCF",     tag: "Quant",  priority: "high"   },
    { topic: "Percentages + Profit/Loss",   tag: "Quant",  priority: "high"   },
    { topic: "Time, Speed & Distance",      tag: "Quant",  priority: "medium" },
    { topic: "Logical Reasoning",           tag: "Logic",  priority: "high"   },
    { topic: "Verbal Ability",              tag: "Verbal", priority: "medium" },
    { topic: "Data Interpretation",         tag: "DI",     priority: "high"   },
    { topic: "Full Mock Test",              tag: "Mock",   priority: "high"   },
  ],
};

function buildAIPlan({ goal, hoursPerDay, weakTopics }) {
  const bank = TOPIC_BANK[goal] ?? TOPIC_BANK["dsa_placement"];

  // Boost weak topics to front
  const weakLower = weakTopics.map((t) => t.toLowerCase());
  const sorted = [...bank].sort((a, b) => {
    const aWeak = weakLower.some((w) => a.topic.toLowerCase().includes(w));
    const bWeak = weakLower.some((w) => b.topic.toLowerCase().includes(w));
    if (aWeak && !bWeak) return -1;
    if (!aWeak && bWeak) return 1;
    if (a.priority === "high" && b.priority !== "high") return -1;
    if (a.priority !== "high" && b.priority === "high") return 1;
    return 0;
  });

  const plan = DAYS.map((day, i) => {
    const item = sorted[i % sorted.length];
    const isWeak = weakLower.some((w) => item.topic.toLowerCase().includes(w));
    const est = isWeak
      ? `${Math.min(hoursPerDay + 0.5, 4)}h`
      : `${hoursPerDay}h`;
    return { day, topic: item.topic, tag: item.tag, est, isWeak };
  });

  const insights = [];
  if (weakTopics.length > 0)
    insights.push(`Prioritized your weak areas: ${weakTopics.join(", ")}.`);
  if (hoursPerDay >= 3)
    insights.push("High study load detected — include short breaks every 45 min.");
  else if (hoursPerDay <= 1)
    insights.push("Short sessions? Focus on one concept per day for depth.");
  insights.push("Complete each day's task to earn XP and maintain your streak.");

  return { plan, insights };
}

// ── Notes AI helpers ─────────────────────────────────────────

/** Strip HTML tags and collapse whitespace into clean plain text */
function toPlainText(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

/** Split plain text into non-empty sentences */
function toSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/** Split plain text into non-empty lines / clauses */
function toClauses(text) {
  return text
    .split(/[.!?\n]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);
}

function mockSummarize(text) {
  const sentences = toSentences(text);
  if (sentences.length === 0) return "No content to summarize.";
  // Keep roughly the first 30 % of sentences, min 2, max 5
  const keep = Math.min(Math.max(Math.ceil(sentences.length * 0.3), 2), 5);
  return sentences.slice(0, keep).join(" ");
}

function mockKeyPoints(text) {
  const clauses = toClauses(text);
  if (clauses.length === 0) return ["No content found to extract key points."];
  // Pick up to 6 evenly-spaced clauses
  const step = Math.max(1, Math.floor(clauses.length / 6));
  const points = [];
  for (let i = 0; i < clauses.length && points.length < 6; i += step)
    points.push(clauses[i]);
  return points;
}

function mockFlashcards(text) {
  const clauses = toClauses(text);
  if (clauses.length < 2) {
    return [{ q: "What is the main topic of this note?", a: text.slice(0, 120) || "No content." }];
  }
  // Build Q/A pairs from consecutive clause pairs
  const cards = [];
  for (let i = 0; i + 1 < clauses.length && cards.length < 5; i += 2) {
    const concept = clauses[i];
    const detail  = clauses[i + 1];
    // Turn the concept clause into a question
    const q = concept.length > 60
      ? `What do you know about: "${concept.slice(0, 55)}…"?`
      : `Explain: "${concept}"?`;
    cards.push({ q, a: detail });
  }
  return cards;
}

// ── Public API ────────────────────────────────────────────────

export const aiService = {
  async generateStudyPlan(params) {
    await delay(MOCK_DELAY);
    return buildAIPlan(params);
  },

  /**
   * Summarize note HTML content into a short paragraph.
   * @param {string} html
   * @returns {Promise<string>}
   */
  async summarizeText(html) {
    await delay(MOCK_DELAY);
    return mockSummarize(toPlainText(html));
  },

  /**
   * Extract key points from note HTML content.
   * @param {string} html
   * @returns {Promise<string[]>}
   */
  async generateKeyPoints(html) {
    await delay(MOCK_DELAY);
    return mockKeyPoints(toPlainText(html));
  },

  /**
   * Generate flashcards (Q/A pairs) from note HTML content.
   * @param {string} html
   * @returns {Promise<Array<{q: string, a: string}>>}
   */
  async generateFlashcards(html) {
    await delay(MOCK_DELAY);
    return mockFlashcards(toPlainText(html));
  },

  // Stubs for upcoming features
  async analyzeSkillGap(_params)   { await delay(MOCK_DELAY); return {}; },
  async getDashboardInsights(_data){ await delay(MOCK_DELAY); return []; },
};

// ── Code AI helpers ───────────────────────────────────────────

function detectLanguage(code) {
  if (/def |import |print\(|:\s*$/.test(code))  return "Python";
  if (/function |const |let |var |=>/.test(code)) return "JavaScript";
  if (/public class|System\.out/.test(code))      return "Java";
  return "code";
}

function mockExplainCode(code) {
  const lines   = code.split("\n").filter((l) => l.trim());
  const lang    = detectLanguage(code);
  const hasFn   = /def |function |=>/.test(code);
  const hasLoop = /for |while /.test(code);
  const hasIf   = /if |else/.test(code);
  const hasCls  = /class /.test(code);
  const imports = lines.filter((l) => /^import |^from |^#include|^using /.test(l.trim()));

  const parts = [];
  parts.push(`This is a ${lang} program with ${lines.length} line${lines.length !== 1 ? "s" : ""} of code.`);
  if (imports.length)  parts.push(`It imports ${imports.length} module${imports.length > 1 ? "s" : ""}: ${imports.map((l) => l.trim()).join("; ")}.`);
  if (hasCls)  parts.push("It defines one or more classes, suggesting an object-oriented design.");
  if (hasFn)   parts.push("It contains function or method definitions that encapsulate reusable logic.");
  if (hasLoop) parts.push("It uses loops to iterate over data or repeat operations.");
  if (hasIf)   parts.push("It uses conditional logic to handle different execution paths.");
  parts.push("Overall, the code appears to perform a specific computation or task based on the structure above.");
  return parts.join(" ");
}

function mockImproveCode(code) {
  const suggestions = [];
  const lines = code.split("\n");

  if (code.length > 0 && !/\n$/.test(code))
    suggestions.push({ type: "style",       text: "Add a newline at the end of the file — it's a universal best practice." });
  if (/\t/.test(code))
    suggestions.push({ type: "style",       text: "Replace tab characters with spaces for consistent indentation across editors." });
  if (lines.some((l) => l.length > 100))
    suggestions.push({ type: "readability", text: "Some lines exceed 100 characters. Break them up for better readability." });
  if (/print\(/.test(code) && !/def |class /.test(code))
    suggestions.push({ type: "structure",   text: "Consider wrapping your logic in a main() function and calling it with `if __name__ == '__main__'`." });
  if ((code.match(/def /g) ?? []).length > 5)
    suggestions.push({ type: "structure",   text: "You have many functions — consider grouping related ones into a class or module." });
  if (/== True|== False/.test(code))
    suggestions.push({ type: "best-practice", text: "Avoid `== True` / `== False`. Use the boolean value directly: `if flag:` instead of `if flag == True:`." });
  if (/except:/.test(code))
    suggestions.push({ type: "best-practice", text: "Bare `except:` catches everything including system exits. Catch specific exceptions like `except ValueError:`." });
  if (suggestions.length === 0)
    suggestions.push({ type: "style", text: "Code looks clean! Consider adding docstrings to your functions for better documentation." });
  return suggestions;
}

function mockDetectIssues(code) {
  const issues = [];
  const lines  = code.split("\n");

  lines.forEach((line, i) => {
    const ln = i + 1;
    const trimmed = line.trimEnd();

    // Trailing whitespace
    if (/\s+$/.test(line))
      issues.push({ severity: "info",    line: ln, message: "Trailing whitespace detected." });
    // Very long line
    if (line.length > 120)
      issues.push({ severity: "warning", line: ln, message: `Line is ${line.length} chars — consider splitting it.` });
    // Python: missing colon after if/for/while/def/class
    if (/^\s*(if|for|while|def|class|elif|else|try|except|finally)\b.*[^:]\s*$/.test(trimmed) && !/#/.test(trimmed))
      issues.push({ severity: "error",   line: ln, message: "Possible missing `:` at end of block statement." });
    // == None instead of is None
    if (/== None|!= None/.test(line))
      issues.push({ severity: "warning", line: ln, message: "Use `is None` / `is not None` instead of `== None`." });
    // print without parens (Python 2 style)
    if (/^\s*print [^(]/.test(line))
      issues.push({ severity: "error",   line: ln, message: "Python 2 `print` statement — use `print()` function." });
    // Mutable default argument
    if (/def .+\(.*=\s*(\[|\{)/.test(line))
      issues.push({ severity: "warning", line: ln, message: "Mutable default argument detected — use `None` and assign inside the function." });
  });

  // Global-level checks
  if (!/def |class |import /.test(code) && code.trim().length > 0)
    issues.push({ severity: "info", line: null, message: "No functions or imports found — consider structuring code into functions." });

  return issues;
}

export const aiCodeService = {
  async explainCode(code) {
    await delay(MOCK_DELAY);
    return mockExplainCode(code);
  },
  async improveCode(code) {
    await delay(MOCK_DELAY);
    return mockImproveCode(code);
  },
  async detectIssues(code) {
    await delay(MOCK_DELAY);
    return mockDetectIssues(code);
  },
};

// ── Difficulty config ─────────────────────────────────────────
export const DIFFICULTY = {
  easy:   { label: "Easy",   color: "#22c55e", bg: "rgba(34,197,94,0.1)"   },
  medium: { label: "Medium", color: "#f59e0b", bg: "rgba(245,158,11,0.1)"  },
  hard:   { label: "Hard",   color: "#ef4444", bg: "rgba(239,68,68,0.1)"   },
};

// ── DSA Topics ────────────────────────────────────────────────
export const DSA_TOPICS = [
  { id: "arrays",        label: "Arrays",          icon: "📦", color: "#3b82f6" },
  { id: "strings",       label: "Strings",         icon: "🔤", color: "#8b5cf6" },
  { id: "linked-list",   label: "Linked List",     icon: "🔗", color: "#06b6d4" },
  { id: "trees",         label: "Trees",           icon: "🌳", color: "#10b981" },
  { id: "graphs",        label: "Graphs",          icon: "🕸️", color: "#f59e0b" },
  { id: "dp",            label: "Dynamic Prog.",   icon: "🧠", color: "#ec4899" },
  { id: "greedy",        label: "Greedy",          icon: "💰", color: "#f97316" },
  { id: "recursion",     label: "Recursion",       icon: "🔄", color: "#a855f7" },
  { id: "backtracking",  label: "Backtracking",    icon: "↩️", color: "#ef4444" },
  { id: "stack-queue",   label: "Stack & Queue",   icon: "📚", color: "#14b8a6" },
  { id: "binary-search", label: "Binary Search",   icon: "🔍", color: "#6366f1" },
  { id: "sliding-window",label: "Sliding Window",  icon: "🪟", color: "#84cc16" },
];

// ── CS Subjects ───────────────────────────────────────────────
export const CS_SUBJECTS = [
  { id: "dbms",      label: "DBMS",                    icon: "🗄️", color: "#10b981", totalQ: 40 },
  { id: "os",        label: "Operating Systems",       icon: "⚙️", color: "#f59e0b", totalQ: 45 },
  { id: "cn",        label: "Computer Networks",       icon: "🌐", color: "#3b82f6", totalQ: 35 },
  { id: "oops",      label: "OOP Concepts",            icon: "🧩", color: "#8b5cf6", totalQ: 30 },
  { id: "sql",       label: "SQL Queries",             icon: "📋", color: "#06b6d4", totalQ: 25 },
  { id: "system",    label: "System Design",           icon: "🏗️", color: "#ec4899", totalQ: 20 },
  { id: "aptitude",  label: "Aptitude",                icon: "🧮", color: "#f97316", totalQ: 50 },
  { id: "hr",        label: "HR Interview",            icon: "🎯", color: "#a855f7", totalQ: 20 },
];

// ── Company tags ──────────────────────────────────────────────
export const COMPANIES = [
  "Google","Amazon","Microsoft","Meta","Apple",
  "Flipkart","Infosys","TCS","Wipro","Accenture",
  "Adobe","Uber","Netflix","Goldman Sachs","Morgan Stanley",
];

// ── Mock problems ─────────────────────────────────────────────
export const MOCK_PROBLEMS = [
  // Arrays
  { id:"p001", title:"Two Sum",                    topic:"arrays",        difficulty:"easy",   companies:["Amazon","Google"],          acceptance:49 },
  { id:"p002", title:"Best Time to Buy and Sell",  topic:"arrays",        difficulty:"easy",   companies:["Amazon","Microsoft"],        acceptance:54 },
  { id:"p003", title:"Maximum Subarray (Kadane's)",topic:"arrays",        difficulty:"medium", companies:["Google","Adobe"],            acceptance:50 },
  { id:"p004", title:"Product of Array Except Self",topic:"arrays",       difficulty:"medium", companies:["Amazon","Facebook"],         acceptance:65 },
  { id:"p005", title:"Trapping Rain Water",        topic:"arrays",        difficulty:"hard",   companies:["Amazon","Google","Microsoft"],acceptance:58 },
  { id:"p006", title:"Merge Intervals",            topic:"arrays",        difficulty:"medium", companies:["Google","Facebook"],         acceptance:46 },
  // Strings
  { id:"p007", title:"Valid Anagram",              topic:"strings",       difficulty:"easy",   companies:["Amazon","Microsoft"],        acceptance:63 },
  { id:"p008", title:"Longest Substring No Repeat",topic:"strings",       difficulty:"medium", companies:["Amazon","Google","Adobe"],   acceptance:34 },
  { id:"p009", title:"Group Anagrams",             topic:"strings",       difficulty:"medium", companies:["Amazon","Facebook"],         acceptance:67 },
  { id:"p010", title:"Minimum Window Substring",   topic:"strings",       difficulty:"hard",   companies:["Google","Amazon"],           acceptance:41 },
  { id:"p011", title:"Palindrome Check",           topic:"strings",       difficulty:"easy",   companies:["Microsoft","Infosys"],       acceptance:82 },
  { id:"p012", title:"Longest Palindromic Substring",topic:"strings",     difficulty:"medium", companies:["Amazon","Microsoft"],        acceptance:33 },
  // Linked List
  { id:"p013", title:"Reverse Linked List",        topic:"linked-list",   difficulty:"easy",   companies:["Amazon","Microsoft","Adobe"],acceptance:73 },
  { id:"p014", title:"Detect Cycle in Linked List",topic:"linked-list",   difficulty:"medium", companies:["Amazon","Google"],           acceptance:48 },
  { id:"p015", title:"Merge Two Sorted Lists",     topic:"linked-list",   difficulty:"easy",   companies:["Amazon","Microsoft"],        acceptance:62 },
  { id:"p016", title:"LRU Cache",                  topic:"linked-list",   difficulty:"hard",   companies:["Amazon","Google","Facebook"],acceptance:42 },
  { id:"p017", title:"Find Middle of Linked List", topic:"linked-list",   difficulty:"easy",   companies:["Flipkart","TCS"],            acceptance:77 },
  // Trees
  { id:"p018", title:"Binary Tree Inorder Traversal",topic:"trees",       difficulty:"easy",   companies:["Amazon","Microsoft"],        acceptance:74 },
  { id:"p019", title:"Maximum Depth of Binary Tree",topic:"trees",        difficulty:"easy",   companies:["Amazon","Google"],           acceptance:73 },
  { id:"p020", title:"Validate Binary Search Tree",topic:"trees",         difficulty:"medium", companies:["Amazon","Microsoft","Adobe"],acceptance:32 },
  { id:"p021", title:"Lowest Common Ancestor",     topic:"trees",         difficulty:"medium", companies:["Amazon","Facebook"],         acceptance:60 },
  { id:"p022", title:"Binary Tree Level Order",    topic:"trees",         difficulty:"medium", companies:["Amazon","Google"],           acceptance:66 },
  { id:"p023", title:"Serialize & Deserialize Tree",topic:"trees",        difficulty:"hard",   companies:["Google","Facebook"],         acceptance:56 },
  // Graphs
  { id:"p024", title:"Number of Islands",          topic:"graphs",        difficulty:"medium", companies:["Amazon","Google","Microsoft"],acceptance:57 },
  { id:"p025", title:"Clone Graph",                topic:"graphs",        difficulty:"medium", companies:["Facebook","Amazon"],         acceptance:54 },
  { id:"p026", title:"Course Schedule (Topo Sort)",topic:"graphs",        difficulty:"medium", companies:["Google","Amazon"],           acceptance:46 },
  { id:"p027", title:"Word Ladder",                topic:"graphs",        difficulty:"hard",   companies:["Amazon","Google"],           acceptance:37 },
  { id:"p028", title:"Dijkstra's Shortest Path",   topic:"graphs",        difficulty:"medium", companies:["Google","Uber"],             acceptance:51 },
  // DP
  { id:"p029", title:"Climbing Stairs",            topic:"dp",            difficulty:"easy",   companies:["Amazon","Google"],           acceptance:52 },
  { id:"p030", title:"Coin Change",                topic:"dp",            difficulty:"medium", companies:["Amazon","Google","Microsoft"],acceptance:42 },
  { id:"p031", title:"Longest Common Subsequence", topic:"dp",            difficulty:"medium", companies:["Amazon","Google"],           acceptance:57 },
  { id:"p032", title:"0/1 Knapsack",               topic:"dp",            difficulty:"medium", companies:["Amazon","Flipkart"],         acceptance:44 },
  { id:"p033", title:"Edit Distance",              topic:"dp",            difficulty:"hard",   companies:["Google","Amazon"],           acceptance:53 },
  { id:"p034", title:"Burst Balloons",             topic:"dp",            difficulty:"hard",   companies:["Google"],                    acceptance:58 },
  // Greedy
  { id:"p035", title:"Jump Game",                  topic:"greedy",        difficulty:"medium", companies:["Amazon","Microsoft"],        acceptance:38 },
  { id:"p036", title:"Activity Selection Problem", topic:"greedy",        difficulty:"medium", companies:["Amazon","Google"],           acceptance:55 },
  { id:"p037", title:"Minimum Platforms",          topic:"greedy",        difficulty:"medium", companies:["Flipkart","Amazon"],         acceptance:48 },
  // Recursion
  { id:"p038", title:"Subsets / Power Set",        topic:"recursion",     difficulty:"medium", companies:["Amazon","Google"],           acceptance:74 },
  { id:"p039", title:"Permutations of String",     topic:"recursion",     difficulty:"medium", companies:["Microsoft","Amazon"],        acceptance:76 },
  { id:"p040", title:"Tower of Hanoi",             topic:"recursion",     difficulty:"medium", companies:["TCS","Infosys"],             acceptance:80 },
  // Backtracking
  { id:"p041", title:"N-Queens Problem",           topic:"backtracking",  difficulty:"hard",   companies:["Google","Amazon"],           acceptance:67 },
  { id:"p042", title:"Sudoku Solver",              topic:"backtracking",  difficulty:"hard",   companies:["Google","Microsoft"],        acceptance:59 },
  { id:"p043", title:"Word Search",                topic:"backtracking",  difficulty:"medium", companies:["Amazon","Microsoft"],        acceptance:40 },
  // Stack & Queue
  { id:"p044", title:"Valid Parentheses",          topic:"stack-queue",   difficulty:"easy",   companies:["Amazon","Google","Microsoft"],acceptance:41 },
  { id:"p045", title:"Min Stack",                  topic:"stack-queue",   difficulty:"medium", companies:["Amazon","Google"],           acceptance:53 },
  { id:"p046", title:"Next Greater Element",       topic:"stack-queue",   difficulty:"medium", companies:["Amazon","Flipkart"],         acceptance:68 },
  { id:"p047", title:"Sliding Window Maximum",     topic:"stack-queue",   difficulty:"hard",   companies:["Google","Amazon"],           acceptance:46 },
  // Binary Search
  { id:"p048", title:"Binary Search",              topic:"binary-search", difficulty:"easy",   companies:["Amazon","Microsoft"],        acceptance:55 },
  { id:"p049", title:"Search in Rotated Array",    topic:"binary-search", difficulty:"medium", companies:["Amazon","Google","Microsoft"],acceptance:39 },
  { id:"p050", title:"Find Peak Element",          topic:"binary-search", difficulty:"medium", companies:["Google","Facebook"],         acceptance:46 },
  { id:"p051", title:"Median of Two Sorted Arrays",topic:"binary-search", difficulty:"hard",   companies:["Google","Amazon"],           acceptance:37 },
  // Sliding Window
  { id:"p052", title:"Maximum Sum Subarray of K",  topic:"sliding-window",difficulty:"easy",   companies:["Amazon","Flipkart"],         acceptance:72 },
  { id:"p053", title:"Longest Subarray with Sum K",topic:"sliding-window",difficulty:"medium", companies:["Amazon","Google"],           acceptance:44 },
  { id:"p054", title:"Fruits Into Baskets",        topic:"sliding-window",difficulty:"medium", companies:["Amazon","Google"],           acceptance:43 },
  { id:"p055", title:"Count Distinct in Window",   topic:"sliding-window",difficulty:"hard",   companies:["Google","Microsoft"],        acceptance:51 },
  // Extra mixed
  { id:"p056", title:"Top K Frequent Elements",    topic:"arrays",        difficulty:"medium", companies:["Amazon","Facebook"],         acceptance:65 },
  { id:"p057", title:"Find Duplicate Number",      topic:"arrays",        difficulty:"medium", companies:["Amazon","Google"],           acceptance:59 },
  { id:"p058", title:"Spiral Matrix",              topic:"arrays",        difficulty:"medium", companies:["Microsoft","Amazon"],        acceptance:47 },
  { id:"p059", title:"Rotate Image",               topic:"arrays",        difficulty:"medium", companies:["Amazon","Microsoft"],        acceptance:73 },
  { id:"p060", title:"Container With Most Water",  topic:"arrays",        difficulty:"medium", companies:["Amazon","Google"],           acceptance:54 },
];

// ── Revision intervals (spaced repetition) ───────────────────
export const REVISION_INTERVALS = [1, 3, 7, 14, 30]; // days

// ── Today's recommendation logic weights ─────────────────────
export const RECOMMENDATION_WEIGHTS = {
  weakTopic:    3,
  neverSolved:  2,
  revisionDue:  4,
  highFrequency:2,
};

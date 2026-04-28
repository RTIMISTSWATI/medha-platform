// ── Task config ───────────────────────────────────────────────
export const PRIORITIES = [
  { value: "high",   label: "High",   color: "#ef4444" },
  { value: "medium", label: "Medium", color: "#f59e0b" },
  { value: "low",    label: "Low",    color: "#22c55e" },
];

export const PLANNER_SUBJECTS = [
  { id: "dsa",       label: "DSA",              icon: "🧩" },
  { id: "dbms",      label: "DBMS",             icon: "🗄️" },
  { id: "os",        label: "Operating Systems",icon: "⚙️" },
  { id: "java",      label: "Java",             icon: "☕" },
  { id: "system",    label: "System Design",    icon: "🏗️" },
  { id: "aptitude",  label: "Aptitude",         icon: "🧮" },
  { id: "interview", label: "Interview Prep",   icon: "🎯" },
  { id: "projects",  label: "Projects",         icon: "🚀" },
  { id: "resume",    label: "Resume",           icon: "📄" },
  { id: "other",     label: "Other",            icon: "📌" },
];

// ── Roadmap templates ─────────────────────────────────────────
export const ROADMAP_GOALS = [
  { id: "dsa_placement", label: "DSA Placement Prep",  icon: "🧩" },
  { id: "gate",          label: "GATE Preparation",    icon: "🎓" },
  { id: "semester",      label: "Semester Exam Prep",  icon: "📚" },
  { id: "interview",     label: "Interview Prep",      icon: "🎯" },
  { id: "java",          label: "Java Revision",       icon: "☕" },
  { id: "aptitude",      label: "Aptitude Practice",   icon: "🧮" },
];

export const ROADMAP_TEMPLATES = {
  dsa_placement: [
    { day: "Monday",    topic: "Arrays & Strings",          tag: "DSA",     est: "2h" },
    { day: "Tuesday",   topic: "Linked Lists",              tag: "DSA",     est: "2h" },
    { day: "Wednesday", topic: "Stacks & Queues",           tag: "DSA",     est: "2h" },
    { day: "Thursday",  topic: "Trees & BST",               tag: "DSA",     est: "2.5h" },
    { day: "Friday",    topic: "Graphs & BFS/DFS",          tag: "DSA",     est: "2.5h" },
    { day: "Saturday",  topic: "Dynamic Programming",       tag: "DSA",     est: "3h" },
    { day: "Sunday",    topic: "Mock Problems + Revision",  tag: "Review",  est: "2h" },
  ],
  gate: [
    { day: "Monday",    topic: "Discrete Mathematics",      tag: "Theory",  est: "2h" },
    { day: "Tuesday",   topic: "Data Structures",           tag: "DSA",     est: "2h" },
    { day: "Wednesday", topic: "Algorithms Analysis",       tag: "DSA",     est: "2h" },
    { day: "Thursday",  topic: "Operating Systems",         tag: "OS",      est: "2h" },
    { day: "Friday",    topic: "DBMS + SQL",                tag: "DBMS",    est: "2h" },
    { day: "Saturday",  topic: "Computer Networks",         tag: "CN",      est: "2h" },
    { day: "Sunday",    topic: "Previous Year Papers",      tag: "Review",  est: "3h" },
  ],
  semester: [
    { day: "Monday",    topic: "Unit 1 — Core Concepts",    tag: "Theory",  est: "2h" },
    { day: "Tuesday",   topic: "Unit 2 — Deep Dive",        tag: "Theory",  est: "2h" },
    { day: "Wednesday", topic: "Unit 3 — Applications",     tag: "Applied", est: "2h" },
    { day: "Thursday",  topic: "Unit 4 — Advanced Topics",  tag: "Theory",  est: "2h" },
    { day: "Friday",    topic: "Unit 5 — Case Studies",     tag: "Applied", est: "2h" },
    { day: "Saturday",  topic: "Practice Questions",        tag: "Practice",est: "2.5h" },
    { day: "Sunday",    topic: "Full Revision + Notes",     tag: "Review",  est: "2h" },
  ],
  interview: [
    { day: "Monday",    topic: "DSA — Arrays & Hashing",    tag: "DSA",     est: "2h" },
    { day: "Tuesday",   topic: "System Design Basics",      tag: "Design",  est: "2h" },
    { day: "Wednesday", topic: "OOP + Java Concepts",       tag: "Java",    est: "2h" },
    { day: "Thursday",  topic: "OS + DBMS Concepts",        tag: "Theory",  est: "2h" },
    { day: "Friday",    topic: "Behavioral + HR Prep",      tag: "Soft",    est: "1.5h" },
    { day: "Saturday",  topic: "Mock Interview Practice",   tag: "Mock",    est: "3h" },
    { day: "Sunday",    topic: "Resume + Portfolio Review", tag: "Career",  est: "2h" },
  ],
  java: [
    { day: "Monday",    topic: "OOP Fundamentals",          tag: "Java",    est: "2h" },
    { day: "Tuesday",   topic: "Collections Framework",     tag: "Java",    est: "2h" },
    { day: "Wednesday", topic: "Multithreading",            tag: "Java",    est: "2h" },
    { day: "Thursday",  topic: "Exception Handling + I/O",  tag: "Java",    est: "2h" },
    { day: "Friday",    topic: "Java 8+ Features",          tag: "Java",    est: "2h" },
    { day: "Saturday",  topic: "Spring Boot Basics",        tag: "Spring",  est: "2.5h" },
    { day: "Sunday",    topic: "Build a Mini Project",      tag: "Project", est: "3h" },
  ],
  aptitude: [
    { day: "Monday",    topic: "Number System + LCM/HCF",   tag: "Quant",   est: "1.5h" },
    { day: "Tuesday",   topic: "Percentages + Profit/Loss", tag: "Quant",   est: "1.5h" },
    { day: "Wednesday", topic: "Time, Speed & Distance",    tag: "Quant",   est: "1.5h" },
    { day: "Thursday",  topic: "Logical Reasoning",         tag: "Logic",   est: "1.5h" },
    { day: "Friday",    topic: "Verbal Ability",            tag: "Verbal",  est: "1.5h" },
    { day: "Saturday",  topic: "Data Interpretation",       tag: "DI",      est: "2h" },
    { day: "Sunday",    topic: "Full Mock Test",            tag: "Mock",    est: "2h" },
  ],
};

// ── XP / Level system ─────────────────────────────────────────
export const LEVELS = [
  { level: 1,  title: "Beginner",      minXP: 0,    maxXP: 100  },
  { level: 2,  title: "Learner",       minXP: 100,  maxXP: 250  },
  { level: 3,  title: "Practitioner",  minXP: 250,  maxXP: 500  },
  { level: 4,  title: "Achiever",      minXP: 500,  maxXP: 800  },
  { level: 5,  title: "Expert",        minXP: 800,  maxXP: 1200 },
  { level: 6,  title: "Master",        minXP: 1200, maxXP: 1800 },
  { level: 7,  title: "Champion",      minXP: 1800, maxXP: 2500 },
  { level: 8,  title: "Legend",        minXP: 2500, maxXP: 9999 },
];

export const XP_REWARDS = {
  completeTask:    20,
  highPriority:    10,  // bonus for high priority
  dailyStreak:     15,  // bonus per streak day
};

// ── Heatmap ───────────────────────────────────────────────────
export const HEATMAP_WEEKS = 18; // ~4 months shown

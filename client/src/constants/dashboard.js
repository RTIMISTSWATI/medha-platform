// ── Skill Gap ─────────────────────────────────────────────────
export const TARGET_ROLES = [
  { id: "sde",        label: "SDE — Product Company",    icon: "🏢" },
  { id: "sde_service",label: "SDE — Service Company",    icon: "🏗️" },
  { id: "frontend",   label: "Frontend Engineer",        icon: "🎨" },
  { id: "backend",    label: "Backend Engineer",         icon: "⚙️" },
  { id: "fullstack",  label: "Full Stack Engineer",      icon: "🔥" },
  { id: "data",       label: "Data Engineer / Analyst",  icon: "📊" },
  { id: "gate",       label: "GATE / Higher Studies",    icon: "🎓" },
];

export const ROLE_SKILLS = {
  sde: {
    required: ["DSA","System Design","OOP","Java/C++","OS","DBMS","Computer Networks","Problem Solving","Git","SQL"],
    nice:     ["Spring Boot","Microservices","Docker","Kubernetes","AWS","Redis","Kafka"],
  },
  sde_service: {
    required: ["Java","SQL","REST APIs","OOP","DBMS","Basic DSA","Git","Linux","Testing"],
    nice:     ["Spring Boot","Hibernate","Maven","Jenkins","JIRA","Agile"],
  },
  frontend: {
    required: ["HTML","CSS","JavaScript","React","TypeScript","REST APIs","Git","Responsive Design"],
    nice:     ["Next.js","Redux","Tailwind CSS","Testing","Performance Optimization","Figma"],
  },
  backend: {
    required: ["Node.js/Java/Python","REST APIs","SQL","NoSQL","Authentication","Git","OS Basics","System Design"],
    nice:     ["Docker","Redis","Message Queues","GraphQL","Microservices","AWS"],
  },
  fullstack: {
    required: ["React","Node.js","SQL","NoSQL","REST APIs","Git","HTML/CSS","JavaScript","TypeScript"],
    nice:     ["Docker","AWS","CI/CD","Redis","System Design","Testing"],
  },
  data: {
    required: ["Python","SQL","Statistics","Pandas","NumPy","Data Visualization","Excel","Machine Learning Basics"],
    nice:     ["Spark","Hadoop","Tableau","Power BI","Airflow","Kafka","Scala"],
  },
  gate: {
    required: ["Discrete Math","Data Structures","Algorithms","OS","DBMS","Computer Networks","Theory of Computation","Compiler Design"],
    nice:     ["Digital Logic","Computer Organization","Linear Algebra","Probability"],
  },
};

// ── Badges ────────────────────────────────────────────────────
export const BADGES = [
  { id: "first_task",   icon: "🎯", label: "First Step",      desc: "Complete your first task",         xpRequired: 20   },
  { id: "streak_3",     icon: "🔥", label: "On Fire",         desc: "3-day study streak",               xpRequired: 60   },
  { id: "streak_7",     icon: "⚡", label: "Week Warrior",    desc: "7-day study streak",               xpRequired: 140  },
  { id: "tasks_10",     icon: "✅", label: "Task Master",     desc: "Complete 10 tasks",                xpRequired: 200  },
  { id: "notes_5",      icon: "📝", label: "Note Taker",      desc: "Create 5 notes",                   xpRequired: 100  },
  { id: "level_3",      icon: "🏆", label: "Practitioner",    desc: "Reach Level 3",                    xpRequired: 250  },
  { id: "level_5",      icon: "💎", label: "Expert",          desc: "Reach Level 5",                    xpRequired: 800  },
  { id: "consistency",  icon: "📅", label: "Consistent",      desc: "Study 14 days in a month",         xpRequired: 300  },
  { id: "all_subjects", icon: "🌟", label: "All-Rounder",     desc: "Add tasks in 5+ subjects",         xpRequired: 400  },
  { id: "legend",       icon: "👑", label: "Legend",          desc: "Reach Level 8",                    xpRequired: 2500 },
];

// ── Interview Prep Topics ─────────────────────────────────────
export const DSA_TOPICS = [
  { id: "arrays",   label: "Arrays & Strings",    total: 30 },
  { id: "ll",       label: "Linked Lists",         total: 15 },
  { id: "trees",    label: "Trees & BST",          total: 20 },
  { id: "graphs",   label: "Graphs",               total: 20 },
  { id: "dp",       label: "Dynamic Programming",  total: 25 },
  { id: "sorting",  label: "Sorting & Searching",  total: 15 },
  { id: "greedy",   label: "Greedy",               total: 10 },
  { id: "backtrack",label: "Backtracking",         total: 10 },
];

export const CORE_SUBJECTS = [
  { id: "os",     label: "Operating Systems",  icon: "⚙️",  chapters: 8 },
  { id: "dbms",   label: "DBMS",               icon: "🗄️",  chapters: 7 },
  { id: "cn",     label: "Computer Networks",  icon: "🌐",  chapters: 6 },
  { id: "oops",   label: "OOP Concepts",       icon: "🧩",  chapters: 5 },
  { id: "system", label: "System Design",      icon: "🏗️",  chapters: 10 },
];

export const HR_QUESTIONS = [
  "Tell me about yourself",
  "Why this company?",
  "Strengths & Weaknesses",
  "Where do you see yourself in 5 years?",
  "Describe a challenge you overcame",
  "Why should we hire you?",
  "Teamwork experience",
  "Leadership example",
];

// ── Resume checklist ──────────────────────────────────────────
export const RESUME_CHECKLIST = [
  { id: "summary",      label: "Professional Summary",    weight: 10 },
  { id: "education",    label: "Education Section",       weight: 10 },
  { id: "skills",       label: "Technical Skills",        weight: 15 },
  { id: "projects",     label: "Projects (2+)",           weight: 20 },
  { id: "experience",   label: "Internship / Experience", weight: 20 },
  { id: "github",       label: "GitHub Profile Link",     weight: 10 },
  { id: "linkedin",     label: "LinkedIn Profile Link",   weight: 5  },
  { id: "certifications",label:"Certifications",          weight: 5  },
  { id: "achievements", label: "Achievements / Awards",   weight: 5  },
];

// ── Chart colors ──────────────────────────────────────────────
export const CHART_COLORS = {
  dsa:       "#3b82f6",
  dbms:      "#10b981",
  os:        "#f59e0b",
  java:      "#ef4444",
  system:    "#8b5cf6",
  aptitude:  "#06b6d4",
  interview: "#ec4899",
  projects:  "#f97316",
  resume:    "#a855f7",
};

export const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

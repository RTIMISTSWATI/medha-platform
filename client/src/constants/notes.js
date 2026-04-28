export const SUBJECTS = [
  { id: "dsa",        label: "DSA",                icon: "🧩" },
  { id: "dbms",       label: "DBMS",               icon: "🗄️" },
  { id: "os",         label: "Operating Systems",  icon: "⚙️" },
  { id: "java",       label: "Java",               icon: "☕" },
  { id: "system",     label: "System Design",      icon: "🏗️" },
  { id: "aptitude",   label: "Aptitude",           icon: "🧮" },
  { id: "interview",  label: "Interview Questions",icon: "🎯" },
  { id: "projects",   label: "Projects",           icon: "🚀" },
  { id: "resume",     label: "Resume Notes",       icon: "📄" },
];

export const DEFAULT_FLASHCARDS = [
  {
    id: "fc-1",
    subject: "dsa",
    term: "Big O — O(log n)",
    definition: "Binary Search, BST operations. Halves the problem each step.",
  },
  {
    id: "fc-2",
    subject: "os",
    term: "Deadlock Conditions",
    definition: "Mutual Exclusion · Hold & Wait · No Preemption · Circular Wait",
  },
  {
    id: "fc-3",
    subject: "dbms",
    term: "ACID Properties",
    definition: "Atomicity · Consistency · Isolation · Durability",
  },
  {
    id: "fc-4",
    subject: "java",
    term: "OOP Pillars",
    definition: "Encapsulation · Abstraction · Inheritance · Polymorphism",
  },
  {
    id: "fc-5",
    subject: "system",
    term: "CAP Theorem",
    definition: "A distributed system can guarantee only 2 of: Consistency, Availability, Partition Tolerance.",
  },
];

export const EMPTY_NOTE = {
  id: null,
  title: "",
  content: "",
  subject: "dsa",
  pinned: false,
  createdAt: null,
  updatedAt: null,
};

import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

const NAV_ITEMS = [
  { to: "/playground", label: "Code Playground", icon: "⚡" },
  { to: "/notes",      label: "Smart Notes",     icon: "📝" },
  { to: "/planner",    label: "Study Planner",   icon: "📅" },
  // Phase 4+
  // { to: "/resume",  label: "Resume Builder",  icon: "📄" },
  // { to: "/tracker", label: "Progress",         icon: "📊" },
];

export default function AppNav() {
  return (
    <header className={styles.nav}>
      <div className={styles.brand}>
        <span className={styles.brandMark}>⚡</span>
        <span className={styles.brandName}>Medha</span>
        <span className={styles.brandTag}>Beta</span>
      </div>

      <nav className={styles.links}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.linkActive : ""}`
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.right}>
        <span className={styles.phase}>Phase 1</span>
      </div>
    </header>
  );
}

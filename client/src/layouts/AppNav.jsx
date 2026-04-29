import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

// ── Inline SVG mascot ─────────────────────────────────────────
// A cozy study owl sitting on a book — warm cream/amber tones
function MascotIcon() {
  return (
    <svg
      className={styles.mascotSvg}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Medha mascot"
    >
      {/* Rounded square background */}
      <rect width="40" height="40" rx="10" fill="#1e1508" />
      <rect width="40" height="40" rx="10" fill="url(#mascotBg)" opacity="0.6" />

      {/* Book base */}
      <rect x="7" y="27" width="26" height="5" rx="2" fill="#8B6914" />
      <rect x="8" y="26" width="24" height="3" rx="1.5" fill="#C8A040" />
      <line x1="20" y1="26" x2="20" y2="32" stroke="#6B4F10" strokeWidth="0.8" />

      {/* Owl body */}
      <ellipse cx="20" cy="21" rx="7" ry="8" fill="#C8A97E" />
      <ellipse cx="20" cy="21" rx="5.5" ry="6.5" fill="#F0E6D3" />

      {/* Wings */}
      <ellipse cx="12.5" cy="22" rx="3.5" ry="5" fill="#B8935A" transform="rotate(-10 12.5 22)" />
      <ellipse cx="27.5" cy="22" rx="3.5" ry="5" fill="#B8935A" transform="rotate(10 27.5 22)" />

      {/* Ears / tufts */}
      <ellipse cx="16" cy="13.5" rx="2" ry="2.8" fill="#C8A97E" transform="rotate(-15 16 13.5)" />
      <ellipse cx="24" cy="13.5" rx="2" ry="2.8" fill="#C8A97E" transform="rotate(15 24 13.5)" />

      {/* Eyes */}
      <circle cx="17" cy="19.5" r="3" fill="#fff" />
      <circle cx="23" cy="19.5" r="3" fill="#fff" />
      <circle cx="17.5" cy="19.8" r="1.6" fill="#3D2B0A" />
      <circle cx="23.5" cy="19.8" r="1.6" fill="#3D2B0A" />
      {/* Eye shine */}
      <circle cx="18.1" cy="19.2" r="0.55" fill="#fff" />
      <circle cx="24.1" cy="19.2" r="0.55" fill="#fff" />

      {/* Beak */}
      <path d="M18.8 22.5 L20 24 L21.2 22.5 Z" fill="#D4956A" />

      {/* Graduation cap */}
      <rect x="14" y="12" width="12" height="2" rx="1" fill="#2D3748" />
      <rect x="17.5" y="10" width="5" height="2.5" rx="0.8" fill="#2D3748" />
      <line x1="25" y1="13" x2="26.5" y2="15.5" stroke="#C8A040" strokeWidth="1" strokeLinecap="round" />
      <circle cx="26.8" cy="16" r="0.8" fill="#C8A040" />

      <defs>
        <linearGradient id="mascotBg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C8A97E" />
          <stop offset="100%" stopColor="#8B5E3C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ── Search icon ───────────────────────────────────────────────
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 10L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Nav items ─────────────────────────────────────────────────
const NAV_ITEMS = [
  { to: "/playground", label: "Playground", icon: "⚡" },
  { to: "/notes",      label: "Notes",      icon: "📝" },
  { to: "/planner",    label: "Planner",    icon: "📅" },
  { to: "/questions",  label: "Questions",  icon: "🎯" },
  { to: "/dashboard",  label: "Dashboard",  icon: "📊" },
];

// ── Component ─────────────────────────────────────────────────
export default function AppNav() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className={styles.nav}>

      {/* ── Brand ── */}
      <div className={styles.brand}>
        <div className={styles.mascotWrap}>
          <MascotIcon />
        </div>
        <div className={styles.brandText}>
          <span className={styles.brandName}>Medha</span>
          <span className={styles.brandTagline}>Study OS</span>
        </div>
      </div>

      {/* ── Divider ── */}
      <div className={styles.divider} />

      {/* ── Nav links ── */}
      <nav className={styles.links}>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.linkActive : ""}`
            }
          >
            <span className={styles.linkIcon}>{item.icon}</span>
            <span className={styles.linkLabel}>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* ── Right controls ── */}
      <div className={styles.right}>

        {/* Search */}
        <button
          className={`${styles.iconBtn} ${searchOpen ? styles.iconBtnActive : ""}`}
          onClick={() => setSearchOpen((v) => !v)}
          title="Search"
          aria-label="Search"
        >
          <SearchIcon />
        </button>

        {/* Divider */}
        <div className={styles.rightDivider} />

        {/* Profile avatar */}
        <button className={styles.avatar} title="Profile" aria-label="Profile">
          <span className={styles.avatarEmoji}>🦉</span>
        </button>

      </div>
    </header>
  );
}

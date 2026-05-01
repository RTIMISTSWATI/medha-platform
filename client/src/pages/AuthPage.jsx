import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import bg from "../assets/login-bg.png";
import styles from "./AuthPage.module.css";

function OwlMark() {
  return (
    <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="12" fill="#1B1612" />
      <rect x="7" y="27" width="26" height="5" rx="2" fill="#8B6914" />
      <rect x="8" y="26" width="24" height="3" rx="1.5" fill="#C8A040" />
      <line x1="20" y1="26" x2="20" y2="32" stroke="#6B4F10" strokeWidth="0.8" />
      <ellipse cx="20" cy="21" rx="7" ry="8" fill="#C8A97E" />
      <ellipse cx="20" cy="21" rx="5.5" ry="6.5" fill="#F0E6D3" />
      <ellipse cx="12.5" cy="22" rx="3.5" ry="5" fill="#B8935A" transform="rotate(-10 12.5 22)" />
      <ellipse cx="27.5" cy="22" rx="3.5" ry="5" fill="#B8935A" transform="rotate(10 27.5 22)" />
      <ellipse cx="16" cy="13.5" rx="2" ry="2.8" fill="#C8A97E" transform="rotate(-15 16 13.5)" />
      <ellipse cx="24" cy="13.5" rx="2" ry="2.8" fill="#C8A97E" transform="rotate(15 24 13.5)" />
      <circle cx="17" cy="19.5" r="3" fill="#fff" />
      <circle cx="23" cy="19.5" r="3" fill="#fff" />
      <circle cx="17.5" cy="19.8" r="1.6" fill="#3D2B0A" />
      <circle cx="23.5" cy="19.8" r="1.6" fill="#3D2B0A" />
      <circle cx="18.1" cy="19.2" r="0.55" fill="#fff" />
      <circle cx="24.1" cy="19.2" r="0.55" fill="#fff" />
      <path d="M18.8 22.5 L20 24 L21.2 22.5 Z" fill="#D4956A" />
      <rect x="14" y="12" width="12" height="2" rx="1" fill="#2D3748" />
      <rect x="17.5" y="10" width="5" height="2.5" rx="0.8" fill="#2D3748" />
      <line x1="25" y1="13" x2="26.5" y2="15.5" stroke="#C8A040" strokeWidth="1" strokeLinecap="round" />
      <circle cx="26.8" cy="16" r="0.8" fill="#C8A040" />
    </svg>
  );
}

const FEATURES = [
  { icon: "🧩", label: "DSA Practice",  desc: "Structured problem solving with topic tracking" },
  { icon: "📝", label: "Smart Notes",   desc: "AI-powered revision and flashcard system"       },
  { icon: "📅", label: "Study Planner", desc: "Daily goals, streaks, and XP rewards"           },
  { icon: "🤖", label: "AI Mentor",     desc: "Personalized guidance and skill gap analysis"   },
];

export default function AuthPage() {
  const [mode,     setMode]     = useState("login");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [name,     setName]     = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("medha_auth", "true");
    if (name) localStorage.setItem("medha_user_name", name);
    navigate("/dashboard");
  }

  return (
    <div className={styles.page}>

      {/* ══════════════════════════════════════════
          LEFT — Background scene + brand content
          ══════════════════════════════════════════ */}
      <div className={styles.left}>
        {/* Layered background */}
        <div className={styles.bgImage} />
        <div className={styles.bgOverlay} />
        <div className={styles.bgWarmRadial} />
        <div className={styles.bgVignette} />
        <div className={styles.bgGrain} />

        {/* Warm lamp cone from above */}
        <div className={styles.lampGlow} />

        {/* Content over background */}
        <div className={styles.leftContent}>

          {/* Brand */}
          <div className={styles.brand}>
            <OwlMark />
            <div className={styles.brandText}>
              <span className={styles.brandName}>Medha</span>
              <span className={styles.brandTag}>Personal Preparation OS</span>
            </div>
          </div>

          {/* Headline */}
          <div className={styles.headline}>
            <h1 className={styles.headlineTitle}>
              Your personal<br />
              <em className={styles.headlineEm}>study sanctuary.</em>
            </h1>
            <p className={styles.headlineSub}>
              One intelligent platform to plan, practice,<br />
              track, and grow — every single day.
            </p>
          </div>

          {/* Feature cards */}
          <div className={styles.features}>
            {FEATURES.map((f) => (
              <div key={f.label} className={styles.featureCard}>
                <span className={styles.featureIcon}>{f.icon}</span>
                <div className={styles.featureText}>
                  <span className={styles.featureLabel}>{f.label}</span>
                  <span className={styles.featureDesc}>{f.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <p className={styles.leftQuote}>
            "The secret of getting ahead is getting started."
          </p>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RIGHT — Glass login panel
          ══════════════════════════════════════════ */}
      <div className={styles.right}>
        <div className={styles.card}>

          {/* Mode toggle */}
          <div className={styles.modeToggle}>
            <button
              className={`${styles.modeBtn} ${mode === "login" ? styles.modeBtnActive : ""}`}
              onClick={() => setMode("login")}
            >
              Sign In
            </button>
            <button
              className={`${styles.modeBtn} ${mode === "signup" ? styles.modeBtnActive : ""}`}
              onClick={() => setMode("signup")}
            >
              Create Account
            </button>
          </div>

          {/* Heading */}
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>
              {mode === "login" ? "Welcome back" : "Start your journey"}
            </h2>
            <p className={styles.formSub}>
              {mode === "login"
                ? "Your study sanctuary awaits."
                : "Join thousands of students preparing smarter."}
            </p>
          </div>

          {/* Form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Full Name</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Email Address</label>
              <input
                className={styles.input}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.fieldLabel}>Password</label>
              <input
                className={styles.input}
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {mode === "login" && (
              <div className={styles.forgotRow}>
                <button type="button" className={styles.forgotBtn}>Forgot password?</button>
              </div>
            )}

            <button type="submit" className={styles.submitBtn}>
              {mode === "login" ? "Enter Medha →" : "Create My Space →"}
            </button>
          </form>

          {/* Divider */}
          <div className={styles.divider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerText}>or continue as</span>
            <span className={styles.dividerLine} />
          </div>

          {/* Guest */}
          <button
            className={styles.guestBtn}
            onClick={() => {
              localStorage.setItem("medha_auth", "true");
              navigate("/dashboard");
            }}
          >
            👤 Continue as Guest
          </button>

          {/* Switch */}
          <p className={styles.switchText}>
            {mode === "login" ? "New to Medha? " : "Already have an account? "}
            <button
              className={styles.switchBtn}
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
            >
              {mode === "login" ? "Create account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

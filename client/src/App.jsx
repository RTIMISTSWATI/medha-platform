import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AppNav from "./layouts/AppNav";
import AuthPage       from "./pages/AuthPage";
import CodeEditorPage from "./pages/CodeEditorPage";
import NotesPage      from "./pages/NotesPage";
import PlannerPage    from "./pages/PlannerPage";
import DashboardPage  from "./pages/DashboardPage";
import QuestionsPage  from "./pages/QuestionsPage";

// ── Simple localStorage-based auth check ─────────────────────
function isAuthenticated() {
  return localStorage.getItem("medha_auth") === "true";
}

// ── Protected Route wrapper ───────────────────────────────────
function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return children;
}

// ── App shell with nav + main content ────────────────────────
function AppShell({ children }) {
  return (
    <div className="app">
      <AppNav />
      <main className="appMain">{children}</main>
    </div>
  );
}

// ── Root App ──────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* "/" → Login page (auth entry point) */}
        <Route path="/" element={<AuthPage />} />

        {/* Protected workspace routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AppShell><DashboardPage /></AppShell>
          </ProtectedRoute>
        } />
        <Route path="/playground" element={
          <ProtectedRoute>
            <AppShell><CodeEditorPage /></AppShell>
          </ProtectedRoute>
        } />
        <Route path="/notes" element={
          <ProtectedRoute>
            <AppShell><NotesPage /></AppShell>
          </ProtectedRoute>
        } />
        <Route path="/planner" element={
          <ProtectedRoute>
            <AppShell><PlannerPage /></AppShell>
          </ProtectedRoute>
        } />
        <Route path="/questions" element={
          <ProtectedRoute>
            <AppShell><QuestionsPage /></AppShell>
          </ProtectedRoute>
        } />

        {/* Catch-all → redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

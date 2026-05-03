import React, { useEffect } from "react"; // ADDED useEffect
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AppNav from "./layouts/AppNav";
import AuthPage       from "./pages/AuthPage";
import CodeEditorPage from "./pages/CodeEditorPage";
import NotesPage      from "./pages/NotesPage";
import PlannerPage    from "./pages/PlannerPage";
import DashboardPage  from "./pages/DashboardPage";
import QuestionsPage  from "./pages/QuestionsPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { requestNotificationPermission, checkReminders } from "./utils/reminderService"; // ADDED
import SpotifyPlayer from "./components/SpotifyPlayer"; // ADDED

// ── App shell with nav + main content ────────────────────────
function AppShell({ children }) {
  return (
    <div className="app">
      <AppNav />
      <main className="appMain">{children}</main>
      <SpotifyPlayer /> {/* ADDED: floating player, only on authenticated routes */}
    </div>
  );
}

// ── Root App ──────────────────────────────────────────────────
export default function App() {
  // ADDED: request notification permission once, then poll every 60 s
  useEffect(() => {
    requestNotificationPermission();
    checkReminders();                              // run immediately on load
    const id = setInterval(checkReminders, 60_000); // then every 60 seconds
    return () => clearInterval(id);               // clean up on unmount
  }, []);

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

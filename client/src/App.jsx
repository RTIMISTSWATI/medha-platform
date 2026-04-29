import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AppNav from "./layouts/AppNav";
import CodeEditorPage  from "./pages/CodeEditorPage";
import NotesPage       from "./pages/NotesPage";
import PlannerPage     from "./pages/PlannerPage";
import DashboardPage   from "./pages/DashboardPage";
import QuestionsPage   from "./pages/QuestionsPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <AppNav />
        <main className="appMain">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/playground" element={<CodeEditorPage />} />
            <Route path="/notes"      element={<NotesPage />} />
            <Route path="/planner"    element={<PlannerPage />} />
            <Route path="/dashboard"  element={<DashboardPage />} />
            <Route path="/questions"  element={<QuestionsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

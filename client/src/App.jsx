import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AppNav from "./layouts/AppNav";
import CodeEditorPage from "./pages/CodeEditorPage";
import NotesPage from "./pages/NotesPage";
import PlannerPage from "./pages/PlannerPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <AppNav />
        <main className="appMain">
          <Routes>
            <Route path="/" element={<Navigate to="/playground" replace />} />
            <Route path="/playground" element={<CodeEditorPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/planner" element={<PlannerPage />} />
            {/* Phase 4+ routes added here */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

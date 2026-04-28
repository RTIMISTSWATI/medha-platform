import React from "react";
import "./App.css";
import CodeEditorPage from "./pages/CodeEditorPage";

// Phase 2: replace with <RouterProvider> / <BrowserRouter> + route config
export default function App() {
  return (
    <div className="app">
      <CodeEditorPage />
    </div>
  );
}

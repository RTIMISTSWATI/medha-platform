import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Proxy /api/execute → judge service during dev
      // Allows switching to env var in production without code changes
      "/api/judge": {
        target: "http://localhost:5001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/judge/, ""),
      },
    },
  },
});

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load variables from .env; '' means load everything, not just VITE_
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    server: {
      host: true,
      proxy: {
        "/api": {
          // Fallback to localhost if BACKEND_URL isn't in .env
          target: env.BACKEND_URL || "http://localhost:4000",
          changeOrigin: true,
        },
      },
    },
  };
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  define: {
    "globalThis.import_meta_env": JSON.stringify({
      VITE_API_URL: process.env.VITE_API_URL || "http://localhost:4000/api",
    }),
  },
});

import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import prism from "vite-plugin-prismjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prism({
      languages: ["javascript", "css", "html", "typescript"],
      plugins: ["line-numbers"],
      theme: "tomorrow",
      css: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

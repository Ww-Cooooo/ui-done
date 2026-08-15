import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  define: {
    "process.env.NODE_ENV": JSON.stringify("production")
  },
  plugins: [react()],
  build: {
    outDir: "showcase/shared/runtime",
    emptyOutDir: true,
    cssCodeSplit: false,
    sourcemap: false,
    minify: "oxc",
    lib: {
      entry: "showcase/runtime/src/main.jsx",
      name: "UIDoneShowcase",
      formats: ["iife"],
      cssFileName: "ui-done-core",
      fileName: () => "ui-done-core.js"
    },
    rollupOptions: {
      output: {
        assetFileNames: "[name][extname]"
      }
    }
  }
});

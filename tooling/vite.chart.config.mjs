import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "showcase/shared/runtime",
    emptyOutDir: false,
    sourcemap: false,
    minify: "oxc",
    lib: {
      entry: "showcase/runtime/src/control-room-chart.jsx",
      name: "UIDoneControlChart",
      formats: ["iife"],
      fileName: () => "ui-done-control-chart.js"
    }
  }
});

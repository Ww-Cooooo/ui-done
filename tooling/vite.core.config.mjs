import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production")
  },
  plugins: [react()],
  build: {
    outDir: "showcase/shared/runtime",
    emptyOutDir: true,
    target: "es2022",
    assetsInlineLimit: 0,
    cssCodeSplit: true,
    sourcemap: false,
    minify: "oxc",
    chunkSizeWarningLimit: 1350,
    rollupOptions: {
      input: "showcase/runtime/src/main.jsx",
      output: {
        entryFileNames: "ui-done-app.js",
        chunkFileNames: "chunks/[name]-[hash].js",
        assetFileNames: assetInfo => assetInfo.name?.endsWith(".css")
          ? "ui-done-app.css"
          : "assets/[name]-[hash][extname]",
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (id.includes("@antv/")) return "antv";
          if (id.includes("@react-three/") || id.includes("/three/")) return "spatial";
          if (id.includes("/pts/")) return "pts";
          if (id.includes("/antd/") || id.includes("@ant-design/")) return "antd";
          if (id.includes("/animejs/") || id.includes("/lenis/")) return "motion";
          if (id.includes("/react/") || id.includes("/react-dom/") || id.includes("/scheduler/")) return "react";
          return "vendor";
        }
      }
    }
  }
});

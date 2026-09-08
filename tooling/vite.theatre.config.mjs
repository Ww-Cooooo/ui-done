import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { copyFileSync } from "node:fs";

const root = fileURLToPath(new URL("../showcase/runtime/theatre-seats/", import.meta.url));
const repo = resolve(root, "../../..");
const outDir = resolve(repo, "showcase/theatre-seats");
export default defineConfig({
  root, base: "./", plugins: [react(), {
    name: "theatre-notices", apply: "build",
    closeBundle() {
      // Reuse the existing, complete notice inventory; it is a superset of this prototype.
      for (const [source, target] of [
        ["showcase/shared/runtime/THIRD_PARTY_LICENSES.txt", "THIRD_PARTY_LICENSES.txt"],
        ["showcase/shared/fonts/FONT_NOTICES.md", "FONT_NOTICES.md"],
        ["showcase/shared/fonts/OFL-1.1.txt", "OFL-1.1.txt"],
        ["LICENSE", "UI-Done-LICENSE.txt"],
      ]) copyFileSync(resolve(repo, source), resolve(outDir, target));
    },
  }],
  build: {
    // Own page entry: keep its styles and motion out of unrelated showcase pages.
    outDir,
    emptyOutDir: true, target: "es2022", assetsInlineLimit: 0,
    // Let the dynamic import split G2; forcing its dependencies into one manual
    // chunk can make the entry eagerly import that entire charting chunk.
    rollupOptions: { output: { chunkFileNames(chunk) {
      const name = chunk.facadeModuleId?.replaceAll("\\", "/").includes("/@antv/g2/") ? "chart" : chunk.name;
      return `assets/${name}-[hash].js`;
    } } },
  },
});

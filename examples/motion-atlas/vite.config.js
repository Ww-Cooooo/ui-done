import { defineConfig } from 'vite';
export default defineConfig({
  base: './',
  build: { outDir: '../../showcase/motion-atlas', emptyOutDir: true, target: 'es2022', chunkSizeWarningLimit: 900 },
});

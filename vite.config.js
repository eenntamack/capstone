import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // increase chunk size limit to 1000 KB
    outDir: 'build' // optional: make output folder match 'build' if Render expects it
  }
})
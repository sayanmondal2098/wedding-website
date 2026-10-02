import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // A relative base keeps this backup portable if it is published under a new repo or subfolder.
  base: './',
})

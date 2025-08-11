import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), crx({ manifest }), tailwindcss(),],
  resolve: {
    alias:{
      "@": path.resolve(__dirname, "./src"),
    }
  },
})


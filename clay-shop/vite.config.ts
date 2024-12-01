import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Exposing the website to local network, should be disabled by default, and i probably have to also disable it at some point
  server: {
    host: true,
    port: 8000,
  },
})

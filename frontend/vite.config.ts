import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy:{
      "/api": "http://localhost:5000",
    },
    host: true,
    port: 3000// Це дозволяє доступ по мережі
  },
  plugins: [react()]
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   plugins: [react()],
  server: {
    host: "0.0.0.0",   // expose to network
    port: 5173,
    proxy: {
      // All /api requests are forwarded to the gateway by Vite's dev server.
      // The browser only talks to localhost:5173 → no CORS error.
      '/api': {
        target: 'http://192.168.0.102:8080',
        changeOrigin: true,
        secure: false,
        // Uncomment ONLY if your Spring Gateway strips /api before routing:
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
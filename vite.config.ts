import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Let ngrok tunnels reach the dev/preview server (Vite blocks unknown hostnames by default).
  server: { allowedHosts: ['.ngrok-free.dev', '.ngrok-free.app', '.ngrok.dev', '.ngrok.app'] },
  preview: { allowedHosts: ['.ngrok-free.dev', '.ngrok-free.app', '.ngrok.dev', '.ngrok.app'] },
  optimizeDeps: {
    include: ['motion/react', 'lenis', 'lucide-react'],
  },
})

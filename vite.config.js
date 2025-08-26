import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss(),],
  base: process.env.VITE_BASE_URL || '/',
  server: {
    port: 3000, // <-- aquí defines el puerto
  },
})

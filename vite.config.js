import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const base = process.env.BASE_URL || '/';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  base: base,
  server: {
    port: 3000, // <-- aquí defines el puerto
  },
})

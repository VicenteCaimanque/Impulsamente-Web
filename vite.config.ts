
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables de entorno (VITE_API_KEY)
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Definir process.env.API_KEY globalmente para el SDK de Google
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY)
    },
    server: {
      port: 3000,
      open: true
    }
  }
})

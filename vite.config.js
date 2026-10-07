import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    plugins: [react()],
    resolve: {
      // Garantiza UNA sola copia de React aunque una librería (p. ej. una librería de UI) lo traiga como
      // dependencia: dos copias rompen los hooks ("Invalid hook call").
      dedupe: ['react', 'react-dom'],
    },
    server: {
      // En desarrollo el front llama a "/api" (mismo origen) y Vite lo reenvía al backend.
      // Así la cookie de sesión es de "primera parte" y ningún navegador la bloquea.
      proxy: {
        '/api': {
          target: env.VITE_PROXY_TARGET || 'http://localhost:4000',
          changeOrigin: true,
        },
      },
    },
  }
})

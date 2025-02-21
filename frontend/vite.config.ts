import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Слухати на всіх інтерфейсах для Docker
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://backend:5000', // Ім’я сервісу бекенду в Docker
        changeOrigin: true, // Змінює заголовок Host
        rewrite: (path) => path.replace(/^\/api/, '/api'), // Зберігаємо префікс /api
      },
    },
  },
});
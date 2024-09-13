import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/restaurant-menu/',
  server: {
    proxy: {
      '/api/menu': {
        target: 'https://cdn-dev.preoday.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/menu/, '/challenge/menu'),
      },
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',   
    rollupOptions: {
      input: 'src/main.tsx', 
    }
  }
});

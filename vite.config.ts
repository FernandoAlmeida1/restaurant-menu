import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    base: command === 'build' ? '/restaurant-menu/' : '/',
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
      },
    },
  };
});

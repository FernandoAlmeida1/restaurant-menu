import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api/menu': {
        target: 'https://cdn-dev.preoday.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/menu/, '/challenge/menu'),
      },
    },
  },
});

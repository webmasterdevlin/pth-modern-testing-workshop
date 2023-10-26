/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), viteTsconfigPaths()],
  server: {
    host: '0.0.0.0',
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});

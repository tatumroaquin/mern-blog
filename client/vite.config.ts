import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { dependencies } from './package.json';

// https://sambitsahoo.com/blog/vite-code-splitting-that-works.html
function renderChunks(deps: Record<string, string>) {
  const chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, '../') };
  return defineConfig({
    plugins: [react()],
    server: {
      https: {
        key: '../ssl/tblog-key.pem',
        cert: '../ssl/tblog-crt.pem',
      },
      proxy: {
        '/api': {
          target: 'https://localhost:3000',
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            ...renderChunks(dependencies),
          },
        },
      },
    },
  });
};

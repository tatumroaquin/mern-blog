import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { dependencies } from './package.json';
import path from 'node:path';

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
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, './src/components'),
        '@form': path.resolve(__dirname, './src/components/Form'),
        '@ui': path.resolve(__dirname, './src/components/UI'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@util': path.resolve(__dirname, './src/utility'),
        '@types': path.resolve(__dirname, './src/types.ts'),
      }
    },
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

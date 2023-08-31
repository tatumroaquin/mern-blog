import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, '../') };
  return defineConfig({
    server: {
      https: {
        key: '../ssl/tblog-key.pem',
        cert: '../ssl/tblog-crt.pem',
      },
    },
    plugins: [react()],
  });
};

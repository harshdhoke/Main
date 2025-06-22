import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'main-app',
      remotes: {
        musicLibrary: 'https://music-library-finac-plus.netlify.app/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom']
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
});
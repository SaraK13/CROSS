import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Check if running in Electron (disable PWA in Electron)
const isElectron = !!(process.env.IS_ELECTRON);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
            !isElectron &&
            VitePWA({ 
              registerType: 'autoUpdate',
              includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
              manifest: {
                name: 'My CROSS project',
                short_name: 'CROSS',
                description: 'My CROSS Ionic project in 5th sem',
                theme_color: '#000',
                display: "standalone",
                icons: [
                  {
                    src: './src/images/pwa-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                    purpose: 'any'
                  },
                  {
                    src: './src/images/pwa-maskable-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                    purpose: 'maskable',
                  },
                  {
                    src: './src/images/pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any'
                  },
                  {
                    src: './src/images/pwa-maskable-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'maskable',
                  },
                ],
              },
              devOptions: {
                enabled: true
              },
              })].filter(Boolean),
  server: {
    watch: {
      usePolling: true,
    }
  },
  base: './',
  build: {
    outDir: 'dist',
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { viteSingleFile } from 'vite-plugin-singlefile';

const isSingle = process.env.SINGLEFILE === '1';

export default defineConfig({
  base: './',
  plugins: isSingle
    ? [react(), viteSingleFile()]
    : [
        react(),
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['icon.svg'],
          manifest: {
            name: '考研英语一小作文背诵',
            short_name: '小作文',
            description: '基于主动回忆与 FSRS-5 间隔重复的考研英语一小作文背诵工具',
            theme_color: '#F7F4EE',
            background_color: '#F7F4EE',
            display: 'standalone',
            icons: [
              {
                src: 'icon.svg',
                sizes: 'any',
                type: 'image/svg+xml',
                purpose: 'any maskable',
              },
            ],
          },
          workbox: {
            globPatterns: ['**/*.{js,css,html,svg,png,woff,woff2}'],
          },
        }),
      ],
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});

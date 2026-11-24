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
          includeAssets: [
            'icon.svg',
            'apple-touch-icon.png',
            'icon-192.png',
            'icon-512.png',
          ],
          manifest: {
            id: './',
            start_url: './',
            scope: './',
            lang: 'zh-CN',
            name: '考研背诵 · 作文·公式·政治',
            short_name: '考研背诵',
            description:
              '基于主动回忆与 FSRS-5 间隔重复的考研英语大小作文、数学公式与政治一页纸离线背诵工具',
            theme_color: '#F7F4EE',
            background_color: '#F7F4EE',
            display: 'standalone',
            display_override: ['standalone', 'minimal-ui'],
            orientation: 'portrait',
            icons: [
              {
                src: 'icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any',
              },
              {
                src: 'icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any',
              },
              {
                src: 'icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
              },
              {
                src: 'icon.svg',
                sizes: 'any',
                type: 'image/svg+xml',
                purpose: 'any',
              },
            ],
          },
          workbox: {
            globPatterns: ['**/*.{js,css,html,svg,png,woff,woff2}'],
            globIgnores: ['splash/**'],
            clientsClaim: true,
            skipWaiting: true,
            cleanupOutdatedCaches: true,
          },
        }),
      ],
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});

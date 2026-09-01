// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://fedethics.ca',
  integrations: [
    react(),
    sitemap({
      // /book/ is reader-only bonus content and stays out of the index.
      filter: (page) => !page.includes('/book/'),
    }),
  ],
  build: {
    // Emit /our-story/index.html so live URLs are /our-story/
    format: 'directory',
  },
});

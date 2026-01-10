import { defineConfig } from 'astro/config';
import alpine from '@astrojs/alpinejs';

export default defineConfig({
  output: 'static',
  integrations: [alpine()],
});

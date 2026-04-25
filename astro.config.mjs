import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://atelier-ethos.vercel.app',
  output: 'static',
  build: {
    format: 'directory'
  }
});

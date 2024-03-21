import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import yaml from '@rollup/plugin-yaml';


// https://astro.build/config
export default defineConfig({
  site: 'https://pooya.blog',
  integrations: [tailwind(), react()],
  trailingSlash: "never",
  server: {
    port: 8080
  },
  vite: {
    plugins: [yaml()]
  }
});

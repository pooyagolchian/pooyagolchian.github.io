import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import yaml from '@rollup/plugin-yaml';


// https://astro.build/config
export default defineConfig({
  site: 'http://pooya.blog/',
  integrations: [tailwind(), react()],
  vite: {
    plugins: [yaml()]
  }
});

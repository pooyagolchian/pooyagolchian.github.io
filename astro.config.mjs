import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";

import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://pooya.blog',
  base: 'pooyagolchian.github.io',
  integrations: [tailwind(), react()],
});

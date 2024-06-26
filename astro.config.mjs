import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), icon()],
  prefetch: true,
  server: {
    port: 3000,
  },
  output: "hybrid",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    maxDuration: 8,
    imageService: true,
    devImageService: "squoosh",
    isr: {
      expiration: 60 * 60 * 24,
    },
  }),
});

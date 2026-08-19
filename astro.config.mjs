import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.chinese-snacks.com",
  trailingSlash: "always",
  integrations: [tailwind(), sitemap({
    entryLimit: 10000,
  })],
});

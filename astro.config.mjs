import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import swup from "@swup/astro";

import tailwindcss from "@tailwindcss/vite";

import remarkDirective from "remark-directive";
import { remarkDirectives } from "./src/plugins/remark-directives.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://wesuggestproduct.vercel.app",
  base: "/",
  integrations: [
    swup({
      theme: ["overlay", { direction: "to-top" }],
      cache: true,
      progress: true,
    }),
    preact(),
    sitemap(),
  ],

  image: {
    responsiveStyles: true,
  },

  markdown: {
    remarkPlugins: [remarkDirective, remarkDirectives],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});

//swup theme variations:
// theme: "fade"
// theme: ["overlay", { direction: "to-top"}]
//
// for overlay and fade, further customization can be done in animate.css file
// To know about swup, visit https://swup.js.org/

import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import expressiveCode from "astro-expressive-code";
import sitemap from "@astrojs/sitemap";
import { remarkBaseUrl } from "./src/lib/remark-base-url";

/**
 * Wrap @tailwindcss/vite to skip Expressive Code CSS files.
 * EC emits CSS that Tailwind's parser can't handle ("Missing opening (").
 *
 * WARNING: This manipulates plugin internals (transform.filter.id.exclude).
 * If @tailwindcss/vite updates its internal structure, this will break.
 * Replace with an official exclusion option when available.
 */
function tailwindWithExclusions() {
  type TwPlugin = {
    name?: string;
    transform?: { filter?: { id?: { exclude?: RegExp[] } } };
  };
  const plugins = tailwindcss() as TwPlugin[];
  for (const plugin of plugins) {
    if (!plugin.name?.includes("generate")) continue;
    const excludes = plugin.transform?.filter?.id?.exclude;
    if (excludes) excludes.push(/\bec\.[^.]+\.css/);
  }
  return plugins as ReturnType<typeof tailwindcss>;
}

export default defineConfig({
  site: "https://dsikeres1.github.io",
  base: "/react-date-range-picker",

  integrations: [expressiveCode(), react(), mdx(), sitemap()],

  markdown: {
    remarkPlugins: [remarkBaseUrl],
  },

  server: { port: 58060 },

  vite: {
    plugins: [tailwindWithExclusions()],
    define: {
      "process.env.NODE_ENV": JSON.stringify("development"),
    },
    server: {
      fs: {
        // Allow access to workspace root (monorepo/symlink support)
        allow: ["../.."],
      },
    },
  },
});

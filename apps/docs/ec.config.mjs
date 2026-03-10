import { defineEcConfig } from "astro-expressive-code";

export default defineEcConfig({
  themes: ["github-light", "github-dark-dimmed"],
  themeCssSelector: (theme) => {
    if (theme.name === "github-dark-dimmed") return ".dark";
    return ":root:not(.dark)";
  },
});

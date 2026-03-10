import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/",
      "**/dist/",
      "**/build/",
      "**/.astro/",
      "**/*.astro",
      "**/coverage/",
      "**/tsup.config.ts",
      "**/vitest.config.ts",
      "**/vite.config.ts",
      "eslint.config.mjs",
      "setupTests.ts",
      "**/scripts/**",
      "**/ec.config.mjs",
    ],
  },

  js.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    plugins: { "react-hooks": reactHooks },
    rules: { ...reactHooks.configs.recommended.rules, "react-hooks/refs": "off" },
  },

  prettierConfig,

  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },

  {
    files: ["apps/docs/**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    ...tseslint.configs.disableTypeChecked,
  },

  {
    files: ["**/registry/**/*.{ts,tsx}"],
    ...tseslint.configs.disableTypeChecked,
  },

  // Hooks with intentional dependency array optimizations (time refresh, open/close sync, etc.)
  {
    files: [
      "packages/headless/src/useDatePicker.ts",
      "packages/headless/src/useDateRangePicker.ts",
      "packages/headless/src/useDateTimePicker.ts",
      "packages/headless/src/useDateRangeTimePicker.ts",
      "packages/headless/src/useStandaloneTimePicker.ts",
      "packages/ui-primitives/src/primitives/shared/TimePanel.tsx",
      "packages/tailwind4/registry/ui-primitives/shared/TimePanel.tsx",
    ],
    rules: {
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/preserve-manual-memoization": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },

  // CJS config files (tailwind.config.js, etc.)
  {
    files: ["**/tailwind.config.js", "**/*.cjs"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
  },
);

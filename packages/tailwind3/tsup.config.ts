import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: { resolve: ["react-date-range-picker-ui-primitives"] },
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "react-date-range-picker-headless", "@floating-ui/react"],
});

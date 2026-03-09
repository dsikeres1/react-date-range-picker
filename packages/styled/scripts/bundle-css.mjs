import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// Read CSS files in order (variables first, then sizes, then components)
const files = ["src/styles/variables.css", "src/styles/sizes.css", "src/styles/components.css"];

let output = "";
for (const file of files) {
  let content = readFileSync(resolve(root, file), "utf-8");
  // Strip @import lines (already inlined)
  content = content.replace(/^@import\s+.*;\s*$/gm, "").trim();
  output += `/* === ${file} === */\n${content}\n\n`;
}

writeFileSync(resolve(root, "dist/styles.css"), output.trim() + "\n");
console.log("CSS bundled → dist/styles.css");

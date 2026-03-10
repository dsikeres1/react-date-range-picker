import type { Root } from "mdast";
import { visit } from "unist-util-visit";

/**
 * Remark plugin that prepends the Astro base URL to internal links.
 * Handles links like /docs/... that need /react-date-range-picker/docs/...
 */
export function remarkBaseUrl() {
  return (tree: Root) => {
    const base = "/react-date-range-picker";

    visit(tree, "link", (node) => {
      if (typeof node.url === "string" && node.url.startsWith("/") && !node.url.startsWith(base)) {
        node.url = base + node.url;
      }
    });
  };
}

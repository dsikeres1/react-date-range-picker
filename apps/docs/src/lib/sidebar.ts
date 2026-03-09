import { getCollection } from "astro:content";
import { defaultLocale, extractLang, toUrlLocale, type SupportedLocale } from "./i18n";

export interface SidebarItem {
  label: string;
  href?: string;
  items?: SidebarItem[];
  position?: number;
}

/**
 * Category display names (folder name → label).
 * Add entries here when new folders are added to content.
 */
const categoryLabels: Record<string, string> = {
  // top level
  styled: "Styled",
  tailwind4: "Tailwind v4",
  tailwind3: "Tailwind v3",
  headless: "Headless",
  guides: "Guides",
  // nested
  components: "Components",
  customization: "Customization",
  hooks: "Hooks",
  contexts: "Contexts",
  types: "Types",
  utilities: "Utilities",
  "date-picker": "DatePicker",
  "date-range-picker": "DateRangePicker",
  "date-time-picker": "DateTimePicker",
  "date-range-time-picker": "DateRangeTimePicker",
  "time-picker": "TimePicker",
};

/**
 * Build a URL-safe doc path prefix for a given language.
 * en → "" (no prefix), ko → "ko/"
 */
function langUrlPrefix(lang: SupportedLocale): string {
  return lang === defaultLocale ? "" : `${toUrlLocale(lang)}/`;
}

/**
 * Build a sidebar tree for a given top-level section and language.
 *
 * e.g. buildSidebar("styled", base, "ko") builds the tree from all docs whose
 * id starts with "ko/styled/".
 */
export async function buildSidebar(
  section: string,
  basePath: string,
  lang: SupportedLocale = defaultLocale,
): Promise<SidebarItem[]> {
  const allDocs = await getCollection("docs");

  // Filter docs belonging to this language + section
  // doc.id is lowercased by Astro's glob loader, so compare case-insensitively
  const prefix = `${lang}/${section}/`.toLowerCase();
  const sectionDocs = allDocs.filter((doc) => doc.id.toLowerCase().startsWith(prefix));

  // Build tree
  const root: SidebarItem[] = [];
  const urlPrefix = langUrlPrefix(lang);

  for (const doc of sectionDocs) {
    // Remove lang+section prefix: "ko/styled/components/date-picker/basic" → "components/date-picker/basic"
    const relativePath = doc.id.slice(prefix.length);
    const parts = relativePath.split("/");

    // Navigate/create tree
    let current = root;
    for (let i = 0; i < parts.length - 1; i++) {
      const folderName = parts[i];
      let folder = current.find(
        (item) => item.label === (categoryLabels[folderName] ?? folderName),
      );
      if (!folder) {
        folder = {
          label: categoryLabels[folderName] ?? folderName,
          items: [],
          position: 100,
        };
        current.push(folder);
      }
      current = folder.items!;
    }

    // Add leaf — href uses lang prefix for non-en
    const slug = parts[parts.length - 1];
    const label =
      doc.data.sidebar_label ??
      doc.data.title ??
      slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    const { path } = extractLang(doc.id);
    current.push({
      label,
      href: `${basePath}/docs/${urlPrefix}${path}`,
      position: doc.data.sidebar_position ?? 999,
    });
  }

  // Sort recursively
  sortTree(root);
  return root;
}

function sortTree(items: SidebarItem[]): void {
  items.sort((a, b) => (a.position ?? 999) - (b.position ?? 999));
  for (const item of items) {
    if (item.items) {
      sortTree(item.items);
    }
  }
}

/**
 * Flatten a sidebar tree into an ordered list of leaf pages.
 */
export function flattenSidebar(items: SidebarItem[]): SidebarItem[] {
  const result: SidebarItem[] = [];
  for (const item of items) {
    if (item.href) {
      result.push(item);
    }
    if (item.items) {
      result.push(...flattenSidebar(item.items));
    }
  }
  return result;
}

/**
 * Find prev/next pages relative to the current path.
 */
export function findPrevNext(
  items: SidebarItem[],
  currentPath: string,
): { prev?: SidebarItem; next?: SidebarItem } {
  const flat = flattenSidebar(items);
  const idx = flat.findIndex(
    (item) =>
      item.href === currentPath ||
      item.href === currentPath + "/" ||
      item.href + "/" === currentPath,
  );
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? flat[idx - 1] : undefined,
    next: idx < flat.length - 1 ? flat[idx + 1] : undefined,
  };
}

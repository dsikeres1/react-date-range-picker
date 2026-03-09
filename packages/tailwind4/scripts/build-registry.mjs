/**
 * Build the shadcn registry JSON for react-date-range-picker.
 *
 * Reads all registry source files and outputs a single JSON file
 * at apps/docs/public/r/date-range-picker.json
 *
 * Usage:
 *   cd packages/tailwind4 && node scripts/build-registry.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = resolve(__dirname, "..");
const PROJECT_ROOT = resolve(PACKAGE_ROOT, "../..");
const REGISTRY_DIR = resolve(PACKAGE_ROOT, "registry");
const OUTPUT_PATH = resolve(PROJECT_ROOT, "apps/docs/public/r/date-range-picker.json");

// All registry file paths (relative to packages/tailwind4/)
const REGISTRY_FILES = [
  "registry/components/DatePicker/Compound.tsx",
  "registry/components/DatePicker/index.tsx",
  "registry/components/DateRangePicker/Compound.tsx",
  "registry/components/DateRangePicker/index.tsx",
  "registry/components/DateRangeTimePicker/Compound.tsx",
  "registry/components/DateRangeTimePicker/index.tsx",
  "registry/components/DateTimePicker/Compound.tsx",
  "registry/components/DateTimePicker/index.tsx",
  "registry/components/TimePicker/Compound.tsx",
  "registry/components/TimePicker/index.tsx",
  "registry/theme.ts",
  "registry/ui-primitives/DatePicker/Root.tsx",
  "registry/ui-primitives/DatePicker/index.ts",
  "registry/ui-primitives/DateRangePicker/Calendars.tsx",
  "registry/ui-primitives/DateRangePicker/PresetItem.tsx",
  "registry/ui-primitives/DateRangePicker/Presets.tsx",
  "registry/ui-primitives/DateRangePicker/Root.tsx",
  "registry/ui-primitives/DateRangePicker/index.ts",
  "registry/ui-primitives/DateRangeTimePicker/EndTimeSection.tsx",
  "registry/ui-primitives/DateRangeTimePicker/Root.tsx",
  "registry/ui-primitives/DateRangeTimePicker/StartTimeSection.tsx",
  "registry/ui-primitives/DateRangeTimePicker/index.ts",
  "registry/ui-primitives/DateTimePicker/Root.tsx",
  "registry/ui-primitives/DateTimePicker/TimeSection.tsx",
  "registry/ui-primitives/DateTimePicker/index.ts",
  "registry/ui-primitives/TimePicker/PeriodToggle.tsx",
  "registry/ui-primitives/TimePicker/Root.tsx",
  "registry/ui-primitives/TimePicker/index.ts",
  "registry/ui-primitives/index.ts",
  "registry/ui-primitives/types.ts",
  "registry/ui-primitives/shared/CancelButton.tsx",
  "registry/ui-primitives/shared/ClearButton.tsx",
  "registry/ui-primitives/shared/ConfirmButton.tsx",
  "registry/ui-primitives/shared/Content.tsx",
  "registry/ui-primitives/shared/Day.tsx",
  "registry/ui-primitives/shared/Footer.tsx",
  "registry/ui-primitives/shared/Grid.tsx",
  "registry/ui-primitives/shared/Header.tsx",
  "registry/ui-primitives/shared/NextButton.tsx",
  "registry/ui-primitives/shared/PrevButton.tsx",
  "registry/ui-primitives/shared/TimePanel.tsx",
  "registry/ui-primitives/shared/Title.tsx",
  "registry/ui-primitives/shared/TodayButton.tsx",
  "registry/ui-primitives/shared/Trigger.tsx",
  "registry/utils.ts",
  "registry/utils/mergeRefs.ts",
];

function buildRegistry() {
  const files = REGISTRY_FILES.map((filePath) => {
    const absolutePath = resolve(PACKAGE_ROOT, filePath);
    const content = readFileSync(absolutePath, "utf8");
    // Map registry/X → components/date-range-picker/X
    const target = filePath.replace(/^registry\//, "components/date-range-picker/");

    return {
      path: filePath,
      content,
      type: "registry:component",
      target,
    };
  });

  const registry = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: "date-range-picker",
    title: "Date Range Picker",
    description: "Compound component date range picker suite.",
    dependencies: [
      "react-date-range-picker-headless",
      "@floating-ui/react",
      "clsx",
      "tailwind-merge",
    ],
    files,
  };

  // Ensure output directory exists
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(registry, null, 2) + "\n", "utf8");

  console.log(`Registry built: ${files.length} files → ${OUTPUT_PATH}`);
}

buildRegistry();

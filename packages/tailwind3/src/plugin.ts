import plugin from "tailwindcss/plugin";

const lightColors: Record<string, string> = {
  "--rdrp-color-primary": "#0ea5e9",
  "--rdrp-color-primary-hover": "#0284c7",
  "--rdrp-color-primary-light": "#f0f9ff",
  "--rdrp-color-primary-lighter": "#f0f9ff",
  "--rdrp-color-primary-disabled": "#7dd3fc",
  "--rdrp-color-bg": "#ffffff",
  "--rdrp-color-bg-hover": "#f1f5f9",
  "--rdrp-color-bg-subtle": "#f8fafc",
  "--rdrp-color-text": "#0f172a",
  "--rdrp-color-text-strong": "#0f172a",
  "--rdrp-color-text-muted": "#64748b",
  "--rdrp-color-text-placeholder": "#64748b",
  "--rdrp-color-text-disabled": "#64748b",
  "--rdrp-color-text-outside": "rgba(100, 116, 139, 0.5)",
  "--rdrp-color-text-inverse": "#ffffff",
  "--rdrp-color-text-danger": "#ef4444",
  "--rdrp-color-text-today": "#0ea5e9",
  "--rdrp-color-border": "#e2e8f0",
  "--rdrp-color-border-light": "#e2e8f0",
  "--rdrp-color-border-subtle": "#e2e8f0",
  "--rdrp-color-border-hover": "rgba(14, 165, 233, 0.5)",
  "--rdrp-color-highlight-dot": "#f59e0b",
  "--rdrp-color-range-bg": "#f0f9ff",
  "--rdrp-color-hover-range-bg": "rgba(240, 249, 255, 0.5)",
  "--rdrp-color-hover-target-bg": "#e0f2fe",
  "--rdrp-color-time-highlight": "rgba(14, 165, 233, 0.1)",
};

const darkColors: Record<string, string> = {
  "--rdrp-color-primary": "#0ea5e9",
  "--rdrp-color-primary-hover": "#0284c7",
  "--rdrp-color-primary-light": "rgba(8, 47, 73, 0.5)",
  "--rdrp-color-primary-lighter": "rgba(8, 47, 73, 0.5)",
  "--rdrp-color-primary-disabled": "#075985",
  "--rdrp-color-bg": "#020617",
  "--rdrp-color-bg-hover": "#1e293b",
  "--rdrp-color-bg-subtle": "#020617",
  "--rdrp-color-text": "#f8fafc",
  "--rdrp-color-text-strong": "#f8fafc",
  "--rdrp-color-text-muted": "#94a3b8",
  "--rdrp-color-text-placeholder": "#94a3b8",
  "--rdrp-color-text-disabled": "#94a3b8",
  "--rdrp-color-text-outside": "rgba(148, 163, 184, 0.5)",
  "--rdrp-color-text-inverse": "#ffffff",
  "--rdrp-color-text-danger": "#ef4444",
  "--rdrp-color-text-today": "#38bdf8",
  "--rdrp-color-border": "#1e293b",
  "--rdrp-color-border-light": "#1e293b",
  "--rdrp-color-border-subtle": "#1e293b",
  "--rdrp-color-border-hover": "rgba(14, 165, 233, 0.5)",
  "--rdrp-color-highlight-dot": "#fbbf24",
  "--rdrp-color-range-bg": "rgba(8, 47, 73, 0.5)",
  "--rdrp-color-hover-range-bg": "rgba(8, 47, 73, 0.3)",
  "--rdrp-color-hover-target-bg": "rgba(12, 74, 110, 0.5)",
  "--rdrp-color-time-highlight": "rgba(14, 165, 233, 0.1)",
};

export const rdrpPlugin = plugin((api) => {
  api.addBase({
    ":root": lightColors,
    ".dark": darkColors,
    '[data-theme="dark"]': darkColors,
    '[data-theme="light"]': lightColors,
    ".rdrp-root": { "color-scheme": "light" },
    ".dark .rdrp-root, .rdrp-root.dark": { "color-scheme": "dark" },
    '[data-theme="dark"] .rdrp-root, .rdrp-root[data-theme="dark"]': {
      "color-scheme": "dark",
    },
    '[data-theme="light"] .rdrp-root, .rdrp-root[data-theme="light"]': {
      "color-scheme": "light",
    },
  });
});

export default rdrpPlugin;

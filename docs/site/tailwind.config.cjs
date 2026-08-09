/** @type {import('tailwindcss').Config} */
// Mirrors frontend/tailwind.config.cjs's gray + semantic + chart scales so
// frontend components imported into the docs render with the same utility
// classes. CSS variables are declared in src/styles/custom.css and should
// stay in sync with the frontend's own equivalent file.
module.exports = {
  content: [
    "./src/**/*.{astro,md,mdx,html,ts,tsx}",
    // Add each kitchen-sink component's source path here so its Tailwind
    // classes get generated in the docs bundle. Astro doesn't scan outside
    // docs/site/ by default.
    "../../frontend/src/components/Badge.tsx",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        gray: {
          50: "rgb(var(--gray-50) / <alpha-value>)",
          100: "rgb(var(--gray-100) / <alpha-value>)",
          200: "rgb(var(--gray-200) / <alpha-value>)",
          300: "rgb(var(--gray-300) / <alpha-value>)",
          400: "rgb(var(--gray-400) / <alpha-value>)",
          500: "rgb(var(--gray-500) / <alpha-value>)",
          600: "rgb(var(--gray-600) / <alpha-value>)",
          700: "rgb(var(--gray-700) / <alpha-value>)",
          800: "rgb(var(--gray-800) / <alpha-value>)",
          900: "rgb(var(--gray-900) / <alpha-value>)",
          950: "rgb(var(--gray-950) / <alpha-value>)",
        },
        // Purpose-named aliases: see frontend/tailwind.config.cjs for docs.
        strong: "rgb(var(--gray-50) / <alpha-value>)",
        primary: "rgb(var(--gray-100) / <alpha-value>)",
        secondary: "rgb(var(--gray-200) / <alpha-value>)",
        default: "rgb(var(--gray-300) / <alpha-value>)",
        label: "rgb(var(--gray-400) / <alpha-value>)",
        muted: "rgb(var(--gray-500) / <alpha-value>)",
        subtle: "rgb(var(--gray-600) / <alpha-value>)",
        divider: "rgb(var(--gray-700) / <alpha-value>)",
        panel: "rgb(var(--gray-800) / <alpha-value>)",
        surface: "rgb(var(--gray-900) / <alpha-value>)",
        page: "rgb(var(--gray-950) / <alpha-value>)",
        semantic: {
          success: "rgb(var(--semantic-success) / <alpha-value>)",
          "success-dark": "rgb(var(--semantic-success-dark) / <alpha-value>)",
          error: "rgb(var(--semantic-error) / <alpha-value>)",
          "error-dark": "rgb(var(--semantic-error-dark) / <alpha-value>)",
          warning: "rgb(var(--semantic-warning) / <alpha-value>)",
          info: "rgb(var(--semantic-info) / <alpha-value>)",
          neutral: "rgb(var(--semantic-neutral) / <alpha-value>)",
        },
        chart: {
          grid: "rgb(var(--chart-grid) / <alpha-value>)",
          axis: "rgb(var(--chart-axis) / <alpha-value>)",
          "tooltip-bg": "rgb(var(--chart-tooltip-bg) / <alpha-value>)",
          "tooltip-border": "rgb(var(--chart-tooltip-border) / <alpha-value>)",
        },
      },
    },
  },
};

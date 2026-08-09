/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        // A single stack applied everywhere is simpler to reason about than
        // a body/heading split; change this if your project needs one.
        mono: ["JetBrains Mono", "Fira Code", "Cascadia Code", "monospace"],
      },
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
        // Purpose-named aliases flatten into Tailwind utilities:
        // `colors.muted` -> `text-muted` / `bg-muted` / `border-muted`.
        //   strong       (gray-50)  pure white, high-emphasis headings
        //   primary      (gray-100) primary text
        //   secondary    (gray-200) strong secondary text
        //   default      (gray-300) body text
        //   label        (gray-400) secondary labels
        //   muted        (gray-500) muted labels
        //   subtle       (gray-600) disabled / decorative
        //   divider      (gray-700) subtle borders
        //   panel        (gray-800) panel backgrounds
        //   surface      (gray-900) surface backgrounds
        //   page         (gray-950) page background
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

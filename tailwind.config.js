/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "surface-0": "var(--c-surface-0)",
        "surface-1": "var(--c-surface-1)",
        "surface-2": "var(--c-surface-2)",
        accent: "var(--c-accent)",
        border: { DEFAULT: "var(--c-border)" },
      },
    },
  },
  plugins: [],
};

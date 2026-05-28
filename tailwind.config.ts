import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          300: "#f5d891",
          400: "#f0c842",
          500: "#d4a017",
          600: "#b8860b",
        },
        cinema: {
          950: "#080808",
          900: "#0f0f0f",
          800: "#1a1a1a",
          700: "#242424",
          600: "#2e2e2e",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #d4a017 0%, #f0c842 50%, #d4a017 100%)",
      },
    },
  },
  plugins: [],
};
export default config;

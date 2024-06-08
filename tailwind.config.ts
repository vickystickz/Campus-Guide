import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "work-sans": ['var(--font-work-sans)'],
        "sora": ['var(--font-sora)'],
      },
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontSize: {
        ph1: ["var(--font-size-primary-h1)", "var(--line-height-primary-h1)"],
        ph2: ["var(--font-size-primary-h2)", "var(--line-height-primary-h2)"],
        sh1: ["var(--font-size-secondary-h1)", "var(--line-height-secondary-h1)"],
        sh2: ["var(--font-size-secondary-h2)", "var(--line-height-secondary-h2)"],
      },
      colors: {
        B: {
          50: "var(--cg-blue-50)",
          75: "var(--cg-blue-75)",
          100: "var(--cg-blue-100)",
          200: "var(--cg-blue-200)",
          300: "var(--cg-blue-300)",
          400: "var(--cg-blue-400)",
          500: "var(--cg-blue-500)",
        },
        P: {
          50: "var(--cg-purple-50)",
          75: "var(--cg-purple-75)",
          100: "var(--cg-purple-100)",
          200: "var(--cg-purple-200)",
          300: "var(--cg-purple-300)",
          400: "var(--cg-purple-400)",
          500: "var(--cg-purple-500)",
        },
        Y: {
          50: "var(--cg-yellow-50)",
          75: "var(--cg-yellow-75)",
          100: "var(--cg-yellow-100)",
          200: "var(--cg-yellow-200)",
          300: "var(--cg-yellow-300)",
          400: "var(--cg-yellow-400)",
          500: "var(--cg-yellow-500)",
        },
        cg: {
          error: "var(--cg-error)",
          success: "var(--cg-success)",
          warning: "var(--cg-warning)",
          info: "var(--cg-info)",
        },
      },
      backgroundImage: {
      },
    },
  },
  plugins: [],
};
export default config;

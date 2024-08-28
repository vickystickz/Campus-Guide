import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./component/**/*.{js,ts,jsx,tsx,mdx}",
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
          // Primary typography
          "p-4xl": ["var(--font-size-primary-h1)", "var(--line-height-primary-h1)"],
          "p-3xl": ["var(--font-size-primary-h2)", "var(--line-height-primary-h2)"],
          "p-2xl": ["var(--font-size-primary-h3)", "var(--line-height-primary-h3)"],
          "p-xl": ["var(--font-size-primary-h4)", "var(--line-height-primary-h4)"],
          "p-lg": ["var(--font-size-primary-h5)", "var(--line-height-primary-h5)"],
          "p-md": ["var(--font-size-primary-p1)", "var(--line-height-primary-p1)"],
          "p-base": ["var(--font-size-primary-p2)", "var(--line-height-primary-p2)"],
          "p-xs": ["var(--font-size-primary-p3)", "var(--line-height-primary-p3)"],
          "p-sm": ["var(--font-size-primary-p4)", "var(--line-height-primary-p4)"], 
          
          // Secondary typography
          "s-4xl": ["var(--font-size-secondary-h1)", "var(--line-height-secondary-h1)"],
          "s-3xl": ["var(--font-size-secondary-h2)", "var(--line-height-secondary-h2)"],
          "s-2xl": ["var(--font-size-secondary-h3)", "var(--line-height-secondary-h3)"],
          "s-xl": ["var(--font-size-secondary-h4)", "var(--line-height-secondary-h4)"],
          "s-lg": ["var(--font-size-secondary-h5)", "var(--line-height-secondary-h5)"],
          "s-md": ["var(--font-size-secondary-p1)", "var(--line-height-secondary-p1)"],
          "s-base": ["var(--font-size-secondary-p2)", "var(--line-height-secondary-p2)"],
          "s-xs": ["var(--font-size-secondary-p3)", "var(--line-height-secondary-p3)"],
          "s-sm": ["var(--font-size-secondary-p4)", "var(--line-height-secondary-p4)"],

        },
      colors: {
        blue: {
          50: "var(--cg-blue-50)",
          75: "var(--cg-blue-75)",
          100: "var(--cg-blue-100)",
          200: "var(--cg-blue-200)",
          300: "var(--cg-blue-300)",
          400: "var(--cg-blue-400)",
          500: "var(--cg-blue-500)",
        },
        purple: {
          50: "var(--cg-purple-50)",
          75: "var(--cg-purple-75)",
          100: "var(--cg-purple-100)",
          200: "var(--cg-purple-200)",
          300: "var(--cg-purple-300)",
          400: "var(--cg-purple-400)",
          500: "var(--cg-purple-500)",
        },
        yellow: {
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
          white: "var(--cg-white)",
          whitedark: "var(--cg-white-dark)"
        },
      },
      backgroundImage: {
        'progress-cover-image': 'url("/bg-cover.svg")',
      },
      boxShadow: {
          icon: "0px 0px 16px 0px #18002C1A",
          btn: "0px 0px 8px 0px #3F2B501A",
          toast: "0px 0px 16px 0px #18002C1A",
          tooltip: "0px 0px 16px 0px #18002C1A",
          modal: "0px 0px 24px 0px #18002C29"
      }
    },
  },
  plugins: [],
};
export default config;

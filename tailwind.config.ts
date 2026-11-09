import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        notion: {
          blue: {
            100: "#f0f7ff",
            200: "#e6f3fe",
            500: "#097fe8",
            600: "#0075de",
            700: "#005bab",
          },
          yellow: {
            100: "#fff5e0",
            200: "#ffe4af",
            500: "#ffb110",
          },
          green: {
            100: "#eaf9ec",
            200: "#d0f4d8",
            500: "#1aae39",
          },
          teal: {
            100: "#f2fafa",
            200: "#bde6e4",
            500: "#27918d",
          },
          orange: {
            100: "#fff5ed",
            200: "#ffdec4",
            500: "#ff6d00",
          },
          purple: {
            100: "#f6effd",
            200: "#eadbfa",
            500: "#9849e8",
          },
          red: {
            100: "#fef3f1",
            200: "#fdd3cd",
            500: "#f64932",
          },
          gray: {
            50: "#fafaf9",
            100: "#f9f9f8",
            200: "#f6f5f4",
            300: "#dfdcd9",
            400: "#a39e98",
            500: "#78736f",
            600: "#615d59",
            700: "#494744",
            800: "#31302e",
            900: "#191918",
          },
        },
      },
      fontFamily: {
        sans: [
          "NotionInter",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;


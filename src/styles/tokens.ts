// Centralized Tatami Design System Tokens extracted from Notion.com

export const tokens = {
  colors: {
    background: "#ffffff",
    foreground: "rgba(0, 0, 0, 0.95)",
    mutedForeground: "rgba(0, 0, 0, 0.54)",
    deckForeground: "rgba(0, 0, 0, 0.90)",
    border: "rgba(0, 0, 0, 0.08)",
    borderHover: "rgba(0, 0, 0, 0.16)",
    cardBackground: "rgb(249, 249, 248)",
    cardBackgroundHover: "rgb(246, 245, 244)",
    surfaceNeutral: "rgb(249, 249, 248)",

    // Tatami Accent Colors
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
  typography: {
    fontFamily:
      'NotionInter, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    heroHeading: {
      fontSize: "clamp(48px, 6.7vw, 96px)",
      lineHeight: "clamp(52px, 7vw, 100px)",
      letterSpacing: "-0.048em",
      fontWeight: 600,
    },
    sectionHeading: {
      fontSize: "clamp(28px, 3.75vw, 54px)",
      lineHeight: "clamp(34px, 4vw, 56px)",
      letterSpacing: "-0.035em",
      fontWeight: 700,
    },
    cardHeading: {
      fontSize: "22px",
      lineHeight: "28px",
      letterSpacing: "-0.25px",
      fontWeight: 700,
    },
    deck: {
      fontSize: "20px",
      lineHeight: "28px",
      fontWeight: 400,
    },
    caption: {
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: 400,
    },
    body: {
      fontSize: "16px",
      lineHeight: "24px",
    },
  },
  radii: {
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "24px",
    full: "9999px",
  },
  layout: {
    maxWidth: "1220px",
    containerPadding: "clamp(16px, 5vw, 96px)",
  },
};


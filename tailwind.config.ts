import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Locked KneedIt palette — see COLORS.md
        primary: "#D1E2F1", // light blue
        secondary: "#8AB0CD", // muted blue
        ink: "#394955", // text + CTA (deep slate)
        accent: {
          pink: "#F5D8E7", // soft pink
          mauve: "#BDA1B0", // mauve
        },
        surface: "#F7FAFD", // near-white tinted background
      },
      fontFamily: {
        heading: ["var(--font-figtree)", "system-ui", "sans-serif"],
        body: ["var(--font-noto-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces
        bg: "#120C08",
        "bg-secondary": "#1A120C",
        surface: "rgba(246,239,232,0.04)",
        "surface-strong": "rgba(246,239,232,0.07)",
        border: "rgba(217,179,106,0.16)",
        "border-strong": "rgba(217,179,106,0.32)",
        // Text
        cream: "#F6EFE8",
        "cream-dim": "rgba(246,239,232,0.62)",
        // Accents
        gold: "#D9B36A",
        "gold-dim": "rgba(217,179,106,0.55)",
        rust: "#C9703F",
        // Class colors
        cocoa: "#7B4F2A",
        chocolate: "#5C3B22",
        green: "#6E8B4E",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      backgroundImage: {
        "gold-rust":
          "linear-gradient(135deg, #D9B36A 0%, #C9703F 100%)",
        "noise":
          "radial-gradient(circle at 50% 0%, rgba(217,179,106,0.08), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(217,179,106,0.18)",
        "glow-rust": "0 0 40px rgba(201,112,63,0.18)",
        card: "0 20px 60px -20px rgba(0,0,0,0.6)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

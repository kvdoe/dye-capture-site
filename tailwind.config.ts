import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05070F",
        cream: "#FFFFFF",
        paper: "#EFF3FA",
        teal: {
          DEFAULT: "#1D4ED8",
          deep: "#101E45",
          soft: "#60A5FA",
          wash: "#DBEAFE",
        },
        clay: {
          DEFAULT: "#475569",
          soft: "#94A3B8",
          wash: "#E2E8F0",
        },
        taupe: "#64748B",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(5,7,15,0.06), 0 20px 48px -24px rgba(29,78,216,0.28)",
        lift: "0 10px 28px rgba(5,7,15,0.1), 0 44px 90px -30px rgba(29,78,216,0.42)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      keyframes: {
        drift: {
          "0%,100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-14px) translateX(6px)" },
        },
        ripple: {
          "0%": { transform: "scale(0.6)", opacity: "0.5" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        drift: "drift 9s ease-in-out infinite",
        ripple: "ripple 5s ease-out infinite",
        shimmer: "shimmer 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

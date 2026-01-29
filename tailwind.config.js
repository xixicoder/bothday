/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // 赛博霓虹系列颜色定义
        neon: {
          cyan: "hsl(180 100% 50%)",
          purple: "hsl(280 100% 60%)",
          pink: "hsl(320 100% 60%)",
          blue: "hsl(220 100% 50%)",
          yellow: "hsl(60 100% 50%)",
        },
      },
      fontFamily: {
        cyber: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      animation: {
        "border-flow": "border-flow 3s infinite linear",
        "scan": "scan 3s linear infinite",
        "pulse-neon": "pulse-neon 2s infinite",
      },
      keyframes: {
        "border-flow": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        "scan": {
          "from": { top: "-100%" },
          "to": { top: "100%" },
        },
      },
    },
  },
  plugins: [],
}
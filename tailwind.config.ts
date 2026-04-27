import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          "JetBrains Mono", "ui-monospace", "SFMono-Regular",
          "Menlo", "Monaco", "Consolas", "monospace",
        ],
      },
      colors: {
        sentinel: {
          bg: "#050814",
          panel: "#070b1c",
        },
      },
    },
  },
  plugins: [],
};

export default config;
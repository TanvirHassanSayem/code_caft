import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
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
      },
      animation: {
        shimmer: "shimmer 2.5s linear infinite",
        // Added animated gradient
        'gradient-x': 'gradient-x 8s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        // Added animated gradient keyframes
        'gradient-x': {
          "0%, 100%": { 'background-position': '0% 50%' },
          "50%": { 'background-position': '100% 50%' },
        },
      },
      // Add this if you want to use bg-[length:200%_200%] utility
      backgroundSize: {
        '200': '200% 200%',
      },
    },
  },
  plugins: [],
};

export default config;

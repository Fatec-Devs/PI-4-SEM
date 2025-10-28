import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "johndeere-green": "#367C2B",
        "johndeere-yellow": "#FFDE00",
        "background-light": "#F7F7F7",
        "background-dark": "#1A1A1A",
        "text-light": "#333333",
        "text-dark": "#E0E0E0",
        "error": "#D32F2F"
      },
      fontFamily: {
        "display": ["Public Sans"]
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

export default config;
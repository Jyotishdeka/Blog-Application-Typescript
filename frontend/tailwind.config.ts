import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "10rem",
    },

    extend: {
      animation: {
        "fade-in": "fadeIn 1s ease-in-out forwards",
        "slide-up": "slideUp 1s ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      colors: {
        primary: "#FFCFB3",
        "primary-dark": "#E78F81",
        secondary: "#B7E0FF",
        body: "#FAF7F0",
      },
    },

    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      Adu: ["Edu AU VIC WA NT Pre", "cursive"]
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
export default config;

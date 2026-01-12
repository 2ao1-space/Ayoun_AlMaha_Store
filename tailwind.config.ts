import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ksa: ["var(--font-ksa)"],
        lifta: ["var(--font-lifta)"],
        lyon: ["var(--font-lyon)"],
      },
      colors: {
        light: "#f9f9f9",
        bglight: "#F5F5F5",
        blueLight: "#449DAD",
        blueDark: "#264466",
        darkBlue: "#243856",
        darkness: "#151515",
      },
    },
  },
  // plugins: [require("tailwindcss-animate")],
} satisfies Config;

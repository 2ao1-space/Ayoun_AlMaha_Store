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
        darkness: "#0B0B0B",
        grayPrimary: "#7B7B7B",
        graySecondary: "#C4C4C4",
        mainColor: "#F5F5F5",
        accentPrimary: "#C6A65D",
        accentSecondary: "#D6C7B0",
        accentThird: "#0F766E",
        // ===========================
        // --Color1: #0A0A0A;
        // --Color2: #1A1A1A;
        // --Color3: #292929;
        // --Color4: #7A7A7A;
        // --Color5: #ABABAB;
        // --Color6: #C4C4C4;
        // --Color7: #F5F5F5;
        // --Color8: #0A2642;
        // --Color9: #0F756D;
        // --Color10: #C6A65D;
        // --Color11: #D5C6AE;
      },
    },
  },
  // plugins: [require("tailwindcss-animate")],
} satisfies Config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        bgHall: "url(/meadow_barn.webp)",
        proposal: "url(/proposal.webp)",
        bgBarn: "url(/thebarn.jpeg)",
      },
      backgroundPosition: {
        centralised: "50% 50%",
        propCentral: "10%",
        propSmCentral: "40% 50%",
      },
      colors: {
        blush: "#325b84",
        lightBlush: "#5e90c3",
      },
      dropShadow: {
        white: "50px 35px 35px rgba(0, 0, 0, 1)",
      },
    },
  },
  plugins: [],
};
export default config;

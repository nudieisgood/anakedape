/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "*.{html,js}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      nunito: ["nunito", "sans-serif"],
    },
    screens: {
      xs: "538px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        textDark: "#212529",
        textMd: "#4d4d4d",
        textLight: "#717171",
        brandPrimary: "#001d3d",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};

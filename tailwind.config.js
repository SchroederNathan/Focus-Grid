/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        text: "#070d13",
        background: "#e0e6f0",
        primary: "#0b357f",
        secondary: "#a3b7ff",
        accent: "#42a7ff",
      },
      fontFamily: {
        lthin: ["Lexend-Thin", "sans-serif"],
        lextralight: ["Lexend-ExtraLight", "sans-serif"],
        llight: ["Lexend-Light", "sans-serif"],
        lregular: ["Lexend-Regular", "sans-serif"],
        lmedium: ["Lexend-Medium", "sans-serif"],
        lsemibold: ["Lexend-SemiBold", "sans-serif"],
        lbold: ["Lexend-Bold", "sans-serif"],
        lextrabold: ["Lexend-ExtraBold", "sans-serif"],
        lblack: ["Lexend-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        text: "#2f3036",
        background: "#faf8ff",
        primary: "#2e4074",
        secondary: "#6A7EA5",
        accent: "#eeedf4",
        "secondary-container": "#dad9e0",
        "on-container": "#7B7E7E",
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
      flexBasis: {
        "1/3": "calc(33.333% - 8px)",
        "1/4": "calc(25% - 8px)",
        "1/2": "calc(50% - 8px)",
      },
    },
  },
  plugins: [],
};

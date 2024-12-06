/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        text: "#070d13",
        background: "#f4f7fb",
        primary: "#0b357f",
        secondary: "#a3b7ff",
        accent: "#42a7ff",
      },
    },
  },
  plugins: [],
};

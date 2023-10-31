/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode:class,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.html",
    "./src/**/*.vue",
    "./src/**/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        global1: "#BA8D5B",
        error_color: "crimson",
      },
    },
  },
  plugins: [],
};

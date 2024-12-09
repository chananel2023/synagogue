/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // קובץ הקוד ש-Tailwind יעקוב אחריו
  ],
  theme: {
    extend: {
      fontFamily: {
        scribble: ["'Rubik Scribble'", "sans-serif"], // הוספת הפונט Rubik Scribble
      },
    },
  },
  plugins: [],
};

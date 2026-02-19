/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { 
    extend: {
      colors: {
        'light-black': '#1a1a1a',
      },
      backgroundColor: {
        'light-black': '#1a1a1a',
      }
    } 
  },
  plugins: [],
}

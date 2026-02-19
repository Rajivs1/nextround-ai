/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { 
    extend: {
      colors: {
        'dark-bg': '#0a0a0a',
        'dark-surface': '#141414',
        'dark-elevated': '#1e1e1e',
        'dark-border': 'rgba(255, 255, 255, 0.06)',
      },
      backgroundColor: {
        'dark-bg': '#0a0a0a',
        'dark-surface': '#141414',
        'dark-elevated': '#1e1e1e',
      },
      borderColor: {
        'dark-border': 'rgba(255, 255, 255, 0.06)',
      },
      boxShadow: {
        'soft': '0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'strong': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        'glow-indigo': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
      },
      animation: {
        'float-slow': 'float-up-down 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'gradient': 'gradient 3s ease infinite',
      },
      backdropBlur: {
        'strong': '20px',
      },
    } 
  },
  plugins: [],
}

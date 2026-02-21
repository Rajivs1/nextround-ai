/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { 
    extend: {
      colors: {
        // Modern Blue & Teal Palette
        'primary': '#3b82f6',        // Blue 500
        'primary-dark': '#2563eb',   // Blue 600
        'primary-light': '#60a5fa',  // Blue 400
        'secondary': '#14b8a6',      // Teal 500
        'secondary-dark': '#0d9488', // Teal 600
        'accent': '#10b981',         // Emerald 500
        'accent-light': '#34d399',   // Emerald 400
        
        // Background colors
        'bg-primary': '#0c1222',     // Deep Navy
        'bg-secondary': '#111827',   // Gray 900
        'bg-tertiary': '#1f2937',    // Gray 800
        'bg-card': '#1e293b',        // Slate 800
        
        // Success, Warning, Error
        'success': '#10b981',        // Emerald 500
        'warning': '#f59e0b',        // Amber 500
        'error': '#ef4444',          // Red 500
      },
      backgroundColor: {
        'primary': '#3b82f6',
        'primary-dark': '#2563eb',
        'secondary': '#14b8a6',
        'bg-primary': '#0c1222',
        'bg-secondary': '#111827',
        'bg-tertiary': '#1f2937',
        'bg-card': '#1e293b',
      },
      borderColor: {
        'primary': '#3b82f6',
        'secondary': '#14b8a6',
        'accent': '#10b981',
      },
      boxShadow: {
        'soft': '0 4px 8px -2px rgba(0, 0, 0, 0.3), 0 0 10px rgba(59, 130, 246, 0.1)',
        'medium': '0 8px 16px -4px rgba(0, 0, 0, 0.4), 0 0 20px rgba(59, 130, 246, 0.15)',
        'strong': '0 20px 40px -8px rgba(0, 0, 0, 0.5), 0 0 30px rgba(59, 130, 246, 0.2)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)',
        'glow-teal': '0 0 20px rgba(20, 184, 166, 0.5), 0 0 40px rgba(20, 184, 166, 0.3)',
        'glow-emerald': '0 0 20px rgba(16, 185, 129, 0.5), 0 0 40px rgba(16, 185, 129, 0.3)',
        'neon': '0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(20, 184, 166, 0.4)',
      },
      animation: {
        'float-slow': 'float-up-down 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'gradient': 'gradient 3s ease infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'rotate-gradient': 'rotate-gradient 8s linear infinite',
        'slide-in-up': 'slide-in-up 0.6s ease-out',
        'bounce-in': 'bounce-in 0.6s ease-out',
      },
      backdropBlur: {
        'strong': '20px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #3b82f6 0%, #14b8a6 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #14b8a6 0%, #10b981 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0c1222 0%, #111827 50%, #1f2937 100%)',
        'gradient-mesh': 'radial-gradient(at 0% 0%, #3b82f6 0%, transparent 50%), radial-gradient(at 100% 100%, #14b8a6 0%, transparent 50%)',
      },
    } 
  },
  plugins: [],
}

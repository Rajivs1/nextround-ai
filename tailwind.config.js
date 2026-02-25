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
        
        // Glass Black Background colors
        'bg-primary': '#000000',     // Pure Black
        'bg-secondary': '#0a0a0a',   // Near Black
        'bg-tertiary': '#141414',    // Dark Gray
        'bg-card': '#1a1a1a',        // Card Background
        'glass-black': 'rgba(0, 0, 0, 0.7)',  // Glass Black
        
        // Success, Warning, Error
        'success': '#10b981',        // Emerald 500
        'warning': '#f59e0b',        // Amber 500
        'error': '#ef4444',          // Red 500
      },
      backgroundColor: {
        'primary': '#3b82f6',
        'primary-dark': '#2563eb',
        'secondary': '#14b8a6',
        'bg-primary': '#000000',
        'bg-secondary': '#0a0a0a',
        'bg-tertiary': '#141414',
        'bg-card': '#1a1a1a',
        'glass-black': 'rgba(0, 0, 0, 0.7)',
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
        'spinGrowUp': 'spinGrowUp 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'shootingStar': 'shootingStar 3s ease-in infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'progressBar': 'progressBar 2s ease-in-out infinite',
        'spin-reverse': 'spin-reverse 20s linear infinite',
        'spin-slower': 'spin-slower 30s linear infinite',
        'gradient-text': 'gradient-text 3s ease infinite',
      },
      keyframes: {
        spinGrowUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(100px) scale(0.2) rotate(0deg)',
          },
          '50%': {
            opacity: '1',
            transform: 'translateY(0) scale(1.1) rotate(360deg)',
          },
          '70%': {
            transform: 'translateY(-10px) scale(0.95) rotate(360deg)',
          },
          '85%': {
            transform: 'translateY(5px) scale(1.02) rotate(360deg)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1) rotate(360deg)',
          },
        },
      },
      backdropBlur: {
        'strong': '20px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #3b82f6 0%, #14b8a6 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #14b8a6 0%, #10b981 100%)',
        'gradient-dark': 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #141414 100%)',
        'gradient-mesh': 'radial-gradient(at 0% 0%, #3b82f6 0%, transparent 50%), radial-gradient(at 100% 100%, #14b8a6 0%, transparent 50%)',
        'glass-black': 'rgba(0, 0, 0, 0.7)',
      },
    } 
  },
  plugins: [],
}

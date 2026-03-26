/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { 
    extend: {
      colors: {
        // Unacademy-inspired Purple Palette
        'primary': '#8c52ff',        // Unacademy Purple
        'primary-dark': '#7340d9',   // Darker Purple
        'primary-light': '#a370ff',  // Lighter Purple
        'secondary': '#08bd80',      // Unacademy Green
        'secondary-dark': '#06a06d', // Darker Green
        'accent': '#ff5757',         // Accent Red
        'accent-light': '#ff7b7b',   // Lighter Red
        
        // Background colors - Clean & Professional
        'bg-primary': '#ffffff',     // White
        'bg-secondary': '#f7f8fa',   // Light Gray
        'bg-tertiary': '#f0f2f5',    // Lighter Gray
        'bg-card': '#ffffff',        // Card Background
        'bg-dark': '#1c1d1f',        // Dark mode background
        
        // Success, Warning, Error
        'success': '#08bd80',        // Green
        'warning': '#ffb800',        // Yellow
        'error': '#ff5757',          // Red
      },
      backgroundColor: {
        'primary': '#8c52ff',
        'primary-dark': '#7340d9',
        'secondary': '#08bd80',
        'bg-primary': '#ffffff',
        'bg-secondary': '#f7f8fa',
        'bg-tertiary': '#f0f2f5',
        'bg-card': '#ffffff',
        'bg-dark': '#1c1d1f',
      },
      borderColor: {
        'primary': '#8c52ff',
        'secondary': '#08bd80',
        'accent': '#ff5757',
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

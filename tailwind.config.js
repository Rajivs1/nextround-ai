/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { 
    extend: {
      colors: {
        // Modern Teal & Cyan Palette
        'primary': '#06b6d4',        // Cyan 500
        'primary-dark': '#0891b2',   // Cyan 600
        'primary-light': '#22d3ee',  // Cyan 400
        'secondary': '#8b5cf6',      // Violet 500
        'secondary-dark': '#7c3aed', // Violet 600
        'accent': '#f59e0b',         // Amber 500
        'accent-light': '#fbbf24',   // Amber 400
        
        // Background colors
        'bg-primary': '#0f172a',     // Slate 900
        'bg-secondary': '#1e1b4b',   // Indigo 950
        'bg-tertiary': '#1f2937',    // Gray 800
        'bg-card': '#1e293b',        // Slate 800
        
        // Success, Warning, Error
        'success': '#10b981',        // Emerald 500
        'warning': '#f59e0b',        // Amber 500
        'error': '#ef4444',          // Red 500
      },
      backgroundColor: {
        'primary': '#06b6d4',
        'primary-dark': '#0891b2',
        'secondary': '#8b5cf6',
        'bg-primary': '#0f172a',
        'bg-secondary': '#1e1b4b',
        'bg-tertiary': '#1f2937',
        'bg-card': '#1e293b',
      },
      borderColor: {
        'primary': '#06b6d4',
        'secondary': '#8b5cf6',
        'accent': '#f59e0b',
      },
      boxShadow: {
        'soft': '0 4px 8px -2px rgba(0, 0, 0, 0.3), 0 0 10px rgba(6, 182, 212, 0.1)',
        'medium': '0 8px 16px -4px rgba(0, 0, 0, 0.4), 0 0 20px rgba(6, 182, 212, 0.15)',
        'strong': '0 20px 40px -8px rgba(0, 0, 0, 0.5), 0 0 30px rgba(6, 182, 212, 0.2)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.5), 0 0 40px rgba(6, 182, 212, 0.3)',
        'glow-violet': '0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)',
        'glow-amber': '0 0 20px rgba(245, 158, 11, 0.5), 0 0 40px rgba(245, 158, 11, 0.3)',
        'neon': '0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(139, 92, 246, 0.4)',
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
        'gradient-primary': 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #1f2937 100%)',
        'gradient-mesh': 'radial-gradient(at 0% 0%, #06b6d4 0%, transparent 50%), radial-gradient(at 100% 100%, #8b5cf6 0%, transparent 50%)',
      },
    } 
  },
  plugins: [],
}

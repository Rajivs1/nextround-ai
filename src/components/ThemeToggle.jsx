import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`group relative px-3 sm:px-4 py-2 sm:py-3 border border-gray-600 rounded-xl text-gray-300 hover:border-gray-400 hover:text-white transition-all duration-300 text-sm sm:text-base flex items-center gap-2 overflow-hidden ${className}`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Icon with animation */}
      <span className="relative z-10 text-xl transition-transform duration-300 group-hover:scale-110">
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
      
      {/* Text */}
      <span className="relative z-10 hidden sm:inline font-semibold">
        {theme === 'dark' ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}





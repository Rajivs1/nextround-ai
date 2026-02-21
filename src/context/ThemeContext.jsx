import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to 'dark'
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });

  useEffect(() => {
    // Apply theme to both html and body elements
    const root = document.documentElement;
    const body = document.body;
    
    // Remove both classes first
    root.classList.remove('light', 'dark');
    body.classList.remove('light', 'dark');
    
    // Add the current theme class
    root.classList.add(theme);
    body.classList.add(theme);
    
    // Also set data attribute for more specific targeting
    root.setAttribute('data-theme', theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    console.log('Theme changed to:', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      console.log('Toggling theme from', prev, 'to', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  // Check if user has already set a theme preference
  const savedTheme = localStorage.getItem('theme') as Theme | null;
  
  // Check if user prefers dark mode
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Set initial theme based on saved preference or system preference
  const [theme, setTheme] = useState<Theme>(
    savedTheme || (prefersDarkMode ? 'dark' : 'light')
  );

  // Update local storage when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}
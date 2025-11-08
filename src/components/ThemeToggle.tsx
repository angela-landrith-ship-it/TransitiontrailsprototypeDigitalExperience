/**
 * THEME TOGGLE BUTTON
 * 
 * Animated toggle button for switching between light and dark mode.
 * Features smooth transitions and visual feedback.
 */

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 group"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Sun Icon (Light Mode) */}
      <Sun 
        className={`absolute w-5 h-5 text-amber-500 transition-all duration-300 ${
          theme === 'light' 
            ? 'rotate-0 scale-100 opacity-100' 
            : 'rotate-90 scale-0 opacity-0'
        }`}
      />
      
      {/* Moon Icon (Dark Mode) */}
      <Moon 
        className={`absolute w-5 h-5 text-blue-400 transition-all duration-300 ${
          theme === 'dark' 
            ? 'rotate-0 scale-100 opacity-100' 
            : '-rotate-90 scale-0 opacity-0'
        }`}
      />
      
      {/* Ripple effect on hover */}
      <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
}

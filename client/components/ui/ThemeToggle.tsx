'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { IconButton } from './IconButton';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
}) => {
  const isDark = theme === 'dark';

  return (
    <IconButton
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative w-10 h-10"
    >
      <span
        className={`
          absolute inset-0 flex items-center justify-center
          transition-all duration-300
          ${isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}
        `}
      >
        <Sun className="w-5 h-5 text-amber-500" />
      </span>
      <span
        className={`
          absolute inset-0 flex items-center justify-center
          transition-all duration-300
          ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}
        `}
      >
        <Moon className="w-5 h-5 text-violet-400" />
      </span>
    </IconButton>
  );
};

ThemeToggle.displayName = 'ThemeToggle';

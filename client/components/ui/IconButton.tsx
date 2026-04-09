'use client';

import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'ghost';
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500';

  const variantStyles = {
    default: 'p-2 hover:bg-gray-100 dark:hover:bg-violet-900/30 active:bg-gray-200 dark:active:bg-violet-900/50',
    ghost: 'p-2 hover:bg-transparent active:bg-transparent',
  };

  return (
    <button
      type="button"
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

IconButton.displayName = 'IconButton';

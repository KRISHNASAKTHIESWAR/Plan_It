'use client';

import React from 'react';

interface BindingDecorationProps {
  ringCount?: number;
}

export const BindingDecoration: React.FC<BindingDecorationProps> = ({
  ringCount = 12,
}) => {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6 py-4 bg-[#2a2a2a] dark:bg-black/40 rounded-t-lg">
      {Array.from({ length: ringCount }).map((_, i) => (
        <div
          key={i}
          className="relative"
        >
          {/* Ring hole */}
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#1a1a1a] dark:bg-[#0a0a0a] shadow-inner" />
          {/* Ring shadow for depth */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />
        </div>
      ))}
    </div>
  );
};

BindingDecoration.displayName = 'BindingDecoration';

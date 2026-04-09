'use client';

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { getMonthImage, getMonthImageAlt } from '@/lib/images';
import { getMonthName } from '@/lib/dateUtils';

interface HeroImageProps {
  monthIndex: number;
}

export const HeroImage: React.FC<HeroImageProps> = ({ monthIndex }) => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [visibleMonth, setVisibleMonth] = useState(monthIndex);

  // Update visible month when prop changes (triggers CSS transition)
  React.useLayoutEffect(() => {
    if (monthIndex !== visibleMonth) {
      // Small delay to allow CSS transition
      const timer = setTimeout(() => {
        setVisibleMonth(monthIndex);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [monthIndex, visibleMonth]);

  const handleImageLoad = useCallback(() => {
    setLoadedImages(prev => new Set([...prev, visibleMonth]));
  }, [visibleMonth]);

  const isLoaded = loadedImages.has(visibleMonth);

  const monthName = getMonthName(visibleMonth);
  const imageSrc = getMonthImage(visibleMonth);
  const imageAlt = getMonthImageAlt(visibleMonth);

  return (
    <div className="relative w-full h-48 sm:h-60 lg:h-72 overflow-hidden rounded-lg bg-surface">
      {/* Loading skeleton */}
      <div
        className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 transition-opacity duration-300 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Image */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          onLoad={handleImageLoad}
          sizes="(max-width: 768px) 100vw, 40vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Month name overlay */}
      <div className="absolute bottom-0 left-0 p-4 sm:p-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg tracking-tight">
          {monthName}
        </h2>
      </div>
    </div>
  );
};

HeroImage.displayName = 'HeroImage';

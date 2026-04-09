'use client';

import React, { useMemo, useCallback, useRef } from 'react';
import type { DateRange } from '@/types';
import { getCalendarDays, getDayNames, formatDateKey } from '@/lib/dateUtils';
import { getHoliday } from '@/lib/holidays';
import { DateCell } from './DateCell';

interface CalendarGridProps {
  year: number;
  month: number;
  selectedRange: DateRange;
  onDateClick: (date: Date) => void;
  isAnimating?: boolean;
  animationDirection?: 'prev' | 'next';
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  year,
  month,
  selectedRange,
  onDateClick,
  isAnimating = false,
  animationDirection = 'next',
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  // Memoize calendar days
  const days = useMemo(() => {
    const baseDays = getCalendarDays(year, month);
    return baseDays.map(day => ({
      ...day,
      holiday: getHoliday(formatDateKey(day.date)),
    }));
  }, [year, month]);

  const dayNames = useMemo(() => getDayNames(), []);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent, date: Date) => {
    const currentDate = date;
    let newDate: Date | null = null;

    switch (e.key) {
      case 'ArrowLeft':
        newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 1);
        break;
      case 'ArrowRight':
        newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 1);
        break;
      case 'ArrowUp':
        newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 7);
        break;
      case 'ArrowDown':
        newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 7);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onDateClick(date);
        return;
    }

    if (newDate) {
      e.preventDefault();
      const cell = gridRef.current?.querySelector(`[data-date="${formatDateKey(newDate)}"]`);
      if (cell) {
        (cell as HTMLElement).focus();
      }
    }
  }, [onDateClick]);

  // Animation classes
  const animationClass = isAnimating
    ? animationDirection === 'next'
      ? 'animate-flip-out'
      : 'animate-flip-out'
    : 'animate-flip-in';

  return (
    <div
      ref={gridRef}
      className={`w-full ${animationClass}`}
      style={{ perspective: '800px' }}
    >
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {dayNames.map((dayName, i) => (
          <div
            key={dayName}
            className={`text-center text-xs sm:text-sm font-semibold py-2 ${
              i >= 5
                ? 'text-pink-500 dark:text-pink-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <DateCell
            key={`${year}-${month}-${index}`}
            day={day}
            selectedRange={selectedRange}
            onClick={onDateClick}
            onKeyDown={handleKeyDown}
            tabIndex={index === 0 ? 0 : -1}
          />
        ))}
      </div>
    </div>
  );
};

CalendarGrid.displayName = 'CalendarGrid';

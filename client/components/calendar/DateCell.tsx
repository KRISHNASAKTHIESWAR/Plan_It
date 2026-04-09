'use client';

import React, { useCallback } from 'react';
import type { CalendarDay } from '@/types';
import { isInRange, isRangeStart, isRangeEnd } from '@/lib/dateUtils';
import { getHoliday } from '@/lib/holidays';
import { formatDateKey } from '@/lib/dateUtils';

interface DateCellProps {
  day: CalendarDay;
  selectedRange: { start: Date | null; end: Date | null };
  onClick: (date: Date) => void;
  onKeyDown?: (e: React.KeyboardEvent, date: Date) => void;
  tabIndex?: number;
}

export const DateCell = React.memo<DateCellProps>(({
  day,
  selectedRange,
  onClick,
  onKeyDown,
  tabIndex,
}) => {
  const { date, isCurrentMonth, isToday } = day;
  const dayOfWeek = date.getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const holiday = getHoliday(formatDateKey(date));

  const isStart = isRangeStart(date, selectedRange.start, selectedRange.end);
  const isEnd = isRangeEnd(date, selectedRange.start, selectedRange.end);
  const inRange = isInRange(date, selectedRange.start, selectedRange.end);
  const isSingleDate = isStart && isEnd;

  const handleClick = useCallback(() => {
    onClick(date);
  }, [date, onClick]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    onKeyDown?.(e, date);
  }, [date, onKeyDown]);

  // Base classes
  const baseClasses = 'relative flex items-center justify-center h-10 sm:h-12 w-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-inset';

  // Determine cell styling based on state
  let stateClasses = '';

  if (isSingleDate) {
    // Single date selection - full primary circle
    stateClasses = 'bg-violet-600 text-white rounded-full dark:bg-violet-500';
  } else if (isStart) {
    // Range start - full primary circle
    stateClasses = 'bg-violet-600 text-white rounded-full dark:bg-violet-500';
  } else if (isEnd) {
    // Range end - full accent circle
    stateClasses = 'bg-pink-500 text-white rounded-full dark:bg-pink-400';
  } else if (inRange) {
    // In range - light tint strip
    stateClasses = 'bg-violet-100 dark:bg-violet-900/40';
  } else if (isCurrentMonth) {
    // Current month, not selected
    if (isWeekend) {
      stateClasses = 'text-pink-500 dark:text-pink-400 hover:bg-violet-50 dark:hover:bg-violet-900/20';
    } else {
      stateClasses = 'text-indigo-950 dark:text-indigo-100 hover:bg-violet-50 dark:hover:bg-violet-900/20';
    }
  } else {
    // Other month
    stateClasses = 'text-gray-400 dark:text-gray-500';
  }

  // Today indicator
  const todayClasses = isToday && !isStart && !isEnd && !isSingleDate
    ? 'ring-2 ring-violet-600 dark:ring-violet-400'
    : '';

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={tabIndex}
      className={`${baseClasses} ${stateClasses} ${todayClasses}`}
      aria-pressed={isStart || isEnd || inRange}
      aria-label={date.toDateString()}
      data-date={formatDateKey(date)}
    >
      <span>{date.getDate()}</span>
      {/* Holiday indicator dot */}
      {holiday && isCurrentMonth && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-pink-500 dark:bg-pink-400" title={holiday.name} />
      )}
    </button>
  );
});

DateCell.displayName = 'DateCell';

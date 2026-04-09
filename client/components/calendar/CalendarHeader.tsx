'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { getMonthName } from '@/lib/dateUtils';
import { IconButton } from '@/components/ui/IconButton';

interface CalendarHeaderProps {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  onPrevMonth,
  onNextMonth,
  onToday,
}) => {
  const monthName = getMonthName(currentMonth.getMonth());
  const year = currentMonth.getFullYear();

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <h3 className="text-xl sm:text-2xl font-semibold text-text">
          {monthName}{' '}
          <span className="text-text-muted font-normal">{year}</span>
        </h3>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <IconButton
          onClick={onToday}
          aria-label="Go to today"
          title="Today"
          className="hidden sm:flex items-center gap-1 px-3"
        >
          <CalendarDays className="w-4 h-4" />
          <span className="text-sm">Today</span>
        </IconButton>

        <IconButton
          onClick={onPrevMonth}
          aria-label="Previous month"
          title="Previous month"
        >
          <ChevronLeft className="w-5 h-5" />
        </IconButton>

        <IconButton
          onClick={onNextMonth}
          aria-label="Next month"
          title="Next month"
        >
          <ChevronRight className="w-5 h-5" />
        </IconButton>
      </div>
    </div>
  );
};

CalendarHeader.displayName = 'CalendarHeader';

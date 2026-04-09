'use client';

import React from 'react';
import { getCalendarDays, getMonthName, formatDateKey } from '@/lib/dateUtils';
import { getHoliday } from '@/lib/holidays';
import type { CalendarDay } from '@/types';

interface MonthMiniPreviewProps {
  year: number;
  month: number;
  label: string;
}

export const MonthMiniPreview: React.FC<MonthMiniPreviewProps> = ({
  year,
  month,
  label,
}) => {
  const days = React.useMemo(() => {
    const baseDays = getCalendarDays(year, month);
    return baseDays.map(day => ({
      ...day,
      holiday: getHoliday(formatDateKey(day.date)),
    }));
  }, [year, month]);

  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="bg-surface/50 dark:bg-surface/30 rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-text-muted">{label}</span>
        <span className="text-xs text-text-muted">
          {getMonthName(month).slice(0, 3)} {year}
        </span>
      </div>

      {/* Week headers */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekDays.map((day, i) => (
          <div
            key={i}
            className="text-center text-[10px] text-text-muted font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Mini grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => (
          <MiniDayCell key={i} day={day} />
        ))}
      </div>
    </div>
  );
};

const MiniDayCell: React.FC<{ day: CalendarDay }> = ({ day }) => {
  const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6;

  return (
    <div
      className={`
        aspect-square flex items-center justify-center
        text-[9px] rounded-sm
        ${day.isCurrentMonth
          ? isWeekend
            ? 'text-accent'
            : 'text-text'
          : 'text-text-muted/50'
        }
        ${day.isToday ? 'bg-primary/20 font-bold' : ''}
        ${day.holiday ? 'relative after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:rounded-full after:bg-accent' : ''}
      `}
    >
      {day.date.getDate()}
    </div>
  );
};

MonthMiniPreview.displayName = 'MonthMiniPreview';

'use client';

import React, { useMemo } from 'react';
import { getHolidaysForMonth } from '@/lib/holidays';
import { Flag } from 'lucide-react';

interface HolidaysPanelProps {
  year: number;
  month: number;
}

export const HolidaysPanel: React.FC<HolidaysPanelProps> = ({
  year,
  month,
}) => {
  const holidays = useMemo(() => {
    return getHolidaysForMonth(year, month);
  }, [year, month]);

  if (holidays.length === 0) {
    return null;
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.getDate();
  };

  return (
    <div className="bg-surface/50 dark:bg-surface/30 rounded-lg p-4 border border-violet-100 dark:border-violet-900/30">
      <div className="flex items-center gap-2 mb-3">
        <Flag className="w-4 h-4 text-violet-500" />
        <h4 className="text-sm font-semibold text-text">Important Dates</h4>
      </div>
      <ul className="space-y-2">
        {holidays.map((holiday) => (
          <li
            key={holiday.date}
            className="flex items-center gap-3 text-sm"
          >
            <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 font-semibold text-xs">
              {formatDate(holiday.date)}
            </span>
            <span className="text-text">{holiday.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

HolidaysPanel.displayName = 'HolidaysPanel';

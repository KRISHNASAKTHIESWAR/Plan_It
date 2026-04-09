'use client';

import { useState, useCallback } from 'react';
import type { DateRange } from '@/types';

export function useDateRange() {
  const [range, setRange] = useState<DateRange>({ start: null, end: null });

  const handleDateClick = useCallback((date: Date) => {
    setRange(prev => {
      // No selection - set start
      if (!prev.start) {
        return { start: date, end: null };
      }

      // Start set but no end - set end
      if (!prev.end) {
        // If clicking the same date, keep it as single date selection
        if (prev.start.getTime() === date.getTime()) {
          return { start: date, end: date };
        }
        return { start: prev.start, end: date };
      }

      // Both start and end set - reset and start new selection
      return { start: date, end: null };
    });
  }, []);

  const clearSelection = useCallback(() => {
    setRange({ start: null, end: null });
  }, []);

  const setStartDate = useCallback((date: Date | null) => {
    setRange(prev => ({ ...prev, start: date }));
  }, []);

  const setEndDate = useCallback((date: Date | null) => {
    setRange(prev => ({ ...prev, end: date }));
  }, []);

  const getSortedRange = useCallback((): DateRange => {
    if (!range.start || !range.end) return range;

    const startTime = range.start.getTime();
    const endTime = range.end.getTime();

    if (startTime > endTime) {
      return { start: range.end, end: range.start };
    }

    return range;
  }, [range]);

  const hasSelection = !!range.start;
  const hasRange = !!range.start && !!range.end;

  return {
    range,
    sortedRange: getSortedRange(),
    hasSelection,
    hasRange,
    handleDateClick,
    clearSelection,
    setStartDate,
    setEndDate,
    setRange,
  };
}

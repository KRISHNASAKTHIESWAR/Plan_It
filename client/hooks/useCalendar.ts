'use client';

import { useState, useCallback } from 'react';
import { addMonths } from '@/lib/dateUtils';

export function useCalendar(initialDate: Date = new Date()) {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(initialDate.getFullYear(), initialDate.getMonth(), 1)
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'prev' | 'next'>('next');

  const goToPrevMonth = useCallback(() => {
    setAnimationDirection('prev');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentMonth(prev => addMonths(prev, -1));
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  }, []);

  const goToNextMonth = useCallback(() => {
    setAnimationDirection('next');
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentMonth(prev => addMonths(prev, 1));
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  }, []);

  const goToMonth = useCallback((date: Date) => {
    const newMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const current = currentMonth;

    if (newMonth < current) {
      setAnimationDirection('prev');
    } else if (newMonth > current) {
      setAnimationDirection('next');
    } else {
      return;
    }

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentMonth(newMonth);
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  }, [currentMonth]);

  const goToToday = useCallback(() => {
    const today = new Date();
    goToMonth(today);
  }, [goToMonth]);

  return {
    currentMonth,
    isAnimating,
    animationDirection,
    goToPrevMonth,
    goToNextMonth,
    goToMonth,
    goToToday,
  };
}

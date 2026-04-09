import type { CalendarDay } from '@/types';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const SHORT_MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function getMonthName(monthIndex: number): string {
  return MONTH_NAMES[monthIndex];
}

export function getShortMonthName(monthIndex: number): string {
  return SHORT_MONTH_NAMES[monthIndex];
}

export function getDayNames(): string[] {
  return DAY_NAMES;
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  // Returns 0 for Monday, 6 for Sunday
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatRangeKey(start: Date, end: Date): string {
  return `${formatDateKey(start)}:${formatDateKey(end)}`;
}

export function isInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false;
  const time = date.getTime();
  const startTime = start.getTime();
  const endTime = end.getTime();
  return time > Math.min(startTime, endTime) && time < Math.max(startTime, endTime);
}

export function isRangeStart(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start) return false;
  const actualStart = end && end < start ? end : start;
  return isSameDay(date, actualStart);
}

export function isRangeEnd(date: Date, start: Date | null, end: Date | null): boolean {
  if (!end) return false;
  const actualEnd = start && end < start ? start : end;
  return isSameDay(date, actualEnd);
}

export function getCalendarDays(year: number, month: number): CalendarDay[] {
  const days: CalendarDay[] = [];
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Previous month padding
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  for (let i = firstDay - 1; i >= 0; i--) {
    const date = new Date(prevYear, prevMonth, daysInPrevMonth - i);
    days.push({
      date,
      isCurrentMonth: false,
      isToday: isToday(date),
      holiday: null,
    });
  }

  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    days.push({
      date,
      isCurrentMonth: true,
      isToday: isToday(date),
      holiday: null,
    });
  }

  // Next month padding (to fill 6 rows = 42 cells)
  const remainingCells = 42 - days.length;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  for (let i = 1; i <= remainingCells; i++) {
    const date = new Date(nextYear, nextMonth, i);
    days.push({
      date,
      isCurrentMonth: false,
      isToday: isToday(date),
      holiday: null,
    });
  }

  return days;
}

export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function formatDateRangeLabel(start: Date | null, end: Date | null): string {
  if (!start) return 'Select a date range to add notes';
  if (!end) {
    return `Notes for ${getShortMonthName(start.getMonth())} ${start.getDate()}`;
  }
  const actualStart = end < start ? end : start;
  const actualEnd = end < start ? start : end;

  if (isSameDay(actualStart, actualEnd)) {
    return `Notes for ${getShortMonthName(actualStart.getMonth())} ${actualStart.getDate()}`;
  }

  if (actualStart.getMonth() === actualEnd.getMonth()) {
    return `Notes for ${getShortMonthName(actualStart.getMonth())} ${actualStart.getDate()} – ${actualEnd.getDate()}`;
  }

  return `Notes for ${getShortMonthName(actualStart.getMonth())} ${actualStart.getDate()} – ${getShortMonthName(actualEnd.getMonth())} ${actualEnd.getDate()}`;
}

export function clampDateToRange(date: Date, min: Date, max: Date): Date {
  const time = date.getTime();
  const minTime = min.getTime();
  const maxTime = max.getTime();

  if (time < minTime) return new Date(minTime);
  if (time > maxTime) return new Date(maxTime);
  return new Date(date);
}

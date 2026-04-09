import type { Holiday } from '@/types';

// Indian Public Holidays 2024-2026
const HOLIDAYS: Record<string, string> = {
  // 2024
  '2024-01-26': 'Republic Day',
  '2024-03-25': 'Holi',
  '2024-04-14': 'Dr. Ambedkar Jayanti',
  '2024-08-15': 'Independence Day',
  '2024-10-02': 'Gandhi Jayanti',
  '2024-10-12': 'Dussehra',
  '2024-11-01': 'Diwali (Lakshmi Puja)',
  '2024-11-02': 'Diwali',
  '2024-12-25': 'Christmas',

  // 2025
  '2025-01-26': 'Republic Day',
  '2025-03-14': 'Holi',
  '2025-04-14': 'Dr. Ambedkar Jayanti',
  '2025-08-15': 'Independence Day',
  '2025-10-02': 'Gandhi Jayanti / Dussehra',
  '2025-10-20': 'Diwali',
  '2025-11-05': 'Diwali (Lakshmi Puja)',
  '2025-12-25': 'Christmas',

  // 2026
  '2026-01-26': 'Republic Day',
  '2026-03-04': 'Holi',
  '2026-04-14': 'Dr. Ambedkar Jayanti',
  '2026-08-15': 'Independence Day',
  '2026-10-02': 'Gandhi Jayanti',
  '2026-10-22': 'Dussehra',
  '2026-11-08': 'Diwali',
  '2026-11-09': 'Diwali (Lakshmi Puja)',
  '2026-12-25': 'Christmas',
};

export function getHoliday(dateKey: string): Holiday | null {
  const name = HOLIDAYS[dateKey];
  if (!name) return null;
  return { date: dateKey, name };
}

export function getAllHolidays(): Holiday[] {
  return Object.entries(HOLIDAYS).map(([date, name]) => ({ date, name }));
}

export function getHolidaysForMonth(year: number, month: number): Holiday[] {
  const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
  return Object.entries(HOLIDAYS)
    .filter(([date]) => date.startsWith(prefix))
    .map(([date, name]) => ({ date, name }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

import { getMonthName } from './dateUtils';

// Local month images stored in /public/months/
const MONTH_IMAGES: Record<number, string> = {
  0: '/months/january.svg',
  1: '/months/february.svg',
  2: '/months/march.svg',
  3: '/months/april.svg',
  4: '/months/may.svg',
  5: '/months/june.svg',
  6: '/months/july.svg',
  7: '/months/august.svg',
  8: '/months/september.svg',
  9: '/months/october.svg',
  10: '/months/november.svg',
  11: '/months/december.svg',
};

export function getMonthImage(monthIndex: number): string {
  return MONTH_IMAGES[monthIndex] || '/months/default.svg';
}

export function getMonthImageAlt(monthIndex: number): string {
  const monthName = getMonthName(monthIndex);
  return `${monthName} landscape scenery`;
}

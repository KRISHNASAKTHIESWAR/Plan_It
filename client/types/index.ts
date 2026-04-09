export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export type MoodTag = 'Vacation' | 'Work' | 'Event' | 'Focus' | 'Rest';

export interface MoodTagConfig {
  label: string;
  icon: string;
  bgColor: string;
  bgColorDark: string;
}

export const MOOD_TAG_CONFIG: Record<MoodTag, MoodTagConfig> = {
  Vacation: { label: 'Vacation', icon: 'V', bgColor: 'bg-cyan-100', bgColorDark: 'dark:bg-cyan-900' },
  Work: { label: 'Work', icon: 'W', bgColor: 'bg-blue-100', bgColorDark: 'dark:bg-blue-900' },
  Event: { label: 'Event', icon: 'E', bgColor: 'bg-pink-100', bgColorDark: 'dark:bg-pink-900' },
  Focus: { label: 'Focus', icon: 'F', bgColor: 'bg-amber-100', bgColorDark: 'dark:bg-amber-900' },
  Rest: { label: 'Rest', icon: 'R', bgColor: 'bg-emerald-100', bgColorDark: 'dark:bg-emerald-900' },
};

export interface Note {
  id: string;
  content: string;
  moodTags: MoodTag[];
  createdAt: Date;
  updatedAt: Date;
}

export interface NotesData {
  [rangeKey: string]: Note;
}

export interface CalendarState {
  currentMonth: Date;
  selectedRange: DateRange;
  notes: NotesData;
}

export interface Holiday {
  date: string; // Format: "YYYY-MM-DD"
  name: string;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  holiday: Holiday | null;
}

export type Theme = 'light' | 'dark' | 'system';

export interface ThemeState {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
}

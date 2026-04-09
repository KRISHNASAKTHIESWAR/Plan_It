'use client';

import React, { useCallback, useEffect } from 'react';
import { Printer, Keyboard } from 'lucide-react';
import { useCalendar } from '@/hooks/useCalendar';
import { useDateRange } from '@/hooks/useDateRange';
import { useNotes } from '@/hooks/useNotes';
import { useTheme } from '@/hooks/useTheme';
import { BindingDecoration } from './BindingDecoration';
import { HeroImage } from './HeroImage';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { MonthMiniPreview } from './MonthMiniPreview';
import { HolidaysPanel } from './HolidaysPanel';
import { NotesPanel } from '@/components/notes/NotesPanel';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { IconButton } from '@/components/ui/IconButton';
import { addMonths } from '@/lib/dateUtils';

export const CalendarApp: React.FC = () => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const {
    currentMonth,
    isAnimating,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
  } = useCalendar();

  const {
    range,
    sortedRange,
    handleDateClick,
    clearSelection,
  } = useDateRange();

  const {
    getNoteForRange,
    saveNote,
    deleteNote,
  } = useNotes();

  const currentNote = getNoteForRange(sortedRange);

  // Create wrapped callbacks that include the range
  const handleSaveNote = useCallback((content: string, tags: unknown[]) => {
    saveNote(sortedRange, content, tags as import('@/types').MoodTag[]);
  }, [saveNote, sortedRange]);

  const handleDeleteNote = useCallback(() => {
    deleteNote(sortedRange);
  }, [deleteNote, sortedRange]);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  // Global escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearSelection();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [clearSelection]);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // Calculate prev/next month for mini previews
  const prevMonthDate = addMonths(currentMonth, -1);
  const nextMonthDate = addMonths(currentMonth, 1);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header bar */}
      <header className="no-print bg-surface border-b border-violet-100 dark:border-violet-900/30 px-4 py-3 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-text flex items-center gap-2">
            <span className="text-violet-600 dark:text-violet-400 font-serif italic">Plan</span>
            <span className="text-pink-500 dark:text-pink-400">It</span>
          </h1>
          <div className="flex items-center gap-2">
            <IconButton
              onClick={handlePrint}
              aria-label="Print calendar"
              title="Print"
            >
              <Printer className="w-5 h-5" />
            </IconButton>
            <ThemeToggle theme={resolvedTheme} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Left column - Hero + Mini previews */}
          <div className="lg:col-span-2 space-y-4 print-container">
            {/* Binding decoration */}
            <BindingDecoration ringCount={8} />

            {/* Hero image */}
            <div className="bg-surface rounded-xl overflow-hidden shadow-lg border border-violet-100 dark:border-violet-900/30">
              <HeroImage monthIndex={month} />

              {/* Mini month previews */}
              <div className="grid grid-cols-2 gap-3 p-4">
                <MonthMiniPreview
                  year={prevMonthDate.getFullYear()}
                  month={prevMonthDate.getMonth()}
                  label="Previous"
                />
                <MonthMiniPreview
                  year={nextMonthDate.getFullYear()}
                  month={nextMonthDate.getMonth()}
                  label="Next"
                />
              </div>
            </div>

            {/* Important Dates / Holidays */}
            <HolidaysPanel year={year} month={month} />

            {/* Keyboard shortcuts help */}
            <div className="no-print bg-surface/50 dark:bg-surface/30 rounded-lg p-4 text-sm">
              <div className="flex items-center gap-2 text-text-muted mb-2">
                <Keyboard className="w-4 h-4" />
                <span className="font-medium">Keyboard shortcuts</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-text-muted text-xs">
                <span>← → Navigate days</span>
                <span>↑ ↓ Week navigation</span>
                <span>Enter Select date</span>
                <span>Esc Clear selection</span>
              </div>
            </div>
          </div>

          {/* Right column - Calendar + Notes */}
          <div className="lg:col-span-3 space-y-4 print-container">
            {/* Calendar card */}
            <div className="bg-surface rounded-xl p-4 sm:p-6 shadow-lg border border-violet-100 dark:border-violet-900/30">
              <CalendarHeader
                currentMonth={currentMonth}
                onPrevMonth={goToPrevMonth}
                onNextMonth={goToNextMonth}
                onToday={goToToday}
              />

              <CalendarGrid
                year={year}
                month={month}
                selectedRange={sortedRange}
                onDateClick={handleDateClick}
                isAnimating={isAnimating}
              />
            </div>

            {/* Notes panel */}
            <NotesPanel
              selectedRange={sortedRange}
              note={currentNote}
              onSave={handleSaveNote}
              onDelete={handleDeleteNote}
            />

            {/* Clear selection button */}
            {range.start && (
              <button
                onClick={clearSelection}
                className="no-print w-full py-2 text-sm text-text-muted hover:text-text transition-colors"
              >
                Clear selection
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="no-print mt-12 py-6 text-center text-sm text-text-muted border-t border-violet-100 dark:border-violet-900/30">
        <p>Press Esc to clear selection • Tab to navigate • Enter to select</p>
      </footer>
    </div>
  );
};

CalendarApp.displayName = 'CalendarApp';

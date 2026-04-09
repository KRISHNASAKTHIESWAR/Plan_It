'use client';

import { useState, useCallback, useMemo } from 'react';
import type { NotesData, Note, MoodTag, DateRange } from '@/types';
import { formatRangeKey, isSameDay } from '@/lib/dateUtils';

export function useNotes() {
  const [notes, setNotes] = useState<NotesData>({});

  const getNoteForRange = useCallback((range: DateRange): Note | null => {
    if (!range.start) return null;

    const key = formatRangeKey(
      range.start,
      range.end || range.start
    );

    return notes[key] || null;
  }, [notes]);

  const saveNote = useCallback((range: DateRange, content: string, moodTags: MoodTag[]) => {
    if (!range.start) return;

    const key = formatRangeKey(
      range.start,
      range.end || range.start
    );

    const now = new Date();
    const existing = notes[key];

    const note: Note = {
      id: existing?.id || crypto.randomUUID(),
      content: content.slice(0, 500),
      moodTags,
      createdAt: existing?.createdAt || now,
      updatedAt: now,
    };

    setNotes(prev => ({
      ...prev,
      [key]: note,
    }));
  }, [notes]);

  const deleteNote = useCallback((range: DateRange) => {
    if (!range.start) return;

    const key = formatRangeKey(
      range.start,
      range.end || range.start
    );

    setNotes(prev => {
      const { [key]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const hasNote = useCallback((range: DateRange): boolean => {
    if (!range.start) return false;

    const key = formatRangeKey(
      range.start,
      range.end || range.start
    );

    return !!notes[key];
  }, [notes]);

  const getAllNotes = useMemo(() => {
    return Object.entries(notes).map(([key, note]) => ({
      key,
      ...note,
    }));
  }, [notes]);

  return {
    notes,
    getNoteForRange,
    saveNote,
    deleteNote,
    hasNote,
    getAllNotes,
  };
}

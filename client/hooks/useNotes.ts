'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import type { NotesData, Note, MoodTag, DateRange } from '@/types';
import { formatRangeKey } from '@/lib/dateUtils';

const STORAGE_KEY = 'calendar-notes';

function loadNotesFromStorage(): NotesData {
  if (typeof window === 'undefined') return {};
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return {};
    const parsed = JSON.parse(stored);
    // Revive Date objects from ISO strings
    const revived: NotesData = {};
    for (const [key, value] of Object.entries(parsed)) {
      const note = value as Note;
      revived[key] = {
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      };
    }
    return revived;
  } catch {
    return {};
  }
}

function saveNotesToStorage(notes: NotesData) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // Ignore storage errors
  }
}

export function useNotes() {
  const [notes, setNotes] = useState<NotesData>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from sessionStorage on mount
  useEffect(() => {
    setNotes(loadNotesFromStorage());
    setIsLoaded(true);
  }, []);

  // Save to sessionStorage whenever notes change
  useEffect(() => {
    if (isLoaded) {
      saveNotesToStorage(notes);
    }
  }, [notes, isLoaded]);

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

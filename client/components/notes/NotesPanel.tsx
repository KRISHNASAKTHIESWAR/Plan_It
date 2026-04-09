'use client';

import React, { useState, useCallback } from 'react';
import type { DateRange, Note, MoodTag } from '@/types';
import { formatDateRangeLabel } from '@/lib/dateUtils';
import { MoodTagSelector } from './MoodTagSelector';
import { NoteItem } from './NoteItem';
import { StickyNote, X } from 'lucide-react';
import { IconButton } from '@/components/ui/IconButton';

interface NotesPanelProps {
  selectedRange: DateRange;
  note: Note | null;
  onSave: (content: string, tags: MoodTag[]) => void;
  onDelete: () => void;
}

const MAX_CHARS = 500;

export const NotesPanel: React.FC<NotesPanelProps> = ({
  selectedRange,
  note,
  onSave,
  onDelete,
}) => {
  const [content, setContent] = useState(() => note?.content ?? '');
  const [tags, setTags] = useState<MoodTag[]>(() => note?.moodTags ?? []);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const prevNoteIdRef = React.useRef<string | null>(note?.id ?? null);

  // Sync with external note when note ID changes
  const noteId = note?.id ?? null;
  if (noteId !== prevNoteIdRef.current) {
    prevNoteIdRef.current = noteId;
    // Sync on render (allowed pattern - state update during render)
    if (note) {
      setContent(note.content);
      setTags(note.moodTags);
    } else {
      setContent('');
      setTags([]);
    }
    setShowConfirmDelete(false);
  }

  const label = formatDateRangeLabel(selectedRange.start, selectedRange.end);
  const hasSelection = !!selectedRange.start;
  const charCount = content.length;
  const isOverLimit = charCount > MAX_CHARS;

  const handleSave = useCallback(() => {
    if (!hasSelection || isOverLimit) return;
    onSave(content, tags);
  }, [content, tags, hasSelection, isOverLimit, onSave]);

  const handleClear = useCallback(() => {
    if (note) {
      setShowConfirmDelete(true);
    } else {
      setContent('');
      setTags([]);
    }
  }, [note]);

  const confirmDelete = useCallback(() => {
    onDelete();
    setShowConfirmDelete(false);
    setContent('');
    setTags([]);
  }, [onDelete]);

  const cancelDelete = useCallback(() => {
    setShowConfirmDelete(false);
  }, []);

  if (!hasSelection) {
    return (
      <div className="bg-surface rounded-xl p-6 border border-violet-100 dark:border-violet-900/30">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <StickyNote className="w-12 h-12 text-violet-300 dark:text-violet-700 mb-4" />
          <p className="text-text-muted">
            Select a date range to add notes
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-xl p-4 sm:p-6 border border-violet-100 dark:border-violet-900/30 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text">{label}</h3>
        {note && (
          <IconButton
            onClick={handleClear}
            aria-label="Clear note"
            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <X className="w-4 h-4" />
          </IconButton>
        )}
      </div>

      {/* Delete confirmation */}
      {showConfirmDelete && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-sm text-red-700 dark:text-red-300 mb-3">
            Are you sure you want to delete this note?
          </p>
          <div className="flex gap-2">
            <button
              onClick={confirmDelete}
              className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
            <button
              onClick={cancelDelete}
              className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Existing note display */}
      {note && !showConfirmDelete && (
        <NoteItem note={note} onDelete={() => setShowConfirmDelete(true)} />
      )}

      {/* Note form */}
      {!showConfirmDelete && (
        <div className="space-y-4">
          {/* Mood tags */}
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">
              Tags
            </label>
            <MoodTagSelector selectedTags={tags} onChange={setTags} />
          </div>

          {/* Text area */}
          <div>
            <label className="block text-sm font-medium text-text-muted mb-2">
              Notes
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Add your notes here..."
              className={`
                w-full h-32 p-3 rounded-lg border bg-background text-text
                focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                resize-none transition-colors
                ${isOverLimit
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-violet-200 dark:border-violet-900/50'
                }
              `}
              maxLength={MAX_CHARS + 50} // Allow typing but show warning
            />
            <div className="flex justify-between mt-1.5">
              <span className={`text-xs ${isOverLimit ? 'text-red-500' : 'text-text-muted'}`}>
                {charCount}/{MAX_CHARS} characters
              </span>
              {isOverLimit && (
                <span className="text-xs text-red-500">
                  Character limit exceeded
                </span>
              )}
            </div>
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={isOverLimit || (!content && tags.length === 0)}
            className={`
              w-full py-2.5 px-4 rounded-lg font-medium transition-all
              ${isOverLimit || (!content && tags.length === 0)
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                : 'bg-violet-600 hover:bg-violet-700 text-white shadow-sm hover:shadow active:transform active:scale-[0.98]'
              }
            `}
          >
            {note ? 'Update Note' : 'Save Note'}
          </button>
        </div>
      )}
    </div>
  );
};

NotesPanel.displayName = 'NotesPanel';

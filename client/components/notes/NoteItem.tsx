'use client';

import React from 'react';
import type { Note } from '@/types';
import { MOOD_TAG_CONFIG } from '@/types';
import { Trash2 } from 'lucide-react';
import { IconButton } from '@/components/ui/IconButton';

interface NoteItemProps {
  note: Note;
  onDelete: () => void;
}

export const NoteItem: React.FC<NoteItemProps> = ({
  note,
  onDelete,
}) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(note.updatedAt);

  return (
    <div className="bg-surface rounded-lg p-4 border border-violet-100 dark:border-violet-900/50 shadow-sm">
      {/* Tags */}
      {note.moodTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {note.moodTags.map(tag => {
            const config = MOOD_TAG_CONFIG[tag];
            return (
              <span
                key={tag}
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${config.bgColor} ${config.bgColorDark}`}
              >
                <span className="w-4 h-4 flex items-center justify-center rounded-full bg-white/50 dark:bg-black/20 text-xs font-bold">
                  {config.icon}
                </span>
                <span>{config.label}</span>
              </span>
            );
          })}
        </div>
      )}

      {/* Content */}
      <p className="text-text whitespace-pre-wrap mb-3">{note.content}</p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-muted">
          Updated {formattedDate}
        </span>
        <IconButton
          onClick={onDelete}
          aria-label="Delete note"
          className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <Trash2 className="w-4 h-4" />
        </IconButton>
      </div>
    </div>
  );
};

NoteItem.displayName = 'NoteItem';

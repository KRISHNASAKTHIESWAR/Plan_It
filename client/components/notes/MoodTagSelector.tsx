'use client';

import React, { useCallback } from 'react';
import type { MoodTag } from '@/types';
import { MOOD_TAG_CONFIG } from '@/types';

interface MoodTagSelectorProps {
  selectedTags: MoodTag[];
  onChange: (tags: MoodTag[]) => void;
}

export const MoodTagSelector: React.FC<MoodTagSelectorProps> = ({
  selectedTags,
  onChange,
}) => {
  const toggleTag = useCallback((tag: MoodTag) => {
    onChange(
      selectedTags.includes(tag)
        ? selectedTags.filter(t => t !== tag)
        : [...selectedTags, tag]
    );
  }, [selectedTags, onChange]);

  const tags: MoodTag[] = ['Vacation', 'Work', 'Event', 'Focus', 'Rest'];

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => {
        const config = MOOD_TAG_CONFIG[tag];
        const isSelected = selectedTags.includes(tag);

        return (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={`
              inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
              transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
              ${isSelected
                ? `${config.bgColor} ${config.bgColorDark} ring-2 ring-violet-500 ring-offset-1 dark:ring-offset-surface`
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }
            `}
            aria-pressed={isSelected}
          >
            <span className="w-5 h-5 flex items-center justify-center rounded-full bg-white/50 dark:bg-black/20 text-xs font-bold">
              {config.icon}
            </span>
            <span>{config.label}</span>
          </button>
        );
      })}
    </div>
  );
};

MoodTagSelector.displayName = 'MoodTagSelector';

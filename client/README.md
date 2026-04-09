# Plan It - Wall Calendar

A beautiful, production-quality interactive wall calendar built with Next.js, TypeScript, and Tailwind CSS. Features a physical wall calendar aesthetic with spiral binding, hero images, date range selection, and a notes panel.

![Wall Calendar Screenshot](./screenshot.png)

## Features

- [x] **Wall Calendar Layout** - Two-column responsive design with hero image and calendar grid
- [x] **Violet Dusk Theme** - Light/dark mode with violet-pink accent colors
- [x] **Hero Image** - Month-specific images with loading skeleton and crossfade animations
- [x] **Calendar Grid** - Monday-start week, 6-row layout with prev/next month padding
- [x] **Date Range Selector** - Click to select start/end dates with visual range highlighting
- [x] **Indian Public Holidays** - Holiday indicators for 2024-2026
- [x] **Notes Panel** - Add notes and mood tags to selected date ranges
- [x] **Mood Tags** - Vacation, Work, Event, Focus, Rest with emoji indicators
- [x] **Month Navigation** - Previous/Next buttons with page-flip 3D animation
- [x] **Dark/Light Mode** - Toggle with system preference fallback, persisted to localStorage
- [x] **Keyboard Navigation** - Arrow keys, Enter, Escape, Tab support
- [x] **Print Support** - @media print styles for calendar export
- [x] **Responsive Design** - Desktop (2-col), Tablet (stacked), Mobile (touch-friendly)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **State**: React hooks (useState, useCallback, useMemo)

## How to Run Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## Design Decisions

### Why Violet Dusk Theme?
The violet-pink palette evokes a calm, professional atmosphere while maintaining enough contrast for accessibility. The dark mode uses deeper violets that reduce eye strain.

### Why No Date Libraries?
Native JavaScript Date is sufficient for this calendar's requirements. Using pure Date avoids bundle bloat and ensures zero dependencies.

### SOLID Patterns Used
- **Single Responsibility**: Each component does one thing (DateCell only renders, CalendarApp only orchestrates)
- **Custom Hooks**: All logic is encapsulated in hooks - components are pure rendering
- **Strategy Pattern**: dateUtils.ts separates concerns with dedicated functions
- **Observer-like**: useNotes subscribes to range changes and returns relevant note automatically

### Performance Optimizations
- React.memo on DateCell (35+ cells rendered per month)
- useCallback on all event handlers passed to DateCell
- useMemo for computed calendar grid array
- CSS animations instead of JS for smoother transitions

## Architecture

```
components/
├── calendar/
│   ├── CalendarApp.tsx        # Root orchestrator
│   ├── CalendarHeader.tsx     # Month/year + nav
│   ├── CalendarGrid.tsx       # 7-column grid
│   ├── DateCell.tsx           # Individual day (memoized)
│   ├── HeroImage.tsx          # Month hero image
│   ├── MonthMiniPreview.tsx   # Prev/next mini calendars
│   └── BindingDecoration.tsx  # Spiral binding UI
├── notes/
│   ├── NotesPanel.tsx         # Notes for date range
│   ├── NoteItem.tsx           # Note display
│   └── MoodTagSelector.tsx    # Tag picker
└── ui/
    ├── ThemeToggle.tsx
    ├── Tooltip.tsx
    └── IconButton.tsx

hooks/
├── useCalendar.ts             # Month navigation
├── useDateRange.ts            # Range selection
├── useNotes.ts                # Notes CRUD
└── useTheme.ts                # Dark/light mode

lib/
├── dateUtils.ts               # Pure date helpers
├── holidays.ts                # Indian holidays
└── images.ts                  # Month image URLs
```

## Known Limitations

1. **Static Export Only**: Uses `output: 'export'` for static hosting
2. **No Backend**: All state is in-memory; refresh clears notes
3. **SVG Placeholder Images**: Uses generated SVGs instead of photos
4. **No Persistent Storage**: localStorage is used only for theme preference

## Live Demo

[Add your Vercel deployment URL here]

---

Built with Next.js + TypeScript + Tailwind CSS

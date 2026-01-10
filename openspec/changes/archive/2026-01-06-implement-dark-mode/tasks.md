# Tasks: Implement Dark Mode with next-themes

## Phase 1: Setup & Configuration

### Task 1.1: Install Dependencies
// turbo
- [x] Install `next-themes`

### Task 1.2: Create ThemeProvider Component
- [x] Create `src/components/providers/ThemeProvider.tsx` wrapping `next-themes` provider.
- [x] Ensure it uses `"use client"`.

### Task 1.3: Update Root Layout
- [x] Add `suppressHydrationWarning` to `<html>` in `src/app/layout.tsx`.
- [x] Import and wrap app with `ThemeProvider`.

## Phase 2: Refactoring & Cleanup

### Task 2.1: Update Hook Usage
- [x] Modify `src/hooks/useTheme.ts` to export from `next-themes` (adapter pattern) OR refactor consumers.
- [x] Recommendation: Update `src/hooks/useTheme.ts` to wrap `next-themes` hook to minimize changes in other files.

### Task 2.2: Verify Navigation Toggle
- [x] Check `src/components/layout/Navigation.tsx` interaction.
- [x] Ensure icons switch correctly (`resolvedTheme` check).

### Task 2.3: Remove Legacy Context
- [x] Delete `src/context/ThemeContext.tsx`.

## Phase 3: Validation

### Task 3.1: Verification
- [x] Verify no FOUC on refresh.
- [x] Verify system preference syncing.
- [x] Verify manual toggle works.
- [x] Check build status.

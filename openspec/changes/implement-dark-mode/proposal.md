# Proposal: Implement Robust Dark Mode with next-themes

## Problem
The current dark mode implementation relies on a custom context and hook which may be prone to hydration mismatches (FOUC), lacks robust system preference syncing across tabs, and adds maintenance overhead. Users expect a seamless switching experience that respects their system settings and persists correctly.

## Solution
Replace the custom `ThemeContext` with `next-themes`, a standard library for Next.js theme management. This will ensure:
- Prevention of flash of incorrect theme (FOUC).
- Automatic syncing with system preferences.
- Tab synchronization.
- Simplified codebase by removing manual context logic.

## Impact
- **User Experience**: Smoother theme switching and better persistence.
- **Codebase**: Reduced complexity and removed custom boilerplate.
- **Dependencies**: Adds `next-themes` (lightweight standard).

## Risks
- Minor styling adjustments might be needed if existing `dark:` classes relied on specific custom behavior (unlikely as Tailwind is standard).
- Need to ensure `suppressHydrationWarning` is applied to `html` tag to avoid React warnings.

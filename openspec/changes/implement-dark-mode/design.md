# Design: Implement Dark Mode with next-themes

## Architecture

### Theme Provider
- Use `ThemeProvider` from `next-themes`.
- Wrap the entire application in `src/app/layout.tsx`.
- Attributes: `attribute="class"`, `defaultTheme="system"`, `enableSystem`.

### Hook Usage
- Replace local `useTheme` hook logic with `useTheme` from `next-themes`.
- The interface is similar (`theme`, `setTheme`, `resolvedTheme`), simplifying migration.

### Component Updates
- **src/app/layout.tsx**: Add `suppressHydrationWarning` to `<html>` tag. Wrap children in `ThemeProvider`.
- **src/components/layout/Navigation.tsx**: Update to use `next-themes` hook. Ensure the toggle cycles nicely (Light -> Dark -> System? Or just Toggle Light/Dark like currently).
    - *Decision*: Keep simple Light/Dark toggle for now, or allow System option if UI permits. Current UI (Sun/Moon button) implies toggle. `next-themes` handles system fallback if user clears storage, but toggle usually sets a specific value.

### File Cleanup
- Delete `src/context/ThemeContext.tsx`.
- Update `src/hooks/useTheme.ts` to re-export `next-themes` or delete it and update imports. Re-exporting is safer for refactoring.

## Refence Implementation
```tsx
// src/components/providers/ThemeProvider.tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

```tsx
// src/app/layout.tsx
import { ThemeProvider } from "@/components/providers/ThemeProvider"

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  )
}
```

import { useTheme as useNextTheme } from "next-themes";

/**
 * Custom hook to access theme context
 * Provides theme state and setter function
 * 
 * @returns Theme context with current theme, setter, and resolved theme
 * 
 * @example
 * const { theme, setTheme, resolvedTheme } = useTheme();
 * setTheme("dark"); // Switch to dark mode
 */
export function useTheme() {
    return useNextTheme();
}

# Theme Management

## MODIFIED Requirements

### Requirement: Theme System
The theme switching mechanism must be robust, persisting user preference and syncing with system settings without hydration mismatches.

#### Scenario: Switching Themes
Given I rely on `next-themes` for theme management
When the user toggles the theme button
Then the theme switches between light and dark modes
And the class `dark` is added or removed from the `<html>` element
And the user's preference is saved to local storage

#### Scenario: System Preference Sync
Given the user has not explicitly set a theme preference
When the system color scheme preference changes
Then the website theme updates to match the system preference automatically
And no flash of unstyled theme (FOUC) occurs on page load

# modern-portfolio-framework Specification

## MODIFIED Requirements

### Requirement: Theme System
The portfolio MUST support light and dark themes with smooth transitions, system preference detection, and persistent user preference using the standardized `next-themes` library.

REASON: Replace custom implementation with a more robust, standard library to prevent FOUC and improve system parity.

#### Scenario: Implement theme provider
**Given** the Next.js app is set up  
**When** the theme system is implemented  
**Then** `next-themes` is used as the primary theme provider  
**And** themes include 'light', 'dark', and 'system' modes  
**And** the theme preference is persisted automatically  
**And** system preference is detected and applied by default

#### Scenario: Respect system preference
**Given** a user has not manually selected a theme  
**When** the page loads  
**Then** the theme matches the user's system preference  
**And** no flash of unstyled theme (FOUC) occurs  
**And** the theme updates if the system preference changes  
**And** the user can override the system preference manually

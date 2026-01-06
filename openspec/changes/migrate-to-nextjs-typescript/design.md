# Design Document: Next.js TypeScript Portfolio Migration

## Architecture Overview

### Technology Stack
```
Frontend Framework: Next.js 14+ (App Router)
Language: TypeScript 5+
Styling: Tailwind CSS + CSS Modules (for complex animations)
Animations: Framer Motion
Icons: Lucide React
Content: MDX (for blog posts)
Forms: React Hook Form + Zod validation
Email: Resend API
Deployment: Vercel
```

### Project Structure
```
portfolio/
├── app/                          # Next.js App Router
│   ├── (main)/                   # Main site layout group
│   │   ├── layout.tsx           # Root layout with theme provider
│   │   ├── page.tsx             # Home page
│   │   ├── about/               # About page
│   │   ├── projects/            # Projects listing & detail pages
│   │   ├── blog/                # Blog listing & post pages
│   │   ├── contact/             # Contact page
│   │   └── resume/              # Resume/CV page
│   ├── api/                     # API routes
│   │   ├── contact/             # Contact form endpoint
│   │   ├── newsletter/          # Newsletter subscription
│   │   └── analytics/           # Analytics endpoints
│   ├── admin/                   # Admin panel (protected)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── projects/
│   │   └── blog/
│   └── globals.css              # Global styles & Tailwind
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── ...
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── Navigation.tsx
│   ├── sections/                # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   └── features/                # Feature-specific components
│       ├── ThemeToggle.tsx
│       ├── ProjectCard.tsx
│       ├── BlogCard.tsx
│       ├── SkillsChart.tsx
│       └── Timeline.tsx
├── lib/                         # Utility functions
│   ├── utils.ts                 # General utilities
│   ├── constants.ts             # App constants
│   ├── types.ts                 # TypeScript types
│   └── api/                     # API client functions
├── content/                     # Content files
│   ├── projects/                # Project data (JSON/MDX)
│   ├── blog/                    # Blog posts (MDX)
│   └── data/                    # Static data
│       ├── profile.json
│       ├── skills.json
│       └── experience.json
├── public/                      # Static assets
│   ├── images/
│   ├── icons/
│   └── cv/
├── styles/                      # Additional styles
│   └── animations.css
├── hooks/                       # Custom React hooks
│   ├── useTheme.ts
│   ├── useScroll.ts
│   └── useMediaQuery.ts
├── context/                     # React context providers
│   └── ThemeContext.tsx
└── config/                      # Configuration files
    ├── site.config.ts           # Site metadata
    └── navigation.config.ts     # Navigation structure
```

## Component Architecture

### Design System
All components will follow a consistent design system:

#### Color Palette
```typescript
// Tailwind config colors
colors: {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    // ... gradient to
    900: '#0c4a6e',
  },
  accent: {
    // Vibrant accent colors
  },
  dark: {
    // Dark mode palette
  }
}
```

#### Typography Scale
- Headings: Inter or Outfit (Google Fonts)
- Body: Inter
- Code: Fira Code or JetBrains Mono

#### Spacing & Layout
- Consistent spacing scale (4px base)
- Responsive breakpoints: sm, md, lg, xl, 2xl
- Max content width: 1280px

### Key Components

#### 1. Hero Section
```typescript
// Animated hero with typing effect
- Full viewport height
- Animated gradient background
- Typing animation for roles
- CTA buttons with hover effects
- Scroll indicator
```

#### 2. Navigation
```typescript
// Sticky header with blur effect
- Logo/brand
- Navigation links with active states
- Theme toggle
- Mobile hamburger menu
- Smooth scroll to sections
```

#### 3. Project Card
```typescript
interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}
// Hover effects with image zoom
// Tag filtering
// Modal for detailed view
```

#### 4. Skills Visualization
```typescript
// Interactive skill bars or radar chart
- Category grouping
- Proficiency levels
- Animated on scroll
- Filterable by category
```

#### 5. Contact Form
```typescript
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
// Validation with Zod
// Loading states
// Success/error feedback
// Email integration
```

## Data Flow

### Content Management
```
MDX Files (Blog) → MDX Parser → React Components → Rendered Pages
JSON Files (Projects) → TypeScript Types → React Components → Rendered Pages
```

### Form Submission
```
User Input → React Hook Form → Zod Validation → API Route → Resend API → Email Sent
```

### Theme Management
```
System Preference → Theme Context → localStorage → CSS Variables → UI Update
```

## Animation Strategy

### Page Transitions
- Fade in on route change
- Stagger animations for lists
- Parallax effects on scroll

### Micro-interactions
- Button hover states
- Card hover effects (lift, glow)
- Input focus states
- Loading spinners
- Success checkmarks

### Scroll Animations
- Fade in from bottom
- Slide in from sides
- Scale on reveal
- Progress indicators

## Performance Optimization

### Image Optimization
- Next.js Image component for all images
- WebP format with fallbacks
- Lazy loading below fold
- Blur placeholders

### Code Splitting
- Dynamic imports for heavy components
- Route-based splitting (automatic with App Router)
- Lazy load admin panel

### Caching Strategy
- Static generation for blog posts
- Incremental static regeneration for projects
- Client-side caching for API responses

## SEO Strategy

### Metadata
```typescript
// Each page exports metadata
export const metadata: Metadata = {
  title: 'Page Title | Chy Devit',
  description: '...',
  openGraph: { ... },
  twitter: { ... },
}
```

### Structured Data
- Person schema for profile
- Article schema for blog posts
- BreadcrumbList for navigation

### Sitemap & Robots
- Auto-generated sitemap.xml
- robots.txt configuration
- RSS feed for blog

## Accessibility

### WCAG 2.1 AA Compliance
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Focus indicators
- Color contrast ratios >4.5:1
- Alt text for all images
- Skip to content link

## Security Considerations

### API Routes
- Rate limiting on contact form
- CSRF protection
- Input sanitization
- Environment variable protection

### Content Security
- Content Security Policy headers
- XSS prevention
- Secure headers configuration

## Deployment Strategy

### Vercel Deployment
```
Git Push → Vercel Build → Preview Deployment → Production (on merge)
```

### Environment Variables
```
RESEND_API_KEY=...
NEXT_PUBLIC_SITE_URL=...
ADMIN_PASSWORD=... (for simple admin auth)
```

### CI/CD
- Automatic deployments on push
- Preview deployments for PRs
- Type checking in build process
- Lighthouse CI for performance monitoring

## Migration Strategy

### Phase 1: Setup & Foundation
1. Initialize Next.js project with TypeScript
2. Set up Tailwind CSS and design system
3. Create base layout and navigation
4. Implement theme system

### Phase 2: Content Migration
1. Convert HTML sections to React components
2. Migrate CSS to Tailwind classes
3. Extract content to JSON/MDX files
4. Optimize and migrate images

### Phase 3: Feature Development
1. Implement blog system
2. Create project showcase
3. Build contact form
4. Add admin panel
5. Implement additional features

### Phase 4: Polish & Deploy
1. Add animations and transitions
2. Optimize performance
3. SEO implementation
4. Testing and bug fixes
5. Deploy to Vercel

## Testing Strategy

### Type Safety
- TypeScript strict mode
- No `any` types
- Proper interface definitions

### Manual Testing
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile responsiveness testing
- Accessibility testing with screen readers
- Performance testing with Lighthouse

### User Acceptance
- All existing content visible
- All links functional
- Forms working correctly
- Theme toggle working
- Responsive on all devices

## Rollback Plan
- Keep existing HTML site in separate branch
- Can revert deployment on Vercel instantly
- Backup all content before migration
- Document all breaking changes

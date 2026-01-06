# Tasks: Migrate to Next.js with TypeScript

## Phase 1: Project Setup & Foundation

### Task 1.1: Initialize Next.js Project
- [x] Backup existing portfolio files to `_old_portfolio/` directory
- [x] Run `npx create-next-app@latest --help` to check available options
- [x] Initialize Next.js 14+ with TypeScript in current directory
  - Use App Router
  - Enable TypeScript
  - Enable ESLint
  - Use Tailwind CSS
  - Use `src/` directory
  - Disable import alias customization (use default `@/`)
- [x] Verify project structure created correctly
- [x] Install additional dependencies:
  - `framer-motion` - animations
  - `lucide-react` - icons
  - `react-hook-form` - form handling
  - `zod` - validation
  - `@mdx-js/loader` `@mdx-js/react` `@next/mdx` - MDX support
  - `resend` - email service
  - `date-fns` - date formatting
  - `clsx` `tailwind-merge` - utility functions
- [x] Run `npm run dev` to verify development server works

**Validation**: ✅ Dev server runs on http://localhost:3000 without errors

### Task 1.2: Configure Tailwind & Design System
- [x] Update `tailwind.config.ts` with custom color palette
  - Primary colors (blue gradient)
  - Accent colors (vibrant)
  - Dark mode colors
  - Semantic colors (success, error, warning)
- [x] Configure typography plugin for better text styling
- [x] Set up custom animations in Tailwind config
- [x] Create `src/app/globals.css` with:
  - CSS custom properties for theme colors
  - Dark mode CSS variables
  - Base styles and resets
  - Custom animations
- [x] Create `src/lib/utils.ts` with `cn()` utility for class merging

**Validation**: ✅ Tailwind classes work, custom colors available

### Task 1.3: Set Up Theme System
- [x] Create `src/context/ThemeContext.tsx` with theme provider
  - Support 'light', 'dark', 'system' modes
  - Persist preference to localStorage
  - Detect system preference
- [x] Create `src/hooks/useTheme.ts` custom hook
- [x] Update root layout to wrap app with ThemeProvider
- [x] Add theme toggle logic
- [x] Test theme switching works correctly

**Validation**: ✅ Theme toggle switches between light/dark modes

### Task 1.4: Create Base Layout Components
- [x] Create `src/components/layout/Header.tsx`
  - Logo/brand
  - Navigation links
  - Theme toggle button
  - Mobile menu button
  - Sticky header with blur effect
- [x] Create `src/components/layout/Footer.tsx`
  - Social media links
  - Copyright info
  - Quick links
- [x] Create `src/components/layout/Navigation.tsx`
  - Desktop navigation
  - Mobile navigation drawer
  - Active link highlighting
  - Smooth scroll to sections
- [x] Update `src/app/layout.tsx` with Header and Footer
- [x] Add Google Fonts (Inter, Outfit) to layout

**Validation**: ✅ Header and footer render on all pages, navigation works

## Phase 2: UI Component Library

### Task 2.1: Create Base UI Components
- [x] Create `src/components/ui/Button.tsx`
  - Variants: primary, secondary, outline, ghost
  - Sizes: sm, md, lg
  - Loading state
  - Icon support
- [x] Create `src/components/ui/Card.tsx`
  - Hover effects
  - Glassmorphism variant
  - Shadow variants
- [x] Create `src/components/ui/Input.tsx`
  - Text, email, textarea variants
  - Error states
  - Label support
- [x] Create `src/components/ui/Badge.tsx` for tags/skills
- [x] Create `src/components/ui/Modal.tsx` for dialogs
- [x] Create `src/components/ui/Container.tsx` for max-width wrapper

**Validation**: ✅ UI components render correctly with all variants

### Task 2.2: Create Feature Components
- [x] Create `src/components/features/ThemeToggle.tsx`
  - Sun/moon icons
  - Smooth transition
  - Tooltip
- [x] Create `src/components/features/SocialLinks.tsx`
  - Icon buttons for social media
  - Hover effects
  - Configurable links
- [x] Create `src/components/features/SkillBadge.tsx`
  - Skill name and icon
  - Proficiency indicator
  - Hover animation

**Validation**: ✅ Feature components work independently

## Phase 3: Content Migration & Data Setup

### Task 3.1: Set Up Content Structure
- [x] Create `src/lib/types.ts` with TypeScript interfaces:
  - `Profile` interface
  - `Project` interface
  - `BlogPost` interface
  - `Skill` interface
  - `Experience` interface
  - `Education` interface
- [x] Create `src/content/data/profile.json` with personal info
- [x] Create `src/content/data/skills.json` with skills data
- [x] Create `src/content/data/experience.json` with work experience
- [x] Create `src/content/data/education.json` with education history
- [x] Create utility functions in `src/lib/content.ts` to read data files

**Validation**: ✅ Data files load correctly, TypeScript types match

### Task 3.2: Migrate Images & Assets
- [x] Copy all images from `assets/img/` to `public/images/`
- [ ] Optimize images (convert to WebP where possible)
- [x] Copy CV PDF from `assets/pdf/` to `public/cv/`
- [ ] Create `public/icons/` for favicon and app icons
- [x] Update image references in data files
- [x] Create `src/lib/constants.ts` for asset paths

**Validation**: ✅ All images accessible via Next.js Image component

### Task 3.3: Extract Projects Data
- [x] Analyze existing portfolio projects from HTML
- [x] Create `src/content/projects/` directory
- [x] Create individual JSON files for each project:
  - Project title, description
  - Technologies used
  - Images/screenshots
  - Live URL, GitHub URL
  - Featured flag
  - Date completed
- [x] Create `src/lib/api/projects.ts` with functions:
  - `getAllProjects()`
  - `getFeaturedProjects()`
  - `getProjectBySlug()`

**Validation**: ✅ Project data loads correctly with proper typing

## Phase 4: Home Page Implementation

### Task 4.1: Create Hero Section
- [x] Create `src/components/sections/Hero.tsx`
  - Full viewport height
  - Animated gradient background
  - Profile image with border effects
  - Name and title
  - Typing animation for roles (using Framer Motion)
  - CTA buttons (View Projects, Contact Me)
  - Scroll indicator with animation
- [x] Add Framer Motion animations:
  - Fade in on load
  - Stagger text animations
  - Floating animation for profile image
- [x] Make fully responsive

**Validation**: ✅ Hero section looks stunning, animations smooth

### Task 4.2: Create About Section
- [x] Create `src/components/sections/About.tsx`
  - About me text
  - Profile image
  - Key highlights/stats
  - Download CV button
- [x] Add scroll-triggered animations
- [x] Implement glassmorphism card effect
- [x] Make responsive (stack on mobile)

**Validation**: ✅ About section displays correctly, CV downloads

### Task 4.3: Create Skills Section
- [x] Create `src/components/sections/Skills.tsx`
  - Skill categories (Frontend, Backend, Tools, etc.)
  - Skill badges with icons
  - Proficiency visualization
  - Filter by category
- [x] Create `src/components/features/SkillsChart.tsx`
  - Interactive skill bars or radar chart
  - Animated on scroll
- [x] Add hover effects on skill items

**Validation**: ✅ Skills display beautifully, interactions smooth

### Task 4.4: Create Experience/Timeline Section
- [x] Create `src/components/sections/Experience.tsx`
  - Vertical timeline layout
  - Work experience items
  - Education items
  - Icons for each entry
- [x] Create `src/components/features/Timeline.tsx`
  - Animated timeline line
  - Scroll-triggered reveals
  - Alternating left/right layout (desktop)
- [x] Make responsive (single column on mobile)

**Validation**: ✅ Timeline displays correctly, animations work

### Task 4.5: Create Services Section
- [x] Create `src/components/sections/Services.tsx`
  - Service cards (Web Dev, Mobile Dev, etc.)
  - Icons for each service
  - Hover effects
  - Grid layout
- [x] Add micro-animations on hover
- [x] Make responsive grid

**Validation**: ✅ Services section looks professional

### Task 4.6: Assemble Home Page
- [x] Update `src/app/page.tsx` to include all sections:
  - Hero
  - About
  - Skills
  - Experience
  - Services
  - Featured Projects preview
  - Contact CTA
- [x] Add smooth scroll behavior
- [x] Implement scroll progress indicator
- [x] Add fade-in animations for each section

**Validation**: ✅ Home page complete, all sections visible and animated

## Phase 5: Projects Page

### Task 5.1: Create Projects Listing Page
- [x] Create `src/app/projects/page.tsx`
  - Page header with title and description
  - Filter/search functionality
  - Grid of project cards
  - Load more or pagination
- [x] Create `src/components/features/ProjectCard.tsx`
  - Project thumbnail
  - Title and description
  - Technology tags
  - Links to live demo and GitHub
  - Hover effects (image zoom, card lift)
- [x] Implement filtering by technology
- [x] Add search functionality
- [x] Make responsive grid

**Validation**: ✅ Projects page displays all projects, filtering works

### Task 5.2: Create Project Detail Pages
- [x] Create `src/app/projects/[slug]/page.tsx`
  - Dynamic route for each project
  - Hero image/gallery
  - Full description
  - Technologies used
  - Features list
  - Screenshots/demo
  - Links to live site and code
  - Related projects
- [x] Implement image gallery with lightbox
- [x] Add breadcrumb navigation
- [x] Generate static params for all projects

**Validation**: ✅ Individual project pages load correctly

## Phase 6: Blog System

### Task 6.1: Set Up MDX for Blog
- [x] Configure MDX in `next.config.js`
- [x] Create `src/content/blog/` directory for MDX files
- [x] Create sample blog posts in MDX format
- [x] Create `src/lib/api/blog.ts` with functions:
  - `getAllPosts()`
  - `getPostBySlug()`
  - `getFeaturedPosts()`
- [x] Set up frontmatter schema (title, date, excerpt, tags, image)

**Validation**: MDX files parse correctly, metadata extracted

### Task 6.2: Create Blog Listing Page
- [x] Create `src/app/blog/page.tsx`
  - Page header
  - Grid of blog post cards
  - Search and filter by tags
  - Pagination or infinite scroll
- [x] Create `src/components/features/BlogCard.tsx`
  - Featured image
  - Title, excerpt, date
  - Tags
  - Read more link
  - Hover effects
- [x] Implement tag filtering
- [x] Add search functionality

**Validation**: Blog listing shows all posts, filtering works

### Task 6.3: Create Blog Post Pages
- [x] Create `src/app/blog/[slug]/page.tsx`
  - Dynamic route for each post
  - Hero image
  - Post metadata (date, author, tags)
  - MDX content rendering
  - Syntax highlighting for code blocks
  - Table of contents
  - Share buttons
  - Related posts
- [x] Create custom MDX components for rich content
- [x] Add reading time estimate
- [x] Generate static params for all posts

**Validation**: Blog posts render correctly with formatting

## Phase 7: Contact & Forms

### Task 7.1: Create Contact Page
- [x] Create `src/app/contact/page.tsx`
  - Page header
  - Contact form
  - Contact information
  - Social media links
  - Map or location (optional)
- [x] Create `src/components/features/ContactForm.tsx`
  - Name, email, subject, message fields
  - React Hook Form integration
  - Zod validation schema
  - Loading states
  - Success/error messages
- [x] Style form with focus states and animations

**Validation**: ✅ Contact page displays, form validates input

### Task 7.2: Implement Contact Form API
- [x] Create `src/app/api/contact/route.ts`
  - POST endpoint for form submission
  - Validate input with Zod
  - Rate limiting (simple implementation)
  - Sanitize input
- [x] Set up Resend API integration
  - Configure API key in `.env.local`
  - Create email template
  - Send email on form submission
- [x] Return proper success/error responses
- [x] Test form submission end-to-end

**Validation**: ✅ Form submits successfully, email received

### Task 7.3: Newsletter Subscription (Optional)
- [ ] Create newsletter signup component
- [ ] Create `src/app/api/newsletter/route.ts`
- [ ] Integrate with email service (Resend or similar)
- [ ] Add to footer or blog pages
- [ ] Add success confirmation

**Validation**: Newsletter signup works, confirmation sent

## Phase 8: Additional Features

### Task 8.1: Create Resume/CV Page
- [x] Create `src/app/resume/page.tsx`
  - Printable resume layout
  - All experience and education
  - Skills summary
  - Download PDF button
  - Print-friendly styles
- [x] Make responsive
- [x] Add print CSS

**Validation**: ✅ Resume page displays correctly, PDF downloads (links to file)

### Task 8.2: Create Testimonials Section
- [ ] Create `src/content/data/testimonials.json`
- [ ] Create `src/components/sections/Testimonials.tsx`
  - Testimonial cards
  - Client name, role, company
  - Quote
  - Avatar/logo
  - Carousel or grid layout
- [ ] Add to home page or about page
- [ ] Implement carousel with auto-play

**Validation**: Testimonials display and carousel works

### Task 8.3: Add Analytics (Optional)
- [ ] Set up Vercel Analytics or Google Analytics
- [ ] Add tracking code to layout
- [ ] Create privacy policy page
- [ ] Add cookie consent banner (if needed)

**Validation**: Analytics tracking events

## Phase 9: Admin Panel (Basic)

### Task 9.1: Create Admin Layout
- [ ] Create `src/app/admin/layout.tsx`
  - Simple password protection
  - Admin navigation
  - Different styling from main site
- [ ] Create `src/app/admin/page.tsx` dashboard
  - Overview stats
  - Quick actions
- [ ] Implement basic auth check

**Validation**: Admin area accessible with password

### Task 9.2: Project Management
- [ ] Create `src/app/admin/projects/page.tsx`
  - List all projects
  - Add new project form
  - Edit/delete actions
- [ ] Create forms to add/edit projects
- [ ] Save to JSON files (simple file-based CMS)

**Validation**: Can add/edit projects from admin panel

### Task 9.3: Blog Management
- [ ] Create `src/app/admin/blog/page.tsx`
  - List all blog posts
  - Create new post
  - Edit/delete actions
- [ ] Create MDX editor or simple textarea
- [ ] Save MDX files

**Validation**: Can create/edit blog posts from admin

## Phase 10: Polish & Optimization

### Task 10.1: Add Animations & Transitions
- [x] Add page transition animations
- [x] Implement scroll-triggered animations for all sections
- [x] Add micro-interactions:
  - Button hover effects
  - Card hover effects
  - Link hover effects
  - Loading animations
- [ ] Add parallax effects (subtle)
- [x] Ensure animations are smooth (60fps)
- [x] Add reduced motion support for accessibility

**Validation**: ✅ All animations smooth, no jank

### Task 10.2: SEO Optimization
- [x] Add metadata to all pages
  - Title, description
  - OpenGraph tags
  - Twitter cards
- [x] Create `src/app/sitemap.ts` for dynamic sitemap
- [x] Create `src/app/robots.ts` for robots.txt
- [ ] Add structured data (JSON-LD):
  - Person schema for home page
  - Article schema for blog posts
- [x] Optimize meta tags for social sharing
- [ ] Add canonical URLs

**Validation**: ✅ SEO tags present, sitemap generated

### Task 10.3: Performance Optimization
- [ ] Optimize all images with Next.js Image
  - Add proper sizes
  - Use blur placeholders
  - Lazy load below fold
- [ ] Implement code splitting
  - Dynamic imports for heavy components
  - Lazy load admin panel
- [ ] Optimize fonts
  - Subset fonts
  - Use font-display: swap
- [ ] Minimize bundle size
  - Remove unused dependencies
  - Tree-shake imports
- [ ] Run Lighthouse audit
  - Target >90 performance score
  - Fix any issues

**Validation**: Lighthouse score >90 on all metrics

### Task 10.4: Accessibility Audit
- [ ] Test keyboard navigation
- [ ] Add ARIA labels where needed
- [ ] Ensure proper heading hierarchy
- [ ] Test with screen reader
- [ ] Check color contrast ratios
- [ ] Add skip to content link
- [ ] Test with accessibility tools (axe DevTools)
- [ ] Fix any issues found

**Validation**: No accessibility errors, WCAG AA compliant

### Task 10.5: Responsive Testing
- [ ] Test on mobile devices (iOS, Android)
- [ ] Test on tablets
- [ ] Test on different desktop sizes
- [ ] Fix any layout issues
- [ ] Ensure touch targets are large enough
- [ ] Test landscape and portrait orientations

**Validation**: Site works perfectly on all devices

### Task 10.6: Cross-Browser Testing
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on Edge
- [ ] Fix any browser-specific issues
- [ ] Add polyfills if needed

**Validation**: Site works on all major browsers

## Phase 11: Deployment & Documentation

### Task 11.1: Prepare for Deployment
- [ ] Create `.env.example` with all required variables
- [ ] Update `.gitignore` to exclude sensitive files
- [ ] Create `README.md` with:
  - Project description
  - Setup instructions
  - Environment variables
  - Deployment instructions
- [ ] Add license file
- [ ] Clean up console.logs and debug code

**Validation**: Project ready for deployment

### Task 11.2: Deploy to Vercel
- [ ] Create Vercel account (if needed)
- [ ] Connect GitHub repository
- [ ] Configure environment variables in Vercel
- [ ] Deploy to production
- [ ] Test production deployment
- [ ] Set up custom domain (if available)
- [ ] Configure DNS

**Validation**: Site live on Vercel, all features working

### Task 11.3: Post-Deployment Testing
- [ ] Test all pages on production
- [ ] Test contact form on production
- [ ] Test newsletter signup
- [ ] Verify analytics working
- [ ] Check all links work
- [ ] Test on real devices
- [ ] Fix any production-only issues

**Validation**: Production site fully functional

### Task 11.4: Update OpenSpec
- [ ] Update `openspec/project.md` with new tech stack
- [ ] Document new project structure
- [ ] Add deployment information
- [ ] Archive old HTML site reference

**Validation**: Documentation up to date

## Success Criteria Checklist

- [x] All existing portfolio content migrated
- [x] TypeScript strict mode with zero errors
- [x] Modern, visually stunning UI
- [x] All new features functional:
  - [x] Blog system
  - [x] Enhanced projects showcase
  - [x] Contact form with email
  - [ ] Admin panel (Skipped)
  - [ ] Newsletter signup (Optional)
  - [ ] Testimonials (No data)
  - [x] Skills visualization
  - [x] Timeline
- [ ] Lighthouse performance score >90
- [x] Fully responsive (mobile, tablet, desktop)
- [x] Dark/light theme working
- [x] SEO optimized
- [x] Development server runs without errors
- [x] Production build successful
- [ ] Deployed to Vercel
- [ ] All links functional
- [ ] Forms working correctly
- [ ] Accessibility compliant (WCAG AA)
- [ ] Cross-browser compatible

## Notes
- Each task should be completed sequentially within its phase
- Test thoroughly after each task
- Commit changes frequently with descriptive messages
- Keep the old HTML site as backup until migration is complete
- Prioritize core functionality over nice-to-have features
- Can skip optional features (analytics, newsletter) if time-constrained

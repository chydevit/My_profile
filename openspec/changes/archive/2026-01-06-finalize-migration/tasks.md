# Tasks: Finalize Migration

## Phase 8: Additional Features

### Task 8.2: Create Testimonials Section
- [x] Create `src/content/data/testimonials.json`
- [x] Create `src/components/sections/Testimonials.tsx`
  - Testimonial cards
  - Client name, role, company
  - Quote
  - Avatar/logo
  - Carousel or grid layout
- [x] Add to home page or about page
- [x] Implement carousel with auto-play

**Validation**: Testimonials display and carousel works

### Task 8.3: Add Analytics (Optional)
- [x] Set up Vercel Analytics or Google Analytics
- [x] Add tracking code to layout
- [x] Create privacy policy page
- [ ] Add cookie consent banner (if needed)

**Validation**: Analytics tracking events

## Phase 9: Admin Panel (Basic)

### Task 9.1: Create Admin Layout
- [x] Create `src/app/admin/layout.tsx`
  - Simple password protection
  - Admin navigation
  - Different styling from main site
- [x] Create `src/app/admin/page.tsx` dashboard
  - Overview stats
  - Quick actions
- [x] Implement basic auth check

**Validation**: Admin area accessible with password

### Task 9.2: Project Management
- [x] Create `src/app/admin/projects/page.tsx`
  - List all projects
  - Add new project form
  - Edit/delete actions
- [x] Create forms to add/edit projects
- [x] Save to JSON files (simple file-based CMS)

**Validation**: Can add/edit projects from admin panel

### Task 9.3: Blog Management
- [x] Create `src/app/admin/blog/page.tsx`
  - List all blog posts
  - Create new post
  - Edit/delete actions
- [x] Create MDX editor or simple textarea
- [x] Save MDX files

**Validation**: Can create/edit blog posts from admin

## Phase 10: Polish & Optimization
- [x] Optimize all images with Next.js Image
- [x] Implement code splitting (Next.js default)
- [x] Optimize fonts (next/font)
- [x] WCAG AA accessibility compliance
- [x] Responsive & Cross-browser testing

**Validation**: Site is polished and performant

## Phase 11: Deployment & Documentation
- [x] Prepare for Deployment (.env.example, README)
- [x] Deployment ready for Vercel
- [x] Update OpenSpec documentation
- [x] Archive old HTML site reference

**Validation**: Migration complete and documented

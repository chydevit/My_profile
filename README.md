# Chy Devit - Portfolio Website

A modern, responsive portfolio website built with Next.js 14+, TypeScript, and Tailwind CSS.

## 🚀 Features

- ✨ **Modern Design** - Beautiful UI with animations and glassmorphism effects
- 🌓 **Dark/Light Mode** - Seamless theme switching with system preference detection
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Fast Performance** - Built with Next.js App Router and optimized for speed
- 🎨 **Framer Motion** - Smooth animations and transitions throughout
- 🔍 **SEO Optimized** - Proper metadata, sitemap, and structured data
- 📂 **Project Showcase** - 11 projects with filtering and search
- 💼 **Professional Layout** - Clean navigation and user-friendly interface
- 🎯 **Type-Safe** - Full TypeScript implementation with strict mode

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Email**: Resend integrated
- **Deployment**: Vercel ready
- **Admin**: Basic Admin Panel for content management
- **Analytics**: Vercel Analytics integrated

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd portfolio-nextjs

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🏗️ Project Structure

```
portfolio-nextjs/
├── src/
│   ├── app/                    # Next.js App Router folders
│   │   ├── (site)/            # Public site routes (Home, Projects, Blog, Contact)
│   │   ├── admin/             # Restricted admin panel routes
│   │   ├── api/               # API routes (Admin, Contact, Newsletter)
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── admin/            # Admin panel specific components
│   │   ├── ui/               # Reusable UI components
│   │   ├── layout/           # Layout components
│   │   ├── sections/         # Page sections
│   │   ├── providers/        # Context providers
│   │   └── features/         # Feature components
│   ├── lib/                  # Utility functions
│   │   ├── types.ts         # TypeScript types
│   │   ├── content.ts       # Content utilities
│   │   └── utils.ts         # Helper functions
│   ├── content/             # Content data
│   │   ├── data/           # JSON data files
│   │   ├── projects/       # Project JSON data
│   │   └── blog/           # Blog MDX posts
│   └── hooks/              # Custom React hooks
├── public/                 # Static assets
└── openspec/             # OpenSpec documentation server
```

## 🧪 Testing

### Running Tests Locally

- Run unit tests: `npm test`
- Watch mode: `npm run test:watch`
- CI mode (coverage): `npm run test:ci`

### CI Configuration (Jenkins/GitHub Actions)

Ensure the pipeline executes steps in this order:

1. `npm ci` (Install dependencies)
2. `npm run lint` (Lint check)
3. `npm run test:ci` (Run tests & generate coverage)
4. SonarQube Scanner (imports `coverage/lcov.info`)

## 📄 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## 🎨 Customization

### Colors

Edit `src/app/globals.css` to customize the color palette.

### Content

Update JSON files in `src/content/data/` to modify:

- Profile information (`profile.json`)
- Skills (`skills.json`)
- Services (`services.json`)
- Projects (`projects/projects.json`)
- Education (`education.json`)

### Components

All components are in `src/components/` and can be customized as needed.

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables:
   ```
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   RESEND_API_KEY=your_api_key (for contact form)
   ```
4. Deploy!

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📝 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=your_resend_api_key
```

## 🎯 Features Roadmap

- [x] Home page with all sections
- [x] Projects listing and details
- [x] Contact information page
- [x] Dark/light theme
- [x] Responsive design
- [x] SEO optimization
- [x] Blog system with MDX
- [x] Contact form API
- [x] Newsletter subscription
- [x] Admin panel
- [x] Analytics dashboard

## 📧 Contact

- **Email**: Chydevit2023@gmail.com
- **LinkedIn**: [linkedin.com/in/chy-devit-4971032b2](https://www.linkedin.com/in/chy-devit-4971032b2/)
- **GitHub**: [github.com/chydevit](https://github.com/chydevit)
- **Telegram**: [@chydevit](https://t.me/chydevit)

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)

---

**Made with ❤️ by Chy Devit**

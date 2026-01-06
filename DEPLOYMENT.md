# Deployment Guide - Chy Devit Portfolio

This guide will help you deploy your Next.js portfolio to Vercel (recommended) or other platforms.

## 🚀 Quick Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications and is created by the same team.

### Prerequisites
- GitHub account
- Vercel account (free tier available)

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Portfolio migration complete"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Configure Environment Variables**
   In Vercel dashboard → Settings → Environment Variables, add:
   ```
   NEXT_PUBLIC_SITE_URL=https://yourdomain.vercel.app
   RESEND_API_KEY=your_resend_api_key (when ready)
   ```

4. **Custom Domain (Optional)**
   - Go to Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### Automatic Deployments
- Every push to `main` branch triggers a new deployment
- Pull requests get preview deployments
- Rollback to previous deployments anytime

---

## 🌐 Alternative Platforms

### Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and Deploy**
   ```bash
   npm run build
   netlify deploy --prod
   ```

3. **Configure**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Add environment variables in Netlify dashboard

### AWS Amplify

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect your GitHub repository

2. **Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```

### Railway

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Deploy**
   ```bash
   railway login
   railway init
   railway up
   ```

---

## ⚙️ Environment Variables

Create these environment variables in your deployment platform:

### Required
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Optional (for future features)
```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
ADMIN_PASSWORD=your_secure_password
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 🔍 Pre-Deployment Checklist

### Code Quality
- [ ] Run `npm run build` locally (no errors)
- [ ] Run `npm run lint` (no errors)
- [ ] Test all pages in production mode
- [ ] Check responsive design on multiple devices

### Content
- [ ] Update profile information in `src/content/data/profile.json`
- [ ] Verify all project links work
- [ ] Check all images load correctly
- [ ] Update CV/Resume file

### SEO
- [ ] Verify metadata on all pages
- [ ] Test sitemap at `/sitemap.xml`
- [ ] Check robots.txt at `/robots.txt`
- [ ] Update `NEXT_PUBLIC_SITE_URL` to production URL

### Performance
- [ ] Run Lighthouse audit (target >90)
- [ ] Optimize images if needed
- [ ] Check bundle size
- [ ] Test loading speed

---

## 📊 Post-Deployment

### Verify Deployment
1. Visit your deployed URL
2. Test all navigation links
3. Check theme toggle
4. Test mobile menu
5. Verify project filtering
6. Test contact information

### Monitor
- Set up Vercel Analytics (free)
- Monitor build logs
- Check error tracking
- Review performance metrics

### Update DNS (Custom Domain)
If using a custom domain:
1. Add A record: `@` → Vercel IP
2. Add CNAME: `www` → `cname.vercel-dns.com`
3. Wait for DNS propagation (up to 48 hours)

---

## 🐛 Troubleshooting

### Build Fails
- Check Node.js version (18+ required)
- Clear `.next` folder and rebuild
- Check for TypeScript errors
- Verify all dependencies installed

### Images Not Loading
- Ensure images are in `public/` folder
- Check image paths (case-sensitive)
- Verify Next.js Image component usage

### Environment Variables Not Working
- Prefix client-side vars with `NEXT_PUBLIC_`
- Redeploy after adding variables
- Check variable names match exactly

### 404 Errors
- Verify dynamic routes are generated
- Check `generateStaticParams` functions
- Ensure all pages have proper exports

---

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run lint
```

---

## 📈 Performance Optimization

### Before Going Live
1. **Image Optimization**
   - Convert images to WebP
   - Use appropriate sizes
   - Add blur placeholders

2. **Code Splitting**
   - Already handled by Next.js
   - Use dynamic imports for heavy components

3. **Caching**
   - Vercel handles this automatically
   - Configure headers if needed

---

## 🎯 Success Metrics

After deployment, track:
- Page load time (<3 seconds)
- Lighthouse score (>90)
- Mobile usability
- SEO score
- Accessibility score

---

## 📝 Maintenance

### Regular Updates
- Update dependencies monthly
- Add new projects as completed
- Keep blog content fresh
- Monitor analytics

### Backup
- GitHub serves as backup
- Vercel keeps deployment history
- Export content regularly

---

## 🆘 Support

If you encounter issues:
1. Check [Next.js Documentation](https://nextjs.org/docs)
2. Review [Vercel Documentation](https://vercel.com/docs)
3. Check build logs in deployment platform
4. Verify environment variables

---

**Ready to deploy? Follow the Vercel quick deploy steps above!** 🚀

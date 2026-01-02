# 🚀 Production Deployment Guide

## ✅ Pre-Deployment Checklist

### 1. Environment Variables Required

You need **6 environment variables** for production:

#### Shopify (4 variables)
```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-token
```

#### Supabase (2 variables)
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Database Setup
- ✅ Run `supabase_migration.sql` in Supabase (DONE)
- ✅ Verify `site_config` table exists
- ✅ Check default data is populated

### 3. Shopify Setup
- ✅ Create Shopify store
- ✅ Get Storefront API credentials
- ✅ Create collections: `bestsellers`, `latest-drops`
- ✅ Add products with images/3D models

---

## 📦 Deployment to Vercel

### Step 1: Push to GitHub

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial production deployment"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/ritzee.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect Next.js

### Step 3: Configure Environment Variables

In Vercel dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add all 6 variables (from checklist above)
3. Set for: **Production**, **Preview**, **Development**

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes for build
3. Your site will be live at `https://your-project.vercel.app`

---

## 🔧 Build Configuration

Your `package.json` already has the correct build script:

```json
{
  "scripts": {
    "build": "NODE_ENV=production next build",
    "start": "next start"
  }
}
```

**Vercel automatically runs**: `npm run build` → `npm run start`

---

## ✅ Post-Deployment Verification

### 1. Test Homepage
- Visit your production URL
- Check hero slider loads (from Supabase)
- Check announcement bar appears
- Verify products display (from Shopify)

### 2. Test Admin Panel
- Visit `https://your-domain.vercel.app/admin`
- Click **"Manage Site Settings"**
- Try adding an announcement
- Verify it saves to Supabase

### 3. Test Shopify Links
- Click **"Products"** → Should open Shopify Admin
- Click **"Orders"** → Should open Shopify Admin
- Verify all links work

### 4. Test 3D Models
- If you uploaded `.glb` files to products
- Product cards should show "3D VIEW" badge

---

## 🔒 Security Recommendations

### 1. Protect Admin Routes (Optional)
Currently `/admin` is public. To secure it:

**Option A: Add Basic Auth (Quick)**
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const basicAuth = request.headers.get('authorization');
    
    if (!basicAuth) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
      });
    }
    
    const [username, password] = atob(basicAuth.split(' ')[1]).split(':');
    
    if (username !== 'admin' || password !== 'your-secure-password') {
      return new NextResponse('Invalid credentials', { status: 401 });
    }
  }
  
  return NextResponse.next();
}
```

**Option B: Use NextAuth.js (Recommended for production)**
- Install: `npm install next-auth`
- Set up Google/GitHub OAuth
- Protect admin routes with session checks

### 2. Update Supabase RLS Policies
Currently, the `site_config` table allows public writes (for development).

**Production RLS Policy** (run in Supabase SQL Editor):
```sql
-- Drop the public write policy
DROP POLICY IF EXISTS "Allow public write access" ON site_config;

-- Create admin-only write policy (requires auth)
CREATE POLICY "Allow authenticated write access"
  ON site_config
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
```

Then update your admin to use authenticated Supabase client.

---

## 🐛 Troubleshooting

### Build Fails on Vercel
**Error**: "Module not found"
- **Fix**: Check all imports use correct paths
- Run `npm run build` locally first

**Error**: "Environment variable not defined"
- **Fix**: Add missing variables in Vercel settings
- Redeploy after adding

### Products Not Loading
**Error**: Shopify API returns 401
- **Fix**: Check `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- Verify token has correct permissions in Shopify

### Announcements Not Saving
**Error**: Supabase returns 403
- **Fix**: Check Supabase RLS policies
- Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct

### Images Not Loading
**Error**: 403 on Shopify CDN images
- **Fix**: Check `next.config.ts` has `cdn.shopify.com` in `remotePatterns`
- Already configured ✅

---

## 📊 Performance Optimization

### 1. Enable Vercel Analytics
```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 2. Enable Image Optimization
Already configured in `next.config.ts`:
- Shopify CDN images
- Local images in `/public`

### 3. Add Caching Headers
Vercel automatically caches static assets. For API routes:

```typescript
// app/api/config/route.ts
export const revalidate = 60; // Revalidate every 60 seconds
```

---

## 🎯 Custom Domain Setup

1. **Buy domain** (e.g., Namecheap, GoDaddy)
2. **In Vercel**:
   - Go to **Settings** → **Domains**
   - Add your domain: `ritzee.com`
   - Follow DNS instructions
3. **Update Shopify**:
   - Go to Shopify Admin → **Settings** → **Domains**
   - Add your custom domain for checkout

---

## 📈 Monitoring

### Vercel Dashboard
- **Deployments**: View build logs
- **Analytics**: Page views, performance
- **Logs**: Runtime errors

### Supabase Dashboard
- **Database**: Monitor queries
- **Logs**: API requests
- **Usage**: Track bandwidth

### Shopify Analytics
- **Products**: Best sellers
- **Orders**: Sales tracking
- **Customers**: User behavior

---

## 🔄 Continuous Deployment

Every `git push` to `main` branch triggers:
1. Vercel builds your app
2. Runs tests (if configured)
3. Deploys to production
4. Updates live site

**Preview Deployments**: Every PR gets a unique URL for testing.

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Shopify API**: https://shopify.dev/docs
- **Supabase Docs**: https://supabase.com/docs

---

## ✅ Final Checklist

Before going live:

- [ ] All environment variables set in Vercel
- [ ] Supabase migration run successfully
- [ ] Shopify collections created (`bestsellers`, `latest-drops`)
- [ ] Products added to Shopify
- [ ] Test deployment on Vercel preview URL
- [ ] Verify admin panel works
- [ ] Check mobile responsiveness
- [ ] Test all Shopify admin links
- [ ] (Optional) Set up custom domain
- [ ] (Optional) Add admin authentication
- [ ] (Optional) Update Supabase RLS for production

**You're ready to launch! 🚀**

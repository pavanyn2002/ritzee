# Media Storage & URL Guide

## 📁 Where to Store Your Media

You have **4 options** for storing media files:

---

## Option 1: Local Storage (Simplest) ✅

### Location
Store files in your project's `/public` folder:
```
ritzee/
├── public/
│   ├── hero-banner.jpg      ← Your images
│   ├── promo-video.mp4      ← Your videos
│   ├── product-model.glb    ← Your 3D models
│   └── ...
```

### How to Get URL
Files in `/public` are automatically served at the root:
- File: `/public/hero-banner.jpg`
- URL: `/hero-banner.jpg`

### Example
1. Save `hero-banner.jpg` to `c:\Users\pavan\Desktop\projects\ritzeeverse\ritzee\public\`
2. In admin, use URL: `/hero-banner.jpg`

### Pros
- ✅ Simplest setup
- ✅ No external dependencies
- ✅ Works immediately

### Cons
- ❌ Increases deployment size
- ❌ Not ideal for large videos (>10MB)
- ❌ No CDN optimization

**Best for**: Small images, testing, development

---

## Option 2: Shopify CDN (Recommended) ✅

### How to Upload
1. Go to **Shopify Admin** → **Settings** → **Files**
2. Click **Upload files**
3. Select your media (images, videos)
4. Copy the CDN URL (e.g., `https://cdn.shopify.com/s/files/1/0000/0000/files/hero.jpg`)

### How to Get URL
After upload, Shopify provides a CDN URL:
```
https://cdn.shopify.com/s/files/1/YOUR_STORE_ID/files/filename.jpg
```

### Example
1. Upload `hero-video.mp4` to Shopify Files
2. Copy URL: `https://cdn.shopify.com/s/files/1/0123/4567/files/hero-video.mp4`
3. Paste in admin `/admin/site-settings`

### Pros
- ✅ Free CDN (fast worldwide)
- ✅ Automatic optimization
- ✅ No deployment size impact
- ✅ Already configured in `next.config.ts`

### Cons
- ❌ Requires Shopify account
- ❌ File size limits (20MB for free plan)

**Best for**: Production images, videos, hero media

---

## Option 3: Cloud Storage (Advanced)

### Google Cloud Storage

1. **Create Bucket**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/storage)
   - Create a new bucket (e.g., `ritzee-media`)
   - Set to **Public** access

2. **Upload Files**:
   - Upload your media files
   - Get public URL: `https://storage.googleapis.com/ritzee-media/hero.jpg`

3. **Already Configured**: Your `next.config.ts` already allows `storage.googleapis.com`

### Cloudinary (Image/Video CDN)

1. **Sign Up**: [cloudinary.com](https://cloudinary.com) (free tier)
2. **Upload**: Use their dashboard or API
3. **Get URL**: `https://res.cloudinary.com/your-cloud/image/upload/v1/hero.jpg`
4. **Add to next.config.ts**:
```typescript
{
  protocol: 'https',
  hostname: 'res.cloudinary.com',
  pathname: '/**',
}
```

### Pros
- ✅ Unlimited storage (paid)
- ✅ Advanced optimization
- ✅ Image transformations on-the-fly

### Cons
- ❌ Requires setup
- ❌ May require payment

**Best for**: Large media libraries, advanced needs

---

## Option 4: Supabase Storage (Integrated)

### Setup
1. Go to **Supabase Dashboard** → **Storage**
2. Create bucket: `hero-media`
3. Set to **Public**

### Upload Files
```typescript
// In your admin, add file upload
const { data, error } = await supabase.storage
  .from('hero-media')
  .upload('hero-banner.jpg', file);

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('hero-media')
  .getPublicUrl('hero-banner.jpg');
```

### URL Format
```
https://YOUR_PROJECT.supabase.co/storage/v1/object/public/hero-media/hero-banner.jpg
```

### Pros
- ✅ Already using Supabase
- ✅ Free tier (1GB)
- ✅ Direct integration

### Cons
- ❌ Requires code changes for upload UI
- ❌ Storage limits on free tier

**Best for**: If you want everything in one place

---

## 🎯 Recommended Workflow

### For Development (Local)
```bash
# 1. Add files to /public
cp ~/Downloads/hero.jpg public/

# 2. Use in admin
URL: /hero.jpg
```

### For Production (Shopify CDN)
```
1. Upload to Shopify Admin → Settings → Files
2. Copy CDN URL
3. Paste in /admin/site-settings
```

---

## 📝 Quick Reference

| Media Type | Recommended Storage | Example URL |
|------------|-------------------|-------------|
| Hero Images | Shopify CDN | `https://cdn.shopify.com/.../hero.jpg` |
| Hero Videos | Shopify CDN | `https://cdn.shopify.com/.../promo.mp4` |
| 3D Models | Local `/public` | `/product-model.glb` |
| Product Images | Shopify (automatic) | Auto-managed by Shopify |

---

## 🚀 Step-by-Step: Upload to Shopify

### 1. Access Shopify Files
- Login to Shopify Admin
- Go to **Settings** (bottom left)
- Click **Files**

### 2. Upload Media
- Click **Upload files**
- Select your images/videos
- Wait for upload to complete

### 3. Get URL
- Click on the uploaded file
- Click **Copy link** or right-click → **Copy image address**
- URL format: `https://cdn.shopify.com/s/files/1/.../filename.ext`

### 4. Use in Admin
- Go to `http://localhost:9002/admin/site-settings`
- Click **Add Media URL**
- Paste the Shopify CDN URL
- Click **Save Changes**

---

## 🔧 File Size Recommendations

| Media Type | Max Size | Recommended Format |
|------------|----------|-------------------|
| Hero Images | 500KB | WebP, JPG |
| Hero Videos | 10MB | MP4 (H.264), WebM |
| 3D Models | 5MB | GLB (compressed) |

### Compress Before Upload
- **Images**: [squoosh.app](https://squoosh.app)
- **Videos**: [handbrake.fr](https://handbrake.fr)
- **3D Models**: [gltf.report](https://gltf.report)

---

## ⚠️ Important Notes

### Next.js Image Domains
External URLs must be whitelisted in `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    { hostname: 'cdn.shopify.com' },        // ✅ Already added
    { hostname: 'storage.googleapis.com' }, // ✅ Already added
    { hostname: 'your-cdn.com' },           // Add if needed
  ],
}
```

### Video Formats
- **Best**: `.mp4` (H.264 codec) - Universal support
- **Alternative**: `.webm` - Better compression, modern browsers
- **Avoid**: `.avi`, `.mov` - Not web-optimized

### 3D Model Formats
- **Use**: `.glb` - Binary, compressed
- **Avoid**: `.gltf` - Text format, larger files

---

## 🆘 Troubleshooting

### Image Not Loading
**Error**: 403 Forbidden
- **Fix**: Add domain to `next.config.ts` → `remotePatterns`

### Video Not Playing
**Error**: Format not supported
- **Fix**: Convert to `.mp4` (H.264)

### File Too Large
**Error**: Deployment fails
- **Fix**: Use external CDN (Shopify, Cloudinary)
- Don't store large files in `/public`

---

## 📚 Resources

- **Shopify Files**: https://help.shopify.com/en/manual/shopify-admin/productivity-tools/file-uploads
- **Next.js Images**: https://nextjs.org/docs/app/api-reference/components/image
- **Supabase Storage**: https://supabase.com/docs/guides/storage

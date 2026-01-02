# Hero Section Media Support Guide

## ✅ Supported Media Types

Your hero section now supports **3 types of media**:

### 1. Images (Default)
**Formats**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`

**Examples**:
```
/hero-image.png
https://cdn.shopify.com/s/files/1/0000/0000/files/hero.jpg
https://images.unsplash.com/photo-123456789
```

**Features**:
- Next.js Image optimization
- Lazy loading
- Responsive sizing
- Auto-format conversion (WebP)

---

### 2. Videos
**Formats**: `.mp4`, `.webm`, `.ogg`

**Examples**:
```
/hero-video.mp4
https://cdn.shopify.com/videos/hero.webm
https://storage.googleapis.com/bucket/video.mp4
```

**Features**:
- Auto-play (muted)
- Looping
- Full-screen background
- Mobile-optimized

**Best Practices**:
- Keep videos under 10MB for fast loading
- Use `.webm` for better compression
- Provide fallback image for slow connections

---

### 3. 3D Models (Placeholder)
**Formats**: `.glb`, `.gltf`

**Examples**:
```
/model.glb
https://cdn.shopify.com/3d/product.glb
```

**Current Status**: 
- Shows placeholder with "3D Model" text
- Full 3D viewer coming soon (requires Three.js integration)

**Future Features** (when implemented):
- Interactive 3D rotation
- Zoom controls
- Auto-rotate animation

---

## 🎯 How to Use

### In Admin Panel (`/admin/site-settings`)

1. Click **"Add Image URL"**
2. Enter URL or path
3. The system **auto-detects** the file type
4. Click **"Save Changes"**

**Example Mix**:
```
Hero Image 1: /hero-banner.jpg          (Image)
Hero Image 2: /promo-video.mp4          (Video)
Hero Image 3: https://cdn.../model.glb  (3D Model)
```

The carousel will cycle through all three types seamlessly!

---

## 📝 File Type Detection

The hero section automatically detects file types based on extension:

| Extension | Type | Rendering |
|-----------|------|-----------|
| `.jpg`, `.png`, `.webp`, `.svg` | Image | Next.js `<Image>` |
| `.mp4`, `.webm`, `.ogg` | Video | HTML5 `<video>` |
| `.glb`, `.gltf` | 3D Model | Placeholder (for now) |

---

## 🚀 Performance Tips

### For Images
- Use WebP format for 30% smaller files
- Recommended size: 1920x1080 (Full HD)
- Max file size: 500KB

### For Videos
- Compress videos before uploading
- Recommended: 1080p @ 30fps
- Max file size: 10MB
- Use `.webm` for best compression

### For 3D Models
- Optimize GLB files (use gltf-pipeline)
- Max file size: 5MB
- Reduce polygon count for web

---

## 🔧 Next.js Configuration

Your `next.config.ts` already allows external images from:
- `cdn.shopify.com` ✅
- `images.unsplash.com` ✅
- `storage.googleapis.com` ✅

To add more domains, edit `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-cdn.com',
      pathname: '/**',
    },
  ],
}
```

---

## 📱 Mobile Optimization

All media types are mobile-optimized:
- **Images**: Responsive, lazy-loaded
- **Videos**: Auto-pause on mobile data (coming soon)
- **3D Models**: Touch controls (when implemented)

---

## 🎨 Example Hero Configurations

### Fashion Brand (Images Only)
```json
[
  "/hero-collection-spring.jpg",
  "/hero-collection-summer.jpg",
  "/hero-sale-banner.png"
]
```

### Tech Product (Video + Images)
```json
[
  "/product-demo.mp4",
  "/hero-features.jpg",
  "/hero-testimonials.png"
]
```

### 3D Showcase (Mixed Media)
```json
[
  "/hero-intro.jpg",
  "/product-360.mp4",
  "/3d-model.glb"
]
```

---

## ⚠️ Limitations

### Current
- 3D models show placeholder only
- No interactive controls for videos
- No audio support (videos are muted)

### Coming Soon
- Full 3D model viewer with Three.js
- Video controls (play/pause)
- Background audio support

---

## 🆘 Troubleshooting

### Video Not Playing
- Check file format (`.mp4`, `.webm`, `.ogg`)
- Ensure HTTPS for external URLs
- Verify file size < 10MB

### Image Not Loading
- Check domain is in `next.config.ts`
- Verify image URL is accessible
- Check browser console for errors

### 3D Model Shows Placeholder
- This is expected (3D viewer not yet implemented)
- GLB files are detected but not rendered yet

---

## 📚 Resources

- **Optimize Images**: https://squoosh.app
- **Compress Videos**: https://www.freeconvert.com/video-compressor
- **Optimize GLB**: https://gltf.report

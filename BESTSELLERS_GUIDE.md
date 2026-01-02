# Bestsellers & Site Configuration Guide

## ✅ Bestsellers - Use Shopify Collections

**Answer: Manage bestsellers via Shopify, NOT Supabase.**

### Why Shopify?
- Products, inventory, and pricing are already in Shopify
- Shopify has built-in analytics for bestselling products
- No data duplication needed
- Automatic sync with your store

### How to Set Up Bestsellers

1. **Go to Shopify Admin** → Products → Collections
2. **Create a collection** named "Bestsellers"
3. **Set the handle** to `bestsellers` (important!)
4. **Add products** in two ways:
   - **Manual**: Drag and drop your top products
   - **Automatic**: Use conditions like "Product tag equals bestseller"

Your homepage will automatically fetch products from this collection.

---

## 🎨 What to Manage in Supabase Admin

Use your custom admin (`/admin/site-settings`) ONLY for:

### 1. Hero Images
- Homepage slider images
- Add multiple image URLs
- Can be local (`/hero1.png`) or external URLs

### 2. Announcement Bar
- Top bar messages
- Multiple announcements rotate automatically
- Examples: "Sale 50% Off!", "Free Shipping Today"

---

## 📊 Architecture Summary

```
┌─────────────────────────────────────────┐
│         SHOPIFY (Commerce)              │
├─────────────────────────────────────────┤
│ ✓ Products                              │
│ ✓ Collections (Bestsellers, Latest)     │
│ ✓ Orders                                │
│ ✓ Customers                             │
│ ✓ Discounts                             │
│ ✓ 3D Models                             │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│       SUPABASE (Site Content)           │
├─────────────────────────────────────────┤
│ ✓ Hero Images                           │
│ ✓ Announcements                         │
└─────────────────────────────────────────┘
```

---

## 🚀 Quick Start Checklist

- [ ] Run `supabase_migration.sql` in Supabase SQL Editor
- [ ] Add Shopify credentials to `.env.local`
- [ ] Create `bestsellers` collection in Shopify
- [ ] Create `latest-drops` collection in Shopify
- [ ] Visit `/admin/site-settings` to customize hero & announcements
- [ ] Test homepage at `http://localhost:9002`

---

## 💡 Pro Tips

**For Bestsellers:**
- Use Shopify's "Automatic" collection with tag `bestseller`
- Tag your top products with `bestseller` in Shopify
- Collection updates automatically!

**For Hero Images:**
- Use high-quality images (1920x1080 recommended)
- Can use Shopify CDN URLs for images uploaded there
- Preview shows in admin before saving

**For Announcements:**
- Keep messages short (under 60 characters)
- Use emojis for visual appeal: "🔥 Sale 50% Off!"
- Multiple messages rotate every 4 seconds

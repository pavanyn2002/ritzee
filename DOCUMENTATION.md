# RITZEE Website Documentation

A comprehensive guide for managing, customizing, and scaling the RITZEE website.

---

## Table of Contents

1. [Overview](#overview)
2. [Admin Panel Usage](#admin-panel-usage)
3. [Shopify Admin Integration](#shopify-admin-integration)
4. [Code Architecture](#code-architecture)
5. [Customization Guide](#customization-guide)
6. [Scaling Considerations](#scaling-considerations)

---

## Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + Custom CSS
- **Backend**: Supabase (CMS data) + Shopify Storefront API (Products/Cart/Checkout)
- **Deployment**: Vercel (recommended)

### Key Features
- 3D card flip animations on product cards
- Shopify-powered cart with real-time checkout
- Dynamic hero section from Supabase
- Blog system via Supabase
- Responsive design (mobile-first)

---

## Admin Panel Usage

Access: `/admin`

### Hero Images (`/admin/hero`)
Manage the homepage hero carousel images.

| Action | Description |
|--------|-------------|
| Add Image | Enter image URL and click Add |
| Reorder | Drag images to change order |
| Delete | Click X on any image |

**Image Guidelines:**
- Recommended size: 1920x1080px minimum
- Supports: JPG, PNG, WebP
- Can also use video URLs (MP4, WebM)

### Blog Management (`/admin/blogs`)

| Action | Route | Description |
|--------|-------|-------------|
| View All | `/admin/blogs` | List all blog posts |
| Create New | `/admin/blogs/new` | Create new blog post |
| Edit | `/admin/blogs/[id]/edit` | Edit existing post |

**Blog Fields:**
- `title`: Blog post title
- `slug`: URL-friendly identifier (auto-generated)
- `excerpt`: Short description (max 200 chars)
- `content`: Full HTML content
- `image`: Featured image URL
- `author`: Author name
- `tags`: Comma-separated tags
- `published`: Toggle visibility on site

### Site Config (`/admin`)
General site settings stored in `site_config` Supabase table.

---

## Shopify Admin Integration

### Products
All products are managed in Shopify Admin:
1. Go to Shopify Admin → Products
2. Add/edit products with:
   - Title, description, price
   - Images (multiple supported)
   - Variants (sizes: S, M, L, XL, XXL)
   - Tags for categorization

### Collections

| Collection | Purpose | Display Location |
|------------|---------|------------------|
| `bestsellers` | Curated top sellers | Homepage Bestsellers section, `/bestsellers` page |
| Other collections | Product categories | Shop page, Menu dropdown |

**To create Bestsellers:**
1. Shopify Admin → Products → Collections
2. Create collection with handle `bestsellers`
3. Add products manually or via conditions

### Cart & Checkout
The cart uses Shopify Storefront API:
- Cart is created automatically when items are added
- Checkout redirects to Shopify's secure checkout
- No local payment processing needed

---

## Code Architecture

### Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Homepage
│   ├── shop/               # Shop pages
│   ├── products/[slug]/    # Product detail pages
│   ├── bestsellers/        # Bestsellers page
│   ├── blog/               # Blog pages
│   ├── admin/              # Admin panel pages
│   └── api/                # API routes
│
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   ├── card-3d-wrapper.tsx # 3D card animation
│   ├── product-card.tsx    # Product display card
│   ├── header.tsx          # Site header/navigation
│   ├── cart.tsx            # Shopping cart drawer
│   └── ...
│
├── context/                # React Context providers
│   └── cart-context.tsx    # Cart state management
│
├── lib/                    # Utilities
│   ├── shopify/            # Shopify API integration
│   │   ├── index.ts        # API functions
│   │   ├── queries.ts      # GraphQL queries
│   │   └── types.ts        # TypeScript types
│   ├── supabase.ts         # Supabase client
│   └── utils.ts            # Utility functions
│
└── data/                   # Static data/config
    └── site-config.ts      # Site configuration
```

### Key Components

#### Card3DWrapper (`src/components/card-3d-wrapper.tsx`)
Wraps product cards with scroll-triggered flip animation.

```tsx
// Usage
<Card3DWrapper>
  <ProductCard product={product} />
</Card3DWrapper>
```

#### LatestDropsCarousel (`src/components/latest-drops-carousel.tsx`)
- Shows 4 products with rotation
- Mobile: 1 product visible, rotating every 5s
- Desktop: 3 products visible, rotating every 5s

#### BestsellersGrid (`src/components/bestsellers-grid.tsx`)
- Same behavior as LatestDropsCarousel
- Fetches from `bestsellers` collection in Shopify

### Shopify Integration

#### Environment Variables
```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
```

#### Key Functions (`src/lib/shopify/index.ts`)

| Function | Parameters | Description |
|----------|------------|-------------|
| `getProducts` | `sortKey`, `limit` | Fetch products from store |
| `getProduct` | `slug` | Fetch single product by handle |
| `getCollections` | - | Fetch all collections with products |
| `getCollectionProducts` | `collection`, `limit` | Fetch products from specific collection |
| `createCart` | - | Create new Shopify cart |
| `addToCart` | `cartId`, `variantId`, `quantity` | Add item to cart |
| `updateCartItem` | `cartId`, `lineId`, `quantity` | Update cart item quantity |
| `removeFromCart` | `cartId`, `lineId` | Remove item from cart |

### Supabase Integration

#### Tables

| Table | Purpose | Fields |
|-------|---------|--------|
| `site_config` | Site settings | `hero_images`, `announcement_bar_text` |
| `blogs` | Blog posts | `title`, `slug`, `content`, `image`, `published`, etc. |

#### Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## Customization Guide

### Changing Colors
Edit `src/app/globals.css` - CSS variables in `:root`:

```css
:root {
  --primary: 75 100% 50%;      /* Lime green */
  --accent: 75 100% 50%;       /* Same lime */
  --background: 0 0% 5%;       /* Dark background */
  --foreground: 0 0% 98%;      /* Light text */
}
```

### Adding New Pages
1. Create folder in `src/app/[page-name]/`
2. Add `page.tsx` file
3. Export default async function component

### Modifying Product Card Layout
Edit `src/components/product-card.tsx`

### Changing Homepage Sections Order
Edit `src/app/page.tsx` - sections are rendered in order

### Adding New Menu Items
Edit `src/components/header.tsx`:
- Desktop: `NavLinks` component
- Mobile: `MobileNavLinks` component

### Modifying 3D Card Animation
Edit `src/components/card-3d-wrapper.tsx` and `src/app/globals.css`:

```css
/* Animation keyframes */
@keyframes card-rotate-intro {
  0% { transform: perspective(1000px) rotateY(-90deg); }
  100% { transform: perspective(1000px) rotateY(0deg); }
}
```

---

## Scaling Considerations

### Performance

| Optimization | Status | Notes |
|--------------|--------|-------|
| Static caching | ✅ | `revalidate: 60` on homepage |
| Image optimization | ✅ | Next.js Image with remote patterns |
| Limited product fetches | ✅ | Homepage fetches only 4 products |
| API caching | ✅ | Categories API cached 60s |

### Future Improvements

1. **Pagination**: Add pagination to shop/bestsellers for 50+ products
2. **Search**: Current search returns 10 results, increase as needed
3. **CDN**: Use image CDN for Supabase-hosted images
4. **Database**: Index frequently queried fields in Supabase
5. **Caching**: Implement Redis for session/cart caching

### Adding Features

| Feature | Implementation Approach |
|---------|------------------------|
| Wishlist | Create Supabase table, add context similar to cart |
| Reviews | Supabase table linked to product IDs |
| Discounts | Use Shopify discount codes |
| Multi-currency | Shopify International features |
| Analytics | Add Vercel Analytics or Google Analytics |

---

## Quick Reference

### Common Commands
```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm run start
```

### Key URLs
- Homepage: `/`
- Shop: `/shop`
- Product: `/products/[slug]`
- Bestsellers: `/bestsellers`
- Blog: `/blog`
- Admin: `/admin`

### Support
For issues with:
- Products/Checkout → Shopify Support
- Blog/Hero Images → Check Supabase connection
- Styling → Inspect CSS in globals.css

---

*Last updated: January 2026*

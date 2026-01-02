# Shopify + Supabase Hybrid Setup Guide

## Overview
Your Ritzee store uses a **hybrid architecture**:
- **Shopify**: Manages products, orders, customers, and discounts
- **Supabase**: Manages hero images and announcement bar content

## Current Implementation Status ✅

### Already Implemented
- ✅ Shopify API integration for products
- ✅ Custom admin dashboard at `/admin`
- ✅ Site Settings page at `/admin/site-settings`
- ✅ Supabase integration for hero images and announcements
- ✅ 3D model support from Shopify

---

## Step 1: Shopify Setup

### 1.1 Create a Shopify Store
1. Go to [shopify.com](https://www.shopify.com)
2. Sign up for a store (use the free trial)
3. Note your store domain: `your-store-name.myshopify.com`

### 1.2 Get Storefront API Access Token
1. In Shopify Admin, go to **Settings** → **Apps and sales channels**
2. Click **Develop apps**
3. Click **Create an app** (name it "Ritzee Frontend")
4. Go to **Configuration** tab
5. Under **Storefront API**, click **Configure**
6. Enable these permissions:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_collection_listings`
7. Click **Save**
8. Go to **API credentials** tab
9. Copy the **Storefront API access token**

### 1.3 Update Environment Variables
Add to your `.env.local`:
```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store-name.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token-here
```

### 1.4 Add Products to Shopify
1. Go to **Products** → **Add product**
2. Add product details (name, price, description, images)
3. **For 3D models**: In the Media section, upload `.glb` or `.usdz` files
4. Click **Save**

### 1.5 Create Collections
Create these collections for your homepage:
1. **bestsellers** (handle: `bestsellers`)
   - Add your top 4 products
2. **latest-drops** (handle: `latest-drops`)
   - Add your 3 newest products

To create a collection:
1. Go to **Products** → **Collections**
2. Click **Create collection**
3. Set the handle in the URL/SEO section
4. Add products manually or use conditions

---

## Step 2: Supabase Setup

### 2.1 Run the Database Script
1. Open your Supabase dashboard
2. Go to **SQL Editor**
3. Copy the contents of `setup_db.sql` from your project
4. Paste and click **Run**

This creates the `site_config` table with:
- `notification_text` (JSON array of announcements)
- `hero_images` (JSON array of image URLs)
- `notification_enabled` (boolean)

### 2.2 Verify the Table
1. Go to **Table Editor** in Supabase
2. You should see `site_config` table with 1 row (ID: 1)
3. Default values are already populated

---

## Step 3: Using Your Admin Dashboard

### 3.1 Access Admin
Navigate to: `http://localhost:9002/admin`

You'll see:
- **Products** → Links to Shopify Admin
- **Orders** → Links to Shopify Admin
- **Customers** → Links to Shopify Admin
- **Discounts** → Links to Shopify Admin
- **Site Configuration** → Your custom Supabase-backed settings

### 3.2 Manage Site Settings
1. Click **Manage Site Settings**
2. You can now:
   - **Add/Remove Announcements**: Multiple messages that rotate in the top bar
   - **Add/Remove Hero Images**: URLs for the homepage slider

Example hero image URLs:
- `/hero-genz-1.png` (local images in `public/`)
- `https://cdn.shopify.com/...` (Shopify CDN)
- `https://your-domain.com/images/hero.jpg` (external)

### 3.3 Manage Products, Orders, Customers
Click the respective cards to open Shopify Admin in a new tab.

---

## Step 4: Testing

### 4.1 Test Product Display
1. Ensure `npm run dev` is running
2. Visit `http://localhost:9002`
3. You should see:
   - Hero slider with your configured images
   - Announcement bar with rotating messages
   - Bestsellers section (from Shopify)
   - Latest Drops section (from Shopify)

### 4.2 Test 3D Models
1. Upload a `.glb` file to a product in Shopify
2. Add that product to a collection
3. Refresh your homepage
4. The product card should show a "3D VIEW" badge

### 4.3 Test Admin Changes
1. Go to `/admin/site-settings`
2. Add a new announcement: "New Year Sale!"
3. Click **Save Changes**
4. Refresh the homepage
5. The new announcement should appear in the rotating bar

---

## Architecture Summary

```
┌─────────────────────────────────────────────────────────────┐
│                     RITZEE FRONTEND                         │
│                    (Next.js App)                            │
└─────────────────────────────────────────────────────────────┘
                    │                    │
                    │                    │
        ┌───────────▼──────────┐    ┌───▼──────────────┐
        │   SHOPIFY API        │    │   SUPABASE       │
        │   (Storefront)       │    │   (site_config)  │
        ├──────────────────────┤    ├──────────────────┤
        │ • Products           │    │ • Hero Images    │
        │ • Collections        │    │ • Announcements  │
        │ • 3D Models          │    │                  │
        │ • Inventory          │    │                  │
        └──────────────────────┘    └──────────────────┘
                    │
                    │
        ┌───────────▼──────────┐
        │   SHOPIFY ADMIN      │
        │   (Dashboard)        │
        ├──────────────────────┤
        │ • Orders             │
        │ • Customers          │
        │ • Discounts          │
        └──────────────────────┘
```

---

## Troubleshooting

### Products not showing?
- Check `.env.local` has correct Shopify credentials
- Verify products are published in Shopify
- Check browser console for API errors

### Announcements not updating?
- Verify Supabase credentials in `.env.local`
- Check `site_config` table exists
- Ensure RLS policies are enabled (see `setup_db.sql`)

### 3D models not detected?
- Ensure `.glb` files are uploaded to Shopify product media
- Check browser console for GraphQL errors
- Verify `media` field is in Shopify query

---

## Next Steps (Optional)

1. **Add Authentication**: Protect `/admin` routes with NextAuth.js
2. **Deploy**: Deploy to Vercel and update environment variables
3. **Custom Domain**: Connect your domain in Shopify settings
4. **Analytics**: Add Google Analytics or Shopify Analytics

---

## Support

- **Shopify Docs**: https://shopify.dev/docs/api/storefront
- **Supabase Docs**: https://supabase.com/docs
- **Your Admin**: http://localhost:9002/admin

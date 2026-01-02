# Testing Shopify Backend & Frontend Sync

This guide will help you test the integration between your Shopify backend and Next.js frontend by creating test data and verifying synchronization.

## Prerequisites

✅ Shopify store is set up  
✅ Storefront API credentials are configured in `.env.local`  
✅ Development server is running (`npm run dev`)

---

## Step 1: Generate Test Data

Run the test data generator to create random product and collection data:

```bash
npx ts-node scripts/generate-test-data.ts
```

This will output:
- 1 Collection with random name and description
- 5 Products with random titles, prices, descriptions, and images

**Copy this data** - you'll use it in the next steps.

---

## Step 2: Create Collection in Shopify

1. **Open Shopify Admin**
   - Go to your Shopify admin dashboard
   - Navigate to **Products** → **Collections**

2. **Create New Collection**
   - Click **Create collection**
   - Use the generated collection data:
     - **Title**: Copy from generated data
     - **Description**: Copy from generated data
     - **Collection type**: Manual
   
3. **Set Collection Handle**
   - Scroll to **Search engine listing**
   - Click **Edit**
   - Set **URL handle** to: `test-collection`
   - Click **Save**

4. **Save Collection**
   - Click **Save** at the top right

---

## Step 3: Add Products to Shopify

For each of the 5 generated products:

### 3.1 Create Product

1. Go to **Products** → **Add product**

2. **Fill in Product Details**:
   - **Title**: Copy from generated data
   - **Description**: Copy from generated data
   - **Price**: Copy from generated data
   - **Compare at price**: Copy if available (creates sale badge)

3. **Add Product Image**:
   - In the **Media** section, click **Add media**
   - Choose **Add from URL**
   - Paste the `imageUrl` from generated data
   - Click **Add media**

4. **Set Product Organization**:
   - **Product type**: Copy from generated data
   - **Vendor**: Copy from generated data
   - **Tags**: Copy tags from generated data (comma-separated)
   - **Collections**: Select **test-collection**

5. **Set Product Status**:
   - Under **Product status**, select **Active**
   - Ensure **Sales channels** includes **Online Store**

6. **Save Product**:
   - Click **Save** at the top right

### 3.2 Repeat for All Products

Repeat the above steps for all 5 generated products.

---

## Step 4: Verify in Shopify Admin

Before testing the frontend, verify in Shopify:

1. **Check Collection**:
   - Go to **Products** → **Collections**
   - Find your test collection
   - Verify it shows 5 products

2. **Check Products**:
   - Go to **Products** → **All products**
   - Verify all 5 products are listed
   - Ensure status is **Active**

---

## Step 5: Test Frontend Sync

### 5.1 View Test Collection Page

1. **Navigate to Test Collection**:
   ```
   http://localhost:9002/collections/test-collection
   ```

2. **Verify Display**:
   - ✅ All 5 products appear
   - ✅ Product images load correctly
   - ✅ Product titles match Shopify data
   - ✅ Prices display correctly
   - ✅ Sale badges appear (if compareAtPrice was set)

### 5.2 Check Individual Product Pages

1. **Click on a Product**:
   - Click any product card

2. **Verify Product Details**:
   - ✅ Product title is correct
   - ✅ Description displays properly
   - ✅ Price is accurate
   - ✅ Images load
   - ✅ Product options appear (if any)
   - ✅ "Add to Cart" button works

### 5.3 Test Homepage Integration

1. **Navigate to Homepage**:
   ```
   http://localhost:9002
   ```

2. **Check if Test Products Appear**:
   - If you tagged products with "bestseller" or "new-arrival"
   - They should appear in respective sections

---

## Step 6: Test Cart Functionality

1. **Add Product to Cart**:
   - Go to any test product page
   - Click **Add to Cart**

2. **Verify Cart**:
   - ✅ Cart icon updates with item count
   - ✅ Cart sidebar shows product
   - ✅ Product details are correct
   - ✅ Quantity can be updated
   - ✅ Product can be removed

3. **Test Checkout**:
   - Click **Checkout** in cart
   - ✅ Redirects to Shopify checkout
   - ✅ Products appear in Shopify cart

---

## Step 7: Verify API Responses

### 7.1 Check Browser Console

1. **Open Developer Tools**:
   - Press `F12` or `Ctrl+Shift+I`
   - Go to **Console** tab

2. **Refresh Collection Page**:
   - Look for GraphQL requests
   - Verify no errors appear

### 7.2 Check Network Tab

1. **Go to Network Tab**:
   - Filter by **Fetch/XHR**

2. **Refresh Page**:
   - Look for requests to `shopify.com/api/graphql`
   - Click on request
   - Check **Response** tab
   - Verify product data is returned

---

## Expected Results

### ✅ Success Indicators

- Collection page displays all test products
- Product details match Shopify data exactly
- Images load without errors
- Prices display correctly with currency
- Cart operations work smoothly
- No console errors
- GraphQL API returns proper data structure

### ❌ Common Issues

| Issue | Solution |
|-------|----------|
| Products not showing | Verify products are **Active** and in **Online Store** channel |
| Images not loading | Check image URLs are valid and accessible |
| Collection not found | Verify collection handle is exactly `test-collection` |
| API errors in console | Check `.env.local` has correct Shopify credentials |
| Blank page | Check terminal for build errors |

---

## Step 8: Clean Up (Optional)

After testing, you can remove test data:

1. **Delete Products**:
   - Go to **Products** → **All products**
   - Select test products
   - Click **More actions** → **Delete products**

2. **Delete Collection**:
   - Go to **Products** → **Collections**
   - Find test collection
   - Click **Delete collection**

---

## Advanced Testing

### Test with Different Product Types

Try creating products with:
- **Multiple variants** (sizes, colors)
- **3D models** (upload `.glb` files)
- **Multiple images**
- **Out of stock** items

### Test Collection Sorting

In Shopify collection settings, try different sort orders:
- Best selling
- Price: Low to high
- Price: High to low
- Newest

Then verify the frontend reflects the same order.

---

## Troubleshooting

### Products Not Syncing?

1. **Check Environment Variables**:
   ```bash
   # Verify these are set in .env.local
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
   ```

2. **Restart Dev Server**:
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

3. **Clear Next.js Cache**:
   ```bash
   rm -rf .next
   npm run dev
   ```

### API Permission Issues?

Verify Storefront API permissions in Shopify:
- `unauthenticated_read_product_listings`
- `unauthenticated_read_collection_listings`

---

## Success! 🎉

If all tests pass, your Shopify backend and frontend are properly synchronized!

**Next Steps**:
- Add more products to your store
- Create additional collections
- Customize product templates
- Set up production deployment

---

## Need Help?

- Check `SHOPIFY_SETUP_GUIDE.md` for setup instructions
- Review Shopify GraphQL API docs: https://shopify.dev/docs/api/storefront
- Check browser console for detailed error messages

# Environment Variables Template

# Copy this file to .env.local and fill in your actual values
# DO NOT commit .env.local to git (it's in .gitignore)

# ============================================
# SHOPIFY CONFIGURATION
# ============================================
# Get these from: Shopify Admin → Apps → Develop apps → Your App → API credentials

# Your Shopify store domain (e.g., ritzee-store.myshopify.com)
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com

# Storefront API access token (starts with shpat_...)
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token-here

# ============================================
# SUPABASE CONFIGURATION
# ============================================
# Get these from: Supabase Dashboard → Settings → API

# Your Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Supabase anon/public key (safe to expose in browser)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# ============================================
# OPTIONAL: ANALYTICS & MONITORING
# ============================================

# Google Analytics (if using)
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Vercel Analytics (automatically enabled on Vercel)
# No env var needed

# ============================================
# NOTES
# ============================================
# - All NEXT_PUBLIC_* variables are exposed to the browser
# - Never put secret keys in NEXT_PUBLIC_* variables
# - For Vercel deployment, add these in: Settings → Environment Variables
# - For local development, create .env.local with these values

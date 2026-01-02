
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const filePath = path.join(__dirname, '../src/lib/products.json');
const rawData = fs.readFileSync(filePath, 'utf8');
const { products } = JSON.parse(rawData);

async function migrate() {
    console.log(`Found ${products.length} products to migrate...`);

    // First, let's get or create categories
    // We'll map category names to IDs
    const categoryMap = {};

    // Get existing categories
    const { data: existingCategories, error: catError } = await supabase
        .from('categories')
        .select('id, name');

    if (catError) {
        console.error("Error fetching categories:", catError);
        return;
    }

    // Build map
    existingCategories.forEach(c => categoryMap[c.name] = c.id);

    // Check if we need to create any missing categories from the JSON files
    // products.json has categories like "Oversized T-Shirts", "Hoodies", "Baggy Jeans"
    // schema.sql inserted these default values, but let's be safe.

    for (const p of products) {
        let catId = categoryMap[p.category];

        // If category doesn't exist in DB, create it (simplify slug creation)
        if (!catId) {
            const slug = p.category.toLowerCase().replace(/ /g, '-');
            const { data: newCat, error: newCatError } = await supabase
                .from('categories')
                .insert({ name: p.category, slug })
                .select('id')
                .single();

            if (newCatError) {
                console.error(`Error creating category ${p.category}:`, newCatError);
                continue;
            }
            catId = newCat.id;
            categoryMap[p.category] = catId;
            console.log(`Created new category: ${p.category}`);
        }

        // Now insert product
        // Prepare product object for DB
        const dbProduct = {
            name: p.name,
            slug: p.slug,
            description: p.description,
            price: p.price,
            original_price: p.originalPrice || null,
            category_id: catId,
            images: [p.image], // JSON has single image string, DB expects array
            stock_by_size: { S: 10, M: 10, L: 10, XL: 5, XXL: 2 }, // Default fake stock
            is_active: true
        };

        // Upsert based on slug to avoid duplicates if run multiple times
        const { error: prodError } = await supabase
            .from('products')
            .upsert(dbProduct, { onConflict: 'slug' });

        if (prodError) {
            console.error(`Error migrating product ${p.name}:`, prodError);
        } else {
            console.log(`Migrated: ${p.name}`);
        }
    }

    console.log("Migration complete!");
}

migrate();


const { createClient } = require('@supabase/supabase-js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function clearDb() {
    console.log('Clearing all products and categories...');

    // Delete all products (UUID safe)
    const { error: pError } = await supabase
        .from('products')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Assuming UUID, but this works generally for "not this specific UUID"

    // Alternative if above fails on type mismatch for int:
    // .not('id', 'is', null) is cleaner but sometimes finicky in older client versions.
    // Let's try simple delete all without filter if RLS allows, but usually need a filter.
    // actually, .neq('id', 0) failing on uuid means it IS uuid.

    if (pError) {
        console.error('Error deleting products:', pError);
    } else {
        console.log('All products deleted.');
    }

    // Delete all categories
    //   const { error: cError } = await supabase
    //     .from('categories')
    //     .delete()
    //     .gt('id', 0);

    //   if (cError) {
    //       console.error('Error deleting categories:', cError);
    //   } else {
    //       console.log('All categories deleted.');
    //   }
}

clearDb();

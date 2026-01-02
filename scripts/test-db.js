
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function testConnection() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log('Testing connection to:', url);
    console.log('Using Key:', key);

    if (!url || !key) {
        console.error('Missing URL or Key in .env.local');
        return;
    }

    const supabase = createClient(url, key);

    // Try to read a non-existent table just to check if auth works (should return 404 or empty, not 401 ideally if anon)
    // Or check site_config if we assume it exists? No, it doesn't exist yet.
    // Actually, standard check is to just initialize. 
    // But to verify key validity, we need to make a request.
    // Let's try to select from a table that doesn't exist, we expect an error regarding table, NOT auth.

    const { data, error } = await supabase.from('site_config').select('*').limit(1);

    if (error) {
        console.log('Result:', error);
        if (error.code === 'PGRST301' || error.message?.includes('JWT') || error.code === '401' || error.status === 401) {
            console.error('CRITICAL: Authentication Failed. Key is likely invalid or expired.');
        } else if (error.code === '42P01') {
            console.log('SUCCESS: Connection established! (Table site_config not found, which is expected).');
        } else {
            console.log('Connection seems okay, but encountered another error:', error.message);
        }
    } else {
        console.log('SUCCESS: Connection established!');
    }
}

testConnection();

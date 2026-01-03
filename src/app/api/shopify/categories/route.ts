
import { NextResponse } from 'next/server';
import { getCollections } from '@/lib/shopify';

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
    try {
        const collections = await getCollections();

        // Extract title and handle, filter out 'bestsellers' (has its own menu)
        const categories = collections
            .filter((c: any) => c.handle !== 'bestsellers' && c.products?.length > 0)
            .map((c: any) => ({
                title: c.title,
                handle: c.handle
            }));

        return NextResponse.json({ categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ categories: [], error: 'Failed to fetch categories' }, { status: 500 });
    }
}

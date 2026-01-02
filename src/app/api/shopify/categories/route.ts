
import { NextResponse } from 'next/server';
import { getCollections } from '@/lib/shopify';

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
    try {
        const collections = await getCollections();

        // Extract titles and filter out empty ones if needed
        // Assuming getCollections returns { title, ... }
        const categories = collections.map((c: any) => c.title);

        const uniqueCategories = Array.from(new Set(categories));

        return NextResponse.json({ categories: uniqueCategories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ categories: [], error: 'Failed to fetch categories' }, { status: 500 });
    }
}

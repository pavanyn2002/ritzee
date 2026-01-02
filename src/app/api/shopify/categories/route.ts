import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/shopify';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Fetch all products from Shopify
        const products = await getProducts({});

        // Extract unique product types (categories)
        const categorySet = new Set<string>();
        products.forEach((product) => {
            if (product.productType) {
                categorySet.add(product.productType);
            }
        });

        const categories = Array.from(categorySet).sort();

        return NextResponse.json({ categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ categories: [] }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/shopify';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');

        if (!query || query.trim().length === 0) {
            return NextResponse.json({ products: [] });
        }

        // Fetch products from Shopify with search query
        const products = await getProducts({ query: query.trim(), limit: 10 });

        // Map to simplified format for search results
        const searchResults = products.map((p) => ({
            id: p.id,
            slug: p.handle,
            name: p.title,
            description: p.description,
            price: parseFloat(p.priceRange.minVariantPrice.amount),
            image: p.featuredImage?.url || '/placeholder.png',
            category: p.productType || 'Products',
        }));

        return NextResponse.json({ products: searchResults });
    } catch (error) {
        console.error('Error searching products:', error);
        return NextResponse.json({ products: [] }, { status: 500 });
    }
}

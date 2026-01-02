import { NextResponse } from 'next/server';
import { addToCart } from '@/lib/shopify';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { cartId, lines } = body;

        if (!cartId || !lines || !Array.isArray(lines)) {
            return NextResponse.json({ error: 'Cart ID and lines array required' }, { status: 400 });
        }

        const cart = await addToCart(cartId, lines);
        return NextResponse.json({ cart });
    } catch (error) {
        console.error('Error adding to cart:', error);
        return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
    }
}

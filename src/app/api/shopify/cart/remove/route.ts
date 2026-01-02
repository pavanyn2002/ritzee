import { NextResponse } from 'next/server';
import { removeFromCart } from '@/lib/shopify';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { cartId, lineIds } = body;

        if (!cartId || !lineIds || !Array.isArray(lineIds)) {
            return NextResponse.json({ error: 'Cart ID and line IDs array required' }, { status: 400 });
        }

        const cart = await removeFromCart(cartId, lineIds);
        return NextResponse.json({ cart });
    } catch (error) {
        console.error('Error removing from cart:', error);
        return NextResponse.json({ error: 'Failed to remove from cart' }, { status: 500 });
    }
}

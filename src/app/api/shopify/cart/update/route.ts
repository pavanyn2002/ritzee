import { NextResponse } from 'next/server';
import { updateCart } from '@/lib/shopify';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { cartId, lines } = body;

        if (!cartId || !lines || !Array.isArray(lines)) {
            return NextResponse.json({ error: 'Cart ID and lines array required' }, { status: 400 });
        }

        const cart = await updateCart(cartId, lines);
        return NextResponse.json({ cart });
    } catch (error) {
        console.error('Error updating cart:', error);
        return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
    }
}

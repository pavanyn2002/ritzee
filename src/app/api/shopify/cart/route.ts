import { NextResponse } from 'next/server';
import { getCart } from '@/lib/shopify';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const cartId = searchParams.get('cartId');

        if (!cartId) {
            return NextResponse.json({ error: 'Cart ID required' }, { status: 400 });
        }

        const cart = await getCart(cartId);
        return NextResponse.json({ cart });
    } catch (error) {
        console.error('Error fetching cart:', error);
        return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
    }
}

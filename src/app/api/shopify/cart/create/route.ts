import { NextResponse } from 'next/server';
import { createCart } from '@/lib/shopify';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { lines } = body;

        if (!lines || !Array.isArray(lines)) {
            return NextResponse.json({ error: 'Lines array required' }, { status: 400 });
        }

        const cart = await createCart(lines);
        return NextResponse.json({ cart });
    } catch (error) {
        console.error('Error creating cart:', error);
        return NextResponse.json({ error: 'Failed to create cart' }, { status: 500 });
    }
}

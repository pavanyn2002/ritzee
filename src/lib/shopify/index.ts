import { ComponentProps } from 'react';
import { getCollectionProductsQuery, getProductsQuery, getProductQuery, getCollectionsQuery } from './queries';
import { Connection, Product } from './types';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function shopifyFetch<T>({
    query,
    variables,
    headers,
    cache = 'force-cache',
    tags,
    revalidate,
}: {
    query: string;
    variables?: any;
    headers?: HeadersInit;
    cache?: RequestCache;
    tags?: string[];
    revalidate?: number;
}): Promise<{ status: number; body: T } | never> {
    try {
        const result = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': storefrontAccessToken || '',
                ...headers,
            },
            body: JSON.stringify({
                ...(query && { query }),
                ...(variables && { variables }),
            }),
            cache,
            ...(tags && { next: { tags } }),
            ...(revalidate && { next: { revalidate } }),
        });

        const body = await result.json();

        if (body.errors) {
            throw body.errors[0];
        }

        return {
            status: result.status,
            body,
        };
    } catch (e) {
        if (!domain || !storefrontAccessToken) {
            console.warn("Shopify credentials missing. Returning empty response.");
            return { status: 200, body: { data: {} } as any };
        }
        throw {
            error: e,
            query,
        };
    }
}

const removeEdgesAndNodes = <T>(connection: Connection<T>): T[] => {
    return connection.edges.map((edge) => edge.node);
};

export async function getProducts({
    sortKey,
    reverse,
    query,
}: {
    sortKey?: 'TITLE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
    reverse?: boolean;
    query?: string;
} = {}): Promise<Product[]> {
    const res = await shopifyFetch<{ data: { products: Connection<Product> } }>({
        query: getProductsQuery,
        variables: {
            sortKey,
            reverse,
            query,
        },
        revalidate: 60 // Revalidate every 60 seconds
    });

    if (!res.body.data.products) return [];

    return removeEdgesAndNodes(res.body.data.products);
}

export async function getCollectionProducts({
    collection,
    sortKey,
    reverse
}: {
    collection: string;
    sortKey?: 'TITLE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
    reverse?: boolean;
}): Promise<Product[]> {
    const res = await shopifyFetch<{ data: { collection: { products: Connection<Product> } } }>({
        query: getCollectionProductsQuery,
        variables: {
            handle: collection,
            sortKey,
            reverse
        },
        revalidate: 60 // Revalidate every 60 seconds
    });

    if (!res.body.data.collection?.products) return [];

    return removeEdgesAndNodes(res.body.data.collection.products);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
    const res = await shopifyFetch<{ data: { product: Product } }>({
        query: getProductQuery,
        variables: { handle },
        revalidate: 60
    });

    return res.body.data.product;
}

export async function getCollections(): Promise<any[]> {
    const res = await shopifyFetch<{ data: { collections: Connection<any> } }>({
        query: getCollectionsQuery,
        revalidate: 60
    });

    if (!res.body.data.collections) return [];

    return removeEdgesAndNodes(res.body.data.collections).map((collection: any) => ({
        ...collection,
        products: removeEdgesAndNodes(collection.products)
    }));
}

// Cart API Functions
import {
    CREATE_CART_MUTATION,
    ADD_TO_CART_MUTATION,
    UPDATE_CART_MUTATION,
    REMOVE_FROM_CART_MUTATION,
    GET_CART_QUERY,
} from './mutations';

export async function createCart(lines: { merchandiseId: string; quantity: number }[]) {
    const res = await shopifyFetch<any>({
        query: CREATE_CART_MUTATION,
        variables: { input: { lines } },
        cache: 'no-store',
    });
    return res.body.data.cartCreate.cart;
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]) {
    const res = await shopifyFetch<any>({
        query: ADD_TO_CART_MUTATION,
        variables: { cartId, lines },
        cache: 'no-store',
    });
    return res.body.data.cartLinesAdd.cart;
}

export async function updateCart(cartId: string, lines: { id: string; quantity: number }[]) {
    const res = await shopifyFetch<any>({
        query: UPDATE_CART_MUTATION,
        variables: { cartId, lines },
        cache: 'no-store',
    });
    return res.body.data.cartLinesUpdate.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
    const res = await shopifyFetch<any>({
        query: REMOVE_FROM_CART_MUTATION,
        variables: { cartId, lineIds },
        cache: 'no-store',
    });
    return res.body.data.cartLinesRemove.cart;
}

export async function getCart(cartId: string) {
    const res = await shopifyFetch<any>({
        query: GET_CART_QUERY,
        variables: { cartId },
        cache: 'no-store',
    });
    return res.body.data.cart;
}

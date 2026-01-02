// Product type definition
// This matches the structure from Shopify and is used throughout the app

export type Product = {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    image: string;
    imageHint?: string;
    modelUrl?: string;
    category: string;
};

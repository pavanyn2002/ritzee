import { getProduct } from '@/lib/shopify';
import { notFound } from 'next/navigation';
import ProductClient from './client'; // New client component for interactivity
import { Product } from '@/lib/shopify/types';

export const dynamic = 'force-dynamic';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;

  const shopifyProduct = await getProduct(slug);

  if (!shopifyProduct) {
    notFound();
  }

  // Helper to map Shopify Product to Frontend Product shape
  // This logic is shared with page.tsx - ideally should be refactored to a utility
  const product = {
    id: shopifyProduct.id,
    name: shopifyProduct.title,
    slug: shopifyProduct.handle,
    price: parseFloat(shopifyProduct.priceRange.minVariantPrice.amount),
    description: shopifyProduct.description,
    discount_price: null,
    images: shopifyProduct.images.edges.map((e: any) => e.node.url),
    image: shopifyProduct.featuredImage?.url || shopifyProduct.images.edges[0]?.node.url || '/placeholder.png',
    originalPrice: shopifyProduct.compareAtPriceRange?.maxVariantPrice?.amount
      ? parseFloat(shopifyProduct.compareAtPriceRange.maxVariantPrice.amount)
      : undefined,
    imageHint: 'product view',
    modelUrl: shopifyProduct.media?.edges.find((e: any) => e.node.sources)?.node.sources[0]?.url || '',
    category: (shopifyProduct.tags[0] || 'Apparel') as any,
    defaultVariantId: shopifyProduct.variants?.edges[0]?.node.id,
    variants: shopifyProduct.variants?.edges?.map((e: any) => ({
      id: e.node.id,
      title: e.node.title,
      available: e.node.availableForSale,
      price: parseFloat(e.node.price.amount),
      options: e.node.selectedOptions
    })) || []
  };

  return <ProductClient product={product} />;
}

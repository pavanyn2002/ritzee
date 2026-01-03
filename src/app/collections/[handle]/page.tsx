import { getCollectionProducts } from '@/lib/shopify';
import { Product } from '@/lib/shopify/types';
import ProductCard from '@/components/product-card';
import { ScrollAnimation } from '@/components/scroll-animation';
import { notFound } from 'next/navigation';

export const revalidate = 60;

interface CollectionPageProps {
    params: {
        handle: string;
    };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
    const { handle } = params;

    const products = await getCollectionProducts({
        collection: handle,
        limit: 50
    });

    if (!products || products.length === 0) {
        // Optionally return 404 if no products found, or just show empty state
        // notFound(); 
    }

    // Helper to map Shopify Product to Frontend Product shape
    const mapProduct = (p: Product) => ({
        id: p.id,
        name: p.title,
        slug: p.handle,
        price: parseFloat(p.priceRange.minVariantPrice.amount),
        description: p.description,
        discount_price: null,
        images: p.images.edges.map(e => e.node.url),
        image: p.featuredImage?.url || p.images.edges[0]?.node.url || '/placeholder.png',
        originalPrice: undefined,
        imageHint: 'product view',
        modelUrl: p.media?.edges.find((e: any) => e.node.sources)?.node.sources[0]?.url || '',
        category: (p.tags[0] || 'Apparel') as any
    });

    // Format title from handle (e.g. "test-collection" -> "Test Collection")
    const title = handle
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container px-4 md:px-6">
                <ScrollAnimation>
                    <div className="flex flex-col items-center text-center space-y-4 mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold font-headline uppercase">
                            {title}
                        </h1>
                        <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                            {products.length} Products
                        </p>
                    </div>
                </ScrollAnimation>

                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-muted-foreground mb-4">No products found in this collection</p>
                        <p className="text-sm text-muted-foreground">
                            Ensure the collection handle "{handle}" is correct and products are active.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product, index) => (
                            <ScrollAnimation key={product.id} delay={index * 50}>
                                <ProductCard product={mapProduct(product)} />
                            </ScrollAnimation>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

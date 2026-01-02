import ProductCard from '@/components/product-card';
import { ScrollAnimation } from '@/components/scroll-animation';
import { getCollectionProducts } from '@/lib/shopify';

export const dynamic = 'force-dynamic';

export default async function BestsellersPage() {
    // Fetch products from Shopify "bestsellers" collection
    const bestsellers = await getCollectionProducts({ collection: 'bestsellers' });

    // Map to frontend product shape
    const products = bestsellers.map(p => ({
        id: p.id,
        name: p.title,
        slug: p.handle,
        price: parseFloat(p.priceRange.minVariantPrice.amount),
        description: p.description,
        images: p.images.edges.map(e => e.node.url),
        image: p.featuredImage?.url || p.images.edges[0]?.node.url || '/placeholder.png',
        category: 'Bestseller'
    }));

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container px-4 md:px-6">
                <ScrollAnimation>
                    <div className="flex flex-col items-center text-center space-y-4 mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold font-headline glitch" data-text="BESTSELLERS">
                            BESTSELLERS
                        </h1>
                        <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                            The most coveted pieces from the RitzeeVerse. These are the items visible across all dimensions.
                        </p>
                    </div>
                </ScrollAnimation>

                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-muted-foreground mb-4">No bestsellers yet</p>
                        <p className="text-sm text-muted-foreground">
                            Add products to the "bestsellers" collection in Shopify to display them here.
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                            (Collection handle must be <code>bestsellers</code>)
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product: any, index: number) => (
                            <ScrollAnimation key={product.id} delay={index * 50}>
                                <ProductCard product={product} />
                            </ScrollAnimation>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

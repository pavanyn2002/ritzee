
import ProductCard from '@/components/product-card';
import { getCollections } from '@/lib/shopify';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ScrollAnimation } from '@/components/scroll-animation';
import ShopCarousel from './shop-carousel';

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  // Fetch all collections with their products
  let collections = await getCollections();

  // Filter out empty collections if desired
  const displayCollections = collections.filter(c => c.products.length > 0);

  // If no collections, show standard empty state
  if (displayCollections.length === 0) {
    return (
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <ScrollAnimation>
              <h1 className="text-3xl font-black font-headline tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                THE COLLECTION
              </h1>
            </ScrollAnimation>
            <ScrollAnimation delay={200}>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Explore our exclusive range of dark luxury streetwear.
              </p>
            </ScrollAnimation>
          </div>
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground mb-4">No collections found</p>
            <p className="text-sm text-muted-foreground">
              Create collections in Shopify to organize your products here.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <ScrollAnimation>
            <h1 className="text-3xl font-black font-headline tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              THE COLLECTION
            </h1>
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Explore our exclusive range of dark luxury streetwear.
            </p>
          </ScrollAnimation>
        </div>

        <div className="space-y-24">
          {displayCollections.map((collection, index) => {
            // Map Shopify Product to Frontend Product
            const categoryProducts = collection.products.map((p: any) => ({
              id: p.id,
              slug: p.handle,
              name: p.title,
              description: p.description,
              price: parseFloat(p.priceRange.minVariantPrice.amount),
              originalPrice: p.compareAtPriceRange?.maxVariantPrice?.amount
                ? parseFloat(p.compareAtPriceRange.maxVariantPrice.amount)
                : undefined,
              image: p.featuredImage?.url || p.images?.edges?.[0]?.node?.url || '/placeholder.png',
              imageHint: 'product',
              modelUrl: p.media?.edges?.find((edge: any) => edge.node.__typename === 'Model3d')?.node?.sources?.[0]?.url || '',
              category: collection.title || 'Collection',
            }));

            // Layout Logic
            const isAlternate = index % 2 === 1;

            return (
              <div key={collection.id} id={collection.handle} className="space-y-8">
                <ScrollAnimation>
                  <div className="flex items-center justify-between border-b pb-4">
                    <Link href={`/collections/${collection.handle}`} className="group flex items-center gap-2">
                      <h2 className="text-2xl font-bold font-headline tracking-tight uppercase text-primary group-hover:underline">
                        {collection.title}
                      </h2>
                      <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground hidden sm:inline-block">
                        {categoryProducts.length} items
                      </span>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/collections/${collection.handle}`}>
                          View All
                        </Link>
                      </Button>
                    </div>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation delay={200}>
                  <ShopCarousel products={categoryProducts} isAlternate={isAlternate} />
                </ScrollAnimation>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

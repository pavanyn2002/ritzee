
import ProductCard from '@/components/product-card';
import { getProducts } from '@/lib/shopify';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ScrollAnimation } from '@/components/scroll-animation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  // Fetch all products from Shopify
  const allProducts = await getProducts();

  // Map products to the format expected by ProductCard
  const products = allProducts.map((p) => ({
    id: p.id,
    slug: p.handle,
    name: p.title,
    description: p.description,
    price: parseFloat(p.priceRange.minVariantPrice.amount),
    originalPrice: p.compareAtPriceRange?.minVariantPrice?.amount
      ? parseFloat(p.compareAtPriceRange.minVariantPrice.amount)
      : undefined,
    image: p.featuredImage?.url || '/placeholder.png',
    imageHint: 'product',
    modelUrl: p.media?.edges?.find((edge: any) => edge.node.__typename === 'Model3d')?.node?.sources?.[0]?.url || '',
    category: p.productType || 'All Products',
  }));

  // Group products by category
  const categoriesMap = new Map<string, typeof products>();
  products.forEach((product) => {
    const category = product.category;
    if (!categoriesMap.has(category)) {
      categoriesMap.set(category, []);
    }
    categoriesMap.get(category)!.push(product);
  });

  // Convert to array of categories with products
  const displayCategories = Array.from(categoriesMap.entries()).map(([name, products]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    products,
  }));

  // If no products, show empty state
  if (products.length === 0) {
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
            <p className="text-xl text-muted-foreground mb-4">No products yet</p>
            <p className="text-sm text-muted-foreground">
              Add products to your Shopify store to display them here.
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
          {displayCategories.map((category, index) => {
            const categoryProducts = category.products;

            if (categoryProducts.length === 0) return null;

            // Layout Logic (keeping the aesthetic variation)
            const isMiddleRow = index % 3 === 1;

            return (
              <div key={category.slug || index} id={category.slug} className="space-y-8">
                <ScrollAnimation>
                  <div className="flex items-center justify-between border-b pb-4">
                    <h2 className="text-2xl font-bold font-headline tracking-tight uppercase text-primary">
                      {category.name}
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      {categoryProducts.length} items
                    </span>
                  </div>
                </ScrollAnimation>

                <ScrollAnimation delay={200}>
                  <Carousel
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-3">
                      {categoryProducts.map((product: any) => (
                        <CarouselItem
                          key={product.id}
                          className={`pl-3 ${isMiddleRow ? 'sm:basis-1/3 md:basis-1/4 lg:basis-1/5' : 'sm:basis-1/2 md:basis-[30%] lg:basis-[22%]'}`}
                        >
                          <div className="p-1 h-full">
                            <ProductCard product={product} />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <div className="flex justify-end gap-2 mt-4">
                      <CarouselPrevious className="static translate-y-0" />
                      <CarouselNext className="static translate-y-0" />
                    </div>
                  </Carousel>
                </ScrollAnimation>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

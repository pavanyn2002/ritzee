
'use client';

import ProductCard from '@/components/product-card';
import { ScrollAnimation } from '@/components/scroll-animation';
import { products } from '@/lib/products';
import { useSearchParams } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const allCategories = [...new Set(products.map((p) => p.category))];

  const filteredCategories = categoryParam
    ? allCategories.filter((c) => c === categoryParam)
    : allCategories;

  const pageTitle = categoryParam ? `${categoryParam}` : 'Our Collection';

  // When viewing a specific category, show all products in a grid
  if (categoryParam) {
    const categoryProducts = products.filter((p) => p.category === categoryParam);

    return (
      <section className="py-16 sm:py-24 min-h-[calc(100vh-12rem)]">
        <div className="container px-4 md:px-6">
          <ScrollAnimation>
            <div className="flex items-center gap-4 mb-8">
              <Button asChild variant="ghost" size="icon">
                <Link href="/shop">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
                {pageTitle}
              </h1>
            </div>
            <p className="text-muted-foreground mb-12">
              Showing {categoryProducts.length} products
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product, index) => (
              <ScrollAnimation key={product.id} delay={index * 50}>
                <ProductCard product={product} />
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default view: show all categories with carousels
  return (
    <section className="py-16 sm:py-24">
      <div className="container px-4 md:px-6">
        <ScrollAnimation>
          <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl mb-12 text-center">
            {pageTitle}
          </h1>
        </ScrollAnimation>

        <div className="space-y-16">
          {filteredCategories.map((category) => {
            const categoryProducts = products.filter(
              (p) => p.category === category
            );
            if (categoryProducts.length === 0) return null;

            return (
              <div key={category}>
                <ScrollAnimation>
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-headline font-bold tracking-tighter">
                      {category}
                    </h2>
                    <Button asChild variant="outline" className="hidden sm:flex">
                      <Link href={`/shop?category=${encodeURIComponent(category)}`}>View All <ArrowRight className="ml-2" /></Link>
                    </Button>
                  </div>
                </ScrollAnimation>
                <Carousel
                  opts={{
                    align: 'start',
                    loop: categoryProducts.length > 4,
                  }}
                  plugins={[
                    Autoplay({
                      delay: 5000,
                      stopOnInteraction: true,
                    }),
                  ]}
                  className="w-full"
                >
                  <CarouselContent>
                    {categoryProducts.map((product) => (
                      <CarouselItem
                        key={product.id}
                        className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                      >
                        <div className="p-1">
                          <ProductCard product={product} />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden lg:flex" />
                  <CarouselNext className="hidden lg:flex" />
                </Carousel>
                <div className="mt-4 text-center sm:hidden">
                  <Button asChild variant="outline">
                    <Link href={`/shop?category=${encodeURIComponent(category)}`}>View All {category}</Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

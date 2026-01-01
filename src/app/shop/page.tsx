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

export default function ShopPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const allCategories = [...new Set(products.map((p) => p.category))];

  const filteredCategories = categoryParam
    ? allCategories.filter((c) => c === categoryParam)
    : allCategories;

  const pageTitle = categoryParam ? `${categoryParam}` : 'Our Collection';

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
                {!categoryParam && (
                  <ScrollAnimation>
                    <h2 className="text-3xl font-headline font-bold tracking-tighter mb-8">
                      {category}
                    </h2>
                  </ScrollAnimation>
                )}
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

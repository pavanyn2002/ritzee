'use client';

import ProductCard from '@/components/product-card';
import { ScrollAnimation } from '@/components/scroll-animation';
import { products } from '@/lib/products';
import { useSearchParams } from 'next/navigation';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const allCategories = [...new Set(products.map(p => p.category))];
  
  const filteredCategories = categoryParam 
    ? allCategories.filter(c => c === categoryParam)
    : allCategories;

  const pageTitle = categoryParam ? `${categoryParam}` : "Our Collection";

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
            const categoryProducts = products.filter(p => p.category === category);
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryProducts.map((product, index) => (
                    <ScrollAnimation key={product.id} delay={index * 100}>
                      <ProductCard product={product} />
                    </ScrollAnimation>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import ProductCard from '@/components/product-card';
import { ScrollAnimation } from '@/components/scroll-animation';
import { products } from '@/lib/products';

export default function ShopPage() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container px-4 md:px-6">
        <ScrollAnimation>
          <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl mb-12 text-center">
            Our Collection
          </h1>
        </ScrollAnimation>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ScrollAnimation key={product.id} delay={index * 100}>
              <ProductCard product={product} />
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}

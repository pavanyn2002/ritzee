import HeroSection from '@/components/hero-section';
import ProductCard from '@/components/product-card';
import { products } from '@/lib/products';
import Marquee from '@/components/marquee';

export default function Home() {
  return (
    <>
      <HeroSection />
      <Marquee>
        <span className="text-4xl font-headline mx-4">360° View</span>
        <span className="text-4xl font-headline mx-4 text-primary">*</span>
        <span className="text-4xl font-headline mx-4">Limited Edition</span>
        <span className="text-4xl font-headline mx-4 text-primary">*</span>
        <span className="text-4xl font-headline mx-4">Future of Fashion</span>
        <span className="text-4xl font-headline mx-4 text-primary">*</span>
      </Marquee>
      <section className="py-16 sm:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
            Latest Drops
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

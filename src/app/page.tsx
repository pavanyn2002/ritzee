import HeroSection from '@/components/hero-section';
import ProductCard from '@/components/product-card';
import { products } from '@/lib/products';
import Marquee from '@/components/marquee';
import { ScrollAnimation } from '@/components/scroll-animation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ContactSection from '@/components/contact-section';
import BlogSection from '@/components/blog-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <Marquee>
        <span className="text-3xl md:text-4xl font-headline mx-4">360° View for bestsellers</span>
        <span className="text-3xl md:text-4xl font-headline mx-4 text-primary">⚡</span>
        <span className="text-3xl md:text-4xl font-headline mx-4">Limited Edition</span>
        <span className="text-3xl md:text-4xl font-headline mx-4 text-primary">⚡</span>
        <span className="text-3xl md:text-4xl font-headline mx-4">Future of Fashion</span>
        <span className="text-3xl md:text-4xl font-headline mx-4 text-primary">⚡</span>
      </Marquee>

      <section className="py-12 md:py-20" id="latest-drops">
        <div className="container px-4 md:px-6">
          <ScrollAnimation>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-headline font-bold tracking-tight mb-8 text-center">
              Latest Drops
            </h2>
          </ScrollAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product, index) => (
              <ScrollAnimation key={product.id} delay={index * 100}>
                <ProductCard product={product} />
              </ScrollAnimation>
            ))}
          </div>
          <ScrollAnimation delay={300} className="mt-10 text-center">
            <Button asChild size="lg" variant="outline" className="font-bold h-12 rounded-none border-2">
              <Link href="/shop">View All Products <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </ScrollAnimation>
        </div>
      </section>

      <BlogSection />

      <ContactSection />
    </>
  );
}

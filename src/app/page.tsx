import HeroSection from '@/components/hero-section';
import ProductCard from '@/components/product-card';
import { supabase } from '@/lib/supabase';
import { getCollectionProducts, getProducts } from '@/lib/shopify';
import { Product } from '@/lib/shopify/types';
import Marquee from '@/components/marquee';
import { ScrollAnimation } from '@/components/scroll-animation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ContactSection from '@/components/contact-section';
import BlogSection from '@/components/blog-section';
import { siteConfig } from '@/data/site-config';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch Latest Drops
  let latestDrops = await getCollectionProducts({ collection: 'latest-drops' });

  if (latestDrops.length === 0) {
    latestDrops = await getProducts({ sortKey: 'CREATED_AT', reverse: true });
    latestDrops = latestDrops.slice(0, 3);
  }

  // Fetch Bestsellers
  let bestsellers = await getCollectionProducts({ collection: 'bestsellers' });

  if (bestsellers.length === 0) {
    bestsellers = await getProducts({ sortKey: 'BEST_SELLING' });
    bestsellers = bestsellers.slice(0, 4);
  }

  // Fetch Site Config from Supabase
  let heroConfig = {
    headline: "ELEVATE YOUR EVERYDAY",
    images: [] as string[] // No fallback - use what's in database
  };

  try {
    const { data } = await supabase
      .from('site_config')
      .select('hero_images')
      .single();

    if (data && data.hero_images) {
      // Data is already a JSONB array, no parsing needed
      const images = Array.isArray(data.hero_images) ? data.hero_images : [];
      heroConfig.images = images; // Use whatever is in DB, even if empty
    }
  } catch (error) {
    console.error("Supabase config fetch error:", error);
  }

  // Helper to map Shopify Product to Frontend Product shape
  const mapProduct = (p: Product) => ({
    id: p.id,
    name: p.title,
    slug: p.handle,
    price: parseFloat(p.priceRange.minVariantPrice.amount),
    description: p.description,
    discount_price: null, // Shopify doesn't always return this easily in simple query, can use compareAtPrice if needed
    images: p.images.edges.map(e => e.node.url),
    image: p.featuredImage?.url || p.images.edges[0]?.node.url || '/placeholder.png',
    originalPrice: undefined, // Add logic if needed
    imageHint: 'product view',
    modelUrl: p.media?.edges.find((e: any) => e.node.sources)?.node.sources[0]?.url || '',
    category: (p.tags[0] || 'Apparel') as any
  });

  return (
    <>
      <HeroSection
        headline={heroConfig.headline}
        images={heroConfig.images}
      />
      <Marquee>
        <span className="text-3xl md:text-4xl font-headline mx-4">360° View for bestsellers</span>
        <span className="text-3xl md:text-4xl font-headline mx-4 text-primary">⚡</span>
        <span className="text-3xl md:text-4xl font-headline mx-4">Limited Edition</span>
        <span className="text-3xl md:text-4xl font-headline mx-4 text-primary">⚡</span>
      </Marquee>

      {/* Bestsellers Section */}
      {bestsellers.length > 0 && (
        <section className="py-12 bg-muted/5">
          <div className="w-full px-4 md:px-8">
            <ScrollAnimation>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-headline font-bold tracking-tight mb-8 text-center text-primary">
                Bestsellers
              </h2>
            </ScrollAnimation>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestsellers.map((product, index) => (
                <ScrollAnimation key={product.id} delay={index * 100}>
                  <ProductCard product={mapProduct(product)} />
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-20" id="latest-drops">
        <div className="w-full px-4 md:px-8">
          <ScrollAnimation>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-headline font-bold tracking-tight mb-8 text-center">
              Latest Drops
            </h2>
          </ScrollAnimation>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestDrops.map((product, index) => (
              <ScrollAnimation key={product.id} delay={index * 100}>
                <ProductCard product={mapProduct(product)} />
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

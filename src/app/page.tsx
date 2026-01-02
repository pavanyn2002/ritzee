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
import LatestDropsCarousel from '@/components/latest-drops-carousel';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch all data in parallel to reduce load time
  const [latestDropsData, bestsellersData, siteConfigData] = await Promise.all([
    getProducts({ sortKey: 'CREATED_AT', reverse: true }),
    getCollectionProducts({ collection: 'bestsellers' }),
    supabase.from('site_config').select('hero_images').single()
  ]);

  const latestDrops = latestDropsData.slice(0, 4);
  const bestsellers = bestsellersData.slice(0, 4);

  // Process Site Config
  let heroConfig = {
    headline: "ELEVATE YOUR EVERYDAY",
    images: [] as string[]
  };

  if (siteConfigData.data && siteConfigData.data.hero_images) {
    const images = Array.isArray(siteConfigData.data.hero_images) ? siteConfigData.data.hero_images : [];
    heroConfig.images = images;
  }

  if (siteConfigData.error) {
    console.error("Supabase config fetch error:", siteConfigData.error);
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
      <section className="py-8 md:py-12 lg:py-16 bg-muted/5">
        <div className="w-full px-4 md:px-8">
          <ScrollAnimation>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline font-black tracking-tight mb-6 md:mb-8 lg:mb-10 text-center uppercase"
              style={{
                color: '#BFFF00',
                textShadow: '2px 2px 0px #8B00FF, 4px 4px 0px rgba(139, 0, 255, 0.3)'
              }}
            >
              BESTSELLERS
            </h2>
          </ScrollAnimation>

          {bestsellers.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                {bestsellers.map((product, index) => (
                  <ScrollAnimation key={product.id} delay={index * 100}>
                    <ProductCard product={mapProduct(product)} />
                  </ScrollAnimation>
                ))}
              </div>
              <ScrollAnimation delay={400} className="mt-10 text-center">
                <Button asChild size="lg" variant="outline" className="font-bold h-12 rounded-none border-2">
                  <Link href="/bestsellers">View All Bestsellers <ArrowRight className="ml-2 w-4 h-4" /></Link>
                </Button>
              </ScrollAnimation>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No bestsellers yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>


      {/* Latest Drops Section - Only show if products exist */}
      {latestDrops.length > 0 && (
        <section className="py-8 md:py-12 lg:py-20" id="latest-drops">
          <div className="w-full px-4 md:px-8">
            <ScrollAnimation>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-headline font-black tracking-tight mb-6 md:mb-8 lg:mb-10 text-center uppercase"
                style={{
                  color: '#BFFF00',
                  textShadow: '2px 2px 0px #8B00FF, 4px 4px 0px rgba(139, 0, 255, 0.3)'
                }}
              >
                Latest Drops
              </h2>
            </ScrollAnimation>
            <LatestDropsCarousel products={latestDrops.map(mapProduct)} />
            <ScrollAnimation delay={400} className="mt-10 text-center">
              <Button asChild size="lg" variant="outline" className="font-bold h-12 rounded-none border-2">
                <Link href="/shop">View All Products <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </ScrollAnimation>
          </div>
        </section>
      )}



      <BlogSection />

      <ContactSection />
    </>
  );
}

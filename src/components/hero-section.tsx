'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ScrollAnimation } from './scroll-animation';
import { products } from '@/lib/products';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import React from 'react';

export default function HeroSection() {
  const isMobile = useIsMobile();
  const [initialLoad, setInitialLoad] = React.useState(true);

   React.useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 3000); // Duration of the initial animation
    return () => clearTimeout(timer);
  }, []);


  const heroImages = [
    ...products.map(p => ({id: p.id, image: p.image, name: p.name, imageHint: p.imageHint})),
    {
      id: 'extra-1',
      image: '/products/lifestyle1.png',
      name: 'Extra fashion shot',
      imageHint: 'fashion runway'
    },
    {
      id: 'extra-2',
      image: '/products/lifestyle2.png',
      name: 'Extra fashion shot 2',
      imageHint: 'clothing detail'
    }
  ]

  return (
    <section className="relative w-full h-[calc(100vh-4rem)] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Carousel
          className="w-full h-full"
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {heroImages.map((product, index) => (
              <CarouselItem key={product.id}>
                <div className="relative w-full h-[calc(100vh-4rem)]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover opacity-20"
                    data-ai-hint={product.imageHint}
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>
      <div className="container px-4 md:px-6 z-10 text-center">
        <div className="flex flex-col items-center space-y-6">
          <ScrollAnimation>
             <h1 
              className={cn(
                "text-6xl md:text-8xl lg:text-9xl font-bold font-headline tracking-tighter text-primary glitch",
                 isMobile && 'glitch-mobile',
                 initialLoad && 'glitch-initial'
              )}
              data-text="RITZEE"
            >
              RITZEE
            </h1>
          </ScrollAnimation>
          <ScrollAnimation delay={100}>
            <p className="max-w-[600px] text-foreground/80 md:text-xl">
              Unleash Your Alter Ego. Explore limited edition drops and
              experience fashion in 360°.
            </p>
          </ScrollAnimation>
          <ScrollAnimation delay={200}>
            <div className="flex gap-4">
              <Button
                asChild
                size="lg"
                className="hard-shadow font-bold text-lg px-8 py-6 rounded-none border-2 border-primary-foreground"
              >
                <Link href="#latest-drops">
                  Explore Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

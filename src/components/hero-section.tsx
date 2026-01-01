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
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we've already shown the animation in this session
    // const hasLoaded = sessionStorage.getItem('ritzee-hero-loaded');

    // if (hasLoaded) {
    //   setLoading(false);
    //   return;
    // }

    const timer = setTimeout(() => {
      setLoading(false);
      // sessionStorage.setItem('ritzee-hero-loaded', 'true');
    }, 2500); // 4.5s loading time

    return () => clearTimeout(timer);
  }, []);

  const heroImages = [
    ...products.map(p => ({ id: p.id, image: p.image, name: p.name, imageHint: p.imageHint })),
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
    <section className="relative w-full h-[calc(100vh-4rem)] overflow-hidden flex flex-col items-center justify-center group/hero">
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
                    className={cn(
                      "object-cover transition-opacity duration-1000",
                      loading ? "opacity-20" : "opacity-100"
                    )}
                    data-ai-hint={product.imageHint}
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
      </div>

      {/* Loading State - RITZEE Logo */}
      <div
        className={cn(
          "z-20 transition-all duration-1000 ease-in-out absolute inset-0 flex items-center justify-center",
          loading ? "opacity-100 scale-100" : "opacity-0 scale-125 pointer-events-none"
        )}
      >
        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-bold font-headline glitch glitch-load"
          data-text="RITZEE"
        >
          RITZEE
        </h1>
      </div>

      {/* Post-Load Content - Slides Down to Bottom */}
      <div
        className={cn(
          "z-10 container px-4 md:px-6 relative h-full flex flex-col items-center transition-all duration-1000 ease-out",
          loading ? "justify-center opacity-0 translate-y-[-50px]" : "justify-end pb-20 opacity-100 translate-y-0"
        )}
      >
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="overflow-hidden px-8 py-2"> {/* Increased horizontal padding to prevent italic clipping */}
            <p className={cn(
              "w-full text-2xl md:text-4xl lg:text-5xl font-black font-headline italic uppercase tracking-tighter text-shimmer transition-transform duration-1000 delay-500 md:whitespace-nowrap",
              loading ? "translate-y-full" : "translate-y-0"
            )}>
              Unleash Your Alter Ego&nbsp;
            </p>
          </div>

          <div className={cn(
            "transition-all duration-1000 delay-700",
            loading ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
          )}>
            <Button
              asChild
              size="lg"
              className="hard-shadow font-bold text-lg px-8 py-6 rounded-none border-2 border-primary-foreground"
            >
              <Link href="/shop">
                Explore Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

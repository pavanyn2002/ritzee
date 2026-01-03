'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ScrollAnimation } from './scroll-animation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  headline?: string;
  images?: string[];
}

export default function HeroSection({ headline, images }: HeroSectionProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const defaultImages = [
    '/products/lifestyle1.png',
    '/products/lifestyle2.png'
  ];

  // Use provided images, or fallback to defaults only if images prop is undefined
  const displayImages = (images && images.length > 0 ? images : (images === undefined ? defaultImages : [])).map((url, i) => ({
    id: `hero-${i}`,
    image: url,
    name: 'Hero Image',
    imageHint: 'fashion shot'
  }));

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
            {displayImages.map((item, index) => {
              const url = item.image;
              const isVideo = url.match(/\.(mp4|webm|ogg)$/i);
              const isGlb = url.match(/\.(glb|gltf)$/i);
              const isImage = !isVideo && !isGlb;

              return (
                <CarouselItem key={item.id}>
                  <div className="relative w-full h-[calc(100vh-4rem)]">
                    {isImage && (
                      <Image
                        src={url}
                        alt={item.name}
                        fill
                        className={cn(
                          "object-cover transition-opacity duration-1000",
                          loading ? "opacity-20" : "opacity-100"
                        )}
                        data-ai-hint={item.imageHint}
                        priority={index === 0}
                      />
                    )}
                    {isVideo && (
                      <video
                        src={url}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={cn(
                          "w-full h-full object-cover transition-opacity duration-1000",
                          loading ? "opacity-20" : "opacity-100"
                        )}
                      />
                    )}
                    {isGlb && (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-background">
                        <div className="text-center space-y-4">
                          <div className="text-6xl">🎨</div>
                          <p className="text-xl font-bold text-primary">3D Model</p>
                          <p className="text-sm text-muted-foreground">GLB viewer coming soon</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CarouselItem>
              );
            })}
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
          loading ? "justify-center opacity-0 translate-y-[-50px]" : "justify-end pb-32 md:pb-20 opacity-100 translate-y-0"
        )}
      >
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="overflow-hidden px-8 py-2"> {/* Increased horizontal padding to prevent italic clipping */}
            <p className={cn(
              "w-full text-2xl md:text-4xl lg:text-5xl font-black font-headline italic uppercase tracking-tighter text-shimmer transition-transform duration-1000 delay-500 md:whitespace-nowrap",
              loading ? "translate-y-full" : "translate-y-0"
            )}>
              {headline || "Unleash Your Alter Ego"}&nbsp;
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

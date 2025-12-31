import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[calc(100vh-4rem)] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/seed/hero1/1800/1200"
          alt="Ritzee Wear background"
          fill
          className="object-cover opacity-20"
          data-ai-hint="fashion model"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>
      <div className="container px-4 md:px-6 z-10 text-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-headline tracking-tighter text-foreground">
              RITZEE
            </h1>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-headline tracking-tighter text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl opacity-70">
              RITZEE
            </h1>
          </div>
          <p className="max-w-[600px] text-foreground/80 md:text-xl">
            Unleash Your Alter Ego. Explore limited edition drops and experience fashion in 360°.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg" className="hard-shadow font-bold text-lg px-8 py-6 rounded-none border-2 border-primary-foreground">
              <Link href="#latest-drops">
                Explore Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold text-lg px-8 py-6 rounded-none border-2">
                <Link href="#">
                    Learn More
                </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

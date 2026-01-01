import Image from 'next/image';
import { ScrollAnimation } from '@/components/scroll-animation';
import { products } from '@/lib/products';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:px-6 lg:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <ScrollAnimation>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
              WE ARE <span className="text-primary">RITZEE</span>
            </h1>
            <p className="text-lg text-foreground/80">
              Founded in 2024, Ritzee Wear was born from a desire to break the mold. We saw a world of fashion that was either too safe or too inaccessible. We're here to bridge that gap, offering limited-edition, high-concept apparel that empowers you to express your most authentic, audacious self.
            </p>
            <p className="text-lg text-foreground/80">
              Our philosophy is simple: fashion is a playground. It's a way to explore different facets of your identity. With our 3D-rendered designs and focus on quality, we provide the tools for you to play, experiment, and redefine your reality.
            </p>
          </div>
        </ScrollAnimation>
        <ScrollAnimation delay={200}>
          <div className="relative aspect-square">
            <Image
              src={products[2].image}
              alt="Our mission"
              fill
              className="object-cover rounded-lg hard-shadow"
              data-ai-hint="fashion lifestyle"
            />
          </div>
        </ScrollAnimation>
      </div>

       <div className="grid md:grid-cols-2 gap-12 items-center mt-24">
         <ScrollAnimation delay={200} className="md:order-2">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter">
              The Future of Fashion
            </h2>
            <p className="text-lg text-foreground/80">
             We are pioneers in the digital fashion space. By leveraging 3D modeling, we create unique pieces that blur the lines between the virtual and the real. This allows for unparalleled creativity and a new way to experience clothing. Each piece is a statement, a conversation starter, and a piece of wearable art.
            </p>
          </div>
        </ScrollAnimation>
        <ScrollAnimation className="relative aspect-square md:order-1">
            <Image
              src="/products/lifestyle1.png"
              alt="Digital fashion"
              fill
              className="object-cover rounded-lg hard-shadow-accent"
              data-ai-hint="futuristic fashion"
            />
        </ScrollAnimation>
      </div>
    </div>
  );
}

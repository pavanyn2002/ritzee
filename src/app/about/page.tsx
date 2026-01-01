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
              Founded in 2026, Ritzee Wear was born to break the mold. We saw a fashion landscape that was either too safe or too inaccessible, so we built a bridge to the bold. We offer limited-edition, high-concept apparel designed to empower your most authentic, audacious self.
            </p>
            <p className="text-lg text-foreground/80">
              Our philosophy is simple: fashion is a playground. By combining 3D-rendered innovation with premium craftsmanship, we deliver high-quality streetwear that defines the Gen Z aesthetic.
            </p>
          </div>
        </ScrollAnimation>
        <ScrollAnimation delay={200}>
          <div className="relative aspect-square">
            <Image
              src="https://storage.googleapis.com/project-spark-348b6.appspot.com/6ff18063-ce3f-42e3-8208-8e6d23456f93"
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
              360° Radical Transparency
            </h2>
            <p className="text-lg text-foreground/80">
              We don't believe in "good angles" or hidden seams. What you see is exactly what you get. We’ve ditched static, flat imagery for immersive 360° views on every product. Spin it, zoom in, and inspect the details from every perspective. We give you the full picture so you can cop with 100% confidence. No surprises, just premium fits.
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

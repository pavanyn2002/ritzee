'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { notFound } from 'next/navigation';
import { ScrollAnimation } from '@/components/scroll-animation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import SizeGuide from '@/components/size-guide';
import TrustBadges from '@/components/trust-badges';
import StickyAddToCart from '@/components/sticky-add-to-cart';

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug;
  const product = products.find((p) => p.slug === slug);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState('');

  if (!product) {
    notFound();
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} (${selectedSize}) has been added to your cart.`,
    });
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 md:py-12 md:px-6 lg:py-16">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <ScrollAnimation className="aspect-square bg-card border-2 rounded-none overflow-hidden relative">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {hasDiscount && (
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-red-500 text-white font-bold px-3 py-1">SALE</Badge>
                <Badge className="bg-primary text-primary-foreground font-bold px-3 py-1">{discountPercent}% OFF</Badge>
              </div>
            )}
          </ScrollAnimation>

          <div className="flex flex-col justify-center space-y-5 md:sticky md:top-32">
            <ScrollAnimation>
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">{product.category}</p>
                <h1 className="text-3xl lg:text-4xl font-bold font-headline">{product.name}</h1>
                <div className="flex items-center gap-3 mt-3">
                  <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
                  {hasDiscount && (
                    <>
                      <p className="text-lg text-foreground/50 line-through">${product.originalPrice!.toFixed(2)}</p>
                      <Badge className="bg-red-500/20 text-red-400 font-medium">Save ${(product.originalPrice! - product.price).toFixed(2)}</Badge>
                    </>
                  )}
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={100}>
              <p className="text-foreground/80 leading-relaxed">{product.description}</p>
            </ScrollAnimation>

            <ScrollAnimation delay={150}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Select Size</p>
                  <SizeGuide />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 border-2 font-semibold transition-all hover:border-primary ${selectedSize === size
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'border-border hover:bg-muted'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={200}>
              <div className="flex flex-col gap-3 pt-2">
                <Button
                  size="lg"
                  className="hard-shadow font-bold text-base h-12 rounded-none border-2 border-primary-foreground"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="font-bold text-base h-12 rounded-none border-2">
                  Buy Now
                </Button>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={250}>
              <TrustBadges />
            </ScrollAnimation>

            <ScrollAnimation delay={300}>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground flex justify-between">
                  <span>Availability</span>
                  <span className="text-green-500 font-medium">In Stock</span>
                </p>
                <p className="text-muted-foreground flex justify-between">
                  <span>Shipping</span>
                  <span>Free on orders over $999</span>
                </p>
                <p className="text-muted-foreground flex justify-between">
                  <span>Returns</span>
                  <span>30-day easy returns</span>
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </div>

      <StickyAddToCart
        product={product}
        selectedSize={selectedSize}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}

'use client';

import { notFound } from 'next/navigation';
import { products } from '@/lib/products';
import ProductViewer from '@/components/product-viewer';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';

type ProductPageProps = {
  params: {
    slug: string;
  };
};


export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug);
  const { addToCart } = useCart();
  const { toast } = useToast();

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div className="aspect-square bg-card border-2 rounded-none">
          <ProductViewer modelUrl={product.modelUrl} />
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold font-headline">{product.name}</h1>
            <p className="text-3xl font-bold text-primary mt-2">${product.price.toFixed(2)}</p>
          </div>
          <p className="text-lg text-foreground/80">{product.description}</p>
          <div className="flex flex-col gap-4">
             <Button size="lg" className="hard-shadow font-bold text-lg h-14 rounded-none border-2 border-primary-foreground" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
             </Button>
             <Button size="lg" variant="outline" className="font-bold text-lg h-14 rounded-none border-2">
                Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

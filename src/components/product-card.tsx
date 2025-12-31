import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from './ui/button';
import { MoveRight } from 'lucide-react';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden rounded-none border-2 hard-shadow-accent hover:border-accent transition-all">
      <Link href={`/products/${product.slug}`}>
        <div className="overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="object-cover w-full h-full aspect-square group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={product.imageHint}
          />
        </div>
        <CardHeader>
          <CardTitle className="font-headline text-xl">{product.name}</CardTitle>
          <p className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</p>
        </CardHeader>
        <CardContent>
          <CardDescription>{product.description}</CardDescription>
        </CardContent>
      </Link>
    </Card>
  );
}

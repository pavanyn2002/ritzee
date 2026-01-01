import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden rounded-none border-2 hard-shadow-accent hover:border-accent transition-all">
      <Link href={`/products/${product.slug}`}>
        <div className="overflow-hidden relative">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="object-cover w-full h-full aspect-square group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={product.imageHint}
          />
          {hasDiscount && (
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge className="bg-red-500 text-white font-bold px-2 py-1 text-xs">
                SALE
              </Badge>
              <Badge className="bg-primary text-primary-foreground font-bold px-2 py-1 text-xs">
                {discountPercent}% OFF
              </Badge>
            </div>
          )}
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="font-headline text-lg group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
            {hasDiscount && (
              <p className="text-sm text-foreground/50 line-through">${product.originalPrice!.toFixed(2)}</p>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="line-clamp-2 text-sm">{product.description}</CardDescription>
        </CardContent>
      </Link>
    </Card>
  );
}

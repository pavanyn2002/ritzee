import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = (product.originalPrice ?? 0) > product.price;
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
            unoptimized
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
          {product.modelUrl && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-blue-600 text-white font-bold px-2 py-1 text-xs animate-pulse">
                3D VIEW
              </Badge>
            </div>
          )}
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="font-headline text-lg group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-primary">
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.price)}
            </p>
            {hasDiscount && (
              <p className="text-sm text-foreground/50 line-through">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.originalPrice!)}
              </p>
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

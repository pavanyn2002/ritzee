'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { ScrollAnimation } from '@/components/scroll-animation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import SizeGuide from '@/components/size-guide';
import TrustBadges from '@/components/trust-badges';
import StickyAddToCart from '@/components/sticky-add-to-cart';

const FALLBACK_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ProductClient({ product }: { product: any }) {
    const { addToCart, checkoutUrl } = useCart();
    const { toast } = useToast();
    const [selectedVariantId, setSelectedVariantId] = useState<string>('');
    const [isBuying, setIsBuying] = useState(false);

    // Extract variants options if available
    const hasVariants = product.variants && product.variants.length > 0;

    // Find "Size" options from variants if they exist
    // We assume a simple structure where variants usually have a "Size" option or are just titled "S", "M", etc.
    const variants = hasVariants ? product.variants : [];

    // Determine if we are using real variants or fallback UI
    // If product has only 1 variant and it's "Default Title", it's a simple product -> show fallback UI (or nothing?)
    // But user stated they "will add sizes", so we should prioritize real variants.
    const isSimpleProduct = variants.length === 1 && variants[0].title === 'Default Title';

    // Get options to display
    const displayOptions = useMemo(() => {
        if (isSimpleProduct || variants.length === 0) return FALLBACK_SIZES.map(s => ({ label: s, value: s, id: null, available: true }));

        // For real variants, map them to options
        return variants.map((v: any) => ({
            label: v.title, // Or v.options.find(o => o.name === 'Size')?.value || v.title
            value: v.title,
            id: v.id,
            available: v.available
        }));
    }, [variants, isSimpleProduct]);

    // Handle selection state
    // If simple product, we just track the string label for UI
    // If real variants, we track the ID
    const [selectedOptionValue, setSelectedOptionValue] = useState('');

    const hasDiscount = (product.originalPrice ?? 0) > product.price;
    const discountPercent = hasDiscount
        ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
        : 0;

    const handleAddToCart = () => {
        if (variants.length > 0 && !isSimpleProduct && !selectedVariantId) {
            toast({
                title: "Please select an option",
                description: "Choose a size/variant before adding to cart.",
                variant: "destructive",
            });
            return false;
        }

        if (isSimpleProduct && !selectedOptionValue) {
            toast({
                title: "Please select a size",
                description: "Choose a size before adding to cart.",
                variant: "destructive",
            });
            return false;
        }

        const variantToAdd = isSimpleProduct
            ? product.defaultVariantId
            : selectedVariantId;

        addToCart(product, variantToAdd);

        const sizeLabel = isSimpleProduct ? selectedOptionValue : variants.find((v: any) => v.id === selectedVariantId)?.title;

        toast({
            title: "Added to cart",
            description: `${product.name} (${sizeLabel}) has been added to your cart.`,
        });

        return true;
    };

    const handleBuyNow = async () => {
        const added = handleAddToCart();
        if (!added) return;

        setIsBuying(true);
        // Wait a moment for cart to update and get checkout URL
        setTimeout(() => {
            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            } else {
                toast({
                    title: "Preparing checkout...",
                    description: "Please try again in a moment.",
                });
                setIsBuying(false);
            }
        }, 1000);
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
                            unoptimized
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
                                    <p className="text-2xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
                                    {hasDiscount && (
                                        <>
                                            <p className="text-lg text-foreground/50 line-through">₹{product.originalPrice!.toFixed(2)}</p>
                                            <Badge className="bg-red-500/20 text-red-400 font-medium">Save ₹{(product.originalPrice! - product.price).toFixed(2)}</Badge>
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
                                    <p className="text-sm font-medium">Select Size / Option</p>
                                    <SizeGuide />
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {displayOptions.map((option: any) => (
                                        <button
                                            key={option.label}
                                            disabled={!option.available}
                                            onClick={() => {
                                                setSelectedOptionValue(option.value);
                                                if (option.id) setSelectedVariantId(option.id);
                                            }}
                                            className={`min-w-[3rem] px-3 h-12 border-2 font-semibold transition-all hover:border-primary ${selectedOptionValue === option.value
                                                ? 'bg-primary text-primary-foreground border-primary shadow-[4px_4px_0px_0px_#8B00FF] -translate-x-[2px] -translate-y-[2px]'
                                                : !option.available
                                                    ? 'opacity-50 cursor-not-allowed bg-muted border-border'
                                                    : 'border-border hover:bg-muted'
                                                }`}
                                        >
                                            {option.label}
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
                                <Button
                                    size="lg"
                                    className="font-bold text-base h-12 rounded-none border-2 border-[#8B00FF] bg-[#8B00FF] text-white hover:bg-[#7300D1]"
                                    onClick={handleBuyNow}
                                    disabled={isBuying}
                                >
                                    {isBuying ? 'Processing...' : 'Buy Now'}
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
                                    <span>Free on orders over ₹1000</span>
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
                selectedSize={selectedOptionValue}
                onAddToCart={handleAddToCart}
            />
        </>
    );
}

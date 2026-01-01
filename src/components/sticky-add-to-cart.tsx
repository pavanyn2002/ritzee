'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/lib/products';

interface StickyAddToCartProps {
    product: Product;
    selectedSize: string;
    onAddToCart: () => void;
}

export default function StickyAddToCart({ product, selectedSize, onAddToCart }: StickyAddToCartProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show sticky bar after scrolling past 400px
            setIsVisible(window.scrollY > 400);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border shadow-lg transform transition-transform duration-300">
            <div className="container px-4 py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                    <div className="hidden sm:block w-12 h-12 bg-muted rounded overflow-hidden flex-shrink-0">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="min-w-0">
                        <p className="font-semibold truncate">{product.name}</p>
                        <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                    {selectedSize && (
                        <span className="text-sm text-foreground/60 hidden sm:block">
                            Size: <span className="font-medium text-foreground">{selectedSize}</span>
                        </span>
                    )}
                    <Button
                        onClick={onAddToCart}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                        disabled={!selectedSize}
                    >
                        <ShoppingBag className="w-4 h-4" />
                        <span className="hidden sm:inline">Add to Cart</span>
                        <span className="sm:hidden">Add</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

'use client';

import { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

interface SearchDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
    const [query, setQuery] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    // Reset query when dialog closes
    useEffect(() => {
        if (!open) {
            setQuery('');
            setProducts([]);
        }
    }, [open]);

    // Debounced search effect
    useEffect(() => {
        if (!query.trim()) {
            setProducts([]);
            return;
        }

        const timeoutId = setTimeout(async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/shopify/search?q=${encodeURIComponent(query)}`);
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.products || []);
                }
            } catch (error) {
                console.error('Search error:', error);
            } finally {
                setLoading(false);
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleProductClick = () => {
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl p-0 gap-0">
                <DialogHeader className="p-4 pb-0">
                    <DialogTitle className="sr-only">Search Products</DialogTitle>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder="Search products..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="pl-10 pr-10 h-12 text-lg border-0 border-b rounded-none focus-visible:ring-0"
                            autoFocus
                        />
                        {query && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                                onClick={() => setQuery('')}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </DialogHeader>

                <ScrollArea className="max-h-[60vh]">
                    {query.trim() === '' ? (
                        <div className="p-8 text-center text-muted-foreground">
                            <Search className="h-12 w-12 mx-auto mb-4 opacity-20" />
                            <p>Start typing to search products...</p>
                        </div>
                    ) : loading ? (
                        <div className="p-8 text-center text-muted-foreground">
                            <Loader2 className="h-8 w-8 mx-auto mb-4 animate-spin" />
                            <p>Searching...</p>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                            <p className="text-lg font-medium">No products found</p>
                            <p className="text-sm mt-1">Try searching for something else</p>
                        </div>
                    ) : (
                        <div className="p-4">
                            <p className="text-sm text-muted-foreground mb-4">
                                Found {products.length} product{products.length !== 1 ? 's' : ''}
                            </p>
                            <div className="space-y-2">
                                {products.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/products/${product.slug}`}
                                        onClick={handleProductClick}
                                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors"
                                    >
                                        <div className="relative h-16 w-16 overflow-hidden rounded-md border bg-card flex-shrink-0">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-cover"
                                                sizes="64px"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">{product.name}</p>
                                            <p className="text-sm text-muted-foreground">{product.category}</p>
                                            <p className="text-sm font-semibold text-primary">${product.price.toFixed(2)}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

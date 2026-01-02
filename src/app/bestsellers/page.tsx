'use client';

import ProductCard from '@/components/product-card';
import { ScrollAnimation } from '@/components/scroll-animation';

export default function BestsellersPage() {
    // Bestsellers will come from Shopify "bestsellers" collection
    // See BESTSELLERS_GUIDE.md for setup instructions
    const bestsellers: any[] = [];

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="container px-4 md:px-6">
                <ScrollAnimation>
                    <div className="flex flex-col items-center text-center space-y-4 mb-16">
                        <h1 className="text-4xl md:text-6xl font-bold font-headline glitch" data-text="BESTSELLERS">
                            BESTSELLERS
                        </h1>
                        <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                            The most coveted pieces from the RitzeeVerse. These are the items visible across all dimensions.
                        </p>
                    </div>
                </ScrollAnimation>

                {bestsellers.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-xl text-muted-foreground mb-4">No bestsellers yet</p>
                        <p className="text-sm text-muted-foreground">
                            Add products to the "bestsellers" collection in Shopify to display them here.
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                            See <code className="bg-muted px-2 py-1 rounded">BESTSELLERS_GUIDE.md</code> for instructions.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {bestsellers.map((product: any, index: number) => (
                            <ScrollAnimation key={product.id} delay={index * 50}>
                                <ProductCard product={product} />
                            </ScrollAnimation>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

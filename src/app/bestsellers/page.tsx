'use client';

import { products } from '@/lib/products';
import ProductCard from '@/components/product-card';
import { ScrollAnimation } from '@/components/scroll-animation';

// Simulating bestsellers by picking specific IDs
const bestSellerIds = ['1', '3', '11', '13', '21', '23', '27', '10'];
const bestsellers = products.filter(p => bestSellerIds.includes(p.id));

export default function BestsellersPage() {
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {bestsellers.map((product, index) => (
                        <ScrollAnimation key={product.id} delay={index * 50}>
                            <ProductCard product={product} />
                        </ScrollAnimation>
                    ))}
                </div>
            </div>
        </div>
    );
}

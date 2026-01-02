'use client';

import { useState, useEffect } from 'react';
import ProductCard from './product-card';
import { ScrollAnimation } from './scroll-animation';

interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    description: string;
    discount_price: number | null;
    images: string[];
    image: string;
    originalPrice?: number;
    imageHint: string;
    modelUrl: string;
    category: string;
}

interface LatestDropsCarouselProps {
    products: Product[];
}

export default function LatestDropsCarousel({ products }: LatestDropsCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-rotate every 5 seconds
    useEffect(() => {
        if (products.length <= 3) return; // No rotation needed if 3 or fewer products

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % products.length);
        }, 5000); // Rotate every 5 seconds

        return () => clearInterval(interval);
    }, [products.length]);

    // Get 3 products to display based on current index
    const getVisibleProducts = () => {
        if (products.length <= 3) return products;

        const visible = [];
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % products.length;
            visible.push(products[index]);
        }
        return visible;
    };

    const visibleProducts = getVisibleProducts();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProducts.map((product, index) => (
                <ScrollAnimation key={`${product.id}-${currentIndex}`} delay={index * 100}>
                    <ProductCard product={product} />
                </ScrollAnimation>
            ))}
        </div>
    );
}

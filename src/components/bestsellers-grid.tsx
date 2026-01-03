'use client';

import { useState, useEffect } from 'react';
import ProductCard from './product-card';
import { ScrollAnimation } from './scroll-animation';
import { Card3DWrapper } from './card-3d-wrapper';

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

interface BestsellersGridProps {
    products: Product[];
}

export default function BestsellersGrid({ products }: BestsellersGridProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Use first 4 products for rotation
    const rotatingProducts = products.slice(0, 4);

    // Auto-rotate every 5 seconds
    useEffect(() => {
        if (rotatingProducts.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % rotatingProducts.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [rotatingProducts.length]);

    // Get visible products based on screen size
    const getVisibleProducts = () => {
        if (rotatingProducts.length === 0) return [];

        // Mobile: show 1 product
        if (isMobile) {
            return [rotatingProducts[currentIndex % rotatingProducts.length]];
        }

        // Desktop: show 3 products from 4
        const visible = [];
        const displayCount = Math.min(3, rotatingProducts.length);
        for (let i = 0; i < displayCount; i++) {
            const index = (currentIndex + i) % rotatingProducts.length;
            visible.push(rotatingProducts[index]);
        }
        return visible;
    };

    const visibleProducts = getVisibleProducts();

    return (
        <div className={`grid gap-4 md:gap-6 lg:gap-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
            {visibleProducts.map((product, index) => (
                <ScrollAnimation key={`${product.id}-${currentIndex}-${index}`} delay={index * 100}>
                    <Card3DWrapper>
                        <ProductCard product={product} />
                    </Card3DWrapper>
                </ScrollAnimation>
            ))}
        </div>
    );
}

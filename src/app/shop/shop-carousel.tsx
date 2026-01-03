'use client';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ProductCard from '@/components/product-card';
import { useRef } from "react";

interface ShopCarouselProps {
    products: any[];
    isAlternate: boolean;
}

export default function ShopCarousel({ products, isAlternate }: ShopCarouselProps) {
    // Use products as-is, no duplication
    const carouselProducts = products;

    const plugin = useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
    );

    return (
        <Carousel
            plugins={[plugin.current]}
            opts={{
                align: isAlternate ? "center" : "start",
                loop: true,
            }}
            className="w-full"
        >
            <CarouselContent className="-ml-3 py-4">
                {carouselProducts.map((product: any, index: number) => (
                    <CarouselItem
                        // Unique key for duplicated items
                        key={`${product.id}-${index}`}
                        className={`pl-3 sm:basis-1/2 md:basis-1/3 lg:basis-1/4`}
                    >
                        <div className="p-1 h-full">
                            <ProductCard product={product} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="flex justify-end gap-2 mt-0 mr-4">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
            </div>
        </Carousel>
    );
}

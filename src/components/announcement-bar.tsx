'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const announcements = [
    'Free shipping on all orders over $999',
    'New Arrivals: Limited Edition Drops',
    '30-Day Easy Returns Policy',
];

export default function AnnouncementBar() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % announcements.length);
                setIsAnimating(false);
            }, 300);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-primary text-primary-foreground text-sm text-center py-2.5 px-4 overflow-hidden">
            <p
                className={cn(
                    "transition-all duration-300 font-medium",
                    isAnimating ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"
                )}
            >
                {announcements[currentIndex]}
            </p>
        </div>
    );
}

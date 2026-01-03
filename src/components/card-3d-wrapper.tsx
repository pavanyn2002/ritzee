'use client';

import { useState, useRef, ReactNode, useEffect } from 'react';

interface Card3DWrapperProps {
    children: ReactNode;
}

export function Card3DWrapper({ children }: Card3DWrapperProps) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    // Intersection Observer for initial rotation animation
    useEffect(() => {
        const element = cardRef.current;
        if (!element || hasAnimated) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setIsAnimating(true);
                        setHasAnimated(true);

                        // End animation after 1.2 seconds
                        setTimeout(() => {
                            setIsAnimating(false);
                        }, 1200);
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: '0px',
            }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [hasAnimated]);

    return (
        <div
            ref={cardRef}
            className={`card-3d-wrapper ${isAnimating ? 'card-3d-intro' : ''}`}
            style={{
                transformStyle: 'preserve-3d',
            }}
        >
            {children}
        </div>
    );
}

'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';

interface GlitchWrapperProps {
    children: ReactNode;
    duration?: number; // Duration in milliseconds, default 2000ms
}

export function GlitchWrapper({ children, duration = 2000 }: GlitchWrapperProps) {
    const [isGlitching, setIsGlitching] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element || hasTriggered) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasTriggered) {
                        // Element is now visible - start glitch effect
                        setIsGlitching(true);
                        setHasTriggered(true);

                        // Stop glitch after duration
                        setTimeout(() => {
                            setIsGlitching(false);
                        }, duration);
                    }
                });
            },
            {
                threshold: 0.3, // Trigger when 30% of the element is visible
                rootMargin: '0px',
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [duration, hasTriggered]);

    return (
        <div ref={ref} className={isGlitching ? 'card-glitch' : ''}>
            {children}
        </div>
    );
}

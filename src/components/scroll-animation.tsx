'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollAnimation({ children, className, delay = 0 }: ScrollAnimationProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        {
          'opacity-0 translate-y-5': !isInView,
          'opacity-100 translate-y-0': isInView,
        },
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

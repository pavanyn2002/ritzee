import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('relative block w-32 h-10', className)}>
      <svg
        viewBox="0 0 130 40"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-label="Ritzee Wear Logo"
      >
        <style>
          {`
            .logo-text {
              font-family: 'Space Grotesk', sans-serif;
              font-weight: 700;
              font-size: 32px;
              letter-spacing: -1px;
            }
          `}
        </style>
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fill="hsl(var(--accent))"
          className="logo-text"
          dx="2"
          dy="2"
        >
          RITZEE
        </text>
        <text
          x="50%"
          y="50%"
          dominantBaseline="central"
          textAnchor="middle"
          fill="hsl(var(--primary))"
          className="logo-text"
        >
          RITZEE
        </text>
      </svg>
    </Link>
  );
}

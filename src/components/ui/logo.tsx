import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('relative block', className)}>
      <svg
        viewBox="0 0 260 100"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feOffset result="offOut" in="SourceAlpha" dx="3" dy="3" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs>
        <style>
          {`
            .logo-text {
              font-family: 'Space Grotesk', sans-serif;
              font-weight: 700;
              font-size: 50px;
              filter: url(#shadow);
            }
          `}
        </style>
        <text
          x="50%"
          y="35%"
          dominantBaseline="middle"
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
          y="35%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="hsl(var(--primary))"
          className="logo-text"
        >
          RITZEE
        </text>

        <text
          x="50%"
          y="75%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="hsl(var(--accent))"
          className="logo-text"
          dx="2"
          dy="2"
        >
          WEAR
        </text>
        <text
          x="50%"
          y="75%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="hsl(var(--primary))"
          className="logo-text"
        >
          WEAR
        </text>
      </svg>
    </Link>
  );
}

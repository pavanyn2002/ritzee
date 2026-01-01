import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('relative block', className)}>
      <Image
        src="/ritzee-logo.png"
        alt="Ritzee Wear Logo"
        width={280}
        height={100}
        className="h-[100px] md:h-[100px] w-auto"
        priority
      />
    </Link>
  );
}

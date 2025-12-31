import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('relative block h-10 w-40', className)}>
      <Image
        src="https://storage.googleapis.com/aifirebase-113b.appspot.com/user-uploads/L2FwcC1wcm90b3R5cGVyL3VzZXI6Y2ljcC1hbmRyZS1kZXYvMTcwYjNlZTYtMDI5MC00NDhhLTkzZWQtMDc0MGM2YzI3ZjEz.png"
        alt="Ritzee Wear Logo"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-contain"
        priority
      />
    </Link>
  );
}

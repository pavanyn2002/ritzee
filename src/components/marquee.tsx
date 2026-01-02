import { cn } from "@/lib/utils";

export default function Marquee({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative flex w-full overflow-hidden py-8 border-y bg-background", className)}>
      <div
        className="flex min-w-full shrink-0 animate-marquee items-center gap-8"
        style={{ "--gap": "2rem" } as React.CSSProperties}
      >
        {[...Array(16)].map((_, i) => (
          <div key={i} className="flex shrink-0 items-center justify-around gap-8">
            {children}
          </div>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="flex min-w-full shrink-0 animate-marquee items-center gap-8"
        style={{ "--gap": "2rem" } as React.CSSProperties}
      >
        {[...Array(16)].map((_, i) => (
          <div key={i} className="flex shrink-0 items-center justify-around gap-8">
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}

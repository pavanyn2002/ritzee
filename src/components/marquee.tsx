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
      <div className="flex w-max animate-marquee">
        <div className="flex w-max items-center">{children}</div>
        <div className="flex w-max items-center">{children}</div>
      </div>
    </div>
  );
}

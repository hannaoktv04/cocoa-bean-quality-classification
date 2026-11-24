import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  strong?: boolean;
  children: ReactNode;
}

export function GlassCard({
  strong,
  className,
  children,
  ...rest
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-3xl",
        strong ? "glass-strong" : "glass",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

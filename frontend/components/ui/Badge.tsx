import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: "default" | "success" | "warning" | "danger";
}

const tones = {
  default:
    "text-gold border border-border bg-surface text-[11px] tracking-[0.18em] uppercase",
  success: "text-green border border-green/40 bg-green/10",
  warning: "text-gold border border-gold/40 bg-gold/10",
  danger: "text-rust border border-rust/40 bg-rust/10",
} as const;

export function Badge({ className, children, tone = "default", ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono",
        tones[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

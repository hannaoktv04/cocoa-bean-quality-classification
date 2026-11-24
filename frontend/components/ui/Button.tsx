"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-gold to-rust text-bg shadow-glow hover:shadow-glow-rust hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-cream hover:bg-surface border border-transparent hover:border-border",
  outline:
    "bg-surface text-cream border border-border hover:border-border-strong hover:bg-surface-strong",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", iconLeft, iconRight, children, ...rest },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...rest}
      >
        {iconLeft}
        <span>{children}</span>
        {iconRight}
      </button>
    );
  },
);
Button.displayName = "Button";

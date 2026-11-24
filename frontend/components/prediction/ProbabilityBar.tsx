"use client";

import { motion } from "framer-motion";
import { formatPercentage } from "@/lib/formatters";
import { cn } from "@/lib/cn";

interface ProbabilityBarProps {
  label: string;
  value: number;
  isWinner?: boolean;
  /** Optional override warna gradient (Tailwind classes) per kelas. */
  gradient?: string;
}

const DEFAULT_GRADIENT: Record<string, string> = {
  "Good Quality": "from-gold to-rust",
  "Poor Quality": "from-chocolate to-rust/60",
};

export function ProbabilityBar({
  label,
  value,
  isWinner,
  gradient,
}: ProbabilityBarProps) {
  const g = gradient ?? DEFAULT_GRADIENT[label] ?? "from-gold to-rust";
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span
          className={cn(
            "flex items-center gap-2",
            isWinner ? "text-cream" : "text-cream-dim",
          )}
        >
          {isWinner && (
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          )}
          {label}
        </span>
        <span
          className={cn(
            "font-mono",
            isWinner ? "text-cream" : "text-cream-dim",
          )}
        >
          {formatPercentage(value)}
        </span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-bg/70">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn("h-full rounded-full bg-gradient-to-r", g)}
        />
      </div>
    </div>
  );
}

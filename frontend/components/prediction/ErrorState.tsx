"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center py-10 text-center">
      <div className="rounded-full border border-rust/40 bg-rust/10 p-4 text-rust">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <p className="mt-5 font-display text-lg text-cream">
        Gagal memproses citra
      </p>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-cream-dim">
        {message}
      </p>
      {onRetry && (
        <div className="mt-5">
          <Button size="sm" variant="outline" onClick={onRetry}>
            Coba lagi
          </Button>
        </div>
      )}
    </div>
  );
}

"use client";

import { RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";

interface ImagePreviewProps {
  previewUrl: string;
  fileName?: string;
  onReset: () => void;
  onRetry?: () => void;
  showRetry?: boolean;
}

export function ImagePreview({
  previewUrl,
  fileName,
  onReset,
  onRetry,
  showRetry,
}: ImagePreviewProps) {
  return (
    <GlassCard className="overflow-hidden p-3">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-bg/60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewUrl}
          alt={fileName ?? "Preview citra biji kakao"}
          className="aspect-square w-full object-cover"
        />
        <div className="absolute right-2 top-2 flex gap-2">
          {showRetry && onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-bg/80 text-cream backdrop-blur transition-colors hover:border-border-strong"
              aria-label="Coba lagi"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={onReset}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-bg/80 text-cream backdrop-blur transition-colors hover:border-border-strong"
            aria-label="Hapus gambar"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between px-2">
        <p className="truncate font-mono text-[11px] uppercase tracking-[0.18em] text-cream-dim">
          {fileName ?? "Citra dipilih"}
        </p>
        <Button size="sm" variant="ghost" onClick={onReset}>
          Ganti
        </Button>
      </div>
    </GlassCard>
  );
}

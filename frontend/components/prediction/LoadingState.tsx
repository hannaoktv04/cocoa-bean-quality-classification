"use client";

import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="flex h-full flex-col items-center justify-center py-12 text-center">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-gold/20" />
        <div className="relative rounded-full border border-border bg-bg/60 p-5 text-gold">
          <Loader2 className="h-7 w-7 animate-spin" />
        </div>
      </div>
      <p className="mt-6 font-display text-lg text-cream">
        Menganalisis kualitas citra...
      </p>
      <p className="mt-1 text-sm text-cream-dim">
        Model sedang mempelajari karakteristik visual dan menjalankan klasifikasi.
      </p>
    </div>
  );
}

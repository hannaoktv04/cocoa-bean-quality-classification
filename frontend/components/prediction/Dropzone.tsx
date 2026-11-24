"use client";

import { Upload, ImagePlus } from "lucide-react";
import { useCallback, useRef, useState, type DragEvent } from "react";
import { cn } from "@/lib/cn";

interface DropzoneProps {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}

const ACCEPT = "image/jpeg,image/jpg,image/png";

export function Dropzone({ onFileSelected, disabled }: DropzoneProps) {
  const [isOver, setIsOver] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsOver(false);
      if (disabled) return;
      const file = e.dataTransfer.files?.[0];
      if (file) onFileSelected(file);
    },
    [onFileSelected, disabled],
  );

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelected(file);
    // reset agar file yang sama bisa dipilih ulang
    e.target.value = "";
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={onDrop}
      className={cn(
        "group relative flex h-72 cursor-pointer flex-col items-center justify-center gap-4 rounded-3xl border-2 border-dashed transition-all duration-300",
        isOver
          ? "border-gold bg-gold/5"
          : "border-border bg-surface hover:border-border-strong hover:bg-surface-strong",
        disabled && "cursor-not-allowed opacity-60",
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        onChange={onSelect}
        disabled={disabled}
        className="hidden"
      />

      <div className="rounded-2xl border border-border bg-bg/60 p-4 text-gold transition-transform group-hover:-translate-y-1">
        <Upload className="h-6 w-6" />
      </div>

      <div className="text-center">
        <p className="font-display text-lg text-cream">
          Tarik citra ke sini, atau klik untuk pilih file
        </p>
        <p className="mt-2 text-xs text-cream-dim">
          Format JPG / JPEG / PNG · Maks ~10MB · Satu citra biji kakao
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-border bg-bg/40 px-3 py-1.5">
        <ImagePlus className="h-3.5 w-3.5 text-gold" />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-dim">
          Pilih Citra
        </span>
      </div>
    </div>
  );
}

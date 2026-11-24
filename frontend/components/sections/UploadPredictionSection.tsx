"use client";

import { motion } from "framer-motion";
import { usePrediction } from "@/hooks/usePrediction";
import { GlassCard } from "@/components/ui/GlassCard";
import { Dropzone } from "@/components/prediction/Dropzone";
import { ImagePreview } from "@/components/prediction/ImagePreview";
import { LoadingState } from "@/components/prediction/LoadingState";
import { ErrorState } from "@/components/prediction/ErrorState";
import { PredictionResult } from "@/components/prediction/PredictionResult";
import { UploadCloud } from "lucide-react";

function EmptyState() {
  return (
    <div className="flex h-full min-h-[18rem] flex-col items-center justify-center py-10 text-center">
      <div className="rounded-full border border-border bg-bg/40 p-4 text-gold">
        <UploadCloud className="h-6 w-6" />
      </div>
      <p className="mt-5 font-display text-lg text-cream">
        Belum ada citra
      </p>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-cream-dim">
        Unggah satu citra biji kakao di area sebelah kiri untuk melihat hasil
        klasifikasi kualitas di sini.
      </p>
    </div>
  );
}

export function UploadPredictionSection() {
  const {
    file,
    previewUrl,
    status,
    result,
    error,
    runPrediction,
    reset,
  } = usePrediction();

  return (
    <section
      id="prediksi"
      className="relative scroll-mt-24 py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 max-w-2xl"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
            03 — Prediksi
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-cream text-balance md:text-5xl">
            Uji klasifikasi kualitas biji kakao.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream-dim md:text-base">
            Unggah citra biji kakao. Sistem akan menampilkan kelas
            Good Quality atau Poor Quality beserta confidence dan probabilitasnya.
          </p>
        </motion.div>

        <GlassCard strong className="overflow-hidden p-5 md:p-8">
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {/* Left: upload / preview */}
            <div>
              {previewUrl && file ? (
                <ImagePreview
                  previewUrl={previewUrl}
                  fileName={file.name}
                  onReset={reset}
                  showRetry={status === "error"}
                  onRetry={() => runPrediction(file)}
                />
              ) : (
                <Dropzone
                  onFileSelected={(f) => void runPrediction(f)}
                  disabled={status === "loading"}
                />
              )}
            </div>

            {/* Right: result / state */}
            <div className="rounded-3xl border border-border bg-bg/40 p-5 md:p-6">
              {status === "loading" && <LoadingState />}
              {status === "error" && (
                <ErrorState
                  message={error ?? "Terjadi kesalahan tidak diketahui."}
                  onRetry={file ? () => void runPrediction(file) : undefined}
                />
              )}
              {status === "success" && result && (
                <PredictionResult result={result} />
              )}
              {status === "idle" && <EmptyState />}
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

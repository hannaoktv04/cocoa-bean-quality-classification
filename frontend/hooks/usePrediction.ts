"use client";

import { useCallback, useState } from "react";
import { predictImage } from "@/lib/api";
import type { PredictionResponse } from "@/lib/types";

export type PredictionStatus = "idle" | "loading" | "success" | "error";

export interface UsePrediction {
  file: File | null;
  previewUrl: string | null;
  status: PredictionStatus;
  result: PredictionResponse | null;
  error: string | null;
  setFile: (file: File | null) => void;
  runPrediction: (file: File) => Promise<void>;
  reset: () => void;
}

/**
 * Hook sentral untuk state alur prediksi.
 * Dipakai oleh UploadPredictionSection; tidak boleh ada state prediction
 * yang disimpan di dalam komponen lain.
 */
export function usePrediction(): UsePrediction {
  const [file, setFileState] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<PredictionStatus>("idle");
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const setFile = useCallback((next: File | null) => {
    setFileState(next);
    setResult(null);
    setError(null);
    setStatus("idle");
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return next ? URL.createObjectURL(next) : null;
    });
  }, []);

  const runPrediction = useCallback(async (target: File) => {
    setFileState(target);
    setResult(null);
    setError(null);
    setStatus("loading");
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(target);
    });

    try {
      const data = await predictImage(target);
      setResult(data);
      setStatus("success");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Terjadi kesalahan.";
      setError(message);
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    setFileState(null);
    setResult(null);
    setError(null);
    setStatus("idle");
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
  }, []);

  return {
    file,
    previewUrl,
    status,
    result,
    error,
    setFile,
    runPrediction,
    reset,
  };
}

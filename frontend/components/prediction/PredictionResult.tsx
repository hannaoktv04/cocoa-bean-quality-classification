"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { PredictionResponse } from "@/lib/types";
import { formatPercentage } from "@/lib/formatters";
import { ProbabilityBar } from "./ProbabilityBar";

interface PredictionResultProps {
  result: PredictionResponse;
}

const CLASS_ORDER = ["Good Quality", "Poor Quality"] as const;

export function PredictionResult({ result }: PredictionResultProps) {
  const winner = result.prediction.label as string;
  const confidence = result.prediction.confidence;

  return (
    <div className="flex h-full flex-col">
      {/* Winner label */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-border-strong bg-surface-strong p-5"
      >
        <div className="flex items-center justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
            Hasil Klasifikasi
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-green/40 bg-green/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.18em] text-green">
            <CheckCircle2 className="h-3 w-3" />
            Berhasil
          </span>
        </div>
        <p className="mt-3 font-display text-3xl text-cream md:text-4xl">
          {winner}
        </p>
        <p className="mt-1 text-sm text-cream-dim">
          Confidence{" "}
          <span className="font-mono text-cream">
            {formatPercentage(confidence)}
          </span>
        </p>
      </motion.div>

      {/* Probability bars */}
      <div className="mt-5 space-y-4">
        {CLASS_ORDER.map((label) => {
          const value =
            (result.probabilities as Record<string, number>)[label] ?? 0;
          return (
            <ProbabilityBar
              key={label}
              label={label}
              value={value}
              isWinner={label === winner}
            />
          );
        })}
      </div>

      {/* Explanation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6 rounded-2xl border border-border bg-surface p-4"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
          Interpretasi
        </p>
        <p className="mt-2 text-sm leading-relaxed text-cream-dim">
          {result.explanation}
        </p>
      </motion.div>
    </div>
  );
}

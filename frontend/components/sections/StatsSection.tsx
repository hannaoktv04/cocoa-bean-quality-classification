"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

interface StatItem {
  value: string;
  label: string;
  caption: string;
  highlight?: string;
}

const STATS: StatItem[] = [
  {
    value: "2",
    label: "Kelas Kualitas",
    caption: "Good Quality · Poor Quality.",
    highlight: "Output",
  },
  {
    value: "3",
    label: "Arsitektur CNN",
    caption: "MobileNetV2 · MobileNetV3-Large · EfficientNetB0.",
    highlight: "Comparison",
  },
  {
    value: "4",
    label: "Metrik Utama",
    caption: "Accuracy · Precision · Recall · F1-score.",
    highlight: "Evaluation",
  },
  {
    value: "MobileNetV3",
    label: "Model Utama",
    caption: "MobileNetV3-Large berbasis transfer learning.",
    highlight: "Architecture",
  },
];

export function StatsSection() {
  return (
    <section id="model" className="relative py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col items-start justify-between gap-4 md:mb-16 md:flex-row md:items-end"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
              01 — Model
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium leading-tight text-cream text-balance md:text-5xl">
              Ringkasan rancangan klasifikasi pada penelitian.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-cream-dim">
            Penelitian membandingkan tiga arsitektur CNN untuk klasifikasi
            dua kelas kualitas dan mengevaluasinya dengan metrik yang sama.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <GlassCard className="group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                  {stat.highlight}
                </p>
                <p className="mt-5 font-display text-4xl font-medium text-cream md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-cream">{stat.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-cream-dim">
                  {stat.caption}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

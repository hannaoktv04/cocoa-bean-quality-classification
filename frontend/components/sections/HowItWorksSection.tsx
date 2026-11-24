"use client";

import { motion } from "framer-motion";
import { Upload, Image as ImageIcon, Layers, BarChart3 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const STEPS = [
  {
    n: "01",
    icon: Upload,
    title: "Unggah Citra",
    desc: "Pilih satu citra biji kakao melalui drag & drop atau klik area unggah. Format JPG, JPEG, atau PNG.",
  },
  {
    n: "02",
    icon: ImageIcon,
    title: "Preprocessing",
    desc: "Citra disiapkan sesuai preprocessing yang digunakan saat pelatihan model sebelum masuk ke tahap klasifikasi.",
  },
  {
    n: "03",
    icon: Layers,
    title: "Ekstraksi Fitur",
    desc: "MobileNetV3-Large mempelajari pola visual seperti warna, bentuk, ukuran, tekstur, dan representasi fitur lainnya.",
  },
  {
    n: "04",
    icon: BarChart3,
    title: "Hasil Prediksi",
    desc: "Model menghasilkan label Good Quality atau Poor Quality beserta confidence dan probabilitas prediksi.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl md:mb-16"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
            02 — Alur
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-cream text-balance md:text-5xl">
            Bagaimana citra diubah menjadi hasil klasifikasi.
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <GlassCard className="group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border-strong">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-gold">
                      {step.n}
                    </span>
                    <div className="rounded-2xl border border-border bg-bg/40 p-2 text-gold transition-colors group-hover:border-border-strong">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="mt-6 font-display text-xl text-cream">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream-dim">
                    {step.desc}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

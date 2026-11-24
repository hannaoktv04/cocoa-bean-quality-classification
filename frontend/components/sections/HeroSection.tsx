"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Cpu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { CocoaPodIcon } from "@/components/icons/CocoaPodIcon";
import { formatPercentage } from "@/lib/formatters";

function scrollToId(id: string) {
  if (typeof window === "undefined") return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Contoh probabilitas untuk kartu hero — hanya ilustrasi tampilan, bukan hasil API.
const HERO_SAMPLE = [
  { label: "Good Quality", value: 0.92, color: "from-gold to-rust" },
  { label: "Poor Quality", value: 0.08, color: "from-chocolate to-rust/60" },
] as const;

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden pt-28 md:pt-36"
    >
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-noise opacity-80" />
      <div className="pointer-events-none absolute -top-10 right-0 -z-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-20 -z-10 h-72 w-72 rounded-full bg-rust/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 md:grid-cols-2 md:gap-8 md:px-8 md:pb-32">
        {/* Left — copy */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge>
              <Cpu className="h-3 w-3" />
              MobileNetV3-Large · Transfer Learning
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-cream text-balance md:text-6xl"
          >
            Klasifikasi kualitas biji kakao{" "}
            <span className="gradient-text-gold">berbasis citra</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-cream-dim md:text-lg"
          >
            Unggah satu citra biji kakao. Sistem akan menggunakan
            Convolutional Neural Network berbasis transfer learning untuk
            mengklasifikasikan kualitasnya ke dalam dua kelas — Good Quality
            atau Poor Quality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button
              size="lg"
              onClick={() => scrollToId("prediksi")}
              iconRight={<ArrowRight className="h-4 w-4" />}
            >
              Mulai Prediksi
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToId("model")}
              iconLeft={<Sparkles className="h-4 w-4" />}
            >
              Pelajari Model
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex items-center gap-6 text-xs text-cream-dim"
          >
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green" />
              Klasifikasi berbasis CNN
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              2 kelas kualitas
            </div>
          </motion.div>
        </div>

        {/* Right — floating glass card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative flex items-center justify-center"
        >
          {/* Glow behind card */}
          <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-br from-gold/10 via-transparent to-rust/10 blur-2xl" />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-full max-w-md"
          >
            <GlassCard strong className="overflow-hidden p-6 shadow-card">
              {/* Top: illustration + label */}
              <div className="flex items-start gap-4">
                <div className="rounded-2xl border border-border bg-bg-secondary/60 p-3">
                  <CocoaPodIcon className="h-14 w-14 text-gold" />
                </div>
                <div className="flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                    Sample Output
                  </p>
                  <p className="mt-1 font-display text-lg text-cream">
                    Contoh hasil klasifikasi
                  </p>
                  <p className="mt-1 text-xs text-cream-dim">
                    Model mempelajari karakteristik visual citra.
                  </p>
                </div>
              </div>

              {/* Probability bars */}
              <div className="mt-6 space-y-4">
                {HERO_SAMPLE.map((row) => (
                  <div key={row.label}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-cream-dim">{row.label}</span>
                      <span className="font-mono text-cream">
                        {formatPercentage(row.value)}
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-bg/70">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${row.value * 100}%` }}
                        transition={{ duration: 1.1, delay: 0.4, ease: "easeOut" }}
                        className={`h-full rounded-full bg-gradient-to-r ${row.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer note */}
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-[10px] font-mono uppercase tracking-[0.18em] text-cream-dim">
                <span>Good Quality / Poor Quality</span>
                <span>MobileNetV3-Large</span>
              </div>
            </GlassCard>
          </motion.div>

          {/* Small floating bean */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -right-2 top-8 hidden md:block"
          >
            <GlassCard className="rounded-2xl p-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-dim">
                  Model Ready
                </span>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

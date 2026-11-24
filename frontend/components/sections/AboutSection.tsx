"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { CocoaBeanIcon, CocoaPodIcon } from "@/components/icons/CocoaPodIcon";

export function AboutSection() {
  return (
    <section id="tentang" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative flex items-center justify-center"
        >
          <GlassCard strong className="relative w-full overflow-hidden p-10 md:p-14">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-rust/5" />

            <div className="relative grid grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex aspect-square items-center justify-center rounded-2xl border border-border bg-bg/40"
                >
                  {i === 1 ? (
                    <CocoaBeanIcon className="h-10 w-10 text-gold" />
                  ) : (
                    <CocoaPodIcon className="h-14 w-14 text-gold/80" />
                  )}
                </motion.div>
              ))}
            </div>

            <p className="relative mt-8 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-cream-dim">
              Good Quality · Poor Quality
            </p>
          </GlassCard>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col justify-center"
        >
          <Badge>Tentang Sistem</Badge>
          <h2 className="mt-5 font-display text-3xl font-medium leading-tight text-cream text-balance md:text-5xl">
            Dari penilaian visual manual menuju klasifikasi berbasis citra.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-cream-dim md:text-lg">
            <p>
              Penilaian kualitas biji kakao secara manual masih bergantung
              pada pengamatan visual dan pengalaman penilai. Proses ini dapat
              dipengaruhi subjektivitas, membutuhkan waktu, dan menghasilkan
              penilaian yang tidak selalu konsisten antarpenilai.
            </p>
            <p>
              <span className="text-cream">Cocoa Quality AI</span> menggunakan
              Convolutional Neural Network berbasis transfer learning dengan
              MobileNetV3-Large sebagai model utama untuk mempelajari
              karakteristik visual citra seperti warna, bentuk, ukuran, dan
              tekstur, lalu mengklasifikasikannya ke kelas Good Quality atau
              Poor Quality.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {[
              { k: "Berbasis Citra", v: "Warna, bentuk & tekstur" },
              { k: "2 Kelas", v: "Good & Poor Quality" },
              { k: "Transfer Learning", v: "MobileNetV3-Large" },
              { k: "Terukur", v: "Confidence & probabilitas" },
            ].map((item) => (
              <div
                key={item.k}
                className="rounded-2xl border border-border bg-surface p-4"
              >
                <p className="font-display text-sm text-cream">{item.k}</p>
                <p className="mt-1 text-xs text-cream-dim">{item.v}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

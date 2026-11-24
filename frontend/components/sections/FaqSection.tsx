"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AccordionItem } from "@/components/ui/AccordionItem";

const FAQS = [
  {
    q: "Apa yang diklasifikasikan oleh Cocoa Quality?",
    a: "Sistem mengklasifikasikan citra biji kakao ke dalam dua kelas kualitas, yaitu Good Quality dan Poor Quality, berdasarkan karakteristik visual yang dipelajari model.",
  },
  {
    q: "Model apa yang digunakan dalam penelitian?",
    a: "MobileNetV3-Large digunakan sebagai model utama berbasis transfer learning. MobileNetV2 digunakan sebagai baseline dan EfficientNetB0 sebagai model pembanding untuk melihat performa relatif ketiga arsitektur.",
  },
  {
    q: "Karakteristik apa yang dipelajari dari citra biji kakao?",
    a: "Model CNN mempelajari pola visual secara otomatis, termasuk informasi yang berkaitan dengan warna, bentuk, ukuran, tekstur, serta pola lain pada citra yang membantu membedakan Good Quality dan Poor Quality.",
  },
  {
    q: "Bagaimana performa model dievaluasi?",
    a: "Performa dievaluasi menggunakan accuracy, precision, recall, F1-score, classification report, dan confusion matrix untuk melihat kemampuan model dalam membedakan kedua kelas kualitas.",
  },
  {
    q: "Apakah prediksi AI menggantikan pengujian laboratorium?",
    a: "Tidak. Penelitian ini berfokus pada klasifikasi berdasarkan informasi visual citra. Sistem tidak melakukan pengujian mutu kimiawi dan tidak menggantikan keseluruhan standar pengujian kualitas kakao.",
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
            04 — FAQ
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-cream text-balance md:text-5xl">
            Pertanyaan yang sering ditanyakan.
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((item, idx) => (
            <AccordionItem
              key={item.q}
              question={item.q}
              answer={item.a}
              open={openIdx === idx}
              onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

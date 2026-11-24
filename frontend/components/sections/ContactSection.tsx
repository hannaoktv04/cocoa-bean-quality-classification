"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";

interface FormState {
  name: string;
  email: string;
  message: string;
}

export function ContactSection() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Form belum terhubung ke endpoint pengiriman — hanya simulasi UI.
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
            05 — Kontak
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-cream text-balance md:text-5xl">
            Punya pertanyaan tentang penelitian?
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-cream-dim">
            Bagian ini disediakan untuk pertanyaan, masukan, atau diskusi
            mengenai penelitian klasifikasi kualitas biji kakao berbasis citra.
            Form masih berupa prototype dan belum terhubung ke sistem email.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <GlassCard strong className="p-6 md:p-8">
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-dim"
                >
                  Nama
                </label>
                <input
                  id="contact-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-border bg-bg/40 px-4 py-3 text-sm text-cream outline-none transition-colors placeholder:text-cream-dim/60 focus:border-border-strong"
                  placeholder="Nama lengkap"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-dim"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-border bg-bg/40 px-4 py-3 text-sm text-cream outline-none transition-colors placeholder:text-cream-dim/60 focus:border-border-strong"
                  placeholder="nama@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-dim"
                >
                  Pesan
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  className="mt-2 w-full resize-none rounded-2xl border border-border bg-bg/40 px-4 py-3 text-sm text-cream outline-none transition-colors placeholder:text-cream-dim/60 focus:border-border-strong"
                  placeholder="Tulis pertanyaan atau masukan..."
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-dim">
                  *Belum terhubung ke sistem pengiriman
                </p>
                <Button type="submit" iconRight={<Send className="h-3.5 w-3.5" />}>
                  {submitted ? "Tersimpan (demo)" : "Kirim Pesan"}
                </Button>
              </div>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

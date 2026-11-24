"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { label: "Tentang", href: "#tentang" },
  { label: "Model", href: "#model" },
  { label: "Prediksi", href: "#prediksi" },
  { label: "FAQ", href: "#faq" },
];

function scrollTo(href: string) {
  if (typeof window === "undefined") return;
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-bg/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        {/* Logo */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="group flex items-center gap-2"
        >
          <span className="font-display text-xl tracking-tight text-cream">
            Cocoa<span className="text-gold">Quality</span>{" "}
          </span>
          <span className="hidden h-1.5 w-1.5 rounded-full bg-gold/80 transition-transform group-hover:scale-125 md:inline-block" />
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className="text-sm text-cream-dim transition-colors hover:text-cream"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <Button
            size="sm"
            onClick={() => scrollTo("#prediksi")}
            iconLeft={<span className="h-1.5 w-1.5 rounded-full bg-bg" />}
          >
            Mulai Prediksi
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-cream md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    scrollTo(link.href);
                  }}
                  className="rounded-xl px-3 py-3 text-sm text-cream-dim transition-colors hover:bg-surface hover:text-cream"
                >
                  {link.label}
                </a>
              ))}
              <Button
                className="mt-2"
                onClick={() => {
                  setOpen(false);
                  scrollTo("#prediksi");
                }}
              >
                Mulai Prediksi
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

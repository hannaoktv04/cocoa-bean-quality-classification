"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface AccordionItemProps {
  question: string;
  answer: ReactNode;
  /** Controlled mode — jika diberikan, komponen tidak mengelola state sendiri. */
  open?: boolean;
  onToggle?: () => void;
  defaultOpen?: boolean;
}

export function AccordionItem({
  question,
  answer,
  open: controlledOpen,
  onToggle,
  defaultOpen = false,
}: AccordionItemProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const handleClick = () => {
    if (isControlled) onToggle?.();
    else setInternalOpen((v) => !v);
  };

  return (
    <div
      className={cn(
        "rounded-2xl border transition-colors duration-300",
        open ? "border-border-strong bg-surface-strong" : "border-border bg-surface",
      )}
    >
      <button
        type="button"
        onClick={handleClick}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-base text-cream md:text-lg">{question}</span>
        <Plus
          className={cn(
            "h-4 w-4 shrink-0 text-gold transition-transform duration-300",
            open && "rotate-45",
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm leading-relaxed text-cream-dim md:text-base">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

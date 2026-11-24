import { CocoaPodIcon } from "@/components/icons/CocoaPodIcon";

const FOOTER_LINKS = [
  { label: "Tentang", href: "#tentang" },
  { label: "Model", href: "#model" },
  { label: "Prediksi", href: "#prediksi" },
  { label: "FAQ", href: "#faq" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border bg-bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CocoaPodIcon className="h-10 w-10 text-gold" />
              <div>
                <p className="font-display text-xl text-cream">
                  Cocoa<span className="text-gold">Quality</span>{" "}
                  <span className="text-gold">AI</span>
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cream-dim">
                  MobileNetV3-Large · Transfer Learning
                </p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-cream-dim">
              Sistem klasifikasi kualitas biji kakao berbasis citra
              menggunakan Convolutional Neural Network, dikembangkan sebagai
              bagian dari penelitian skripsi.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
              Navigasi
            </h4>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-cream-dim transition-colors hover:text-cream"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Meta */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
              Riset
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-cream-dim">
              <li>Skripsi — Klasifikasi Kualitas Biji Kakao</li>
              <li>Model utama: MobileNetV3-Large</li>
              <li>Kelas: Good Quality &amp; Poor Quality</li>
              <li>Framework: TensorFlow / Keras</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream-dim">
            © {year} Cocoa Quality  @hanna.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream-dim">
            Dibuat dengan Next.js · FastAPI · TensorFlow
          </p>
        </div>
      </div>
    </footer>
  );
}

// Tiny class-name helper. Gabungkan conditional Tailwind classes tanpa
// dependensi tambahan. Mendukung string/false/null/undefined.

export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const walk = (v: ClassValue): void => {
    if (!v && v !== 0) return;
    if (typeof v === "string" || typeof v === "number") {
      out.push(String(v));
    } else if (Array.isArray(v)) {
      v.forEach(walk);
    } else if (typeof v === "object") {
      for (const key in v) {
        if (v[key]) out.push(key);
      }
    }
  };
  inputs.forEach(walk);
  return out.join(" ");
}

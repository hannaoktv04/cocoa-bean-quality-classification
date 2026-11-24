/**
 * Helper untuk format angka probabilitas / confidence.
 * Dipakai konsisten di semua komponen UI — jangan format inline di tempat lain.
 */

export function formatPercentage(value: number, fractionDigits = 1): string {
  if (!Number.isFinite(value)) return "0%";
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return `${pct.toFixed(fractionDigits)}%`;
}

/** Format probabilitas sebagai desimal 0..1, misal 0.943 */
export function formatProbability(value: number, fractionDigits = 3): string {
  if (!Number.isFinite(value)) return "0.000";
  return value.toFixed(fractionDigits);
}

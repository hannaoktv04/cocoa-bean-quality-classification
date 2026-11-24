import type { ApiError, PredictionResponse } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/**
 * Mengirim satu file gambar ke endpoint FastAPI /predict.
 * Mengembalikan PredictionResponse jika berhasil.
 * Melempar Error dengan pesan siap-tampil untuk UI jika gagal.
 */
export async function predictImage(file: File): Promise<PredictionResponse> {
  const formData = new FormData();
  formData.append("image", file);

  let res: Response;
  try {
    res = await fetch(`${API_URL}/predict`, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new Error(
      "Tidak dapat terhubung ke server prediksi. Pastikan backend berjalan.",
    );
  }

  if (!res.ok) {
    let message = "Gagal memproses gambar.";
    try {
      const data = (await res.json()) as ApiError;
      if (data?.error?.message) message = data.error.message;
    } catch {
      // response bukan JSON; gunakan default message
    }
    throw new Error(message);
  }

  return (await res.json()) as PredictionResponse;
}

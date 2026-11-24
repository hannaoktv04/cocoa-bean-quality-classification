// Tipe data yang merepresentasikan response API backend FastAPI.
// Harus konsisten dengan backend/app/schemas/prediction.py.

export type ClassLabel = "Basah" | "Ideal" | "Terlalu Kering";

export interface PredictionResponse {
  prediction: {
    label: ClassLabel;
    confidence: number; // 0..1, dibulatkan 3 desimal di backend
  };
  probabilities: Record<ClassLabel, number>;
  explanation: string;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
  };
}

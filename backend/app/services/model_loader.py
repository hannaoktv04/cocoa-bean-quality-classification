"""
Singleton loader untuk model TensorFlow pada Cocoa Quality AI.

Model dimuat satu kali saat aplikasi FastAPI mulai berjalan.
Path model dapat diatur melalui environment variable MODEL_PATH.

Fokus model:
- Klasifikasi kualitas biji kakao berbasis citra
- Kelas: Good Quality dan Poor Quality
- Model utama penelitian: MobileNetV3-Large
"""

import os
from typing import Optional

import tensorflow as tf

_model: Optional[tf.keras.Model] = None

# Ubah nama file ini jika file .keras hasil training kamu memakai nama lain.
_model_path: str = os.environ.get(
    "MODEL_PATH",
    "app/model/MobileNetV3Large_final.keras",
)


def load_model() -> tf.keras.Model:
    """Memuat model dari disk satu kali saat startup FastAPI."""
    global _model

    if _model is None:
        if not os.path.exists(_model_path):
            raise FileNotFoundError(
                f"File model tidak ditemukan di '{_model_path}'. "
                "Pastikan MODEL_PATH mengarah ke file .keras hasil training "
                "MobileNetV3-Large pada penelitian klasifikasi kualitas biji kakao."
            )

        _model = tf.keras.models.load_model(_model_path)

    return _model


def get_model() -> tf.keras.Model:
    """Mengambil instance model yang sudah dimuat saat startup."""
    if _model is None:
        raise RuntimeError(
            "Model belum dimuat. Pastikan lifespan startup pada main.py "
            "sudah dijalankan."
        )

    return _model


def get_model_path() -> str:
    """Mengembalikan path model aktif untuk kebutuhan debugging/health check."""
    return _model_path

from typing import Dict, Tuple

import numpy as np

from app.services.model_loader import get_model
from app.utils.image_utils import preprocess_image


CLASS_NAMES = [
    "Poor Quality",
    "Good Quality",
]


CONFIDENCE_THRESHOLD = 0.85


_EXPLANATIONS = {
    "Good Quality": (
        "Citra biji kakao diklasifikasikan sebagai Good Quality "
        "berdasarkan karakteristik visual yang dipelajari oleh model, "
        "seperti warna, bentuk, ukuran, tekstur, dan pola visual lainnya."
    ),

    "Poor Quality": (
        "Citra biji kakao diklasifikasikan sebagai Poor Quality "
        "berdasarkan karakteristik visual yang dipelajari oleh model, "
        "seperti warna, bentuk, ukuran, tekstur, dan pola visual lainnya."
    ),

    "Unknown": (
        "Model tidak memiliki tingkat keyakinan yang cukup untuk "
        "mengklasifikasikan citra sebagai Good Quality atau Poor Quality. "
        "Pastikan citra yang diunggah merupakan citra biji kakao dan "
        "memiliki kondisi pengambilan gambar yang sesuai."
    ),
}


def predict_from_bytes(file_bytes: bytes) -> Dict:
    """
    Menjalankan klasifikasi kualitas biji kakao dari bytes citra.

    Output:

    Jika confidence >= threshold:
    {
        "prediction": {
            "label": "Good Quality" | "Poor Quality",
            "confidence": float
        },
        "probabilities": {
            "Good Quality": float,
            "Poor Quality": float
        },
        "explanation": str
    }

    Jika confidence < threshold:
    {
        "prediction": {
            "label": "Unknown",
            "confidence": float
        },
        ...
    }
    """


    arr = preprocess_image(file_bytes)


    model = get_model()

    preds = model.predict(arr, verbose=0)

    output = np.asarray(preds).reshape(-1)

    if output.size != 1:
        raise ValueError(
            "Output model tidak sesuai dengan binary sigmoid. "
            f"Diharapkan 1 nilai, tetapi ditemukan {output.size} nilai."
        )

    score = float(output[0])

    score = float(np.clip(score, 0.0, 1.0))


    good_probability = score
    poor_probability = 1.0 - score

    probabilities_raw = np.array(
        [
            poor_probability,
            good_probability,
        ],
        dtype=np.float32,
    )


    top_idx = int(np.argmax(probabilities_raw))

    predicted_label = CLASS_NAMES[top_idx]

    top_confidence = float(
        probabilities_raw[top_idx]
    )


    if top_confidence < CONFIDENCE_THRESHOLD:
        final_label = "Poor Qualty"
    else:
        final_label = predicted_label


    probabilities = {
        "Good Quality": round(
            good_probability,
            3,
        ),
        "Poor Quality": round(
            poor_probability,
            3,
        ),
    }


    explanation = _EXPLANATIONS[
        final_label
    ]


    return {
        "prediction": {
            "label": final_label,
            "confidence": round(
                top_confidence,
                3,
            ),
        },

        "probabilities": probabilities,

        "explanation": explanation,
    }


def class_names() -> Tuple[str, ...]:
    """
    Mengembalikan kelas asli dataset penelitian.

    Unknown tidak dimasukkan karena bukan kelas dataset,
    melainkan rejection label pada implementasi sistem.
    """

    return tuple(CLASS_NAMES)
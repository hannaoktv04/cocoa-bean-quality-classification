"""
Image preprocessing utilities.

Harus identik dengan preprocessing saat training:
- convert ke RGB
- resize ke IMG_SIZE
- normalisasi sudah built-in di MobileNetV3Large (jadi tidak perlu /255 manual)
"""

import io

import numpy as np
from PIL import Image, UnidentifiedImageError

IMG_SIZE = (224, 224)


def preprocess_image(file_bytes: bytes) -> np.ndarray:
    """Decode bytes → PIL Image RGB → resize → numpy float32 batch.

    Mengembalikan array shape (1, H, W, 3) siap untuk model.predict().
    """
    try:
        img = Image.open(io.BytesIO(file_bytes))
    except UnidentifiedImageError as e:
        raise ValueError("File yang diunggah bukan format gambar yang didukung.") from e

    img = img.convert("RGB")  # antisipasi PNG alpha / grayscale
    img = img.resize(IMG_SIZE)
    arr = np.array(img, dtype=np.float32)
    arr = np.expand_dims(arr, axis=0)
    return arr

# Model directory

Letakkan file model hasil training di folder ini dengan nama persis:

    cocoa_dryness_mobilenetv3.keras

Backend FastAPI akan memuat file ini **sekali** saat startup (lihat
`services/model_loader.py` yang dipanggil dari `main.py` lifespan event).

## Catatan urutan kelas (SANGAT PENTING)

Pastikan folder dataset saat training menggunakan nama subfolder:

    basah/
    ideal/
    terlalu_kering/

Urutan ini adalah urutan alfabetis — `image_dataset_from_directory` akan
mengurutkan kelas sesuai alfabet. Backend membaca indeks output model
dengan urutan yang sama (`CLASS_NAMES` di `services/inference.py`):

```python
CLASS_NAMES = ["basah", "ideal", "terlalu_kering"]
```

Jika Anda menggunakan nama folder lain (mis. `Basah`, `Ideal`, `TerlaluKering`),
**perbarui `CLASS_NAMES` di `inference.py`** agar sesuai. Kesalahan urutan
tidak memunculkan error, tapi semua prediksi akan salah.

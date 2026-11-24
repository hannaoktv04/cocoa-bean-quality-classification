# CocoaDry AI — Agent Build Guide

## 1. Project Overview

CocoaDry AI adalah aplikasi web yang mengklasifikasikan tingkat kekeringan biji kakao pasca-panen menjadi tiga kelas — **basah**, **ideal**, **terlalu kering** — menggunakan model **Convolutional Neural Network (CNN)** dengan pendekatan **transfer learning MobileNetV3Large**.

Alur pengguna: unggah satu foto biji kakao → sistem melakukan preprocessing → model melakukan inferensi → hasil ditampilkan berupa label kelas, confidence score, dan probabilitas tiap kelas.

Website berfungsi sebagai media demonstrasi model sekaligus antarmuka riset untuk skripsi, bergaya **dark premium**, terinspirasi dari referensi desain landing page bertema alam (dark, glassmorphism, floating card, rounded), diadaptasi ke tema kakao/cokelat.

---

## 2. Tech Stack

**Frontend**
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (animasi)
- Lucide React (icon)

**Backend**
- FastAPI (Python)
- TensorFlow / Keras
- Pillow, NumPy
- Uvicorn (ASGI server)

**Machine Learning**
- Arsitektur: MobileNetV3Large (transfer learning, ImageNet pretrained)
- Format model: `.keras`
- Input: gambar RGB 160×160

---

## 3. Design System

### 3.1 Palet Warna

| Token | Hex | Penggunaan |
|---|---|---|
| `bg` | `#120C08` | Background utama (near-black warm brown) |
| `bg-secondary` | `#1A120C` | Background sekunder/gradient |
| `surface` | `rgba(246,239,232,0.04)` | Kartu/panel (glass) |
| `surface-strong` | `rgba(246,239,232,0.07)` | Kartu dengan penekanan |
| `border` | `rgba(217,179,106,0.16)` | Border default |
| `border-strong` | `rgba(217,179,106,0.32)` | Border hover/emphasis |
| `cream` | `#F6EFE8` | Teks utama |
| `cream-dim` | `rgba(246,239,232,0.62)` | Teks sekunder |
| `gold` | `#D9B36A` | Aksen utama (CTA, angka, ikon) |
| `rust` | `#C9703F` | Aksen sekunder (gradient, hover) |
| `cocoa` | `#7B4F2A` | Warna kelas "basah" |
| `chocolate` | `#5C3B22` | Warna kelas "terlalu kering" / base ilustrasi |
| `green` | `#6E8B4E` | Aksen tersier, elemen dekoratif |

Definisikan token ini di `tailwind.config.ts` sebagai `extend.colors`, jangan hardcode hex di komponen.

### 3.2 Tipografi

- **Display/heading**: `Fraunces` (serif, variable weight, dipakai untuk headline, angka statistik, label hasil prediksi) — kesan organik dan premium, bukan sans generik.
- **Body**: `Manrope` (sans-serif, untuk paragraf, navigasi, tombol)
- **Utility/mono**: `IBM Plex Mono` (untuk eyebrow label, angka probabilitas, kode confidence) — memberi kesan "data/teknis" yang kontras dengan Fraunces yang organik.

Muat lewat `next/font/google`, bukan link tag manual.

### 3.3 Prinsip Visual

- Dark premium, banyak whitespace, tidak ramai
- Glassmorphism: `backdrop-blur` + border tipis translucent, bukan flat card biasa
- Rounded corner besar (`rounded-2xl`/`rounded-3xl`), bukan sudut tajam
- Elemen floating dengan animasi halus (subtle float/parallax), bukan animasi berlebihan
- Aksen gold/rust dipakai secukupnya — jangan sampai tiap elemen berwarna, biarkan dark background mendominasi
- Ilustrasi tema kakao (buah kakao, biji, pola urat daun) dalam bentuk SVG custom bergaris tipis (line art), BUKAN foto stok generik AI-look

---

## 4. Struktur Folder (Modular)

```
cocoadry-ai/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # merangkai semua section
│   │   └── globals.css
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── StatsSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── UploadPredictionSection.tsx
│   │   │   ├── FaqSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── prediction/
│   │   │   ├── Dropzone.tsx
│   │   │   ├── ImagePreview.tsx
│   │   │   ├── PredictionResult.tsx
│   │   │   ├── ProbabilityBar.tsx
│   │   │   ├── LoadingState.tsx
│   │   │   └── ErrorState.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   ├── Badge.tsx               # untuk eyebrow label
│   │   │   └── AccordionItem.tsx       # dipakai FaqSection
│   │   └── icons/
│   │       └── CocoaPodIcon.tsx        # SVG ilustrasi buah kakao
│   ├── lib/
│   │   ├── api.ts                      # fungsi fetch ke backend /predict
│   │   ├── types.ts                    # tipe PredictionResponse, dsb
│   │   └── formatters.ts               # format confidence/persentase
│   ├── hooks/
│   │   └── usePrediction.ts            # state upload, loading, error, hasil
│   ├── public/
│   ├── tailwind.config.ts
│   ├── next.config.js
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── main.py                     # entrypoint FastAPI + CORS + startup load model
│   │   ├── model/
│   │   │   └── cocoa_dryness_mobilenetv3.keras
│   │   ├── routers/
│   │   │   └── predict.py              # endpoint POST /predict
│   │   ├── services/
│   │   │   ├── model_loader.py         # load model sekali saat startup (singleton)
│   │   │   └── inference.py            # logika preprocessing + prediksi
│   │   ├── schemas/
│   │   │   └── prediction.py           # Pydantic response model
│   │   └── utils/
│   │       └── image_utils.py          # resize, convert RGB, dsb
│   ├── requirements.txt
│   └── .env
│
└── agent.md                            # dokumen ini
```

Setiap komponen React harus satu tanggung jawab (single responsibility) — jangan gabungkan logic upload + tampilan hasil dalam satu file besar. Gunakan `hooks/usePrediction.ts` untuk memisahkan state management dari presentasi.

---

## 5. Struktur Halaman & Konten Tiap Section

### 5.1 Navbar (`components/layout/Navbar.tsx`)
- Logo "CocoaDry AI" (teks "AI" berwarna gold)
- Link: Tentang, Model, Prediksi, FAQ
- Tombol CTA "Mulai Prediksi" (scroll ke section upload)
- Transparan di atas, `backdrop-blur` + border bawah saat discroll (gunakan `useEffect` + scroll listener, atau `framer-motion useScroll`)

### 5.2 Hero Section (`HeroSection.tsx`)
- Eyebrow badge: "MobileNetV3Large · Transfer Learning" (mono font, border gold tipis)
- Headline (Fraunces, besar): "Prediksi tingkat kekeringan biji kakao berbasis AI"
- Deskripsi singkat 1-2 kalimat
- Dua CTA: "Mulai Prediksi" (primary, scroll ke upload) dan "Pelajari Model" (ghost, scroll ke model section)
- Floating glass card di kanan: ilustrasi SVG buah kakao (line art) + contoh hasil probabilitas (Ideal 92%, Basah 5%, Terlalu Kering 3%) + progress bar gradient gold→rust
- Animasi float halus pada card (naik-turun lambat, `framer-motion` infinite loop)

### 5.3 About Section (`AboutSection.tsx`)
- Layout 2 kolom: visual kiri (placeholder gradient/ilustrasi proses pengeringan), teks kanan
- Narasi: masalah penilaian manual petani → solusi AI yang konsisten

### 5.4 Stats Section (`StatsSection.tsx`)
- Grid 4 kartu: `160×160` (Resolusi Input), `3` (Kelas Prediksi), `MobileNetV3` (Transfer Learning), `CNN` (Real-time Classification)
- Reveal animation saat masuk viewport (`framer-motion whileInView`)

### 5.5 How It Works Section (`HowItWorksSection.tsx`)
- 4 kartu bernomor (01-04): Unggah Gambar → Preprocessing → Ekstraksi Fitur → Hasil Prediksi
- Hover: border lebih terang + translate-y kecil

### 5.6 Upload & Prediction Section (`UploadPredictionSection.tsx`) — CORE FEATURE
- Grid 2 kolom dalam satu glass card besar:
  - Kiri: `Dropzone.tsx` (drag & drop + klik untuk pilih file), setelah ada file → `ImagePreview.tsx`
  - Kanan: `PredictionResult.tsx` — tampilkan `LoadingState` saat memanggil API, `ErrorState` jika gagal, atau hasil (label, confidence, `ProbabilityBar` untuk tiap kelas, penjelasan teks)
- State dikelola oleh `usePrediction.ts` hook, bukan langsung di komponen section

### 5.7 FAQ Section (`FaqSection.tsx`)
- Accordion, hanya satu item terbuka dalam satu waktu
- Pertanyaan: apa itu MobileNetV3Large, bagaimana AI bekerja, kenapa gambar harus 160×160, apakah bisa real-time

### 5.8 Contact Section (`ContactSection.tsx`)
- Form: Nama, Email, Pesan, tombol "Kirim Pesan"
- Untuk versi awal, form ini bisa non-fungsional (UI saja) — beri catatan kecil di bawah form bahwa ini belum terhubung ke sistem pengiriman, KECUALI diminta membuat endpoint kontak juga

### 5.9 Footer (`Footer.tsx`)
- Logo, navigasi singkat, copyright

---

## 6. Backend — Kontrak API

### Endpoint

```
POST /predict
Content-Type: multipart/form-data
Field: image (file)
```

### Response Sukses

```json
{
  "prediction": {
    "label": "Ideal",
    "confidence": 0.943
  },
  "probabilities": {
    "Basah": 0.030,
    "Ideal": 0.943,
    "Terlalu Kering": 0.027
  },
  "explanation": "Biji kakao terdeteksi berada pada tingkat kekeringan ideal berdasarkan karakteristik tekstur permukaan yang dikenali oleh model."
}
```

### Response Error (contoh: file bukan gambar)

```json
{
  "error": {
    "code": "INVALID_IMAGE",
    "message": "File yang diunggah bukan format gambar yang didukung."
  }
}
```

Pastikan:
- `confidence` selalu antara 0–1, dibulatkan 3 desimal
- Total `probabilities` = 1 (atau sangat mendekati karena floating point)
- Response error punya struktur konsisten agar frontend bisa menampilkan `ErrorState` secara seragam

---

## 7. Model Loading Strategy (WAJIB DIPATUHI)

### 7.1 Lokasi File Model

```
backend/app/model/cocoa_dryness_mobilenetv3.keras
```

### 7.2 Aturan Loading

- Model **HARUS dimuat sekali saat aplikasi FastAPI start** (di `services/model_loader.py`, dipanggil dari `main.py` lifespan event atau saat modul pertama kali diimpor), **BUKAN** dimuat ulang setiap ada request masuk ke `/predict`.
- Simpan sebagai singleton/global yang diakses oleh `services/inference.py`.

```python
# services/model_loader.py
import tensorflow as tf

_model = None

def get_model():
    global _model
    if _model is None:
        _model = tf.keras.models.load_model("app/model/cocoa_dryness_mobilenetv3.keras")
    return _model
```

### 7.3 Urutan Label Kelas (KRUSIAL — sumber bug paling umum)

Model dilatih dengan `image_dataset_from_directory`, yang mengurutkan kelas **secara alfabetis** berdasarkan nama folder saat training. Urutan output model (index 0, 1, 2) HARUS mengikuti urutan ini persis dan TIDAK BOLEH ditulis ulang manual dengan urutan berbeda di backend maupun frontend:

```python
CLASS_NAMES = ["basah", "ideal", "terlalu_kering"]  # urutan alfabetis — jangan diubah
```

Kesalahan urutan di sini menyebabkan semua prediksi salah tanpa memunculkan error apa pun (silent bug). Selalu verifikasi urutan ini terhadap `class_names` asli dari notebook training sebelum deploy.

### 7.4 Preprocessing Gambar (harus identik dengan saat training)

```python
# services/inference.py
from PIL import Image
import numpy as np
import io

IMG_SIZE = (160, 160)

def preprocess_image(file_bytes: bytes) -> np.ndarray:
    img = Image.open(io.BytesIO(file_bytes)).convert("RGB")  # paksa RGB, antisipasi PNG alpha/grayscale
    img = img.resize(IMG_SIZE)
    arr = np.array(img, dtype=np.float32)
    arr = np.expand_dims(arr, axis=0)  # tambah dimensi batch
    return arr
    # CATATAN: tidak perlu dibagi 255 atau preprocessing manual lain,
    # karena normalisasi MobileNetV3Large sudah built-in di dalam arsitektur model.
```

---

## 8. Backend Environment

### `requirements.txt`

```
fastapi
uvicorn[standard]
tensorflow-cpu
pillow
numpy
python-multipart
pydantic
```

### CORS (wajib, agar Next.js bisa mengakses FastAPI di port berbeda)

```python
# main.py
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # sesuaikan saat deploy production
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 9. Frontend Rules

- Gunakan App Router Next.js, TypeScript strict mode
- Semua komponen modular, satu tanggung jawab per file — jangan gabungkan fetch logic dan UI dalam satu komponen besar
- State upload/loading/error/hasil dikelola di `hooks/usePrediction.ts`, dikonsumsi oleh `UploadPredictionSection.tsx`
- Gunakan `next/image` untuk optimasi gambar (kecuali preview upload user, yang perlu `<img>` biasa karena berasal dari `URL.createObjectURL`)
- Jangan hardcode hasil prediksi di komponen — semua dari response API via `lib/api.ts`
- Sertakan `LoadingState`, `ErrorState`, dan empty state (belum ada gambar diupload) sebagai komponen terpisah, bukan kondisional inline yang panjang
- Format confidence/probabilitas lewat helper di `lib/formatters.ts` (contoh: `formatPercentage(0.943) => "94.3%"`), jangan format inline berulang di berbagai komponen
- Animasi via Framer Motion secukupnya: reveal on scroll untuk section, float untuk hero card, hover untuk kartu — hindari animasi berlebihan yang mengganggu

### `lib/api.ts` (contoh kontrak)

```typescript
export async function predictImage(file: File): Promise<PredictionResponse> {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message ?? "Gagal memproses gambar.");
  }

  return res.json();
}
```

---

## 10. Development Instructions untuk Agent

Sebelum mengubah/membuat kode:

1. Analisis struktur folder yang sudah ada (kalau project sudah pernah di-scaffold sebagian).
2. Konfirmasi versi Node.js dan Python yang tersedia di environment.
3. Scaffold frontend (`create-next-app` dengan TypeScript + Tailwind) dan backend (virtualenv + FastAPI) sesuai struktur folder di atas.
4. Implementasikan backend dulu (model loading, endpoint `/predict`, CORS) — ini fondasi yang membuat frontend bisa diuji end-to-end.
5. Implementasikan frontend section demi section, dimulai dari layout (Navbar, Footer) lalu Hero, lalu Upload & Prediction (fitur inti), baru section pelengkap lainnya.
6. Pastikan build (`npm run build`) dan lint tidak menghasilkan error sebelum dianggap selesai.
7. Uji end-to-end: jalankan backend (`uvicorn app.main:app --reload`) dan frontend (`npm run dev`), upload satu gambar contoh, pastikan response benar-benar sampai ke UI dan label kelas terpetakan dengan benar.
8. Berikan ringkasan perubahan di akhir, beserta cara menjalankan frontend dan backend secara lokal.

---

## 11. Catatan Referensi Desain

Gaya visual mengacu pada referensi landing page dark-premium dengan glassmorphism, floating card, dan rounded element yang sudah didiskusikan sebelumnya — nuansa warna dan ilustrasi diadaptasi dari hijau/tanaman menjadi coklat/kakao (lihat token warna di bagian 3.1). Jangan meniru konten atau identitas visual dari brand referensi tersebut secara langsung; yang dipertahankan hanya prinsip layout, spacing, dan kesan premium.

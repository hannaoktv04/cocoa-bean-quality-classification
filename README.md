# CocoaDry AI

Aplikasi web klasifikasi tingkat kekeringan biji kakao pasca-panen
(**basah**, **ideal**, **terlalu kering**) menggunakan
**Convolutional Neural Network** dengan pendekatan **transfer learning
MobileNetV3Large**.

Stack:
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion
- **Backend**: FastAPI (Python) + TensorFlow / Keras

## Struktur

```
.
├── frontend/    # Next.js app
└── backend/     # FastAPI service
```

Detail setiap bagian (kontrak API, urutan kelas, design system, dll)
ada di [`agent.md`](./agent.md).

## Menjalankan secara lokal

### 1. Backend

```bash
cd backend
python -m venv .venv
# Windows
.\.venv\Scripts\activate
# Linux / macOS
# source .venv/bin/activate

pip install -r requirements.txt
cp .env.example .env  # opsional

# Taruh model .keras di: backend/app/model/cocoa_dryness_mobilenetv3.keras
# (lihat backend/app/model/README.md)

uvicorn app.main:app --reload --port 8000
```

Endpoint:
- `GET  /`        — health info
- `GET  /health`  — status model
- `POST /predict` — unggah gambar (`multipart/form-data`, field `image`)

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local  # set NEXT_PUBLIC_API_URL

npm run dev
```

Buka <http://localhost:3000>.

## Catatan

- Model .keras **tidak disertakan** di repo. Taruh file hasil training
  Anda di `backend/app/model/cocoa_dryness_mobilenetv3.keras`.
- Form kontak (ContactSection) saat ini hanya UI — tidak mengirim
  pesan ke server. Hubungkan ke endpoint sendiri bila diperlukan.

"""
Entry point FastAPI untuk Cocoa Quality AI.

Fitur:
- CORS agar frontend Next.js dapat mengakses API.
- Lifespan event untuk memuat model sekali saat startup.
- Endpoint prediksi melalui router /predict.

Fokus penelitian:
Klasifikasi kualitas biji kakao berbasis citra ke dalam dua kelas,
Good Quality dan Poor Quality, menggunakan CNN berbasis transfer learning
dengan MobileNetV3-Large sebagai model utama.
"""

import logging
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import predict as predict_router
from app.services import model_loader

# Optional .env load — tidak error jika python-dotenv tidak terpasang.
try:
    from dotenv import load_dotenv

    load_dotenv()
except ImportError:
    pass

logger = logging.getLogger("cocoaquality")
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)

ALLOWED_ORIGINS = [
    origin.strip()
    for origin in os.environ.get("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
    if origin.strip()
]


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: model dimuat sekali untuk efisiensi inferensi.
    logger.info("Loading cocoa quality classification model...")
    model = model_loader.load_model()
    logger.info(
        "Model loaded: input=%s, output=%s",
        model.input_shape,
        model.output_shape,
    )
    yield


app = FastAPI(
    title="Cocoa Quality AI",
    description=(
        "API klasifikasi kualitas biji kakao berbasis citra ke dalam kelas "
        "Good Quality dan Poor Quality menggunakan MobileNetV3-Large."
    ),
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["health"])
def root():
    return {
        "service": "Cocoa Quality AI",
        "status": "ok",
        "task": "cocoa-bean-quality-classification",
        "classes": ["Good Quality", "Poor Quality"],
        "primary_model": "MobileNetV3-Large",
        "endpoints": ["/predict (POST)", "/health (GET)"],
    }


@app.get("/health", tags=["health"])
def health():
    try:
        model_loader.get_model()
        return {"status": "ok", "model_loaded": True}
    except Exception as exc:  
        return {
            "status": "degraded",
            "model_loaded": False,
            "detail": str(exc),
        }


app.include_router(predict_router.router)

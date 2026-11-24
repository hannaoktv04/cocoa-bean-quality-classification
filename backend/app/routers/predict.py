"""Endpoint POST /predict untuk inferensi gambar biji kakao."""

from fastapi import APIRouter, File, HTTPException, UploadFile, status

from app.schemas.prediction import ErrorResponse, PredictionResponse
from app.services.inference import predict_from_bytes

router = APIRouter(tags=["prediction"])

ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/jpg", "image/png"}
MAX_BYTES = 10 * 1024 * 1024  # 10 MB


@router.post(
    "/predict",
    response_model=PredictionResponse,
    responses={
        400: {"model": ErrorResponse},
        413: {"model": ErrorResponse},
        500: {"model": ErrorResponse},
    },
)
async def predict(image: UploadFile = File(...)) -> PredictionResponse:
    if image.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "error": {
                    "code": "INVALID_IMAGE",
                    "message": "File yang diunggah bukan format gambar yang didukung.",
                }
            },
        )

    file_bytes = await image.read()
    if len(file_bytes) > MAX_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail={
                "error": {
                    "code": "FILE_TOO_LARGE",
                    "message": "Ukuran gambar melebihi batas 10MB.",
                }
            },
        )

    try:
        result = predict_from_bytes(file_bytes)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "error": {
                    "code": "INVALID_IMAGE",
                    "message": str(e),
                }
            },
        )
    except Exception as e:  # noqa: BLE001
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "error": {
                    "code": "INFERENCE_FAILED",
                    "message": f"Gagal menjalankan inferensi: {e!s}",
                }
            },
        )

    return PredictionResponse(**result)

"""Pydantic response models untuk endpoint /predict Cocoa Quality AI."""

from typing import Dict, Literal

from pydantic import BaseModel, Field


ClassLabel = Literal[
    "Good Quality",
    "Poor Quality",
    "Unknown",
]


class PredictionItem(BaseModel):
    label: ClassLabel

    confidence: float = Field(
        ...,
        ge=0,
        le=1,
        description="Nilai confidence prediksi pada rentang 0 sampai 1.",
    )


class PredictionResponse(BaseModel):
    prediction: PredictionItem

    probabilities: Dict[str, float]

    explanation: str


class ErrorDetail(BaseModel):
    code: str
    message: str


class ErrorResponse(BaseModel):
    error: ErrorDetail
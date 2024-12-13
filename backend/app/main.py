# from fastapi import FastAPI, File, UploadFile
# from fastapi.responses import JSONResponse
# import numpy as np
# from tensorflow.keras.models import load_model
# import cv2
# from app.model.predictor import predict_outcome
# from typing import List
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from app.model.predictor import predict_outcome

# app = FastAPI()

# # CORS configuration
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  
#     allow_credentials=True,
#     allow_methods=["*"],  
#     allow_headers=["*"],  
# )

# Define input schema
# class InputData(BaseModel):
#     addition_time: float
#     substraction_time: float
#     division_time: float
#     multiplication_time: float
#     fraction_time: float
#     total_time: float
#     total_accuracy: float
#     addition_score: int
#     substraction_score: int
#     division_score: int
#     multiplication_score: int
#     fraction_score: int

# @app.get("/")
# def read_root():
#     return {"message": "Math Skill Predictor API"}

# @app.post("/predict/")
# def predict(input_data: InputData):
#     data = input_data.dict()
#     prediction = predict_outcome(data)
#     return {"prediction": prediction}


# Writing
# app/main.py
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.model.predictor import predict_outcome
from app.model.evaluate import evaluate_student_writing_skills
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict(images: List[UploadFile] = File(...)):
    logger.info(f"Received predict request with {len(images)} images")
    if not images:
        logger.error("No images uploaded")
        raise HTTPException(status_code=400, detail="No images uploaded")

    predictions = []
    total_score = 0

    try:
        for image in images:
            logger.info(f"Processing image: {image.filename}")
            if not image.filename:
                logger.warning("Skipping image with no filename")
                continue

            try:
                img_bytes = await image.read()
            except Exception as read_error:
                logger.error(f"Error reading image {image.filename}: {read_error}")
                continue

            if not img_bytes:
                logger.warning(f"Empty image bytes for {image.filename}")
                continue

            try:
                result = predict_outcome(img_bytes)
                predictions.append({
                    "file_name": image.filename,
                    "Predicted Class": result.get("predicted_class", "Unknown"),
                    "Status": 1 if result.get("status") == "Correct" else 0
                })
                total_score += 1 if result.get("status") == "Correct" else 0
            except Exception as predict_error:
                logger.error(f"Prediction error for {image.filename}: {predict_error}")
                continue

    except Exception as e:
        logger.error(f"Unexpected error processing images: {e}")
        raise HTTPException(status_code=400, detail=f"Error processing images: {str(e)}")

    total_images = len(images)
    score_percentage = (total_score / total_images) * 100 if total_images > 0 else 0

    return {
        "predictions": predictions,
        "total_score": total_score,
        "total_images": total_images,
        "score_percentage": score_percentage
    }

# Input model for final evaluation endpoint
class EvaluationInput(BaseModel):
    cnn_output_score: int
    vowel_symbol_score: int
    punctuation_score: int

@app.post("/final_evaluation")
def final_evaluation(data: EvaluationInput):
    result = evaluate_student_writing_skills(
        data.cnn_output_score,
        data.vowel_symbol_score,
        data.punctuation_score
    )
    return result

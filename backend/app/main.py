import numpy as np
from tensorflow.keras.models import load_model
import cv2
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse, RedirectResponse
from typing import List, Query
from app.utils import (
    hash_password, 
    verify_password, 
    create_verification_token, 
    verify_token, 
    send_verification_email, 
    create_access_token
)
from app.db import get_database
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
from app.model.evaluate import evaluate_student_writing_skills
import logging


# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection
db = get_database()
teachers_collection = db["teachers"]

# Models
class TeacherSignupModel(BaseModel):
    email: EmailStr
    password: str

class TeacherLoginModel(BaseModel):
    email: EmailStr
    password: str

@app.post("/signup/")
def signup(teacher: TeacherSignupModel):
    # Check if email already exists
    if teachers_collection.find_one({"email": teacher.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password
    hashed_password = hash_password(teacher.password)

    # Save the teacher in the database
    teachers_collection.insert_one({
        "email": teacher.email,
        "password": hashed_password,
        "is_verified": False
    })

    # Generate and send verification token
    token = create_verification_token(teacher.email)
    send_verification_email(teacher.email, token)

    return {"message": "Signup successful. Please verify your email. Please check your email"}

@app.get("/verify-email/")
def verify_email(token: str = Query(...)):
    email = verify_token(token)
    if email == "Expired":
        return RedirectResponse(url="http://localhost:5173/verify-result?status=expired")
    if email == "Invalid":
        return RedirectResponse(url="http://localhost:5173/verify-result?status=invalid")

    # Update the teacher's verification status
    result = teachers_collection.update_one({"email": email}, {"$set": {"is_verified": True}})
    if result.matched_count == 0:
        return RedirectResponse(url="http://localhost:5173/verify-result?status=notfound")

    return RedirectResponse(url="http://localhost:5173/login")

@app.post("/login/")
def login(teacher: TeacherLoginModel):
    # Check if the email exists
    teacher_data = teachers_collection.find_one({"email": teacher.email})
    if not teacher_data:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Verify the password
    if not verify_password(teacher.password, teacher_data["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Check if the email is verified
    if not teacher_data["is_verified"]:
        raise HTTPException(status_code=403, detail="Email not verified")

    # Generate a JWT token
    access_token = create_access_token({"sub": teacher.email})

    return {"access_token": access_token, "token_type": "bearer", "message": "Login successful"}

# @app.post("/login/")
# def login(teacher: TeacherLoginModel):
#     # Check if the email exists
#     teacher_data = teachers_collection.find_one({"email": teacher.email})
#     if not teacher_data:
#         raise HTTPException(status_code=401, detail="Invalid email or password")

#     # Verify the password
#     if not verify_password(teacher.password, teacher_data["password"]):
#         raise HTTPException(status_code=401, detail="Invalid email or password")

#     # Check if the email is verified
#     if not teacher_data["is_verified"]:
#         raise HTTPException(status_code=403, detail="Email not verified")

#     return {"message": "Login successful"}






# from fastapi import FastAPI, File, UploadFile
# from fastapi.responses import JSONResponse
# import numpy as np
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
@app.post("/predict_letters")
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

@app.post("/final_writing_evaluation")
def final_evaluation(data: EvaluationInput):
    result = evaluate_student_writing_skills(
        data.cnn_output_score,
        data.vowel_symbol_score,
        data.punctuation_score
    )
    return result


# 1) Pydantic model for the final report data
class ReportData(BaseModel):
    skill_level: str
    letter_formation_score: int
    vowel_symbol_score: int
    punctuation_score: int

@app.post("/save_report")
def save_report(report_data: ReportData):
    """
    Saves the final prediction and optional letter formation results to MongoDB.
    """
    db = get_database()

    # Explicitly compare db to None
    if db is None:
        raise HTTPException(status_code=500, detail="Database connection failed")

    collection = db["reports"]
    doc = report_data.dict()

    try:
        result = collection.insert_one(doc)
        return {"message": "Report saved successfully", "inserted_id": str(result.inserted_id)}
    except Exception as e:
        logger.error(f"Error saving report to MongoDB: {e}")
        raise HTTPException(status_code=500, detail="Failed to save report")

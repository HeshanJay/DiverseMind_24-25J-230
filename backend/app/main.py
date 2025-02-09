import numpy as np
from tensorflow.keras.models import load_model
import cv2
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from typing import List
from fastapi import HTTPException, Query
from app.utils import hash_password, verify_password, create_verification_token, verify_token, send_verification_email, create_access_token
from app.db import get_database
from pydantic import BaseModel, EmailStr
from fastapi import FastAPI, HTTPException, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from app.model.predictor import predict_outcome_writing
from app.model.evaluate import evaluate_student_writing_skills
import logging
from app.model.predictor import predict_math_outcome
from app.model.predictor import predict_memory_outcome

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

from fastapi.responses import RedirectResponse, JSONResponse
from pydantic import BaseModel, EmailStr, Field
from app.utils import (
    hash_password,
    verify_password,
    create_verification_token,
    verify_token,
    send_verification_email,
    create_access_token,
    SECRET_KEY,
    ALGORITHM
)
from app.db import get_database
from typing import List
import numpy as np
import string
import random
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

# Initialize FastAPI app
app = FastAPI()

# Add CORS Middlewarre
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection
# db = get_database()
# teachers_collection = db["teachers"]
# students_collection = db["students"]

# OAuth2 scheme for protected routes
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login/")

# Utility Function to Generate Unique Code (teacher s uniques code)
def generate_unique_code(length=8):
    """Generates a unique alphanumeric code."""
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

# get current teacher from token
def get_current_teacher(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    teacher = teachers_collection.find_one({"email": email})
    if teacher is None:
        raise credentials_exception
    return teacher

# Models
class TeacherSignupModel(BaseModel):
    email: EmailStr
    password: str

class TeacherLoginModel(BaseModel):
    email: EmailStr
    password: str

class InputData(BaseModel):
    addition_time: float
    substraction_time: float
    division_time: float
    multiplication_time: float
    fraction_time: float
    total_time: float
    total_accuracy: float
    addition_score: int
    substraction_score: int
    division_score: int
    multiplication_score: int
    fraction_score: int

class WorkingMemoryInput(BaseModel):
    Language_vocab: float
    Memory: float
    Speed: float
    Visual_discrimination: float
    Audio_Discrimination: float

class TeacherUpdateModel(BaseModel):
    pass

class StudentEnrollmentModel(BaseModel):
    teacher_code: str = Field(..., description="Unique code of the teacher")
    student_name: str = Field(..., description="Name of the student")

class ResetPasswordModel(BaseModel):
    email: EmailStr
    old_password: str
    new_password: str

# Teacher Management Routes
@app.post("/signup/")
def signup(teacher: TeacherSignupModel):
    if teachers_collection.find_one({"email": teacher.email}):
        raise HTTPException(status_code=400, detail="මෙම විද්‍යුත් තැපෑල බාවිතා කර ඇත")

    hashed_password = hash_password(teacher.password)
    teachers_collection.insert_one({
        "email": teacher.email,
        "password": hashed_password,
        "is_verified": False
    })

    token = create_verification_token(teacher.email)
    send_verification_email(teacher.email, token)

    return {"message": "ලියාපදිංචි වීම සාර්ථක කර ගැනීමට කරුණාකර ඔබගේ විද්‍යුත් තැපෑල තහවුරු කරන්න. කරුණාකර ඔබගේ විද්‍යුත් තැපෑල පරීක්ෂා කරන්න"}

# Email verifycatiom Route
@app.get("/verify-email/")
def verify_email(token: str = Query(...)):
    email = verify_token(token)
    if email == "Expired":
        return RedirectResponse(url="http://localhost:5173/verify-result?status=expired")
    if email == "Invalid":
        return RedirectResponse(url="http://localhost:5173/verify-result?status=invalid")

    result = teachers_collection.update_one({"email": email}, {"$set": {"is_verified": True}})
    if result.matched_count == 0:
        return RedirectResponse(url="http://localhost:5173/verify-result?status=notfound")

    return RedirectResponse(url="http://localhost:5173/login")

# route for login process
@app.post("/login/")
def login(teacher: TeacherLoginModel):
    teacher_data = teachers_collection.find_one({"email": teacher.email})
    if not teacher_data:
        raise HTTPException(status_code=401, detail="වලංගු නොවන ඊමේල් හෝ මුරපදය")

    if not verify_password(teacher.password, teacher_data["password"]):
        raise HTTPException(status_code=401, detail="වලංගු නොවන ඊමේල් හෝ මුරපදය")

    if not teacher_data["is_verified"]:
        raise HTTPException(status_code=403, detail="Email not verified")

    access_token = create_access_token({"sub": teacher.email})
    return {"access_token": access_token, "token_type": "bearer", "message": "ඇතුලත් වීම සාර්ථකයි "}

# Generate unique teacher Code route
@app.post("/generate-code/")
def generate_code(current_teacher: dict = Depends(get_current_teacher)):
    if "unique_code" in current_teacher:
        return {"unique_code": current_teacher["unique_code"]}
    
    unique_code = generate_unique_code()
    
    while teachers_collection.find_one({"unique_code": unique_code}):
        unique_code = generate_unique_code()

    teachers_collection.update_one(
        {"_id": current_teacher["_id"]},
        {"$set": {"unique_code": unique_code}}
    )
    return {"unique_code": unique_code}

# Reset unique teacher code route
@app.post("/reset-code/")
def reset_code(current_teacher: dict = Depends(get_current_teacher)):
    unique_code = generate_unique_code()

    while teachers_collection.find_one({"unique_code": unique_code}):
        unique_code = generate_unique_code()
    
    teachers_collection.update_one(
        {"_id": current_teacher["_id"]},
        {"$set": {"unique_code": unique_code}}
    )
    return {"unique_code": unique_code}

# Add Students under a teachers route
@app.post("/add-student/")
def add_student(student: StudentEnrollmentModel):
    teacher = teachers_collection.find_one({"unique_code": student.teacher_code})
    if not teacher:
        raise HTTPException(status_code=404, detail="ගුරු කේතය හමු නොවීය")
    
    student_doc = {
        "name": student.student_name,
        "teacher_id": str(teacher["_id"]),
        "activities": []
    }
    students_collection.insert_one(student_doc)
    return {"message": "ඇතුලත් කිරීම සාර්ථකයි "}

# dashboard fetch route 
@app.get("/dashboard/")
def dashboard(current_teacher: dict = Depends(get_current_teacher)):
    students = list(students_collection.find({"teacher_id": str(current_teacher["_id"])}))

    for student in students:
        student["_id"] = str(student["_id"])
        student["teacher_id"] = str(student["teacher_id"])
    return {"students": students, "teacher_email": current_teacher["email"], "unique_code": current_teacher.get("unique_code", "")}

# Resett Password Route
@app.post("/reset-password/")
def reset_password(reset_data: ResetPasswordModel, current_teacher: dict = Depends(get_current_teacher)):
    # Ensure the email matches the current teacher
    if reset_data.email != current_teacher["email"]:
        raise HTTPException(status_code=403, detail="වෙනත් පරිශීලකයෙකු සඳහා මුරපදය නැවත සැකසිය නොහැක")
    
    if not verify_password(reset_data.old_password, current_teacher["password"]):
        raise HTTPException(status_code=401, detail="පැරණි මුරපදය වැරදියි")
    
    hashed_password = hash_password(reset_data.new_password)
    
    teachers_collection.update_one(
        {"_id": current_teacher["_id"]},
        {"$set": {"password": hashed_password}}
    )
    
    return {"message": "මුරපදය යළි පිහිටුවීම සාර්ථකයි"}

# Math Skill Prediction Routes
@app.get("/")
def read_root():
    return {"message": "Math Skill Predictor API"}

@app.post("/math-prediction/")
def predict(input_data: InputData):
    data = input_data.dict()
    math_prediction = predict_outcome(data)
    return {"prediction": math_prediction}

# Working Memory
@app.post("/working_memory_prediction/")
def working_memory_prediction(input_data: WorkingMemoryInput):
    """
    Predicts working memory assessment.
    """
    try:
        logging.info(f"Received request data: {input_data.dict()}")
        data = input_data.dict()
        prediction = predict_outcome(data)
        return {"prediction": prediction}
    except Exception as e:
        logging.error(f"Error during prediction: {e}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")

# Writing
@app.post("/predict_letters")
async def predict_letters(images: List[UploadFile] = File(...)):
    logger.info(f"Received request with {len(images)} images")
    if not images:
        logger.error("No images uploaded")
        raise HTTPException(status_code=400, detail="No images uploaded")

    predictions = []
    total_score = 0
    total_images = len(images)

    for image in images:
        try:
            img_bytes = await image.read()
            if not img_bytes:
                logger.warning(f"Empty image bytes for {image.filename}")
                continue

            result = predict_outcome_writing(img_bytes)

            # Check for errors
            if "error" in result:
                logger.error(f"Prediction error: {result['error']}")
                continue

            # If no error, update predictions and score
            predicted_class = result.get("predicted_class", "Unknown")
            status_str = result.get("status")  # "Correct" or "Incorrect"
            status_score = 1 if status_str == "Correct" else 0

            predictions.append({
                "file_name": image.filename,
                "Predicted Class": predicted_class,
                "Status": status_score
            })
            total_score += status_score

        except Exception as e:
            logger.error(f"Error processing {image.filename}: {e}")
            continue

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

@app.post("/save_writing_results")
def save_report(report_data: ReportData):
    """
    Saves the final prediction and optional letter formation results to MongoDB.
    """
    db = get_database()

    # Explicitly compare db to None
    if db is None:
        raise HTTPException(status_code=500, detail="Database connection failed")

    collection = db["writing_results"]
    doc = report_data.dict()

    try:
        result = collection.insert_one(doc)
        return {"message": "Report saved successfully", "inserted_id": str(result.inserted_id)}
    except Exception as e:
        logger.error(f"Error saving report to MongoDB: {e}")
        raise HTTPException(status_code=500, detail="Failed to save report")
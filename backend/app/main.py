from fastapi import FastAPI, HTTPException, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi.security import OAuth2PasswordBearer
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
from app.model.predictor import predict_outcome
from typing import List
import random
import string
from jose import jwt, JWTError
import logging


app = FastAPI()

logging.basicConfig(level=logging.INFO)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


db = get_database()
teachers_collection = db["teachers"]
students_collection = db["students"]

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login/")


def generate_unique_code(length=8):
    """Generates a unique alphanumeric code."""
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

def get_current_teacher(token: str = Depends(oauth2_scheme)):
    """Retrieves the current logged-in teacher from JWT token."""
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


class TeacherSignupModel(BaseModel):
    email: EmailStr
    password: str

class TeacherLoginModel(BaseModel):
    email: EmailStr
    password: str

class StudentEnrollmentModel(BaseModel):
    teacher_code: str = Field(..., description="Unique code of the teacher")
    student_name: str = Field(..., description="Name of the student")

class ResetPasswordModel(BaseModel):
    email: EmailStr
    old_password: str
    new_password: str

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

@app.post("/signup/")
def signup(teacher: TeacherSignupModel):
    """Handles teacher signup with email verification."""
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

    return {"message": "ලියාපදිංචි වීම සාර්ථකයි. කරුණාකර ඔබගේ විද්‍යුත් තැපෑල තහවුරු කරන්න."}

@app.get("/verify-email/")
def verify_email(token: str = Query(...)):
    """Verifies teacher's email using token."""
    email = verify_token(token)
    if email == "Expired":
        return RedirectResponse(url="http://localhost:5173/verify-result?status=expired")
    if email == "Invalid":
        return RedirectResponse(url="http://localhost:5173/verify-result?status=invalid")

    result = teachers_collection.update_one({"email": email}, {"$set": {"is_verified": True}})
    if result.matched_count == 0:
        return RedirectResponse(url="http://localhost:5173/verify-result?status=notfound")

    return RedirectResponse(url="http://localhost:5173/login")

@app.post("/login/")
def login(teacher: TeacherLoginModel):
    """Handles teacher login and returns JWT token."""
    teacher_data = teachers_collection.find_one({"email": teacher.email})
    if not teacher_data:
        raise HTTPException(status_code=401, detail="වලංගු නොවන ඊමේල් හෝ මුරපදය")

    if not verify_password(teacher.password, teacher_data["password"]):
        raise HTTPException(status_code=401, detail="වලංගු නොවන ඊමේල් හෝ මුරපදය")

    if not teacher_data["is_verified"]:
        raise HTTPException(status_code=403, detail="Email not verified")

    access_token = create_access_token({"sub": teacher.email})
    return {"access_token": access_token, "token_type": "bearer", "message": "ඇතුලත් වීම සාර්ථකයි "}

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

@app.post("/math-prediction/")
def predict_math(input_data: InputData):
    """Handles math skill predictions using ML models."""
    try:
        data = input_data.dict()
        math_prediction = predict_outcome(data)
        return {"prediction": math_prediction}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

@app.get("/")
def read_root():
    return {"message": "Math Skill Predictor API"}

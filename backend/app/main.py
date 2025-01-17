from fastapi import FastAPI,HTTPException, Query
from app.utils import hash_password, verify_password, create_verification_token, verify_token, send_verification_email, create_access_token
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from app.model.predictor import predict_outcome  
from fastapi.responses import RedirectResponse
from app.db import get_database

# Initialize FastAPI app
app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
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


class InputData(BaseModel):
    Language_vocab: float
    Memory: float
    Speed: float
    Visual_discrimination: float
    Audio_Discrimination: float

@app.post("/prediction/")
def predict(input_data: InputData):
    """
    API endpoint for making predictions.

    Args:
        input_data (InputData): Input features for the model.

    Returns:
        dict: Prediction result.
    """
    try:
        data = input_data.dict()
        prediction = predict_outcome(data) 
        return {"prediction": prediction}
    except Exception as e:
        return {"error": str(e)}
    
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
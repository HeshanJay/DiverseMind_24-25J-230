from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, EmailStr
from app.utils import (
    hash_password,
    verify_password,
    create_verification_token,
    verify_token,
    send_verification_email,
    create_access_token,
)
from app.model.predictor import predict_outcome
from app.db import get_database

# Initialize FastAPI app
app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update for production to restrict origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Connection
db = get_database()
teachers_collection = db["teachers"]
results_collection = db["Memory_prediction_results"]

# Models
class TeacherSignupModel(BaseModel):
    email: EmailStr
    password: str


class TeacherLoginModel(BaseModel):
    email: EmailStr
    password: str


class InputData(BaseModel):
    Language_vocab: float
    Memory: float
    Speed: float
    Visual_discrimination: float
    Audio_Discrimination: float


class PredictionResult(BaseModel):
    language_vocab: float
    memory: float
    speed: float
    visual_discrimination: float
    audio_discrimination: float
    prediction: str
    questions: list[dict]  # Example: [{"question": "Q1", "correct": true}, ...]


# Endpoints
@app.post("/signup/")
def signup(teacher: TeacherSignupModel):
    """
    Endpoint to handle teacher signup.
    """
    if teachers_collection.find_one({"email": teacher.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(teacher.password)
    teachers_collection.insert_one({
        "email": teacher.email,
        "password": hashed_password,
        "is_verified": False,
    })

    token = create_verification_token(teacher.email)
    send_verification_email(teacher.email, token)

    return {"message": "Signup successful. Please verify your email."}


@app.get("/verify-email/")
def verify_email(token: str = Query(...)):
    """
    Endpoint to verify email using a token.
    """
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
    """
    Endpoint for teacher login.
    """
    teacher_data = teachers_collection.find_one({"email": teacher.email})
    if not teacher_data:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not verify_password(teacher.password, teacher_data["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not teacher_data["is_verified"]:
        raise HTTPException(status_code=403, detail="Email not verified")

    access_token = create_access_token({"sub": teacher.email})
    return {"access_token": access_token, "token_type": "bearer", "message": "Login successful"}


@app.post("/prediction/")
def predict(input_data: InputData):
    """
    Endpoint to predict if the child is a slow learner.
    """
    try:
        data = input_data.dict()
        prediction = predict_outcome(data)
        return {"prediction": prediction}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")


@app.post("/save-results/")
def save_results(result: PredictionResult):
    """
    Endpoint to save prediction results and question scores to the database.
    """
    try:
        results_collection.insert_one(result.dict())
        return {"message": "Results saved successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")

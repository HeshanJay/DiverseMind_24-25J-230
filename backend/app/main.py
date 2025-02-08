from fastapi import FastAPI, HTTPException, Query, Depends
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
from jose import jwt, JWTError
import logging
import threading
import cv2
import mediapipe as mp
from math import sqrt
from tensorflow.keras.models import model_from_json
from fastapi import FastAPI, HTTPException, Query
from app.utils import hash_password, verify_password, create_verification_token, verify_token, send_verification_email, create_access_token, blink_ratio, landmarks_detection, calculate_attention_score
from app.model.predictor import load_emotion_model, load_face_cascade, load_face_mesh
from fastapi import FastAPI, HTTPException, Query, Depends
from tensorflow.keras.models import load_model
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from typing import List
import numpy as np
import string
import random

# Initialize FastAPI app
from fastapi.responses import RedirectResponse
from app.model.predictor import predict_outcome_writing
from app.model.evaluate import evaluate_student_writing_skills
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app - writing
from app.model.predictor import predict_outcome_writing
from app.model.evaluate import evaluate_student_writing_skills


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

# Working memory
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

# Maths
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

@app.post("/math-prediction/")
def predict(input_data: InputData):
    data = input_data.dict()
    math_prediction = predict_outcome(data)
    return {"prediction": math_prediction}

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

# Attention
class AttentionSpanResult(BaseModel):
    average_score: float
    status: str
    total_time: float

# Real-Time Attention Detection Globals
attention_results = {
    "average_score": None,
    "status": None,
    "total_time": None,
}
stop_detection = threading.Event()
camera_thread = None

# Load Models
emotion_model = load_emotion_model('./app/model/emotion_model.json', './app/model/emotion_model.weights.h5')
face_cascade = load_face_cascade('./app/model/haarcascade_frontalface_default.xml')
face_mesh = load_face_mesh()

# Define eye indices for Mediapipe
LEFT_EYE = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398]
RIGHT_EYE = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246]

emotions_map = {
    0: "Angry", 1: "Disgusted", 2: "Fearful",
    3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"
}

# Real-Time Attention Detection Function
def attention_detection_thread():
    global attention_results, stop_detection

    print("Starting real-time attention detection...")
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        print("Error: Unable to access the webcam.")
        attention_results = {
            "average_score": None,
            "status": "Error: Camera not accessible",
            "total_time": 0,
        }
        return

    total_scores = []
    total_blinks = 0
    frame_count = 0
    frame_rate = 30.0

    try:
        while not stop_detection.is_set():
            ret, frame = cap.read()
            if not ret:
                print("Error: Unable to read a frame.")
                break

            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = face_mesh.process(rgb_frame)
            gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

            if results.multi_face_landmarks:
                landmarks = landmarks_detection(frame, results)
                if len(landmarks) >= max(max(LEFT_EYE), max(RIGHT_EYE)):
                    blink_ratio_value = blink_ratio(landmarks, RIGHT_EYE, LEFT_EYE)
                    if blink_ratio_value > 3.0:
                        total_blinks += 1

                faces = face_cascade.detectMultiScale(gray_frame, 1.3, 5)
                emotion_label = "Neutral"
                for (x, y, w, h) in faces:
                    roi_gray = gray_frame[y:y + h, x:x + w]
                    roi_gray = cv2.resize(roi_gray, (48, 48))
                    roi_gray = np.expand_dims(np.expand_dims(roi_gray, -1), 0)
                    emotion_prediction = emotion_model.predict(roi_gray)
                    emotion_index = np.argmax(emotion_prediction)
                    emotion_label = emotions_map.get(emotion_index, "Neutral")

                # Head pose estimation placeholders
                yaw, pitch, roll = 0, 0, 0
                gaze_ratio = 0.5  # Placeholder for actual gaze ratio calculation
                blink_rate = (total_blinks / frame_count * frame_rate * 60) if frame_count > 0 else 0

                attention_score = calculate_attention_score(
                    emotion_label, gaze_ratio, blink_rate, yaw, pitch, roll
                )
                total_scores.append(attention_score)
                frame_count += 1

            cv2.imshow("Webcam Feed", frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    finally:
        cap.release()
        cv2.destroyAllWindows()
        if total_scores:
            average_score = np.mean(total_scores)
            attention_results = {
                "average_score": round(average_score, 2),
                "status": "Focused" if average_score > 0 else "Not Focused",
                "total_time": round(frame_count / frame_rate, 2),
            }
        else:
            attention_results = {
                "average_score": 0,
                "status": "No Data",
                "total_time": 0,
            }
        print("Final Attention Results:", attention_results)

@app.get("/attention/start")
def start_attention_detection():
    global camera_thread, stop_detection
    stop_detection.clear()
    camera_thread = threading.Thread(target=attention_detection_thread)
    camera_thread.start()
    return {"message": "Real-time attention detection started."}

@app.get("/attention/stop")
def stop_attention_detection():
    global stop_detection, camera_thread
    if camera_thread and camera_thread.is_alive():
        stop_detection.set()
        camera_thread.join()
        stop_detection.clear()
        return {"message": "Attention detection stopped."}
    return {"message": "No active attention detection to stop."}

@app.get("/attention/result")
def get_attention_result():
    return attention_results

@app.post("/save_attention_span")
def save_attention_span(result: AttentionSpanResult):
    if db is None:
        raise HTTPException(status_code=500, detail="Database connection failed")
    try:
        result_data = result.dict()
        attention_collection.insert_one(result_data)
        return {"message": "Attention span result saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save attention span result: {e}")

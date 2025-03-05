import numpy as np
from tensorflow.keras.models import load_model
import cv2
from fastapi import FastAPI, File, UploadFile, HTTPException, Depends, Query
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from typing import List
import threading
import logging
import random
import string
from math import sqrt
from jose import jwt, JWTError
import app.utils as utils




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
from app.model.predictor import (
    load_emotion_model,
    load_face_cascade,
    load_face_mesh
)
from app.model.predictor import predict_outcome_writing
from app.model.evaluate import evaluate_student_writing_skills
from app.model.predictor import predict_math_outcome
from app.model.predictor import predict_memory_outcome

#################################################
# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
from typing import List
import numpy as np
import string
import random
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

# Initialize FastAPI app
app = FastAPI()

# Add CORS Middleware
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
students_collection = db["students"]
attention_collection = db["attention_results"]

# OAuth2 scheme for protected routes
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login/")

#################################################
# Utility Function to Generate Unique Code (teacher's unique code)
def generate_unique_code(length=8):
    """Generates a unique alphanumeric code."""
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

#################################################
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

#################################################
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

class AttentionSpanResult(BaseModel):
    average_score: float
    status: str
    total_time: float

#################################################
# Teacher Management Routes
@app.post("/signup/")
def signup(teacher: TeacherSignupModel):
    if teachers_collection.find_one({"email": teacher.email}):
        raise HTTPException(status_code=400, detail="මෙම විද්‍යුත් තැපෑල භාවිතා කර ඇත")

    hashed_password = hash_password(teacher.password)
    teachers_collection.insert_one({
        "email": teacher.email,
        "password": hashed_password,
        "is_verified": False
    })

    token = create_verification_token(teacher.email)
    send_verification_email(teacher.email, token)

    return {"message": "ලියාපදිංචි වීම සාර්ථක කර ගැනීමට කරුණාකර ඔබගේ විද්‍යුත් තැපෑල තහවුරු කරන්න. කරුණාකර ඔබගේ විද්‍යුත් තැපෑල පරීක්ෂා කරන්න"}

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

@app.get("/dashboard/")
def dashboard(current_teacher: dict = Depends(get_current_teacher)):
    students = list(students_collection.find({"teacher_id": str(current_teacher["_id"])}))

    for student in students:
        student["_id"] = str(student["_id"])
        student["teacher_id"] = str(student["teacher_id"])
    return {"students": students, "teacher_email": current_teacher["email"], "unique_code": current_teacher.get("unique_code", "")}

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

#################################################
# Math Skill Prediction Routes
@app.get("/")
def read_root():
    return {"message": "Math Skill Predictor API"}

@app.post("/math-prediction/")
def predict(input_data: InputData):
    data = input_data.dict()
    math_prediction = predict_math_outcome(data)
    return {"prediction": math_prediction}

@app.post("/working_memory_prediction/")
def working_memory_prediction(input_data: WorkingMemoryInput):
    try:
        logging.info(f"Received request data: {input_data.dict()}")
        data = input_data.dict()
        prediction = predict_memory_outcome(data)
        return {"prediction": prediction}
    except Exception as e:
        logging.error(f"Error during prediction: {e}")
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")

#################################################
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
    db = get_database()
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

#################################################
# Attention Detection
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

# Define Mediapipe indices for eyes
LEFT_EYE = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398]
RIGHT_EYE = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246]

emotions_map = {
    0: "Angry", 1: "Disgusted", 2: "Fearful",
    3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"
}


def attention_detection_thread():
    global stop_detection
    logger.info("Starting real-time attention detection...")

    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        logger.error("Error: Unable to access the webcam.")
        attention_results.update({
            "average_score": None,
            "status": "Error: Camera not accessible",
            "total_time": 0,
        })
        return

    total_scores = []
    total_blinks = 0
    frame_count = 0
    frame_rate = 30.0  # assuming 30 fps
    closed_frames = 0  # count how many consecutive frames the eyes are closed
    blink_threshold_frames = 3  # only count as a blink if closed for 3+ frames

    start_time = cv2.getTickCount()  # start time measurement

    try:
        while not stop_detection.is_set():
            ret, frame = cap.read()
            if not ret:
                logger.error("Error: Unable to read a frame.")
                break

            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            results = face_mesh.process(rgb_frame)

            if results.multi_face_landmarks:
                landmarks = utils.landmarks_detection(frame, results)
                if landmarks and len(landmarks) > max(max(LEFT_EYE), max(RIGHT_EYE)):
                    current_blink_ratio = utils.blink_ratio(landmarks, RIGHT_EYE, LEFT_EYE)
                    
                    # Use a counter to register a blink only after eyes have been closed for enough frames
                    if current_blink_ratio > 3.0:
                        closed_frames += 1
                    else:
                        if closed_frames >= blink_threshold_frames:
                            total_blinks += 1
                        closed_frames = 0

                    # Updated gaze ratio calculation based on pupil positions
                    gaze_ratio = utils.compute_gaze_ratio(landmarks, LEFT_EYE, RIGHT_EYE)
                    yaw, pitch, roll = utils.get_head_pose(landmarks, frame)

                    faces = face_cascade.detectMultiScale(gray_frame, 1.3, 5)
                    if len(faces) > 0:
                        (x, y, w, h) = faces[0]
                        face_roi = gray_frame[y:y+h, x:x+w]
                        face_roi = cv2.resize(face_roi, (48,48))
                        face_roi = face_roi.astype("float") / 255.0
                        face_roi = face_roi[None, ..., None]
                        emotion_prediction = emotion_model.predict(face_roi)
                        emotion_label = emotions_map[np.argmax(emotion_prediction)]
                    else:
                        emotion_label = "Neutral"

                    frame_count += 1

                    # Calculate elapsed time in seconds using frame_count and frame_rate.
                    time_in_seconds = frame_count / frame_rate
                    if time_in_seconds > 0:
                        blink_rate = total_blinks / time_in_seconds  # blinks per second
                        blink_rate = blink_rate * 60  # convert to blinks per minute
                    else:
                        blink_rate = 0

                    attention_score = utils.calculate_attention_score(
                        emotion_label, gaze_ratio, blink_rate, yaw, pitch, roll
                    )
                    total_scores.append(attention_score)

            cv2.imshow("Webcam Feed", frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    finally:
        cap.release()
        cv2.destroyAllWindows()
        if total_scores:
            average_score = np.mean(total_scores)
            # Adjust thresholds if needed; for example, if average_score >= 4 can be "Focused"
            if average_score >= 5:
                status = "Focused"
            elif average_score >= 3.8:
                status = "Moderately Focused"
            else:
                status = "Not Focused"
            attention_results.update({
                "average_score": round(average_score, 2),
                "status": status,
                "total_time": round(frame_count / frame_rate, 2),
            })
        else:
            attention_results.update({
                "average_score": 0,
                "status": "No Data",
                "total_time": 0,
            })
        logger.info("Final Attention Results: %s", attention_results)


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
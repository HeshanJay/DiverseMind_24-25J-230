# import numpy as np
# from math import sqrt
# import cv2
# import mediapipe as mp
# import threading
# from tensorflow.keras.models import model_from_json
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import RedirectResponse
# from fastapi import FastAPI, HTTPException, Query
# from app.utils import hash_password, verify_password, create_verification_token, verify_token, send_verification_email, create_access_token
# from app.db import get_database
# from pydantic import BaseModel, EmailStr

# from app.utils import blink_ratio, landmarks_detection, calculate_attention_score
# from app.model.predictor import load_emotion_model, load_face_cascade, load_face_mesh



# # FastAPI Application Setup
# app = FastAPI()

# # Add CORS Middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"], 
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # MongoDB Connection
# db = get_database()
# teachers_collection = db["teachers"]

# # Models
# class TeacherSignupModel(BaseModel):
#     email: EmailStr
#     password: str

# class TeacherLoginModel(BaseModel):
#     email: EmailStr
#     password: str

# @app.post("/signup/")
# def signup(teacher: TeacherSignupModel):
#     # Check if email already exists
#     if teachers_collection.find_one({"email": teacher.email}):
#         raise HTTPException(status_code=400, detail="Email already registered")

#     # Hash the password
#     hashed_password = hash_password(teacher.password)

#     # Save the teacher in the database
#     teachers_collection.insert_one({
#         "email": teacher.email,
#         "password": hashed_password,
#         "is_verified": False
#     })

#     # Generate and send verification token
#     token = create_verification_token(teacher.email)
#     send_verification_email(teacher.email, token)

#     return {"message": "Signup successful. Please verify your email. Please check your email"}

# @app.get("/verify-email/")
# def verify_email(token: str = Query(...)):
#     email = verify_token(token)
#     if email == "Expired":
#         return RedirectResponse(url="http://localhost:5173/verify-result?status=expired")
#     if email == "Invalid":
#         return RedirectResponse(url="http://localhost:5173/verify-result?status=invalid")

#     # Update the teacher's verification status
#     result = teachers_collection.update_one({"email": email}, {"$set": {"is_verified": True}})
#     if result.matched_count == 0:
#         return RedirectResponse(url="http://localhost:5173/verify-result?status=notfound")

#     return RedirectResponse(url="http://localhost:5173/login")

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

#     # Generate a JWT token
#     access_token = create_access_token({"sub": teacher.email})

#     return {"access_token": access_token, "token_type": "bearer", "message": "Login successful"}

# # @app.post("/login/")
# # def login(teacher: TeacherLoginModel):
# #     # Check if the email exists
# #     teacher_data = teachers_collection.find_one({"email": teacher.email})
# #     if not teacher_data:
# #         raise HTTPException(status_code=401, detail="Invalid email or password")

# #     # Verify the password
# #     if not verify_password(teacher.password, teacher_data["password"]):
# #         raise HTTPException(status_code=401, detail="Invalid email or password")

# #     # Check if the email is verified
# #     if not teacher_data["is_verified"]:
# #         raise HTTPException(status_code=403, detail="Email not verified")

# #     return {"message": "Login successful"}



# # from fastapi import FastAPI, File, UploadFile
# # from fastapi.responses import JSONResponse
# # import numpy as np
# # from app.model.predictor import predict_outcome
# # from typing import List
# # from fastapi.middleware.cors import CORSMiddleware
# # from pydantic import BaseModel
# # from app.model.predictor import predict_outcome

# # app = FastAPI()

# # # CORS configuration
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["*"],  
# #     allow_credentials=True,
# #     allow_methods=["*"],  
# #     allow_headers=["*"],  
# # )

# # class InputData(BaseModel):
# #     addition_time: float
# #     substraction_time: float
# #     division_time: float
# #     multiplication_time: float
# #     fraction_time: float
# #     total_time: float
# #     total_accuracy: float
# #     addition_score: int
# #     substraction_score: int
# #     division_score: int
# #     multiplication_score: int
# #     fraction_score: int

# # @app.get("/")
# # def read_root():
# #     return {"message": "Math Skill Predictor API"}

# # @app.post("/predict/")
# # def predict(input_data: InputData):
# #     data = input_data.dict()
# #     prediction = predict_outcome(data)
# #     return {"prediction": prediction}
# # Load models and detection tools


# #attention span detection

# # Shared storage for attention results
# attention_results = {
#     "average_score": None,
#     "status": None,
#     "total_time": None,
# }

# emotion_model = load_emotion_model('./app/model/emotion_model.json', './app/model/emotion_model.weights.h5')
# face_cascade = load_face_cascade('./app/model/haarcascade_frontalface_default.xml')
# face_mesh = load_face_mesh()

# # Define eye indices for Mediapipe
# LEFT_EYE = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398]
# RIGHT_EYE = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246]

# emotions_map = {
#     0: "Angry", 1: "Disgusted", 2: "Fearful",
#     3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"
# }

# # Real-Time Attention Detection Function
# def attention_detection_thread():
#     global attention_results

#     print("Starting real-time attention detection...")
#     cap = cv2.VideoCapture(0)

#     if not cap.isOpened():
#         print("Error: Unable to access the webcam.")
#         attention_results = {
#             "average_score": None,
#             "status": "Error: Camera not accessible",
#             "total_time": 0,
#         }
#         return

#     total_scores = []
#     total_blinks = 0
#     frame_count = 0
#     frame_rate = 30.0

#     try:
#         while True:
#             ret, frame = cap.read()
#             if not ret:
#                 print("Error: Unable to read a frame.")
#                 break

#             rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#             results = face_mesh.process(rgb_frame)
#             gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

#             if results.multi_face_landmarks:
#                 landmarks = landmarks_detection(frame, results)
#                 if len(landmarks) >= max(max(LEFT_EYE), max(RIGHT_EYE)):
#                     blink_ratio_value = blink_ratio(landmarks, RIGHT_EYE, LEFT_EYE)
#                     if blink_ratio_value > 3.0:
#                         total_blinks += 1

#                 faces = face_cascade.detectMultiScale(gray_frame, 1.3, 5)
#                 emotion_label = "Neutral"
#                 for (x, y, w, h) in faces:
#                     roi_gray = gray_frame[y:y + h, x:x + w]
#                     roi_gray = cv2.resize(roi_gray, (48, 48))
#                     roi_gray = np.expand_dims(np.expand_dims(roi_gray, -1), 0)
#                     emotion_prediction = emotion_model.predict(roi_gray)
#                     emotion_index = np.argmax(emotion_prediction)
#                     emotion_label = emotions_map.get(emotion_index, "Neutral")

#                 # Head pose estimation placeholders
#                 yaw, pitch, roll = 0, 0, 0
#                 gaze_ratio = 0.5  # Placeholder for actual gaze ratio calculation
#                 blink_rate = (total_blinks / frame_count * frame_rate * 60) if frame_count > 0 else 0

#                 attention_score = calculate_attention_score(
#                     emotion_label, gaze_ratio, blink_rate, yaw, pitch, roll
#                 )
#                 total_scores.append(attention_score)
#                 frame_count += 1

#             cv2.imshow("Webcam Feed", frame)
#             if cv2.waitKey(1) & 0xFF == ord('q'):
#                 break

#     finally:
#         cap.release()
#         cv2.destroyAllWindows()
#         if total_scores:
#             average_score = np.mean(total_scores)
#             attention_results = {
#                 "average_score": round(average_score, 2),
#                 "status": "Focused" if average_score > 0 else "Not Focused",
#                 "total_time": round(frame_count / frame_rate, 2),
#             }
#         else:
#             attention_results = {
#                 "average_score": 0,
#                 "status": "No Data",
#                 "total_time": 0,
#             }
#         print("Final Attention Results:", attention_results)

# @app.get("/attention/start")
# def start_attention_detection():
#     thread = threading.Thread(target=attention_detection_thread)
#     thread.start()
#     return {"message": "Real-time attention detection started."}

# @app.get("/attention/result")
# def get_attention_result():
#     return attention_results

import threading
import numpy as np
import cv2
import mediapipe as mp
from math import sqrt
from tensorflow.keras.models import model_from_json
# from fastapi import FastAPI, HTTPException, Query
# from app.utils import hash_password, verify_password, create_verification_token, verify_token, send_verification_email, create_access_token
# from app.db import get_database
# from pydantic import BaseModel, EmailStr
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.responses import RedirectResponse

# app = FastAPI()

# # Add CORS Middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"], 
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # MongoDB Connection
# db = get_database()
# teachers_collection = db["teachers"]

# # Models
# class TeacherSignupModel(BaseModel):
#     email: EmailStr
#     password: str

# class TeacherLoginModel(BaseModel):
#     email: EmailStr
#     password: str

# @app.post("/signup/")
# def signup(teacher: TeacherSignupModel):
#     # Check if email already exists
#     if teachers_collection.find_one({"email": teacher.email}):
#         raise HTTPException(status_code=400, detail="Email already registered")

#     # Hash the password
#     hashed_password = hash_password(teacher.password)

#     # Save the teacher in the database
#     teachers_collection.insert_one({
#         "email": teacher.email,
#         "password": hashed_password,
#         "is_verified": False
#     })

#     # Generate and send verification token
#     token = create_verification_token(teacher.email)
#     send_verification_email(teacher.email, token)

#     return {"message": "Signup successful. Please verify your email. Please check your email"}

# @app.get("/verify-email/")
# def verify_email(token: str = Query(...)):
#     email = verify_token(token)
#     if email == "Expired":
#         return RedirectResponse(url="http://localhost:5173/verify-result?status=expired")
#     if email == "Invalid":
#         return RedirectResponse(url="http://localhost:5173/verify-result?status=invalid")

#     # Update the teacher's verification status
#     result = teachers_collection.update_one({"email": email}, {"$set": {"is_verified": True}})
#     if result.matched_count == 0:
#         return RedirectResponse(url="http://localhost:5173/verify-result?status=notfound")

#     return RedirectResponse(url="http://localhost:5173/login")

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

#     # Generate a JWT token
#     access_token = create_access_token({"sub": teacher.email})

#     return {"access_token": access_token, "token_type": "bearer", "message": "Login successful"}

from fastapi import FastAPI, HTTPException, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, EmailStr
from app.utils import hash_password, verify_password, create_verification_token, verify_token, send_verification_email, create_access_token, blink_ratio, landmarks_detection, calculate_attention_score
from app.db import get_database
from app.model.predictor import load_emotion_model, load_face_cascade, load_face_mesh

# FastAPI Application Setup
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
from app.model.predictor import predict_outcome
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
db = get_database()
teachers_collection = db["teachers"]
attention_collection = db["attention_results"]
students_collection = db["students"] 

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

# FastAPI Endpoints
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
    return {"message": "Signup successful. Please verify your email."}

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
    return {"access_token": access_token, "token_type": "bearer", "message": "Login successful"}
    return {"access_token": access_token, "token_type": "bearer", "message": "ඇතුලත් වීම සාර්ථකයි "}

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
# from fastapi import FastAPI
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

# # Define input schema
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

# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# import cv2
# import mediapipe as mp
# import numpy as np
# from tensorflow.keras.models import model_from_json
# from app.utils import blink_ratio, landmarks_detection, calculate_attention_score

# app = FastAPI()

# # Enable CORS for frontend communication
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Load the emotion detection model
# try:
#     with open('./app/model/emotion_model.json', 'r') as json_file:
#         emotion_model = model_from_json(json_file.read())
#     emotion_model.load_weights('./app/model/emotion_model.weights.h5')
# except Exception as e:
#     raise RuntimeError(f"Error loading emotion model: {e}")

# # Load Haar Cascade for face detection
# face_cascade = cv2.CascadeClassifier('./app/model/haarcascade_frontalface_default.xml')

# # Mediapipe Face Mesh setup
# mp_face_mesh = mp.solutions.face_mesh
# face_mesh = mp_face_mesh.FaceMesh(
#     refine_landmarks=True,
#     max_num_faces=1,
#     min_detection_confidence=0.5,
#     min_tracking_confidence=0.5
# )

# # Define eye indices for Mediapipe
# LEFT_EYE = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398]
# RIGHT_EYE = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246]


# @app.get("/")
# def root():
#     return {"message": "Real-Time Attention Detection API"}


# @app.get("/attention")
# def detect_attention():
#     cap = cv2.VideoCapture(0)
#     if not cap.isOpened():
#         raise HTTPException(status_code=500, detail="Unable to access the webcam")

#     total_scores = []
#     total_blinks = 0
#     frame_count = 0

#     try:
#         while True:
#             ret, frame = cap.read()
#             if not ret:
#                 raise HTTPException(status_code=500, detail="Failed to capture frame from webcam")

#             rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#             results = face_mesh.process(rgb_frame)
#             gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

#             if results.multi_face_landmarks:
#                 try:
#                     landmarks = landmarks_detection(frame, results)

#                     # Ensure sufficient landmarks for blink detection
#                     if len(landmarks) >= max(max(LEFT_EYE), max(RIGHT_EYE)):
#                         # Blink detection
#                         blink_ratio_value = blink_ratio(landmarks, RIGHT_EYE, LEFT_EYE)
#                         if blink_ratio_value > 3.0:
#                             total_blinks += 1
#                     else:
#                         print("Insufficient landmarks detected. Skipping frame.")
#                         continue

#                     # Emotion detection
#                     faces = face_cascade.detectMultiScale(gray_frame, 1.3, 5)
#                     for (x, y, w, h) in faces:
#                         roi_gray = gray_frame[y:y + h, x:x + w]
#                         roi_gray = cv2.resize(roi_gray, (48, 48))
#                         roi_gray = np.expand_dims(np.expand_dims(roi_gray, -1), 0)
#                         emotion_prediction = emotion_model.predict(roi_gray)
#                         emotion = np.argmax(emotion_prediction)
#                         print(f"Detected Emotion: {emotion}")

#                     total_scores.append(8)  # Placeholder for actual logic
#                     frame_count += 1

#                 except IndexError as e:
#                     print(f"Error accessing landmarks: {e}")
#                     continue
#             else:
#                 print("No face landmarks detected in this frame.")

#             # For testing without GUI, comment out this block
#             cv2.imshow("Webcam Feed", frame)
#             if cv2.waitKey(1) & 0xFF == ord('q'):  # Press 'Q' to exit
#                 break

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=f"An error occurred during processing: {e}")

#     finally:
#         cap.release()
#         cv2.destroyAllWindows()

#     # Calculate final average score
#     average_score = np.mean(total_scores) if total_scores else 0
#     return {"average_score": average_score, "status": "Focused"}

import numpy as np
from math import sqrt
import cv2
import mediapipe as mp
import threading
from tensorflow.keras.models import model_from_json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.utils import blink_ratio, landmarks_detection, calculate_attention_score
from app.model.predictor import load_emotion_model, load_face_cascade, load_face_mesh

# Shared storage for attention results
attention_results = {
    "average_score": None,
    "status": None,
    "total_time": None,
}

# FastAPI Application Setup
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models and detection tools
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
    global attention_results

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
        while True:
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
    thread = threading.Thread(target=attention_detection_thread)
    thread.start()
    return {"message": "Real-time attention detection started."}

@app.get("/attention/result")
def get_attention_result():
    return attention_results



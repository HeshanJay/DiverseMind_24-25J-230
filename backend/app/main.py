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

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import cv2
import mediapipe as mp
import numpy as np
from tensorflow.keras.models import model_from_json
from app.utils import blink_ratio, landmarks_detection, calculate_attention_score

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the emotion detection model
with open('./app/model/emotion_model.json', 'r') as json_file:
    emotion_model = model_from_json(json_file.read())
emotion_model.load_weights('./app/model/emotion_model.h5')

# Load Haar Cascade for face detection
face_cascade = cv2.CascadeClassifier('./app/model/haarcascade_frontalface_default.xml')

# Mediapipe Face Mesh setup
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(
    refine_landmarks=True,
    max_num_faces=1,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

@app.get("/")
def root():
    return {"message": "Real-Time Attention Detection API"}

@app.get("/attention")
def detect_attention():
    cap = cv2.VideoCapture(0)
    total_scores = []
    total_blinks = 0
    frame_count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = face_mesh.process(rgb_frame)
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        if results.multi_face_landmarks:
            landmarks = landmarks_detection(frame, results)

            # Blink detection
            blink_ratio_value = blink_ratio(landmarks, [33, 133], [362, 263])
            if blink_ratio_value > 3.0:
                total_blinks += 1

            # Emotion detection
            faces = face_cascade.detectMultiScale(gray_frame, 1.3, 5)
            for (x, y, w, h) in faces:
                roi_gray = gray_frame[y:y + h, x:x + w]
                roi_gray = cv2.resize(roi_gray, (48, 48))
                roi_gray = np.expand_dims(np.expand_dims(roi_gray, -1), 0)
                emotion_prediction = emotion_model.predict(roi_gray)
                emotion = np.argmax(emotion_prediction)

            total_scores.append(8)  # Placeholder for actual logic
            frame_count += 1

        cv2.imshow("Webcam Feed", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    return {"average_score": np.mean(total_scores), "status": "Focused"}


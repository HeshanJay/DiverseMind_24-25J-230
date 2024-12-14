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
from tensorflow.keras.models import model_from_json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.utils import blink_ratio, landmarks_detection, calculate_attention_score
from app.model.predictor import load_emotion_model, load_face_cascade, load_face_mesh


# Helper Functions
def landmarks_detection(image, results):
    """Detect landmarks and return coordinates."""
    image_height, image_width = image.shape[:2]
    if results.multi_face_landmarks:
        landmarks = [(int(point.x * image_width), int(point.y * image_height))
                     for point in results.multi_face_landmarks[0].landmark]
        return landmarks
    return []


def euclidean_distance(point1, point2):
    """Compute Euclidean distance."""
    x1, y1 = point1
    x2, y2 = point2
    return sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)


def blink_ratio(landmarks, right_eye_indices, left_eye_indices):
    """Calculate blink ratio."""
    try:
        rh_distance = euclidean_distance(landmarks[right_eye_indices[0]], landmarks[right_eye_indices[8]])
        rv_distance = euclidean_distance(landmarks[right_eye_indices[12]], landmarks[right_eye_indices[4]])
        lh_distance = euclidean_distance(landmarks[left_eye_indices[0]], landmarks[left_eye_indices[8]])
        lv_distance = euclidean_distance(landmarks[left_eye_indices[12]], landmarks[left_eye_indices[4]])
        right_ratio = rh_distance / rv_distance
        left_ratio = lh_distance / lv_distance
        return (right_ratio + left_ratio) / 2
    except IndexError as e:
        print(f"Error calculating blink ratio: {e}")
        return 0  # Return a default ratio if there's an error


def estimate_head_pose(landmarks):
    """Estimate head pose (yaw, pitch, roll)."""
    # Placeholder values, replace with actual calculations
    yaw = 0  # Example yaw in degrees
    pitch = 0  # Example pitch in degrees
    roll = 0  # Example roll in degrees
    return yaw, pitch, roll


def compute_gaze_ratio(landmarks):
    """Compute gaze ratio."""
    # Placeholder value, replace with actual gaze ratio calculation
    return 0.5  # 0.5 means fairly centered gaze


def calculate_attention_score(emotion, gaze_ratio, blink_rate, yaw, pitch, roll):
    """Calculate the attention score with head pose and gaze ratio considerations."""
    emotion_scores = {
        "Happy": 3,
        "Neutral": 2,
        "Sad": -1,
        "Angry": -2,
        "Disgusted": -3,
        "Fearful": -3,
        "Surprised": -2
    }
    score = emotion_scores.get(emotion, 0)

    # Gaze Scoring
    if 0.4 <= gaze_ratio <= 0.6:
        score += 3
    elif 0.3 <= gaze_ratio <= 0.7:
        score += 1
    else:
        score -= 2

    # Blink Rate Scoring
    if 4 <= blink_rate <= 7:
        score += 3
    elif 8 <= blink_rate <= 15:
        score += 2
    elif blink_rate < 4:
        score -= 1
    elif 16 <= blink_rate <= 40:
        score -= 2
    else:
        score -= 3

    # Head Pose Scoring
    # A larger yaw/pitch/roll deviation means less focus.
    head_pose_penalty = (abs(yaw) + abs(pitch) + abs(roll)) / 15
    score -= min(head_pose_penalty, 3)

    return max(min(score, 10), -10)


# FastAPI Application Setup
app = FastAPI()

# Enable CORS
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

# Map emotion model output to emotion labels
emotions_map = {
    0: "Angry",
    1: "Disgusted",
    2: "Fearful",
    3: "Happy",
    4: "Neutral",
    5: "Sad",
    6: "Surprised"
}

@app.get("/")
def root():
    return {"message": "Real-Time Attention Detection API"}

@app.get("/attention")
def detect_attention():
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        raise HTTPException(status_code=500, detail="Unable to access the webcam")

    total_scores = []
    total_blinks = 0
    frame_count = 0
    frame_rate = 30.0  # Approximate frame rate of the webcam. Adjust as needed.
    total_time = 0  # Total time spent in the detection loop

    try:
        while True:
            ret, frame = cap.read()
            if not ret:
                raise HTTPException(status_code=500, detail="Failed to capture frame")

            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = face_mesh.process(rgb_frame)
            gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

            if results.multi_face_landmarks:
                try:
                    landmarks = landmarks_detection(frame, results)

                    if len(landmarks) >= max(max(LEFT_EYE), max(RIGHT_EYE)):
                        # Blink detection
                        blink_ratio_value = blink_ratio(landmarks, RIGHT_EYE, LEFT_EYE)
                        # If blink_ratio_value > 3 means a blink is detected
                        if blink_ratio_value > 3.0:
                            total_blinks += 1
                    else:
                        print("Insufficient landmarks detected. Skipping frame.")
                        continue

                    # Emotion detection
                    faces = face_cascade.detectMultiScale(gray_frame, 1.3, 5)
                    emotion_label = "Neutral"  # Default if no faces detected
                    for (x, y, w, h) in faces:
                        roi_gray = gray_frame[y:y + h, x:x + w]
                        roi_gray = cv2.resize(roi_gray, (48, 48))
                        roi_gray = np.expand_dims(np.expand_dims(roi_gray, -1), 0)
                        emotion_prediction = emotion_model.predict(roi_gray)
                        emotion_index = np.argmax(emotion_prediction)
                        emotion_label = emotions_map.get(emotion_index, "Neutral")
                        print(f"Detected Emotion: {emotion_label}")

                    # Compute gaze_ratio, head pose, and blink_rate
                    yaw, pitch, roll = estimate_head_pose(landmarks)
                    gaze_ratio = compute_gaze_ratio(landmarks)

                    # Approximate blink_rate per minute: 
                    blink_rate = (total_blinks / frame_count * frame_rate * 60) if frame_count > 0 else 0

                    attention_score = calculate_attention_score(
                        emotion_label,
                        gaze_ratio,
                        blink_rate,
                        yaw,
                        pitch,
                        roll
                    )
                    total_scores.append(attention_score)
                    frame_count += 1
                    total_time += 1 / frame_rate  # Increment total time

                except IndexError as e:
                    print(f"Error accessing landmarks: {e}")
                    continue
            else:
                print("No face landmarks detected in this frame.")

            # Press 'Q' to exit the loop
            cv2.imshow("Webcam Feed", frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during processing: {e}")
    finally:
        cap.release()
        cv2.destroyAllWindows()

    # Calculate final average score
    average_score = np.mean(total_scores) if total_scores else 0
    return {
        "average_score": average_score,
        "status": "Focused" if average_score > 0 else "Not Focused",
        "total_time": total_time
    }

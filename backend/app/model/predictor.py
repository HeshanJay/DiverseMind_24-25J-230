# import pickle
# import pandas as pd

# # Load the ML model
# model_path = "./app/model/predictor_math.pickle"
# with open(model_path, "rb") as f:
#     model = pickle.load(f)


# def predict_outcome(data):
#     """
#     Predict the outcome based on the input features.

#     Args:
#         data (dict): Dictionary containing input features.

#     Returns:
#         int: Predicted label (0, 1, 2).
#     """

#     # Convert input data to DataFrame
#     df = pd.DataFrame([data])
#     prediction = model.predict(df)
#     return int(prediction[0])

import cv2
import mediapipe as mp
from tensorflow.keras.models import model_from_json

def load_emotion_model(json_path: str, weights_path: str):
    with open(json_path, 'r') as json_file:
        model = model_from_json(json_file.read())
    model.load_weights(weights_path)
    return model

def load_face_cascade(cascade_path: str):
    return cv2.CascadeClassifier(cascade_path)

def load_face_mesh():
    mp_face_mesh = mp.solutions.face_mesh
    face_mesh = mp_face_mesh.FaceMesh(
        refine_landmarks=True,
        max_num_faces=1,
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5
    )
    return face_mesh

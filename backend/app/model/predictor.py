import os
import joblib
import pandas as pd
import cv2
import mediapipe as mp
from tensorflow.keras.models import model_from_json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "memory_predictor.pkl")
scaler_path = os.path.join(BASE_DIR, "scaler.pkl")

try:
    scaler = joblib.load(scaler_path)
    if not hasattr(scaler, "transform"):
        raise ValueError("The loaded scaler does not have a 'transform' method.")
    print("Scaler loaded successfully.")

    model = joblib.load(model_path)
    if not hasattr(model, "predict"):
        raise ValueError("The loaded model does not have a 'predict' method.")
    print("Memory Predictor Model loaded successfully.")

except FileNotFoundError as e:
    raise RuntimeError(f"Model or scaler file not found: {e}")
except Exception as e:
    raise RuntimeError(f"Error loading model or scaler: {e}")


def predict_outcome(data: dict) -> str:
    """
    Predict the outcome based on the input features.

    Args:
        data (dict): Dictionary containing input features.

    Returns:
        str: Predicted label ('Normal', 'Medium', 'Low').
    """
    try:
        # Convert input data to a DataFrame
        input_df = pd.DataFrame([data])

        # Apply scaling
        sample_scaled = scaler.transform(input_df)

        # Predict using the model
        pred = model.predict(sample_scaled)

        # Map prediction to label
        label_map = {0: 'Normal', 1: 'Medium', 2: 'Low'}
        predict_label = label_map.get(pred[0], "Unknown")

        print("Prediction Label:", predict_label)

        return predict_label

    except Exception as e:
        raise ValueError(f"Error during prediction: {e}")

def load_emotion_model(json_path: str, weights_path: str):
    """
    Load an emotion detection model from JSON and weights.

    Args:
        json_path (str): Path to the JSON model file.
        weights_path (str): Path to the weights file.

    Returns:
        model: Loaded Keras model.
    """
    try:
        with open(json_path, 'r') as json_file:
            model = model_from_json(json_file.read())
        model.load_weights(weights_path)
        return model
    except Exception as e:
        raise RuntimeError(f"Error loading emotion model: {e}")

def load_face_cascade(cascade_path: str):
    """
    Load OpenCV Face Cascade for face detection.

    Args:
        cascade_path (str): Path to OpenCV XML cascade file.

    Returns:
        cv2.CascadeClassifier: Loaded classifier.
    """
    return cv2.CascadeClassifier(cascade_path)

def load_face_mesh():
    """
    Load MediaPipe Face Mesh for facial landmark detection.

    Returns:
        FaceMesh object: Loaded model.
    """
    try:
        mp_face_mesh = mp.solutions.face_mesh
        return mp_face_mesh.FaceMesh(
            refine_landmarks=True,
            max_num_faces=1,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )
    except Exception as e:
        raise RuntimeError(f"Error loading MediaPipe FaceMesh: {e}")
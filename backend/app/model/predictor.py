import os
import pickle
import pandas as pd
import cv2
import numpy as np
import mediapipe as mp
from tensorflow.keras.models import load_model, model_from_json

# ✅ Ensure all file paths are correctly set relative to the script location
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# ===========================
# 📌 Load Machine Learning Models
# ===========================

# ✅ Load the Math Prediction Model
model_math_path = os.path.join(BASE_DIR, "predictor_math.pickle")
try:
    with open(model_math_path, "rb") as f:
        model_math = pickle.load(f)
except FileNotFoundError:
    raise RuntimeError(f"Math predictor model not found at {model_math_path}")

def predict_outcome_math(features_dict: dict) -> int:
    """
    Predicts the outcome based on input features using the math model.

    Args:
        features_dict (dict): Input features.

    Returns:
        int: The predicted label (e.g., 0, 1, 2).
    """
    df = pd.DataFrame([features_dict])
    prediction = model_math.predict(df)
    return int(prediction[0])

# ✅ Load the Sinhala Writing Model
model_writing_path = os.path.join(BASE_DIR, "sinhala_letter_classifier.keras")
try:
    model_writing = load_model(model_writing_path)
except Exception as e:
    raise RuntimeError(f"Error loading writing model: {e}")

# Define mappings for class and status
letter_mapping = {
    0: "Madhya_Akshara",
    1: "Madhya_Akshara",
    2: "Aarohana_Akshara",
    3: "Aarohana_Akshara",
    4: "Avarohana_Akshara",
    5: "Avarohana_Akshara"
}

status_mapping = {
    0: "Correct",
    1: "Incorrect",
    2: "Correct",
    3: "Incorrect",
    4: "Correct",
    5: "Incorrect"
}

# ===========================
# 📌 Utility Functions for Image Preprocessing
# ===========================

def preprocess_image(image_bytes: bytes, input_shape=(64, 64, 3)) -> np.ndarray:
    """
    Preprocess the image for model input:
    - Convert to grayscale
    - Resize
    - Apply edge detection & thresholding
    - Normalize pixel values
    - Expand dimensions to match (1, 64, 64, 3)

    Args:
        image_bytes (bytes): Raw image bytes.
        input_shape (tuple): Expected model input shape.

    Returns:
        np.ndarray: Processed image tensor.
    """
    try:
        img = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_GRAYSCALE)
        img = cv2.resize(img, (input_shape[0], input_shape[1]))

        # Edge detection + thresholding
        edges = cv2.Canny(img, threshold1=100, threshold2=200)
        _, binary = cv2.threshold(edges, 127, 255, cv2.THRESH_BINARY)
        binary = binary / 255.0  # Normalize to [0,1]

        # Convert to 3-channel if necessary
        if len(input_shape) == 3 and input_shape[2] == 3:
            binary = np.stack([binary] * 3, axis=-1)

        return np.expand_dims(binary, axis=0)  # Add batch dimension

    except Exception as e:
        raise ValueError(f"Error preprocessing image: {e}")

# ===========================
# 📌 Predict Sinhala Writing Outcome
# ===========================

def predict_outcome_writing(image_bytes: bytes) -> dict:
    """
    Predicts the writing outcome using the Keras model.

    Args:
        image_bytes (bytes): Image data.

    Returns:
        dict: Predicted class, status, and confidence score.
    """
    try:
        processed_image = preprocess_image(image_bytes)
        predictions = model_writing.predict(processed_image)
        class_idx = np.argmax(predictions[0])

        return {
            "predicted_class": letter_mapping[class_idx],
            "status": status_mapping[class_idx],
            "confidence": float(np.max(predictions[0]))
        }
    except Exception as e:
        return {"error": str(e)}

# ===========================
# 📌 Load Facial Analysis Models
# ===========================

def load_emotion_model(json_path: str, weights_path: str):
    """Loads the emotion detection model from JSON and weights."""
    try:
        with open(json_path, 'r') as json_file:
            model = model_from_json(json_file.read())
        model.load_weights(weights_path)
        return model
    except Exception as e:
        raise RuntimeError(f"Error loading emotion model: {e}")

def load_face_cascade(cascade_path: str):
    """Loads OpenCV face detection model."""
    return cv2.CascadeClassifier(cascade_path)

def load_face_mesh():
    """Loads the MediaPipe Face Mesh model."""
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

# ===========================
# 📌 Unified `predict_outcome` Function
# ===========================

def predict_outcome(features_dict: dict, test_type: str) -> dict:
    """
    Unified function to predict outcomes for different tests.

    Args:
        features_dict (dict): Input data (features or image bytes).
        test_type (str): The type of test ('math', 'writing').

    Returns:
        dict: Prediction results or error message.
    """
    try:
        if test_type == "math":
            return {"label": predict_outcome_math(features_dict)}

        elif test_type == "writing":
            if "image_bytes" not in features_dict:
                return {"error": "Missing 'image_bytes' key for writing test"}
            return predict_outcome_writing(features_dict["image_bytes"])

        else:
            return {"error": "Invalid test type"}

    except Exception as e:
        return {"error": str(e)}

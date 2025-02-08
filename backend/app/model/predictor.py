import os
import pickle
import pandas as pd 
import cv2
import numpy as np 

from tensorflow.keras.models import load_model 

# Maths
model_math_path = "./app/model/predictor_math.pickle"
with open(model_math_path, "rb") as f:
    model_math = pickle.load(f)

def predict_outcome(data):
    """
    Predict the outcome based on input features using the scikit-learn model.

    Args:
        features_dict (dict): A dictionary containing the input features.
    
    Returns:
        int: The predicted label (e.g. 0, 1, 2) from the scikit-learn model.
    """
    df = pd.DataFrame([data])
    prediction = model_math.predict(df)
    return int(prediction[0])


# Writing
model_writing_path = os.path.join(os.path.dirname(__file__), "sinhala_letter_classifier.keras")
model_writing = load_model(model_writing_path)

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

def preprocess_image(image_bytes: bytes, input_shape=(64, 64, 3)) -> np.ndarray:
    """
    Preprocess the image to match the input format of the model.
    - Convert to grayscale
    - Resize
    - Edge detection + threshold
    - Normalize
    - Reshape to (1, 64, 64, 3)
    """
    img = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (input_shape[0], input_shape[1]))

    # Edge detection, threshold
    edges = cv2.Canny(img, threshold1=100, threshold2=200)
    _, binary = cv2.threshold(edges, 127, 255, cv2.THRESH_BINARY)
    binary = binary / 255.0

    # If input shape is (64,64,3), replicate grayscale to 3 channels
    if len(input_shape) == 3 and input_shape[2] == 3:
        binary = np.stack([binary] * 3, axis=-1)

    # Add batch dimension
    return np.expand_dims(binary, axis=0)

def predict_outcome_writing(image_bytes: bytes) -> dict:
    """
    Predict the outcome for a given image using the Keras model (letter formation).

    Returns:
        dict: {
          "predicted_class": <str>,
          "status": <str>,
          "confidence": <float>
        }
        or
        {"error": <str>} if an exception occurs
    """
    try:
        # Preprocess
        processed_image = preprocess_image(image_bytes)

        # Predict
        predictions = model_writing.predict(processed_image)
        class_idx = np.argmax(predictions[0])

        # Map to letter type and status
        predicted_class = letter_mapping[class_idx]
        status = status_mapping[class_idx]

        return {
            "predicted_class": predicted_class,
            "status": status,
            "confidence": float(np.max(predictions[0]))
        }
    except Exception as e:
        return {"error": str(e)}

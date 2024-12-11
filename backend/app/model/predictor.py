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



# Writing
import cv2
import numpy as np
from tensorflow.keras.models import load_model
import os

# Load the model from the saved path
model_path = os.path.join(os.path.dirname(__file__), 'sinhala_letter_classifier.keras')
model = load_model(model_path)

# Define mappings for class and status
letter_mapping = {
    0: 'Madhya_Akshara',
    1: 'Madhya_Akshara',
    2: 'Aarohana_Akshara',
    3: 'Aarohana_Akshara',
    4: 'Avarohana_Akshara',
    5: 'Avarohana_Akshara'
}

status_mapping = {
    0: 'Correct',
    1: 'Incorrect',
    2: 'Correct',
    3: 'Incorrect',
    4: 'Correct',
    5: 'Incorrect'
}

def preprocess_image(image_bytes, input_shape=(64, 64, 3)):
    """
    Preprocess the image to match the input format of the model.
    """
    img = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (input_shape[0], input_shape[1]))
    edges = cv2.Canny(img, threshold1=100, threshold2=200)
    _, binary = cv2.threshold(edges, 127, 255, cv2.THRESH_BINARY)
    binary = binary / 255.0
    if len(input_shape) == 3 and input_shape[2] == 3:
        binary = np.stack([binary] * 3, axis=-1)
    return np.expand_dims(binary, axis=0)  # Add batch dimension

def predict_outcome(image_bytes):
    """
    Predict the outcome for a given image.
    
    Args:
    - image_bytes: Bytes object representing the image.
    
    Returns:
    - dict: Prediction results including class and status.
    """
    try:
        # Preprocess the image
        processed_image = preprocess_image(image_bytes)

        # Perform prediction
        predictions = model.predict(processed_image)
        class_idx = np.argmax(predictions[0])  # Get the predicted class index

        # Map to letter type and status
        predicted_class = letter_mapping[class_idx]
        status = status_mapping[class_idx]

        return {
            "predicted_class": predicted_class,
            "status": status,
            "confidence": float(np.max(predictions[0]))  # Confidence score
        }
    except Exception as e:
        return {"error": str(e)}

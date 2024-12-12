import joblib
import pandas as pd

# Paths to the model and scaler
model_path = "./app/model/memory_predictor.pkl"
scaler_path = "./app/model/scaler.pkl"

try:
    # Load the scaler
    scaler = joblib.load(scaler_path)
    if not hasattr(scaler, "transform"):
        raise ValueError("The loaded scaler does not have a 'transform' method.")
    print("Scaler loaded successfully.")

    # Load the model
    model = joblib.load(model_path)
    if not hasattr(model, "predict"):
        raise ValueError("The loaded model does not have a 'predict' method.")
    print("Model loaded successfully.")
except Exception as e:
    raise RuntimeError(f"Error loading model or scaler: {e}")


def predict_outcome(data):
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
        predict_label = label_map[pred[0]]
        print("Prediction Label:", predict_label)

        return predict_label
    except Exception as e:
        raise ValueError(f"Error during prediction: {e}")






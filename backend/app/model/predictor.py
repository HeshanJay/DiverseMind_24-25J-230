import pickle
import pandas as pd

# Load the model
model_path = "./app/model/memory_predictor.pkl"
with open(model_path, "rb") as f:
    model = pickle.load(f)

# Load the scaler
scaler_path = "./app/model/scaler.pkl"
with open(scaler_path, "rb") as f:
    scaler = pickle.load(f)

def predict_outcome(data):
    """
    Predict the outcome based on the input features.

    Args:
        data (dict): Dictionary containing input features.

    Returns:
        str: Predicted label ('Normal', 'Medium', 'Low').
    """
    # Convert input to DataFrame
    input_df = pd.DataFrame([data])

    # Apply scaling
    sample_scaled = scaler.transform(input_df)

    # Predict using the model
    pred = model.predict(sample_scaled)
    label_map = {0: 'Normal', 1: 'Medium', 2: 'Low'}
    predict_label = label_map[pred[0]]
    return predict_label

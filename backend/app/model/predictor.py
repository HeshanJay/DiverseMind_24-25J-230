import pickle
import pandas as pd

# Load the ML model
model_path = "./app/model/predictor_math.pickle"
with open(model_path, "rb") as f:
    model = pickle.load(f)


def predict_outcome(data):
    """
    Predict the outcome based on the input features.

    Args:
        data (dict): Dictionary containing input features.

    Returns:
        int: Predicted label (0, 1, 2).
    """

    # Convert input data to DataFrame
    df = pd.DataFrame([data])
    prediction = model.predict(df)
    return int(prediction[0])


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.model.predictor import predict_outcome  

# Initialize FastAPI app
app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Define input schema
class InputData(BaseModel):
    Language_vocab: float
    Memory: float
    Speed: float
    Visual_discrimination: float
    Audio_Discrimination: float

@app.post("/prediction/")
def predict(input_data: InputData):
    """
    API endpoint for making predictions.

    Args:
        input_data (InputData): Input features for the model.

    Returns:
        dict: Prediction result.
    """
    try:
        data = input_data.dict()
        prediction = predict_outcome(data) 
        return {"prediction": prediction}
    except Exception as e:
        return {"error": str(e)}


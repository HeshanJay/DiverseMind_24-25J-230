from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.model.predictor import predict_outcome  # Import the predict_outcome function

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Define input schema based on actual model features
class InputData(BaseModel):
    Language_vocab: float
    Memory: float
    Speed: float
    Visual_discrimination: float
    Audio_Discrimination: float

@app.post("/prediction/")
def predict(input_data: InputData):
    data = input_data.dict()
    prediction = predict_outcome(data)  # Call the function
    return {"prediction": prediction}

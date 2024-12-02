from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.model.predictor import predict_outcome

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
    addition_time: float
    substraction_time: float
    division_time: float
    multiplication_time: float
    fraction_time: float
    total_time: float
    total_accuracy: float
    addition_score: int
    substraction_score: int
    division_score: int
    multiplication_score: int
    fraction_score: int

@app.get("/")
def read_root():
    return {"message": "Math Skill Predictor API"}

@app.post("/predict/")
def predict(input_data: InputData):
    data = input_data.dict()
    prediction = predict_outcome(data)
    return {"prediction": prediction}


import bcrypt
from jose import jwt
from datetime import datetime, timedelta
import smtplib
from email.mime.text import MIMEText

# Constants
SECRET_KEY = "5gRyaZcBis" 
ALGORITHM = "HS256"
TOKEN_EXPIRATION_MINUTES = 15

def hash_password(password: str) -> str:
    """Hashes a password using bcrypt."""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def verify_password(password: str, hashed_password: str) -> bool:
    """Verifies if a password matches the hash."""
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_verification_token(email: str) -> str:
    """Creates a JWT token for email verification."""
    expiration = datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRATION_MINUTES)
    payload = {"sub": email, "exp": expiration}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str) -> str:
    """Verifies a JWT token and returns the email."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["sub"]
    except jwt.ExpiredSignatureError:
        return "Expired"
    except jwt.JWTError:
        return "Invalid"
    
def create_access_token(data: dict) -> str:
    """Generates a JWT token with user data."""
    expiration = datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRATION_MINUTES)
    payload = data.copy()
    payload.update({"exp": expiration})
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def send_verification_email(email: str, token: str):
    """Sends a verification email with the token."""
    sender_email = "diversemind25@gmail.com"
    sender_password = "aafz cxxu tqqi nufw"  # App Password
    subject = "Verify your email"
    verification_url = f"http://127.0.0.1:8000/verify-email/?token={token}"
    body = f"Click the link to verify your email: {verification_url}"

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = email

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, email, msg.as_string())
        print("Verification email sent successfully")
    except Exception as e:
        print(f"Failed to send email: {e}")



# import bcrypt
# import random
# import string
# from jose import jwt
# from datetime import datetime, timedelta

# # Constants
# SECRET_KEY = "5gRyaZcBis"
# ALGORITHM = "HS256"
# TOKEN_EXPIRATION_MINUTES = 15

# def hash_password(password: str) -> str:
#     salt = bcrypt.gensalt()
#     return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

# def verify_password(password: str, hashed: str) -> bool:
#     return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

# def generate_secret_key(length: int = 8) -> str:
#     return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

# def create_verification_token(email: str) -> str:
#     expiration = datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRATION_MINUTES)
#     payload = {"sub": email, "exp": expiration}
#     return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# def verify_token(token: str) -> str:
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         return payload["sub"]
#     except jwt.ExpiredSignatureError:
#         return "Expired"
#     except jwt.JWTError:
#         return "Invalid"

import numpy as np
from math import sqrt

def landmarks_detection(image, results):
    """Detect landmarks and return coordinates."""
    image_height, image_width = image.shape[:2]
    if results.multi_face_landmarks:
        landmarks = [(int(point.x * image_width), int(point.y * image_height))
                     for point in results.multi_face_landmarks[0].landmark]
        return landmarks
    return []

def euclidean_distance(point1, point2):
    """Compute Euclidean distance."""
    x1, y1 = point1
    x2, y2 = point2
    return sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

def blink_ratio(landmarks, right_eye_indices, left_eye_indices):
    """Calculate blink ratio."""
    try:
        rh_distance = euclidean_distance(landmarks[right_eye_indices[0]], landmarks[right_eye_indices[8]])
        rv_distance = euclidean_distance(landmarks[right_eye_indices[12]], landmarks[right_eye_indices[4]])
        lh_distance = euclidean_distance(landmarks[left_eye_indices[0]], landmarks[left_eye_indices[8]])
        lv_distance = euclidean_distance(landmarks[left_eye_indices[12]], landmarks[left_eye_indices[4]])
        right_ratio = rh_distance / rv_distance
        left_ratio = lh_distance / lv_distance
        return (right_ratio + left_ratio) / 2
    except IndexError as e:
        print(f"Error calculating blink ratio: {e}")
        return 0  # Return a default ratio if there's an error

def calculate_attention_score(emotion, gaze_ratio, blink_rate, yaw, pitch, roll):
    """Calculate the attention score."""
    emotion_scores = {
        "Happy": 3,
        "Neutral": 2,
        "Sad": -1,
        "Angry": -2,
        "Disgusted": -3,
        "Fearful": -3,
        "Surprised": -2
    }
    score = emotion_scores.get(emotion, 0)

    # Gaze Scoring
    if 0.4 <= gaze_ratio <= 0.6:
        score += 3
    elif 0.3 <= gaze_ratio <= 0.7:
        score += 1
    else:
        score -= 2

    # Blink Rate Scoring
    if 4 <= blink_rate <= 7:
        score += 3
    elif 8 <= blink_rate <= 15:
        score += 2
    elif blink_rate < 4:
        score -= 1
    elif 16 <= blink_rate <= 40:
        score -= 2
    else:
        score -= 3

    # Head Pose Scoring
    pose_penalty = abs(yaw) / 15 + abs(pitch) / 15 + abs(roll) / 15
    score -= min(pose_penalty, 3)

    return max(min(score, 10), -10)

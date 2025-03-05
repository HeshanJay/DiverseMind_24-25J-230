import bcrypt
from jose import jwt
from datetime import datetime, timedelta
import smtplib
from email.mime.text import MIMEText
import numpy as np
from math import sqrt
import cv2


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
        # Right eye distances
        rh_distance = euclidean_distance(landmarks[right_eye_indices[0]], landmarks[right_eye_indices[8]])
        rv_distance = euclidean_distance(landmarks[right_eye_indices[12]], landmarks[right_eye_indices[4]])
        # Left eye distances
        lh_distance = euclidean_distance(landmarks[left_eye_indices[0]], landmarks[left_eye_indices[8]])
        lv_distance = euclidean_distance(landmarks[left_eye_indices[12]], landmarks[left_eye_indices[4]])
        right_ratio = rh_distance / rv_distance
        left_ratio = lh_distance / lv_distance
        return (right_ratio + left_ratio) / 2
    except IndexError as e:
        print(f"Error calculating blink ratio: {e}")
        return 0

def compute_gaze_ratio(landmarks, left_eye_indices, right_eye_indices):
    """
    Compute gaze ratio based on pupil positions relative to eye corners.
    Uses the inner and outer corners of each eye for normalization.
    """
    try:
        # For left eye: inner corner at index 362, outer corner at index 263
        left_inner = landmarks[362]
        left_outer = landmarks[263]
        # For right eye: inner corner at index 33, outer corner at index 133
        right_inner = landmarks[33]
        right_outer = landmarks[133]

        # Calculate pupil positions as average x-values from provided indices
        left_pupil_x = np.mean([landmarks[i][0] for i in left_eye_indices])
        right_pupil_x = np.mean([landmarks[i][0] for i in right_eye_indices])

        # Horizontal ratios relative to eye corners
        left_ratio = (left_pupil_x - left_inner[0]) / (left_outer[0] - left_inner[0])
        right_ratio = (right_pupil_x - right_inner[0]) / (right_outer[0] - right_inner[0])
        gaze_ratio = (left_ratio + right_ratio) / 2
        return min(max(gaze_ratio, 0), 1)
    except Exception as e:
        print(f"Error calculating gaze ratio: {e}")
        return 0.5

def get_head_pose(landmarks, frame):
    """
    Estimate head pose using a subset of facial landmarks via solvePnP.
    Updated to use cv2.decomposeProjectionMatrix for reliable Euler angle extraction.
    """
    try:
        required_indices = [1, 152, 33, 263, 61, 291]
        if any(i >= len(landmarks) for i in required_indices):
            return 0, 0, 0

        # 2D image points
        image_points = np.array([
            landmarks[1],    # Nose tip
            landmarks[152],  # Chin
            landmarks[33],   # Left eye left corner
            landmarks[263],  # Right eye right corner
            landmarks[61],   # Left Mouth corner
            landmarks[291]   # Right mouth corner
        ], dtype="double")

        # 3D model points of a generic face model
        model_points = np.array([
            (0.0, 0.0, 0.0),             # Nose tip
            (0.0, -63.6, -12.5),         # Chin
            (-43.3, 32.7, -26.0),        # Left eye left corner
            (43.3, 32.7, -26.0),         # Right eye right corner
            (-28.9, -28.9, -24.1),       # Left Mouth corner
            (28.9, -28.9, -24.1)         # Right mouth corner
        ])

        size = frame.shape
        focal_length = size[1]
        center = (size[1] / 2, size[0] / 2)
        camera_matrix = np.array(
            [[focal_length, 0, center[0]],
             [0, focal_length, center[1]],
             [0, 0, 1]], dtype="double"
        )
        dist_coeffs = np.zeros((4, 1))  # Assuming no lens distortion

        success, rotation_vector, translation_vector = cv2.solvePnP(
            model_points, image_points, camera_matrix, dist_coeffs, flags=cv2.SOLVEPNP_ITERATIVE
        )
        if not success:
            return 0, 0, 0

        rotation_matrix, _ = cv2.Rodrigues(rotation_vector)
        proj_matrix = np.hstack((rotation_matrix, np.zeros((3, 1))))
        _, _, _, _, _, _, euler_angles = cv2.decomposeProjectionMatrix(proj_matrix)
        yaw, pitch, roll = euler_angles.flatten()[:3]
        return yaw, pitch, roll
    except Exception as e:
        print(f"Error in head pose estimation: {e}")
        return 0, 0, 0

def calculate_attention_score(emotion, gaze_ratio, blink_rate, yaw, pitch, roll):
    """
    Calculate the attention score based on various metrics with recalibrated thresholds.
    Adjustments:
      - Normalize yaw to be the deviation from frontal (0°).
      - Reduce head pose penalty impact by using a higher divisor.
      - Increase bonuses and adjust blink rate scoring so that a focused state yields higher scores.
    """
    # Revised baseline scores
    emotion_scores = {
        "Happy": 4,
        "Neutral": 3,
        "Sad": 1,
        "Angry": 0,
        "Disgusted": -1,
        "Fearful": -1,
        "Surprised": 0
    }
    score = emotion_scores.get(emotion, 0)

    # Gaze scoring: if gaze ratio is optimal, add more bonus.
    if 0.35 <= gaze_ratio <= 0.65:
        score += 4
    elif 0.3 <= gaze_ratio <= 0.7:
        score += 2
    else:
        score -= 1

    # Blink rate scoring (expected 15-20 per minute)
    # Reward if in range; penalize if too low (eyes closed/drowsy) or too high (excessive blinking)
    if blink_rate >= 15 and blink_rate <= 20:
        score += 3
    elif blink_rate < 15:
        score -= 2
    elif blink_rate > 20 and blink_rate <= 30:
        score -= 1
    elif blink_rate > 30:
        score -= 3
    # If blink_rate is 0, no adjustment is made

    # Normalize yaw angle: if abs(yaw) > 90, adjust it to reflect deviation from frontal.
    if abs(yaw) > 90:
        yaw = 180 - abs(yaw)

    # Head pose penalty: sum of absolute angles divided by 200 (capped at 2).
    pose_penalty = (abs(yaw) + abs(pitch) + abs(roll)) / 200
    score -= min(pose_penalty, 2)

    final_score = max(min(score, 10), -10)
    
    print(f"Emotion: {emotion} | Baseline Score: {emotion_scores.get(emotion, 0)}")
    print(f"Gaze Ratio: {gaze_ratio}")
    print(f"Blink Rate: {blink_rate}")
    print(f"Head Pose (yaw, pitch, roll): ({yaw}, {pitch}, {roll})")
    print(f"Calculated Attention Score (before clamping): {score}")
    print(f"Final Attention Score (after clamping): {final_score}")
    
    return final_score

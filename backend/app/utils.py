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

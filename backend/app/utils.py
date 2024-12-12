# import numpy as np
# from math import sqrt

# def landmarks_detection(image, results):
#     """Detect landmarks and return coordinates."""
#     image_height, image_width = image.shape[:2]
#     landmarks = [(int(point.x * image_width), int(point.y * image_height))
#                  for point in results.multi_face_landmarks[0].landmark]
#     return landmarks

# def euclidean_distance(point1, point2):
#     """Compute Euclidean distance."""
#     x1, y1 = point1
#     x2, y2 = point2
#     return sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

# def blink_ratio(landmarks, right_eye_indices, left_eye_indices):
#     """Calculate blink ratio."""
#     rh_distance = euclidean_distance(landmarks[right_eye_indices[0]], landmarks[right_eye_indices[8]])
#     rv_distance = euclidean_distance(landmarks[right_eye_indices[12]], landmarks[right_eye_indices[4]])
#     lh_distance = euclidean_distance(landmarks[left_eye_indices[0]], landmarks[left_eye_indices[8]])
#     lv_distance = euclidean_distance(landmarks[left_eye_indices[12]], landmarks[left_eye_indices[4]])
#     right_ratio = rh_distance / rv_distance
#     left_ratio = lh_distance / lv_distance
#     return (right_ratio + left_ratio) / 2

# def calculate_attention_score(emotion, gaze_ratio, blink_rate, yaw, pitch, roll):
#     """Calculate the attention score."""
#     emotion_scores = {
#         "Happy": 3,
#         "Neutral": 2,
#         "Sad": -1,
#         "Angry": -2,
#         "Disgusted": -3,
#         "Fearful": -3,
#         "Surprised": -2
#     }
#     score = emotion_scores.get(emotion, 0)

#     # Gaze Scoring
#     if 0.4 <= gaze_ratio <= 0.6:
#         score += 3
#     elif 0.3 <= gaze_ratio <= 0.7:
#         score += 1
#     else:
#         score -= 2

#     # Blink Rate Scoring
#     if 4 <= blink_rate <= 7:
#         score += 3
#     elif 8 <= blink_rate <= 15:
#         score += 2
#     elif blink_rate < 4:
#         score -= 1
#     elif 16 <= blink_rate <= 40:
#         score -= 2
#     else:
#         score -= 3

#     # Head Pose Scoring
#     pose_penalty = abs(yaw) / 15 + abs(pitch) / 15 + abs(roll) / 15
#     score -= min(pose_penalty, 3)

#     return max(min(score, 10), -10)

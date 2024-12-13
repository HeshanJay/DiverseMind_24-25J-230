# app/model/evaluate.py

def evaluate_student_writing_skills(cnn_output_score, vowel_symbol_score, punctuation_score):
    # Map CNN output score to letter formation score range
    if cnn_output_score <= 1:
        letter_formation_score_range = (0, 1)
    elif cnn_output_score <= 4:
        letter_formation_score_range = (2, 4)
    else:
        letter_formation_score_range = (5, 6)
    
    # Weak combinations
    weak_conditions = [
        # Letter formation: 0-1, Vowel symbol: 0-3, Punctuation: 0-2
        (letter_formation_score_range[1] <= 1 and vowel_symbol_score <= 3 and punctuation_score <= 2),
        # Letter formation: 2-4, Vowel symbol: 0-3, Punctuation: 0-2
        (2 <= letter_formation_score_range[1] <= 4 and vowel_symbol_score <= 3 and punctuation_score <= 2),
        # Letter formation: 5-6, Vowel symbol: 0-3, Punctuation: 0-2
        (5 <= letter_formation_score_range[1] <= 6 and vowel_symbol_score <= 3 and punctuation_score <= 2)
    ]
    
    # Average combinations
    average_conditions = [
        # Letter formation: 2-4, Vowel symbol: 4-6, Punctuation: 3-5
        (2 <= letter_formation_score_range[1] <= 4 and 4 <= vowel_symbol_score <= 6 and 3 <= punctuation_score <= 5),
        # Letter formation: 2-4, Vowel symbol: 4-6, Punctuation: 0-2
        (2 <= letter_formation_score_range[1] <= 4 and 4 <= vowel_symbol_score <= 6 and 0 <= punctuation_score <= 2),
        # Letter formation: 5-6, Vowel symbol: 4-6, Punctuation: 3-5
        (5 <= letter_formation_score_range[1] <= 6 and 4 <= vowel_symbol_score <= 6 and 3 <= punctuation_score <= 5)
    ]
    
    # Good combinations
    good_conditions = [
        # Letter formation: 5-6, Vowel symbol: 7-10, Punctuation: 6-10
        (5 <= letter_formation_score_range[1] <= 6 and 7 <= vowel_symbol_score <= 10 and 6 <= punctuation_score <= 10),
        # Letter formation: 5-6, Vowel symbol: 7-10, Punctuation: 3-5
        (5 <= letter_formation_score_range[1] <= 6 and 7 <= vowel_symbol_score <= 10 and 3 <= punctuation_score <= 5),
        # Letter formation: 2-4, Vowel symbol: 7-10, Punctuation: 6-10
        (2 <= letter_formation_score_range[1] <= 4 and 7 <= vowel_symbol_score <= 10 and 6 <= punctuation_score <= 10)
    ]
    
    # Determine the skill level
    if any(weak_conditions):
        skill_level = "Weak"
    elif any(average_conditions):
        skill_level = "Average"
    elif any(good_conditions):
        skill_level = "Good"
    else:
        skill_level = "Cannot be determined"
    
    return {
        "skill_level": skill_level,
        "letter_formation_score": cnn_output_score,
        "vowel_symbol_score": vowel_symbol_score,
        "punctuation_score": punctuation_score
    }

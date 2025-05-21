def evaluate_student_writing_skills(cnn_output_score, vowel_symbol_score, punctuation_score):
    
    # Categorize each score into distinct ranges
    # Letter formation (LF) ranges
    if 0 <= cnn_output_score <= 1:
        letter_formation_category = "low"
    elif 2 <= cnn_output_score <= 4:
        letter_formation_category = "medium"
    elif 5 <= cnn_output_score <= 6:
        letter_formation_category = "high"
    else:
        raise ValueError("CNN output score must be between 0 and 6")
    
    # Vowel symbol (VS) ranges
    if 0 <= vowel_symbol_score <= 3:
        vowel_symbol_category = "low"
    elif 4 <= vowel_symbol_score <= 6:
        vowel_symbol_category = "medium"
    elif 7 <= vowel_symbol_score <= 10:
        vowel_symbol_category = "high"
    else:
        raise ValueError("Vowel symbol score must be between 0 and 10")
    
    # Punctuation (P) ranges
    if 0 <= punctuation_score <= 2:
        punctuation_category = "low"
    elif 3 <= punctuation_score <= 5:
        punctuation_category = "medium"
    elif 6 <= punctuation_score <= 10:
        punctuation_category = "high"
    else:
        raise ValueError("Punctuation score must be between 0 and 10")
    
    # Comprehensive decision matrix based on the 27 possible combinations
    # Format: (letter_formation, vowel_symbol, punctuation) -> skill_level
    decision_matrix = {
        # All low combinations
        ("low", "low", "low"): "Weak",
        
        # One medium, two low
        ("low", "low", "medium"): "Weak",
        ("low", "medium", "low"): "Weak",
        ("medium", "low", "low"): "Weak",
        
        # Two medium, one low
        ("medium", "medium", "low"): "Average",
        ("medium", "low", "medium"): "Average",
        ("low", "medium", "medium"): "Average",
        
        # All medium
        ("medium", "medium", "medium"): "Average",
        
        # One high, two low
        ("high", "low", "low"): "Weak",
        ("low", "high", "low"): "Average",
        ("low", "low", "high"): "Average",
        
        # One high, one medium, one low
        ("high", "medium", "low"): "Average",
        ("high", "low", "medium"): "Average",
        ("medium", "high", "low"): "Average",
        ("medium", "low", "high"): "Average",
        ("low", "high", "medium"): "Average",
        ("low", "medium", "high"): "Average",
        
        # Two high, one low
        ("high", "high", "low"): "Good",
        ("high", "low", "high"): "Good",
        ("low", "high", "high"): "Good",
        
        # One high, two medium
        ("high", "medium", "medium"): "Good",
        ("medium", "high", "medium"): "Good",
        ("medium", "medium", "high"): "Good",
        
        # Two high, one medium
        ("high", "high", "medium"): "Good",
        ("high", "medium", "high"): "Good",
        ("medium", "high", "high"): "Good",
        
        # All high
        ("high", "high", "high"): "Good"
    }
    
    # Look up the skill level in the decision matrix
    skill_level = decision_matrix[(letter_formation_category, vowel_symbol_category, punctuation_category)]
    
    return {
        "skill_level": skill_level,
        "letter_formation_score": cnn_output_score,
        "vowel_symbol_score": vowel_symbol_score,
        "punctuation_score": punctuation_score,
    }
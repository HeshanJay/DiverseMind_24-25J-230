import React, { useState, useEffect } from "react";
import axios from "axios";

import WritingCanvas_MadhyaAkshara1 from "../Components/LetterFormationTest/WritingCanvas_MadhyaAkshara1";
import WritingCanvas_MadhyaAkshara2 from "../Components/LetterFormationTest/WritingCanvas_MadhyaAkshara2";
import WritingCanvas_AarohanaAkshara1 from "../Components/LetterFormationTest/WritingCanvas_AarohanaAkshara1";
import WritingCanvas_AarohanaAkshara2 from "../Components/LetterFormationTest/WritingCanvas_AarohanaAkshara2";
import WritingCanvas_AvarohanaAkshara1 from "../Components/LetterFormationTest/WritingCanvas_AvarohanaAkshara1";
import WritingCanvas_AvarohanaAkshara2 from "../Components/LetterFormationTest/WritingCanvas_AvarohanaAkshara2";

import VowelSymbolQ1 from "../Components/VowelSymbolTest/VowelSymbolQ1";
import VowelSymbolQ2 from "../Components/VowelSymbolTest/VowelSymbolQ2";
import VowelSymbolQ3 from "../Components/VowelSymbolTest/VowelSymbolQ3";
import VowelSymbolQ4 from "../Components/VowelSymbolTest/VowelSymbolQ4";
import VowelSymbolQ5 from "../Components/VowelSymbolTest/VowelSymbolQ5";
import VowelSymbolQ6 from "../Components/VowelSymbolTest/VowelSymbolQ6";
import VowelSymbolQ7 from "../Components/VowelSymbolTest/VowelSymbolQ7";
import VowelSymbolQ8 from "../Components/VowelSymbolTest/VowelSymbolQ8";
import VowelSymbolQ9 from "../Components/VowelSymbolTest/VowelSymbolQ9";
import VowelSymbolQ10 from "../Components/VowelSymbolTest/VowelSymbolQ10";

import PunctuationsTestQ1 from "../Components/PunctuationsTest/PunctuationsTestQ1";
import PunctuationsTestQ2 from "../Components/PunctuationsTest/PunctuationsTestQ2";
import PunctuationsTestQ3 from "../Components/PunctuationsTest/PunctuationsTestQ3";
import PunctuationsTestQ4 from "../Components/PunctuationsTest/PunctuationsTestQ4";
import PunctuationsTestQ5 from "../Components/PunctuationsTest/PunctuationsTestQ5";

const WritingTest = () => {
  const [currentComponent, setCurrentComponent] = useState(1);
  const [images, setImages] = useState([]); // Store the 6 letter images

  // Scores
  const [cnnOutputScore, setCnnOutputScore] = useState(0); // Letter formation
  const [vowelSymbolScore, setVowelSymbolScore] = useState(0); // Out of 10
  const [punctuationScore, setPunctuationScore] = useState(0); // Out of 10 (6 from Q1 + 1 each from Q2-Q5)

  const loadNextComponent = () => {
    setCurrentComponent((prev) => prev + 1);
    console.log("Switched to Component:", currentComponent + 1);
  };

  const loadPreviousComponent = () => {
    setCurrentComponent((prev) => (prev > 1 ? prev - 1 : prev));
    console.log("Switched to Component:", currentComponent - 1);
  };

  // Submit the 6 letter images and get predictions
  const submitAllImages = async () => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      const dataUrl = images[i];
      const blob = await (await fetch(dataUrl)).blob();
      formData.append("images", blob, `letter${i + 1}.png`);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Prediction:", response.data);
      alert(JSON.stringify(response.data));

      if (response.data && typeof response.data.total_score === "number") {
        setCnnOutputScore(response.data.total_score);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleNextLetterImage = (imageData) => {
    if (imageData) {
      setImages((prev) => [...prev, imageData]);
    }
    setCurrentComponent((prev) => prev + 1);
  };

  useEffect(() => {
    if (images.length === 6) {
      submitAllImages();
    }
  }, [images]);

  // Vowel Symbol Answers
  const handleVowelSymbolAnswer = (questionIndex, userAnswer) => {
    const correctVowelSymbolAnswers = [
      "මා",
      "රි",
      "බි",
      "කු",
      "කෞ",
      "කෙටි ඉස්පිල්ල, ඇලපිල්ල",
      "කෙටි ඇදපිල්ල, කෙටි ඉස්පිල්ල, ඇලපිල්ල",
      "දික් ඇදපිල්ල, ඇලපිල්ල",
      "දික් කොන් පාපිල්ල, කෙටි ඉස්පිල්ල, ඇලපිල්ල",
      "කෙටි වක් පාපිල්ල, ඇලපිල්ල, කෙටි ඉස්පිල්ල, කෙටි කොන් පාපිල්ල",
    ];

    if (userAnswer === correctVowelSymbolAnswers[questionIndex]) {
      setVowelSymbolScore((prev) => prev + 1);
    }
    loadNextComponent();
  };

  // Punctuation Scores
  // Q1 returns a score out of 6
  // Q2-Q5 return 1 or 0
  const handlePunctuationScore = (score) => {
    setPunctuationScore((prev) => prev + score);
    loadNextComponent();
  };

  // After completing the last component (PunctuationsTestQ5),
  // currentComponent will become 22 (assuming Q5 is at 21).
  // We'll trigger final evaluation then.
  useEffect(() => {
    if (currentComponent === 22) {
      // All tests done, fetch final evaluation
      const fetchFinalEvaluation = async () => {
        const payload = {
          cnn_output_score: cnnOutputScore,
          vowel_symbol_score: vowelSymbolScore,
          punctuation_score: punctuationScore,
        };
        try {
          const response = await fetch(
            "http://127.0.0.1:8000/final_evaluation",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
          );
          const result = await response.json();
          alert("Final Result: " + JSON.stringify(result));
        } catch (err) {
          console.error("Error fetching final evaluation:", err);
        }
      };
      fetchFinalEvaluation();
    }
  }, [currentComponent, cnnOutputScore, vowelSymbolScore, punctuationScore]);

  return (
    <div>
      {/* Letter Formation Test */}
      {currentComponent === 1 && (
        <WritingCanvas_MadhyaAkshara1
          onNext={handleNextLetterImage}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 2 && (
        <WritingCanvas_MadhyaAkshara2
          onNext={handleNextLetterImage}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 3 && (
        <WritingCanvas_AarohanaAkshara1
          onNext={handleNextLetterImage}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 4 && (
        <WritingCanvas_AarohanaAkshara2
          onNext={handleNextLetterImage}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 5 && (
        <WritingCanvas_AvarohanaAkshara1
          onNext={handleNextLetterImage}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 6 && (
        <WritingCanvas_AvarohanaAkshara2
          onNext={handleNextLetterImage}
          onBack={loadPreviousComponent}
        />
      )}

      {/* Vowel Symbol Test (Q1-Q10) */}
      {currentComponent === 7 && (
        <VowelSymbolQ1
          onBack={loadPreviousComponent}
          onAnswer={(answer) => handleVowelSymbolAnswer(0, answer)}
        />
      )}
      {currentComponent === 8 && (
        <VowelSymbolQ2
          onBack={loadPreviousComponent}
          onAnswer={(answer) => handleVowelSymbolAnswer(1, answer)}
        />
      )}
      {currentComponent === 9 && (
        <VowelSymbolQ3
          onBack={loadPreviousComponent}
          onAnswer={(answer) => handleVowelSymbolAnswer(2, answer)}
        />
      )}
      {currentComponent === 10 && (
        <VowelSymbolQ4
          onBack={loadPreviousComponent}
          onAnswer={(answer) => handleVowelSymbolAnswer(3, answer)}
        />
      )}
      {currentComponent === 11 && (
        <VowelSymbolQ5
          onBack={loadPreviousComponent}
          onAnswer={(answer) => handleVowelSymbolAnswer(4, answer)}
        />
      )}
      {currentComponent === 12 && (
        <VowelSymbolQ6
          onBack={loadPreviousComponent}
          onAnswer={(answer) => handleVowelSymbolAnswer(5, answer)}
        />
      )}
      {currentComponent === 13 && (
        <VowelSymbolQ7
          onBack={loadPreviousComponent}
          onAnswer={(answer) => handleVowelSymbolAnswer(6, answer)}
        />
      )}
      {currentComponent === 14 && (
        <VowelSymbolQ8
          onBack={loadPreviousComponent}
          onAnswer={(answer) => handleVowelSymbolAnswer(7, answer)}
        />
      )}
      {currentComponent === 15 && (
        <VowelSymbolQ9
          onBack={loadPreviousComponent}
          onAnswer={(answer) => handleVowelSymbolAnswer(8, answer)}
        />
      )}
      {currentComponent === 16 && (
        <VowelSymbolQ10
          onBack={loadPreviousComponent}
          onAnswer={(answer) => handleVowelSymbolAnswer(9, answer)}
        />
      )}

      {/* Punctuations Test (Q1-Q5) */}
      {currentComponent === 17 && (
        <PunctuationsTestQ1
          onBack={loadPreviousComponent}
          onAnswer={(score) => handlePunctuationScore(score)}
        />
      )}
      {currentComponent === 18 && (
        <PunctuationsTestQ2
          onBack={loadPreviousComponent}
          onAnswer={(score) => handlePunctuationScore(score)}
        />
      )}
      {currentComponent === 19 && (
        <PunctuationsTestQ3
          onBack={loadPreviousComponent}
          onAnswer={(score) => handlePunctuationScore(score)}
        />
      )}
      {currentComponent === 20 && (
        <PunctuationsTestQ4
          onBack={loadPreviousComponent}
          onAnswer={(score) => handlePunctuationScore(score)}
        />
      )}
      {currentComponent === 21 && (
        <PunctuationsTestQ5
          onBack={loadPreviousComponent}
          onAnswer={(score) => handlePunctuationScore(score)}
        />
      )}
    </div>
  );
};

export default WritingTest;

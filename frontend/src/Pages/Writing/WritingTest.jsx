// import React, { useState, useEffect } from "react";
// import axios from "axios";

// // Import your letter formation and punctuation test components
// import WritingCanvas_MadhyaAkshara1 from "../../Components/WritingComponents/LetterFormationTest/WritingCanvas_MadhyaAkshara1";
// import WritingCanvas_MadhyaAkshara2 from "../../Components/WritingComponents/LetterFormationTest/WritingCanvas_MadhyaAkshara2";
// import WritingCanvas_AarohanaAkshara1 from "../../Components/WritingComponents/LetterFormationTest/WritingCanvas_AarohanaAkshara1";
// import WritingCanvas_AarohanaAkshara2 from "../../Components/WritingComponents/LetterFormationTest/WritingCanvas_AarohanaAkshara2";
// import WritingCanvas_AvarohanaAkshara1 from "../../Components/WritingComponents/LetterFormationTest/WritingCanvas_AvarohanaAkshara1";
// import WritingCanvas_AvarohanaAkshara2 from "../../Components/WritingComponents/LetterFormationTest/WritingCanvas_AvarohanaAkshara2";

// import VowelSymbolQ1 from "../../Components/WritingComponents/VowelSymbolTest/VowelSymbolQ1";
// import VowelSymbolQ2 from "../../Components/WritingComponents/VowelSymbolTest/VowelSymbolQ2";
// import VowelSymbolQ3 from "../../Components/WritingComponents/VowelSymbolTest/VowelSymbolQ3";
// import VowelSymbolQ4 from "../../Components/WritingComponents/VowelSymbolTest/VowelSymbolQ4";
// import VowelSymbolQ5 from "../../Components/WritingComponents/VowelSymbolTest/VowelSymbolQ5";
// import VowelSymbolQ6 from "../../Components/WritingComponents/VowelSymbolTest/VowelSymbolQ6";
// import VowelSymbolQ7 from "../../Components/WritingComponents/VowelSymbolTest/VowelSymbolQ7";
// import VowelSymbolQ8 from "../../Components/WritingComponents/VowelSymbolTest/VowelSymbolQ8";
// import VowelSymbolQ9 from "../../Components/WritingComponents/VowelSymbolTest/VowelSymbolQ9";
// import VowelSymbolQ10 from "../../Components/WritingComponents/VowelSymbolTest/VowelSymbolQ10";

// import PunctuationsTestQ1 from "../../Components/WritingComponents/PunctuationsTest/PunctuationsTestQ1";
// import PunctuationsTestQ2 from "../../Components/WritingComponents/PunctuationsTest/PunctuationsTestQ2";
// import PunctuationsTestQ3 from "../../Components/WritingComponents/PunctuationsTest/PunctuationsTestQ3";
// import PunctuationsTestQ4 from "../../Components/WritingComponents/PunctuationsTest/PunctuationsTestQ4";
// import PunctuationsTestQ5 from "../../Components/WritingComponents/PunctuationsTest/PunctuationsTestQ5";

// import WritingFinalPrediction from "../../Components/WritingComponents/WritingFinalFeedback/WritingFinalFeedback";

// const WritingTest = () => {
//   const [currentComponent, setCurrentComponent] = useState(1);
//   const [images, setImages] = useState([]); // Store the 6 letter images
//   const [showReportView, setShowReportView] = useState(false);

//   // Scores
//   const [cnnOutputScore, setCnnOutputScore] = useState(0);
//   const [vowelSymbolScore, setVowelSymbolScore] = useState(0);
//   const [punctuationScore, setPunctuationScore] = useState(0);

//   const [finalPrediction, setFinalPrediction] = useState(null);
//   const [showPopup, setShowPopup] = useState(false);

//   const loadNextComponent = () => {
//     setCurrentComponent((prev) => prev + 1);
//     console.log("Switched to Component:", currentComponent + 1);
//   };

//   const loadPreviousComponent = () => {
//     setCurrentComponent((prev) => (prev > 1 ? prev - 1 : prev));
//     console.log("Switched to Component:", currentComponent - 1);
//   };

//   const submitAllImages = async () => {
//     const formData = new FormData();
//     for (let i = 0; i < images.length; i++) {
//       const dataUrl = images[i];
//       const blob = await (await fetch(dataUrl)).blob();
//       formData.append("images", blob, `letter${i + 1}.png`);
//     }

//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/predict_letters",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       if (response.data && typeof response.data.total_score === "number") {
//         setCnnOutputScore(response.data.total_score);
//       }
//     } catch (error) {
//       console.error("Error uploading images:", error);
//       alert(
//         "An error occurred while submitting images. Check console logs for details."
//       );
//     }
//   };

//   const handleNextLetterImage = (imageData) => {
//     if (imageData) {
//       setImages((prev) => [...prev, imageData]);
//     }
//     setCurrentComponent((prev) => prev + 1);
//   };

//   // Once we have 6 images, do the letter formation prediction
//   useEffect(() => {
//     if (images.length === 6) {
//       submitAllImages();
//     }
//   }, [images]);

//   const handleVowelSymbolAnswer = (questionIndex, userAnswer) => {
//     const correctVowelSymbolAnswers = [
//       "මා",
//       "රි",
//       "බි",
//       "කු",
//       "කෞ",
//       "ඇලපිල්ල, කෙටි ඉස්පිල්ල",
//       "කෙටි ඇදපිල්ල, කෙටි ඉස්පිල්ල, ඇලපිල්ල",
//       "දික් ඇදපිල්ල, ඇලපිල්ල",
//       "දික් කොන් පාපිල්ල, කෙටි ඉස්පිල්ල, ඇලපිල්ල",
//       "කෙටි වක් පාපිල්ල, ඇලපිල්ල, කෙටි ඉස්පිල්ල, කෙටි කොන් පාපිල්ල",
//     ];

//     if (userAnswer === correctVowelSymbolAnswers[questionIndex]) {
//       setVowelSymbolScore((prev) => prev + 1);
//     }
//     loadNextComponent();
//   };

//   const handlePunctuationScore = (score) => {
//     setPunctuationScore((prev) => prev + score);
//     loadNextComponent();
//   };

//   const handleFinalEvaluation = async () => {
//     const payload = {
//       cnn_output_score: cnnOutputScore,
//       vowel_symbol_score: vowelSymbolScore,
//       punctuation_score: punctuationScore,
//     };

//     try {
//       const response = await fetch(
//         "http://127.0.0.1:8000/final_writing_evaluation",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );
//       const result = await response.json();

//       // Show final results
//       setFinalPrediction(result);
//       setShowPopup(true);
//     } catch (err) {
//       console.error("Error fetching final evaluation:", err);
//     }
//   };

//   // if final step is at component=22, do final evaluation automatically
//   useEffect(() => {
//     if (currentComponent === 22) {
//       handleFinalEvaluation();
//     }
//   }, [currentComponent]);

//   const handleFinalEvaluationAndSave = async (tempPuncScore) => {
//     const combinedPunctuation = punctuationScore + tempPuncScore;

//     const payload = {
//       cnn_output_score: cnnOutputScore,
//       vowel_symbol_score: vowelSymbolScore,
//       punctuation_score: combinedPunctuation,
//     };

//     try {
//       // 1) Final evaluation
//       const response = await fetch(
//         "http://127.0.0.1:8000/final_writing_evaluation",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(payload),
//         }
//       );
//       const finalData = await response.json();
//       console.log("Final Evaluation:", finalData);

//       // 2) Save to DB
//       const report = {
//         skill_level: finalData.skill_level,
//         letter_formation_score: finalData.letter_formation_score,
//         vowel_symbol_score: finalData.vowel_symbol_score,
//         punctuation_score: finalData.punctuation_score,
//       };

//       const saveResponse = await fetch(
//         "http://127.0.0.1:8000/save_writing_results",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(report),
//         }
//       );
//       const saveData = await saveResponse.json();
//       console.log("Save Response:", saveData);

//       // Optionally show popup with finalData
//       setFinalPrediction(finalData);
//       setShowPopup(true);
//     } catch (error) {
//       console.error("Error in finalEvaluationAndSave:", error);
//       alert("Error occurred during final evaluation or saving. See console.");
//     }
//   };

//   return (
//     <div>
//       {/* 1) Letter Formation Test */}
//       {currentComponent === 1 && (
//         <WritingCanvas_MadhyaAkshara1
//           onNext={handleNextLetterImage}
//           onBack={loadPreviousComponent}
//         />
//       )}
//       {currentComponent === 2 && (
//         <WritingCanvas_MadhyaAkshara2
//           onNext={handleNextLetterImage}
//           onBack={loadPreviousComponent}
//         />
//       )}
//       {currentComponent === 3 && (
//         <WritingCanvas_AarohanaAkshara1
//           onNext={handleNextLetterImage}
//           onBack={loadPreviousComponent}
//         />
//       )}
//       {currentComponent === 4 && (
//         <WritingCanvas_AarohanaAkshara2
//           onNext={handleNextLetterImage}
//           onBack={loadPreviousComponent}
//         />
//       )}
//       {currentComponent === 5 && (
//         <WritingCanvas_AvarohanaAkshara1
//           onNext={handleNextLetterImage}
//           onBack={loadPreviousComponent}
//         />
//       )}
//       {currentComponent === 6 && (
//         <WritingCanvas_AvarohanaAkshara2
//           onNext={handleNextLetterImage}
//           onBack={loadPreviousComponent}
//         />
//       )}

//       {/* 2) Vowel Symbol Test */}
//       {currentComponent === 7 && (
//         <VowelSymbolQ1
//           onBack={loadPreviousComponent}
//           onAnswer={(answer) => handleVowelSymbolAnswer(0, answer)}
//         />
//       )}
//       {currentComponent === 8 && (
//         <VowelSymbolQ2
//           onBack={loadPreviousComponent}
//           onAnswer={(answer) => handleVowelSymbolAnswer(1, answer)}
//         />
//       )}
//       {currentComponent === 9 && (
//         <VowelSymbolQ3
//           onBack={loadPreviousComponent}
//           onAnswer={(answer) => handleVowelSymbolAnswer(2, answer)}
//         />
//       )}
//       {currentComponent === 10 && (
//         <VowelSymbolQ4
//           onBack={loadPreviousComponent}
//           onAnswer={(answer) => handleVowelSymbolAnswer(3, answer)}
//         />
//       )}
//       {currentComponent === 11 && (
//         <VowelSymbolQ5
//           onBack={loadPreviousComponent}
//           onAnswer={(answer) => handleVowelSymbolAnswer(4, answer)}
//         />
//       )}
//       {currentComponent === 12 && (
//         <VowelSymbolQ6
//           onBack={loadPreviousComponent}
//           onAnswer={(answer) => handleVowelSymbolAnswer(5, answer)}
//         />
//       )}
//       {currentComponent === 13 && (
//         <VowelSymbolQ7
//           onBack={loadPreviousComponent}
//           onAnswer={(answer) => handleVowelSymbolAnswer(6, answer)}
//         />
//       )}
//       {currentComponent === 14 && (
//         <VowelSymbolQ8
//           onBack={loadPreviousComponent}
//           onAnswer={(answer) => handleVowelSymbolAnswer(7, answer)}
//         />
//       )}
//       {currentComponent === 15 && (
//         <VowelSymbolQ9
//           onBack={loadPreviousComponent}
//           onAnswer={(answer) => handleVowelSymbolAnswer(8, answer)}
//         />
//       )}
//       {currentComponent === 16 && (
//         <VowelSymbolQ10
//           onBack={loadPreviousComponent}
//           onAnswer={(answer) => handleVowelSymbolAnswer(9, answer)}
//         />
//       )}

//       {/* 3) Punctuations Test */}
//       {currentComponent === 17 && (
//         <PunctuationsTestQ1
//           onBack={loadPreviousComponent}
//           onAnswer={(score) => handlePunctuationScore(score)}
//         />
//       )}
//       {currentComponent === 18 && (
//         <PunctuationsTestQ2
//           onBack={loadPreviousComponent}
//           onAnswer={(score) => handlePunctuationScore(score)}
//         />
//       )}
//       {currentComponent === 19 && (
//         <PunctuationsTestQ3
//           onBack={loadPreviousComponent}
//           onAnswer={(score) => handlePunctuationScore(score)}
//         />
//       )}
//       {currentComponent === 20 && (
//         <PunctuationsTestQ4
//           onBack={loadPreviousComponent}
//           onAnswer={(score) => handlePunctuationScore(score)}
//         />
//       )}
//       {currentComponent === 21 && (
//         <PunctuationsTestQ5
//           onBack={loadPreviousComponent}
//           onAnswer={(score) => {
//             setPunctuationScore((prev) => prev + score);
//             loadNextComponent();
//           }}
//           onFinalEvalAndSave={handleFinalEvaluationAndSave}
//         />
//       )}

//       {/* Final Popup */}
//       {showPopup && (
//         <WritingFinalPrediction
//           finalPredictionData={finalPrediction}
//           onClose={() => setShowPopup(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default WritingTest;

import React, { useState, useEffect } from "react";
import axios from "axios";

// 1) Intro Component
import WrtingIntro from "../../Components/WritingComponents/WritingIntro/WritingIntro";

// 2) Letter Formation Components
import WritingCanvas_MadhyaAkshara1 from "../../Components/WritingComponents/LetterFormationTest/WritingCanvas_MadhyaAkshara1";
import WritingCanvas_MadhyaAkshara2 from "../../Components/WritingComponents/LetterFormationTest/WritingCanvas_MadhyaAkshara2";
import WritingCanvas_AarohanaAkshara1 from "../../Components/WritingComponents/LetterFormationTest/WritingCanvas_AarohanaAkshara1";
import WritingCanvas_AarohanaAkshara2 from "../../Components/WritingComponents/LetterFormationTest/WritingCanvas_AarohanaAkshara2";
import WritingCanvas_AvarohanaAkshara1 from "../../Components/WritingComponents/LetterFormationTest/WritingCanvas_AvarohanaAkshara1";
import WritingCanvas_AvarohanaAkshara2 from "../../Components/WritingComponents/LetterFormationTest/WritingCanvas_AvarohanaAkshara2";

// 3) Vowel Symbol Components
import VowelSymbolQ1 from "../../Components/WritingComponents/VowelSymbolTest/VowelSymbolQ1";
import VowelSymbolQ2 from "../../Components/WritingComponents/VowelSymbolTest/VowelSymbolQ2";
import VowelSymbolQ3 from "../../Components/WritingComponents/VowelSymbolTest/VowelSymbolQ3";
import VowelSymbolQ4 from "../../Components/WritingComponents/VowelSymbolTest/VowelSymbolQ4";
import VowelSymbolQ5 from "../../Components/WritingComponents/VowelSymbolTest/VowelSymbolQ5";
import VowelSymbolQ6 from "../../Components/WritingComponents/VowelSymbolTest/VowelSymbolQ6";
import VowelSymbolQ7 from "../../Components/WritingComponents/VowelSymbolTest/VowelSymbolQ7";
import VowelSymbolQ8 from "../../Components/WritingComponents/VowelSymbolTest/VowelSymbolQ8";
import VowelSymbolQ9 from "../../Components/WritingComponents/VowelSymbolTest/VowelSymbolQ9";
import VowelSymbolQ10 from "../../Components/WritingComponents/VowelSymbolTest/VowelSymbolQ10";

// 4) Punctuation Test Components
import PunctuationsTestQ1 from "../../Components/WritingComponents/PunctuationsTest/PunctuationsTestQ1";
import PunctuationsTestQ2 from "../../Components/WritingComponents/PunctuationsTest/PunctuationsTestQ2";
import PunctuationsTestQ3 from "../../Components/WritingComponents/PunctuationsTest/PunctuationsTestQ3";
import PunctuationsTestQ4 from "../../Components/WritingComponents/PunctuationsTest/PunctuationsTestQ4";
import PunctuationsTestQ5 from "../../Components/WritingComponents/PunctuationsTest/PunctuationsTestQ5";

// 5) Final Feedback
import WritingFinalPrediction from "../../Components/WritingComponents/WritingFinalFeedback/WritingFinalFeedback";

const WritingTest = () => {
  // Start at component 1 -> WrtingIntro
  const [currentComponent, setCurrentComponent] = useState(1);

  // Letter Formation images (6 total)
  const [images, setImages] = useState([]);

  // Scores
  const [cnnOutputScore, setCnnOutputScore] = useState(0);
  const [vowelSymbolScore, setVowelSymbolScore] = useState(0);
  const [punctuationScore, setPunctuationScore] = useState(0);

  const [finalPrediction, setFinalPrediction] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Move to the next component
  const loadNextComponent = () => {
    setCurrentComponent((prev) => prev + 1);
    console.log("Switched to Component:", currentComponent + 1);
  };

  // Go back to the previous component
  const loadPreviousComponent = () => {
    setCurrentComponent((prev) => (prev > 1 ? prev - 1 : prev));
    console.log("Switched to Component:", currentComponent - 1);
  };

  // Submit the 6 letter images to the server
  const submitAllImages = async () => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      const dataUrl = images[i];
      const blob = await (await fetch(dataUrl)).blob();
      formData.append("images", blob, `letter${i + 1}.png`);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict_letters",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data && typeof response.data.total_score === "number") {
        setCnnOutputScore(response.data.total_score);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      alert(
        "An error occurred while submitting images. Check console logs for details."
      );
    }
  };

  // Collect each letter image and proceed
  const handleNextLetterImage = (imageData) => {
    if (imageData) {
      setImages((prev) => [...prev, imageData]);
    }
    loadNextComponent();
  };

  // Once 6 images are collected, do letter formation prediction
  useEffect(() => {
    if (images.length === 6) {
      submitAllImages();
    }
  }, [images]);

  // Vowel Symbol Test => Compare user answers to correct ones
  const handleVowelSymbolAnswer = (questionIndex, userAnswer) => {
    const correctVowelSymbolAnswers = [
      "මා",
      "රි",
      "බි",
      "කු",
      "කෞ",
      "ඇලපිල්ල, කෙටි ඉස්පිල්ල",
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

  // Punctuation Test => Accumulate correct scores
  const handlePunctuationScore = (score) => {
    setPunctuationScore((prev) => prev + score);
    loadNextComponent();
  };

  // Final Summation => Called automatically at step 22
  const handleFinalEvaluation = async () => {
    const payload = {
      cnn_output_score: cnnOutputScore,
      vowel_symbol_score: vowelSymbolScore,
      punctuation_score: punctuationScore,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/final_writing_evaluation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();

      // Show final results
      setFinalPrediction(result);
      setShowPopup(true);
    } catch (err) {
      console.error("Error fetching final evaluation:", err);
    }
  };

  // If currentComponent hits 22, automatically do final evaluation
  useEffect(() => {
    if (currentComponent === 22) {
      handleFinalEvaluation();
    }
  }, [currentComponent]);

  // Specifically used in PunctuationsTestQ5 to finalize & save
  const handleFinalEvaluationAndSave = async (tempPuncScore) => {
    const combinedPunctuation = punctuationScore + tempPuncScore;

    const payload = {
      cnn_output_score: cnnOutputScore,
      vowel_symbol_score: vowelSymbolScore,
      punctuation_score: combinedPunctuation,
    };

    try {
      // 1) Final evaluation
      const response = await fetch(
        "http://127.0.0.1:8000/final_writing_evaluation",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const finalData = await response.json();
      console.log("Final Evaluation:", finalData);

      // 2) Save to DB
      const report = {
        skill_level: finalData.skill_level,
        letter_formation_score: finalData.letter_formation_score,
        vowel_symbol_score: finalData.vowel_symbol_score,
        punctuation_score: finalData.punctuation_score,
      };

      const saveResponse = await fetch(
        "http://127.0.0.1:8000/save_writing_results",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(report),
        }
      );
      const saveData = await saveResponse.json();
      console.log("Save Response:", saveData);

      // Show popup with finalData
      setFinalPrediction(finalData);
      setShowPopup(true);
    } catch (error) {
      console.error("Error in finalEvaluationAndSave:", error);
      alert("Error occurred during final evaluation or saving. See console.");
    }
  };

  return (
    <div>
      {/* INTRO PAGE (component=1) */}
      {currentComponent === 1 && (
        <WrtingIntro
          // Pass a callback to move to next step when "ආරම්භ කරමු" is clicked
          onStartTest={loadNextComponent}
        />
      )}

      {/* 1) LETTER FORMATION (6 STEPS) */}
      {currentComponent === 2 && (
        <WritingCanvas_MadhyaAkshara1
          onNext={handleNextLetterImage}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 3 && (
        <WritingCanvas_MadhyaAkshara2
          onNext={handleNextLetterImage}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 4 && (
        <WritingCanvas_AarohanaAkshara1
          onNext={handleNextLetterImage}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 5 && (
        <WritingCanvas_AarohanaAkshara2
          onNext={handleNextLetterImage}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 6 && (
        <WritingCanvas_AvarohanaAkshara1
          onNext={handleNextLetterImage}
          onBack={loadPreviousComponent}
        />
      )}
      {currentComponent === 7 && (
        <WritingCanvas_AvarohanaAkshara2
          onNext={handleNextLetterImage}
          onBack={loadPreviousComponent}
        />
      )}

      {/* 2) VOWEL SYMBOL TEST (10 QUESTIONS) */}
      {currentComponent === 8 && (
        <VowelSymbolQ1
          onBack={loadPreviousComponent}
          onAnswer={(ans) => handleVowelSymbolAnswer(0, ans)}
        />
      )}
      {currentComponent === 9 && (
        <VowelSymbolQ2
          onBack={loadPreviousComponent}
          onAnswer={(ans) => handleVowelSymbolAnswer(1, ans)}
        />
      )}
      {currentComponent === 10 && (
        <VowelSymbolQ3
          onBack={loadPreviousComponent}
          onAnswer={(ans) => handleVowelSymbolAnswer(2, ans)}
        />
      )}
      {currentComponent === 11 && (
        <VowelSymbolQ4
          onBack={loadPreviousComponent}
          onAnswer={(ans) => handleVowelSymbolAnswer(3, ans)}
        />
      )}
      {currentComponent === 12 && (
        <VowelSymbolQ5
          onBack={loadPreviousComponent}
          onAnswer={(ans) => handleVowelSymbolAnswer(4, ans)}
        />
      )}
      {currentComponent === 13 && (
        <VowelSymbolQ6
          onBack={loadPreviousComponent}
          onAnswer={(ans) => handleVowelSymbolAnswer(5, ans)}
        />
      )}
      {currentComponent === 14 && (
        <VowelSymbolQ7
          onBack={loadPreviousComponent}
          onAnswer={(ans) => handleVowelSymbolAnswer(6, ans)}
        />
      )}
      {currentComponent === 15 && (
        <VowelSymbolQ8
          onBack={loadPreviousComponent}
          onAnswer={(ans) => handleVowelSymbolAnswer(7, ans)}
        />
      )}
      {currentComponent === 16 && (
        <VowelSymbolQ9
          onBack={loadPreviousComponent}
          onAnswer={(ans) => handleVowelSymbolAnswer(8, ans)}
        />
      )}
      {currentComponent === 17 && (
        <VowelSymbolQ10
          onBack={loadPreviousComponent}
          onAnswer={(ans) => handleVowelSymbolAnswer(9, ans)}
        />
      )}

      {/* 3) PUNCTUATION TEST (5 QUESTIONS) */}
      {currentComponent === 18 && (
        <PunctuationsTestQ1
          onBack={loadPreviousComponent}
          onAnswer={handlePunctuationScore}
        />
      )}
      {currentComponent === 19 && (
        <PunctuationsTestQ2
          onBack={loadPreviousComponent}
          onAnswer={handlePunctuationScore}
        />
      )}
      {currentComponent === 20 && (
        <PunctuationsTestQ3
          onBack={loadPreviousComponent}
          onAnswer={handlePunctuationScore}
        />
      )}
      {currentComponent === 21 && (
        <PunctuationsTestQ4
          onBack={loadPreviousComponent}
          onAnswer={handlePunctuationScore}
        />
      )}
      {currentComponent === 22 && (
        <PunctuationsTestQ5
          onBack={loadPreviousComponent}
          onAnswer={(score) => {
            setPunctuationScore((prev) => prev + score);
            loadNextComponent(); // This goes to step 23 => triggers final evaluation
          }}
          onFinalEvalAndSave={handleFinalEvaluationAndSave}
        />
      )}

      {/* 4) FINAL POPUP */}
      {showPopup && (
        <WritingFinalPrediction
          finalPredictionData={finalPrediction}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default WritingTest;

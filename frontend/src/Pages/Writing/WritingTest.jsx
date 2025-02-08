// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

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

// import WritingFinalPrediction from "../../Components/WritingComponents/WritingFinalPrediction/WritingFinalPrediction";
// import ReportView from "../Report/ReportView";

// const WritingTest = () => {
//   const [currentComponent, setCurrentComponent] = useState(1);
//   const [images, setImages] = useState([]); // Store the 6 letter images
//   const [showReportView, setShowReportView] = useState(false);

//   // Scores
//   const [cnnOutputScore, setCnnOutputScore] = useState(0); // Letter formation
//   const [vowelSymbolScore, setVowelSymbolScore] = useState(0); // Out of 10
//   const [punctuationScore, setPunctuationScore] = useState(0); // Out of 10 (6 from Q1 + 1 each from Q2-Q5)

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

//   // Submit the 6 letter images and get predictions
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

//       // Log and show the response data in an alert
//       // console.log("Prediction Response:", response.data);
//       // alert("Prediction Response: " + JSON.stringify(response.data));

//       // Update the CNN output score
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

//   useEffect(() => {
//     if (images.length === 6) {
//       submitAllImages();
//     }
//   }, [images]);

//   // Vowel Symbol Answers
//   const handleVowelSymbolAnswer = (questionIndex, userAnswer) => {
//     const correctVowelSymbolAnswers = [
//       "මා",
//       "රි",
//       "බි",
//       "කු",
//       "කෞ",
//       "කෙටි ඉස්පිල්ල, ඇලපිල්ල",
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

//   // Punctuation Scores
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

//       // *** Make sure finalPrediction is set ***
//       setFinalPrediction(result);

//       // Show the popup
//       setShowPopup(true);
//     } catch (err) {
//       console.error("Error fetching final evaluation:", err);
//     }
//   };

//   useEffect(() => {
//     if (currentComponent === 22) {
//       handleFinalEvaluation();
//     }
//   }, [currentComponent]);

//   const handleViewReport = () => {
//     setShowReportView(true);
//     setShowPopup(false); // optionally hide the popup if you want
//   };

//   const handleSaveWritingResult = async () => {
//     if (!finalPrediction) {
//       alert("No final prediction data to save!");
//       return;
//     }

//     // Build the minimal object to send to /save_report
//     const report = {
//       skill_level: finalPrediction.skill_level,
//       letter_formation_score: finalPrediction.letter_formation_score,
//       vowel_symbol_score: finalPrediction.vowel_symbol_score,
//       punctuation_score: finalPrediction.punctuation_score,
//     };

//     try {
//       const response = await fetch(
//         "http://127.0.0.1:8000/save_writing_results",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(report),
//         }
//       );
//       const data = await response.json();

//       if (response.ok) {
//         alert("Data saved successfully! Inserted ID: " + data.inserted_id);
//       } else {
//         alert("Failed to save report: " + data.detail);
//       }
//     } catch (error) {
//       console.error("Save data error:", error);
//       alert("Error saving data: Check console.");
//     }
//   };

//   const onAnswerAndEval = (score) => {
//     // 1) Update punctuation
//     setPunctuationScore((prev) => {
//       const updatedPuncScore = prev + score;

//       // 2) Immediately call final eval with the updated score
//       handleFinalEvaluationAndSave(updatedPuncScore);

//       return updatedPuncScore;
//     });
//   };

//   const handleFinalEvaluationAndSave = async (tempPuncScore) => {
//     // Build the payload for final evaluation
//     const payload = {
//       cnn_output_score: cnnOutputScore,
//       vowel_symbol_score: vowelSymbolScore,
//       punctuation_score: tempPuncScore,
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

//       // 2) Save the finalData directly to DB
//       // Build the object for your "save_writing_results" endpoint
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

//       // if (saveResponse.ok) {
//       //   alert("Data saved successfully! Inserted ID: " + saveData.inserted_id);
//       // } else {
//       //   alert("Failed to save report: " + saveData.detail);
//       // }

//       // 3) (Optional) show the popup with finalData
//       setFinalPrediction(finalData);
//       setShowPopup(true);
//     } catch (error) {
//       console.error("Error in finalEvaluationAndSave:", error);
//       alert("Error occurred during final evaluation or saving. See console.");
//     }
//   };

//   return (
//     <div>
//       {/* Letter Formation Test */}
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

//       {/* Vowel Symbol Test (Q1-Q10) */}
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

//       {/* Punctuations Test (Q1-Q5) */}
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
//             handlePunctuationScore(score);
//           }}
//           onFinalEvalAndSave={handleFinalEvaluationAndSave}
//         />
//       )}

//       {/* Render final prediction popup */}
//       {showPopup && (
//         <WritingFinalPrediction
//           finalPredictionData={finalPrediction}
//           onClose={() => setShowPopup(false)}
//           onSave={handleSaveWritingResult}
//           onViewReport={handleViewReport} // pass the new callback
//         />
//       )}

//       {/* Render the PDF viewer if user clicked "View Report" */}
//       {showReportView && finalPrediction && (
//         <div className="p-4 m-4 border border-gray-300">
//           <h2 className="text-2xl font-bold mb-2">Professional PDF Preview</h2>
//           {/* Inline PDF viewer */}
//           <PDFViewer width={600} height={800}>
//             <ReportView
//               finalPredictionData={finalPrediction}
//               onSave={handleSaveReport}
//             />
//           </PDFViewer>

//           {/* Download link */}
//           <PDFDownloadLink
//             document={<ReportView finalPredictionData={finalPrediction} />}
//             fileName="DiverseMind-writing-report.pdf"
//           >
//             {({ blob, url, loading, error }) =>
//               loading ? "Preparing PDF..." : "Download PDF"
//             }
//           </PDFDownloadLink>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WritingTest;

import React, { useState, useEffect } from "react";
import axios from "axios";

// Import your letter formation and punctuation test components
import WritingCanvas_MadhyaAkshara1 from "../../Components/WritingComponents/LetterFormationTest/WritingCanvas_MadhyaAkshara1";
import WritingCanvas_MadhyaAkshara2 from "../../Components/WritingComponents/LetterFormationTest/WritingCanvas_MadhyaAkshara2";
import WritingCanvas_AarohanaAkshara1 from "../../Components/WritingComponents/LetterFormationTest/WritingCanvas_AarohanaAkshara1";
import WritingCanvas_AarohanaAkshara2 from "../../Components/WritingComponents/LetterFormationTest/WritingCanvas_AarohanaAkshara2";
import WritingCanvas_AvarohanaAkshara1 from "../../Components/WritingComponents/LetterFormationTest/WritingCanvas_AvarohanaAkshara1";
import WritingCanvas_AvarohanaAkshara2 from "../../Components/WritingComponents/LetterFormationTest/WritingCanvas_AvarohanaAkshara2";

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

import PunctuationsTestQ1 from "../../Components/WritingComponents/PunctuationsTest/PunctuationsTestQ1";
import PunctuationsTestQ2 from "../../Components/WritingComponents/PunctuationsTest/PunctuationsTestQ2";
import PunctuationsTestQ3 from "../../Components/WritingComponents/PunctuationsTest/PunctuationsTestQ3";
import PunctuationsTestQ4 from "../../Components/WritingComponents/PunctuationsTest/PunctuationsTestQ4";
import PunctuationsTestQ5 from "../../Components/WritingComponents/PunctuationsTest/PunctuationsTestQ5";

import WritingFinalPrediction from "../../Components/WritingComponents/WritingFinalFeedback/WritingFinalFeedback";

const WritingTest = () => {
  const [currentComponent, setCurrentComponent] = useState(1);
  const [images, setImages] = useState([]); // Store the 6 letter images
  const [showReportView, setShowReportView] = useState(false);

  // Scores
  const [cnnOutputScore, setCnnOutputScore] = useState(0);
  const [vowelSymbolScore, setVowelSymbolScore] = useState(0);
  const [punctuationScore, setPunctuationScore] = useState(0);

  const [finalPrediction, setFinalPrediction] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const loadNextComponent = () => {
    setCurrentComponent((prev) => prev + 1);
    console.log("Switched to Component:", currentComponent + 1);
  };

  const loadPreviousComponent = () => {
    setCurrentComponent((prev) => (prev > 1 ? prev - 1 : prev));
    console.log("Switched to Component:", currentComponent - 1);
  };

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

  const handleNextLetterImage = (imageData) => {
    if (imageData) {
      setImages((prev) => [...prev, imageData]);
    }
    setCurrentComponent((prev) => prev + 1);
  };

  // Once we have 6 images, do the letter formation prediction
  useEffect(() => {
    if (images.length === 6) {
      submitAllImages();
    }
  }, [images]);

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

  const handlePunctuationScore = (score) => {
    setPunctuationScore((prev) => prev + score);
    loadNextComponent();
  };

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

  // if final step is at component=22, do final evaluation automatically
  useEffect(() => {
    if (currentComponent === 22) {
      handleFinalEvaluation();
    }
  }, [currentComponent]);

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

      // Optionally show popup with finalData
      setFinalPrediction(finalData);
      setShowPopup(true);
    } catch (error) {
      console.error("Error in finalEvaluationAndSave:", error);
      alert("Error occurred during final evaluation or saving. See console.");
    }
  };

  return (
    <div>
      {/* 1) Letter Formation Test */}
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

      {/* 2) Vowel Symbol Test */}
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

      {/* 3) Punctuations Test */}
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
          onAnswer={(score) => {
            setPunctuationScore((prev) => prev + score);
            loadNextComponent();
          }}
          onFinalEvalAndSave={handleFinalEvaluationAndSave}
        />
      )}

      {/* Final Popup */}
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

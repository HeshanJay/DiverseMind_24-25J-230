import React, { useState, useEffect } from "react";
import { useScores } from "../../context/Score_context";

import Memory_Test from "../../Components/MemoryComponents/Memory_Test";
import VisualTest from "../../Components/MemoryComponents/visual_test";
import VisualTestActivity from "../../Components/MemoryComponents/visual_test_activity";
import MemoryMeasurementTest from "../../Components/MemoryComponents/memory_measurement_test";
import MemoryTestActivity from "../../Components/MemoryComponents/memory_test_activity";
import SpeedMeasurementTest from "../../Components/MemoryComponents/Speed_Measurement_Test";
import SpeedMeasurementActivity from "../../Components/MemoryComponents/Speed_Measurement_Activity";
import AudioTest from "../../Components/MemoryComponents/Audio_test";
import AudioMeasurementActivity from "../../Components/MemoryComponents/Audio_measurement_activity";
import LanguageVocabTest from "../../Components/MemoryComponents/Language_vocab_test";
import LanguageVocabActivity from "../../Components/MemoryComponents/Language_vocab_activity";
import MemoryFinal_Feedback from "../../Components/MemoryComponents/MemoryFinal_Feedback";

const WorkingMemory = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [predictionResult, setPredictionResult] = useState(null);
  const [submitted, setSubmitted] = useState(false); // prevents duplicate submissions

  const {
    visualDiscriminationScore,
    memoryScore,
    languageVocabScore,
    audioDiscriminationScore,
    speedScore,
  } = useScores();

  useEffect(() => {
    console.log("Current step:", currentStep);
  }, [currentStep]);

  const onNext = () => setCurrentStep((prev) => prev + 1);
  const onBack = () => setCurrentStep((prev) => (prev > 1 ? prev - 1 : 1));

  const sendDataToBackend = async (data) => {
    console.log("Sending data to backend:", data);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/save-memory-results/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }
      const result = await response.json();
      console.log("Memory results saved:", result);
      setCurrentStep(12);
    } catch (error) {
      console.error("Error sending data to backend:", error);
      alert(`Error sending data to backend: ${error.message}`);
    }
  };

  const handleAllFinished = async () => {
    // Prevent duplicate submission.
    if (submitted) return;
    setSubmitted(true);

    // Round the scores to two decimals.
    const roundedVisual = Number(visualDiscriminationScore.toFixed(2));
    const roundedMemory = Number(memoryScore.toFixed(2));
    const roundedLanguage = Number(languageVocabScore.toFixed(2));
    const roundedAudio = Number(audioDiscriminationScore.toFixed(2));
    const roundedSpeed = Number(speedScore.toFixed(2));

    // Retrieve the student ID from localStorage.
    const studentId = localStorage.getItem("student_id");

    const data = {
      student_id: studentId,
      visualDiscriminationScore: roundedVisual,
      memoryScore: roundedMemory,
      languageVocabScore: roundedLanguage,
      audioDiscriminationScore: roundedAudio,
      speedScore: roundedSpeed,
    };

    try {
      const predictionResponse = await fetch(
        "http://127.0.0.1:8000/working_memory_prediction/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Language_vocab: roundedLanguage,
            Memory: roundedMemory,
            Speed: roundedSpeed,
            Visual_discrimination: roundedVisual,
            Audio_Discrimination: roundedAudio,
          }),
        }
      );
      if (!predictionResponse.ok)
        throw new Error(`Server Error: ${predictionResponse.status}`);
      const predictionRes = await predictionResponse.json();
      data.prediction = predictionRes.prediction;
      setPredictionResult(predictionRes.prediction);
    } catch (error) {
      console.error("Error getting prediction:", error);
    }
    sendDataToBackend(data);
  };

  return (
    <>
      {currentStep === 1 && <Memory_Test onNext={onNext} />}
      {currentStep === 2 && <VisualTest onNext={onNext} onBack={onBack} />}
      {currentStep === 3 && (
        <VisualTestActivity onNext={onNext} onBack={onBack} />
      )}
      {currentStep === 4 && (
        <MemoryMeasurementTest onNext={onNext} onBack={onBack} />
      )}
      {currentStep === 5 && (
        <MemoryTestActivity onNext={onNext} onBack={onBack} />
      )}
      {currentStep === 6 && (
        <SpeedMeasurementTest onNext={onNext} onBack={onBack} />
      )}
      {currentStep === 7 && (
        <SpeedMeasurementActivity onNext={onNext} onBack={onBack} />
      )}
      {currentStep === 8 && <AudioTest onNext={onNext} onBack={onBack} />}
      {currentStep === 9 && (
        <AudioMeasurementActivity onNext={onNext} onBack={onBack} />
      )}
      {currentStep === 10 && (
        <LanguageVocabTest onNext={onNext} onBack={onBack} />
      )}
      {currentStep === 11 && (
        <LanguageVocabActivity
          onNext={onNext}
          onBack={onBack}
          onFinishAll={handleAllFinished}
        />
      )}
      {currentStep === 12 && (
        <MemoryFinal_Feedback predictionResult={predictionResult} />
      )}
    </>
  );
};

export default WorkingMemory;
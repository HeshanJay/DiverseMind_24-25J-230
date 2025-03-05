// WM_Game2_Level1.js (Parent Component)
import React, { useState } from "react";
import G2_L1_instructionPage from "../../../Components/MemoryComponents/WM_Game2Components/Level1/G2_L1_instructionPage";
import Activity from "../../../Components/MemoryComponents/WM_Game2Components/Level1/Activity1";
import G2_L1_Feedback from "../../../Components/MemoryComponents/WM_Game2Components/Level1/G2_L1_Feedback";

const WM_Game2_Level1 = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [score, setScore] = useState(0);

  const handleNext = (newScore) => {
    if (typeof newScore === 'number') {
      setScore(newScore);
      setCurrentStep(3);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleRetry = () => {
    setCurrentStep(2);
    setScore(0);
  };

  return (
    <>
      {currentStep === 1 && <G2_L1_instructionPage onNext={handleNext} />}
      {currentStep === 2 && <Activity onNext={handleNext} />}
      {currentStep === 3 && <G2_L1_Feedback totalScore={score} handleRetry={handleRetry} />}
    </>
  );
};

export default WM_Game2_Level1;
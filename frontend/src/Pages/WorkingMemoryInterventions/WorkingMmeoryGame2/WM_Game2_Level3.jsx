import React, { useState } from "react";
import G2_L3_instructionPage from "../../../Components/MemoryComponents/WM_Game2Components/Level3/G2_L3_instructionPage";
import Activity1 from "../../../Components/MemoryComponents/WM_Game2Components/Level3/Activity1";
import G2_L3_Feedback from "../../../Components/MemoryComponents/WM_Game2Components/Level3/G2_L3_Feedback";

const WM_Game2_Level3 = () => {
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
      {currentStep === 1 && <G2_L3_instructionPage onNext={handleNext} />}
      {currentStep === 2 && <Activity1 onNext={handleNext} />}
      {currentStep === 3 && <G2_L3_Feedback totalScore={score} handleRetry={handleRetry} />}
    </>
  );
};

export default WM_Game2_Level3;
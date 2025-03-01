import React, { useState, useEffect } from "react";
import G3_L1_instructionPage from "../../../Components/MemoryComponents/WM_Game3Components/Level1/G3_L1_instructionPage";
import Activity1 from "../../../Components/MemoryComponents/WM_Game3Components/Level1/Activity1";
import G3_L1_Feedback from "../../../Components/MemoryComponents/WM_Game3Components/Level1/G3_L1_Feedback";

const WM_Game3_Level1 = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [totalScore, setTotalScore] = useState(0);

  const handleRetry = () => {
    setCurrentStep(2); // Go back to activity
    setTotalScore(0);
  };

  return (
    <>
      {currentStep === 1 && <G3_L1_instructionPage onNext={() => setCurrentStep(2)} />}
      {currentStep === 2 && <Activity1 onNext={() => setCurrentStep(3)} setTotalScore={setTotalScore} />}
      {currentStep === 3 && <G3_L1_Feedback totalScore={totalScore} handleRetry={handleRetry} />}
    </>
  );
};

export default WM_Game3_Level1;

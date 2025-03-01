import React, { useState, useEffect } from "react";
import G3_L2_instructionPage from "../../../Components/MemoryComponents/WM_Game3Components/Level2/G3_L2_instructionPage";
import Activity1 from "../../../Components/MemoryComponents/WM_Game3Components/Level2/Activity1";
import G3_L2_Feedback from "../../../Components/MemoryComponents/WM_Game3Components/Level2/G3_L2_Feedback";

const WM_Game3_Level2 = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [totalScore, setTotalScore] = useState(0);

  const handleActivityComplete = (finalScore) => {
    setTotalScore(finalScore);
    setCurrentStep(3);
  };

  return (
    <>
      {currentStep === 1 && (
        <G3_L2_instructionPage onNext={() => setCurrentStep(2)} />
      )}
      {currentStep === 2 && (
        <Activity1 onNext={handleActivityComplete} />
      )}
      {currentStep === 3 && (
        <G3_L2_Feedback 
          totalScore={totalScore}
          handleRetry={() => {
            setTotalScore(0);
            setCurrentStep(2);
          }}
        />
      )}
    </>
  );
};

export default WM_Game3_Level2;
import React, { useState, useEffect } from "react";
import G2_L2_instructionPage from "../../../Components/MemoryComponents/WM_Game2Components/Level2/G2_L2_instructionPage";
import Activity1 from "../../../Components/MemoryComponents/WM_Game2Components/Level2/Activity1";
import Activity2 from "../../../Components/MemoryComponents/WM_Game2Components/Level2/Activity2";
import G2_L2_Feedback from "../../../Components/MemoryComponents/WM_Game2Components/Level2/G2_L2_Feedback";

const WM_Game2_Level2 = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [scores, setScores] = useState({ 
    activity1: 0, 
    activity2: 0 
  });

  const handleNext = (newScores) => {
    if (typeof newScores === 'object') {
  
      setCurrentStep(2);
      setScores({ activity1: 0, activity2: 0 });
    } else if (currentStep === 2) {
      setScores(prev => ({ ...prev, activity1: newScores }));
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setScores(prev => ({ ...prev, activity2: newScores }));
      setCurrentStep(4);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleRetry = () => {
    setCurrentStep(2);
    setScores({ activity1: 0, activity2: 0 });
  };

  return (
    <>
      {currentStep === 1 && <G2_L2_instructionPage onNext={handleNext} />}
      {currentStep === 2 && <Activity1 onNext={handleNext} />}
      {currentStep === 3 && <Activity2 onNext={handleNext} />}
      {currentStep === 4 && (
        <G2_L2_Feedback 
          activity1Score={scores.activity1}
          activity2Score={scores.activity2}
          handleRetry={handleRetry}
        />
      )}
    </>
  );
};

export default WM_Game2_Level2;
import React, { useState, useEffect } from "react";
import G1_L3_instructionPage from "../../../Components/MemoryComponents/WM_Game1Components/Level3/G1_L3_instructionPage";
import Activity1 from "../../../Components/MemoryComponents/WM_Game1Components/Level3/Activity1";
import Activity2 from "../../../Components/MemoryComponents/WM_Game1Components/Level3/Activity2";
import G1_L3_Feedback from "../../../Components/MemoryComponents/WM_Game1Components/Level3/G1_L3_Feedback";

const WM_Game1_Level3 = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [activity1Score, setActivity1Score] = useState(0);
  const [activity2Score, setActivity2Score] = useState(0);

  useEffect(() => {
    console.log("Current step:", currentStep);
  }, [currentStep]);

  const onNext = (score = null) => {
    if (currentStep === 2 && score !== null) {
      setActivity1Score(score);
    }
    if (currentStep === 3 && score !== null) {
      setActivity2Score(score);
    }
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <>
      {currentStep === 1 && <G1_L3_instructionPage onNext={onNext} />}
      {currentStep === 2 && <Activity1 onNext={onNext} />}
      {currentStep === 3 && <Activity2 onNext={onNext} />}
      {currentStep === 4 && (
        <G1_L3_Feedback activity1Score={activity1Score} activity2Score={activity2Score} />
      )}
    </>
  );
};

export default WM_Game1_Level3;

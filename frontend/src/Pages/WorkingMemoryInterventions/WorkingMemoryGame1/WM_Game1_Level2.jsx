import React, { useState, useEffect } from "react";
import G1_L2_instructionPage from "../../../Components/MemoryComponents/WM_Game1Components/Level2/G1_L2_instructionPage";
import Activity1 from "../../../Components/MemoryComponents/WM_Game1Components/Level2/Activity1";

const WM_Game1_Level2 = () => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    console.log("Current step:", currentStep);
  }, [currentStep]);

  const onNext = () => setCurrentStep((prev) => prev + 1);
  const onBack = () => setCurrentStep((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <>
      {currentStep === 1 && <G1_L2_instructionPage onNext={onNext} />}
      {currentStep === 2 && <Activity1 onNext={onNext} />}
    </>
  );
};

export default WM_Game1_Level2;

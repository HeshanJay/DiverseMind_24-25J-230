import React, { useState, useEffect } from "react";
import G1_L1_instructionPage from "../../../Components/MemoryComponents/WM_Game1Components/Level1/G1_L1_instructionPage";
import Activity from "../../../Components/MemoryComponents/WM_Game1Components/Level1/Activity";

const WM_Game1_Level1 = () => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    console.log("Current step:", currentStep);
  }, [currentStep]);

  const onNext = () => setCurrentStep((prev) => prev + 1);

  return (
    <>
      {currentStep === 1 && <G1_L1_instructionPage onNext={onNext} />}
      {currentStep === 2 && <Activity />}
    </>
  );
};

export default WM_Game1_Level1;

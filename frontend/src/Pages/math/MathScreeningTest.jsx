//import React from "react";
import React, { useState } from "react";
import back_img2 from "../../assets/background_images/back_img2.jpg";
import MathDashboardComponent from "../../Components/MathComponents/MathDashboardComponent";
import MathAddition from "../../Components/MathComponents/MathAddition";

const MathScreeningTest = () => {
  const [currentComponent, setCurrentComponent] = useState("dashboard");
  const navigateToAddition = () => {
    setCurrentComponent("addition");
  };

  return (
    <div
      className="bg-cover bg-center min-h-screen flex flex-col items-center justify-start"
      style={{
        backgroundImage: `url(${back_img2})`,
      }}
    >
      {currentComponent === "dashboard" && (
        <MathDashboardComponent onNavigate={navigateToAddition} />
      )}
      {currentComponent === "addition" && <MathAddition />}
      {/* <MathDashboardComponent /> */}
      {/* <MathAddition/> */}
    </div>
  );
};

export default MathScreeningTest;


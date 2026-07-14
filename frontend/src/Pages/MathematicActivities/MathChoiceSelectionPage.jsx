import React from "react";
import { useNavigate } from "react-router-dom";
import "./MathChoiceSelectionPage.css";

import button1Image from "../../assets/Math/choice_button1.png";
import button2Image from "../../assets/Math/choice_button2.png";

const MathChoiceSelectionPage = () => {
    const navigate = useNavigate();

    const handleButton1Click = () => {
      navigate("/math-menu"); 
    };
  
    const handleButton2Click = () => {
      navigate("/math-funny-game-menu"); 
    };
    
  return (
    <div className="math-choice-selection-page">
      <button className="choice-button" onClick={handleButton1Click}>
        <img src={button1Image} alt="Choice Button 1" />
      </button>
      <button className="choice-button" onClick={handleButton2Click}>
        <img src={button2Image} alt="Choice Button 2" />
      </button>
    </div>
  );
};

export default MathChoiceSelectionPage;



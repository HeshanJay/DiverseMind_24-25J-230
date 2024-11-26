import React from "react";
import "./WritingCanvas.css";
import monkeyImage from "../../assets/characters/Monkey.png";

const letterFormation = () => {
  return (
    <div className="background">
      <h1>අකුරු හුරුව</h1>
      <img src={monkeyImage} alt="Monkey" className="monkey-img" />
    </div>
  );
};

export default letterFormation;

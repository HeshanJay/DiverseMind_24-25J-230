import React from "react";
import { useNavigate } from "react-router-dom";
import "./AttentionIM.css";
import backgroundImage from "../../assets/background_images/atten3.png";
import game1 from "../../assets/background_images/game1ui5.png";
import game2 from "../../assets/background_images/game2ui1.png";
import game3 from "../../assets/background_images/game3ui1.png";
import clickSound from "../../assets/Audios/click_sound.mp3";

const AttentionIM = () => {
  const navigate = useNavigate();

  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  return (
    <div
      className="attention-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="overlay">
        <h1 className="attention-title">අවධානය වර්ධනය සඳහා මඟ හුරුව</h1>
        <div className="options-container">
          <div
            className="option-card"
            onClick={() => {
              playClickSound();
              navigate("/attentiongame1");
            }}
          >
            <img src={game1} alt="Sudoku" className="option-icon" />
            <h2>වර්ණ හඳුනා ගනිමු</h2>
          </div>
          <div
            className="option-card"
            onClick={() => {
              playClickSound();
              navigate("/attentiongame2");
            }}
          >
            <br></br>
            <img
              src={game2}
              alt="Spot the Difference"
              className="option-icon"
            />
            <h2>
              නොගලපෙන රූපය <br></br>
              <center>සොයමු</center>
            </h2>
          </div>
          <div
            className="option-card"
            onClick={() => {
              playClickSound();
              navigate("/attentiongame3");
            }}
          >
            <img src={game3} alt="Matching Cards" className="option-icon" />
            <h2>ඉලක්කය හරිද බලමු</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttentionIM;

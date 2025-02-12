import React from "react";
import { useNavigate } from "react-router-dom";
import "./AttentionIM.css";
import backgroundImage from "../../assets/background_images/backgd_ig.png";
import game1 from "../../assets/background_images/game1.jpg";
import game2 from "../../assets/background_images/game2.png";
import game3 from "../../assets/background_images/game3.jpg";

const AttentionIM = () => {
  const navigate = useNavigate();

  return (
    <div
      className="attention-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="overlay">
        <h1 className="attention-title">Attention Interventions</h1>
        <div className="options-container">
          <div
            className="option-card"
            onClick={() => navigate("/attentiongame1")}
          >
            <img src={game1} alt="Sudoku" className="option-icon" />
            <h2>Sudoku</h2>
          </div>
          <div
            className="option-card"
            onClick={() => navigate("/attentiongame2")}
          >
            <img
              src={game2}
              alt="Spot the Difference"
              className="option-icon"
            />
            <h2>Spot the Difference</h2>
          </div>
          <div
            className="option-card"
            onClick={() => navigate("/attentiongame3")}
          >
            <img src={game3} alt="Matching Cards" className="option-icon" />
            <h2>Matching Cards</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttentionIM;

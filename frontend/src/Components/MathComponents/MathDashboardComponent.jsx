import React from "react";
import { useNavigate } from "react-router-dom";
import sunnyGif from "../../assets/characters/sunny.gif";
import "./MathDashboardComponent.css";
import butterflyGif from "../../assets/characters/butterfly.gif";

const MathDashboardComponent = ({onNavigate}) => {
  return (
    <div className="math-dashboard-component">
      {/* Sunny GIF at the top */}
      <div className="sunny-gif-container">
        <img
          src={sunnyGif}
          alt="Sunny Character"
          className="sunny-gif"
        />
      </div>

      {/* Title below the GIF */}
      <h1 className="math-dashboard-title">
      ගණිත හැකියා ඇගයිම 
      </h1>

      {/* Button at the bottom right */}
      <button className="next-button" onClick={onNavigate}>ඉදිරියට යමු</button>

      {/* Rabbit GIF */}
      <div className="butterfly-container">
        <img src={butterflyGif} alt="Jumping Rabbit" className="butterfly-gif" />
      </div>


    </div>
  );
};

export default MathDashboardComponent;


import React from "react";
import backgroundImage from "../../assets/background_images/AttentionGames/Game3/molebackgroud.png";
import Display2 from "../../Components/AttentionActivities/Game3/Display2";

const AttentionGame3Level2 = () => {
  return (
    <div
      className="attention-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Display2 />
    </div>
  );
};

export default AttentionGame3Level2;

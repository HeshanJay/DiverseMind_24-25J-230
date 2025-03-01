import React from "react";
import backgroundImage from "../../assets/background_images/AttentionGames/Game3/molebackgroud.png";
import Display3 from "../../Components/AttentionActivities/Game3/Display3";

const AttentionGame3Level3 = () => {
  return (
    <div
      className="attention-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Display3 />
    </div>
  );
};

export default AttentionGame3Level3;

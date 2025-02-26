import React from "react";
import backgroundImage from "../../assets/background_images/AttentionGames/Game3/molebackgroud.png";
import Display1 from "../../Components/AttentionActivities/Game3/Display1";

const AttentionGame3Level1 = () => {
  return (
    <div
      className="attention-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Display1 />
    </div>
  );
};

export default AttentionGame3Level1;

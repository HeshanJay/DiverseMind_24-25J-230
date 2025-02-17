import React from "react";
import ColorChange from "../../Components/AttentionActivities/Game1/ColorChange";
import backgroundImage from "../../assets/background_images/baord.png";

const AttentionGame1Level2 = () => {
  return (
    <div
      className="attention-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <ColorChange />
    </div>
  );
};

export default AttentionGame1Level2;

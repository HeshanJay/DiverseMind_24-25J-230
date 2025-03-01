import React from "react";
import backgroundImage from "../../assets/background_images/baord.png";
import ColorChange3 from "../../Components/AttentionActivities/Game1/ColorChange3";

const AttentionGame1Level3 = () => {
  return (
    <div
      className="attention-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <ColorChange3 />
    </div>
  );
};

export default AttentionGame1Level3;

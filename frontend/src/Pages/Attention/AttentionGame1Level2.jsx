import React from "react";
import backgroundImage from "../../assets/background_images/baord.png";
import ColorChange2 from "../../Components/AttentionActivities/Game1/ColorChange2";

const AttentionGame1Level2 = () => {
  return (
    <div
      className="attention-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <ColorChange2 />
    </div>
  );
};

export default AttentionGame1Level2;

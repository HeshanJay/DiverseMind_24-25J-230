import React from "react";
import backgroundImage from "../../../assets/background_images/baord.png";

const Display1 = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    ></div>
  );
};

export default Display1;

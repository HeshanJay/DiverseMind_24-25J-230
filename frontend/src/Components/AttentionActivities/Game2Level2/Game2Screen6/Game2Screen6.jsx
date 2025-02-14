import React from "react";
import BackImage from "../../../../assets/background_images/AttentionGames/Game2/backimg1_game2.png";

const Game2Screen6 = () => {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${BackImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <h1 className="relative text-xl font-bold text-gray-200">Screen 6</h1>
    </div>
  );
};

export default Game2Screen6;

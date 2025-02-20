// Game selection
import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../../assets/background_images/menu_back.webp";

const WritingGameMenu = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1 className="text-4xl font-bold text-white mb-8">මඟ හුරුව</h1>
      <div className="grid grid-cols-1 gap-4 w-3/4 max-w-md">
        <button className="p-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 transition">
          අකුරු හුරුව
        </button>
        <button
          className="p-4 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-700 transition"
          onClick={() => navigate("/writing-game2-menu")}
        >
          පිල්ලම් හුරුව
        </button>
        <button
          className="p-4 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-700 transition"
          onClick={() => navigate("/writing-game3-level1")}
        >
          විරාම ලක්ෂණ හුරුව
        </button>
      </div>
    </div>
  );
};

export default WritingGameMenu;

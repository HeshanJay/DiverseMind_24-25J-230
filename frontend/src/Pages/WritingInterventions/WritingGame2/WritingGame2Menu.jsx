// Game 2 level selction
import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../../assets/background_images/menu_back2.webp";

const WritingGame2Menu = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="grid grid-cols-1 gap-4 w-3/4 max-w-md">
          <button
            className="p-4 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
            onClick={() => navigate("/writing-game2-level1")}
          >
            අදියර 1
          </button>
          <button className="p-4 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-700 transition">
            අදියර 2
          </button>
          <button className="p-4 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-700 transition">
            අදියර 3
          </button>
        </div>
      </div>
    </div>
  );
};

export default WritingGame2Menu;

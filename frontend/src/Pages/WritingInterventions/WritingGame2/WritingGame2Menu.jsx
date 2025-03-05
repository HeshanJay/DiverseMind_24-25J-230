import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../../assets/writing_interventions/background/back11.webp";
import level1button from "../../../assets/writing_interventions/buttons/game2-1.png";
import level2button from "../../../assets/writing_interventions/buttons/game2-2.png";
import level3button from "../../../assets/writing_interventions/buttons/game2-3.png";

const WritingGame2Menu = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-6"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
      }}
    >
      {/* Title at the top */}
      <h1 className="text-6xl font-bold text-white mb-4">
        නිවැරදි පිල්ලම තෝරමු
      </h1>
      {/* Subheading added below the title */}
      <h2 className="text-4xl font-semibold text-white mb-20">අදියරයන්</h2>

      {/* Horizontal arrangement for level buttons */}
      <div className="flex space-x-8 items-center justify-center">
        <img
          src={level1button}
          alt="අදියර 1"
          className="w-40 cursor-pointer hover:scale-125 transition-transform"
          onClick={() => navigate("/writing-game2-level1")}
        />
        <img
          src={level2button}
          alt="අදියර 2"
          className="w-40 cursor-pointer hover:scale-125 transition-transform"
          onClick={() => navigate("/writing-game2-level2")}
        />
        <img
          src={level3button}
          alt="අදියර 3"
          className="w-40 cursor-pointer hover:scale-125 transition-transform"
          onClick={() => navigate("/writing-game2-level3")}
        />
      </div>
    </div>
  );
};

export default WritingGame2Menu;

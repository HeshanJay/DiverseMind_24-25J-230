import React from "react";
import { useNavigate } from "react-router-dom";
import menuBack from "../../../assets/WM_Interventions_images/menu_images/menuBack.png";
import visual from "../../../assets/WM_Interventions_images/menu_images/visual.png";
import memory from "../../../assets/WM_Interventions_images/menu_images/memory.png";
import audio from "../../../assets/WM_Interventions_images/menu_images/audio.png";
import rb from "../../../assets/WM_Interventions_images/menu_images/rb.png"; 
import sq from "../../../assets/WM_Interventions_images/menu_images/sq.png"; 
import zb from "../../../assets/WM_Interventions_images/menu_images/zb.png"; 

const WM_Menu = () => {
  const navigate = useNavigate();

  const handleNavigate = (game) => {
    switch (game) {
      case "visual":
        navigate("/WM_Game1Menu"); // Navigate to Visual Games
        break;
      case "memory":
        navigate("/WM_Game2Menu"); // Navigate to Memory Games
        break;
      case "audio":
        navigate("/WM_Game3Menu"); // Navigate to Audio Games
        break;
      default:
        break;
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center p-4"
      style={{
        backgroundImage: `url(${menuBack})`, // Use the imported variable
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-5xl font-bold text-white mb-[55px] drop-shadow-2xl bg-clip-text text-transparent animate-pulse relative left-3">
    <span className="bg-black/30 px-4 py-2 rounded-3xl shadow-xl border border-white/90 text-shadow-xl">
      මතකය වර්ධනය සඳහා මගහුරුව
    </span>
  </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-8xl mx-auto">
        {/* Visual Games Card */}
        <div
          onClick={() => handleNavigate("visual")}
          className="cursor-pointer bg-white/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition duration-300 flex flex-col items-center justify-center relative w-90 h-99"
        >
          <img
            src={rb} // Add rb.png here
            alt="Visual Games Decoration"
            className="w-32 h-32 object-contain mb-[-15px]"
          />
          <img
            src={visual} // Use the imported variable
            alt="Visual Games"
            className="w-48 h-48 object-contain mb-4 rounded-lg"
          />
          <h2 className="text-center text-3xl font-semibold text-gray-800">
          දෘශ්‍ය හුරුව
          </h2>
        </div>
        {/* Memory Games Card */}
        <div
          onClick={() => handleNavigate("memory")}
          className="cursor-pointer bg-white/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition duration-300 flex flex-col items-center justify-center relative w-90 h-97"
        >
          <img
            src={sq} // Add sq.png here
            alt="Memory Games Decoration"
            className="w-32 h-32 object-contain mb-[-15px]"
          />
          <img
            src={memory} // Use the imported variable
            alt="Memory Games"
            className="w-48 h-48 object-contain mb-4 rounded-lg"
          />
          <h2 className="text-center text-3xl font-semibold text-gray-800">
          මතක හුරුව
          </h2>
        </div>
        {/* Audio Games Card */}
        <div
          onClick={() => handleNavigate("audio")}
          className="cursor-pointer bg-white/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition duration-300 flex flex-col items-center justify-center relative w-90 h-99"
        >
          <img
            src={zb} // Add zb.png here
            alt="Audio Games Decoration"
            className="w-32 h-32 object-contain mb-[-15px]"
          />
          <img
            src={audio} // Use the imported variable
            alt="Audio Games"
            className="w-48 h-48 object-contain mb-4 rounded-lg"
          />
          <h2 className="text-center text-3xl font-semibold text-gray-800">
          ශ්‍රව්‍ය හුරුව
          </h2>
        </div>
      </div>
    </div>
  );
};

export default WM_Menu;
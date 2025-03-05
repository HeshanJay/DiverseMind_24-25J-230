import React from "react";
import { useNavigate } from "react-router-dom";
import clickSound from "../../assets/Audios/click_sound.mp3";
import backgroundImage from "../../assets/background_images/atten3.png";
import game1 from "../../assets/background_images/game1ui5.png";
import game2 from "../../assets/background_images/game2ui1.png";
import game3 from "../../assets/background_images/game3ui1.png";
import rb from "../../assets/WM_Interventions_images/menu_images/rb.png";
import sq from "../../assets/WM_Interventions_images/menu_images/sq.png";
import zb from "../../assets/WM_Interventions_images/menu_images/zb.png";

const AttentionIM = () => {
  const navigate = useNavigate();

  const playClickSound = () => {
    new Audio(clickSound).play();
  };

  const handleNavigation = (path) => {
    playClickSound();
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 relative">
      <div 
        className="absolute inset-0 z-0" 
        style={{ 
          backgroundImage: `url(${backgroundImage})`, 
          backgroundSize: "cover", 
          backgroundPosition: "center",
          opacity: 1
        }}
      ></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full">
       <h1 className="text-5xl font-bold text-white mb-[55px] drop-shadow-2xl bg-clip-text text-transparent animate-pulse relative left-3">
       <span className="bg-black/30 px-4 py-2 rounded-3xl shadow-xl border border-white/90 text-shadow-xl">
      අවධානය වර්ධනය සඳහා මඟ හුරුව
    </span>
  </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-8xl mx-auto">
          {/* Game 1 Card */}
          <div
            onClick={() => handleNavigation("/attentiongame1")}
            className="cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition duration-300 flex flex-col items-center justify-center relative w-90 h-99"
          >
            <img
              src={rb}
              alt="Decorative"
              className="w-32 h-32 object-contain mb-[-65px]"
            />
            <img
              src={game1}
              alt="වර්ණ හඳුනා ගනිමු"
              className="w-48 h-48 object-contain mb-2 rounded-xl"
            />
            <h2 className="text-center text-3xl font-semibold text-gray-800 mt-[-26px]">
              වර්ණ හඳුනා
              <br />
              <center>ගනිමු</center>
            </h2>
          </div>

          {/* Game 2 Card */}
          <div
            onClick={() => handleNavigation("/attentiongame2")}
            className="cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition duration-300 flex flex-col items-center justify-center relative w-90 h-99"
          >
            <img
              src={sq}
              alt="Decorative"
              className="w-32 h-32 object-contain mb-[-65px]"
            />
            <img
              src={game2}
              alt="නොගලපෙන රූපය සොයමු"
              className="w-48 h-48 object-contain mb-2 rounded-lg"
            />
            <h2 className="text-center text-3xl font-semibold text-gray-800 mt-[-26px]">
              නොගැලපෙන රූපය <br />
              <center>සොයමු</center>
            </h2>
          </div>

          {/* Game 3 Card */}
          <div
            onClick={() => handleNavigation("/attentiongame3")}
            className="cursor-pointer bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition duration-300 flex flex-col items-center justify-center relative w-90 h-99"
          >
            <img
              src={zb}
              alt="Decorative"
              className="w-32 h-32 object-contain mb-[-65px]"
            />
            <img
              src={game3}
              alt="ඉලක්කය හරිද බලමු"
              className="w-48 h-48 object-contain mb-2 rounded-lg"
            />
            <h2 className="text-center text-3xl font-semibold text-gray-800 mt-[-26px]">
              ඉලක්කය හරිද
              <br />
              <center>බලමු</center>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttentionIM;
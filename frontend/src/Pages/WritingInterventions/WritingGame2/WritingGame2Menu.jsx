import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import backgroundImage from "../../../assets/writing_interventions/background/back11.webp";
import level1button from "../../../assets/writing_interventions/buttons/game2-1.png";
import level2button from "../../../assets/writing_interventions/buttons/game2-2.png";
import level3button from "../../../assets/writing_interventions/buttons/game2-3.png";
import clickSound from "../../../assets/Audios/click_sound.mp3"; // 🔊 sound

const WritingGame2Menu = () => {
  const navigate = useNavigate();

  /* ───────────────────────────────────────────────────────────
     preload click sound once
  ─────────────────────────────────────────────────────────── */
  const clickRef = useRef(null);
  useEffect(() => {
    clickRef.current = new Audio(clickSound);
    clickRef.current.volume = 0.7;
  }, []);

  const playClick = () => {
    if (clickRef.current) {
      clickRef.current.currentTime = 0;
      clickRef.current.play();
    }
  };

  /* wrapper to play sound & then navigate */
  const handleLevelClick = (level) => {
    playClick();
    navigate(`/writing-game2-level${level}`);
  };

  /* button images array */
  const buttons = [level1button, level2button, level3button];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-6 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,.7)), url(${backgroundImage})`,
      }}
    >
      {/* floating sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* titles */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-4 drop-shadow-lg">
          නිවැරදි පිල්ලම තෝරමු
        </h1>
        <h2 className="text-3xl md:text-4xl text-white mb-12 text-shadow-md">
          අදියරයන්
        </h2>
      </div>

      {/* level buttons */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-12 relative z-10">
        {buttons.map((btn, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col items-center transition-transform hover:scale-105"
          >
            {/* glow */}
            <div className="absolute -inset-4 bg-yellow-400/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* image button */}
            <img
              src={btn}
              alt={`අදියර ${idx + 1}`}
              className="w-32 md:w-48 cursor-pointer transform transition-all hover:rotate-3 hover:drop-shadow-lg"
              onClick={() => handleLevelClick(idx + 1)}
            />
            {/* caption */}
            <span className="mt-3 text-4xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              අදියර {idx + 1}
            </span>
          </div>
        ))}
      </div>

      {/* decorative gradients */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-30" />
    </div>
  );
};

export default WritingGame2Menu;

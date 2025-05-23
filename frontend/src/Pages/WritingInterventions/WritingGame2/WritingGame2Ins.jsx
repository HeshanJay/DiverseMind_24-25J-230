import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import backgroundImage from "../../../assets/writing_interventions/background/back11.webp";
import game2Ins from "../../../assets/writing_interventions/background/game2Ins.png";
import clickSound from "../../../assets/Audios/click_sound.mp3";

const WritingGame2Ins = () => {
  const navigate = useNavigate();

  /* ─ build one Audio instance we can replay quickly ─ */
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

  const handleStart = () => {
    playClick(); // 🔉 play sound first
    navigate("/writing-game2-menu"); // then navigate
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-6 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,.7)), url(${backgroundImage})`,
      }}
    >
      {/* ─ Page Title ─ */}
      <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-8 drop-shadow-lg animate-fade-in">
        නිවැරදි පිල්ලම තෝරමු
      </h1>

      {/* ─ Image + overlay ─ */}
      <div className="relative w-full max-w-md md:max-w-lg animate-fade-in-up -mt-4 md:-mt-6">
        <img
          src={game2Ins}
          alt="Game 2 instruction board"
          className="w-full h-auto rounded-lg shadow-2xl select-none"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-start pt-16 px-3 text-center">
          <div className="max-w-xs md:max-w-sm mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#8B4513] mb-4 drop-shadow">
              උපදෙස්
            </h2>

            <p className="text-base md:text-lg leading-relaxed whitespace-pre-line">
              තිරයේ දිස්වන කාඩ්පත් ගැලළපීම පහත පරිදි සිදු කරන්න. පළමු අදියරේදී
              කාඩ් පත් දෙකක් භාවිතයෙන් ස්වරය හා ව්‍යංජනය ගළපා නිවැරදි පිල්ලම
              සහිත අකුර සකස් කරන්න. කාලය විනාඩි 1 ක් ලැබෙයි. දෙවෙනි අදියරේදී
              පළමු අදියරේ ක්‍රියාකාරකමේම යෙදෙන්න. එහිදී කාලය විනාඩි 1.30 ක්
              හිමිවෙයි. තුන්වෙනි අදියරේදී කාඩ්පත් 3 ක් භාවිතයෙන් පිල්ලම් සහිත
              අකුරු හා නියමිත පිල්ලම් වර්ගය ගළපන්න. කාලය විනාඩි 5 ක් හිමිවේ.
            </p>

            {/* start button with click sound */}
            <button
              onClick={handleStart}
              className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-yellow-700 to-orange-700 text-white text-lg font-bold shadow-lg 
                         hover:from-yellow-700 hover:to-orange-700 animate-pulse hover:animate-none transition-all duration-300 
                         transform hover:scale-105"
            >
              ආරම්භ කරන්න
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingGame2Ins;

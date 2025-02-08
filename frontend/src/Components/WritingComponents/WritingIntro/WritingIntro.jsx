import React from "react";
import backgroundImage from "../../../assets/background_images/writing_back_start.webp";
import "./WritingIntro.css"; // Import your custom CSS for the animation

const WritingIntroPage = ({ onStartTest }) => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Centered container for title & button */}
      <div className="absolute top-[45%] left-[51%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-8">
        {/* Title on the brown board */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg px-4 text-center">
          ලිවීමේ හැකියා
          <br />
          පරීක්‍ෂා කරමු
        </h1>

        {/* Kid-friendly start button */}
        <button
          onClick={onStartTest} // This will trigger setShowIntro(false)
          className="
            bg-gradient-to-r from-pink-400 to-purple-500 
            text-white text-2xl font-extrabold 
            py-3 px-8 rounded-full shadow-xl
            hover:shadow-2xl hover:scale-105 
            transition-transform duration-300
            bobble-animation
          "
        >
          ආරම්භ කරමු
        </button>
      </div>
    </div>
  );
};

export default WritingIntroPage;

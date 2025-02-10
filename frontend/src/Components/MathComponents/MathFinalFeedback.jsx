import React from "react";
import backimag from "../../assets/background_images/scorebg.jpg";
import { MdHome, MdMenu, MdRefresh } from "react-icons/md";
import { FaRedoAlt, FaHome, FaBars } from "react-icons/fa"; // New icons for navigation

const MathFinalFeedback = ({ skillPhrase, onGoHome, onGoMenu, onRetry }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backimag})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Overlay to reduce brightness */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Falling multicolored glowing snow balls */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="snowball"
          style={{
            left: "10%",
            animationDelay: "0s",
            width: "10px",
            height: "10px",
            "--color": "#FF69B4",
          }}
        ></div>
        <div
          className="snowball"
          style={{
            left: "30%",
            animationDelay: "1s",
            width: "15px",
            height: "15px",
            "--color": "#1E90FF",
          }}
        ></div>
        <div
          className="snowball"
          style={{
            left: "50%",
            animationDelay: "2s",
            width: "8px",
            height: "8px",
            "--color": "#FF69B4",
          }}
        ></div>
        <div
          className="snowball"
          style={{
            left: "70%",
            animationDelay: "3s",
            width: "12px",
            height: "12px",
            "--color": "#1E90FF",
          }}
        ></div>
        <div
          className="snowball"
          style={{
            left: "90%",
            animationDelay: "4s",
            width: "20px",
            height: "20px",
            "--color": "#FF69B4",
          }}
        ></div>
      </div>

      {/* Title, feedback message, and celebration */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center pb-10">
        <div className="text-center -mt-20">
          <h1
            className="text-5xl font-bold text-white mb-3"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
          >
            🎉ඔබේ ප්‍රතිඵලය🎉
          </h1>
          <p className="text-3xl text-white font-extrabold mb-4">
            {skillPhrase}
          </p>
        </div>
      </div>

      {/* Navigation buttons positioned at the top-right */}
      <div className="absolute right-[320px] top-[150px] flex flex-col items-center gap-6">
        <button
          onClick={onRetry}
          className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-105 transition-transform duration-300"
          title="Retry"
        >
          <FaRedoAlt />
        </button>
        <button
          onClick={onGoHome}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-105 transition-transform duration-300"
          title="Home"
        >
          <FaHome />
        </button>
        <button
          onClick={onGoMenu}
          className="bg-gradient-to-r from-pink-400 to-red-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-105 transition-transform duration-300"
          title="Menu"
        >
          <FaBars />
        </button>
      </div>
    </div>
  );
};

export default MathFinalFeedback;

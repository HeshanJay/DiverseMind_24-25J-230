import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRedoAlt, FaHome, FaBars } from "react-icons/fa";
import backgroundImg from "../../../assets/background_images/feedback.jpg";
import "./WritingFinalFeedback.css";

const WritingFinalFeedback = ({ finalPredictionData }) => {
  const navigate = useNavigate();

  if (!finalPredictionData) return null;

  // Convert skill_level to a kid-friendly phrase
  let skillPhrase = "";
  if (finalPredictionData.skill_level === "Good") {
    skillPhrase = "ඉතා හොඳයි!";
  } else if (finalPredictionData.skill_level === "Average") {
    skillPhrase = "හොඳයි!";
  } else if (finalPredictionData.skill_level === "Weak") {
    skillPhrase = "උනන්දු විය යුතුයි!";
  } else {
    skillPhrase = "Cannot be determined...";
  }

  // Navigation handlers
  const handleRetry = () => {
    window.location.reload(); // Full component reload
  };

  const handleGoHome = () => {
    navigate("/home-page");
  };

  const handleGoMenu = () => {
    navigate("/screening-menu");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative flex flex-col"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Animated snowballs */}
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

      {/* Main content */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center pb-10">
        <div className="text-center mt-7">
          <h1
            className="text-6xl font-bold text-white mb-3"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
          >
            🎉ඔබේ ප්‍රතිඵලය🎉
          </h1>
          <p className="text-4xl text-white font-extrabold mb-4">
            {skillPhrase}
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute right-[280px] top-[200px] flex flex-col items-center gap-6 z-20">
        <button
          onClick={handleRetry}
          className="cursor-pointer bg-gradient-to-r from-cyan-400 to-blue-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-110 transition-transform duration-300"
          title="Retry"
        >
          <FaRedoAlt />
        </button>
        <button
          onClick={handleGoHome}
          className="cursor-pointer bg-gradient-to-r from-yellow-400 to-yellow-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-110 transition-transform duration-300"
          title="Home"
        >
          <FaHome />
        </button>
        <button
          onClick={handleGoMenu}
          className="cursor-pointer bg-gradient-to-r from-pink-400 to-red-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-110 transition-transform duration-300"
          title="Menu"
        >
          <FaBars />
        </button>
      </div>
    </div>
  );
};

export default WritingFinalFeedback;

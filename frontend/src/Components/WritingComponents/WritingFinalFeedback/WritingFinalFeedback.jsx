import React, { useState, useEffect } from "react";
import { MdHome, MdMenu, MdRefresh } from "react-icons/md";
import backgroundImg from "../../../assets/background_images/back_img1.jpg";
import "./WritingFinalFeedback.css"; // Import the CSS file

const WritingFinalFeedback = ({
  finalPredictionData,
  onGoHome, // function to go Home
  onGoMenu, // function to go Main Menu
  onRetry, // function to retry
}) => {
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

  // Manage whether sprinkles are visible
  const [showSprinkles, setShowSprinkles] = useState(true);

  // Generate random sprinkles
  const sprinkles = Array.from({ length: 30 }).map((_, index) => (
    <div
      key={index}
      className="sprinkle"
      style={{
        left: `${Math.random() * 100}vw`,
        animationDelay: `${Math.random() * 0.5}s`,
        animationDuration: `${1.5 + Math.random() * 1}s`,
      }}
    />
  ));

  // Hide sprinkles after ~1.5 seconds (customizable)
  useEffect(() => {
    const timer = setTimeout(() => setShowSprinkles(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      {/* Background image + overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Sprinkles, if still shown */}
      {showSprinkles && <div className="sprinkles-container">{sprinkles}</div>}

      {/* 
        Popup container with a pop-in animation,
        and a fixed width of w-[400px] (unchanged from earlier).
      */}
      <div className="z-10 popup-box">
        <div className="relative bg-white p-6 rounded-lg shadow-lg w-[400px]">
          <h2 className="text-5xl font-bold mb-4 text-center text-green-800">
            ඔබේ ප්‍රතිඵලය
          </h2>
          <p className="text-3xl text-center mb-4 text-purple-700 font-extrabold">
            {skillPhrase}
          </p>

          {/* Icon buttons row at bottom */}
          <div className="flex justify-around mt-6">
            {/* Home button */}
            <button
              className="bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center 
                         hover:bg-blue-600 transition-colors duration-200"
              onClick={onGoHome}
              title="Home"
            >
              <MdHome size={30} />
            </button>

            {/* Main Menu button */}
            <button
              className="bg-orange-400 text-white rounded-full w-14 h-14 flex items-center justify-center 
                         hover:bg-orange-500 transition-colors duration-200"
              onClick={onGoMenu}
              title="Main Menu"
            >
              <MdMenu size={30} />
            </button>

            {/* Retry button */}
            <button
              className="bg-pink-500 text-white rounded-full w-14 h-14 flex items-center justify-center 
                         hover:bg-pink-600 transition-colors duration-200"
              onClick={onRetry}
              title="Retry"
            >
              <MdRefresh size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingFinalFeedback;

import React from "react";
import "./ScoreBoard.css";
import backgroundImage from "../../assets/background_images/back_img4.jpg"; // Your original background image
import rabbitImage from "../../assets/characters/rabbit.png"; // Jungle character
import { FaStar, FaRegStar, FaTrophy, FaRedoAlt } from "react-icons/fa";

const ScoreBoard = ({ score, totalQuestions, onRestart }) => {
  const stars = Array.from({ length: totalQuestions }, (_, index) =>
    index < score ? (
      <FaStar key={index} className="text-yellow-500 star-bounce" />
    ) : (
      <FaRegStar key={index} className="text-green-200" />
    )
  );

  const motivationalMessages = [
    "හොඳය ආරම්භයක් ! 🐾",
    "උත්සාහය අතාරින්න එපා! 🌿",
    "මීළඟ වතාවේ නැවත උත්සාහ කරමු! 🌟",
    "අපි පුහුණු වෙමු , ඔබට පුළුවන්! 🐒",
  ];

  const message =
    score === totalQuestions
      ? "ඉතා හොඳයි! 🦁"
      : motivationalMessages[Math.min(score, motivationalMessages.length - 1)];

  return (
    <div
      className="bg-cover bg-center w-screen h-screen flex justify-center items-center relative p-0 m-0"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="scoreboard-frame-jungle">
        <h1 className="text-4xl font-extrabold text-green-800 mb-4">
          <FaTrophy className="inline-block text-yellow-500 mr-2" />
          ලකුණු
        </h1>
        <p className="text-xl text-brown-700 mb-4">
          <span className="text-yellow-600 font-extrabold text-3xl">
            {score}
          </span>{" "}
          /{" "}
          <span className="text-green-500 font-extrabold text-3xl">
            {totalQuestions}
          </span>
        </p>
        <div className="flex justify-center text-3xl gap-2 mb-4">{stars}</div>
        <p className="text-lg text-green-900 font-semibold mb-3">{message}</p>
        {/* Always render the rabbit */}
        <div className="rabbit-container">
          <img
            src={rabbitImage}
            alt="Rabbit"
            className="mx-auto mb-4 w-24 h-24 animal-jump"
          />
        </div>
        <button
          onClick={onRestart}
          className="restart-button mt-4 px-6 py-3 text-md font-bold"
        >
          <FaRedoAlt className="inline-block mr-2" />
          නැවත ඇරඹුම
        </button>
      </div>
    </div>
  );
};

export default ScoreBoard;
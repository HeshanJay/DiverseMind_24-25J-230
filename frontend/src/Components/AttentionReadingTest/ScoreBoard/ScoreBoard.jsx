import React from "react";
import "./ScoreBoard.css";
import backgroundImage from "../../../assets/background_images/back_img4.jpg";
import rabbitImage from "../../../assets/characters/rabbit.png";
import { FaStar, FaRegStar, FaTrophy, FaRedoAlt } from "react-icons/fa";

const ScoreBoard = ({ score, totalQuestions, onRestart }) => {
  // Generate stars based on the score
  const stars = Array.from({ length: totalQuestions }, (_, index) =>
    index < score ? (
      <FaStar key={index} className="text-yellow-500 star-bounce" />
    ) : (
      <FaRegStar key={index} className="text-gray-300" />
    )
  );

  //motivational message

  const motivationalMessages = [
    "හොඳ ආරම්භයක්! 🐾",
    "උත්සාහය අතාරින්න එපා! 🌿",
    "මීළඟ වතාවේ නැවත උත්සාහ කරමු! 🌟",
    "නැවත උත්සාහ කරමු, ඔබට පුළුවන්! 🐒",
  ];

  const message =
    score === totalQuestions
      ? "ඉතා හොඳයි! 🎉 ඔබ සාර්ථකයි! 🦁"
      : motivationalMessages[Math.min(score, motivationalMessages.length - 1)];

  return (
    <div
      className="bg-cover bg-center w-screen h-screen flex justify-center items-center relative p-0 m-0"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="scoreboard-frame-jungle text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-3xl border-4 border-green-500">
        <h1 className="text-4xl font-extrabold text-green-800 mb-4">
          <FaTrophy className="inline-block text-yellow-500 mr-2" />
          ලකුණු පුවරුව
        </h1>
        <p className="text-2xl text-gray-700 mb-4">
          ඔබේ ලකුණු:{" "}
          <span className="text-yellow-600 font-extrabold text-4xl">
            {score}
          </span>{" "}
          /{" "}
          <span className="text-green-500 font-extrabold text-4xl">
            {totalQuestions}
          </span>
        </p>
        <div className="flex justify-center text-3xl gap-2 mb-4">{stars}</div>
        <p className="text-lg text-green-800 font-semibold mb-6">{message}</p>
        <div className="rabbit-container mb-4">
          <img
            src={rabbitImage}
            alt="Rabbit"
            className="mx-auto w-24 h-24 animal-jump"
          />
        </div>
        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <FaRedoAlt className="inline-block mr-2" />
          නැවත ඇරඹුම
        </button>
      </div>
    </div>
  );
};

export default ScoreBoard;

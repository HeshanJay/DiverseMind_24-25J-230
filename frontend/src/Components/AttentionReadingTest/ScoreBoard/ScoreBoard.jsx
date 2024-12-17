import React, { useState, useEffect } from "react";
import "./ScoreBoard.css";
import backgroundImage from "../../../assets/background_images/back_img4.jpg";
import rabbitImage from "../../../assets/characters/rabbit.png";
import {
  FaStar,
  FaRegStar,
  FaTrophy,
  FaRedoAlt,
  FaTimes,
} from "react-icons/fa";
import axios from "axios";

const ScoreBoard = ({ score, totalQuestions, onRestart }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [attentionData, setAttentionData] = useState({
    average_score: null,
    status: null,
    total_time: null,
  });
  const [loading, setLoading] = useState(false);

  // Generate stars based on the score
  const stars = Array.from({ length: totalQuestions }, (_, index) =>
    index < score ? (
      <FaStar key={index} className="text-yellow-500 star-bounce" />
    ) : (
      <FaRegStar key={index} className="text-gray-300" />
    )
  );

  // Motivational messages based on the score
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

  // Fetch attention data from the backend
  const fetchAttentionData = async () => {
    setLoading(true);
    try {
      console.log("Fetching attention data...");
      const response = await axios.get(
        "http://localhost:8000/attention/result"
      );

      if (response.data) {
        console.log("Attention data fetched:", response.data);
        setAttentionData({
          average_score: response.data.average_score || "N/A",
          status: response.data.status || "N/A",
          total_time: response.data.total_time || "N/A",
        });
      } else {
        throw new Error("Invalid data format received");
      }
    } catch (error) {
      console.error("Error fetching attention data:", error);
      setAttentionData({
        average_score: "N/A",
        status: "Error fetching data",
        total_time: "N/A",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle the click for "අවධානය බලමු" button
  const handleViewDetailsClick = () => {
    fetchAttentionData();
    setIsDialogOpen(true);
  };

  return (
    <div
      className="bg-cover bg-center w-screen h-screen flex justify-center items-center relative p-0 m-0"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Scoreboard Content */}
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
        <div className="flex justify-center gap-4">
          {/* Restart Button */}
          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white w-44 h-11 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <FaRedoAlt className="inline-block mr-2" />
            නැවත ඇරඹුම
          </button>
          {/* View Attention Details Button */}
          <button
            onClick={handleViewDetailsClick}
            className="bg-gradient-to-r from-purple-400 to-pink-500 text-white w-44 h-11 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <span>අවධානය බලමු</span>
          </button>
        </div>
      </div>

      {/* Attention Details Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
            <button
              onClick={() => setIsDialogOpen(false)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-3xl font-bold text-purple-500 text-center mb-4">
              🎉 ඔබේ අවධානය 🎉
            </h2>
            {loading ? (
              <p className="text-lg text-gray-700 text-center">
                ලෝඩ් වෙමින්... ⏳
              </p>
            ) : (
              <p className="text-lg text-gray-700 text-center">
                <strong>ආසන්න ලකුණ:</strong> {attentionData?.average_score}{" "}
                <br />
                <strong>තත්වය:</strong> {attentionData?.status} <br />
                <strong>මුළු කාලය:</strong> {attentionData?.total_time} තත්පර
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;

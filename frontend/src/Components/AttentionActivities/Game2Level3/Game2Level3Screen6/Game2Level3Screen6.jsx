import React from "react";
import BackImage from "../../../../assets/background_images/AttentionGames/Game2/backimg1_game2.png";
import { IoMdRefresh } from "react-icons/io";
import { GiGamepad } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";

const Game2Level3Screen6 = ({ userAnswers, onGameComplete }) => {
  const totalQuestions = userAnswers.length;
  const correctCount = userAnswers.filter((ans) => ans === true).length;
  const stars = correctCount; // 1 star per correct answer

  const handleRestart = () => {
    // Redirect to Game2Level3Screen1 on restart
    if (onGameComplete) {
      onGameComplete();
    } else {
      window.location.href = "/game2level3screen1"; // Direct navigation to Game2Level3Screen1
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${BackImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">ලකුණු පුවරුව</h1>
        <p className="text-2xl mb-4">
          ඔබේ ලකුණු: {correctCount} / {totalQuestions}
        </p>

        {/* Fixed container for stars to ensure it doesn't affect button position */}
        <div className="mb-4">
          <div className="flex justify-center">
            {[...Array(stars)].map((_, i) => (
              <span key={i} className="text-4xl">
                ⭐
              </span>
            ))}
          </div>
        </div>

        {correctCount === totalQuestions ? (
          <p className="text-2xl text-green-300">ඉතා හොඳයි 🌿</p>
        ) : (
          <p className="text-2xl text-orange-300">උත්සාහය අතාරින්න එපා! 🌿</p>
        )}

        {/* Kid-Friendly Buttons - now fixed position */}
        <div className="flex gap-6 mt-8 justify-center">
          {/* Restart Button */}
          <button
            onClick={handleRestart}
            className="w-16 h-16 bg-green-400 rounded-full shadow-md flex items-center justify-center hover:bg-green-500 transition"
            aria-label="Restart Game"
          >
            <IoMdRefresh size={32} color="#fff" />
          </button>

          {/* Go to Attention Game 2 Main Menu */}
          <button
            onClick={() => (window.location.href = "/attentiongame2")}
            className="w-16 h-16 bg-blue-400 rounded-full shadow-md flex items-center justify-center hover:bg-blue-500 transition"
            aria-label="Go to Attention Game 2"
          >
            <GiGamepad size={32} color="#fff" />
          </button>

          {/* Next Button */}
          <button
            onClick={() => (window.location.href = "/attentionInterventions")}
            className="w-16 h-16 bg-red-400 rounded-full shadow-md flex items-center justify-center hover:bg-red-500 transition"
            aria-label="Next"
          >
            <FaArrowRight size={32} color="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game2Level3Screen6;

import React from "react";
import BackImage from "../../../../assets/Attention/light.png";
import { FaRedo, FaArrowRight, FaEllipsisH } from "react-icons/fa";

const Game2Screen6 = ({ userAnswers, onGameComplete }) => {
  const totalQuestions = userAnswers.length;
  const correctCount = userAnswers.filter((ans) => ans === true).length;
  const stars = correctCount; // one star per correct answer

  const handleRestart = () => {
    // Reset the game state in parent component (which should reset current screen to 1)
    if (onGameComplete) {
      onGameComplete();
    } else {
      // Fallback to direct navigation if no state management function is provided
      window.location.href = "/game2screen1"; // Redirect to Game2Screen1
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{ backgroundImage: `url(${BackImage})` }}
    >
      {/* Dark overlay to enhance contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Main container with a pretty border */}
      <div
        className="relative z-10 bg-black bg-opacity-90 p-8 md:p-10
                   text-center text-white
                   border-8 border-yellow-400 rounded-3xl shadow-2xl
                   max-w-xl w-full mx-4"
      >
        <h1 className="text-4xl font-bold mb-4">ලකුණු පුවරුව</h1>
        <p className="text-2xl mb-4">
          ඔබේ ලකුණු: {correctCount} / {totalQuestions}
        </p>

        {/* Stars display */}
        <div className="mb-6">
          <div className="flex justify-center">
            {[...Array(stars)].map((_, i) => (
              <span key={i} className="text-4xl mx-1">
                ⭐
              </span>
            ))}
          </div>
        </div>

        {/* Feedback text */}
        {correctCount === totalQuestions ? (
          <p className="text-2xl text-green-600 font-semibold mb-6">
            ඉතා හොඳයි 🌿
          </p>
        ) : (
          <p className="text-2xl text-orange-600 font-semibold mb-6">
            උත්සාහය අතාරින්න එපා! 🌿
          </p>
        )}

        {/* Action buttons */}
        <div className="flex gap-6 mt-8 justify-center">
          {/* Restart Button */}
          <button
            onClick={handleRestart}
            className="w-16 h-16 flex items-center justify-center bg-blue-500 rounded-full text-white hover:bg-blue-600 transition duration-200"
            aria-label="Restart Game"
          >
            <FaRedo size={28} />
          </button>

          {/* Next Game Button */}
          <button
            onClick={() => (window.location.href = "/attentiongame2")}
            className="w-16 h-16 flex items-center justify-center bg-green-500 rounded-full text-white hover:bg-green-600 transition duration-200"
            aria-label="Next Game"
          >
            <FaArrowRight size={28} />
          </button>

          {/* More Options Button */}
          <button
            onClick={() => (window.location.href = "/attentionInterventions")}
            className="w-16 h-16 flex items-center justify-center bg-purple-500 rounded-full text-white hover:bg-purple-600 transition duration-200"
            aria-label="More Options"
          >
            <FaEllipsisH size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game2Screen6;

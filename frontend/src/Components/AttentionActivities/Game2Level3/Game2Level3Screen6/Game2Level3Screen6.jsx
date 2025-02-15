// Game2Level3Screen6.jsx
import React from "react";
import BackImage from "../../../../assets/background_images/AttentionGames/Game2/backimg1_game2.png";

const Game2Level3Screen6 = ({ userAnswers }) => {
  const totalQuestions = userAnswers.length;
  const correctCount = userAnswers.filter((ans) => ans === true).length;
  const stars = correctCount; // 1 star per correct answer

  return (
    <div
      className="w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${BackImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Quiz Results</h1>
        <p className="text-2xl mb-4">
          You got {correctCount} out of {totalQuestions} correct!
        </p>
        <div className="flex justify-center mb-4">
          {[...Array(stars)].map((_, i) => (
            <span key={i} className="text-4xl">
              ⭐
            </span>
          ))}
        </div>
        {correctCount === totalQuestions ? (
          <p className="text-2xl text-green-300">Amazing job!</p>
        ) : (
          <p className="text-2xl text-orange-300">Good try! Keep practicing!</p>
        )}
      </div>
    </div>
  );
};

export default Game2Level3Screen6;

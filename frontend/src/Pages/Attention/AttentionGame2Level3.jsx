// AttentionGame2Level3.jsx
import React, { useState, useEffect } from "react";
import Game2Level3Screen1 from "../../Components/AttentionActivities/Game2Level3/Game2Level3Screen1/Game2Level3Screen1.jsx";
import Game2Level3Screen2 from "../../Components/AttentionActivities/Game2Level3/Game2Level3Screen2/Game2Level3Screen2.jsx";
import Game2Level3Screen3 from "../../Components/AttentionActivities/Game2Level3/Game2Level3Screen3/Game2Level3Screen3.jsx";
import Game2Level3Screen4 from "../../Components/AttentionActivities/Game2Level3/Game2Level3Screen4/Game2Level3Screen4.jsx";
import Game2Level3Screen5 from "../../Components/AttentionActivities/Game2Level3/Game2Level3Screen5/Game2Level3Screen5.jsx";
import Game2Level3Screen6 from "../../Components/AttentionActivities/Game2Level3/Game2Level3Screen6/Game2Level3Screen6.jsx";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

// Correct answers for quiz screens (screens 1-5)
const correctAnswers = [3, 6, 2, 1, 8];

const components = [
  Game2Level3Screen1,
  Game2Level3Screen2,
  Game2Level3Screen3,
  Game2Level3Screen4,
  Game2Level3Screen5,
  Game2Level3Screen6,
];

const AttentionGame2Level3 = () => {
  // userAnswers: for screens 1-5, store true/false for correct answer (null if unanswered)
  const [userAnswers, setUserAnswers] = useState(Array(5).fill(null));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setIsNextEnabled(false);
  }, []);

  // Called from each quiz screen when a tile is clicked.
  const handleTileSelection = (tileId) => {
    if (currentIndex < 5) {
      const isCorrect = tileId === correctAnswers[currentIndex];
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentIndex] = isCorrect;
      setUserAnswers(updatedAnswers);
      setIsNextEnabled(true);
    }
  };

  // If timer expires, mark question incorrect (if not answered yet) and move on.
  const handleTimeout = () => {
    if (currentIndex < 5 && userAnswers[currentIndex] === null) {
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentIndex] = false;
      setUserAnswers(updatedAnswers);
    }
    if (currentIndex < components.length - 1) {
      setCurrentIndex(currentIndex + 1);
      // For quiz screens (0-4), disable Next until answered.
      setIsNextEnabled(
        currentIndex + 1 < 5 ? userAnswers[currentIndex + 1] !== null : false
      );
    }
  };

  const handleNext = () => {
    if (currentIndex < components.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsNextEnabled(
        currentIndex + 1 < 5 ? userAnswers[currentIndex + 1] !== null : false
      );
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsNextEnabled(
        currentIndex - 1 < 5 ? userAnswers[currentIndex - 1] !== null : false
      );
    }
  };

  const CurrentComponent = components[currentIndex];

  return (
    <div className="flex items-center justify-center h-screen relative bg-gray-100">
      <CurrentComponent
        onTileSelect={handleTileSelection}
        onTimeout={handleTimeout}
        // For results screen (index 5) pass userAnswers so that the score can be calculated.
        userAnswers={currentIndex === 5 ? userAnswers : undefined}
      />

      {currentIndex > 0 && (
        <button
          onClick={handlePrevious}
          className="absolute left-10 bottom-10 w-16 h-16 rounded-full shadow-lg flex justify-center items-center bg-gradient-to-r from-pink-400 to-purple-500 hover:scale-110 transition-transform duration-300"
        >
          <MdArrowBack size={40} color="white" />
        </button>
      )}

      {isNextEnabled && currentIndex < components.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-10 bottom-10 w-16 h-16 rounded-full shadow-lg flex justify-center items-center bg-gradient-to-r from-blue-400 to-green-500 hover:scale-110 transition-transform duration-300"
        >
          <MdArrowForward size={40} color="white" />
        </button>
      )}
    </div>
  );
};

export default AttentionGame2Level3;

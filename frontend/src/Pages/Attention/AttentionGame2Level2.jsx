import React, { useState, useEffect } from "react";
import Game2Screen1 from "../../Components/AttentionActivities/Game2Level2/Game2Screen1/Game2Screen1.jsx";
import Game2Screen2 from "../../Components/AttentionActivities/Game2Level2/Game2Screen2/Game2Screen2.jsx";
import Game2Screen3 from "../../Components/AttentionActivities/Game2Level2/Game2Screen3/Game2Screen3.jsx";
import Game2Screen4 from "../../Components/AttentionActivities/Game2Level2/Game2Screen4/Game2Screen4.jsx";
import Game2Screen5 from "../../Components/AttentionActivities/Game2Level2/Game2Screen5/Game2Screen5.jsx";
import Game2Screen6 from "../../Components/AttentionActivities/Game2Level2/Game2Screen6/Game2Screen6.jsx";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

// Correct answers for the quiz screens:
const correctAnswers = [1, 4, 3, 5, 2];

// We have six screens (screens 1-5 are quiz, screen6 is results)
const components = [
  Game2Screen1,
  Game2Screen2,
  Game2Screen3,
  Game2Screen4,
  Game2Screen5,
  Game2Screen6,
];

const AttentionGame2Level2 = () => {
  // userAnswers holds booleans for screens 1-5 (unanswered = null)
  const [userAnswers, setUserAnswers] = useState(Array(5).fill(null));
  const [currentIndex, setCurrentIndex] = useState(0);
  // isNextEnabled is true when the current quiz screen has an answer
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setIsNextEnabled(false);
  }, []);

  // Handle tile selection and update answer state
  const handleTileSelection = (tileId) => {
    if (currentIndex < 5) {
      const isCorrect = tileId === correctAnswers[currentIndex];
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentIndex] = isCorrect;
      setUserAnswers(updatedAnswers);
      setIsNextEnabled(true);
    }
  };

  // Handle timeout (answering incorrectly when time runs out)
  const handleTimeout = () => {
    if (currentIndex < 5 && userAnswers[currentIndex] === null) {
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentIndex] = false;
      setUserAnswers(updatedAnswers);
    }
    // Move to next screen if available
    if (currentIndex < components.length - 1) {
      setCurrentIndex(currentIndex + 1);
      // For quiz screens 1-5, disable Next until answered. For results screen, no Next button.
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

  // New function to reset the game
  const handleGameComplete = () => {
    // Reset the game state to the first screen
    setUserAnswers(Array(5).fill(null));
    setCurrentIndex(0); // Go back to Game2Screen1
    setIsNextEnabled(false);
  };

  const CurrentComponent = components[currentIndex];

  return (
    <div className="flex items-center justify-center h-screen relative bg-gray-100">
      <CurrentComponent
        onTileSelect={handleTileSelection}
        onTimeout={handleTimeout}
        userAnswers={currentIndex === 5 ? userAnswers : undefined}
        onGameComplete={handleGameComplete} // Pass the reset function to Screen6
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

export default AttentionGame2Level2;

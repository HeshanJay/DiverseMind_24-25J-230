// AttentionGame2Level1.jsx
import React, { useState, useEffect } from "react";
import Screen1 from "../../Components/AttentionActivities/Game2Level1/Screen1/Screen1";
import Screen2 from "../../Components/AttentionActivities/Game2Level1/Screen2/Screen2";
import Screen3 from "../../Components/AttentionActivities/Game2Level1/Screen3/Screen3";
import Screen4 from "../../Components/AttentionActivities/Game2Level1/Screen4/Screen4";
import Screen5 from "../../Components/AttentionActivities/Game2Level1/Screen5/Screen5";
import Screen6 from "../../Components/AttentionActivities/Game2Level1/Screen6/Screen6";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

// Define the correct answers for the 5 quiz screens
const correctAnswers = [4, 3, 1, 2, 4];

const components = [Screen1, Screen2, Screen3, Screen4, Screen5, Screen6];

const AttentionGame2Level1 = () => {
  // For quiz screens 0 to 4, store each answer (true/false); for unanswered, null.
  const [userAnswers, setUserAnswers] = useState(Array(5).fill(null));
  const [currentIndex, setCurrentIndex] = useState(0);
  // isNextEnabled will be true when the current screen has been answered (or it's Screen6)
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  useEffect(() => {
    // Initialize quiz: start at screen 0 and disable Next until an answer is given.
    setCurrentIndex(0);
    setIsNextEnabled(false);
  }, []);

  const handleTileSelection = (tileId) => {
    if (currentIndex < 5) {
      const isCorrect = tileId === correctAnswers[currentIndex];
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentIndex] = isCorrect;
      setUserAnswers(updatedAnswers);
      setIsNextEnabled(true);
    }
  };

  const handleTimeout = () => {
    // If time runs out on a quiz screen, mark answer as incorrect (if not already answered)
    if (currentIndex < 5 && userAnswers[currentIndex] === null) {
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentIndex] = false;
      setUserAnswers(updatedAnswers);
    }
    // Move to the next screen
    if (currentIndex < components.length - 1) {
      setCurrentIndex(currentIndex + 1);
      // For quiz screens (0-4), Next remains disabled until answered;
      // For Screen6 (results) there's no Next button.
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

  // New function to handle game restart
  const handleGameComplete = () => {
    // Reset the game state
    setUserAnswers(Array(5).fill(null));
    // Return to the first quiz screen (Screen1, index 0)
    setCurrentIndex(0);
    setIsNextEnabled(false);
  };

  const CurrentComponent = components[currentIndex];

  return (
    <div className="flex items-center justify-center h-screen relative bg-gray-100">
      <CurrentComponent
        onTileSelect={handleTileSelection}
        onTimeout={handleTimeout}
        // When on Screen6, pass the userAnswers and restart handler
        userAnswers={currentIndex === 5 ? userAnswers : undefined}
        onGameComplete={currentIndex === 5 ? handleGameComplete : undefined}
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

export default AttentionGame2Level1;

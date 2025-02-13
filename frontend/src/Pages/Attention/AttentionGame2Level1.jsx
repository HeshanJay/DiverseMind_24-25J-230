// AttentionGame2Level1.jsx
import React, { useState, useEffect } from "react";
import Screen1 from "../../Components/AttentionActivities/Game2Level1/Screen1/Screen1";
import Screen2 from "../../Components/AttentionActivities/Game2Level1/Screen2/Screen2";
import Screen3 from "../../Components/AttentionActivities/Game2Level1/Screen3/Screen3";
import Screen4 from "../../Components/AttentionActivities/Game2Level1/Screen4/Screen4";
import Screen5 from "../../Components/AttentionActivities/Game2Level1/Screen5/Screen5";
import Screen6 from "../../Components/AttentionActivities/Game2Level1/Screen6/Screen6";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const components = [Screen1, Screen2, Screen3, Screen4, Screen5, Screen6];

const AttentionGame2Level1 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [selectedTiles, setSelectedTiles] = useState(
    Array(components.length).fill(false)
  );

  useEffect(() => {
    setCurrentIndex(0);
    setIsNextEnabled(false);
  }, []);

  const handleNext = () => {
    if (currentIndex < components.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsNextEnabled(selectedTiles[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsNextEnabled(true);
    }
  };

  const handleTileSelection = () => {
    const updatedSelections = [...selectedTiles];
    updatedSelections[currentIndex] = true;
    setSelectedTiles(updatedSelections);
    setIsNextEnabled(true);
  };

  const handleTimeout = () => {
    if (currentIndex < components.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsNextEnabled(selectedTiles[currentIndex + 1]);
    }
  };

  const CurrentComponent = components[currentIndex];

  return (
    <div className="flex items-center justify-center h-screen relative bg-gray-100">
      <CurrentComponent
        onTileSelect={handleTileSelection}
        onTimeout={handleTimeout}
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

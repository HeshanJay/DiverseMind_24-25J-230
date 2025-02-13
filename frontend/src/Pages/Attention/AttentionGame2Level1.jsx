import React, { useState, useEffect } from "react";
import Screen1 from "../../Components/AttentionActivities/Game2Level1/Screen1/Screen1";
import Screen2 from "../../Components/AttentionActivities/Game2Level1/Screen2/Screen2";
import Screen3 from "../../Components/AttentionActivities/Game2Level1/Screen3/Screen3";
import Screen4 from "../../Components/AttentionActivities/Game2Level1/Screen4/Screen4";
import Screen5 from "../../Components/AttentionActivities/Game2Level1/Screen5/Screen5";
import Screen6 from "../../Components/AttentionActivities/Game2Level1/Screen6/Screen6";
import { MdArrowBack, MdArrowForward } from "react-icons/md"; // Arrow Icons

const components = [Screen1, Screen2, Screen3, Screen4, Screen5, Screen6];

const AttentionGame2Level1 = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Always start at Screen1

  useEffect(() => {
    // Ensure currentIndex starts from 0 when the component mounts
    setCurrentIndex(0);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < components.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const CurrentComponent = components[currentIndex];

  return (
    <div className="flex items-center justify-center h-screen relative bg-gray-100">
      <CurrentComponent />

      {/* Previous Button */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrevious}
          className="absolute left-10 bottom-10 w-16 h-16 rounded-full shadow-lg flex justify-center items-center bg-gradient-to-r from-pink-400 to-purple-500 hover:scale-110 transition-transform duration-300"
        >
          <MdArrowBack size={40} color="white" />
        </button>
      )}

      {/* Next Button */}
      {currentIndex < components.length - 1 && (
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

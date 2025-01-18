import React, { useState } from "react";
import backgroundImage from "../../../assets/background_images/boardmonkey.jpg";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const Passage6 = ({ onPrevious, onNext }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStopCamera = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/attention/stop");
      const data = await response.json();
      console.log("Camera stopped:", data);
      onNext(); // Optionally navigate to the next page after stopping the camera
    } catch (error) {
      console.error("Error stopping camera:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="bg-cover bg-center w-screen h-screen flex justify-center items-center relative m-0 p-0"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Stop Camera Button */}
      <button
        onClick={handleStopCamera}
        disabled={isLoading}
        className={`absolute top-[40%] px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white text-lg font-bold rounded-full shadow-lg flex items-center space-x-2 transition-transform duration-300 ${
          isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
        }`}
      >
        <span>{isLoading ? "Stopping..." : "Click to end"}</span>
      </button>

      {/* Navigation Buttons */}
      <button
        onClick={onPrevious}
        className="absolute bottom-10 left-28 w-16 h-16 rounded-full shadow-lg flex justify-center items-center bg-gradient-to-r from-purple-400 to-pink-500 hover:scale-110 transition-transform duration-300"
      >
        <MdArrowBack size={40} color="white" />
      </button>

      <button
        onClick={onNext}
        className="absolute bottom-10 right-28 w-16 h-16 rounded-full shadow-lg flex justify-center items-center bg-gradient-to-r from-blue-400 to-green-500 hover:scale-110 transition-transform duration-300"
      >
        <MdArrowForward size={40} color="white" />
      </button>
    </div>
  );
};

export default Passage6;

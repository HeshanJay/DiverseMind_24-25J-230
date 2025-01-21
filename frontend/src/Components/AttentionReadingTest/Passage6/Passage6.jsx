import React, { useState } from "react";
import "./Passage6.css";
import backgroundImage from "../../../assets/background_images/boardmonkey.jpg";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import axios from "axios";

const Passage6 = ({ onPrevious, onNext }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStopCamera = async () => {
    setIsLoading(true);
    try {
      // First stop the camera
      const stopResponse = await fetch("http://localhost:8000/attention/stop");
      const stopData = await stopResponse.json();
      console.log("Camera stopped:", stopData);

      // Then fetch the final results
      const resultResponse = await axios.get(
        "http://localhost:8000/attention/result"
      );
      const attentionData = resultResponse.data;

      // Save the results to database
      if (attentionData) {
        const saveResponse = await axios.post(
          "http://localhost:8000/save_attention_span",
          {
            average_score: attentionData.average_score,
            status: attentionData.status,
            total_time: attentionData.total_time,
          }
        );
        console.log("Attention data saved successfully:", saveResponse.data);
      }

      onNext(); // Navigate to the next page after stopping and saving
    } catch (error) {
      console.error("Error in stop camera process:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate sprinkles
  const sprinkles = Array.from({ length: 50 }).map((_, index) => (
    <div
      key={index}
      className="sprinkle"
      style={{
        left: `${Math.random() * 100}vw`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 3}s`,
      }}
    />
  ));

  return (
    <div
      className="bg-cover bg-center w-screen h-screen flex justify-center items-center relative m-0 p-0 overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Sprinkles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {sprinkles}
      </div>

      {/* Stop Camera Button */}
      <button
        onClick={handleStopCamera}
        disabled={isLoading}
        className={`absolute top-[65%] left-[57%] transform -translate-x-1/2 px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white text-lg font-bold rounded-full shadow-lg flex items-center space-x-2 transition-transform duration-300 border-4 border-yellow-300 ${
          isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
        }`}
      >
        <span>{isLoading ? "Stopping..." : "අවසන් කරමු 🛑"}</span>
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

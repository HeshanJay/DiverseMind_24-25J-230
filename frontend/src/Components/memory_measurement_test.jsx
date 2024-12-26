import React from "react";
import { useNavigate } from "react-router-dom";
import backImg from "../assets/background_images/back3.jpg"; // Ensure the image path is correct

const MemoryMeasurementTest = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/memory-test-activity"); // Correct navigation route
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backImg})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">මතක පරීක්ෂණය</h1>

        {/* Instructions Container */}
        <div className="bg-gray-800 bg-opacity-70 px-8 py-6 rounded-lg shadow-lg text-left max-w-xl w-full">
          <ul className="text-lg md:text-xl mb-8 list-disc list-inside leading-relaxed ml-11">
            <li>උපදෙස් නිවැරදිව කියවා පිළිතුරු සපයන්න.</li>
            <li>ප්‍රශ්න 5 කට පිළිතුරු සැපයිය යුතුයි.</li>
            <li>එක් ප්‍රශ්නයකට තත්පර 10 ක් ලබා දේ.</li>
            <li>පින්තූරය මතක තබා ගන්න.</li>
          </ul>
          <p className="text-2xl md:text-3xl font-semibold flex items-center justify-center text-center">
            රූපය නිවැරදිව මතක තබාගෙන, නිවැරදි පිළිතුර තෝරන්න.
          </p>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl md:text-2xl px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
        >
          ආරම්භ කරන්න
        </button>
      </div>
    </div>
  );
};

export default MemoryMeasurementTest;


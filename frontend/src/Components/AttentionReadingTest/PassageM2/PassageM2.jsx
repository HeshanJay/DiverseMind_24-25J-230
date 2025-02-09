import React, { useState } from "react";
import "./PassageM2.css";
import backgroundImage from "../../../assets/background_images/back_img4.jpg";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const PassageM2 = ({ onPrevious, onNext }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    "හිඹුටු ගසක වැඳුන ගිරවා,සන්සුන්ව සිටින්නෙක්",
    "හිඹුටු කැලේ ඇති පැහැදිලිම සතෙකි,හැමෝටම උපදෙස් දෙනා",
    "හිඹුටු කැලේ වැඳුන වඳුරෙකු,කවදාවත් දඟ නොකරන්නෙක්",
    "හිඹුටු කැලේ වඳුරු පැටියෙක්,දඟකාරයෙක්", // Correct answer is "D"
  ];
  const correctAnswer = "හිඹුටු කැලේ වඳුරු පැටියෙක්,දඟකාරයෙක්";

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    onNext(selectedOption === correctAnswer);
  };

  return (
    <div
      className="bg-cover bg-center w-screen h-screen flex justify-center items-center relative m-0 p-0"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl max-w-3xl text-center border-4 border-purple-400">
        <h1 className="text-3xl font-extrabold text-purple-600 mb-6">
          බුකුං බුකුං යනු කවුරුන්ද, සහ ඔහුගේ ස්වභාවය කුමක්ද?
        </h1>
        <div className="grid grid-cols-1 gap-4 text-lg">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`p-4 rounded-lg border-2 transition-transform duration-300 shadow-md hover:scale-105 ${
                selectedOption === option
                  ? "bg-purple-500 text-white border-purple-700"
                  : "bg-white text-gray-800 border-gray-300"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onPrevious}
        className="absolute bottom-10 left-28 w-16 h-16 rounded-full shadow-lg flex justify-center items-center bg-gradient-to-r from-purple-400 to-pink-500 hover:scale-110 transition-transform duration-300"
      >
        <MdArrowBack size={40} color="white" />
      </button>

      <button
        onClick={handleNextClick}
        disabled={selectedOption === null}
        className={`absolute bottom-10 right-28 w-16 h-16 rounded-full shadow-lg flex justify-center items-center bg-gradient-to-r from-blue-400 to-green-500 hover:scale-110 transition-transform duration-300 ${
          selectedOption === null ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <MdArrowForward size={40} color="white" />
      </button>
    </div>
  );
};

export default PassageM2;

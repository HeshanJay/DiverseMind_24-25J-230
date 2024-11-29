import React, { useState } from "react";
import "./Passage3.css"; // Additional styling
import backgroundImage from "../../assets/background_images/back_img4.jpg";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const Passage3 = ({ onPrevious, onNext }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    "වගාවේ පිටුපස සැගවීම",
    "විදුලිය වගේ පැනලා දුවීම",
    "වගාව විනාශ කිරීම දිගටම කරමින් සිටීම",
    "හෙනේ මාමාට ප්‍රහාරක කිරීම",
  ];

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  return (
    <div
      className="bg-cover bg-center w-screen h-screen flex justify-center items-center relative m-0 p-0"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl max-w-3xl text-center border-4 border-blue-400">
        <h1 className="text-3xl font-extrabold text-blue-600 mb-6">
          හෙනේ මාමාගේ අඩි සද්දෙ ඇහුන ගමන් මියෝ කරන්නේ කුමක්ද?
        </h1>
        <div className="grid grid-cols-1 gap-4 text-lg">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`p-4 rounded-lg border-2 transition-transform duration-300 shadow-md hover:scale-105 ${
                selectedOption === index
                  ? "bg-blue-500 text-white border-blue-700"
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
        onClick={() => onNext("B")} // Correct answer for Passage3 is "B"
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

export default Passage3;

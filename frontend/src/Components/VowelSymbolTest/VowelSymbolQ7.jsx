import React, { useState } from "react";
import { MdArrowBack } from "react-icons/md"; // Importing the Back Icon
import backgroundImg from "../../assets/background_images/back_img1.jpg";

const VowelSymbolQ7 = ({ onAnswer, onBack }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Tracks the selected answer
  // const correctAnswer = "කෙටි ඇදපිල්ල, කෙටි ඉස්පිල්ල, ඇලපිල්ල"; // Known to parent, no need here
  const answers = [
    "කෙටි ඇදපිල්ල, කෙටි ඉස්පිල්ල, ඇලපිල්ල",
    "කෙටි ඇදපිල්ල, කෙටි ඉස්පිල්ල, ඇලපිල්ල, හල් කිරීම",
    "කෙටි ඉස්පිල්ල, ඇලපිල්ල",
    "හල්කිරීම, කෙටි ඉස්පිල්ල",
  ];

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextClick = () => {
    if (!selectedAnswer) {
      alert("කරුණාකර පිල්ලමක් තෝරන්න!");
      return;
    }
    // Pass the chosen answer back to the parent
    onAnswer(selectedAnswer);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Main Box */}
      <div className="absolute top-14 w-full flex justify-center">
        <div className="bg-gradient-to-r from-blue-300/80 to-green-300/80 p-8 rounded-3xl shadow-lg w-[720px] h-auto relative border-4 border-green-600">
          {/* Title */}
          <div className="mb-6 text-2xl font-extrabold text-center text-white bg-purple-600 bg-opacity-80 py-2 px-6 rounded-xl shadow-md tracking-wider">
            මෙම වචනයෙහි ඇති පිල්ලම් මොනවාද?
          </div>

          {/* Word Section */}
          <div className="mb-8 p-6 rounded-3xl shadow-lg bg-white text-center text-4xl font-bold text-blue-800 tracking-widest border-4 border-blue-400">
            <span className="inline-block">රැකියාවක්</span>
          </div>

          {/* Answers Section */}
          <div className="grid grid-cols-2 gap-6 px-4">
            {answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(answer)}
                className={`p-6 rounded-2xl shadow-lg text-2xl font-extrabold tracking-wide transition-all duration-300 ${
                  selectedAnswer === answer
                    ? "bg-blue-300 scale-105 text-white"
                    : "bg-blue-200 text-blue-800 hover:bg-blue-300 hover:scale-105"
                }`}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Next Button */}
      <button
        className="absolute bottom-8 right-10 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 hover:from-yellow-400 hover:to-purple-400 text-white text-xl font-extrabold py-3 px-8 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center gap-2"
        onClick={handleNextClick}
      >
        🌟 ඉදිරියට යමු 🚀
      </button>

      {/* Previous Button */}
      <button
        onClick={onBack}
        className="absolute bottom-10 left-28 w-16 h-16 rounded-full shadow-lg flex justify-center items-center bg-gradient-to-r from-pink-400 to-purple-500 hover:scale-110 transition-transform duration-300"
      >
        <MdArrowBack size={40} color="white" />
      </button>
    </div>
  );
};

export default VowelSymbolQ7;

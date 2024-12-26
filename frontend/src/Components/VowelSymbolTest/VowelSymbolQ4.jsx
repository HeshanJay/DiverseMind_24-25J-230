import React, { useState } from "react";
import { MdArrowBack } from "react-icons/md"; // Importing the Back Icon
import backgroundImg from "../../assets/background_images/back_img1.jpg";
import birdImage from "../../assets/VowelSymbolTest_images/bird.png";

const VowelSymbolQ4 = ({ onNext, onBack }) => {
  const [droppedSymbol, setDroppedSymbol] = useState(""); // Tracks the dropped symbol
  const choices = ["කූ", "කු", "කි", "ක"]; // Drag-and-drop choices
  const correctAnswer = "කු"; // Correct vowel for "කුරුල්ලා"

  const handleDragStart = (e, symbol) => {
    e.dataTransfer.setData("text/plain", symbol); // Store the symbol being dragged
    e.dataTransfer.effectAllowed = "move"; // Allow move effect
  };

  const handleDrop = (e) => {
    e.preventDefault(); // Prevent default behavior
    const symbol = e.dataTransfer.getData("text/plain"); // Retrieve the dragged data
    setDroppedSymbol(symbol); // Set the dropped symbol
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow dropping
    e.dataTransfer.dropEffect = "move"; // Indicate move effect
  };

  const isCorrect = droppedSymbol === correctAnswer; // Check if the answer is correct

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="absolute top-14 w-full flex justify-center">
        <div className="bg-gradient-to-r from-blue-300/80 to-green-300/80 p-8 rounded-3xl shadow-lg w-[620px] h-[510px] relative border-4 border-green-600">
          {/* Content inside the box */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-3xl">
            {/* Title */}
            <div className="mb-4 text-2xl font-extrabold text-center text-white bg-purple-600 bg-opacity-80 py-2 px-4 rounded-xl shadow-md">
              නිවැරදි පිල්ලම සහිත අකුර යොදන්න
            </div>

            {/* Image inside a styled box */}
            <div className="mb-6 p-4 rounded-3xl shadow-lg border-4 border-green-400 flex items-center justify-center w-64 h-64 bg-gradient-to-r from-green-300 via-green-200 to-green-100">
              <img
                src={birdImage}
                alt="Bird"
                className="w-48 h-auto rounded-lg shadow-md"
              />
            </div>

            {/* Word with Blank */}
            <div className="mb-6 text-4xl font-bold text-center text-blue-800">
              <span
                onDragOver={handleDragOver} // Allow dropping
                onDrop={handleDrop} // Handle drop
                className={`inline-block align-middle w-20 h-16 mx-2 text-center bg-blue-50 rounded-xl shadow-inner ${
                  isCorrect ? "border-gray-400" : "border-gray-400"
                }`}
                style={{
                  lineHeight: "3rem", // Match the line height to the text
                  borderWidth: droppedSymbol ? "2px" : "0px", // Border only if something is dropped
                }}
              >
                {droppedSymbol || ""}
              </span>
              <span className="inline">රුල්ලා</span>
            </div>

            {/* Choices */}
            <div className="flex gap-6">
              {choices.map((choice) => (
                <div
                  key={choice}
                  draggable
                  onDragStart={(e) => handleDragStart(e, choice)} // Handle drag start
                  className="w-16 h-16 flex items-center justify-center bg-blue-200 text-blue-800 font-bold rounded-full shadow-lg cursor-pointer hover:-translate-y-1 hover:scale-110 transition ease-in-out duration-300 text-3xl"
                >
                  {choice}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <button
        className="absolute bottom-8 right-20 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 hover:from-yellow-400 hover:to-purple-400 text-white text-xl font-extrabold py-3 px-8 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
        onClick={() => {
          onNext(); // Move to the next component
        }}
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

export default VowelSymbolQ4;

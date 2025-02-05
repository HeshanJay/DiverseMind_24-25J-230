import React, { useState } from "react";
import { MdArrowBack } from "react-icons/md"; // Importing the Back Icon
import backgroundImg from "../../../assets/background_images/back_img1.jpg";
import museumImage from "../../../assets/VowelSymbolTest_images/museum.png";

const VowelSymbolQ5 = ({ onAnswer, onBack }) => {
  const [droppedSymbol, setDroppedSymbol] = useState(""); // Tracks the dropped symbol
  const choices = ["කවු", "ක", "කෞ", "කා"]; // Drag-and-drop choices
  // const correctAnswer = "කෞ"; // Known to parent, no need here

  const handleDragStart = (e, symbol) => {
    e.dataTransfer.setData("text/plain", symbol);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const symbol = e.dataTransfer.getData("text/plain");
    setDroppedSymbol(symbol);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleNextClick = () => {
    if (!droppedSymbol) {
      alert("කරුණාකර පිල්ලමක් තෝරන්න!");
      return;
    }
    // Pass the chosen symbol back to the parent
    onAnswer(droppedSymbol);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="absolute top-15 w-full flex justify-center">
        <div className="bg-gradient-to-r from-gray-300/80 to-green-300/80 p-8 rounded-3xl shadow-lg w-[640px] h-[530px] relative border-4 border-green-600">
          {/* Content inside the box */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-3xl">
            {/* Title */}
            <div className="mb-4 text-3xl font-extrabold text-center text-white bg-gradient-to-r from-green-500 to-green-700 bg-opacity-90 py-2 px-4 rounded-xl shadow-md">
              නිවැරදි පිල්ලම සහිත අකුර යොදන්න
            </div>

            {/* Image inside a styled box */}
            <div className="mb-6 p-4 rounded-3xl shadow-lg border-4 border-orange-400 flex items-center justify-center w-64 h-64 bg-gradient-to-r from-orange-300 via-orange-200 to-orange-100">
              <img
                src={museumImage}
                alt="Museum"
                className="w-48 h-auto rounded-lg shadow-md"
              />
            </div>

            {/* Word with Blank */}
            <div className="mb-6 text-5xl font-extrabold text-center text-green-900">
              <span
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="inline-block align-middle w-24 h-20 mx-2 text-center bg-white text-green-900 font-bold rounded-xl shadow-lg border-4 border-green-600"
                style={{
                  lineHeight: "4rem",
                  borderWidth: droppedSymbol ? "4px" : "2px",
                }}
              >
                {droppedSymbol || "?"}
              </span>
              <span className="inline">තුකගරය</span>
            </div>

            {/* Choices */}
            <div className="flex gap-6">
              {choices.map((choice) => (
                <div
                  key={choice}
                  draggable
                  onDragStart={(e) => handleDragStart(e, choice)}
                  className="w-16 h-16 flex items-center justify-center bg-green-300 text-green-900 font-bold rounded-full shadow-lg border-2 border-green-700 cursor-pointer hover:-translate-y-1 hover:scale-110 transition ease-in-out duration-300 text-3xl"
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
        className="absolute bottom-8 right-5 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 hover:from-yellow-400 hover:to-purple-400 text-white text-xl font-extrabold py-3 px-8 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
        onClick={handleNextClick}
      >
        🌟 ඉදිරියට යමු 🚀
      </button>

      {/* Previous Button */}
      <button
        onClick={onBack}
        className="absolute bottom-10 left-20 w-16 h-16 rounded-full shadow-lg flex justify-center items-center bg-gradient-to-r from-pink-400 to-purple-500 hover:scale-110 transition-transform duration-300"
      >
        <MdArrowBack size={40} color="white" />
      </button>
    </div>
  );
};

export default VowelSymbolQ5;

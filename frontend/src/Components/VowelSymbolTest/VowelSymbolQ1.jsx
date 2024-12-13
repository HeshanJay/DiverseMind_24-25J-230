import React, { useState } from "react";
import { MdArrowBack } from "react-icons/md"; // Importing the Back Icon
import backgroundImg from "../../assets/background_images/back_img1.jpg";
import necklaceImage from "../../assets/VowelSymbolTest_images/neckless2.png";

const VowelSymbolQ1 = ({ onAnswer, onBack }) => {
  const [droppedSymbol, setDroppedSymbol] = useState(""); // Tracks the dropped symbol
  const choices = ["මි", "මා", "මු", "මෑ"]; // Drag-and-drop choices
  // const correctAnswer = "මා"; // The correct answer is known, but not needed here for logic

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
      <div className="absolute top-14 w-full flex justify-center">
        <div className="bg-gradient-to-r from-blue-300/80 to-green-300/80 p-8 rounded-3xl shadow-lg w-[620px] h-[510px] relative border-4 border-green-600">
          {/* Content inside the box */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-3xl">
            {/* Title */}
            <div className="mb-4 text-2xl font-extrabold text-center text-white bg-purple-600 bg-opacity-80 py-2 px-4 rounded-xl shadow-md">
              නිවැරදි පිල්ලම සහිත අකුර යොදන්න
            </div>

            {/* Image inside a styled box */}
            <div className="mb-6 p-4 rounded-3xl shadow-lg border-4 border-pink-400 flex items-center justify-center w-64 h-64 bg-gradient-to-r from-pink-300 via-red-200 to-orange-200">
              <img
                src={necklaceImage}
                alt="Necklace"
                className="w-48 h-auto rounded-lg shadow-md"
              />
            </div>

            {/* Word with Blank */}
            <div className="mb-6 text-4xl font-bold text-center text-blue-800">
              <span
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="inline-block align-middle w-20 h-16 mx-2 text-center bg-blue-50 rounded-xl shadow-inner border-gray-400"
                style={{
                  lineHeight: "3rem",
                  borderWidth: droppedSymbol ? "2px" : "0px",
                }}
              >
                {droppedSymbol || ""}
              </span>
              <span className="inline">ලය</span>
            </div>

            {/* Choices */}
            <div className="flex gap-6">
              {choices.map((choice) => (
                <div
                  key={choice}
                  draggable
                  onDragStart={(e) => handleDragStart(e, choice)}
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

export default VowelSymbolQ1;

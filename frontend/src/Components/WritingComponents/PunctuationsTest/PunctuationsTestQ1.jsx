import React, { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import backgroundImg from "../../../assets/background_images/back_img1.jpg";

const PunctuationsTestQ1 = ({ onAnswer, onBack }) => {
  const punctuationMarks = [
    { mark: ".", name: "තිත" },
    { mark: ",", name: "කොමාව" },
    { mark: "?", name: "ප්‍රශ්නාර්ථ ලකුණ" },
    { mark: "!", name: "විස්මයාදි ලකුණ" },
    { mark: '" "', name: "යුගල උඩු කෝමා" },
    { mark: "()", name: "සරල වරහන්" },
  ];

  const [droppedItems, setDroppedItems] = useState(
    punctuationMarks.map((item) => ({ ...item, answer: "" }))
  );

  const answerChoices = [
    "තිත",
    "ප්‍රශ්නාර්ථ ලකුණ",
    "කොමාව",
    "විස්මයාදි ලකුණ",
    "සරල වරහන්",
    "යුගල උඩු කෝමා",
  ];

  const handleDragStart = (e, answer) => {
    e.dataTransfer.setData("text/plain", answer);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const droppedAnswer = e.dataTransfer.getData("text/plain");
    setDroppedItems((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, answer: droppedAnswer } : item
      )
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Calculate how many are correct
  const correctCount = droppedItems.reduce(
    (count, item) => count + (item.answer === item.name ? 1 : 0),
    0
  );

  const handleNextClick = () => {
    // If user didn't place answers at all, you could alert. But let's allow partial submissions.
    // Just call onAnswer with the number of correct answers
    onAnswer(correctCount);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="absolute top-15 w-full flex justify-center">
        <div className="bg-gradient-to-r from-gray-300/80 to-yellow-300/80 p-8 rounded-3xl shadow-lg w-[750px] min-h-[480px] relative border-4 border-yellow-600">
          {/* Title */}
          <div className="mb-4 text-3xl font-extrabold text-center text-white bg-gradient-to-r from-yellow-500 to-yellow-700 bg-opacity-90 py-2 px-4 rounded-xl shadow-md">
            විරාම ලක්ෂණ නම් කරන්න
          </div>

          {/* Punctuation Marks and Drop Zones */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {droppedItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white rounded-lg shadow-md px-3 py-3 text-2xl font-bold"
              >
                <span className="text-3xl text-blue-800">{item.mark}</span>
                <div
                  onDrop={(e) => handleDrop(e, index)}
                  onDragOver={handleDragOver}
                  className={`w-60 h-10 rounded-lg border-2 text-center flex items-center justify-center ${
                    item.answer
                      ? "bg-blue-100 border-blue-400"
                      : "bg-yellow-100 border-yellow-400"
                  }`}
                >
                  {item.answer}
                </div>
              </div>
            ))}
          </div>

          {/* Answer Choices */}
          <div className="grid grid-cols-3 gap-3">
            {answerChoices.map((choice, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => handleDragStart(e, choice)}
                className="p-3 rounded-lg bg-pink-200 text-pink-800 text-2xl text-center font-bold shadow-md cursor-pointer hover:bg-pink-300 hover:scale-105 transition-transform duration-300"
              >
                {choice}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Button */}
      <button
        className="absolute bottom-8 right-5 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 hover:from-yellow-400 hover:to-purple-400 text-white text-xl font-extrabold py-3 px-8 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center gap-2"
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

export default PunctuationsTestQ1;

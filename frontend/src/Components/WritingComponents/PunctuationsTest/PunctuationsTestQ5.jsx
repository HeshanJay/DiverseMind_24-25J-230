import React, { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import backgroundImg from "../../../assets/background_images/back_img1.jpg";

const PunctuationsTestQ5 = ({ onAnswer, onBack, onFinalEvalAndSave }) => {
  const question = "නිවැරදි විරාම ලක්ෂණ සහිත වාක්‍ය තෝරන්න";
  const answers = [
    "අපොයි! ගමට වුනු විපත.",
    "අපොයි ගමට වුනු විපත!",
    "අපොයි, ගමට වුනු විපත!",
    "අපොයි. ගමට වුනු විපත!",
  ];
  const correctAnswer = "අපොයි! ගමට වුනු විපත.";

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextClick = () => {
    if (!selectedAnswer) {
      alert("කරුණාකර පිල්ලමක් තෝරන්න!");
      return;
    }

    // Determine if correct
    const newScore = selectedAnswer === correctAnswer ? 1 : 0;

    // 1) Update parent's punctuation score
    onAnswer(newScore);

    // 2) After a short delay, call final evaluation & save
    //    so the parent's state for punctuationScore is updated
    setTimeout(() => {
      onFinalEvalAndSave(newScore);
    }, 300);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="absolute top-15 w-full flex justify-center">
        <div className="bg-gradient-to-r from-blue-300/80 to-green-300/80 p-8 rounded-3xl shadow-lg w-[750px] min-h-[480px] relative border-4 border-green-600">
          <div className="mb-4 text-3xl font-extrabold text-center text-white bg-gradient-to-r from-purple-500 to-purple-700 bg-opacity-90 py-2 px-4 rounded-xl shadow-md">
            {question}
          </div>

          <div className="grid grid-cols-1 gap-4 px-4">
            {answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(answer)}
                className={`p-5 rounded-xl shadow-lg text-2xl font-extrabold tracking-wide transition-all duration-300 ${
                  selectedAnswer === answer
                    ? "bg-blue-500 scale-105 text-white"
                    : "bg-blue-200 text-blue-800 hover:bg-blue-300 hover:scale-105"
                }`}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        className="absolute bottom-8 right-5
            bg-gradient-to-r from-green-500 via-green-600 to-green-700
            text-white text-xl font-extrabold py-3 px-8 
            rounded-full shadow-xl border-4 border-yellow-300
            hover:shadow-2xl hover:scale-105 hover:border-yellow-100
            transition-all duration-300 flex items-center gap-2"
        onClick={handleNextClick}
      >
        ✅ අවසන් කරමු
      </button>

      <button
        onClick={onBack}
        className="absolute bottom-10 left-20 w-16 h-16 rounded-full shadow-lg bg-gradient-to-r from-pink-400 to-purple-500 hover:scale-110 transition-transform duration-300 flex justify-center items-center"
      >
        <MdArrowBack size={40} color="white" />
      </button>
    </div>
  );
};

export default PunctuationsTestQ5;

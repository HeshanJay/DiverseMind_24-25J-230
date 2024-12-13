import React, { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import backgroundImg from "../../assets/background_images/back_img1.jpg";

const PunctuationsTestQ2 = ({ onAnswer, onBack }) => {
  const question = "නිවැරදි විරාම ලක්ෂණ සහිත වාක්‍ය තෝරන්න";
  const answers = [
    "තාත්තා වැඩට ගියේය!",
    "තාත්තා වැඩට ගියේය.",
    '"තාත්තා වැඩට ගියේය"',
    "තාත්තා, වැඩට ගියේය",
  ];
  const correctAnswer = "තාත්තා වැඩට ගියේය."; // Correct answer

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextClick = () => {
    if (!selectedAnswer) {
      alert("කරුණාකර පිල්ලමක් තෝරන්න!");
      return;
    }
    const score = selectedAnswer === correctAnswer ? 1 : 0;
    onAnswer(score);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="absolute top-20 w-full flex justify-center">
        <div className="bg-gradient-to-r from-blue-300/80 to-green-300/80 p-6 rounded-3xl shadow-lg w-[720px] h-auto relative border-4 border-green-600">
          <div className="mb-6 text-2xl font-extrabold text-center text-white bg-purple-600 bg-opacity-80 py-3 px-6 rounded-xl shadow-md tracking-wide">
            {question}
          </div>

          <div className="grid grid-cols-1 gap-4 px-4">
            {answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(answer)}
                className={`p-4 rounded-xl shadow-lg text-xl font-extrabold tracking-wide transition-all duration-300 ${
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

      <button
        className="absolute bottom-8 right-10 bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 text-white text-xl font-extrabold py-3 px-8 rounded-full shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300"
        onClick={handleNextClick}
      >
        🌟 ඉදිරියට යමු 🚀
      </button>

      <button
        onClick={onBack}
        className="absolute bottom-10 left-28 w-16 h-16 rounded-full shadow-lg bg-gradient-to-r from-pink-400 to-purple-500 hover:scale-110 transition-transform duration-300 flex justify-center items-center"
      >
        <MdArrowBack size={40} color="white" />
      </button>
    </div>
  );
};

export default PunctuationsTestQ2;

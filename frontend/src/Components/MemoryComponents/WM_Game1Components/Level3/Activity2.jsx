import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import sea_back8 from "../../../../assets/WM_Interventions_images/L1_images/sea_back8.png";
import octopus5 from "../../../../assets/WM_Interventions_images/L1_images/octopus5.png";

const fillQuestions = [
  {
    id: 1,
    sentenceTemplate: " ___මහත්මිය ___ හරස් කරයි.",
    correctAnswers: ["වයස්ගත", "මාර්ගය"],
    choicesPerBlank: [
      ["වයස්ගත", "ගිනි", "පුද්ගලයෙකු", "පොලිස්"],
      ["මාර්ගය", "රෝද පුටුව", "ජල නළය", "තල්ලු"],
    ],
  },
  {
    id: 2,
    sentenceTemplate: " පුද්ගලයෙකු ___ තල්ලු කරයි.",
    correctAnswers: ["රෝද පුටුව"],
    choicesPerBlank: [["රෝද පුටුව", "මාර්ගය", "ජල නළය", "හරස්"]],
  },
  {
    id: 3,
    sentenceTemplate: "___ ___ ගින්න නිවීමට  ___  ___ භාවිතා කරයි.",
    correctAnswers: ["ගිනි", "නිවීම් සේවකයා", "ජල", "නළය"],
    choicesPerBlank: [
      ["ගිනි", "වයස්ගත", "පුද්ගලයෙකු", "පොලිස්"],
      ["නිවීම් සේවකයා", "නිලධාරියා", "මහත්මිය", "නළය"],
      ["ජල", "ගින්න", "රෝද", "අවට"],
      ["නළය", "පරිසරය", "තල්ලු", "හරස්"],
    ],
  },
  {
    id: 4,
    sentenceTemplate: " ___ ___  සැලකිලිමත්ව  ___  නිරීක්ෂණය කරයි.",
    correctAnswers: ["පොලිස්", "නිලධාරියා", "අවට පරිසරය"],
    choicesPerBlank: [
      ["පොලිස්", "වයස්ගත", "ගිනි", "නිවීම්"],
      ["නිලධාරියා", "මහත්මිය", "සැලකිලිමත්ව", "නළය"],
      ["අවට පරිසරය", "ජල", "තල්ලු", "හරස්"],
    ],
  },
  {
    id: 5,
    sentenceTemplate: " ___ අනතුරෙන් ___ බේරා ගනී.",
    correctAnswers: ["වෛද්‍යවරයා", "රෝගියා"],
    choicesPerBlank: [
      ["වෛද්‍යවරයා", "නිලධාරියා", "වයස්ගත", "නිවීම්"],
      ["රෝගියා", "මහත්මිය", "තල්ලු", "ගිනි"],
    ],
  },
];

function Activity2({ onNext }) {
  const [userAnswers, setUserAnswers] = useState(
    fillQuestions.map((q) => Array(q.correctAnswers.length).fill(""))
  );
  const [page, setPage] = useState(1);

  const handleSelect = (questionIndex, blankIndex, value) => {
    setUserAnswers((prev) =>
      prev.map((answersArr, i) => {
        if (i === questionIndex) {
          const newArr = [...answersArr];
          newArr[blankIndex] = value;
          return newArr;
        }
        return answersArr;
      })
    );
  };

  const calculateScore = () => {
    let score = 0;
    userAnswers.forEach((userAnswer, qIndex) => {
      fillQuestions[qIndex].correctAnswers.forEach((correct, aIndex) => {
        if (userAnswer[aIndex] === correct) score += 2; // Add 2 marks per correct blank
      });
    });
    return score;
  };

  const handleNextPage = () => {
    if (page === 1) {
      setPage(2); // Move to second set of questions
    } else {
      const finalScore = calculateScore();
      onNext(finalScore); // Move to feedback after last set
    }
  };

  const isAllFilled = () => {
    const start = page === 1 ? 0 : 3;
    const end = page === 1 ? 3 : fillQuestions.length;
    return userAnswers
      .slice(start, end)
      .every((answers) => answers.every((answer) => answer !== ""));
  };

  const pageQuestions =
    page === 1 ? fillQuestions.slice(0, 3) : fillQuestions.slice(3);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${sea_back8})` }}
    >
      {/* Animated Octopus */}
      <img
        src={octopus5}
        alt="Octopus"
        className="absolute right-14 bottom-120 w-40 h-35 animate-float z-10"
      />

      {/* White container box for header text */}
      {page === 1 && (
        <div className="bg-white bg-opacity-50 p-4 rounded-2xl border-4 border-black mt-12 mb-8 z-20">
          <h1 className="text-3xl font-bold text-black">
            නිවැරදි පිළිතුර තෝරන්න
          </h1>
        </div>
      )}

      <div className="space-y-4 w-full max-w-3xl px-4 z-20">
        {pageQuestions.map((question, i) => {
          const globalIndex = page === 1 ? i : i + 3;
          const parts = question.sentenceTemplate.split("___");

          return (
            <div
              key={question.id}
              className="bg-black bg-opacity-70 rounded-lg p-4 shadow-lg flex flex-col justify-between h-[125px] w-full"
            >
              <div className="text-xl font-bold mb-2 text-white">
                වාක්‍යය {question.id}:
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xl">
                {parts.map((text, partIndex) => {
                  const hasBlank = partIndex < question.correctAnswers.length;
                  return (
                    <React.Fragment key={partIndex}>
                      {text && <span className="text-white">{text}</span>}
                      {hasBlank && (
                        <select
                          className="border-b-2 border-gray-400 focus:outline-none focus:border-blue-600 px-1 py-0.5 text-lg bg-transparent text-white"
                          value={userAnswers[globalIndex][partIndex]}
                          onChange={(e) =>
                            handleSelect(globalIndex, partIndex, e.target.value)
                          }
                        >
                          <option value="" className="text-black"></option>
                          {question.choicesPerBlank[partIndex].map(
                            (choice, cIdx) => (
                              <option
                                key={cIdx}
                                value={choice}
                                className="text-black"
                              >
                                {choice}
                              </option>
                            )
                          )}
                        </select>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleNextPage}
        className={`mt-4 bg-gradient-to-r from-blue-700 to-teal-500 text-white font-bold text-xl md:text-2xl px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 hover:rotate-1 ${
          isAllFilled()
            ? "bg-gradient-to-r from-teal-400 to-cyan-700 text-white hover:from-teal-500 hover:to-cyan-600"
            : "bg-gradient-to-r from-gray-400 to-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!isAllFilled()}
      >
        {page === 1 ? <FaArrowRight size={24} /> : "අවසානය"}
      </button>
    </div>
  );
}

export default Activity2;

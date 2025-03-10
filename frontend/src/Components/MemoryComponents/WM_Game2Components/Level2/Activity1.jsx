import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import L2_back3 from "../../../../assets/WM_Interventions_images/L2_images/L2_back3.png";
import img_egg1 from "../../../../assets/WM_Interventions_images/L2_images/img_egg1.png";
import dino_img from "../../../../assets/WM_Interventions_images/L2_images/dino_img.png";
import dino_break from "../../../../assets/WM_Interventions_images/L2_images/dino_break.png";
import L2_img2 from "../../../../assets/WM_Interventions_images/L2_images/L2_img2.jpg";

const questions = [
  {
    question: "1.ජලයේ ඇති කුඩා තාරාවන් කීයක්ද?",
    correctAnswer: "6",
    options: ["8", "12", "9", "5", "6"],
  },
  {
    question: "2.ගඟේ ළමයි කී දෙනෙක් සෙල්ලම් කරනවාද?",
    correctAnswer: "5",
    options: ["3", "4", "6", "7", "5"],
  },
  {
    question: "3.ගඟ ළඟ කී දෙනෙක් රෙදි සෝදනවද?",
    correctAnswer: "1",
    options: ["3", "4", "6", "2", "1"],
  },
  {
    question: "4.රෙදි වැලෙහි රෙදි සලු කීයක් එල්ලා තිබෙද?",
    correctAnswer: "5",
    options: ["3", "4", "6", "7", "5"],
  },
];

function Activity1({ onNext }) {
  const [showImage, setShowImage] = useState(true);
  const [timer, setTimer] = useState(10);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [eggAnimState, setEggAnimState] = useState("intact");
  const [showDinoBreak, setShowDinoBreak] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (showImage) {
      setTimer(10);
      const intervalId = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            setShowImage(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [showImage]);

  useEffect(() => {
    setSelectedAnswer(null);
    setEggAnimState("intact");
    setShowDinoBreak(false);
    setShowCelebration(false);
  }, [currentQuestionIndex]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (option) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option);

    if (option === currentQuestion.correctAnswer) {
      setScore(prev => prev + 3);
      setEggAnimState("breaking");
      setTimeout(() => {
        setEggAnimState("broken");
        setShowDinoBreak(true);
        setTimeout(() => {
          setShowCelebration(true);
          setTimeout(() => {
            setShowCelebration(false);
            setShowDinoBreak(false);
          }, 4000);
        }, 1000);
      }, 2000);
    }
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      onNext(score);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${L2_back3})` }}
    >
      {showImage ? (
  <div className="flex flex-col items-center">
    <img
      src={L2_img2}
      alt="Intro"
      className="w-1/2 h-auto rounded-lg shadow-lg border-4 border-white" 
    />
    <p className="absolute bottom-[65px] left-1/2 transform -translate-x-1/2 text-xl text-white px-6 py-3 rounded-xl font-semibold
                    bg-gradient-to-r from-[#8B4513] via-[#CD653F] to-[#8B4513]
                    min-w-[200px] max-w-[300px] text-center shadow-lg ">⏳ කාලය: {timer} තත්පර</p> 
  </div>
      ) : (
        <div className="bg-gradient-to-r from-[#1A4D2E] via-[#3A7D44] to-[#4B9D4A] p-6 rounded-lg shadow-lg w-full max-w-2xl border-4 border-[#2D5A3D] relative">
        <h2 className="text-4xl font-bold mb-4 text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            {currentQuestion.question}
          </h2>
          <div className="grid grid-cols-5 gap-4 mb-4">
            {currentQuestion.options.map((option, i) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              return (
                <div
                  key={i}
                  className="relative w-30 h-30 cursor-pointer"
                  onClick={() => handleAnswerSelect(option)}
                >
                  <img
                    src={
                      isSelected && isCorrect && eggAnimState === "broken"
                        ? (showDinoBreak ? dino_break : dino_img)
                        : img_egg1
                    }
                    alt="egg"
                    className={`
                      w-40 h-40 rounded-full object-cover
                      ${isSelected && isCorrect && eggAnimState === "breaking" ? "animate-break-slow" : ""}
                      ${isSelected && !isCorrect ? "border-4 border-red-500" : ""}
                    `}
                  />
                  {!(isSelected && isCorrect) && (
                    <span className="absolute top-12 left-9 flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-black text-2xl font-bold text-black">
                      {option}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <button
            onClick={() => selectedAnswer !== null && moveToNextQuestion()}
            className={`absolute bottom-[-120px] right-[-150px] p-4 rounded-full shadow-lg transition ${
              selectedAnswer !== null
                ? "bg-gradient-to-r from-green-400/90 via-yellow-300/90 to-green-600/90 text-white hover:from-green-500/90 hover:via-yellow-400/90 hover:to-green-700/90"
                : "bg-gradient-to-r from-gray-300/90 via-gray-400/90 to-gray-500/90 text-gray-700 cursor-not-allowed"

            }`}
            disabled={selectedAnswer === null}
          >
            <FaArrowRight size={24} />
          </button>
        </div>
      )}
      {showCelebration && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="absolute inset-0 pointer-events-none">
            <div className="firework firework-1"></div>
            <div className="firework firework-2"></div>
            <div className="firework firework-3"></div>
            <div className="firework firework-4"></div>
            <div className="firework firework-5"></div>
            <div className="firework firework-6"></div>
            <div className="firework firework-7"></div>
            <div className="firework firework-8"></div>
            <div className="firework firework-9"></div>
            <div className="firework firework-10"></div>
            <div className="firework firework-11"></div>
            <div className="firework firework-12"></div>
            <div className="firework firework-13"></div>
            <div className="firework firework-14"></div>
            <div className="firework firework-15"></div>
            <div className="firework firework-16"></div>
            <div className="firework firework-17"></div>
            <div className="firework firework-18"></div>
            <div className="firework firework-19"></div>
            <div className="firework firework-20"></div>
            <div className="firework firework-21"></div>
            <div className="firework firework-22"></div>
            <div className="firework firework-23"></div>
            <div className="firework firework-24"></div>
          </div>
          <h1 className="relative z-10 text-6xl font-bold mb-[-100px] animate-fadeIn bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
      ඔබේ පිළිතුර නිවැරදියි. සුභ පැතුම්
    </h1>
          <img
            src={dino_img}
            alt="Celebration Dino"
            className="relative z-10 w-1/4 h-auto animate-wave mt-10"
          />
        </div>
      )}
      <style>{`
        @keyframes breakAnimationSlow {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(0.9) rotate(-10deg); }
          100% { transform: scale(0) rotate(-20deg); opacity: 0; }
        }
        .animate-break-slow {
          animation: breakAnimationSlow 2s forwards;
        }
        @keyframes wave {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
        .animate-wave {
          animation: wave 1s infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 1s forwards;
        }
        @keyframes firework {
          0% { transform: scale(0) translate(0, 0); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: scale(1.5) translate(var(--tx), var(--ty)); opacity: 0; }
        }
        .firework {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          animation: firework 1.5s ease-out infinite;
        }
        .firework-1 { top: 5%; left: 10%; --tx: -60px; --ty: -80px; animation-delay: 0.2s; background-color: #ff4d4d; }
        .firework-2 { top: 15%; left: 80%; --tx: 70px; --ty: -60px; animation-delay: 0.4s; background-color: #ffdb4d; }
        .firework-3 { top: 30%; left: 30%; --tx: -80px; --ty: 60px; animation-delay: 0.6s; background-color: #4dff4d; }
        .firework-4 { top: 45%; left: 90%; --tx: 60px; --ty: -80px; animation-delay: 0.8s; background-color: #4dd2ff; }
        .firework-5 { top: 60%; left: 20%; --tx: -70px; --ty: 70px; animation-delay: 1s; background-color: #b84d4f; }
        .firework-6 { top: 70%; left: 50%; --tx: 50px; --ty: 50px; animation-delay: 1.2s; background-color: #ff4dff; }
        .firework-7 { top: 80%; left: 10%; --tx: -50px; --ty: 50px; animation-delay: 1.4s; background-color: #4dffdb; }
        .firework-8 { top: 10%; left: 50%; --tx: 70px; --ty: -70px; animation-delay: 1.6s; background-color: #ffa64d; }
        .firework-9 { top: 25%; left: 25%; --tx: -60px; --ty: -60px; animation-delay: 1.8s; background-color: #66ccff; }
        .firework-10 { top: 55%; left: 75%; --tx: 60px; --ty: 60px; animation-delay: 2s; background-color: #ff66cc; }
        .firework-11 { top: 35%; left: 65%; --tx: 40px; --ty: -40px; animation-delay: 2.2s; background-color: #ffff66; }
        .firework-12 { top: 65%; left: 35%; --tx: -40px; --ty: 40px; animation-delay: 2.4s; background-color: #66ff66; }
        /* Additional 12 fireworks */
        .firework-13 { top: 8%; left: 40%; --tx: 50px; --ty: -50px; animation-delay: 0.3s; background-color: #ff7f50; }
        .firework-14 { top: 20%; left: 20%; --tx: -50px; --ty: -50px; animation-delay: 0.5s; background-color: #ff69b4; }
        .firework-15 { top: 32%; left: 80%; --tx: 60px; --ty: -40px; animation-delay: 0.7s; background-color: #ba55d3; }
        .firework-16 { top: 50%; left: 10%; --tx: -60px; --ty: 60px; animation-delay: 0.9s; background-color: #87cefa; }
        .firework-17 { top: 62%; left: 70%; --tx: 40px; --ty: 40px; animation-delay: 1.1s; background-color: #32cd32; }
        .firework-18 { top: 74%; left: 30%; --tx: -40px; --ty: 60px; animation-delay: 1.3s; background-color: #ff4500; }
        .firework-19 { top: 85%; left: 50%; --tx: 50px; --ty: -50px; animation-delay: 1.5s; background-color: #1e90ff; }
        .firework-20 { top: 15%; left: 50%; --tx: 30px; --ty: -70px; animation-delay: 1.7s; background-color: #daa520; }
        .firework-21 { top: 40%; left: 40%; --tx: -30px; --ty: 30px; animation-delay: 1.9s; background-color: #ff1493; }
        .firework-22 { top: 55%; left: 60%; --tx: 30px; --ty: 30px; animation-delay: 2.1s; background-color: #00fa9a; }
        .firework-23 { top: 68%; left: 80%; --tx: 40px; --ty: -30px; animation-delay: 2.3s; background-color: #8a2be2; }
        .firework-24 { top: 80%; left: 20%; --tx: -40px; --ty: 30px; animation-delay: 2.5s; background-color: #ff6347; }
      `}</style>
    </div>
  );
}

export default Activity1;

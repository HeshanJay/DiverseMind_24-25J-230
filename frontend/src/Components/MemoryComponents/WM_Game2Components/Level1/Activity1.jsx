import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import L1_background from "../../../../assets/WM_Interventions_images/L1_images/L1_background.png";
import woodenBoard from "../../../../assets/WM_Interventions_images/L2_images/wooden_board.png";
import frame1 from "../../../../assets/WM_Interventions_images/L1_images/frame1.png";
import dog from "../../../../assets/WM_Interventions_images/L2_images/dog.png";


const questions = [
  {
    question: "වඩු බාස් \nලග තියෙන \nරට",
    options: ["බුරුමය", "මතුරට", "කදුරට", "මාලේ"],
    correctAnswer: 0
  },
  {
    question: "නැට්ට නැති \nගෙඩිය",
    options: [" අල \nගෙඩිය", "තිත්බටු \nගෙඩිය", "ගෝවා \nගෙඩිය", "බිත්තර \nගෙඩිය"],
    correctAnswer: 3
  },
  {
    question: "කටු නැති \nකැලේ ඇට \nනැති සතා",
    options: ["කුරුමිනියා", "මකුළුවා", "උකුණා", "දළඹුවා"],
    correctAnswer: 2
  },
  {
    question: "බෝතලේට \nදාන්න \nබැරි පැණි",
    options: ["කොම්පැණි", "මී පැණි", "බුද්ධි \nපැණි", "උණුසුම් \nපැණි"],
    correctAnswer: 0
  },
  {
    question: "කිසිම\nකෙනෙකු\nනොයා යුතු \nමග",
    options: ["අතරමග", "නොමග", "ධර්ම මග", "අවිධිමත් \nමග"],
    correctAnswer: 1
  }
];

function Activity1({ onNext }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [timeUp, setTimeUp] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [incorrectAnswerIndex, setIncorrectAnswerIndex] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    setTimeLeft(10);
    setSelectedAnswerIndex(null);
    setTimeUp(false);
    setShowCelebration(false);
    setIncorrectAnswerIndex(null);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setTimeUp(true);
      return;
    }
    
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleSelectAnswer = (answerIdx) => {
    if (selectedAnswerIndex !== null || timeUp) return;
    
    setSelectedAnswerIndex(answerIdx);
    if (answerIdx === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 5);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    } else {
      setIncorrectAnswerIndex(answerIdx);
    }
  };

  const handleNextQuestion = () => {
    if (!timeUp && selectedAnswerIndex === null) {
      alert("කරුණාකර පිළිතුරක් තෝරන්න!");
      return;
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      onNext(score);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${L1_background})` }}
    >
      {showCelebration && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(24)].map((_, i) => (
              <div key={i} className={`firework firework-${i + 1}`}></div>
            ))}
          </div>
          <h1 className="relative z-10 text-6xl font-bold mb-[30px] animate-fadeIn bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
      ඔබේ පිළිතුර නිවැරදියි. සුභ පැතුම්
    </h1>
          <img
            src={dog}
            alt="Celebration dog"
            className="w-1/3 h-auto animate-bounce z-10"
          />
        </div>
      )}

      <div className="absolute top-[150px] left-1/2 transform -translate-x-1/2 w-[450px]">
        <img src={frame1} alt="frame" className="w-full h-auto" />
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <h2 className="text-4xl font-bold text-center text-black leading-snug whitespace-pre-line">
            {currentQuestion.question}
          </h2>
        </div>
      </div>

      <div className="absolute bottom-[215px] left-1/2 transform -translate-x-1/2 text-xl text-white px-6 py-3 rounded-xl font-semibold
                    bg-gradient-to-r from-[#8B4513] via-[#CD653F] to-[#8B4513]
                    min-w-[200px] max-w-[300px] text-center shadow-lg">
        ⏳ කාලය: {timeLeft} තත්පර
      </div>

      <div className="absolute bottom-[15px] left-0 right-0 flex justify-center space-x-6">
      {currentQuestion.options.map((option, i) => {
      const isCorrect = i === currentQuestion.correctAnswer;
      const isSelected = i === selectedAnswerIndex;

       let textColor = "text-black";
        if (isSelected) {
         textColor = isCorrect ? "text-blue-800" : "text-red-600"; 
        }


        return (
    <div
      key={i}
      className={`relative cursor-pointer transition-transform ${
        (selectedAnswerIndex !== null || timeUp) ? "cursor-not-allowed" : ""
      } ${isSelected ? "scale-110" : ""}`}
      onClick={() => handleSelectAnswer(i)}
    >
      <div className="relative w-52 h-52">
        <img 
          src={woodenBoard} 
          alt="answer-board" 
          className="w-full h-full object-contain"
        />
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <span className={`text-2xl font-bold whitespace-pre-line text-center ${textColor}`}>
            {option}
          </span>
        </div>
      </div>
    </div>
  );
})}
      </div>
      <button
        onClick={handleNextQuestion}
        disabled={!timeUp && selectedAnswerIndex === null}
        className={`absolute bottom-6 right-6 rounded-full p-3 shadow-lg transition ${
          (!timeUp && selectedAnswerIndex === null) 
          ? "bg-gradient-to-r from-[#2D1B0F] to-[#3C2A1A] text-gray-500 cursor-not-allowed"
          : "bg-gradient-to-r from-[#4B3621] to-[#6E4B3A] text-white hover:from-[#5C4530] hover:to-[#7E5D45]"
          

        }`}
      >
        <FaArrowRight size={24} />
      </button>

     
      <style>
        {`
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
          
        `}
      </style>
    </div>
  );
}

export default Activity1;
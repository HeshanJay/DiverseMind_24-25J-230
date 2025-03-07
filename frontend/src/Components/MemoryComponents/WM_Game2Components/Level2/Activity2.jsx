import React, { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import img2_back from "../../../../assets/WM_Interventions_images/L2_images/img2_back.png";
import L2_img3 from "../../../../assets/WM_Interventions_images/L2_images/L2_img3.jpg";
import img13 from "../../../../assets/WM_Interventions_images/L2_images/img13.png";
import img14 from "../../../../assets/WM_Interventions_images/L2_images/img14.png";
import img18 from "../../../../assets/WM_Interventions_images/L2_images/img18.png";
import img16 from "../../../../assets/WM_Interventions_images/L2_images/img16.png";
import imgQ1 from "../../../../assets/WM_Interventions_images/L2_images/imgQ1.png";
import imgQ2 from "../../../../assets/WM_Interventions_images/L2_images/imgQ2.png";
import imgQ3 from "../../../../assets/WM_Interventions_images/L2_images/imgQ3.png";
import imgQ4 from "../../../../assets/WM_Interventions_images/L2_images/imgQ4.png";
import dino_img from "../../../../assets/WM_Interventions_images/L2_images/dino_img.png";

const questions = [
  {
    question: "1. ගවයා ඇදගෙන යන්නේ කුමක්ද?",
    correctAnswer: "මල් පොකුරු පිරුණු රථයක්.",
    options: [
      "මල් පොකුරු පිරුණු රථයක්.",
      "ගඩොල් පිරුණු රථයක්.",
      "පොල් ගෙඩි පිරුණු රථයක්.",
      "වෙළඳපොළෙන් ගෙනා භාණ්ඩ රථයක්."
    ],
  },
  {
    question: "2. ගම තුළ මිනිසුන් වැඩි වශයෙන් කුමක් කරමින් සිටිතිද?",
    correctAnswer: "වෙළඳාමේ යෙදී සිටිති.",
    options: [
      "වෙළඳාමේ යෙදී සිටිති.",
      "සන්වාදයේ යෙදෙමින් සිටිති.",
      "වතු කම්කරුවන් ලෙස වැඩ කරමින් සිටිති.",
      "වන්දනා කරමින් සිටිති."
    ],
  },
  {
    question: "3. ගමේ මිනිසුන් වැඩි වශයෙන් කුමන කර්මාන්තයක නිරත වෙයි?",
    correctAnswer: "ගෘහස්ථ ව්‍යාපාර සහ කෘෂිකර්මය.",
    options: [
      "ගෘහස්ථ ව්‍යාපාර සහ කෘෂිකර්මය.",
      "මිනිසුන් සියල්ලන්ම මහානගරයෙ වැඩ කරති.",
      "ඔවුන් මධ්‍යම රාත්‍රියේ පමණක් ව්‍යාපාර කරති.",
      "ඔවුන් විදේශ රටවල පමණක් වැඩ කරති."
    ],
  },
  {
    question: "4. ගමේ මූලික ප්‍රවාහන ක්‍රමය කුමක්ද?",
    correctAnswer: "ගවයාට බැඳි ලෑල්ල සහ පාද යාත්‍රා.",
    options: [
      "ගවයාට බැඳි ලෑල්ල සහ පාද යාත්‍රා.",
      "මිනිසුන් සියලුදෙනා කාර් වලින් ගමන් කරති.",
      "ප්‍රවාහනය සඳහා දුම්රිය භාවිතා කරති.",
      "ගුවන් පාලමක් හරහා ගමන් කරති."
    ],
  },
];

const questionImages = [imgQ1, imgQ2, imgQ3, imgQ4];
function Activity2({ onNext }) {  
  const [showIntro, setShowIntro] = useState(true);
  const [timer, setTimer] = useState(10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [score, setScore] = useState(0);  

  useEffect(() => {
    if (showIntro) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowIntro(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showIntro]);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowCelebration(false);
  }, [currentIndex]);

  const currentQuestion = questions[currentIndex];

  const handleAnswerClick = (option) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option);
    
    if (option === currentQuestion.correctAnswer) {
      setScore(prev => prev + 3);  
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    }
  };

  const handleNext = () => {
    if (!selectedAnswer) {
      alert("Please select an answer!");
      return;
    }
    
    setShowCelebration(false);
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onNext(score);  
    }
  };

  if (showIntro) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-4"
        style={{ backgroundImage: `url(${img2_back})` }}
      >
      <img 
        src={L2_img3} 
        alt="Intro" 
        className="w-[490px] h-[390px] rounded-lg object-cover border-4 border-white"
        />
        <p className="absolute bottom-[65px] left-1/2 transform -translate-x-1/2 text-xl text-white px-6 py-3 rounded-xl font-semibold
                    bg-gradient-to-r from-[#8B4513] via-[#CD653F] to-[#8B4513]
                    min-w-[200px] max-w-[300px] text-center shadow-lg">⏳ කාලය: {timer} තත්පර</p> 
      </div>
    );
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${img2_back})` }}
    >
   <div className="relative ml-auto" style={{ width: '230px', marginTop: '-469px', marginLeft: '338px' }}>
  <img
    src={questionImages[currentIndex]}
    alt={`Question ${currentIndex + 1}`}
    className="w-full h-auto "
  />
  <div 
    className="absolute top-[62px] p-2" 
    style={currentIndex === questionImages.length - 1 ? { right: '15px', color: 'yellow' } : { right: '15px' }}
  >
    <h2 
      className="text-lg font-bold text-white text-center"
      style={currentQuestion.question === "3. ගමේ මිනිසුන් වැඩි වශයෙන් කුමන කර්මාන්තයක නිරත වෙයි?" ? { marginTop: '-15px', marginLeft: '20px' } : {}}
    >
      {currentQuestion.question === "3. ගමේ මිනිසුන් වැඩි වශයෙන් කුමන කර්මාන්තයක නිරත වෙයි?" ? (
        <>
          {"3. ගමේ මිනිසුන් වැඩි"}
          <br />
          {"වශයෙන් කුමන"}
          <br />
          {"කර්මාන්තයක නිරත වෙයි?"}
        </>
      ) : (
        currentQuestion.question
      )}
    </h2>
  </div>
</div>

      <div
        className="group absolute"
        style={{
          top: '52%',
          left: '27%',
          transform: 'translate(-50%, 0)',
        }}
        onClick={() => handleAnswerClick(currentQuestion.options[0])}
      >
        <img
          src={img13}
          alt="Top Answer"
          className="object-cover"
          style={{ width: '215px', height: 'auto', margin: '20px 0' }}
        />
        <div className="absolute inset-10 flex items-center justify-center pl-2 text-xl font-bold text-black group-hover:text-white cursor-pointer">
  {currentQuestion.options[0]}
</div>

      </div>
      <div
        className="group absolute"
        style={{
          top: '33%',
          right: '20%',
          transform: 'translate(0, -50%)',
        }}
        onClick={() => handleAnswerClick(currentQuestion.options[1])}
      >
        <img
          src={img14}
          alt="Right Answer"
          className="object-cover"
          style={{ width: '215px', height: 'auto', margin: '20px 0' }}
        />
        <div className="absolute inset-10 flex items-center justify-center pl-8 text-xl font-bold text-black group-hover:text-white cursor-pointer">
          {currentQuestion.options[1]}
        </div>
      </div>

      <div
        className="group absolute"
        style={{
          bottom: '22%',
          left: '53%',
          transform: 'translate(-50%, 0)',
        }}
        onClick={() => handleAnswerClick(currentQuestion.options[2])}
      >
        <img
          src={img18}
          alt="Bottom Answer"
          className="object-cover"
          style={{ width: '215px', height: 'auto', margin: '20px 0' }}
        />
        <div className="absolute inset-10 flex items-center justify-center pl-3 text-xl font-bold text-black group-hover:text-white cursor-pointer">
          {currentQuestion.options[2]}
        </div>
      </div>
      <div
        className="group absolute"
        style={{
          top: '51%',
          left: '29%',
          transform: 'translate(0, -50%)',
        }}
        onClick={() => handleAnswerClick(currentQuestion.options[3])}
      >
        <img
          src={img16}
          alt="Left Answer"
          className="object-cover"
          style={{ width: '215px', height: 'auto', margin: '20px 0' }}
        />
        <div className="absolute inset-10 flex items-center justify-center pl-3 text-xl font-bold text-black group-hover:text-white cursor-pointer">
          {currentQuestion.options[3]}
        </div>
      </div>
      <button
        onClick={handleNext}
        disabled={!selectedAnswer}
        className={`absolute bottom-[67px] right-[60px] p-4 rounded-full transition ${
          selectedAnswer
              ? "bg-gradient-to-r from-green-400/90 via-yellow-300/90 to-green-600/90 text-white hover:from-green-500/90 hover:via-yellow-400/90 hover:to-green-700/90"
              : "bg-gradient-to-r from-gray-300/90 via-gray-400/90 to-gray-500/90 text-gray-700 cursor-not-allowed"
        }`}
      >
        <FaArrowRight size={24} />
      </button>

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

export default Activity2;

import React, { useState, useEffect } from "react";
import L3_Back2 from "../../../../assets/WM_Interventions_images/L3_images/L3_Back2.jpg"; // Passage background
import L3_Back3 from "../../../../assets/WM_Interventions_images/L3_images/L3_Back3.jpg"; // Answer background

// Import images for questions and options
import L3_img2 from "../../../../assets/WM_Interventions_images/L3_images/L3_img2.png";
import L3_img4 from "../../../../assets/WM_Interventions_images/L3_images/L3_img4.png";
import L3_img6 from "../../../../assets/WM_Interventions_images/L3_images/L3_img6.jpg";
import L3_img7 from "../../../../assets/WM_Interventions_images/L3_images/L3_img7.jpg";
import L3_img8 from "../../../../assets/WM_Interventions_images/L3_images/L3_img8.jpg";
import L3_img9 from "../../../../assets/WM_Interventions_images/L3_images/L3_img9.jpg";
import L3_img10 from "../../../../assets/WM_Interventions_images/L3_images/L3_img10.jpg";
import L3_img11 from "../../../../assets/WM_Interventions_images/L3_images/L3_img11.png";
import L3_img12 from "../../../../assets/WM_Interventions_images/L3_images/L3_img12.jpg";
import dog from "../../../../assets/WM_Interventions_images/L2_images/dog.png";
import { FaArrowRight } from 'react-icons/fa';

const questions = [
  {
    question:
      "1. සීලෝන් නාෂනල් රිවීව්\" පතනය ආරම්භ කළේ සහ ශ්‍රී ලංකාවේ අධ්‍යාපන සහ සංස්කෘතික ප්‍රබෝධය සඳහා මහත් දායකත්වයක් ලබාදුන් පුද්ගලයා කවුද?",
    correctAnswer: L3_img4,
    options: [L3_img6, L3_img4, L3_img2, L3_img10],
  },
  {
    question:
      "2. ශ්‍රී ලංකාවේ නොමිලේ අධ්‍යාපනය හඳුන්වාදීමට ප්‍රධාන වශයෙන් දායක වූ නායකයා කවුද?",
    correctAnswer: L3_img2,
    options: [L3_img2, L3_img8, L3_img9, L3_img10],
  },
  {
    question:
      "3. ශ්‍රී ලංකාවේ බෞද්ධ ප්‍රබෝධය සඳහා මහත් දායකත්වයක් ලබාදුන් සහ බෞද්ධ අධ්‍යාපනය උසස් කිරීම සඳහා ක්‍රියා කළ නායකයා කවුද?",
    correctAnswer: L3_img6,
    options: [L3_img6, L3_img10, L3_img11, L3_img12],
  },
  {
    question:
      "4. ශ්‍රී ලංකාවේ නිදහස් සංවිධානයට විශාල දායකත්වයක් ලබාදුන් සහ පසුව ප්‍රමුඛ නායකයෙකු වූ පුද්ගලයා කවුද?",
    correctAnswer: L3_img2,
    options: [L3_img9, L3_img8, L3_img2, L3_img7],
  },
];
function Activity1({ onNext }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(4);
  const [showCelebration, setShowCelebration] = useState(false);
  const [score, setScore] = useState(0);
  const [timeUp, setTimeUp] = useState(false);

  // Timer countdown effect
  useEffect(() => {
    let countdown;
    if (currentQuestion > 0 && timer > 0 && !timeUp) {
      countdown = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(countdown);
  }, [currentQuestion, timer, timeUp]);

  // Detect when timer reaches 0
  useEffect(() => {
    if (timer === 0 && currentQuestion > 0) setTimeUp(true);
  }, [timer, currentQuestion]);

  const handleAnswerSelect = (option) => {
    if (selectedAnswer || timeUp) return;
    setSelectedAnswer(option);
    if (option === questions[currentQuestion - 1].correctAnswer) {
      setScore(prev => prev + 5);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 4000);
    }
  };

  const handleNext = () => {
    if (currentQuestion <= questions.length) {
      setCurrentQuestion(prev => prev + 1);
      setTimeUp(false);
      setSelectedAnswer(null);
      setTimer(4);
    }
    if (currentQuestion === questions.length) onNext(score);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center px-6"
      style={{ backgroundImage: `url(${currentQuestion === 0 ? L3_Back2 : L3_Back3})` }}>
      
      {currentQuestion === 0 ? (
        <div className="bg-gradient-to-r from-emerald-100 via-lime-50 to-teal-100 p-6 rounded-2xl shadow-lg text-center max-w-3xl">
          <h2 className="text-2xl font-bold text-emerald-800 mb-4">
            හොඳින් ඡේදය කියවා ප්‍රශ්නවලට පිළිතුරු සපයන්න.
          </h2>
          <p className="text-xl font-semibold">
          මෙහි දැක්වෙන ප්‍රබල නායකයින් ශ්‍රී ලංකාවේ අධ්‍යාපන, බෞද්ධ ප්‍රබෝධය, විද්‍යාත්මක ප්‍රවර්ධනය සහ නිදහස සඳහා විශාල සේවයක් කළහ. ඩී. බී. ජයතිලක ශ්‍රී ලංකාවේ ජාතික අධ්‍යාපනය සඳහා වැදගත් දායකත්වයක් ලබාදෙමින්, "සීලෝන් නාෂනල් රිවීව්" පතනය ආරම්භ කළේය. ඔහු 1917 දී ලන්ඩනයට ගොස් ශ්‍රී ලංකාවේ නිදහස සඳහාත් ඉංග්‍රීසි ආණ්ඩුවට එරෙහිවත් වැඩ කළේය.
            සී. ඊ. ඊ. කන්නන්ගර ශ්‍රී ලංකාවේ නොමිලේ අධ්‍යාපන ක්‍රමය හඳුන්වාදීමෙන් 1943 දී පනතක් හඳුන්වාදියි. මෙය දරුවන්ට වියදම් රහිතව උසස් අධ්‍යාපනය ලබාගැනීමට හැකියාව ලබාදුන් විශාල අධ්‍යාපන ප්‍රතිසංස්කරණයක් විය. අනගාරික ධර්මපාල ශ්‍රී ලංකාවේ බෞද්ධ ප්‍රබෝධය ප්‍රවර්ධනය කිරීමටත්, බෝධි මන්දිරය යළිත් බෞද්ධයන්ට ලබාදීමටත් මහත් උත්සාහයක් දැරීය.
            අතර් සී. ක්ලාර්ක් තාරකා විද්‍යාව හා තාක්ෂණය ප්‍රවර්ධනය කරමින්, ශ්‍රී ලංකාවට විශාල සේවයක් කළේය. ඔහුගේ "2001: A Space Odyssey" නවකතාව ලෝක විද්‍යා ප්‍රබන්ධ ඉතිහාසයේ මනා නිර්මාණයක් විය. සුගතධම්ම හිමි ජාතික චේතනාව දියුණු කිරීම සඳහා පද පේලි හා කවි නිර්මාණය කළ අතර, ඔහුගේ කවි ශ්‍රී ලංකාවේ ජනතාවට මග පෙන්වූයේ ප්‍රබල ජාතික සිතිවිලි ආවරණය කරමිනි.
          </p>
          <button
            onClick={() => setCurrentQuestion(1)}
            className="mt-4 text-white px-4 py-2 rounded-lg text-xl font-semibold
                     bg-gradient-to-r from-emerald-600 via-lime-600 to-teal-600
                     hover:bg-gradient-to-r hover:from-emerald-700 hover:via-lime-700 hover:to-teal-700
                     transition-all duration-300 shadow-md hover:shadow-lg">
            ආරම්භ කරන්න
          </button>
        </div>
      ) : currentQuestion <= questions.length ? (
        <div className="relative flex flex-col items-center justify-center w-full">
          <div className="mx-auto w-full max-w-2xl">
            <div className="bg-gradient-to-r from-emerald-100 via-lime-50 to-teal-100 p-6 rounded-2xl shadow-lg">
              <p className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                {questions[currentQuestion - 1].question}
              </p>
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg mx-auto">
                {questions[currentQuestion - 1].options.map((option, index) => {
                  const isCorrect = option === questions[currentQuestion - 1].correctAnswer;
                  const isSelected = option === selectedAnswer;
                  
                  return (
                    <div
                      key={index}
                      className={`flex flex-col items-center p-4 rounded-lg shadow-md border-2 transition-all
                        ${isSelected ?
                          (isCorrect ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100')
                          : 'border-gray-200 hover:border-blue-300'}
                        ${(selectedAnswer || timeUp) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      onClick={() => handleAnswerSelect(option)}
                    >
                      <img 
                        src={option} 
                        alt={`Option ${index + 1}`}
                        className="w-32 h-32 object-cover rounded-lg mb-2"
                      />
                      <span className="text-lg font-medium text-gray-700">
                        පිළිතුර {index + 1}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center mt-8">
            <button 
              className="mt-[-20px] text-white px-4 py-2 rounded-lg text-xl font-semibold
                       bg-gradient-to-r from-emerald-600 via-lime-600 to-teal-600"
              disabled
            >
              ⏳ කාලය: {timer} තත්පර
            </button>
            <button
              onClick={handleNext}
              className={`absolute bottom-5 right-5 p-4 rounded-full shadow-lg transition
                ${(selectedAnswer || timeUp) ?
                  "bg-gradient-to-r from-green-400/90 via-yellow-300/90 to-green-600/90 text-white hover:from-green-500/90 hover:via-yellow-400/90 hover:to-green-700/90"
                  : "bg-gradient-to-r from-gray-300/90 via-gray-400/90 to-gray-500/90 text-gray-700 cursor-not-allowed"}`}
              disabled={!selectedAnswer && !timeUp}
            >
              <FaArrowRight size={24} />
            </button>
          </div>
        </div>
      ) : null}

      {showCelebration && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(24)].map((_, i) => (
              <div key={i} className={`firework firework-${i + 1}`}></div>
            ))}
          </div>
          <h1 className="relative z-10 text-6xl font-bold mb-[-100px] animate-fadeIn bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
      ඔබේ පිළිතුර නිවැරදියි. සුභ පැතුම්
    </h1>
          <img
            src={dog}
            alt="Celebration Feedback"
            className="relative z-10 w-1/3 h-auto animate-wave mt-10"
          />
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 1s forwards;
        }
        @keyframes wave {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
        .animate-wave {
          animation: wave 1s infinite;
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

export default Activity1;

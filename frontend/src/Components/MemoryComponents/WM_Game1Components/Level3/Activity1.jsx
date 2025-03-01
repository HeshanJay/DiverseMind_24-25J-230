import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import L3_img1 from "../../../../assets/WM_Interventions_images/L3_images/L3_img1.png";
import puffer_fish1 from "../../../../assets/WM_Interventions_images/L1_images/puffer_fish1.png";
import puffer_fish5 from "../../../../assets/WM_Interventions_images/L1_images/puffer_fish5.png"; // Replaced buffer_fish2
import puffer_fish3 from "../../../../assets/WM_Interventions_images/L1_images/puffer_fish3.png";
import bubble from "../../../../assets/WM_Interventions_images/L1_images/bubble.png";
import sea_back3 from "../../../../assets/WM_Interventions_images/L1_images/sea_back3.png";
import sea_back4 from "../../../../assets/WM_Interventions_images/L1_images/sea_back4.jpg"; // Fixed import
import fish20 from "../../../../assets/WM_Interventions_images/L1_images/fish20.png"; // Import the celebration image

const questions = [
  {
    questionText: "1.රෝහල අසල ඇති වෛද්‍යවරයා කරන දේ කුමක්ද?",
    questionImage: L3_img1,
    answers: [
      "වෛද්‍යවරයා රෝගියකුට උදව් කරයි.",
      "වෛද්‍යවරයා පොලිස් නිලධාරීන් සමඟ කතා කරයි.",
      "වෛද්‍යවරයා අනතුර දෙස බලමින් සිටී.",
    ],
    correctAnswerIndex: 0,
    questionPhaseDuration: 5, // Set to 5 seconds for the initial question
    answerPhaseDuration: 5,
  },
  {
    questionText: "2.ගින්නට ලක්ව ඇති මෝටර් රථය අසල සිදුවන දේ කුමක්ද?",
    questionImage: null,
    answers: [
      "පොලිස් නිලධාරීන් ගින්න නිවයි.",
      "ගිනි නිවීම් සේවකයෝ ගින්න නිවයි.",
      "මිනිසුන් සියලුදෙනා මෝටර් රථය අසල සිටී.",
    ],
    correctAnswerIndex: 1,
    questionPhaseDuration: 0, // No question phase for subsequent questions
    answerPhaseDuration: 5,
  },
  {
    questionText: "3.පොලිස් නිලධාරියා නිරීක්ෂණය කරන දේ කුමක්ද?",
    questionImage: null,
    answers: [
      "පොලිස් නිලධාරියා ගින්නට ලක්වූ මෝටර් රථය සහ අවට පරිසරය නිරීක්ෂණය කරයි.",
      "පොලිස් නිලධාරියා පළතුරු වෙළෙන්ද ගේ ආහාරය අරගෙන කයි.",
      "පොලිස් නිලධාරියා පාරේ දිගේ සැරිසරණ සතුන්ට ආදරය පිරි ඇසියි.",
    ],
    correctAnswerIndex: 0,
    questionPhaseDuration: 0, // No question phase for subsequent questions
    answerPhaseDuration: 5,
  },
];

// Positions for fish and bubbles
const fishPositions = [
  { top: "29%", left: "5%" },  // Fish 1
  { top: "30%", left: "46%" }, // Fish 2
  { top: "62%", left: "14%" }, // Fish 3
];

const bubblePositions = [
  { top: "30%", left: "-22%" }, // Bubble 1
  { top: "26%", left: "60%" },  // Bubble 2
  { top: "60%", left: "27%" },  // Bubble 3
];

function Activity1({ onNext }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  
  const [showQuestionPhase, setShowQuestionPhase] = useState(
    currentQuestion.questionPhaseDuration > 0
  );
  const [questionTimer, setQuestionTimer] = useState(
    currentQuestion.questionPhaseDuration
  );
  const [answerTimer, setAnswerTimer] = useState(
    currentQuestion.answerPhaseDuration
  );
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false); // State for celebration
  const [score, setScore] = useState(0);

  // Reset timers & selection when moving to new question
  useEffect(() => {
    setSelectedAnswer(null);
    setAnswerTimer(currentQuestion.answerPhaseDuration);
    if (currentQuestion.questionPhaseDuration > 0) {
      setShowQuestionPhase(true);
      setQuestionTimer(currentQuestion.questionPhaseDuration);
    } else {
      setShowQuestionPhase(false);
    }
  }, [currentQuestionIndex]);

  // Countdown for question phase
  useEffect(() => {
    let timer;
    if (showQuestionPhase && questionTimer > 0) {
      timer = setTimeout(() => setQuestionTimer((prev) => prev - 1), 1000);
    } else if (showQuestionPhase && questionTimer === 0) {
      setShowQuestionPhase(false);
    }
    return () => clearTimeout(timer);
  }, [questionTimer, showQuestionPhase]);

  // Countdown for answer phase
  useEffect(() => {
    let timer;
    if (!showQuestionPhase && answerTimer > 0) {
      timer = setTimeout(() => setAnswerTimer((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [answerTimer, showQuestionPhase]);

  // Once an answer is selected, it cannot be changed
  const handleSelect = (index) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
      if (index === currentQuestion.correctAnswerIndex) {
        setScore((prev) => prev + 4); // Award 4 marks per correct answer
        setShowCelebration(true); // Show celebration for correct answer
        setTimeout(() => {
          setShowCelebration(false); // Hide celebration after 3 seconds
        }, 3000);
      }
    }
  };

  // Move to next question or call onNext when done with last question
  const handleNext = () => {
    if (selectedAnswer !== null) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        onNext(score); // Pass final score to parent
      }
    }
  };

  return (
    <div
      key={currentQuestionIndex}
      className="relative flex flex-col items-center justify-center min-h-screen p-4 bg-fixed"
      style={{
        backgroundImage: `url(${showQuestionPhase && currentQuestionIndex === 0 ? sea_back4 : sea_back3})`, // Use sea_back4 for question phase, sea_back3 for answer phase
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "90vh",
      }}
    >
      {/* Show question and timer only once at the beginning */}
      {showQuestionPhase && currentQuestionIndex === 0 ? (
        <div className="flex flex-col items-center">
          {/* Hide question text when question image is displayed */}
          {!currentQuestion.questionImage && (
            <div className="text-xl font-bold mb-[30px] text-center text-white">
              {currentQuestion.questionText}
            </div>
          )}
          {currentQuestion.questionImage && (
  <img
    src={currentQuestion.questionImage}
    alt="Question"
    className="w-[405px] h-[500px] object-contain rounded-lg shadow-lg border-4 border-white box-border" // Added box-border to include border in dimensions
  />
)}
          {/* Timer with white border */}
          <div className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-600 px-6 py-3 rounded-md shadow-lg mt-10 w-64 mx-auto">
            ⏳ කාලය: {questionTimer} තත්පර
          </div>
        </div>
      ) : (
        <div className="w-full max-w-3xl relative h-screen">
          {/* Black container for question text with reduced opacity and white border */}
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-3/4 bg-black bg-opacity-50 p-4 rounded-lg text-center border-4 border-white">
            <h1 className="text-3xl font-bold text-white">
              {currentQuestion.questionText}
            </h1>
          </div>
          <div className="relative h-full">
            {/* Render fish images with reduced sizes */}
            {currentQuestion.answers.map((answer, index) => (
              <img
                key={`fish-${index}`}
                src={
                  index === 0
                    ? puffer_fish1
                    : index === 1
                    ? puffer_fish5
                    : puffer_fish3
                }
                alt={`Fish ${index + 1}`}
                className="w-32 h-32 object-contain animate-swim animate-bounce absolute"
                style={{
                  top: fishPositions[index].top,
                  left: fishPositions[index].left,
                }}
              />
            ))}
            {/* Render bubbles with answers and hover effect */}
            {currentQuestion.answers.map((answer, index) => (
              <div
                key={`bubble-${index}`}
                onClick={() => handleSelect(index)}
                className={`absolute cursor-pointer transform transition-all duration-300 ${
                  selectedAnswer === null
                    ? "hover:scale-105"
                    : selectedAnswer === index
                    ? "scale-110"
                    : ""
                }`}
                style={{
                  top: bubblePositions[index].top,
                  left: bubblePositions[index].left,
                }}
              >
                <img src={bubble} alt="Bubble" className="w-64 h-64" />
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-black font-semibold"
                  style={{ fontSize: "21px", wordSpacing: "-2px" }} // Reduced word spacing
                >
                  {answer}
                </div>
              </div>
            ))}
          </div>
          {/* Arrow button on the right side corner */}
          <button
            onClick={handleNext}
            className={`absolute bottom-10 right-8 p-4 rounded-full shadow-lg transition ${
              selectedAnswer !== null
                ? "bg-gradient-to-r from-teal-400 to-cyan-500 text-white hover:from-teal-500 hover:to-cyan-600"
                : "bg-gradient-to-r from-gray-100 to-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={selectedAnswer === null}
          >
            <FaArrowRight size={24} />
          </button>
        </div>
      )}

      {/* Celebration for correct answer */}
      {showCelebration && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-50">
          {/* Fireworks */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(24)].map((_, i) => (
              <div key={i} className={`firework firework-${i + 1}`}></div>
            ))}
          </div>
          <h1 className="relative z-10 text-6xl text-white font-bold mb-[-90px] animate-fadeIn">
            ඔබේ පිළිතුර නිවැරදියි. සුභ පැතුම්
          </h1>
          {/* Celebration Fish */}
          <img
            src={fish20}
            alt="Celebration Fish"
            className="w-1/3 h-auto animate-bounce z-10"
          />
        </div>
      )}

      {/* Fireworks CSS */}
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

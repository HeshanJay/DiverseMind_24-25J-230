import React, { useState, useEffect } from "react";
import backImg from "../assets/background_images/back3.jpg"; 
import trainImage from "../assets/Questions1_images/1.jpg"; 
import farmImage from "../assets/Questions1_images/2.jpg"; 
import restaurantImage from "../assets/Questions1_images/3.jpg"; 
import accidentImage from "../assets/Questions1_images/4.jpg"; 
import hospitalImage from "../assets/Questions1_images/5.jpg"; 
import ScoreBoard from "../Components/Score_board";
import { useNavigate } from "react-router-dom";  


const Language_vocab_activity = () => {
  const navigate = useNavigate(); // Hook for navigation
  const questions = [
    {
      image: trainImage,
      answers: [
        "1. දුම්රිය ස්ථානය",
        "2. බස් නැවතුම්පොළ",
        "3. ගුවන් තොටුපළ",
        "4. ව්‍යාපාරික මධ්‍යස්ථානය",
      ],
      correctAnswer: "1. දුම්රිය ස්ථානය",
    },
    {
      image: farmImage,
      answers: [
        "1. ගොවිපල",
        "2. සත්ත්තවෝද්‍යානය",
        "3. උද්භිද්‍ උද්‍යානය ",
        "4. සත්ත්ව ශාලාව",
      ],
      correctAnswer: "1. ගොවිපල",
    },
    {
      image: restaurantImage,
      answers: [
        "1. රාජ බෝජන සංග්‍රහය ",
        "2. රාජගීය පවුල",
        "3. රාජකීය සංගීත ප්‍රදර්ශනය",
        "4. රාජගීය උත්සවය",
      ],
      correctAnswer: "1. රාජ බෝජන සංග්‍රහය",
    },
    {
      image: accidentImage,
      answers: [
        "1. ඉදිකිරීම්ර කටයුතු ස්ථානය",
        "2. රිය අනතුර ",
        "3. රෝහල ඉදිරිපිට",
        "4. වාහන තදබදය ",
      ],
      correctAnswer: "2. රිය අනතුර ",
    },
    {
      image: hospitalImage,
      answers: [
        "1. රෝහල",
        "2. සෞඛ්‍ය මධ්‍යස්ථානය",
        "3. රෝහල් බාහිර රෝගී අංශය",
        "4. ආරෝග්‍ය මධ්‍යස්ථානය",
        
      ],
      correctAnswer: "1. රෝහල",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0); 
  const [timer, setTimer] = useState(10); 
  const [showImage, setShowImage] = useState(true); 
  const [showAnswers, setShowAnswers] = useState(false); 
  const [score, setScore] = useState(0); 
  const [isCompleted, setIsCompleted] = useState(false); 

  useEffect(() => {
    if (showImage) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            setShowImage(false);
            setShowAnswers(true);
            setTimer(15); 
            clearInterval(interval);
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(interval); 
    }
  }, [showImage]);

  useEffect(() => {
    if (showAnswers) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            handleNextQuestion();
            clearInterval(interval);
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(interval); 
    }
  }, [showAnswers]);

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowImage(true);
      setShowAnswers(false);
      setTimer(10); 
    } else {
      setIsCompleted(true);
      // Navigate to /memory-tests after quiz completion with a 5-second delay
      setTimeout(() => {
        navigate("/memory-tests");
      }, 5000);
    }
  };
  const handleAnswerClick = (index) => {
    const selectedAnswer = questions[currentQuestion].answers[index];
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore((prevScore) => prevScore + 1); 
    }
    handleNextQuestion();
  };

  const restartActivity = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowImage(true);
    setShowAnswers(false);
    setTimer(10);
    setIsCompleted(false);
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backImg})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
        {isCompleted ? (
          <ScoreBoard
            score={score}
            totalQuestions={questions.length}
            onRestart={restartActivity}
          />
        ) : (
          <>
            {/* Question Page */}
            {showImage && (
              <>
                <h1 className="text-4xl font-bold mb-6">
                  ප්‍රශ්නය: {currentQuestion + 1}/{questions.length}
                </h1>
  
                <div className="p-5 rounded-lg bg-gradient-to-r from-yellow-500 via-red-500 to-purple-500 max-w-2xl mx-auto flex justify-center items-center">
                  <img
                    src={questions[currentQuestion].image}
                    alt={`Question ${currentQuestion + 1}`}
                    className="w-full max-h-80 object-contain rounded-lg"
                    style={{
                      boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.7)",
                    }}
                  />
                </div>
              </>
            )}
  
            {/* Timer for Question Page */}
            {!showAnswers && (
              <div className="flex justify-center mt-6 w-full">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-md shadow-lg w-auto max-w-xs text-center">
                  කාලය: {timer} තත්පර
                </div>
              </div>
            )}
            {/* Answer Page */}
{showAnswers && (
  <>
    <div className="bg-gray-800 bg-opacity-70 p-4 rounded-lg shadow-lg mb-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4 text-center">
        නිවැරදි පිළිතුර තෝරන්න
      </h2>

      {/* Number Choices for Selecting Answer */}
      <table className="w-full text-lg border-separate border-spacing-3">
        <tbody>
          {questions[currentQuestion].answers.map((answer, index) => {
            // Determine if this is the start of a new row
            if (index % 2 === 0) {
              return (
                <tr key={index} className="flex gap-3 justify-center">
                  <td className="p-0 text-center">
                    <button
                      onClick={() => handleAnswerClick(index)}
                      className="bg-gradient-to-r m-1 from-green-400 to-lime-600 text-white px-8 py-4 rounded-full text-2xl shadow-lg hover:scale-105 transition-transform flex items-center justify-start"
                      style={{
                        width: "350px", // Button width
                        height: "80px", // Button height
                      }}
                    >
                      <strong className="ml-4">{answer}</strong>
                    </button>
                  </td>
                  {/* Check if there's a next item to render in the same row */}
                  {questions[currentQuestion].answers[index + 1] && (
                    <td className="p-0 text-center">
                      <button
                        onClick={() => handleAnswerClick(index + 1)}
                        className="bg-gradient-to-r m-1 from-green-400 to-lime-600 text-white px-8 py-4 rounded-full text-2xl shadow-lg hover:scale-105 transition-transform flex items-center justify-start"
                        style={{
                          width: "350px", // Button width
                          height: "80px", // Button height
                        }}
                      >
                        <strong className="ml-4">{questions[currentQuestion].answers[index + 1]}</strong>
                      </button>
                    </td>
                  )}
                </tr>
              );
            }
            return null; 
    })}
  </tbody>
</table>
</div>
                {/* Timer */}
                {showAnswers && (
                  <div className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-600 px-4 py-3 rounded-md shadow-lg mt-4">
                    කාලය: {timer} තත්පර
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Language_vocab_activity;
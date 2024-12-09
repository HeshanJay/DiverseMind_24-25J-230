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
        "3. රාජකීය සංගී ප්‍රද්‍ර්ශනය",
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
        "2. වෛද්‍ය උපදේශන මධ්‍යස්ථානය",
        "3. රෝහල් බාහිර රෝගී අංශය",
        "4. සෞඛ්‍ය මධ්‍යස්ථානය ",
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
                <div className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-md shadow-lg w-auto max-w-xs text-center">
                  කාලය: {timer} තත්පර
                </div>
              </div>
            )}
  {/* Answer Page */}
{showAnswers && (
  <>
    <h2 className="text-3xl font-semibold mb-6 text-center">
      නිවැරදි පිළිතුර තෝරන්න
    </h2>
    <div className="overflow-x-auto">
      <table className="w-full max-w-5xl mx-auto bg-gray-800 bg-opacity-70 rounded-lg">
        <tbody>
          {questions[currentQuestion].answers.map((answer, index) => {
            const isFirstCol = index % 2 === 0;

            if (isFirstCol) {
              return (
                <React.Fragment key={index}>
                  <tr>
                    <td className="p-4">
                      <button
                        onClick={() => handleAnswerClick(index)}
                        className="w-64 h-19 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-xl text-lg  flex items-center justify-start"
                      >
                        <span className="text-left">{answer}</span>
                      </button>
                    </td>
                    {questions[currentQuestion].answers[index + 1] && (
                      <td className="p-4">
                        <button
                          onClick={() => handleAnswerClick(index + 1)}
                          className="w-64 h-19 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-xl text-lg hover:scale-105 transition-transform flex items-center justify-start"
                        >
                          <span className="text-left">
                            {questions[currentQuestion].answers[index + 1]}
                          </span>
                        </button>
                      </td>
                    )}
                  </tr>
                </React.Fragment>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>

    {/* Timer Section */}
    <div className="flex justify-center mt-6 w-full">
      <div className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-md shadow-lg w-auto max-w-xs text-center">
        කාලය: {timer} තත්පර
      </div>
    </div>
  </>
)}


          </>
        )}
      </div>
    </div>
  );
  
  
};

export default Language_vocab_activity;


import React, { useState, useEffect } from "react";
import backImg from "../assets/background_images/back3.jpg"; 
import trainImage from "../assets/Questions1_images/1.jpg"; 
import farmImage from "../assets/Questions1_images/2.jpg"; 
import restaurantImage from "../assets/Questions1_images/3.jpg"; 
import accidentImage from "../assets/Questions1_images/4.jpg"; 
import hospitalImage from "../assets/Questions1_images/5.jpg"; 
import ScoreBoard from "../Components/Score_board"; // Import the ScoreBoard component

const Language_vocab_activity = () => {
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
        "2. කාර්මික මධ්‍යස්ථානය",
        "3. පලාත් සභා මණ්ඩපය",
        "4. ව්‍යාපාරික මධ්‍යස්ථානය",
      ],
      correctAnswer: "1. ගොවිපල",
    },
    {
      image: restaurantImage,
      answers: [
        "1. අපනයන මධ්‍යස්ථානය",
        "2. ආපන ශාලාව",
        "3. ගුවන් තොටුපළ",
        "4. කාර්මික මධ්‍යස්ථානය",
      ],
      correctAnswer: "2. ආපන ශාලාව",
    },
    {
      image: accidentImage,
      answers: [
        "1. ගුවන් තොටුපළ",
        "2. පාර්ලිමේන්තු මාලිගාව",
        "3. අනාත මධ්‍යස්ථානය",
        "4. අනතුරේ ස්ථානය",
      ],
      correctAnswer: "4. අනතුරේ ස්ථානය",
    },
    {
      image: hospitalImage,
      answers: [
        "1. රෝහල",
        "2. බස් නැවතුම්පොළ",
        "3. ගොවිපල",
        "4. අපනයන මධ්‍යස්ථානය",
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
          <ScoreBoard score={score} totalQuestions={questions.length} onRestart={restartActivity} />
        ) : (
          <>
            {showImage && (
              <h1 className="text-4xl font-bold mb-6">
                ප්‍රශ්නය: {currentQuestion + 1}/{questions.length}
              </h1>
            )}

            {showImage && (
              <div className="p-5 rounded-lg bg-gradient-to-r from-yellow-500 via-red-500 to-purple-500 max-w-4xl mx-auto">
               <div className="p-5 rounded-lg bg-gradient-to-r from-yellow-500 via-red-500 to-purple-500 max-w-4xl mx-auto flex justify-center items-center">
  <img
    src={questions[currentQuestion].image}
    alt={`Question ${currentQuestion + 1}`}
    className="w-full max-h-80 object-contain rounded-lg"
    style={{
      boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.7)", // Enhanced shadow for emphasis
    }}
  />
</div>

              </div>
            )}

            {showAnswers && (
              <>
                <h2 className="text-3xl font-semibold mb-6">නිවැරදි පිළිතුර තෝරන්න</h2>
                <div className="grid grid-cols-2 gap-6 bg-gray-800 bg-opacity-70 p-6 rounded-lg">
                  {questions[currentQuestion].answers.map((answer, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(index)}
                      className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl text-2xl hover:scale-105 transition-transform"
                    >
                      {answer}
                    </button>
                  ))}
                </div>
              </>
            )}

            <div className="absolute bottom-10 text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-3 rounded-md">
              කාලය: {timer} තත්පර
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Language_vocab_activity;


import React, { useState, useEffect } from "react";
import backImg from "../assets/background_images/back3.jpg"; // Background image
import question1Image from "../assets/Questions2_images/1.jpg";
import question2Image from "../assets/Questions2_images/2.jpg";
import question3Image from "../assets/Questions2_images/3.jpg";
import question4Image from "../assets/Questions2_images/4.jpg";
import ScoreBoard from "../Components/Score_board"; // Import the ScoreBoard component

const SpeedMeasurementActivity = () => {
  const questions = [
    {
      image: question1Image,
      answers: ["↑", "↓", "←", "→"],
      correctAnswer: "↓",
    },
    {
      image: question2Image,
      answers: ["⬜", "🔺", "◯", "⬛"],
      correctAnswer: "⬜",
    },
    {
      image: question3Image,
      answers: ["R", "r", "A", "h"],
      correctAnswer: "R",
    },
    {
      image: question4Image,
      answers: ["★", "✰", "⬜", "⚫"],
      correctAnswer: "★",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showImage, setShowImage] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
  const [timer, setTimer] = useState(10);
  const [score, setScore] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (showImage) {
      const id = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            setShowImage(false);
            setShowAnswers(true);
            setTimer(15);
            clearInterval(id);
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(id);
    }
  }, [showImage]);

  useEffect(() => {
    if (showAnswers) {
      const id = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            moveToNextQuestion();
            clearInterval(id);
          }
          return prevTimer - 1;
        });
      }, 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [showAnswers]);

  const handleAnswerClick = (answer) => {
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore((prevScore) => prevScore + 1); // Increment the score silently
    }
    clearInterval(intervalId); // Clear the timer
    moveToNextQuestion(); // Move to the next question
  };

  const moveToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowImage(true);
      setShowAnswers(false);
      setTimer(10);
    } else {
      setIsCompleted(true); // Mark the activity as completed
    }
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
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
        {isCompleted ? (
          <ScoreBoard score={score} totalQuestions={questions.length} onRestart={restartActivity} />
        ) : (
          <>
            {/* Header */}
            <h1 className="text-4xl font-bold mb-6">
              {showAnswers
                ? "නිවැරදි පිළිතුර තෝරන්න" // Display this text during the answer part
                : `ප්‍රශ්නය: ${currentQuestion + 1}/${questions.length}`} {/* Display question number otherwise */}
            </h1>

            {/* Image Display */}
            {showImage && (
              <div className="p-5 rounded-lg bg-gradient-to-r from-yellow-500 via-red-500 to-purple-500 max-w-4xl mx-auto">
              <img
                src={questions[currentQuestion].image}
                alt={`Question ${currentQuestion + 1}`}
                className="w-full max-h-screen object-cover rounded-lg"
                style={{
                  boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.7)", // Enhanced shadow for emphasi
                }}
              />
              </div>
            )}



<div class="overflow-x-auto p-6">
 
 
  {questions[currentQuestion]?.question && (
    <div class="bg-gray-700 text-white text-2xl font-bold text-center p-6 rounded-lg shadow-lg">
      {questions[currentQuestion].question}
    </div>
  )}

  {showAnswers && questions[currentQuestion]?.answers?.length > 0 && (
    <table class="mt-6 w-full bg-gray-800 bg-opacity-50 rounded-lg shadow-lg">
      <tbody>
        <tr>
          <td class="p-4 text-center">
            <button
              onClick={() => handleAnswerClick(questions[currentQuestion].answers[0])}
              class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-full text-2xl hover:scale-105 transition-transform shadow-md"
            >
              {questions[currentQuestion].answers[0]}
            </button>
          </td>
          <td class="p-4 text-center">
            <button
              onClick={() => handleAnswerClick(questions[currentQuestion].answers[1])}
              class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-full text-2xl hover:scale-105 transition-transform shadow-md"
            >
              {questions[currentQuestion].answers[1]}
            </button>
          </td>
        </tr>
        <tr>
          <td class="p-4 text-center">
            <button
              onClick={() => handleAnswerClick(questions[currentQuestion].answers[2])}
              class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-full text-2xl hover:scale-105 transition-transform shadow-md"
            >
              {questions[currentQuestion].answers[2]}
              
            </button>
          </td>
          <td class="p-4 text-center">
            <button
              onClick={() => handleAnswerClick(questions[currentQuestion].answers[3])}
              class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-full text-2xl hover:scale-105 transition-transform shadow-md"
            >
              {questions[currentQuestion].answers[3]}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  )}

<div class="mt-6 text-xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-md shadow-lg w-48 mx-auto">
  කාලය: {timer} තත්පර
</div>

</div>

          </>
        )}
      </div>
    </div>
  );
};

export default SpeedMeasurementActivity;

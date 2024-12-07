import React, { useState, useEffect } from "react";
import backImg from "../assets/background_images/back3.jpg";
import question1Image from "../assets/Question3_images/P1.jpg";
import question2Image from "../assets/Question3_images/P2.jpg";
import question3Image from "../assets/Question3_images/P3.jpg";
import question4Image from "../assets/Question3_images/P4.jpg";
import question5Image from "../assets/Question3_images/P5.jpg";

// Answer images
import answerImg1 from "../assets/Question3_images/answers/img1.jpg";
import answerImg2 from "../assets/Question3_images/answers/img2.jpg";
import answerImg3 from "../assets/Question3_images/answers/img3.jpg";
import answerImg4 from "../assets/Question3_images/answers/img4.jpg";
import answerImg5 from "../assets/Question3_images/answers/img5.jpg";
import answerImg6 from "../assets/Question3_images/answers/img6.jpg";
import answerImg7 from "../assets/Question3_images/answers/img7.jpg";
import answerImg8 from "../assets/Question3_images/answers/img8.jpg";
import answerImg9 from "../assets/Question3_images/answers/img9.jpg";
import answerImg10 from "../assets/Question3_images/answers/img10.jpg";
import answerImg11 from "../assets/Question3_images/answers/img11.jpg";
import answerImg12 from "../assets/Question3_images/answers/img12.jpg";
import answerImg13 from "../assets/Question3_images/answers/img13.jpg";
import answerImg14 from "../assets/Question3_images/answers/img14.jpg";
import answerImg15 from "../assets/Question3_images/answers/img15.jpg";
import answerImg16 from "../assets/Question3_images/answers/img16.jpg";
import answerImg17 from "../assets/Question3_images/answers/img17.jpg";
import answerImg18 from "../assets/Question3_images/answers/img18.jpg";
import answerImg19 from "../assets/Question3_images/answers/img19.jpg";
import answerImg20 from "../assets/Question3_images/answers/img20.jpg";
import ScoreBoard from "../Components/Score_board";

const MemoryTestActivity = () => {
  const questions = [
    {
      image: question1Image,
      answers: [
        { src: answerImg1, id: 1 },
        { src: answerImg2, id: 2 },
        { src: answerImg3, id: 3 },
        { src: answerImg4, id: 4 },
      ],
      correctAnswer: 4,
    },
    {
      image: question2Image,
      answers: [
        { src: answerImg5, id: 1 },
        { src: answerImg6, id: 2 },
        { src: answerImg7, id: 3 },
        { src: answerImg8, id: 4 },
      ],
      correctAnswer: 3,
    },
    {
      image: question3Image,
      answers: [
        { src: answerImg9, id: 1 },
        { src: answerImg10, id: 2 },
        { src: answerImg11, id: 3 },
        { src: answerImg12, id: 4 },
      ],
      correctAnswer: 1,
    },
    {
      image: question4Image,
      answers: [
        { src: answerImg13, id: 1 },
        { src: answerImg14, id: 2 },
        { src: answerImg15, id: 3 },
        { src: answerImg16, id: 4 },
      ],
      correctAnswer: 3,
    },
    {
      image: question5Image,
      answers: [
        { src: answerImg17, id: 1 },
        { src: answerImg18, id: 2 },
        { src: answerImg19, id: 3 },
        { src: answerImg20, id: 4 },
      ],
      correctAnswer: 3,
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(10);
  const [showImage, setShowImage] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval;
    if (showImage) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            setShowImage(false);
            setShowAnswers(true);
            clearInterval(interval);
            setTimer(10);
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else if (showAnswers) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            handleNextQuestion();
            clearInterval(interval);
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [showImage, showAnswers]);

  const handleAnswerClick = (id) => {
    if (id === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowImage(true);
      setShowAnswers(false);
      setTimer(10);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <ScoreBoard
        score={score}
        totalQuestions={questions.length}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backImg})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
  {showImage && (
    <h1 className="text-4xl font-bold mb-6">
      ප්‍රශ්නය: {currentQuestion + 1}/{questions.length}
    </h1>
  )}

  {/* Image Display */}
  {showImage && (
    <div className="p-5 rounded-lg bg-gradient-to-r from-yellow-500 via-red-500 to-purple-500 max-w-4xl mx-auto">
      <img
        src={questions[currentQuestion].image}
        alt={`Question ${currentQuestion + 1}`}
        className="w-full max-h-screen object-cover rounded-lg"
        style={{
          boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.7)", // Enhanced shadow for emphasis
        }}
      />
    </div>
  )}


       {/* Answer Display */}
{showAnswers && (
  <>
    <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg mb-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">
        නිවැරදි පිළිතුර තෝරන්න
      </h2>
      <table className="w-full text-lg border-separate border-spacing-4">
        <tbody>
          {questions[currentQuestion].answers.map((answer, index) => {
            const isFirstCol = index % 2 === 0;

            if (isFirstCol) {
              return (
                <tr key={index}>
                  <td className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg">
                    <div className="flex flex-col items-center">
                      <div className="flex justify-center items-center mb-2">
                        <strong className="text-xl text-white">{index + 1}.&nbsp;</strong>
                      </div>
                      {answer.src ? (
                        <img
                          src={answer.src}
                          alt={`Answer ${index + 1}`}
                          className="w-full h-20 object-contain rounded-md"
                        />
                      ) : (
                        <span className="text-white">{answer}</span>
                      )}
                    </div>
                  </td>
                  {questions[currentQuestion].answers[index + 1] && (
                    <td className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg">
                      <div className="flex flex-col items-center">
                        <div className="flex justify-center items-center mb-2">
                          <strong className="text-xl text-white">{index + 2}.&nbsp;</strong>
                        </div>
                        {questions[currentQuestion].answers[index + 1].src ? (
                          <img
                            src={questions[currentQuestion].answers[index + 1].src}
                            alt={`Answer ${index + 2}`}
                            className="w-full h-20 object-contain rounded-md"
                          />
                        ) : (
                          <span className="text-white">{questions[currentQuestion].answers[index + 1]}</span>
                        )}
                      </div>
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

    {/* Answer Buttons */}
    <div className="flex justify-center gap-4 mt-4 -translate-y-6">
      {questions[currentQuestion].answers.map((answer, index) => (
        <button
          key={index}
          onClick={() => handleAnswerClick(answer.id)}
          className="bg-gradient-to-r from-yellow-500 to-red-500 text-white px-6 py-3 rounded-full text-xl hover:scale-105 transition-transform"
        >
          {index + 1}
        </button>
      ))}
    </div>
  </>
)}

{/* Timer */}
<div className="flex justify-center mt-4">
  <div className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-red-500 px-6 py-3 rounded-md shadow-lg text-center">
    කාලය: {timer} තත්පර
  </div>
</div>

      </div>
    </div>
  );
};

export default MemoryTestActivity;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backImg from "../assets/background_images/back3.jpg";
import question1Image from "../assets/Question4_images/1.jpg";
import question2Image from "../assets/Question4_images/2.jpg";
import question3Image from "../assets/Question4_images/3.jpg";
import question4Image from "../assets/Question4_images/4.jpg";
import answerImg5 from "../assets/Question4_images/5.jpg";
import answerImg6 from "../assets/Question4_images/6.jpg";
import answerImg7 from "../assets/Question4_images/7.jpg";
import answerImg8 from "../assets/Question4_images/8.jpg";
import answerImg9 from "../assets/Question4_images/9.jpg";
import answerImg10 from "../assets/Question4_images/10.jpg";
import answerImg11 from "../assets/Question4_images/11.jpg";
import answerImg12 from "../assets/Question4_images/12.jpg";
import ScoreBoard from "../Components/Score_board";

const VisualTestActivity = () => {
  const questions = [
    {
      image: question1Image,
      answers: [
        "රතු වෘත්තය, කොළ චතුර්ස්‍රය, දම් ත්‍රිකෝණය",
        "දම් වෘත්තය, රතු චතුර්ස්‍රය, කොළ ත්‍රිකෝණය",
        "කොළ වෘත්තය, රතු චතුර්ස්‍රය, දම් ත්‍රිකෝණය",
        "රතු වෘත්තය, දම් චතුර්ස්‍රය, කොළ ත්‍රිකෝණය",
      ],
      correctAnswer: 1,
    },
    {
      image: question2Image,
      answers: [
        "රතු වෘත්තය තුළ දම් පොට වෘත්තය, කොළ සමචතුර්ස්‍රය තුළ දම් සමචතුර්ස්‍රය, නිල් ත්‍රිකෝණය තුළ කොළ ත්‍රිකෝණය.",
        "රතු වෘත්තය තුළ කොළ වෘත්තය, කහ සමචතුර්ස්‍රය තුළ කොළ සමචතුර්ස්‍රය, නිල් ත්‍රිකෝණය තුළ කහ ත්‍රිකෝණය.",
        "රතු වෘත්තය තුළ කහ වෘත්තය, කොළ සමචතුර්ස්‍රය තුළ තැඹිලි සමචතුර්ස්‍රය, නිල් ත්‍රිකෝණය තුළ රතු වෘත්තය.",
        "රතු වෘත්තය තුළ දම් වෘත්තය,තැඹිලි සමචතුර්ස්‍රය තුළ වෘත්ත සමචතුර්ස්‍රය, නිල් ත්‍රිකෝණය තුළ රතු ත්‍රිකෝණය.",
      ],
      correctAnswer: 3,
    },
    {
      image: question3Image,
      answers: [
        { src: answerImg5, id: 1 },
        { src: answerImg6, id: 2 },
        { src: answerImg7, id: 3 },
        { src: answerImg8, id: 4 },
      ],
      correctAnswer: 3,
    },
    {
      image: question4Image,
      answers: [
        { src: answerImg9, id: 1 },
        { src: answerImg10, id: 2 },
        { src: answerImg11, id: 3 },
        { src: answerImg12, id: 4 },
      ],
      correctAnswer: 2,
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [showImage, setShowImage] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
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

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backImg})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {isCompleted ? (
        <ScoreBoard
          score={score}
          totalQuestions={questions.length}
          onRestart={handleRestart}
        />
      ) : (
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
          {showImage && (
            <>
              <h1 className="text-4xl font-bold mb-6">
                ප්‍රශ්නය: {currentQuestion + 1}/{questions.length}
              </h1>
              <div className="p-5 rounded-lg bg-gradient-to-r from-yellow-500 via-red-500 to-purple-500 max-w-xl mx-auto">
                <img
                  src={questions[currentQuestion].image}
                  alt={`Question ${currentQuestion + 1}`}
                  className="w-full max-h-60 object-contain rounded-lg border-4 border-white"
                  style={{
                    boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.7)",
                  }}
                />
              </div>
            </>
          )}

{showAnswers && (
  <>
    <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-3xl font-semibold mb-6">
      නිවැරදි පිළිතුර තෝරන්න
      </h2>
      
      {/* Conditionally adjust grid size for Question 2 */}
      <div
        className={`grid ${currentQuestion === 1 ? 'grid-cols-2 gap-4' : 'grid-cols-2 gap-6'} text-lg`}
      >
        {questions[currentQuestion].answers.map((answer, index) => (
          <div
            key={index}
            className="p-4 text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg text-xl"
          >{index + 1}. &nbsp;
            {answer.src ? (
              <img
                src={answer.src}
                alt={`Answer ${index + 1}`}
                className="w-full max-h-28 object-contain"  // Adjust image size
              />
            ) : (
              answer
            )}
          </div>
        ))}
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-6">
                {questions[currentQuestion].answers.map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(answer.id || index + 1)}
                    className="bg-gradient-to-r from-yellow-500 to-red-500 text-white px-4 py-2 rounded-full text-xl hover:scale-105 transition-transform"
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="absolute bottom-5 text-xl font-bold bg-gradient-to-r from-yellow-500 to-red-500 px-4 py-2 rounded-md">
            කාලය: {timer} තත්පර
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualTestActivity;

import React, { useState, useEffect } from "react";
import backImg from "../../assets/background_images/back3.jpg";
import question1Image from "../../assets/Questions2_images/1.jpg";
import question2Image from "../../assets/Questions2_images/2.jpg";
import question3Image from "../../assets/Questions2_images/3.jpg";
import question4Image from "../../assets/Questions2_images/4.jpg";
import img34 from "../../assets/Working_Memory/img34.png";
import img53 from "../../assets/Working_Memory/img53.png";
import img52 from "../../assets/Working_Memory/img52.png";
import { useScores } from "../../context/Score_context";

const SpeedMeasurementActivity = ({ onNext, onBack }) => {
  const {
    visualDiscriminationScore,
    setVisualDiscriminationScore,
    memoryScore,
    setMemoryScore,
    languageVocabScore,
    setLanguageVocabScore,
    audioDiscriminationScore,
    setAudioDiscriminationScore,
    speedScore,
    setSpeedScore,
    currentTestName,
  } = useScores();

  const questions = [
    {
      image: question1Image,
      answers: ["↑", "↓", "←", "→"],
      correctAnswer: "↑",
      imageWidth: "270px",  
      imageHeight: "208px", 
      imageMarginTop: "-30px" 
    },
    {
      image: question2Image,
      answers: ["▢", "△", "◯", "♢"],
      correctAnswer: "♢",
      imageWidth: "379px",
      imageHeight: "211px",
    },
    {
      image: question3Image,
      answers: ["R", "r", "A", "h"],
      correctAnswer: "R",
      imageWidth: "377px",
      imageHeight: "177px",
    },
    {
      image: question4Image,
      answers: ["★", "✰", "⬜", "⚫"],
      correctAnswer: "✰",
      imageWidth: "334px",
      imageHeight: "140px",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showImage, setShowImage] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
  const [timer, setTimer] = useState(10);
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
            setTimer(10);
            clearInterval(interval);
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else if (showAnswers) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            handleAnswerClick(null);
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showImage, showAnswers]);

  const handleAnswerClick = (answer) => {
    setTimer(0);
    if (answer === questions[currentQuestion].correctAnswer) {
      setSpeedScore((prev) => prev + 0.25);
    }
    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowImage(true);
      setShowAnswers(false);
      setTimer(10);
    } else {
      setIsCompleted(true);
      onNext();
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backImg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
        {isCompleted ? null : (
          <>
            {showImage && (
              <>
                <div className="p-8 rounded-[2rem] bg-gradient-to-r from-blue-300/80 via-green-300/80 to-purple-300/80 border-8 border-blue-800 shadow-md max-w-xl mx-auto mt-6 relative w-[600px] h-[370px] flex flex-col justify-between items-center">
                  <div className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl font-bold rounded-2xl shadow-md">
                    ප්‍රශ්නය: {currentQuestion + 1}/{questions.length}
                  </div>

                  <img
                    src={img34}
                    alt="img34"
                    className="absolute top-[210px] right-[450px] w-[140px] h-auto"
                  />
                  <img
                    src={img52}
                    alt="img52"
                    className="absolute bottom-[1px] right-[15px] w-[220px] h-auto"
                  />
                  <img
                    src={img53}
                    alt="img53"
                    className="absolute bottom-[1px] right-[230px] w-[220px] h-auto"
                  />

                  <div className="flex-grow flex justify-center items-center w-full">
                    <img
                      src={questions[currentQuestion].image}
                      alt={`Question ${currentQuestion + 1}`}
                      className="object-contain rounded-lg border-8 border-white shadow-lg"
                      style={{
                        width: questions[currentQuestion].imageWidth,
                        height: questions[currentQuestion].imageHeight,
                        boxShadow: "0px 10px 35px rgba(0, 0, 0, 0.8)",
                      }}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <div className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-md shadow-lg text-center">
                    ⏳ කාලය: {timer} තත්පර
                  </div>
                </div>
              </>
            )}
            {showAnswers && (
              <>
                <div className="bg-gray-800 bg-opacity-70 p-8 rounded-[3rem] shadow-lg mb-8 max-w-7xl mx-auto border-4 border-white">
                  <h2 className="text-3xl font-semibold mb-6 text-center">
                    නිවැරදි පිළිතුර තෝරන්න
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    {questions[currentQuestion].answers.map((answer, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerClick(answer)}
                        className="bg-gradient-to-r from-green-300 to-emerald-600 text-white px-12 py-8 rounded-[30px] text-4xl font-bold flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                      >
                        <span className="mr-4">{index + 1}.</span>
                        <span>{answer}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <div className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-green-500 hover:from-cyan-500 hover:to-blue-700 px-6 py-3 rounded-md shadow-lg text-center">
                    ⏳ කාලය: {timer} තත්පර
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

export default SpeedMeasurementActivity;
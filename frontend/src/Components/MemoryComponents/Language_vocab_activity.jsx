import React, { useState, useEffect, useRef } from "react";
import backImg from "../../assets/background_images/back3.jpg";
import trainImage from "../../assets/Questions1_images/1.jpg";
import farmImage from "../../assets/Questions1_images/2.jpg";
import restaurantImage from "../../assets/Questions1_images/3.jpg";
import accidentImage from "../../assets/Questions1_images/4.jpg";
import hospitalImage from "../../assets/Questions1_images/5.jpg";
import { useScores } from "../../context/Score_context";
import img41 from "../../assets/Working_Memory/img41.png";
import img42 from "../../assets/Working_Memory/img42.png";
import img43 from "../../assets/Working_Memory/img43.png";
import img44 from "../../assets/Working_Memory/img44.png";
import img48 from "../../assets/Working_Memory/img48.png";

const LanguageVocabActivity = ({ onNext, onBack, onFinishAll }) => {
  const { languageVocabScore, setLanguageVocabScore } = useScores();

  const questions = [
    {
      image: trainImage,
      width: "210px",
      height: "200px",
      marginTop: "10px",
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
      width: "240px",
      height: "240px",
      marginTop: "20px",
      answers: [
        "1. ගොවිපල",
        "2. සත්ත්වෝද්‍යානය",
        "3. උද්භිද්‍ උද්‍යානය",
        "4. සත්ත්ව ශාලාව",
      ],
      correctAnswer: "1. ගොවිපල",
    },
    {
      image: restaurantImage,
      width: "340px",
      height: "170px",
      marginTop: "20px",
      answers: [
        "1. රාජ බෝජන සංග්‍රහය",
        "2. රාජගීය පවුල",
        "3. රාජකීය සංගීත ප්‍රදර්ශනය",
        "4. රාජගීය උත්සවය",
      ],
      correctAnswer: "1. රාජ බෝජන සංග්‍රහය",
    },
    {
      image: accidentImage,
      width: "240px",
      height: "240px",
      marginTop: "10px",
      answers: [
        "1. ඉදිකිරීම් කටයුතු ස්ථානය",
        "2. රිය අනතුර",
        "3. රෝහල ඉදිරිපිට",
        "4. වාහන තදබදය",
      ],
      correctAnswer: "2. රිය අනතුර",
    },
    {
      image: hospitalImage,
      width: "300px",
      height: "210px",
      marginTop: "10px",
      answers: [
        "1. රෝහල",
        "2. සෞඛ්‍ය මධ්‍යස්ථානය",
        "3. බාහිර රෝගී අංශය",
        "4. ආරෝග්‍ය මධ්‍යස්ථානය",
      ],
      correctAnswer: "1. රෝහල",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(3);
  const [showImage, setShowImage] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Guard to ensure onFinishAll only fires once
  const finishCalled = useRef(false);

  // 1) Show image for `timer` seconds, then flip to answers
  useEffect(() => {
    if (!showImage) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setShowImage(false);
          setShowAnswers(true);
          setTimer(3);
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showImage]);

  // 2) Show answers for `timer` seconds, then auto‐submit `null`
  useEffect(() => {
    if (!showAnswers) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          handleAnswerClick(null);
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showAnswers]);

  const handleAnswerClick = (index) => {
    const q = questions[currentQuestion];
    if (index !== null && q.answers[index] === q.correctAnswer) {
      setLanguageVocabScore((prev) => prev + 0.2);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowImage(true);
      setShowAnswers(false);
      setTimer(3);
    } else {
      setIsCompleted(true);
      // Only fire finish once
      if (!finishCalled.current) {
        finishCalled.current = true;
        onFinishAll();
      }
    }
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backImg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
        {showImage && (
          <div className="p-8 rounded-[2rem] bg-gradient-to-r from-blue-300/80 via-green-300/80 to-purple-300/80 border-8 border-blue-800 shadow-md max-w-xl mx-auto mt-6 relative w-[600px] h-[420px] flex flex-col justify-between items-center overflow-hidden">
            <div className="absolute top-[-20px] px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl font-bold rounded-2xl shadow-md mt-[50px]">
              ප්‍රශ්නය: {currentQuestion + 1}/{questions.length}
            </div>

            {/* Decorative thumbnails */}
            <img
              src={img41}
              alt="img41"
              className="absolute top-[267px] right-[360px] w-[200px] h-auto"
            />
            <img
              src={img42}
              alt="img42"
              className="absolute top-[267px] right-[200px] w-[200px] h-auto"
            />
            <img
              src={img43}
              alt="img43"
              className="absolute top-[267px] right-[90px] w-[200px] h-auto"
            />
            <img
              src={img44}
              alt="img44"
              className="absolute top-[267px] right-[6px] w-[200px] h-auto"
            />
            <img
              src={img48}
              alt="img48"
              className="absolute top-[10px] right-[414px] w-[145px] h-auto"
            />

            {/* Main question image */}
            <div className="flex-grow flex justify-center items-center w-full">
              <img
                src={questions[currentQuestion].image}
                alt={`Question ${currentQuestion + 1}`}
                className="object-contain rounded-lg border-8 border-white shadow-lg"
                style={{
                  width: questions[currentQuestion].width,
                  height: questions[currentQuestion].height,
                  marginTop: questions[currentQuestion].marginTop,
                  boxShadow: "0px 10px 35px rgba(0, 0, 0, 0.8)",
                }}
              />
            </div>
          </div>
        )}

        {/* Timer */}
        {(showImage || showAnswers) && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <div
              className={`text-xl font-bold ${
                showImage
                  ? "bg-gradient-to-r from-blue-500 to-purple-500"
                  : "bg-gradient-to-r from-green-700 to-lime-700"
              } px-6 py-3 rounded-md shadow-lg`}
            >
              ⏳ කාලය: {timer} තත්පර
            </div>
          </div>
        )}

        {/* Answers */}
        {showAnswers && (
          <div className="bg-gray-800 bg-opacity-70 p-4 rounded-[3rem] shadow-lg mb-6 max-w-7xl mx-auto border-4 border-white">
            <h2 className="text-3xl font-semibold mb-4 text-center">
              නිවැරදි පිළිතුර තෝරන්න
            </h2>
            <table className="w-full text-lg border-separate border-spacing-3">
              <tbody>
                {questions[currentQuestion].answers.map((answer, idx) => {
                  if (idx % 2 === 0) {
                    return (
                      <tr key={idx} className="flex gap-10 justify-center">
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleAnswerClick(idx)}
                            className="bg-gradient-to-r from-green-600 to-lime-300 text-white px-6 py-3 rounded-xl text-2xl shadow-lg hover:scale-105 transition-transform"
                            style={{ width: "320px", height: "70px" }}
                          >
                            <strong>{answer}</strong>
                          </button>
                        </td>
                        {questions[currentQuestion].answers[idx + 1] && (
                          <td className="p-3 text-center">
                            <button
                              onClick={() => handleAnswerClick(idx + 1)}
                              className="bg-gradient-to-r from-green-600 to-lime-300 text-white px-6 py-3 rounded-xl text-2xl shadow-lg hover:scale-105 transition-transform"
                              style={{ width: "320px", height: "70px" }}
                            >
                              <strong>
                                {questions[currentQuestion].answers[idx + 1]}
                              </strong>
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
        )}
      </div>
    </div>
  );
};

export default LanguageVocabActivity;

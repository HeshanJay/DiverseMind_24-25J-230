import React, { useState, useEffect } from "react";
import backImg from "../../assets/background_images/back3.jpg";
import question1Image from "../../assets/Question4_images/1.jpg";
import question2Image from "../../assets/Question4_images/2.jpg";
import question3Image from "../../assets/Question4_images/3.jpg";
import question4Image from "../../assets/Question4_images/4.jpg";
import answerImg5 from "../../assets/Question4_images/5.jpg";
import answerImg6 from "../../assets/Question4_images/6.jpg";
import answerImg7 from "../../assets/Question4_images/7.jpg";
import answerImg8 from "../../assets/Question4_images/8.jpg";
import answerImg9 from "../../assets/Question4_images/9.jpg";
import answerImg10 from "../../assets/Question4_images/10.jpg";
import answerImg11 from "../../assets/Question4_images/11.jpg";
import answerImg12 from "../../assets/Question4_images/12.jpg";
import img27 from "../../assets/Working_Memory/img27.png";
import img30 from "../../assets/Working_Memory/img30.png";
import img31 from "../../assets/Working_Memory/img31.png";
import img32 from "../../assets/Working_Memory/img32.png";
import img33 from "../../assets/Working_Memory/img33.png";
import { useScores } from "../../context/Score_context";

const VisualTestActivity = ({ onNext, onBack }) => {
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
  const [isCompleted, setIsCompleted] = useState(false);
  const [timer, setTimer] = useState(3);
  const [showImage, setShowImage] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    let interval;
    if (showImage) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            setShowImage(false);
            setShowAnswers(true);
            setTimer(3);
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

  const handleAnswerClick = (id) => {
    setTimer(0);

    if (id === questions[currentQuestion].correctAnswer) {
      setVisualDiscriminationScore((prev) => prev + 0.25);
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
        {showImage && (
          <>
            <div className="p-8 rounded-[2rem] bg-gradient-to-r from-blue-300/80 via-green-300/80 to-purple-300/80 border-8 border-blue-800 shadow- max-w-xl mx-auto mt-6 relative h-[340px] flex flex-col justify-between items-center">
              <img
                src={img27}
                alt="img27"
                className="absolute top-[18px] right-[50px] w-[150px] h-auto"
              />

              <div className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl font-bold rounded-2xl shadow-md mt-[-10px]">
                ප්‍රශ්නය: {currentQuestion + 1}/{questions.length}
              </div>

              <img
                src={img33}
                alt="img33"
                className="absolute top-[70px] right-[500px] w-[45px] h-auto animate-butterfly"
                style={{ animationDelay: "0s" }}
              />
              <img
                src={img32}
                alt="img32"
                className="absolute top-[20px] right-[20px] w-[50px] h-auto animate-butterfly"
                style={{ animationDelay: "0.5s" }}
              />
              <img
                src={img31}
                alt="img31"
                className="absolute top-[-10px] right-[420px] w-[70px] h-auto animate-butterfly"
                style={{ animationDelay: "1s" }}
              />

              <div className="w-full flex justify-center mt-4 relative">
                <img
                  src={img30}
                  alt={`Question ${currentQuestion + 1}`}
                  className="absolute top-[-82px] right-[160px] w-[300px] h-auto"
                />
                <img
                  src={questions[currentQuestion].image}
                  alt={`Question ${currentQuestion + 1}`}
                  className="w-[90%] max-h-[300px] object-contain rounded-lg border-8 border-white shadow-lg"
                  style={{ boxShadow: "0px 10px 35px rgba(0, 0, 0, 0.8)" }}
                />
              </div>
            </div>
            <style>
              {`
                @keyframes butterflyWings {
                  0%, 100% { transform: scale(1) rotate(0deg); }
                  25% { transform: scale(1.1) rotate(-2deg); }
                  50% { transform: scale(1) rotate(0deg); }
                  75% { transform: scale(1.1) rotate(2deg); }
                }
                .animate-butterfly { animation: butterflyWings 0.8s infinite ease-in-out; }
              `}
            </style>
          </>
        )}
        {!showAnswers && (
          <div className="mt-6">
            <div className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-md shadow-lg text-center">
              ⏳ කාලය: {timer} තත්පර
            </div>
          </div>
        )}
        {showAnswers && (
          <>
            <div className="bg-gray-800 bg-opacity-70 p-6 rounded-2xl shadow-lg mb-8 max-w-5xl mx-auto border-4 border-white">
              <h2 className="text-3xl font-semibold mb-6 text-center">
                නිවැරදි පිළිතුර තෝරන්න
              </h2>

              <table className="w-full text-lg border-separate border-spacing-4">
                <tbody>
                  {questions[currentQuestion].answers.map((answer, index) => {
                    const isFirstCol = index % 2 === 0;
                    const answerId = answer.id || index + 1;

                    if (isFirstCol) {
                      return (
                        <tr key={index}>
                          <td
                            className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => handleAnswerClick(answerId)}
                          >
                            <div className="flex justify-center items-center h-full w-full">
                              <strong className="text-xl text-white align-center">
                                {index + 1}.&nbsp;
                              </strong>
                              {answer.src ? (
                                <img
                                  src={answer.src}
                                  alt={`Answer ${index + 1}`}
                                  className="w-full max-h-28 object-contain rounded-md"
                                />
                              ) : (
                                <span className="text-white">{answer}</span>
                              )}
                            </div>
                          </td>
                          {questions[currentQuestion].answers[index + 1] && (
                            <td
                              className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition-transform rounded-lg shadow-lg cursor-pointer"
                              onClick={() =>
                                handleAnswerClick(
                                  questions[currentQuestion].answers[index + 1]
                                    .id || index + 2
                                )
                              }
                            >
                              <div className="flex justify-center items-center h-full w-full">
                                <strong className="text-xl text-white">
                                  {index + 2}.&nbsp;
                                </strong>
                                {questions[currentQuestion].answers[index + 1]
                                  .src ? (
                                  <img
                                    src={
                                      questions[currentQuestion].answers[
                                        index + 1
                                      ].src
                                    }
                                    alt={`Answer ${index + 2}`}
                                    className="w-full max-h-28 object-contain rounded-md"
                                  />
                                ) : (
                                  <span className="text-white">
                                    {
                                      questions[currentQuestion].answers[
                                        index + 1
                                      ]
                                    }
                                  </span>
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
            <div className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-red-500 px-6 py-3 rounded-md shadow-lg text-center">
              ⏳ කාලය: {timer} තත්පර
            </div>
          </>
        )}{" "}
      </div>
    </div>
  );
};

export default VisualTestActivity;

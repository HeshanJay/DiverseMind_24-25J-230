import React, { useState, useEffect } from "react";
import backImg from "../../assets/background_images/back3.jpg";
import question1Image from "../../assets/Question3_images/P1.jpg";
import question2Image from "../../assets/Question3_images/P2.jpg";
import question3Image from "../../assets/Question3_images/P3.jpg";
import question4Image from "../../assets/Question3_images/P4.jpg";
import question5Image from "../../assets/Question3_images/P5.jpg";
import answerImg1 from "../../assets/Question3_images/answers/img1.jpg";
import answerImg2 from "../../assets/Question3_images/answers/img2.jpg";
import answerImg3 from "../../assets/Question3_images/answers/img3.jpg";
import answerImg4 from "../../assets/Question3_images/answers/img4.jpg";
import answerImg5 from "../../assets/Question3_images/answers/img5.jpg";
import answerImg6 from "../../assets/Question3_images/answers/img6.jpg";
import answerImg7 from "../../assets/Question3_images/answers/img7.jpg";
import answerImg8 from "../../assets/Question3_images/answers/img8.jpg";
import answerImg9 from "../../assets/Question3_images/answers/img9.jpg";
import answerImg10 from "../../assets/Question3_images/answers/img10.jpg";
import answerImg11 from "../../assets/Question3_images/answers/img11.jpg";
import answerImg12 from "../../assets/Question3_images/answers/img12.jpg";
import answerImg13 from "../../assets/Question3_images/answers/img13.jpg";
import answerImg14 from "../../assets/Question3_images/answers/img14.jpg";
import answerImg15 from "../../assets/Question3_images/answers/img15.jpg";
import answerImg16 from "../../assets/Question3_images/answers/img16.jpg";
import answerImg17 from "../../assets/Question3_images/answers/img17.jpg";
import answerImg18 from "../../assets/Question3_images/answers/img18.jpg";
import answerImg19 from "../../assets/Question3_images/answers/img19.jpg";
import answerImg20 from "../../assets/Question3_images/answers/img20.jpg";
import img28 from "../../assets/Working_Memory/img28.png";
import img35 from "../../assets/Working_Memory/img35.png";
import img26 from "../../assets/Working_Memory/img26.png";
import { useScores } from "../../context/Score_context";

const MemoryTestActivity = ({ onNext, onBack }) => {
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
  const [timer, setTimer] = useState(2);
  const [showImage, setShowImage] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval;
    if (showImage) {
      setTimer(2);
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            setShowImage(false);
            setShowAnswers(true);
            setTimer(10);
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

  const handleAnswerClick = (answerId) => {
    setTimer(0);
    if (answerId === questions[currentQuestion].correctAnswer) {
      setMemoryScore((prev) => prev + 0.2);
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
            <div className="p-8 rounded-[2rem] bg-gradient-to-r from-blue-300/80 via-green-300/80 to-purple-300/80 border-8 border-blue-800 shadow-md max-w-xl mx-auto mt-6 relative w-[600px] h-[380px] flex flex-col justify-between items-center">
              <div className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl font-bold rounded-2xl shadow-md">
                ප්‍රශ්නය: {currentQuestion + 1}/{questions.length}
              </div>

              <img
                src={img35}
                alt="img35"
                className="absolute top-[220px] right-[405px] w-[160px] h-auto"
              />
              <img
                src={img26}
                alt="img26"
                className="absolute bottom-[20px] right-[10px] w-[110px] h-auto"
              />
              <img
                src={img28}
                alt="img28"
                className="absolute bottom-[1px] right-[30px] w-[470px] h-auto"
              />

              <div className="flex-grow flex justify-center items-center w-full mt-[-75px]">
                <img
                  src={questions[currentQuestion].image}
                  alt={`Question ${currentQuestion + 1}`}
                  className="w-[80%] max-h-[280px] object-contain rounded-lg border-8 border-white shadow-lg"
                  style={{ boxShadow: "0px 10px 35px rgba(0, 0, 0, 0.8)" }}
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
            <div className="bg-gray-800 bg-opacity-70 p-6 rounded-[3rem] shadow-lg mb-3 w-[940px] h-[485px] border-4 border-white">
              <h2 className="text-4xl font-semibold mb-6 text-center">
                නිවැරදි පිළිතුර තෝරන්න
              </h2>
              <table className="w-full text-lg border-separate border-spacing-4">
                <tbody>
                  {questions[currentQuestion].answers.map((answer, index) => {
                    if (index % 2 === 0) {
                      return (
                        <tr
                          key={index}
                          className="flex gap-6 justify-center mb-4"
                        >
                          <td className="p-3 text-center relative">
                            <div className="absolute top-6 left-5 text-black w-8 h-8 flex items-center justify-center text-2xl font-bold z-10">
                              {index + 1}
                            </div>
                            <button
                              onClick={() => handleAnswerClick(answer.id)}
                              className="bg-gradient-to-r from-green-400 to-lime-600 text-white px-6 py-3 rounded-xl text-2xl shadow-lg hover:scale-105 transition-transform relative"
                              style={{ width: "400px", height: "150px" }}
                            >
                              <img
                                src={answer.src}
                                alt={`Answer ${answer.id}`}
                                className="w-full h-full object-contain rounded-lg p-2"
                              />
                            </button>
                          </td>

                          {/* Answer 2 */}
                          {questions[currentQuestion].answers[index + 1] && (
                            <td className="p-3 text-center relative">
                              <div className="absolute top-6 left-4 text-black w-8 h-8 flex items-center justify-center text-2xl font-bold z-10">
                                {index + 2}
                              </div>
                              <button
                                onClick={() =>
                                  handleAnswerClick(
                                    questions[currentQuestion].answers[
                                      index + 1
                                    ].id
                                  )
                                }
                                className="bg-gradient-to-r from-green-400 to-lime-600 text-white px-6 py-3 rounded-xl text-2xl shadow-lg hover:scale-105 transition-transform"
                                style={{ width: "400px", height: "150px" }}
                              >
                                <img
                                  src={
                                    questions[currentQuestion].answers[
                                      index + 1
                                    ].src
                                  }
                                  alt={`Answer ${
                                    questions[currentQuestion].answers[
                                      index + 1
                                    ].id
                                  }`}
                                  className="w-full h-full object-contain rounded-lg p-2"
                                />
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
            <div className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-700 px-5 py-3 rounded-xl shadow-lg mt-2">
              ⏳ කාලය: {timer} තත්පර
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MemoryTestActivity;

import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import backImg from "../../assets/background_images/back7.png";
import backImgAnswer from "../../assets/background_images/back12.jpg";
import audio1 from "../../assets/Audios/1.mp3";
import audio2 from "../../assets/Audios/2.mp3";
import audio3 from "../../assets/Audios/3.mp3";
import audio4 from "../../assets/Audios/4.mp3";
import audio5 from "../../assets/Audios/5.mp3";
import img32 from "../../assets/Working_Memory/img32.png";
import img31 from "../../assets/Working_Memory/img31.png";
import { useScores } from "../../context/Score_context";

const AudioMeasurementActivity = ({ onNext, onBack }) => {
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

  const audioFiles = [audio1, audio2, audio3, audio4, audio5];

  const answers = [
    [
      "1. අමරගේ පියා පොල් කැඩුවේය.",
      "2. නිමල්ගේ පියා පොල් කැඩුවේය.",
      "3. අමරගේ පියා පොල් කැඩුවාය.",
      "4. අමරගේ පියා ගල් කැඩුවේය.",
    ],
    [
      "1. නිමල්ගේ මව බත් පිසුවාය.",
      "2. නිමල්ගේ මව කිරිබත් පිසුවේය.",
      "3. නිමලාගේ මව කිරිබත් පිසුවාය.",
      "4. නිමල්ගේ මව කිරිබත් පිසුවාය.",
    ],
    [
      "1. නිමල් අමල් සමඟ පාඩම් කරයි.",
      "2. සුනිමල් නිමල් සමඟ පාඩම් කරයි.",
      "3. නිමල් සුනිමල් සමඟ පාඩම් කරයි.",
      "4. නිමල් සුනිමල් සමඟ පාඩම් කරති.",
    ],
    [
      "1. නිර්මලාගේ මව විමලා වන අතර විමලාගේ මව අමලා වේ.",
      "2. නිර්මලාගේ මව විමලා වන අතර විමලාගේ මව කමලා වේ.",
      "3. නිර්මලාගේ මව කමලා වන අතර විමලාගේ මව විමලා වේ.",
      "4. නිර්මලාගේ මව විමලා වන අතර අමලාගේ මව කමලා වේ.",
    ],
    [
      "1. මහනුවර සිට බදුල්ල බලා ධාවනය වන දුම්රිය පස්වරු 5.30 වන විට 6 වන වේදිකාවට ළගා වනු ඇත.",
      "2. මහනුවර සිට කොළඹ බලා ධාවනය වන දුම්රිය පස්වරු 6.30 වන විට 6 වන වේදිකාවට ළගා වනු ඇත.",
      "3. මහනුවර සිට කොළඹ බලා ධාවනය වන දුම්රිය පස්වරු 5.30 වන විට 7 වන වේදිකාවට ළගා වනු ඇත.",
      "4. මහනුවර සිට කොළඹ බලා ධාවනය වන දුම්රිය පස්වරු 5.30 වන විට 6 වන වේදිකාවට ළගා වනු ඇත.",
    ],
  ];

  const correctAnswers = [0, 3, 2, 1, 3];

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [timer, setTimer] = useState(3);
  const [audioPlayedCount, setAudioPlayedCount] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  useEffect(() => {
    let interval;
    if (showAnswers) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            handleAnswerClick(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showAnswers]);

  useEffect(() => {
    if (audioPlayedCount < 2 && isAudioPlaying) {
      const audio = new Audio(audioFiles[currentQuestion - 1]);
      audio.play();
      audio.onended = () => {
        setAudioPlayedCount((prev) => prev + 1);
        if (audioPlayedCount + 1 >= 2) {
          setShowAnswers(true);
        }
      };
    }
  }, [isAudioPlaying, currentQuestion, audioPlayedCount, audioFiles]);

  const handleStartAudio = () => {
    setIsAudioPlaying(true);
    setShowAnswers(false);
    setTimer(3);
    setAudioPlayedCount(0);
  };

  const handleAnswerClick = (answerIndex) => {
    if (answerIndex === correctAnswers[currentQuestion - 1]) {
      setAudioDiscriminationScore((prev) => prev + 0.2);
      setScore((prev) => prev + 0.2);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < 5) {
      setCurrentQuestion((prev) => prev + 1);
      setIsAudioPlaying(false);
      setShowAnswers(false);
      setTimer(3);
      setAudioPlayedCount(0);
    } else {
      setIsQuizCompleted(true);

      setTimeout(() => {
        onNext();
      }, 0);
    }
  };

  return (
    <>
      {isQuizCompleted ? null : (
        <div
          className="relative z-10 flex flex-col justify-center items-center"
          style={{
            backgroundImage: showAnswers
              ? `url(${backImgAnswer})`
              : `url(${backImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            height: "100vh",
            width: "100vw",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
            {!showAnswers && (
              <div
                className="bg-gradient-to-r from-blue-300/80 via-green-300/80 to-purple-300/80 
                  p-8 rounded-[2rem] shadow-md w-[420px] h-[120px] relative border-8 border-blue-800 
                  flex flex-col justify-center items-center mt-[-40px]"
              >
                <img
                  src={img32}
                  alt="Butterfly 1"
                  className="absolute top-[30px] right-[30px] w-[50px] h-auto animate-butterfly"
                  style={{ animationDelay: "0.5s" }}
                />
                <img
                  src={img31}
                  alt="Butterfly 2"
                  className="absolute top-[10px] left-[-20px] w-[105px] h-auto animate-butterfly"
                  style={{ animationDelay: "0s" }}
                />
                <h1 className="text-4xl md:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-pink-500 via-blue-500 to-red-500 bg-clip-text text-transparent">
                  අවධානයෙන් සවන් දෙන්න
                </h1>
              </div>
            )}

            {!showAnswers && (
              <>
                {!isAudioPlaying && (
                  <button
                    onClick={handleStartAudio}
                    className="mt-6 bg-gradient-to-r from-green-500 to-blue-500 text-white text-4xl w-32 h-32 rounded-full flex items-center justify-center transform transition-all hover:scale-110"
                  >
                    <FaPlay className="m-auto" />
                  </button>
                )}

                {isAudioPlaying && (
                  <button
                    disabled
                    className="mt-6 bg-gradient-to-r from-green-500 to-blue-500 text-white text-2xl w-32 h-32 rounded-full flex items-center justify-center"
                  >
                    <FaPlay className="m-auto" />
                  </button>
                )}
              </>
            )}

            {showAnswers && (
              <>
                <div
                  className={`bg-gray-800 bg-opacity-70 p-4 border-4 border-white rounded-[3rem] mb-6 w-full max-w-5xl mx-auto ${
                    [4, 5].includes(currentQuestion)
                      ? "min-h-[400px]"
                      : "min-h-[300px]"
                  }`}
                >
                  <h2 className="text-4xl font-semibold mb-9 text-white text-center">
                    නිවැරදි පිළිතුර තෝරන්න
                  </h2>

                  <table className="w-full text-lg border-separate border-spacing-4">
                    <tbody>
                      {answers[currentQuestion - 1].map((answer, index) => {
                        if (index % 2 === 0) {
                          return (
                            <tr key={index}>
                              <td className="p-3 text-center">
                                <button
                                  onClick={() => handleAnswerClick(index)}
                                  className="bg-gradient-to-r from-green-700 to-blue-500 text-white px-6 py-4 rounded-xl text-xl shadow-lg hover:scale-110 transition-transform flex items-center justify-start w-full"
                                  style={{
                                    height: [4, 5].includes(currentQuestion)
                                      ? "100px"
                                      : "70px",
                                  }}
                                >
                                  <strong className="ml-4 text-left w-full">
                                    {answer}
                                  </strong>
                                </button>
                              </td>

                              {answers[currentQuestion - 1][index + 1] && (
                                <td className="p-3 text-center">
                                  <button
                                    onClick={() => handleAnswerClick(index + 1)}
                                    className="bg-gradient-to-r from-green-700 to-blue-500 text-white px-6 py-4 rounded-xl text-xl shadow-lg hover:scale-110 transition-transform flex items-center justify-start w-full"
                                    style={{
                                      height: [4, 5].includes(currentQuestion)
                                        ? "100px"
                                        : "70px",
                                    }}
                                  >
                                    <strong className="ml-4 text-left w-full">
                                      {answers[currentQuestion - 1][index + 1]}
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
                <div className="text-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-600 px-6 py-3 rounded-md shadow-lg mt-4">
                  ⏳ කාලය: {timer} තත්පර
                </div>
              </>
            )}
            <style>
              {`
                @keyframes butterflyWings {
                  0%, 100% { transform: scale(1) rotate(0deg); }
                  25% { transform: scale(1.1) rotate(-2deg); }
                  50% { transform: scale(1) rotate(0deg); }
                  75% { transform: scale(1.1) rotate(2deg); }
                }
                .animate-butterfly {
                  animation: butterflyWings 0.8s infinite ease-in-out;
                }
              `}
            </style>
          </div>
        </div>
      )}
    </>
  );
};

export default AudioMeasurementActivity;

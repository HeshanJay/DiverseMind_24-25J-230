import React, { useState, useEffect ,useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import img2 from "../../../../assets/WM_Interventions_images/img2.jpg";
import img3 from "../../../../assets/WM_Interventions_images/img3.jpg";
import img10 from "../../../../assets/WM_Interventions_images/img10.jpg";
import img13 from "../../../../assets/WM_Interventions_images/img13.jpg";
import img14 from "../../../../assets/WM_Interventions_images/img14.jpg";
import sea_back1 from "../../../../assets/WM_Interventions_images/L1_images/sea_back1.png";
import sea_back2 from "../../../../assets/WM_Interventions_images/L1_images/sea_back2.png";
import shell2 from "../../../../assets/WM_Interventions_images/L1_images/shell2.png";
import pearl2 from "../../../../assets/WM_Interventions_images/L1_images/pearl2.png";
import pearl3 from "../../../../assets/WM_Interventions_images/L1_images/pearl3.png";
import fish1 from "../../../../assets/WM_Interventions_images/L1_images/fish1.png";
import fish3 from "../../../../assets/WM_Interventions_images/L1_images/fish3.png";
import fish5 from "../../../../assets/WM_Interventions_images/L1_images/fish5.png";
import fish6 from "../../../../assets/WM_Interventions_images/L1_images/fish6.png";
import fish4 from "../../../../assets/WM_Interventions_images/L1_images/fish4.png";
import crab1 from "../../../../assets/WM_Interventions_images/L1_images/crab1.png";
import crab3 from "../../../../assets/WM_Interventions_images/L1_images/crab3.png";
import G1_L1_Feedback from "../../../../Components/MemoryComponents/WM_Game1Components/Level1/G1_L1_Feedback";
import correctSound from "../../../../assets/Audios/correct_answer.mp3";
import wrongSound from "../../../../assets/Audios/wrong_answer.mp3";
import timerSound from "../../../../assets/Audios/timer_sound.mp3";

const Activity = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showImage, setShowImage] = useState(true);
  const [timeLeft, setTimeLeft] = useState(3);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const correctAudio = useRef(new Audio(correctSound));
  const wrongAudio = useRef(new Audio(wrongSound));
  const timerAudio = useRef(new Audio(timerSound));

  useEffect(() => {
    setShowImage(true);
    setTimeLeft(20);
    setSelectedAnswer(null);
    setShowCelebration(false);
  }, [currentQuestion]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowImage(false);
    }
  }, [timeLeft]);
  
    useEffect(() => {
    if (showImage) {
   timerAudio.current.loop = true;
   timerAudio.current.currentTime = 0;
 timerAudio.current.play().catch(() => {});
 } else {
    timerAudio.current.pause();
    timerAudio.current.currentTime = 0;
 }
}, [showImage]);

  const questionData = {
    1: {
      image: img2,
      answers: [
        { text: "1. ළමයි දෙදෙනෙක් කැෂියර් එකේ හිටගෙන සිටි.", isCorrect: false },
        {
          text: "2. ගැහැණු ළමයින් දෙදෙනෙක් වෙළඳසැලක අයිස්ක්‍රීම් මිලදී ගනිමින් සිටි.",
          isCorrect: true,
        },
        {
          text: "3. ගැහැණු ළමයින් දෙදෙනෙක් සාප්පු සවාරියේ යෙදෙති.",
          isCorrect: false,
        },
        {
          text: "4. ගැහැණු ළමයා සහ පිරිමි ළමයා අයිස්ක්‍රීම් කමින් සිටි.",
          isCorrect: false,
        },
      ],
    },
    2: {
      image: img3,
      answers: [
        {
          text: "1. ආච්චි, මව සහ දරුවන් දෙදෙනෙකු මුළුතැන්ගෙයි ආහාර ගනිමින් සිටි.",
          isCorrect: false,
        },
        {
          text: "2. මව කෑම පිළියෙළ කරන අතර, ආච්චි සහ දරුවන් ආහාර ගනිමින් සිටි.",
          isCorrect: true,
        },
        {
          text: "3. අම්මයි තාත්තයි දරුවන් සමඟ සංවාදයක යෙදෙති.",
          isCorrect: false,
        },
        {
          text: "4. මව කෑම පිළියෙළ කරන අතර, ආච්චි සහ දරුවන් සංවාදයක යෙදෙති.",
          isCorrect: false,
        },
      ],
    },
    3: {
      images: [img10],
      answers: [
        {
          text: "1. දූෂිත පරිසරය දැක දරුවන් කම්පනයට පත් වෙයි.",
          isCorrect: true,
        },
        { text: "2. ළමයින් පරිසරය දෙස පුදුම වී බලා සිටියි.", isCorrect: false },
        { text: "3. ගඟක ළමයින් සතුටින් සෙල්ලම් කළහ.", isCorrect: false },
        {
          text: "4. දූෂිත ප්ලාස්ටික් දැක දරුවන් කම්පනයට පත් වෙයි.",
          isCorrect: false,
        },
      ],
    },
    4: {
      images: [img14],
      answers: [
        { text: "1. හිස් ගොවිපලක වගාවන් හෝ සතුන් නොපෙනේ.", isCorrect: false },
        {
          text: "2. ප්‍රීතිමත් ගොවියෙක් නැවුම් එළවළු අතැතිව ගොවිපලේ වැඩ කරයි.",
          isCorrect: true,
        },
        { text: "3. සරු වගා බිමක එළවළු සරුවට සිටවා ඇත.", isCorrect: false },
        { text: "4. සරු වග බිමට සතුන් හානී සිදු කර ඇත.", isCorrect: false },
      ],
    },
    5: {
      images: [img13],
      answers: [
        { text: "1. විනෝද උද්‍යානය අමුත්තන් නොමැතිව හිස්ය.", isCorrect: false },
        {
          text: "2. පවුල් සාමකාමී උද්‍යානයක විනෝද චාරිකාවක් පවත්වයි.",
          isCorrect: false,
        },
        {
          text: "3. සැණකෙළිය සවාරි, ආහාර කඩ සහ ක්‍රීඩා රසවිඳින මිනිසුන්ගෙන් පිරී ඇත.",
          isCorrect: true,
        },
        {
          text: "4. විනෝද උද්‍යානය රසවිඳින මිනිසුන්ගෙන් පිරී ඇත.",
          isCorrect: false,
        },
      ],
    },
  };

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
    const isCorrect = questionData[currentQuestion].answers[index].isCorrect;
    if (isCorrect) {
      // play correct sound
      correctAudio.current.currentTime = 0;
      correctAudio.current.play().catch((e) => console.warn(e));
      setScore((prevScore) => prevScore + 5);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    } else {
      // play wrong sound
      wrongAudio.current.currentTime = 0;
      wrongAudio.current.play().catch((e) => console.warn(e));
    }
  };

  const handleNext = () => {
    if (currentQuestion < 5) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowFeedback(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(1);
    setShowImage(true);
    setTimeLeft(3);
    setSelectedAnswer(null);
    setShowCelebration(false);
    setScore(0);
    setShowFeedback(false);
  };

  if (showFeedback) {
    return (
      <G1_L1_Feedback
        score={score}
        totalQuestions={5}
        handleRetry={handleRetry}
      />
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center p-4 relative"
      style={{ backgroundImage: `url(${showImage ? sea_back1 : sea_back2})` }}
    >
      {/* Image Display Page */}
      {showImage && (
        <div className="text-center">
          {questionData[currentQuestion].images ? (
            <div className="flex justify-center space-x-4">
              {questionData[currentQuestion].images.map((imgSrc, i) => (
                <img
                  key={i}
                  src={imgSrc}
                  alt={`Memory Activity ${i + 1}`}
                  className="w-96 h-96 object-cover rounded-lg shadow-lg border-4 border-white"
                />
              ))}
            </div>
          ) : (
            <img
              src={questionData[currentQuestion].image}
              alt="Memory Activity"
              className="w-96 h-96 object-cover rounded-lg shadow-lg border-4 border-white"
            />
          )}
          {/* Timer Button with Reduced Width */}
          <div className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-600 px-6 py-3 rounded-md shadow-lg mt-10 w-72 mx-auto">
            ⏳ කාලය: {timeLeft} තත්පර
          </div>
        </div>
      )}

      {/* Answer Display Page with Shells */}
      {!showImage && (
        <div className="w-full max-w-5xl p-4 text-center relative">
          {/* Title Container */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/60 backdrop-blur-sm rounded-lg shadow-md py-2 px-8 z-10">
            <p className="text-blue-900 text-4xl font-bold drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)]">
              නිවැරදි පිළිතුර තෝරන්න
            </p>
          </div>
          {/* Fish and Crab Images */}
          <img
            src={fish1}
            alt="Fish 1"
            className="absolute top-[-70px] left-10 w-24 h-24 animate-fish1"
          />
          <img
            src={fish3}
            alt="Fish 3"
            className="absolute bottom-[-70px] left-[280px] w-28 h-28"
          />
          <img
            src={fish4}
            alt="Fish 4"
            className="absolute bottom-[-150px] left-[160px] w-20 h-28 animate-fish4"
          />
          <img
            src={fish5}
            alt="Fish 5"
            className="absolute top-[60px] left-60 w-30 h-20 animate-fish5"
          />
          <img
            src={fish6}
            alt="Fish 6"
            className="absolute bottom-[350px] right-[400px] w-30 h-40 animate-fish6"
          />
          <img
            src={crab1}
            alt="Crab 1"
            className="absolute top-[390px] right-[250px] w-[100px] h-[100px]"
          />
          <img
            src={crab3}
            alt="Crab 3"
            className="absolute bottom-[310px] right-[120px] w-[100px] h-[50px]"
          />

          {/* Shell Container - Moved lower */}
          <div className="flex flex-wrap justify-center gap-8 pt-24">
            {questionData[currentQuestion].answers.map((answer, index) => (
              <div
                key={index}
                className={`relative cursor-pointer group ${
                  selectedAnswer !== null ? "pointer-events-none" : ""
                }`}
                onClick={() => {
                  if (selectedAnswer === null) {
                    handleAnswerClick(index);
                  }
                }}
              >
                <div
                  className={`relative w-56 h-56 transition-all duration-300 ${
                    selectedAnswer === index
                      ? "scale-110 rotate-6"
                      : "hover:scale-105 hover:rotate-3"
                  }`}
                >
                  {/* Always show shell */}
                  <img
                    src={shell2}
                    alt="Shell"
                    className="w-full h-full object-contain drop-shadow-lg"
                  />

                  {/* Show pearl only for correct selected answer */}
                  {selectedAnswer === index && answer.isCorrect && (
                    <img
                      src={pearl2}
                      alt="Pearl"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2"
                    />
                  )}

                  {/* Show text only when not selected */}
                  {selectedAnswer !== index && (
                    <div className="absolute top-7 left-0 right-0 h-1/3 flex items-start justify-center pt-2 text-blue-900">
                      <span className="text-[21px] font-bold break-words max-w-[80%] mx-auto px-2 leading-tight whitespace-pre-line">
                        {answer.text}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Button */}
      {!showImage && (
        <button
          onClick={() => selectedAnswer !== null && handleNext()}
          className={`absolute bottom-8 right-8 p-5 rounded-full shadow-lg transition ${
            selectedAnswer !== null
              ? "bg-gradient-to-r from-teal-400 to-cyan-500 text-white hover:from-teal-500 hover:to-cyan-600"
              : "bg-gradient-to-r from-gray-100 to-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={selectedAnswer === null}
        >
          <FaArrowRight size={28} />
        </button>
      )}

      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">
          {/* Fireworks Background */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(24)].map((_, i) => (
              <div key={i} className={`firework firework-${i + 1}`}></div>
            ))}
          </div>

          {/* Celebration Content */}
          <div className="relative z-10 flex flex-col items-center animate-bounce">
            <h1 className="relative z-10 text-6xl font-bold mb-[30px] animate-fadeIn bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              ඔබේ පිළිතුර නිවැරදියි. සුභ පැතුම්
            </h1>

            {/* Pearl Image at Bottom */}
            <div className="mt-8">
              <img
                src={pearl3}
                alt="Celebration Pearl"
                className="w-[350px] h-[350px] animate-pulse"
              />
            </div>
          </div>
          {/* Fireworks Styles */}
          <style jsx>{`
            @keyframes firework {
              0% {
                transform: scale(0) translate(0, 0);
                opacity: 1;
              }
              80% {
                opacity: 1;
              }
              100% {
                transform: scale(1.5) translate(var(--tx), var(--ty));
                opacity: 0;
              }
            }
            .firework {
              position: absolute;
              width: 6px;
              height: 6px;
              border-radius: 50%;
              animation: firework 1.5s ease-out infinite;
            }
            .firework-1 {
              top: 5%;
              left: 10%;
              --tx: -60px;
              --ty: -80px;
              animation-delay: 0.2s;
              background-color: #ff4d4d;
            }
            .firework-2 {
              top: 15%;
              left: 80%;
              --tx: 70px;
              --ty: -60px;
              animation-delay: 0.4s;
              background-color: #ffdb4d;
            }
            .firework-3 {
              top: 30%;
              left: 30%;
              --tx: -80px;
              --ty: 60px;
              animation-delay: 0.6s;
              background-color: #4dff4d;
            }
            .firework-4 {
              top: 45%;
              left: 90%;
              --tx: 60px;
              --ty: -80px;
              animation-delay: 0.8s;
              background-color: #4dd2ff;
            }
            .firework-5 {
              top: 60%;
              left: 20%;
              --tx: -70px;
              --ty: 70px;
              animation-delay: 1s;
              background-color: #b84d4f;
            }
            .firework-6 {
              top: 70%;
              left: 50%;
              --tx: 50px;
              --ty: 50px;
              animation-delay: 1.2s;
              background-color: #ff4dff;
            }
            .firework-7 {
              top: 80%;
              left: 10%;
              --tx: -50px;
              --ty: 50px;
              animation-delay: 1.4s;
              background-color: #4dffdb;
            }
            .firework-8 {
              top: 10%;
              left: 50%;
              --tx: 70px;
              --ty: -70px;
              animation-delay: 1.6s;
              background-color: #ffa64d;
            }
            .firework-9 {
              top: 25%;
              left: 25%;
              --tx: -60px;
              --ty: -60px;
              animation-delay: 1.8s;
              background-color: #66ccff;
            }
            .firework-10 {
              top: 55%;
              left: 75%;
              --tx: 60px;
              --ty: 60px;
              animation-delay: 2s;
              background-color: #ff66cc;
            }
            .firework-11 {
              top: 35%;
              left: 65%;
              --tx: 40px;
              --ty: -40px;
              animation-delay: 2.2s;
              background-color: #ffff66;
            }
            .firework-12 {
              top: 65%;
              left: 35%;
              --tx: -40px;
              --ty: 40px;
              animation-delay: 2.4s;
              background-color: #66ff66;
            }
            .firework-13 {
              top: 8%;
              left: 40%;
              --tx: 50px;
              --ty: -50px;
              animation-delay: 0.3s;
              background-color: #ff7f50;
            }
            .firework-14 {
              top: 20%;
              left: 20%;
              --tx: -50px;
              --ty: -50px;
              animation-delay: 0.5s;
              background-color: #ff69b4;
            }
            .firework-15 {
              top: 32%;
              left: 80%;
              --tx: 60px;
              --ty: -40px;
              animation-delay: 0.7s;
              background-color: #ba55d3;
            }
            .firework-16 {
              top: 50%;
              left: 10%;
              --tx: -60px;
              --ty: 60px;
              animation-delay: 0.9s;
              background-color: #87cefa;
            }
            .firework-17 {
              top: 62%;
              left: 70%;
              --tx: 40px;
              --ty: 40px;
              animation-delay: 1.1s;
              background-color: #32cd32;
            }
            .firework-18 {
              top: 74%;
              left: 30%;
              --tx: -40px;
              --ty: 60px;
              animation-delay: 1.3s;
              background-color: #ff4500;
            }
            .firework-19 {
              top: 85%;
              left: 50%;
              --tx: 50px;
              --ty: -50px;
              animation-delay: 1.5s;
              background-color: #1e90ff;
            }
            .firework-20 {
              top: 15%;
              left: 50%;
              --tx: 30px;
              --ty: -70px;
              animation-delay: 1.7s;
              background-color: #daa520;
            }
            .firework-21 {
              top: 40%;
              left: 40%;
              --tx: -30px;
              --ty: 30px;
              animation-delay: 1.9s;
              background-color: #ff1493;
            }
            .firework-22 {
              top: 55%;
              left: 60%;
              --tx: 30px;
              --ty: 30px;
              animation-delay: 2.1s;
              background-color: #00fa9a;
            }
            .firework-23 {
              top: 68%;
              left: 80%;
              --tx: 40px;
              --ty: -30px;
              animation-delay: 2.3s;
              background-color: #8a2be2;
            }
            .firework-24 {
              top: 80%;
              left: 20%;
              --tx: -40px;
              --ty: 30px;
              animation-delay: 2.5s;
              background-color: #ff6347;
            }
          `}</style>
        </div>
      )}

      {/* Fish Animations */}
      <style jsx>{`
        @keyframes fish1 {
          0% {
            transform: translateX(0) scaleX(1);
          }
          50% {
            transform: translateX(100px) scaleX(1);
          }
          51% {
            transform: translateX(100px) scaleX(-1);
          }
          100% {
            transform: translateX(0) scaleX(-1);
          }
        }
        @keyframes fish4 {
          0% {
            transform: translateX(0) scaleX(1);
          }
          50% {
            transform: translateX(400px) scaleX(1);
          } /* Increased distance */
          51% {
            transform: translateX(400px) scaleX(-1);
          } /* Increased distance */
          100% {
            transform: translateX(0) scaleX(-1);
          }
        }
        @keyframes fish5 {
          0% {
            transform: translateX(0) scaleX(1);
          }
          50% {
            transform: translateX(150px) scaleX(1);
          }
          51% {
            transform: translateX(150px) scaleX(-1);
          }
          100% {
            transform: translateX(0) scaleX(-1);
          }
        }
        @keyframes fish6 {
          0% {
            transform: translateX(0) scaleX(1);
          }
          50% {
            transform: translateX(120px) scaleX(1);
          }
          51% {
            transform: translateX(120px) scaleX(-1);
          }
          100% {
            transform: translateX(0) scaleX(-1);
          }
        }
        @keyframes flapFins {
          0% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(10deg);
          } /* Flap fins outward */
          50% {
            transform: rotate(0deg);
          } /* Return to normal */
          75% {
            transform: rotate(-10deg);
          } /* Flap fins inward */
          100% {
            transform: rotate(0deg);
          } /* Return to normal */
        }
        .animate-fish1 {
          animation: fish1 4s linear infinite;
        }
        .animate-fish4 {
          animation: fish4 10s linear infinite; /* Slower movement */
        }
        .animate-fish5 {
          animation: fish5 5s linear infinite;
        }
        .animate-fish6 {
          animation: fish6 6s linear infinite;
        }
        .animate-flapFins {
          animation: flapFins 0.5s ease-in-out infinite; /* Fin flapping animation */
        }
      `}</style>
    </div>
  );
};

export default Activity;

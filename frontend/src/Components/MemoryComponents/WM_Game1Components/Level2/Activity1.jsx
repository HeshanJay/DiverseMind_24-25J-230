import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import img1 from "../../../../assets/WM_Interventions_images/Activity_images/img1.png";
import img19 from "../../../../assets/WM_Interventions_images/Activity_images/img19.png";
import img3 from "../../../../assets/WM_Interventions_images/Activity_images/img3.png";
import img4 from "../../../../assets/WM_Interventions_images/Activity_images/img4.png";
import img5 from "../../../../assets/WM_Interventions_images/Activity_images/img5.png";
import img6 from "../../../../assets/WM_Interventions_images/Activity_images/img6.png";
import img7 from "../../../../assets/WM_Interventions_images/Activity_images/img7.png";
import img8 from "../../../../assets/WM_Interventions_images/Activity_images/img8.png";
import img9 from "../../../../assets/WM_Interventions_images/Activity_images/img9.jpg";
import img17 from "../../../../assets/WM_Interventions_images/Activity_images/img17.png";
import img15 from "../../../../assets/WM_Interventions_images/img15.jpg";
import img16 from "../../../../assets/WM_Interventions_images/img16.jpg";
import img20 from "../../../../assets/WM_Interventions_images/Activity_images/img20.png";
import img21 from "../../../../assets/WM_Interventions_images/Activity_images/img21.png";
import img23 from "../../../../assets/WM_Interventions_images/Activity_images/img23.png";
import img24 from "../../../../assets/WM_Interventions_images/Activity_images/img24.png";
import img25 from "../../../../assets/WM_Interventions_images/Activity_images/img25.png";
import img27 from "../../../../assets/WM_Interventions_images/Activity_images/img27.png";
import img28 from "../../../../assets/WM_Interventions_images/Activity_images/img28.png";
import img29 from "../../../../assets/WM_Interventions_images/Activity_images/img29.png";
import img30 from "../../../../assets/WM_Interventions_images/Activity_images/img30.png";
import img31 from "../../../../assets/WM_Interventions_images/Activity_images/img31.png";
import img32 from "../../../../assets/WM_Interventions_images/Activity_images/img32.png";
import img33 from "../../../../assets/WM_Interventions_images/Activity_images/img33.png";
import img34 from "../../../../assets/WM_Interventions_images/Activity_images/img34.png";
import img22 from "../../../../assets/WM_Interventions_images/Activity_images/img22.png";
import img26 from "../../../../assets/WM_Interventions_images/Activity_images/img26.png";
import img35 from "../../../../assets/WM_Interventions_images/Activity_images/img35.png";
import sea_back5 from "../../../../assets/WM_Interventions_images/L1_images/sea_back5.jpg";
import sea_back7 from "../../../../assets/WM_Interventions_images/L1_images/sea_back7.png";
import G1_L2_Feedback from "../../../../Components/MemoryComponents/WM_Game1Components/Level2/G1_L2_Feedback";
import timerSound from "../../../../assets/Audios/timer_sound.mp3";
import correctSound from "../../../../assets/Audios/correct_answer.mp3";
import wrongSound from "../../../../assets/Audios/wrong_answer.mp3";

const questions = [
  {
    questionText: "1. පියාසර කළ හැකි සතුන් තෝරන්න",
    questionImages: [img15, img16],
    answerImages: [img1, img19, img3, img4, img5, img6, img7, img8],
    correctIndices: [1, 2, 3, 4],
  },
  {
    questionText: "2. පාද සහිත සතුන්",
    questionImages: [],
    answerImages: [img20, img21, img23, img24, img25, img27, img28, img29],
    correctIndices: [0, 1, 2, 3, 4],
  },
  {
    questionText: "3. පාද රහිත සතුන්",
    questionImages: [],
    answerImages: [img27, img28, img29, img30, img20, img21, img23, img25],
    correctIndices: [0],
  },
  {
    questionText: "4. ජල ජීවින්",
    questionImages: [],
    answerImages: [img31, img32, img33, img34, img29, img24, img23, img22],
    correctIndices: [0, 1],
  },
  {
    questionText: "5. මාංශ භක්ෂකයින්",
    questionImages: [],
    answerImages: [img32, img26, img35, img25, img24, img21, img30, img33],
    correctIndices: [0, 1, 2],
  },
];

const Activity1 = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const current = questions[currentQuestion];
  const [hasSelectedAtLeastOne, setHasSelectedAtLeastOne] = useState(false);
  const [showQuestion, setShowQuestion] = useState(true);
  const [questionTimer, setQuestionTimer] = useState(2);
  const timerAudio   = useRef(new Audio(timerSound));
  const correctAudio = useRef(new Audio(correctSound));
  const wrongAudio = useRef(new Audio(wrongSound));

  useEffect(() => {
    if (current.questionImages && current.questionImages.length > 0) {
      setShowQuestion(true);
      setQuestionTimer(2);
    } else {
      setShowQuestion(false);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (showQuestion && questionTimer > 0) {
      const timer = setTimeout(
        () => setQuestionTimer((prev) => prev - 1),
        1000
      );
      return () => clearTimeout(timer);
    } else if (showQuestion && questionTimer === 0) {
      setShowQuestion(false);
    }
  }, [questionTimer, showQuestion]);

   // play/stop looping timer sound
    useEffect(() => {
   if (showQuestion) {
     timerAudio.current.loop = true;
     timerAudio.current.currentTime = 0;
     timerAudio.current.play().catch(() => {});
  } else {
     timerAudio.current.pause();
     timerAudio.current.currentTime = 0;
    }
  }, [showQuestion]);

  const [revealed, setRevealed] = useState(
    Array(current.answerImages.length).fill(false)
  );
  const [previewActive, setPreviewActive] = useState(false);
  const [answerTimer, setAnswerTimer] = useState(null);

  useEffect(() => {
    setRevealed(Array(current.answerImages.length).fill(false));
    setAnswerTimer(null);
    setPreviewActive(false);
    setHasSelectedAtLeastOne(false);
  }, [currentQuestion, current.answerImages.length]);

  useEffect(() => {
    let timer1, timer2;
    if (!showQuestion) {
      timer1 = setTimeout(() => {
        setPreviewActive(true);
        timer2 = setTimeout(() => {
          setPreviewActive(false);
          setAnswerTimer(10);
        }, 1000);
      }, 1000);
    }
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [showQuestion, currentQuestion]);

  useEffect(() => {
    if (answerTimer !== null && !previewActive && answerTimer > 0) {
      const timerId = setTimeout(() => setAnswerTimer(answerTimer - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [answerTimer, previewActive]);

  const handleSelect = (index) => {
    if (previewActive || (answerTimer !== null && answerTimer <= 0)) return;
    if (revealed[index]) return;
  
    const isCorrect = current.correctIndices.includes(index);
  
    // play feedback sound
    if (isCorrect) {
      correctAudio.current.currentTime = 0;
      correctAudio.current.play().catch(() => {});
      setScore((prevScore) => prevScore + 2);
    } else {
      wrongAudio.current.currentTime = 0;
      wrongAudio.current.play().catch(() => {});
      // flip back the card after a short delay
      setTimeout(() => {
        setRevealed((prev) => {
          const newArr = [...prev];
          newArr[index] = false;
          return newArr;
        });
      }, 1000);
    }
    setHasSelectedAtLeastOne(true);

    setRevealed((prev) => {
      const newArr = [...prev];
      newArr[index] = true;
      return newArr;
    });

    if (current.correctIndices.includes(index)) {
      setScore((prevScore) => prevScore + 2);
    } else {
      setTimeout(() => {
        setRevealed((prev) => {
          const newArr = [...prev];
          newArr[index] = false;
          return newArr;
        });
      }, 1000);
    }
  };
  const allCorrectRevealed = current.correctIndices.every(
    (idx) => revealed[idx]
  );

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowQuestion(true);
    } else {
      setShowFeedback(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowFeedback(false);
    setShowQuestion(true);
  };

  if (showFeedback) {
    return (
      <G1_L2_Feedback
        score={score}
        totalQuestions={questions.length}
        handleRetry={handleRetry}
      />
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4 relative"
      style={{
        backgroundImage: `url(${showQuestion ? sea_back5 : sea_back7})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {showQuestion ? (
        <div className="flex flex-col items-center ">
          {current.questionImages.length > 0 && (
            <div className="flex space-x-8">
              {current.questionImages.map((qImg, idx) => (
                <img
                  key={idx}
                  src={qImg}
                  alt={`Question Part ${idx + 1}`}
                  className="w-64 h-64 object-cover rounded-lg shadow-lg border-4 border-white"
                />
              ))}
            </div>
          )}
          <div className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-600 px-6 py-3 rounded-md shadow-lg mt-10 w-70 mx-auto">
            ⏳ කාලය: {questionTimer} තත්පර
          </div>
        </div>
      ) : (
        <div className="w-full max-w-3xl relative">
          <div className="bg-black bg-opacity-60 rounded-lg p-4 mb-6 mx-auto w-[360px] mt-[-30px]">
            <h1 className="text-3xl font-bold text-center text-white border-4 border-white">
              {current.questionText}
            </h1>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {current.answerImages.map((img, index) => (
              <div
                key={index}
                className="relative cursor-pointer flip-container"
                onClick={() => handleSelect(index)}
              >
                <div
                  className={`flipper ${
                    previewActive || revealed[index] ? "revealed" : ""
                  }`}
                >
                  <div className="front">
                    <img
                      src={img}
                      alt={`Option ${index + 1}`}
                      className="w-32 h-32 object-cover rounded-lg border-4 border-gray-300"
                    />
                  </div>
                  <div className="back">
                    <img
                      src={img9}
                      alt="Hidden"
                      className="w-32 h-32 object-cover rounded-lg border-4 border-gray-300"
                    />
                  </div>
                </div>
                {revealed[index] && current.correctIndices.includes(index) && (
                  <img
                    src={img17}
                    alt="Correct!"
                    className="absolute top-0 right-0 w-10 h-10 z-10"
                  />
                )}
              </div>
            ))}
          </div>
          {answerTimer !== null && (
            <div className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-600 px-6 py-3 rounded-md shadow-lg mt-10 w-72 mx-auto">
              ⏳ කාලය: {answerTimer} තත්පර
            </div>
          )}

          {!previewActive && answerTimer !== null && (
            <button
              onClick={() => {
                if (
                  allCorrectRevealed ||
                  (answerTimer !== null && answerTimer <= 0) ||
                  hasSelectedAtLeastOne
                ) {
                  handleNext();
                }
              }}
              className={`absolute bottom-0 right-[-120px] p-4 rounded-full shadow-lg transition ${
                allCorrectRevealed ||
                (answerTimer !== null && answerTimer <= 0) ||
                hasSelectedAtLeastOne
                  ? "bg-gradient-to-r from-teal-400 to-cyan-500 text-white hover:from-teal-500 hover:to-cyan-600"
                  : "bg-gradient-to-r from-gray-100 to-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={
                !(
                  allCorrectRevealed ||
                  (answerTimer !== null && answerTimer <= 0) ||
                  hasSelectedAtLeastOne
                )
              }
            >
              <FaArrowRight size={24} />
            </button>
          )}
        </div>
      )}

      <style jsx>{`
        .flip-container {
          perspective: 1000px;
          width: 128px;
          height: 128px;
        }
        .flipper {
          transition: 0.6s;
          transform-style: preserve-3d;
          position: relative;
        }
        .front,
        .back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }
        .front {
          transform: rotateY(180deg);
        }
        .back {
          transform: rotateY(0deg);
        }
        .revealed {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default Activity1;

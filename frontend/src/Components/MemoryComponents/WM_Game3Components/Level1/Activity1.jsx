import React, { useState, useRef, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import Q2_audio from "../../../../assets/WM_Interventions_images/L3_audios/Q2_audio.mp3";
import Q1_audio from "../../../../assets/WM_Interventions_images/L3_audios/Q3_audio.mp3";
import Q3_audio from "../../../../assets/WM_Interventions_images/L3_audios/Q1_audio.mp3";
import Answer1 from "../../../../assets/WM_Interventions_images/L3_images/Answer1.jpg";
import Answer2 from "../../../../assets/WM_Interventions_images/L3_images/Answer2.jpg";
import Answer3 from "../../../../assets/WM_Interventions_images/L3_images/Answer3.jpg";
import Answer4 from "../../../../assets/WM_Interventions_images/L3_images/Answer4.jpg";
import Answer5 from "../../../../assets/WM_Interventions_images/L3_images/Answer5.jpg";
import Answer6 from "../../../../assets/WM_Interventions_images/L3_images/Answer6.jpg";
import Answer7 from "../../../../assets/WM_Interventions_images/L3_images/Answer7.jpg";
import Answer8 from "../../../../assets/WM_Interventions_images/L3_images/Answer8.jpg";
import Answer9 from "../../../../assets/WM_Interventions_images/L3_images/Answer9.jpg";
import snow1 from "../../../../assets/WM_Interventions_images/L3_images/snow1.jpg";
import penguin5 from "../../../../assets/WM_Interventions_images/L3_images/penguin5.png";
import snowball from "../../../../assets/WM_Interventions_images/L3_images/snowball.png";
import playButton from "../../../../assets/WM_Interventions_images/L3_images/play_icon.png";
import pauseIcon from "../../../../assets/WM_Interventions_images/L3_images/pause_icon.png";
import penguin_feedback from "../../../../assets/WM_Interventions_images/L3_images/penguin_feedback.png";
import penguin6 from "../../../../assets/WM_Interventions_images/L3_images/penguin6.png";
import penguin8 from "../../../../assets/WM_Interventions_images/L3_images/penguin8.png";
import penguin9 from "../../../../assets/WM_Interventions_images/L3_images/penguin9.png";
import penguin10 from "../../../../assets/WM_Interventions_images/L3_images/penguin10.png";
import correctSound from "../../../../assets/Audios/correct_answer.mp3";
import wrongSound   from "../../../../assets/Audios/wrong_answer.mp3";


function Activity1({ onNext, setTotalScore }) {
  const questions = [
    {
      audio: Q2_audio,
      answers: [
        { image: Answer1, isCorrect: false },
        { image: Answer2, isCorrect: true },
        { image: Answer3, isCorrect: false },
      ],
    },
    {
      audio: Q1_audio,
      answers: [
        { image: Answer7, isCorrect: false },
        { image: Answer8, isCorrect: true },
        { image: Answer9, isCorrect: false },
      ],
    },
    {
      audio: Q3_audio,
      answers: [
        { image: Answer4, isCorrect: false },
        { image: Answer5, isCorrect: false },
        { image: Answer6, isCorrect: true },
      ],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [score, setScore] = useState(0);
  const audioRef = useRef(null);
  const playCountRef = useRef(0);
  const correctAudio = useRef(new Audio(correctSound));
  const wrongAudio   = useRef(new Audio(wrongSound));


  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      setTotalScore(score);
      onNext();
    }
  }, [currentQuestionIndex, onNext, score, setTotalScore]);

  const handleAudioEnded = () => {
    if (playCountRef.current < 1) {
      playCountRef.current += 1;
      audioRef.current?.play();
      setAudioStarted(true);
    } else {
      setShowAnswers(true);
    }
  };

  useEffect(() => {
    if (currentQuestionIndex < questions.length) {
      setShowAnswers(false);
      setAudioStarted(false);
      setSelectedAnswer(null);
      setShowCelebration(false);
      playCountRef.current = 0;

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = currentQuestion.audio;
        audioRef.current.load();
      }
    }
  }, [currentQuestionIndex, currentQuestion?.audio]);

  const handlePlayButtonClick = () => {
    if (!audioRef.current) return;
    
    if (audioRef.current.paused) {
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
      setAudioStarted(true);
    } else {
      audioRef.current.pause();
      setAudioStarted(false);
    }
  };
  

  const handleAnswerClick = (index) => {
    if (selectedAnswer !== null) return; 
    setSelectedAnswer(index);
    

if (currentQuestion.answers[index].isCorrect) {
  correctAudio.current.currentTime = 0;
  correctAudio.current.play().catch(() => {});
} else {
  wrongAudio.current.currentTime = 0;
  wrongAudio.current.play().catch(() => {});
}

    if (currentQuestion.answers[index].isCorrect) {
      setScore(prev => prev + 4);
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    }
  };

  const moveToNextQuestion = () => {
    if (selectedAnswer === null) return; 
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  if (currentQuestionIndex >= questions.length) {
    return null;
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center p-4 overflow-hidden"
      style={{ backgroundImage: `url(${snow1})` }}
    >
      <audio 
        ref={audioRef} 
        onEnded={handleAudioEnded}
        style={{ display: "none" }}
      >
        <source src={currentQuestion.audio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {!showAnswers && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full bg-black bg-opacity-50 border-4 border-white w-[40%] mx-auto flex items-center justify-center">
          <p className="text-white text-5xl font-bold text-center">හොඳින් සවන් දෙන්න</p>
        </div>
      )}

      {!showAnswers && (
        <div className="flex flex-col items-center justify-center mt-4 space-y-3 z-30">
          <div
            className="relative w-40 h-40 rounded-full border border-white bg-transparent bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${snowball})` }}
          >
            <img
              src={audioStarted ? pauseIcon : playButton}
              alt={audioStarted ? "Pause" : "Play"}
              className="absolute inset-0 m-auto w-[125px] h-[125px] cursor-pointer z-40" 
              onClick={handlePlayButtonClick}
            />
          </div>
        </div>
      )}

      {!showAnswers && (
        <div className="absolute bottom-0 left-0 right-0 z-20 h-[400px]">
          <div className="relative h-full w-full">
            <img
              src={penguin6}
              alt="penguin6"
              className="absolute bottom-[-8px] left-[450px] w-[200px] h-auto transform transition-all"
              style={{ zIndex: 2 }}
            />
            <img
              src={penguin8}
              alt="penguin8"
              className="absolute bottom-[165px] left-[585px] w-[63px] h-auto transform transition-all"
              style={{ zIndex: 3 }}
            />
            <img
              src={penguin9}
              alt="penguin9"
              className="absolute bottom-[75px] left-[660px] w-[150px] h-auto transform transition-all"
              style={{ zIndex: 1 }}
            />
            <img
              src={penguin10}
              alt="penguin10"
              className={`absolute bottom-[110px] left-[1000px] w-[95px] h-auto transition-all`}
              style={{ zIndex: 4 }}
            />
          </div>
        </div>
      )}

      {showAnswers && (
        <div className="mt-8 text-center w-full max-w-3xl mx-auto"> 
          <div className="bg-black bg-opacity-50 p-4 rounded-2xl border-4 border-white mb-14 w-[50%] mx-auto"> 
            <p className="text-white text-4xl font-bold">නිවැරදි පිළිතුර තෝරන්න</p>
          </div>
    
          <div className="flex flex-wrap justify-center gap-8">
            {currentQuestion.answers.map((ans, index) => (
              <div
                key={index}
                className={`relative transition-all duration-300 ${
                  index === 1 ? "mt-12" : ""
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                }}
              >
           <img
  src={ans.image}
  alt={`Answer ${index + 1}`}
  className={`object-cover cursor-pointer border-4 rounded-xl shadow-xl transition-all ${
    selectedAnswer === index 
      ? currentQuestion.answers[index].isCorrect 
        ? "border-green-500 scale-105" 
        : "scale-105"
      : "border-white"
  } ${index === 1 ? "w-64 h-64" : "w-52 h-52"} ${
    selectedAnswer !== null && selectedAnswer !== index 
      ? "opacity-50 cursor-not-allowed" 
      : "hover:scale-105 hover:shadow-2xl"
  }`}
  style={{
    transform: 'translateZ(20px)',
    backfaceVisibility: 'hidden',
    ...(selectedAnswer === index 
      ? (currentQuestion.answers[index].isCorrect
          ? { boxShadow: '0 0 15px 5px green' }
          : { boxShadow: '0 0 15px 5px red' })
      : {})
  }}
  onClick={() => {
    if (selectedAnswer === null) {
      handleAnswerClick(index);
    }
  }}
/>

                <div 
                  className="absolute inset-0 rounded-xl shadow-lg"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.1) 100%)',
                    transform: 'translateZ(10px)',
                    zIndex: -1,
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAnswers && (
        <button
          className={`absolute bottom-8 right-8 p-4 rounded-full shadow-lg flex items-center justify-center transition ${
            selectedAnswer === null 
              ? "bg-gradient-to-r from-gray-400 to-gray-700 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
          }`}
          onClick={moveToNextQuestion}
          disabled={selectedAnswer === null}
        >
          <FaArrowRight className="text-white text-2xl" />
        </button>
      )}

      {!showAnswers && (
        <img
          src={penguin5}
          alt="penguin5"
          className={`absolute bottom-[-110px] left-[200px] w-[340px] transition-all ${
            audioStarted ? "animate-whispering" : ""
          }`}
        />
      )}

      {showCelebration && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(24)].map((_, i) => (
              <div key={i} className={`firework firework-${i + 1}`}></div>
            ))}
          </div>
          <h1 className="relative z-10 text-6xl font-bold mb-[30px] animate-fadeIn bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            ඔබේ පිළිතුර නිවැරදියි. සුභ පැතුම්
          </h1>
          <img
            src={penguin_feedback}
            alt="Celebration Penguin"
            className="relative z-10 w-1/4 h-auto animate-wave mt-10"
          />
        </div>
      )}

      <style>
        {`
          @keyframes whispering {
            0% { transform: rotate(-5deg) scale(1.05); }
            50% { transform: rotate(5deg) scale(1); }
            100% { transform: rotate(-5deg) scale(1.05); }
          }
          .animate-whispering {
            animation: whispering 1s infinite ease-in-out;
          }
          @keyframes wave {
            0% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
          }
          .animate-wave {
            animation: wave 1s infinite;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 1s forwards;
          }
          @keyframes firework {
            0% { transform: scale(0) translate(0, 0); opacity: 1; }
            80% { opacity: 1; }
            100% { transform: scale(1.5) translate(var(--tx), var(--ty)); opacity: 0; }
          }
          .firework {
            position: absolute;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            animation: firework 1.5s ease-out infinite;
          }
          .firework-1 { top: 5%; left: 10%; --tx: -60px; --ty: -80px; animation-delay: 0.2s; background-color: #ff4d4d; }
          .firework-2 { top: 15%; left: 80%; --tx: 70px; --ty: -60px; animation-delay: 0.4s; background-color: #ffdb4d; }
          .firework-3 { top: 30%; left: 30%; --tx: -80px; --ty: 60px; animation-delay: 0.6s; background-color: #4dff4d; }
          .firework-4 { top: 45%; left: 90%; --tx: 60px; --ty: -80px; animation-delay: 0.8s; background-color: #4dd2ff; }
          .firework-5 { top: 60%; left: 20%; --tx: -70px; --ty: 70px; animation-delay: 1s; background-color: #b84d4f; }
          .firework-6 { top: 70%; left: 50%; --tx: 50px; --ty: 50px; animation-delay: 1.2s; background-color: #ff4dff; }
          .firework-7 { top: 80%; left: 10%; --tx: -50px; --ty: 50px; animation-delay: 1.4s; background-color: #4dffdb; }
          .firework-8 { top: 10%; left: 50%; --tx: 70px; --ty: -70px; animation-delay: 1.6s; background-color: #ffa64d; }
          .firework-9 { top: 25%; left: 25%; --tx: -60px; --ty: -60px; animation-delay: 1.8s; background-color: #66ccff; }
          .firework-10 { top: 55%; left: 75%; --tx: 60px; --ty: 60px; animation-delay: 2s; background-color: #ff66cc; }
          .firework-11 { top: 35%; left: 65%; --tx: 40px; --ty: -40px; animation-delay: 2.2s; background-color: #ffff66; }
          .firework-12 { top: 65%; left: 35%; --tx: -40px; --ty: 40px; animation-delay: 2.4s; background-color: #66ff66; }
          .firework-13 { top: 8%; left: 40%; --tx: 50px; --ty: -50px; animation-delay: 0.3s; background-color: #ff7f50; }
          .firework-14 { top: 20%; left: 20%; --tx: -50px; --ty: -50px; animation-delay: 0.5s; background-color: #ff69b4; }
          .firework-15 { top: 32%; left: 80%; --tx: 60px; --ty: -40px; animation-delay: 0.7s; background-color: #ba55d3; }
          .firework-16 { top: 50%; left: 10%; --tx: -60px; --ty: 60px; animation-delay: 0.9s; background-color: #87cefa; }
          .firework-17 { top: 62%; left: 70%; --tx: 40px; --ty: 40px; animation-delay: 1.1s; background-color: #32cd32; }
          .firework-18 { top: 74%; left: 30%; --tx: -40px; --ty: 60px; animation-delay: 1.3s; background-color: #ff4500; }
          .firework-19 { top: 85%; left: 50%; --tx: 50px; --ty: -50px; animation-delay: 1.5s; background-color: #1e90ff; }
          .firework-20 { top: 15%; left: 50%; --tx: 30px; --ty: -70px; animation-delay: 1.7s; background-color: #daa520; }
          .firework-21 { top: 40%; left: 40%; --tx: -30px; --ty: 30px; animation-delay: 1.9s; background-color: #ff1493; }
          .firework-22 { top: 55%; left: 60%; --tx: 30px; --ty: 30px; animation-delay: 2.1s; background-color: #00fa9a; }
          .firework-23 { top: 68%; left: 80%; --tx: 40px; --ty: -30px; animation-delay: 2.3s; background-color: #8a2be2; }
          .firework-24 { top: 80%; left: 20%; --tx: -40px; --ty: 30px; animation-delay: 2.5s; background-color: #ff6347; }
        `}
      </style>
    </div>
  );
}

export default Activity1;

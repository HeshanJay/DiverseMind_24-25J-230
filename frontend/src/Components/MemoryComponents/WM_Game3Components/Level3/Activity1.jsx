import React, { useState, useRef, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import LastActivityAudio from "../../../../assets/WM_Interventions_images/L3_audios/Q6_audio.mp3";
import snow10 from "../../../../assets/WM_Interventions_images/L3_images/snow10.png";
import playButton from "../../../../assets/WM_Interventions_images/L3_images/play_icon.png";
import pauseIcon from "../../../../assets/WM_Interventions_images/L3_images/pause_icon.png";
import snowball from "../../../../assets/WM_Interventions_images/L3_images/snowball.png";
import snow_feedback from "../../../../assets/WM_Interventions_images/L3_images/snow_feedback.png";
import penguin_Iced from "../../../../assets/WM_Interventions_images/L3_images/penguin_Iced.png";
import owl from "../../../../assets/WM_Interventions_images/L3_images/owl.png";
import fox from "../../../../assets/WM_Interventions_images/L3_images/fox.png";
import bear from "../../../../assets/WM_Interventions_images/L3_images/bear.png";
import owl_A from "../../../../assets/WM_Interventions_images/L3_images/owl_A.png";
import fox1 from "../../../../assets/WM_Interventions_images/L3_images/fox1.png";
import Bear_A from "../../../../assets/WM_Interventions_images/L3_images/Bear_A.png";
import cold from "../../../../assets/WM_Interventions_images/L3_images/cold.png";
import penguinA_20 from "../../../../assets/WM_Interventions_images/L3_images/penguinA_20.png"; 
import rabbit_icon from "../../../../assets/WM_Interventions_images/L3_images/rabbit_icon.png";
import rabbit2 from "../../../../assets/WM_Interventions_images/L3_images/rabbit2.png";

function Activity1({ onNext }) {
  const questions = [
    {
      question: "මෙවර පාසලේ ක්‍රීඩා උත්සවයට අපි හැමෝම සහභාගී වෙමු!",
      answers: [
        { image: penguin_Iced, isCorrect: false, position: { top: "10%", left: "10%" }, text: "ගයාන් විසින් දිනුෂිට පවසයි" },
        { image: bear, isCorrect: true, position: { top: "10%", left: "30%" }, text: "ගයාන් විසින් සියලු දෙනාටමට පවසයි" },
        { image: owl, isCorrect: false, position: { top: "10%", left: "50%" }, text: "ගයාන් විසින් දිනුෂිට සහ රවිඳුට පවසයි" },
        { image: fox, isCorrect: false, position: { top: "10%", left: "70%" }, text: "සුපුන් විසින් ගයාන්ට පවසයි" },
      ]
    },
    {
      question: "නමුත් මම කිසිම ක්‍රීඩාවක් කරලා නැහැ. ඒ නිසා මම දන්නේ නැහැ!",
      answers: [
        { image: penguin_Iced, isCorrect: false, position: { top: "60%", left: "10%" }, text: "දිනුෂි විසින් සියලු දෙනාටමට පවසයි" },
        { image: bear, isCorrect: false, position: { top: "60%", left: "30%" }, text: "රවිඳු විසින් සියලු දෙනාටමට පවසයි" },
        { image: owl, isCorrect: false, position: { top: "30%", left: "50%" }, text: "දිනුෂි විසින් සුපුන්ට පවසයි" },
        { image: fox, isCorrect: true, position: { top: "30%", left: "70%" }, text: "ගයාන් විසින් දිනුෂිට පවසයි" },
      ]
    },
    {
      question: "ඔයාට අපි උදව් කරන්නම්. එන්න, අපි එක්ක පුහුණුවට!",
      answers: [
        { image: penguin_Iced, isCorrect: false, position: { top: "50%", left: "10%" }, text: "දිනුෂි විසින් රවිඳුට පවසයි" },
        { image: bear, isCorrect: false, position: { top: "50%", left: "30%" }, text: "රවිඳු විසින් දිනුෂිට පවසයි" },
        { image: owl, isCorrect: true, position: { top: "50%", left: "50%" }, text: "සුපුන් විසින් දිනුෂිට පවසයි" },
        { image: fox, isCorrect: false, position: { top: "50%", left: "70%" }, text: "රවිඳු විසින් සියලු දෙනාටමට පවසයි" },
      ]
    },
    {
      question: "ඔබ සැම නිවැරදියි. ක්‍රීඩාව සහ අධ්‍යාපනය යන දෙකම ජීවිතයට වැදගත්ය. ජයග්‍රහණය අත්‍යවශ්‍ය නොවූවත්, සහභාගී වීම වඩාත්ම වැදගත්!",
      answers: [
        { image: penguin_Iced, isCorrect: false, position: { top: "70%", left: "10%" }, text: "ගුරුතුමිය විසින් දිනුෂිට සහ රවිඳු පවසයි" },
        { image: bear, isCorrect: false, position: { top: "70%", left: "30%" }, text: "ගුරුතුමිය විසින් රවිඳු සහ සුපුන්ට පවසයි" },
        { image: owl, isCorrect: false, position: { top: "70%", left: "50%" }, text: "ගුරුතුමිය විසින් සුපුන් සහ දිනුෂිට පවසයි" },
        { image: fox, isCorrect: true, position: { top: "70%", left: "70%" }, text: "ගුරුතුමිය විසින් සියලු දෙනාටමට පවසයි" },
      ]
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [brokenIce, setBrokenIce] = useState([]);
  const [score, setScore] = useState(0);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const audioRef = useRef(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAudioEnded = () => {
    setAudioPlayed(true);
    setShowAnswers(true);
  };

  useEffect(() => {
    if (audioPlayed) {
      setShowAnswers(true);
    }
  }, [currentQuestionIndex, audioPlayed]);

  const handlePlayButtonClick = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setAudioStarted(true);
    } else {
      audioRef.current.pause();
      setAudioStarted(false);
    }
  };

  const handleAnswerClick = (index) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(index);
    setAnswerSubmitted(true);
    
    if (currentQuestion.answers[index].isCorrect) {
      setScore(prev => prev + 5);
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    }
  };

  const moveToNextQuestion = () => {
    if (!answerSubmitted) return; // Prevent moving without answer
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswerSubmitted(false);
      setBrokenIce([]);
    } else {
      onNext(score);
    }
  };

  const getCorrectImage = (image) => {
    switch (image) {
      case penguin_Iced: return penguinA_20;
      case bear: return Bear_A;
      case owl: return owl_A;
      case fox: return fox1;
      default: return cold;
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center p-4 overflow-hidden"
      style={{ backgroundImage: `url(${snow10})` }}
    >
      <audio 
        ref={audioRef} 
        onEnded={handleAudioEnded}
        style={{ display: "none" }}
      >
        <source src={LastActivityAudio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {!audioPlayed && !showAnswers && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full bg-black bg-opacity-50 border-4 border-white w-[40%] mx-auto flex items-center justify-center">
          <p className="text-white text-5xl font-bold text-center">හොඳින් සවන් දෙන්න</p>
          <img
            src={rabbit_icon}
            alt="rabbit_icon"
            className="absolute bottom-[-490px] left-[-60px] w-[230px] h-auto z-20"
          />
          <img
            src={rabbit2}
            alt="rabbit2"
            className="absolute bottom-[-490px] left-[240px] w-[230px] h-auto z-20"
          />
        </div>
      )}

      {!audioPlayed && !showAnswers && (
        <div className="flex flex-col items-center justify-center mt-[-80px] space-y-3 z-30">
          <div
            className="relative w-40 h-40 rounded-full border border-white bg-center bg-no-repeat"
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
      {showAnswers && (
  <div className="mt-4 text-center w-full max-w-4xl mx-auto px-4">
  <div className="bg-white bg-opacity-75 rounded-2xl p-6 mb-10 max-w-[700px] mx-auto">
  {/* Display the main heading */}
  <p className="text-blue text-3xl font-bold mb-4">මෙම ප්‍රකාශය කවුරුන් විසින් කවුරුන් හට පවසන ලද්දේ ද?</p>
  {/* Display the question text with quotation marks and color */}
  <p className="text-blue-800 text-2xl font-semibold">"{currentQuestion.question}"</p>
</div>
    <div className="flex justify-between space-x-4 w-full">
      {currentQuestion.answers.map((ans, index) => {
        const imageToShow = selectedAnswer === index
          ? ans.isCorrect ? getCorrectImage(ans.image) : cold
          : ans.image;

        return (
          <div
            key={index}
            className={`flex flex-col items-center justify-center 
              rounded-lg bg-white p-4 shadow-lg transition-all duration-300 cursor-pointer 
              ${
                selectedAnswer !== null && selectedAnswer !== index
                  ? "opacity-50 pointer-events-none"
                  : "hover:scale-105"
              }
              ${selectedAnswer === index ? 
                (ans.isCorrect ? "scale-110 border-4 border-blue-900" : "scale-90 border-4 border-red-500") 
                : ""}`}
            onClick={() => handleAnswerClick(index)}
            style={{
              width: '180px',
              height: '250px',
            }}
          >
            <div className="text-white text-lg font-bold bg-black bg-opacity-50 p-2 w-full text-center mb-2 rounded-t-lg">
              {ans.text}
            </div>
            <div className="flex justify-center items-center w-full h-full">
              <img
                src={imageToShow}
                alt={`Answer ${index + 1}`}
                className="object-contain w-32 h-32 rounded-lg"
              />
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}
     {/* Next button */}
     {showAnswers && (
        <button
          className={`absolute bottom-8 right-8 p-4 rounded-full shadow-lg flex items-center justify-center transition ${
            selectedAnswer === null 
              ? "bg-gradient-to-r from-gray-400 to-gray-700 cursor-not-allowed" // Grey with black gradient
              : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
          }`}
          onClick={moveToNextQuestion}
          disabled={selectedAnswer === null}
        >
          <FaArrowRight className="text-white text-2xl" />
        </button>
      )}
      {showCelebration && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(24)].map((_, i) => (
              <div key={i} className={`firework firework-${i + 1}`}></div>
            ))}
          </div>
          <h1 className="relative z-10 text-6xl font-bold mb-[-100px] animate-fadeIn bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
      ඔබේ පිළිතුර නිවැරදියි. සුභ පැතුම්
    </h1>
          <img
            src={snow_feedback}
            alt="Celebration Penguin"
            className="relative z-10 w-1/4 h-auto animate-wave mt-10"
          />
        </div>
      )}


      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 1s forwards;
          }
          @keyframes wave {
            0% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0); }
          }
          .animate-wave {
            animation: wave 1s infinite;
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
      <style jsx>{`
        .glow {
          animation: glow 1.5s infinite alternate;
        }
        @keyframes glow {
          from {
            filter: drop-shadow(0 0 5px #00ffff);
          }
          to {
            filter: drop-shadow(0 0 20px #00ffff);
          }
        }
        .shatter {
          animation: shatter 0.5s forwards;
        }
        @keyframes shatter {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2) rotate(10deg); }
          100% { transform: scale(0) rotate(45deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default Activity1;
import React, { useState, useRef, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import Q6_audio from "../../../../assets/WM_Interventions_images/L3_audios/Q6_audio.mp3";
import Q4_audio from "../../../../assets/WM_Interventions_images/L3_audios/Q4_audio.mp3";
import Q7_audio from "../../../../assets/WM_Interventions_images/L3_audios/Q7_audio.mp3";
import Q5_audio from "../../../../assets/WM_Interventions_images/L3_audios/Q5_audio.mp3";
import snow3 from "../../../../assets/WM_Interventions_images/L3_images/snow3.jpg";
import bear from "../../../../assets/WM_Interventions_images/L3_images/bear1.png";
import playButton from "../../../../assets/WM_Interventions_images/L3_images/play_icon.png";
import pauseIcon from "../../../../assets/WM_Interventions_images/L3_images/pause_icon.png";
import snowball from "../../../../assets/WM_Interventions_images/L3_images/snowball.png";
import mon1 from "../../../../assets/WM_Interventions_images/L3_images/mon1.png";  // Monster 1 image
import mon2 from "../../../../assets/WM_Interventions_images/L3_images/mon2.png";  // Monster 2 image
import mon3 from "../../../../assets/WM_Interventions_images/L3_images/mon3.png";  // Monster 3 image
import mon4 from "../../../../assets/WM_Interventions_images/L3_images/mon4.png"; 
import flowerImage from "../../../../assets/WM_Interventions_images/L3_images/flower.png"; 
import sadMonImage  from "../../../../assets/WM_Interventions_images/L3_images/sad_mon.png"; 
import snowman from "../../../../assets/WM_Interventions_images/L3_images/snowman.png";



function Activity1({ onNext }) {
  const questions = [
    {
      audio: Q6_audio,
      answers: [
        { text: "ගුවන් යානය හරිත කෙත්වතු මත පහත් ලෙස පියාසර කළේය.", isCorrect: false },
        { text: "ගුවන් යානය වලාකුළුවලට ඉහළින් නොපෙනි නැඟී ගියේය.", isCorrect: true },
        { text: "අඳුරු වලාකුළු පිටුපස ගුවන්<br>යානය අතුරුදහන් විය.", isCorrect: false },
        { text: "ගුවන් යානය<br>අහස හරහා සුමටව ලිස්සා ගියේය.", isCorrect: false }
      ]
    },
    {
      audio: Q4_audio,
      answers: [
        { text: "බේකරිය උණුසුම් චොකලට් සහ වැනිලා සුවඳින් පිරී තිබුණි.", isCorrect: false },
        { text: "බේකරිය අසලින් නැවුම් පාන් සහ කුරුඳු සුවඳක් හමයි.", isCorrect: true },
        { text: "බේකරිය චොක්ලට් සහ නැවුම්ව බේක් කරන ලද කුකීස් සුවඳයි.", isCorrect: false },
        { text: "බේකරියේ තිබුණේ බටර් සහ<br>සීනිවල මිහිරි සුවඳයි.", isCorrect: false }
      ]
    },
    {
      audio: Q7_audio,
      answers: [
        { text: "හකුරු ගල්පරවල ගැටෙන විට රළ ඝෝෂාකාරී විය.", isCorrect: false },
        { text: "නිස්කලංක වෙරළ මත රළ සුමටව පෙරළී ගියේය.", isCorrect: false },
        { text: "ගල්පර සහිත වෙරළට රළ පහර වැදී ඇත.", isCorrect: true },
        { text: "වැලි සහිත වෙරළ මත රළ සෙමෙන් විසිරී ගියේය.", isCorrect: false }
      ]
    },
    {
      audio: Q5_audio,
      answers: [
        { text: "රන්වන් හිරු සෙමෙන් ක්ෂිතිජයෙන් පහළට බැස එමින්,රෝස සහ තැඹිලි වර්ණවලින් අහස පින්තාරු කළේය.", isCorrect: true },
        { text: "රන්වන් හිරු සෙමෙන් කඳු පිටුපසින්<br>බැස, රෝස සහ තැඹිලි වර්ණවලින් අහස පින්තාරු කළේය.", isCorrect: false },
        { text: "රන්වන් හිරු සෙමෙන් ක්ෂිතිජයෙන් පහළට බැස, රෝස සහ<br>රතු වර්ණවලින්<br>අහස පින්තාරු<br>කළේය.", isCorrect: false },
        { text: "රන් හිරු<br>කඳුකරයෙන් පිටතට වියැකී ගියේ රතු<br>සහ රන්වන් ඉරි වලින් අහස<br>විහිදුවමිනි.", isCorrect: false }
      ]
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [score, setScore] = useState(0);  // Added score state
  const audioRef = useRef(null);
  const playCountRef = useRef(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAudioEnded = () => {
    if (playCountRef.current < 1) {
      playCountRef.current += 1;
      audioRef.current.play();
      setAudioStarted(true);
    } else {
      setShowAnswers(true);
    }
  };

  useEffect(() => {
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
  }, [currentQuestionIndex, currentQuestion.audio]);

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
    setSelectedAnswer(index);
    if (currentQuestion.answers[index].isCorrect) {
      setScore(prev => prev + 5);  // Increment score for correct answers
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
      }, 3000);
    }
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      onNext(score);  // Call onNext with final score when done
    }
  };

  // Increase container width only for Q5_audio question
  const containerStyle = currentQuestion.audio === Q5_audio ? { width: '80%' } : {};

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center p-4 overflow-hidden"
      style={{ backgroundImage: `url(${snow3})` }}
    >
      <audio
        ref={audioRef}
        onEnded={handleAudioEnded}
        style={{ display: "none" }}
      >
        <source src={currentQuestion.audio} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Bear image only shown during audio playback */}
      {!showAnswers && (
        <img
          src={bear}
          alt="bear"
          className="absolute bottom-[-130px] left-[190px] w-[390px] h-auto z-20"
        />
      )}

      {/* Instructions when audio is playing */}
{!showAnswers && (
  <div className="absolute top-20 px-6 py-3 bg-black text-white text-5xl font-bold bg-opacity-60 rounded-xl">
    හොඳින් සවන් දෙන්න
  </div>
)}


      {/* Audio controls (Play/Pause button) */}
      {!showAnswers && (
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

     {/* Answer selection page */}
{showAnswers && (
  <div
    className="mt-8 text-center w-full max-w-4xl mx-auto px-4"
    style={currentQuestion.audio === Q5_audio ? { width: '100%' } : {}}
  >
  <div className="flex justify-center items-center mt-[-60px] mb-6">
  <div className="bg-white bg-opacity-50 p-4 rounded-xl shadow-md">
    <p className="text-blue-900 text-4xl font-bold text-center">
      නිවැරදි පිළිතුර තෝරන්න
    </p>
  </div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentQuestion.answers.map((ans, index) => {
              const monsterImages = [mon1, mon2, mon3, mon4];
              return (
                <div
                  key={index}
                  className={`p-6 rounded-xl border-4 cursor-pointer transition-all duration-300 ${
                    selectedAnswer === index
                      ? ans.isCorrect
                        ? "border-blue-700 bg-white/20 scale-105"
                        : "border-red-500 bg-white/20 scale-105"
                      : "border-white bg-white/10 hover:scale-105"
                  } ${
                    selectedAnswer !== null && selectedAnswer !== index
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
            
            style={{
              height: '350px', // Increased height for the container in Q5_audio
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: currentQuestion.audio === Q5_audio ? '105%' : 'auto', // Apply 100% width only to Q5_audio
            }}
            onClick={() => {
              if (selectedAnswer === null) { // Ensure the user can only select once
                handleAnswerClick(index);
              }
            }}
          >
            {/* Answer text inside a rounded container */}
            <div
              className="text-white text-lg font-bold mb-2 text-center bg-black bg-opacity-50 rounded-lg p-2 flex-grow"
              dangerouslySetInnerHTML={{ __html: ans.text }}
            />
            
            {/* Monster or flower image inside container */}
<div className="flex justify-center items-center w-full h-full">
  {selectedAnswer === index ? (
    ans.isCorrect ? (
      <img
        src={flowerImage}
        alt={`Correct Answer`}
        className="object-contain w-40 h-40 rounded-lg"
      />
    ) : (
      <img
        src={sadMonImage}
        alt={`Sad Monster`}
        className="sad-mon-image object-contain w-32 h-32 rounded-lg"
      />
    )
  ) : (
    <img
      src={monsterImages[index]}
      alt={`Answer ${index + 1}`}
      className="object-contain w-32 h-32 rounded-lg"
    />
  )}
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
          className={`absolute bottom-8 right-8 p-4 rounded-full shadow-lg flex items-center space-x-2 transition ${
            selectedAnswer === null
              ? "bg-gray-400 cursor-not-allowed text-gray-200"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          onClick={moveToNextQuestion}
          disabled={selectedAnswer === null}
        >
          <span>Next</span>
          <FaArrowRight />
        </button>
      )}


      {showCelebration && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(24)].map((_, i) => (
              <div key={i} className={`firework firework-${i + 1}`}></div>
            ))}
          </div>
          <h1 className="relative z-10 text-6xl text-white font-bold mb-[-120px] animate-fadeIn">
            ඔබේ පිළිතුර නිවැරදියි. සුභ පැතුම්
          </h1>
          <img
            src={snowman}
            alt="Celebration snowman"
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

          .sad-mon-image {
           animation: shake 0.5s ease-out;
              }

     @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    50% { transform: translateX(10px); }
    75% { transform: translateX(-10px); }
    100% { transform: translateX(0); }
  }
        `}
      </style>
    </div>
  );
}

export default Activity1;
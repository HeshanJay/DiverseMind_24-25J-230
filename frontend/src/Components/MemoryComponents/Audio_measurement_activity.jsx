// import React, { useState, useEffect } from "react";
// import { FaPlay } from "react-icons/fa"; 
// import backImg from "../../assets/background_images/back7.png";
// import backImgAnswer from "../../assets/background_images/back12.jpg"; 
// import audio1 from "../../assets/Audios/1.mp3"; 
// import audio2 from "../../assets/Audios/2.mp3"; 
// import audio3 from "../../assets/Audios/3.mp3"; 
// import audio4 from "../../assets/Audios/4.mp3"; 
// import audio5 from "../../assets/Audios/5.mp3"; 
// import ScoreBoard from "../Score_board"; 
// import { useScores } from "../../context/Score_context"; 
// import { useNavigate } from "react-router-dom"; 

// const AudioMeasurementActivity = () => {
//   const {
//     visualDiscriminationScore,
//     setVisualDiscriminationScore,
//     memoryScore,
//     setMemoryScore,
//     languageVocabScore, 
//     setLanguageVocabScore,
//     audioDiscriminationScore, 
//     setAudioDiscriminationScore,
//     speedScore, 
//     setSpeedScore,
//     currentTestName, 
//     setCurrentTestName
//   } = useScores();

//   const navigate = useNavigate(); 
//   const audioFiles = [audio1, audio2, audio3, audio4, audio5]; 

  
//   const answers = [
//     [
//       "1. අමරගේ පියා පොල් කැඩුවේය.",
//       "2. නිමල්ගේ පියා පොල් කැඩුවේය.",
//       "3. අමරගේ පියා පොල් කැඩුවාය.",
//       "4. අමරගේ පියා ගල් කැඩුවේය.",
//     ],
//     [
//       "1. නිමල්ගේ මව බත් පිසුවාය.",
//       "2. නිමල්ගේ මව කිරිබත් පිසුවේය.",
//       "3. නිමලාගේ මව කිරිබත් පිසුවාය.",
//       "4. නිමල්ගේ මව කිරිබත් පිසුවාය.",
//     ],
//     [
//       "1. නිමල් අමල් සමඟ පාඩම් කරයි.",
//       "2. සුනිමල් නිමල් සමඟ පාඩම් කරයි.",
//       "3. නිමල් සුනිමල් සමඟ පාඩම් කරයි.",
//       "4. නිමල් සුනිමල් සමඟ පාඩම් කරති.",
//     ],
//     [
//       "1. නිර්මලාගේ මව විමලා වන අතර විමලාගේ මව අමලා වේ.",
//       "2. නිර්මලාගේ මව විමලා වන අතර විමලාගේ මව කමලා වේ.",
//       "3. නිර්මලාගේ මව කමලා වන අතර විමලාගේ මව විමලා වේ.",
//       "4. නිර්මලාගේ මව විමලා වන අතර අමලාගේ මව කමලා වේ.",
//     ],
//     [
//       "1. මහනුවර සිට බදුල්ල බලා ධාවනය වන දුම්රිය පස්වරු 5.30 වන විට 6 වන වේදිකාවට ළගා වනු ඇත.",
//       "2. මහනුවර සිට කොළඹ බලා ධාවනය වන දුම්රිය පස්වරු 6.30 වන විට 6 වන වේදිකාවට ළගා වනු ඇත.",
//       "3. මහනුවර සිට කොළඹ බලා ධාවනය වන දුම්රිය පස්වරු 5.30 වන විට 7 වන වේදිකාවට ළගා වනු ඇත.",
//       "4. මහනුවර සිට කොළඹ බලා ධාවනය වන දුම්රිය පස්වරු 5.30 වන විට 6 වන වේදිකාවට ළගා වනු ඇත.",
//     ],
//   ];
//   const [currentQuestion, setCurrentQuestion] = useState(1); 
//   const [isAudioPlaying, setIsAudioPlaying] = useState(false); 
//   const [showAnswers, setShowAnswers] = useState(false); 
//   const [timer, setTimer] = useState(15); 
//   const [audioPlayedCount, setAudioPlayedCount] = useState(0); 
//   const [score, setScore] = useState(0); 
//   const [isQuizCompleted, setIsQuizCompleted] = useState(false); 
//   const correctAnswers = [0, 3, 2, 1, 3];
//   const answerOptions = ["1", "2", "3", "4"];

//   const sendDataToBackend = async (data) => {
//     console.log("Data being sent to backend:", data);
  
//     try {
  
//       const response = await fetch("http://127.0.0.1:8000/working_memory_prediction/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
  
//       if (!response.ok) {
//         throw new Error(`Server Error: ${response.status}`);
//       }
  
//       const result = await response.json();
//       alert(`Backend Prediction: ${result.prediction}`);
//     } catch (error) {
//       console.error("Error sending data to backend:", error);
//       alert(`Error sending data to backend: ${error.message}`);
//     }
//   };

//   useEffect(() => {
//     if (audioPlayedCount < 2 && isAudioPlaying) {
//       const audio = new Audio(audioFiles[currentQuestion - 1]); 
//       audio.play();

//       audio.onended = () => {
//         setAudioPlayedCount((prev) => prev + 1); 
//         if (audioPlayedCount + 1 >= 2) {
//           setShowAnswers(true); 
//         }
//       };
//     }
//   }, [isAudioPlaying, currentQuestion, audioPlayedCount]);

//   // Start the audio (plays exactly 2 times)
//   const handleStartAudio = () => {
//     setIsAudioPlaying(true);
//     setShowAnswers(false); 
//     setTimer(3); 
//     setAudioPlayedCount(0); 
//   };

//   const handleAnswerClick = (answer) => {
//     if (answer === correctAnswers[currentQuestion]) {
//       setScore((prevScore) => prevScore + 1); // Update local score
//       switch (currentTestName) {
//         case "visual-test-activity":
//           setVisualDiscriminationScore((prev) => prev + 1);
//           break;
//         case "Memory Test":
//           setMemoryScore((prev) => prev + 1);
//           break;
//         case "Language Vocabulary Test":
//           setLanguageVocabScore((prev) => prev + 1);
//           break;
//         case "Audio Discrimination Test":
//           setAudioDiscriminationScore((prev) => prev + 1);
//           break;
//         case "Speed Test":
//           setSpeedScore((prev) => prev + 1);
//           break;
//         default:
//           console.warn(`Unhandled test name: ${currentTestName}`);
//       }
//     }
//     handleNextQuestion();
  
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < 4) {
//       setCurrentQuestion((prev) => prev + 1);
//       setIsAudioPlaying(false);
//       setShowAnswers(false);
//       setTimer(4);
//     } else {
//       setIsQuizCompleted(true);

//       const data = {
//       Language_vocab: languageVocabScore,
//       Memory: memoryScore,
//       Speed: speedScore,
//       Visual_discrimination: visualDiscriminationScore,
//       Audio_Discrimination: audioDiscriminationScore,
//     };


//       setTimeout(() => {
//         navigate("/language-vocab-test");
//       }, 5000);
//     }
//   };
 
//   useEffect(() => {
//     if (showAnswers) {
//       const timerId = setInterval(() => {
//         setTimer((prev) => {
//           if (prev === 1) {
//             clearInterval(timerId); 
//             if (currentQuestion < 5) {
//               setCurrentQuestion(currentQuestion + 1); 
//               setShowAnswers(false); 
//               setIsAudioPlaying(false); 
//             }
//           }
//           return prev - 1;
//         });
//       }, 1000); 
//       return () => clearInterval(timerId); 
//     }
//   }, [showAnswers]);

//   return (
//     <>
//       {isQuizCompleted ? (
//         <ScoreBoard score={score} totalQuestions={5} onRestart={() => window.location.reload()} />
//       ) : (
//         <div
//           className="relative z-10 flex flex-col justify-center items-center"
//           style={{
//             backgroundImage: showAnswers ? `url('${backImgAnswer}')` : `url('${backImg}')`, 
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//             backgroundAttachment: "fixed",
//             height: "100vh",
//             width: "100vw",
//           }}
//         >
//           {/* Overlay */}
//           <div className="absolute inset-0 bg-black bg-opacity-50"></div>

//           {/* Main Content */}
//           <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
            
//             {!isAudioPlaying && !showAnswers && (
//               <h1 className="text-4xl font-bold mb-6">අවධානයෙන් සවන් දෙන්න</h1>
//             )}

//             {isAudioPlaying && !showAnswers && (
//               <h1 className="text-4xl font-bold mb-6">අවධානයෙන් සවන් දෙන්න</h1>
//             )}

            
//             {!isAudioPlaying && !showAnswers && (
//               <button
//                 onClick={handleStartAudio}
//                 className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-4xl w-32 h-32 rounded-full flex items-center justify-center transform transition-all hover:scale-110"
//               >
//                 <FaPlay className="m-auto" />
//               </button>
//             )}

//             {isAudioPlaying && !showAnswers && (
//               <button
//                 disabled
//                 className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-4xl w-32 h-32 rounded-full flex items-center justify-center transform transition-all hover:scale-110"
//               >
//                 <FaPlay className="m-auto" />
//               </button>
//             )}

//          {/* Answer Display */}
// {showAnswers && (
//   <>
    
//     <div className="bg-gray-800 bg-opacity-70 p-4 rounded-lg mb-6 w-full max-w-5xl mx-auto">
//       <h2 className="text-3xl font-semibold mb-4 text-white text-center">
//         නිවැරදි පිළිතුර තෝරන්න
//       </h2>

//      <table className="w-full text-lg border-separate border-spacing-4">
//         <tbody>
//           {answers[currentQuestion - 1].map((answer, index) => {
//             const rowIndex = Math.floor(index / 2); 
//             const colIndex = index % 2; 

//             if (colIndex === 0) {
//               return (
//                 <tr key={rowIndex}>
//                   <td className="p-4">
//                     <button
//                       onClick={() => handleAnswerClick(index)} 
//                       className="w-72 md:w-96 py-4 rounded-lg text-xl md:text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-white hover:scale-110 transition-transform"
//                     >
//                       {answer}
//                     </button>
//                   </td>
//                   {answers[currentQuestion - 1][index + 1] && (
//                     <td className="p-4">
//                       <button
//                         onClick={() => handleAnswerClick(index + 1)} 
//                         className="w-72 md:w-96 py-4 rounded-lg text-xl md:text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-white hover:scale-110 transition-transform"
//                       >
//                         {answers[currentQuestion - 1][index + 1]}
//                       </button>
//                     </td>
//                   )}
//                 </tr>
//               );
//             }
//             return null;
//           })}
//         </tbody>
//       </table>
//     </div>

    
//     {/* Timer */}
//     {showAnswers && (
//       <div className="text-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-600 px-4 py-3 rounded-md shadow-lg mt-4">
        
//         කාලය: {timer} තත්පර
//       </div>
//     )}
//   </>
// )}


//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AudioMeasurementActivity;


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
import img31 from "../../assets/Working_Memory/img31.png"
import ScoreBoard from "../Score_board";

import { useScores } from "../../context/Score_context";

/**
 * Step #9 — Audio Measurement Activity
 */
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

  const correctAnswers = [0, 3, 2, 1, 3]; // indices of correct

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [timer, setTimer] = useState(15);
  const [audioPlayedCount, setAudioPlayedCount] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  // Plays audio up to 2 times
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
    setTimer(20);
    setAudioPlayedCount(0);
  };

  const handleAnswerClick = (answerIndex) => {
    if (answerIndex === correctAnswers[currentQuestion - 1]) {
      // increment scoreboard
      switch (currentTestName) {
        case "visual-test-activity":
          setVisualDiscriminationScore((prev) => prev + 1);
          break;
        case "Memory Test":
          setMemoryScore((prev) => prev + 1);
          break;
        case "Language Vocabulary Test":
          setLanguageVocabScore((prev) => prev + 1);
          break;
        case "Audio Discrimination Test":
          setAudioDiscriminationScore((prev) => prev + 1);
          break;
        case "Speed Test":
          setSpeedScore((prev) => prev + 1);
          break;
        default:
          console.warn(`Unhandled test name: ${currentTestName}`);
      }
      setScore((prev) => prev + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < 5) {
      setCurrentQuestion((prev) => prev + 1);
      setIsAudioPlaying(false);
      setShowAnswers(false);
      setTimer(20);
      setAudioPlayedCount(0);
    } else {
      setIsQuizCompleted(true);
    }
  };

  // If answers are showing, start a countdown
  useEffect(() => {
    if (showAnswers) {
      const timerId = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            if (currentQuestion < 5) {
              setCurrentQuestion(currentQuestion + 1);
              setShowAnswers(false);
              setIsAudioPlaying(false);
            }
            clearInterval(timerId);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [showAnswers, currentQuestion]);

  // Once quiz is completed, go to step #10 after 5s
  useEffect(() => {
    if (isQuizCompleted) {
      const t = setTimeout(() => {
        onNext();
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [isQuizCompleted, onNext]);

  const handleRestart = () => {
    setCurrentQuestion(1);
    setScore(0);
    setIsQuizCompleted(false);
    setIsAudioPlaying(false);
    setShowAnswers(false);
    setTimer(20);
    setAudioPlayedCount(0);
  };
  return (
    <>
      {isQuizCompleted ? (
        <ScoreBoard
          score={score}
          totalQuestions={5}
          onRestart={handleRestart}
        />
      ) : (
        <div
          className="relative z-10 flex flex-col justify-center items-center"
          style={{
            backgroundImage: showAnswers ? `url(${backImgAnswer})` : `url(${backImg})`,
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
            
            {/* ✅ Ensure the Container Box is ONLY Visible Before the Answer Phase */}
            {!showAnswers && (
              <div className="bg-gradient-to-r from-blue-300/80 via-green-300/80 to-purple-300/80 
                  p-8 rounded-[2rem] shadow-md w-[420px] h-[120px] relative border-8 border-blue-800 
                  flex flex-col justify-center items-center mt-[-40px]">
       {/* ✅ Butterfly Images with Animation Inside the Container */}
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
              
              {/* ✅ Gradient Styled Text Inside the Container (Always Visible) */}
              <h1 className="text-4xl md:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-pink-500 via-blue-500 to-red-500 bg-clip-text text-transparent">
                අවධානයෙන් සවන් දෙන්න
              </h1>
            </div>
          )}
  
            {/* ✅ Audio Play Button (Outside the Container) */}
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
                    className="mt-6 bg-gradient-to-r from-green-500 to-blue-500 text-white text-4xl w-32 h-32 rounded-full flex items-center justify-center"
                  >
                    <FaPlay className="m-auto" />
                  </button>
                )}
              </>
            )}
            
            {showAnswers && (
              <>
                {/* ✅ Answer Section is kept the same */}
                <div className="bg-gray-800 bg-opacity-70 p-4 border-4 border-white rounded-[3rem] mb-6 w-full max-w-5xl mx-auto">

                  <h2 className="text-3xl font-semibold mb-4 text-white text-center">
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
                                  className="w-72 md:w-96 py-4 rounded-lg text-xl md:text-2xl bg-gradient-to-r from-green-400 to-blue-500 text-white hover:scale-110 transition-transform"
                                >
                                  {answer}
                                </button>
                              </td>
  
                              {answers[currentQuestion - 1][index + 1] && (
                                <td className="p-3 text-center">
                                  <button
                                    onClick={() => handleAnswerClick(index + 1)}
                                    className="w-72 md:w-96 py-4 rounded-lg text-xl md:text-2xl bg-gradient-to-r from-green-400 to-blue-500 text-white hover:scale-110 transition-transform"
                                  >
                                    {answers[currentQuestion - 1][index + 1]}
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
                <div className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-600 px-6 py-3 rounded-md shadow-lg mt-4">
  ⏳ කාලය: {timer} තත්පර
</div>



              </>
            )}
            {/* ✅ Butterfly Animation Keyframes */}
  <style>
      {`
        @keyframes butterflyWings {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.1) rotate(-2deg);
          }
          50% {
            transform: scale(1) rotate(0deg);
          }
          75% {
            transform: scale(1.1) rotate(2deg);
          }
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
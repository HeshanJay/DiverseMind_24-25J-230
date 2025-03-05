// import React, { useState, useEffect } from "react";
// import backImg from "../../assets/background_images/back3.jpg";
// import question1Image from "../../assets/Questions2_images/1.jpg";
// import question2Image from "../../assets/Questions2_images/2.jpg";
// import question3Image from "../../assets/Questions2_images/3.jpg";
// import question4Image from "../../assets/Questions2_images/4.jpg";
// import ScoreBoard from "../Score_board";
// import { useScores } from "../../context/Score_context";
// import { useNavigate } from "react-router-dom";

// const SpeedMeasurementActivity = () => {
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
//     setCurrentTestName,
//   } = useScores();

//   const navigate = useNavigate();
//   const questions = [
//     {
//       image: question1Image,
//       answers: ["↑", "↓", "←", "→"],
//       correctAnswer: "↑",
//     },
//     {
//       image: question2Image,
//       answers: ["▢", "△", "◯", "♢"],
//       correctAnswer: "♢",
//     },
//     {
//       image: question3Image,
//       answers: ["R", "r", "A", "h"],
//       correctAnswer: "R",
//     },
//     {
//       image: question4Image,
//       answers: ["★", "✰", "⬜", "⚫"],
//       correctAnswer: "✰",
//     },
//   ];

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [showImage, setShowImage] = useState(true);
//   const [showAnswers, setShowAnswers] = useState(false);
//   const [timer, setTimer] = useState(10);
//   const [score, setScore] = useState(0);
//   const [intervalId, setIntervalId] = useState(null);
//   const [isCompleted, setIsCompleted] = useState(false);

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
//     if (showImage) {
//       const id = setInterval(() => {
//         setTimer((prevTimer) => {
//           if (prevTimer === 1) {
//             setShowImage(false);
//             setShowAnswers(true);
//             setTimer(10);
//             clearInterval(id);
//           }
//           return prevTimer - 1;
//         });
//       }, 1000);
//       return () => clearInterval(id);
//     }
//   }, [showImage]);

//   useEffect(() => {
//     if (showAnswers) {
//       const id = setInterval(() => {
//         setTimer((prevTimer) => {
//           if (prevTimer === 1) {
//             moveToNextQuestion();
//             clearInterval(id);
//           }
//           return prevTimer - 1;
//         });
//       }, 1000);
//       setIntervalId(id);
//       return () => clearInterval(id);
//     }
//   }, [showAnswers]);
  

//   const handleAnswerClick = (answer) => {
//     if (answer === questions[currentQuestion].correctAnswer) {
//       setScore((prevScore) => prevScore + 1);
  
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
//     clearInterval(intervalId);
//     moveToNextQuestion();
//   };
  

//   const moveToNextQuestion = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion((prev) => prev + 1);
//       setShowImage(true);
//       setShowAnswers(false);
//       setTimer(4);
//     } else {
//       setIsCompleted(true);

//       const data = {
//         Language_vocab: languageVocabScore,
//         Memory: memoryScore,
//         Speed: speedScore,
//         Visual_discrimination: visualDiscriminationScore,
//         Audio_Discrimination: audioDiscriminationScore,
//       };

//       setTimeout(() => {
//         navigate("/audio-test");
//       }, 5000);
//     }
//   };

//   const restartActivity = () => {
//     setCurrentQuestion(0);
//     setScore(0);
//     setShowImage(true);
//     setShowAnswers(false);
//     setTimer(4);
//     setIsCompleted(false);
//   };


//   return (
//     <div
//       className="h-screen w-full bg-cover bg-center relative"
//       style={{
//         backgroundImage: `url(${backImg})`,
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black bg-opacity-50"></div>

//       {/* Main Content */}
//       <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
//         {isCompleted ? (
//           <ScoreBoard score={score} totalQuestions={questions.length} onRestart={restartActivity} />
//         ) : (
//           <>
//             {/* Header */}
//             <h1 className="text-4xl font-bold mb-6">
//               {showAnswers
//                 ? "නිවැරදි පිළිතුර තෝරන්න" 
//                 : `ප්‍රශ්නය: ${currentQuestion + 1}/${questions.length}`} 
//             </h1>

//             {/* Image Display */}
//             {showImage && (
//               <div className="p-5 rounded-lg bg-gradient-to-r from-yellow-500 via-red-500 to-purple-500 max-w-4xl mx-auto">
//               <img
//                 src={questions[currentQuestion].image}
//                 alt={`Question ${currentQuestion + 1}`}
//                 className="w-full max-h-screen object-cover rounded-lg"
//                 style={{
//                   boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.7)", 
//                 }}
//               />
//               </div>
//             )}


//  {/* Answer Display */}
//  {showAnswers && questions[currentQuestion]?.answers?.length > 0 && (
//           <div className="overflow-x-auto p-3">
        
//           {questions[currentQuestion]?.question && (
//             <div className="bg-gray-700 text-white text-2xl font-bold text-center p-6 rounded-lg shadow-lg">
//               {questions[currentQuestion].question}
//             </div>
//           )}
        
         
//           {showAnswers && questions[currentQuestion]?.answers?.length > 0 && (
//             <table className="mt-6 w-full bg-gray-800 bg-opacity-50 rounded-lg shadow-2xl">
//               <tbody>
//                 <tr>
//                   <td className="p-4 text-left">
//                     <button
//                       onClick={() =>
//                         handleAnswerClick(questions[currentQuestion].answers[0])
//                       }
//                       className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-6 rounded-full text-4xl hover:scale-110 transition-transform shadow-lg flex items-center justify-start"
//                     >
//                       <strong className="text-2xl text-white mr-4">1.&nbsp;</strong>
//                       <span className="text-4xl">{questions[currentQuestion].answers[0]}</span>
//                     </button>
//                   </td>
//                   <td className="p-4 text-left">
//                     <button
//                       onClick={() =>
//                         handleAnswerClick(questions[currentQuestion].answers[1])
//                       }
//                       className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-6 rounded-full text-4xl hover:scale-110 transition-transform shadow-lg flex items-center justify-start"
//                     >
//                       <strong className="text-2xl text-white mr-4">2.&nbsp;</strong>
//                       <span className="text-4xl">{questions[currentQuestion].answers[1]}</span>
//                     </button>
//                   </td>
//                 </tr>
                
//                 <tr>
//                   <td className="p-4 text-left">
//                     <button
//                       onClick={() =>
//                         handleAnswerClick(questions[currentQuestion].answers[2])
//                       }
//                       className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-6 rounded-full text-4xl hover:scale-110 transition-transform shadow-lg flex items-center justify-start"
//                     >
//                       <strong className="text-2xl text-white mr-4">3.&nbsp;</strong>
//                       <span className="text-4xl">{questions[currentQuestion].answers[2]}</span>
//                     </button>
//                   </td>
//                   <td className="p-4 text-left">
//                     <button
//                       onClick={() =>
//                         handleAnswerClick(questions[currentQuestion].answers[3])
//                       }
//                       className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-6 rounded-full text-4xl hover:scale-110 transition-transform shadow-lg flex items-center justify-start"
//                     >
//                       <strong className="text-2xl text-white mr-4">4.&nbsp;</strong>
//                       <span className="text-4xl">{questions[currentQuestion].answers[3]}</span>
//                     </button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           )}
//         </div>
//         )}
// <div class="mt-6 text-xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-md shadow-lg w-48 mx-auto">
//   කාලය: {timer} තත්පර
// </div>


//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SpeedMeasurementActivity;

// import React, { useState, useEffect } from "react";
// import backImg from "../../assets/background_images/back3.jpg";
// import question1Image from "../../assets/Questions2_images/1.jpg";
// import question2Image from "../../assets/Questions2_images/2.jpg";
// import question3Image from "../../assets/Questions2_images/3.jpg";
// import question4Image from "../../assets/Questions2_images/4.jpg";
// import img34 from "../../assets/Working_Memory/img34.png"
// import img53 from "../../assets/Working_Memory/img53.png"
// import img52 from "../../assets/Working_Memory/img52.png"
// import ScoreBoard from "../Score_board";
// import { useScores } from "../../context/Score_context";

// const SpeedMeasurementActivity = ({ onNext, onBack }) => {
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
//   } = useScores();

//   const questions = [
//     {
//       image: question1Image,
//       answers: ["↑", "↓", "←", "→"],
//       correctAnswer: "↑",
//       imageWidth: "260px",
//       imageHeight: "200px",
//       imageMarginTop: "40px",
//     },
//     {
//       image: question2Image,
//       answers: ["▢", "△", "◯", "♢"],
//       correctAnswer: "♢",
//       imageWidth: "379px",
//       imageHeight: "211px",
//       imageMarginTop: "10px",
//     },
//     {
//       image: question3Image,
//       answers: ["R", "r", "A", "h"],
//       correctAnswer: "R",
//       imageWidth: "378px",
//       imageHeight: "178px",
//       imageMarginTop: "10px",
//     },
//     {
//       image: question4Image,
//       answers: ["★", "✰", "⬜", "⚫"],
//       correctAnswer: "✰",
//       imageWidth: "335px",
//       imageHeight: "140px",
//       imageMarginTop: "20px",
//     },
//   ];

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [showImage, setShowImage] = useState(true);
//   const [showAnswers, setShowAnswers] = useState(false);
//   const [timer, setTimer] = useState(3);
//   const [score, setScore] = useState(0);
//   const [isCompleted, setIsCompleted] = useState(false);

//   // Timer for showing image
//   useEffect(() => {
//     if (showImage) {
//       const id = setInterval(() => {
//         setTimer((prevTimer) => {
//           if (prevTimer === 1) {
//             setShowImage(false);
//             setShowAnswers(true);
//             setTimer(4);
//             clearInterval(id);
//           }
//           return prevTimer - 1;
//         });
//       }, 1000);
//       return () => clearInterval(id);
//     }
//   }, [showImage]);

//   // Timer for showing answers
//   useEffect(() => {
//     if (showAnswers) {
//       const id = setInterval(() => {
//         setTimer((prevTimer) => {
//           if (prevTimer === 1) {
//             moveToNextQuestion();
//             clearInterval(id);
//           }
//           return prevTimer - 1;
//         });
//       }, 1000);
//       return () => clearInterval(id);
//     }
//   }, [showAnswers]);

//   const handleAnswerClick = (answer) => {
//     if (answer === questions[currentQuestion].correctAnswer) {
//       setScore((prev) => prev + 1);
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
//     moveToNextQuestion();
//   };

//   const moveToNextQuestion = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion((prev) => prev + 1);
//       setShowImage(true);
//       setShowAnswers(false);
//       setTimer(4);
//     } else {
//       setIsCompleted(true);
//     }
//   };

//   // After finishing, go to next step after a delay
//   useEffect(() => {
//     if (isCompleted) {
//       const t = setTimeout(() => {
//         onNext();
//       }, 5000);
//       return () => clearTimeout(t);
//     }
//   }, [isCompleted, onNext]);

//   const restartActivity = () => {
//     setCurrentQuestion(0);
//     setScore(0);
//     setShowImage(true);
//     setShowAnswers(false);
//     setTimer(4);
//     setIsCompleted(false);
//   };

//   return (
//     <div
//       className="h-screen w-full bg-cover bg-center relative"
//       style={{ backgroundImage: `url(${backImg})` }}
//     >
//       <div className="absolute inset-0 bg-black bg-opacity-50"></div>

//       <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
//         {isCompleted ? (
//           <ScoreBoard
//             score={score}
//             totalQuestions={questions.length}
//             onRestart={restartActivity}
//           />
//         ) : (
//           <>

//             {showImage && (
//               <>
//                 <div className="p-8 rounded-[2rem] bg-gradient-to-r from-blue-300/80 via-green-300/80 to-purple-300/80 border-8 border-blue-800 shadow-md max-w-xl mx-auto mt-6 relative w-[600px] h-[370px] flex flex-col justify-between items-center">
//                   <div className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl font-bold rounded-2xl shadow-md">
//                     ප්‍රශ්නය: {currentQuestion + 1}/{questions.length}
//                   </div>

//                   {/* Decorative Images */}
//                   <img
//                     src={img34}
//                     alt="img34"
//                     className="absolute top-[210px] right-[450px] w-[140px] h-auto"
//                   />
//                   <img
//                     src={img52}
//                     alt="img52"
//                     className="absolute bottom-[1px] right-[15px] w-[220px] h-auto"
//                   />
//                   <img
//                     src={img53}
//                     alt="img53"
//                     className="absolute bottom-[1px] right-[230px] w-[220px] h-auto"
//                   />

// <img
//   src={questions[currentQuestion].image}
//   alt={`Question ${currentQuestion + 1}`}
//   className="object-contain rounded-lg border-8 border-white shadow-lg"
//   style={{
//     width: questions[currentQuestion].imageWidth,  
//     height: questions[currentQuestion].imageHeight,
//     marginTop: questions[currentQuestion].imageMarginTop,  // Dynamically set marginTop
//     boxShadow: "0px 10px 35px rgba(0, 0, 0, 0.8)",
//   }}
// />



//                 </div>

//                 {/* Timer Button for Question Image */}
//                 <div className="mt-6">
//                   <div className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-md shadow-lg text-center">
//                     ⏳ කාලය: {timer} තත්පර
//                   </div>
//                 </div>
//               </>
//             )}

//             {showAnswers && (
//               <div className="bg-gray-800 bg-opacity-70 p-8 rounded-[3rem] shadow-lg mb-8 max-w-7xl mx-auto border-4 border-white">


//                 <h2 className="text-3xl font-semibold mb-6 text-center text-white">
//                   නිවැරදි පිළිතුර තෝරන්න
//                 </h2>
//                 <div className="grid grid-cols-2 gap-6">
//                   {questions[currentQuestion].answers.map((answer, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleAnswerClick(answer)}
//                       className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-8 rounded-[30px] text-4xl font-bold flex items-center justify-center hover:scale-110 transition-transform shadow-md"
//                     >
//                       <span className="mr-4">{index + 1}.</span>
//                       <span>{answer}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Timer Button for Answers */}
//             {showAnswers && (
//               <div className="flex justify-center mt-4">
//                 <div className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-red-500 px-6 py-3 rounded-md shadow-lg text-center">
//                   ⏳ කාලය: {timer} තත්පර
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SpeedMeasurementActivity;


// import React, { useState, useEffect } from "react";
// import backImg from "../../assets/background_images/back3.jpg";
// import question1Image from "../../assets/Questions2_images/1.jpg";
// import question2Image from "../../assets/Questions2_images/2.jpg";
// import question3Image from "../../assets/Questions2_images/3.jpg";
// import question4Image from "../../assets/Questions2_images/4.jpg";
// import img34 from "../../assets/Working_Memory/img34.png";
// import img53 from "../../assets/Working_Memory/img53.png";
// import img52 from "../../assets/Working_Memory/img52.png";
// import { useScores } from "../../context/Score_context";

// const SpeedMeasurementActivity = ({ onNext, onBack }) => {
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
//   } = useScores();

//   const questions = [
//     {
//       image: question1Image,
//       answers: ["↑", "↓", "←", "→"],
//       correctAnswer: "↑",
//       imageWidth: "260px",
//       imageHeight: "200px",
//       imageMarginTop: "40px",
//     },
//     {
//       image: question2Image,
//       answers: ["▢", "△", "◯", "♢"],
//       correctAnswer: "♢",
//       imageWidth: "379px",
//       imageHeight: "211px",
//       imageMarginTop: "10px",
//     },
//     {
//       image: question3Image,
//       answers: ["R", "r", "A", "h"],
//       correctAnswer: "R",
//       imageWidth: "378px",
//       imageHeight: "178px",
//       imageMarginTop: "10px",
//     },
//     {
//       image: question4Image,
//       answers: ["★", "✰", "⬜", "⚫"],
//       correctAnswer: "✰",
//       imageWidth: "335px",
//       imageHeight: "140px",
//       imageMarginTop: "20px",
//     },
//   ];

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [showImage, setShowImage] = useState(true);
//   const [showAnswers, setShowAnswers] = useState(false);
//   const [timer, setTimer] = useState(3);
//   const [score, setScore] = useState(0);
//   const [isCompleted, setIsCompleted] = useState(false);

//   useEffect(() => {
//     if (showImage) {
//       const id = setInterval(() => {
//         setTimer((prevTimer) => {
//           if (prevTimer === 1) {
//             setShowImage(false);
//             setShowAnswers(true);
//             setTimer(4);
//             clearInterval(id);
//           }
//           return prevTimer - 1;
//         });
//       }, 1000);
//       return () => clearInterval(id);
//     }
//   }, [showImage]);

//   useEffect(() => {
//     if (showAnswers) {
//       const id = setInterval(() => {
//         setTimer((prevTimer) => {
//           if (prevTimer === 1) {
//             moveToNextQuestion();
//             clearInterval(id);
//           }
//           return prevTimer - 1;
//         });
//       }, 1000);
//       return () => clearInterval(id);
//     }
//   }, [showAnswers]);

//   const handleAnswerClick = (answer) => {
//     if (answer === questions[currentQuestion].correctAnswer) {
//       setScore((prev) => prev + 0.25);
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
//           setSpeedScore((prev) => prev + 0.25);
//           break;
//         default:
//           console.warn(`Unhandled test name: ${currentTestName}`);
//       }
//     }
//     moveToNextQuestion();
//   };

//   const moveToNextQuestion = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion((prev) => prev + 1);
//       setShowImage(true);
//       setShowAnswers(false);
//       setTimer(4);
//     } else {
//       setIsCompleted(true);
//       onNext();
//     }
//   };

//   return (
//     <div
//       className="h-screen w-full bg-cover bg-center relative"
//       style={{ backgroundImage: `url(${backImg})` }}
//     >
//       <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//       <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
//         {isCompleted ? null : (
//           <>
//             {showImage && (
//               <>
//                 <div className="p-8 rounded-[2rem] bg-gradient-to-r from-blue-300/80 via-green-300/80 to-purple-300/80 border-8 border-blue-800 shadow-md max-w-xl mx-auto mt-6 relative w-[600px] h-[370px] flex flex-col justify-between items-center">
//                   <div className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl font-bold rounded-2xl shadow-md">
//                     ප්‍රශ්නය: {currentQuestion + 1}/{questions.length}
//                   </div>

//                   {/* Decorative Images */}
//                   <img
//                     src={img34}
//                     alt="img34"
//                     className="absolute top-[210px] right-[450px] w-[140px] h-auto"
//                   />
//                   <img
//                     src={img52}
//                     alt="img52"
//                     className="absolute bottom-[1px] right-[15px] w-[220px] h-auto"
//                   />
//                   <img
//                     src={img53}
//                     alt="img53"
//                     className="absolute bottom-[1px] right-[230px] w-[220px] h-auto"
//                   />

//                   <img
//                     src={questions[currentQuestion].image}
//                     alt={`Question ${currentQuestion + 1}`}
//                     className="object-contain rounded-lg border-8 border-white shadow-lg"
//                     style={{
//                       width: questions[currentQuestion].imageWidth,
//                       height: questions[currentQuestion].imageHeight,
//                       marginTop: questions[currentQuestion].imageMarginTop,
//                       boxShadow: "0px 10px 35px rgba(0, 0, 0, 0.8)",
//                     }}
//                   />
//                 </div>
//                 <div className="mt-6">
//                   <div className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-md shadow-lg text-center">
//                     ⏳ කාලය: {timer} තත්පර
//                   </div>
//                 </div>
//               </>
//             )}
//             {showAnswers && (
//               <>
//                 <div className="bg-gray-800 bg-opacity-70 p-8 rounded-[3rem] shadow-lg mb-8 max-w-7xl mx-auto border-4 border-white">
//                   <h2 className="text-3xl font-semibold mb-6 text-center">
//                     නිවැරදි පිළිතුර තෝරන්න
//                   </h2>
//                   <div className="grid grid-cols-2 gap-6">
//                     {questions[currentQuestion].answers.map((answer, index) => (
//                       <button
//                         key={index}
//                         onClick={() => handleAnswerClick(answer)}
//                         className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-12 py-8 rounded-[30px] text-4xl font-bold flex items-center justify-center hover:scale-110 transition-transform shadow-md"
//                       >
//                         <span className="mr-4">{index + 1}.</span>
//                         <span>{answer}</span>
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//                 {/* Timer for Answers */}
//                 <div className="mt-6">
//                   <div className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-red-500 px-6 py-3 rounded-md shadow-lg text-center">
//                     ⏳ කාලය: {timer} තත්පර
//                   </div>
//                 </div>
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SpeedMeasurementActivity;




import React, { useState, useEffect } from "react";
import backImg from "../../assets/background_images/back3.jpg";
import question1Image from "../../assets/Questions2_images/1.jpg";
import question2Image from "../../assets/Questions2_images/2.jpg";
import question3Image from "../../assets/Questions2_images/3.jpg";
import question4Image from "../../assets/Questions2_images/4.jpg";
import img34 from "../../assets/Working_Memory/img34.png";
import img53 from "../../assets/Working_Memory/img53.png";
import img52 from "../../assets/Working_Memory/img52.png";
import { useScores } from "../../context/Score_context";

const SpeedMeasurementActivity = ({ onNext, onBack }) => {
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
      answers: ["↑", "↓", "←", "→"],
      correctAnswer: "↑",
      imageWidth: "260px",
      imageHeight: "200px",
      imageMarginTop: "40px",
    },
    {
      image: question2Image,
      answers: ["▢", "△", "◯", "♢"],
      correctAnswer: "♢",
      imageWidth: "379px",
      imageHeight: "211px",
      imageMarginTop: "10px",
    },
    {
      image: question3Image,
      answers: ["R", "r", "A", "h"],
      correctAnswer: "R",
      imageWidth: "378px",
      imageHeight: "178px",
      imageMarginTop: "10px",
    },
    {
      image: question4Image,
      answers: ["★", "✰", "⬜", "⚫"],
      correctAnswer: "✰",
      imageWidth: "335px",
      imageHeight: "140px",
      imageMarginTop: "20px",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showImage, setShowImage] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
  const [timer, setTimer] = useState(3);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (showImage) {
      const id = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            setShowImage(false);
            setShowAnswers(true);
            setTimer(4);
            clearInterval(id);
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(id);
    }
  }, [showImage]);

  const handleAnswerClick = (answer) => {
    if (answer === questions[currentQuestion].correctAnswer) {
      // For speed test, add 0.25 points per correct answer.
      setSpeedScore((prev) => prev + 0.25);
    }
    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowImage(true);
      setShowAnswers(false);
      setTimer(4);
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
        {isCompleted ? null : (
          <>
            {showImage && (
              <>
                <div className="p-8 rounded-[2rem] bg-gradient-to-r from-blue-300/80 via-green-300/80 to-purple-300/80 border-8 border-blue-800 shadow-md max-w-xl mx-auto mt-6 relative w-[600px] h-[370px] flex flex-col justify-between items-center">
                  <div className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl font-bold rounded-2xl shadow-md">
                    ප්‍රශ්නය: {currentQuestion + 1}/{questions.length}
                  </div>

                  <img
                    src={img34}
                    alt="img34"
                    className="absolute top-[210px] right-[450px] w-[140px] h-auto"
                  />
                  <img
                    src={img52}
                    alt="img52"
                    className="absolute bottom-[1px] right-[15px] w-[220px] h-auto"
                  />
                  <img
                    src={img53}
                    alt="img53"
                    className="absolute bottom-[1px] right-[230px] w-[220px] h-auto"
                  />

                  <img
                    src={questions[currentQuestion].image}
                    alt={`Question ${currentQuestion + 1}`}
                    className="object-contain rounded-lg border-8 border-white shadow-lg"
                    style={{
                      width: questions[currentQuestion].imageWidth,
                      height: questions[currentQuestion].imageHeight,
                      marginTop: questions[currentQuestion].imageMarginTop,
                      boxShadow: "0px 10px 35px rgba(0, 0, 0, 0.8)",
                    }}
                  />
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
                <div className="bg-gray-800 bg-opacity-70 p-8 rounded-[3rem] shadow-lg mb-8 max-w-7xl mx-auto border-4 border-white">
                  <h2 className="text-3xl font-semibold mb-6 text-center">
                    නිවැරදි පිළිතුර තෝරන්න
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    {questions[currentQuestion].answers.map((answer, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerClick(answer)}
                        className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-12 py-8 rounded-[30px] text-4xl font-bold flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                      >
                        <span className="mr-4">{index + 1}.</span>
                        <span>{answer}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <div className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-red-500 px-6 py-3 rounded-md shadow-lg text-center">
                    ⏳ කාලය: {timer} තත්පර
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SpeedMeasurementActivity;

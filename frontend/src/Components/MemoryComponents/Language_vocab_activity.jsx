// import React, { useState, useEffect } from "react";
// import backImg from "../../assets/background_images/back3.jpg"; 
// import trainImage from "../../assets/Questions1_images/1.jpg"; 
// import farmImage from "../../assets/Questions1_images/2.jpg"; 
// import restaurantImage from "../../assets/Questions1_images/3.jpg"; 
// import accidentImage from "../../assets/Questions1_images/4.jpg"; 
// import hospitalImage from "../../assets/Questions1_images/5.jpg"; 
// import ScoreBoard from "../Score_board";
// import { useNavigate } from "react-router-dom";  
// import { useScores } from "../../context/Score_context";

// const Language_vocab_activity = () => {
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
//   const questions = [
//     {
//       image: trainImage,
//       answers: [
//         "1. දුම්රිය ස්ථානය",
//         "2. බස් නැවතුම්පොළ",
//         "3. ගුවන් තොටුපළ",
//         "4. ව්‍යාපාරික මධ්‍යස්ථානය",
//       ],
//       correctAnswer: "1. දුම්රිය ස්ථානය",
//     },
//     {
//       image: farmImage,
//       answers: [
//         "1. ගොවිපල",
//         "2. සත්ත්තවෝද්‍යානය",
//         "3. උද්භිද්‍ උද්‍යානය ",
//         "4. සත්ත්ව ශාලාව",
//       ],
//       correctAnswer: "1. ගොවිපල",
//     },
//     {
//       image: restaurantImage,
//       answers: [
//         "1. රාජ බෝජන සංග්‍රහය ",
//         "2. රාජගීය පවුල",
//         "3. රාජකීය සංගීත ප්‍රදර්ශනය",
//         "4. රාජගීය උත්සවය",
//       ],
//       correctAnswer: "1. රාජ බෝජන සංග්‍රහය",
//     },
//     {
//       image: accidentImage,
//       answers: [
//         "1. ඉදිකිරීම්ර කටයුතු ස්ථානය",
//         "2. රිය අනතුර ",
//         "3. රෝහල ඉදිරිපිට",
//         "4. වාහන තදබදය ",
//       ],
//       correctAnswer: "2. රිය අනතුර ",
//     },
//     {
//       image: hospitalImage,
//       answers: [
//         "1. රෝහල",
//         "2. සෞඛ්‍ය මධ්‍යස්ථානය",
//         "3. රෝහල් බාහිර රෝගී අංශය",
//         "4. ආරෝග්‍ය මධ්‍යස්ථානය",
        
//       ],
//       correctAnswer: "1. රෝහල",
//     },
//   ];

//   const [currentQuestion, setCurrentQuestion] = useState(0); 
//   const [timer, setTimer] = useState(10); 
//   const [showImage, setShowImage] = useState(true); 
//   const [showAnswers, setShowAnswers] = useState(false); 
//   const [score, setScore] = useState(0); 
//   const [isCompleted, setIsCompleted] = useState(false); 

//    const sendDataToBackend = async (data) => {
//   console.log("Data being sent to backend:", data);

//   try {

//     const response = await fetch("http://127.0.0.1:8000/working_memory_prediction/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error(`Server Error: ${response.status}`);
//     }

//     const result = await response.json();
//     alert(`Backend Prediction: ${result.prediction}`);
//   } catch (error) {
//     console.error("Error sending data to backend:", error);
//     alert(`Error sending data to backend: ${error.message}`);
//   }
// };

//   useEffect(() => {
//     if (showImage) {
//       const interval = setInterval(() => {
//         setTimer((prevTimer) => {
//           if (prevTimer === 1) {
//             setShowImage(false);
//             setShowAnswers(true);
//             setTimer(10); 
//             clearInterval(interval);
//           }
//           return prevTimer - 1;
//         });
//       }, 1000);
//       return () => clearInterval(interval); 
//     }
//   }, [showImage]);

//   useEffect(() => {
//     if (showAnswers) {
//       const interval = setInterval(() => {
//         setTimer((prevTimer) => {
//           if (prevTimer === 1) {
//             handleNextQuestion();
//             clearInterval(interval);
//           }
//           return prevTimer - 1;
//         });
//       }, 1000);
//       return () => clearInterval(interval); 
//     }
//   }, [showAnswers]);

//   const handleAnswerClick = (index) => {
//     if (questions[currentQuestion].answers[index] === questions[currentQuestion].correctAnswer) {
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
//     handleNextQuestion();
//   };
  
//   const handleNextQuestion = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
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
  
//       sendDataToBackend(data);

//       setTimeout(() => {
//         navigate("/memory-tests");
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
//             {/* Question Page */}
//             {showImage && (
//               <>
//                 <h1 className="text-4xl font-bold mb-6">
//                   ප්‍රශ්නය: {currentQuestion + 1}/{questions.length}
//                 </h1>
  
//                 <div className="p-5 rounded-lg bg-gradient-to-r from-yellow-500 via-red-500 to-purple-500 max-w-2xl mx-auto flex justify-center items-center">
//                   <img
//                     src={questions[currentQuestion].image}
//                     alt={`Question ${currentQuestion + 1}`}
//                     className="w-full max-h-80 object-contain rounded-lg"
//                     style={{
//                       boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.7)",
//                     }}
//                   />
//                 </div>
//               </>
//             )}
  
//             {!showAnswers && (
//               <div className="flex justify-center mt-6 w-full">
//                 <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-md shadow-lg w-auto max-w-xs text-center">
//                   කාලය: {timer} තත්පර
//                 </div>
//               </div>
//             )}
           
// {showAnswers && (
//   <>
//     <div className="bg-gray-800 bg-opacity-70 p-4 rounded-lg shadow-lg mb-6 max-w-5xl mx-auto">
//       <h2 className="text-3xl font-semibold mb-4 text-center">
//         නිවැරදි පිළිතුර තෝරන්න
//       </h2>

//       {/* Number Choices for Selecting Answer */}
//       <table className="w-full text-lg border-separate border-spacing-3">
//         <tbody>
//           {questions[currentQuestion].answers.map((answer, index) => {
//             if (index % 2 === 0) {
//               return (
//                 <tr key={index} className="flex gap-3 justify-center">
//                   <td className="p-0 text-center">
//                     <button
//                       onClick={() => handleAnswerClick(index)}
//                       className="bg-gradient-to-r m-1 from-green-400 to-lime-600 text-white px-8 py-4 rounded-full text-2xl shadow-lg hover:scale-105 transition-transform flex items-center justify-start"
//                       style={{
//                         width: "350px", 
//                         height: "80px", 
//                       }}
//                     >
//                       <strong className="ml-4">{answer}</strong>
//                     </button>
//                   </td>
         
//                   {questions[currentQuestion].answers[index + 1] && (
//                     <td className="p-0 text-center">
//                       <button
//                         onClick={() => handleAnswerClick(index + 1)}
//                         className="bg-gradient-to-r m-1 from-green-400 to-lime-600 text-white px-8 py-4 rounded-full text-2xl shadow-lg hover:scale-105 transition-transform flex items-center justify-start"
//                         style={{
//                           width: "350px", 
//                           height: "80px", 
//                         }}
//                       >
//                         <strong className="ml-4">{questions[currentQuestion].answers[index + 1]}</strong>
//                       </button>
//                     </td>
//                   )}
//                 </tr>
//               );
//             }
//             return null; 
//     })}
//   </tbody>
// </table>
// </div>
//                 {/* Timer */}
//                 {showAnswers && (
//                   <div className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-600 px-4 py-3 rounded-md shadow-lg mt-4">
//                     කාලය: {timer} තත්පර
//                   </div>
//                 )}
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Language_vocab_activity;


// import React, { useState, useEffect } from "react";
// import backImg from "../../assets/background_images/back3.jpg"; 
// import trainImage from "../../assets/Questions1_images/1.jpg"; 
// import farmImage from "../../assets/Questions1_images/2.jpg"; 
// import restaurantImage from "../../assets/Questions1_images/3.jpg"; 
// import accidentImage from "../../assets/Questions1_images/4.jpg"; 
// import hospitalImage from "../../assets/Questions1_images/5.jpg"; 
// import ScoreBoard from "../Score_board";
// import { useScores } from "../../context/Score_context";

// const LanguageVocabActivity = ({ onNext, onBack, onFinishAll }) => {
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
//       image: trainImage,
//       answers: [
//         "1. දුම්රිය ස්ථානය",
//         "2. බස් නැවතුම්පොළ",
//         "3. ගුවන් තොටුපළ",
//         "4. ව්‍යාපාරික මධ්‍යස්ථානය",
//       ],
//       correctAnswer: "1. දුම්රිය ස්ථානය",
//     },
//     {
//       image: farmImage,
//       answers: [
//         "1. ගොවිපල",
//         "2. සත්ත්තවෝද්‍යානය",
//         "3. උද්භිද්‍ උද්‍යානය ",
//         "4. සත්ත්ව ශාලාව",
//       ],
//       correctAnswer: "1. ගොවිපල",
//     },
//     {
//       image: restaurantImage,
//       answers: [
//         "1. රාජ බෝජන සංග්‍රහය ",
//         "2. රාජගීය පවුල",
//         "3. රාජකීය සංගීත ප්‍රදර්ශනය",
//         "4. රාජගීය උත්සවය",
//       ],
//       correctAnswer: "1. රාජ බෝජන සංග්‍රහය",
//     },
//     {
//       image: accidentImage,
//       answers: [
//         "1. ඉදිකිරීම්ර කටයුතු ස්ථානය",
//         "2. රිය අනතුර ",
//         "3. රෝහල ඉදිරිපිට",
//         "4. වාහන තදබදය ",
//       ],
//       correctAnswer: "2. රිය අනතුර ",
//     },
//     {
//       image: hospitalImage,
//       answers: [
//         "1. රෝහල",
//         "2. සෞඛ්‍ය මධ්‍යස්ථානය",
//         "3. රෝහල් බාහිර රෝගී අංශය",
//         "4. ආරෝග්‍ය මධ්‍යස්ථානය",
//       ],
//       correctAnswer: "1. රෝහල",
//     },
//   ];

//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [timer, setTimer] = useState(10);
//   const [showImage, setShowImage] = useState(true);
//   const [showAnswers, setShowAnswers] = useState(false);
//   const [score, setScore] = useState(0);
//   const [isCompleted, setIsCompleted] = useState(false);

  
//   useEffect(() => {
//     if (showImage) {
//       const interval = setInterval(() => {
//         setTimer((prevTimer) => {
//           if (prevTimer === 1) {
//             setShowImage(false);
//             setShowAnswers(true);
//             setTimer(10);
//             clearInterval(interval);
//           }
//           return prevTimer - 1;
//         });
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [showImage]);

//   useEffect(() => {
//     if (showAnswers) {
//       const interval = setInterval(() => {
//         setTimer((prevTimer) => {
//           if (prevTimer === 1) {
//             handleNextQuestion();
//             clearInterval(interval);
//           }
//           return prevTimer - 1;
//         });
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [showAnswers]);

//   const handleAnswerClick = (index) => {
//     if (
//       questions[currentQuestion].answers[index] ===
//       questions[currentQuestion].correctAnswer
//     ) {
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
//     handleNextQuestion();
//   };


//   const handleNextQuestion = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion((prev) => prev + 1);
//       setShowImage(true);
//       setShowAnswers(false);
//       setTimer(4);
//     } else {
//       setIsCompleted(true);
      
//       onFinishAll(); 
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
//                 <h1 className="text-4xl font-bold mb-6">
//                   ප්‍රශ්නය: {currentQuestion + 1}/{questions.length}
//                 </h1>

//                 <div className="p-5 rounded-lg bg-gradient-to-r from-yellow-500 via-red-500 to-purple-500 max-w-2xl mx-auto flex justify-center items-center">
//                   <img
//                     src={questions[currentQuestion].image}
//                     alt={`Question ${currentQuestion + 1}`}
//                     className="w-full max-h-80 object-contain rounded-lg"
//                     style={{
//                       boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.7)",
//                     }}
//                   />
//                 </div>
//               </>
//             )}

//             {!showAnswers && (
//               <div className="flex justify-center mt-6 w-full">
//                 <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-md shadow-lg w-auto max-w-xs text-center">
//                   කාලය: {timer} තත්පර
//                 </div>
//               </div>
//             )}

//             {showAnswers && (
//               <>
//                 <div className="bg-gray-800 bg-opacity-70 p-4 rounded-lg shadow-lg mb-6 max-w-5xl mx-auto">
//                   <h2 className="text-3xl font-semibold mb-4 text-center">
//                     නිවැරදි පිළිතුර තෝරන්න
//                   </h2>

//                   <table className="w-full text-lg border-separate border-spacing-3">
//                     <tbody>
//                       {questions[currentQuestion].answers.map((answer, index) => {
//                         if (index % 2 === 0) {
//                           return (
//                             <tr key={index} className="flex gap-3 justify-center">
//                               <td className="p-0 text-center">
//                                 <button
//                                   onClick={() => handleAnswerClick(index)}
//                                   className="bg-gradient-to-r m-1 from-green-400 to-lime-600 text-white px-8 py-4 rounded-full text-2xl shadow-lg hover:scale-105 transition-transform flex items-center justify-start"
//                                   style={{
//                                     width: "350px",
//                                     height: "80px",
//                                   }}
//                                 >
//                                   <strong className="ml-4">{answer}</strong>
//                                 </button>
//                               </td>

//                               {questions[currentQuestion].answers[index + 1] && (
//                                 <td className="p-0 text-center">
//                                   <button
//                                     onClick={() => handleAnswerClick(index + 1)}
//                                     className="bg-gradient-to-r m-1 from-green-400 to-lime-600 text-white px-8 py-4 rounded-full text-2xl shadow-lg hover:scale-105 transition-transform flex items-center justify-start"
//                                     style={{
//                                       width: "350px",
//                                       height: "80px",
//                                     }}
//                                   >
//                                     <strong className="ml-4">
//                                       {questions[currentQuestion].answers[index + 1]}
//                                     </strong>
//                                   </button>
//                                 </td>
//                               )}
//                             </tr>
//                           );
//                         }
//                         return null;
//                       })}
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-600 px-4 py-3 rounded-md shadow-lg mt-4">
//                   කාලය: {timer} තත්පර
//                 </div>
//               </>
//             )}
//           </>
//         )}
      
//       </div>
//     </div>
//   );
// };

// export default LanguageVocabActivity;

import React, { useState, useEffect } from "react";
import backImg from "../../assets/background_images/back3.jpg";
import trainImage from "../../assets/Questions1_images/1.jpg";
import farmImage from "../../assets/Questions1_images/2.jpg";
import restaurantImage from "../../assets/Questions1_images/3.jpg";
import accidentImage from "../../assets/Questions1_images/4.jpg";
import hospitalImage from "../../assets/Questions1_images/5.jpg";
import ScoreBoard from "../Score_board";
import { useScores } from "../../context/Score_context";
import img41 from "../../assets/Working_Memory/img41.png"
import img42 from "../../assets/Working_Memory/img42.png"
import img43 from "../../assets/Working_Memory/img43.png"
import img44 from "../../assets/Working_Memory/img44.png"
import img48 from "../../assets/Working_Memory/img48.png"

/**
 * The final test in the sequence.
 * When finished, this component calls onFinishAll() so the parent sends data.
 */
const LanguageVocabActivity = ({ onNext, onBack, onFinishAll }) => {
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
      image: trainImage,
      width: "210px",
      height: "200px",
      marginTop: "10px",
      answers: [
        "1. දුම්රිය ස්ථානය",
        "2. බස් නැවතුම්පොළ",
        "3. ගුවන් තොටුපළ",
        "4. ව්‍යාපාරික මධ්‍යස්ථානය",
      ],
      correctAnswer: "1. දුම්රිය ස්ථානය",
    },
    {
      image: farmImage,
      width: "240px",
      height: "240px",
      marginTop: "20px",
      answers: [
        "1. ගොවිපල",
        "2. සත්ත්තවෝද්‍යානය",
        "3. උද්භිද්‍ උද්‍යානය ",
        "4. සත්ත්ව ශාලාව",
      ],
      correctAnswer: "1. ගොවිපල",
    },
    {
      image: restaurantImage,
      width: "340px",
      height: "170px",
      marginTop: "20px",
      answers: [
        "1. රාජ බෝජන සංග්‍රහය ",
        "2. රාජගීය පවුල",
        "3. රාජකීය සංගීත ප්‍රදර්ශනය",
        "4. රාජගීය උත්සවය",
      ],
      correctAnswer: "1. රාජ බෝජන සංග්‍රහය",
    },
    {
      image: accidentImage,
      width: "240px",
      height: "240px",
      marginTop: "10px",
      answers: [
        "1. ඉදිකිරීම් කටයුතු ස්ථානය",
        "2. රිය අනතුර ",
        "3. රෝහල ඉදිරිපිට",
        "4. වාහන තදබදය ",
      ],
      correctAnswer: "2. රිය අනතුර ",
    },
    {
      image: hospitalImage,
      width: "300px",
      height: "210px",
      marginTop: "10px",
      answers: [
        "1. රෝහල",
        "2. සෞඛ්‍ය මධ්‍යස්ථානය",
        "3. බාහිර රෝගී අංශය",
        "4. ආරෝග්‍ය මධ්‍යස්ථානය",
      ],
      correctAnswer: "1. රෝහල",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(10);
  const [showImage, setShowImage] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Timer logic for image
  useEffect(() => {
    if (showImage) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            setShowImage(false);
            setShowAnswers(true);
            setTimer(3);
            clearInterval(interval);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showImage]);

  // Timer logic for answers
  useEffect(() => {
    if (showAnswers) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            handleNextQuestion();
            clearInterval(interval);
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [showAnswers]);

  const handleAnswerClick = (index) => {
    if (questions[currentQuestion].answers[index] === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
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
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowImage(true);
      setShowAnswers(false);
      setTimer(15);
    } else {
      setIsCompleted(true);
      // Once completed, call onFinishAll so the parent sends data to backend.
      onFinishAll();
    }
  };

  const restartActivity = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowImage(true);
    setShowAnswers(false);
    setTimer(4);
    setIsCompleted(false);
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backImg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
        {isCompleted ? (
          <ScoreBoard score={score} totalQuestions={questions.length} onRestart={restartActivity} />
        ) : (
          <>
            {showImage && (
              <>
                {/* ✅ Updated Container Styling with Falling Golden Snowballs */}
                <div className="p-8 rounded-[2rem] bg-gradient-to-r from-blue-300/80 via-green-300/80 to-purple-300/80 
                  border-8 border-blue-800 shadow-md max-w-xl mx-auto mt-6 relative w-[600px] h-[420px] flex flex-col justify-between items-center overflow-hidden">
                  
                  {/* ✅ Falling Golden Snowballs */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(12)].map((_, index) => (
                      <div
                        key={index}
                        className="falling-snowball"
                        style={{
                          left: `${Math.random() * 100}%`,  // Random horizontal position
                          animationDelay: `${Math.random() * 3}s`,  // Random animation delay
                        }}
                      ></div>
                    ))}
                  </div>

                  {/* ✅ Question Number inside the container */}
                  <div className="absolute top-[-20px] px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 
                      text-white text-xl font-bold rounded-2xl shadow-md mt-[50px]">
                    ප්‍රශ්නය: {currentQuestion + 1}/{questions.length}
                  </div>

                  {/* ✅ Images Inside Container */}
                  <img src={img41} alt="img41" className="absolute top-[267px] right-[360px] w-[200px] h-auto" />
                  <img src={img42} alt="img42" className="absolute top-[267px] right-[200px] w-[200px] h-auto" />
                  <img src={img43} alt="img43" className="absolute top-[267px] right-[90px] w-[200px] h-auto" />
                  <img src={img44} alt="img44" className="absolute top-[267px] right-[6px] w-[200px] h-auto" />
                  <img src={img48} alt="img48" className="absolute top-[10px] right-[414px] w-[145px] h-auto" />

                  {/* ✅ Question Image */}
                  <div className="flex-grow flex justify-center items-center w-full">
                    <img
                      src={questions[currentQuestion].image}
                      alt={`Question ${currentQuestion + 1}`}
                      className="object-contain rounded-lg border-8 border-white shadow-lg"
                      style={{
                        width: questions[currentQuestion].width,  // ✅ Apply dynamic width
                        height: questions[currentQuestion].height,  // ✅ Apply dynamic height
                        marginTop: questions[currentQuestion].marginTop, 
                        boxShadow: "0px 10px 35px rgba(0, 0, 0, 0.8)",
                      }}
                    />
                  </div>
                </div>
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
                <div className="bg-gray-800 bg-opacity-70 p-4 rounded-[3rem] shadow-lg mb-6 max-w-5xl mx-auto border-4 border-white">
                  <h2 className="text-3xl font-semibold mb-4 text-center">නිවැරදි පිළිතුර තෝරන්න</h2>
                  <table className="w-full text-lg border-separate border-spacing-3">
                    <tbody>
                      {questions[currentQuestion].answers.map((answer, index) => {
                        if (index % 2 === 0) {
                          return (
                            <tr key={index} className="flex gap-10 justify-center">
                              <td className="p-3 text-center">
                              <button
                onClick={() => handleAnswerClick(index)}
                className="bg-gradient-to-r from-green-400 to-lime-600 text-white px-6 py-3 rounded-xl text-2xl shadow-lg hover:scale-105 transition-transform flex items-center justify-start"
                style={{ width: "320px", height: "70px" }}
              >
                <strong className="ml-4">{answer}</strong>
              </button>
            </td>
            {questions[currentQuestion].answers[index + 1] && (
              <td className="p-3 text-center">
                <button
                  onClick={() => handleAnswerClick(index + 1)}
                  className="bg-gradient-to-r from-green-400 to-lime-600 text-white px-6 py-3 rounded-xl text-2xl shadow-lg hover:scale-105 transition-transform flex items-center justify-start"
                  style={{ width: "320px", height: "70px" }}
                >
                  <strong className="ml-4">{questions[currentQuestion].answers[index + 1]}</strong>
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
                <div className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-600 px-6 py-3 rounded-md shadow-lg mt-4">
                ⏳ කාලය: {timer} තත්පර
                </div>
              </>
            )}
          </>
        )}
        
      
      </div>
    </div>
  );
};

export default LanguageVocabActivity;
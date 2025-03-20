// import React, { useState, useEffect } from "react";
// import Confetti from "react-confetti";
// import backgroundImage from "../../../../assets/background_images/Activity_back3.png";

// // Import game-related images
// import div_01 from "../../../../assets/Math/div_01.png";
// import div_02 from "../../../../assets/Math/div_02.png";
// import div_03 from "../../../../assets/Math/div_03.png";
// import div_04 from "../../../../assets/Math/div_04.png";
// import div_05 from "../../../../assets/Math/div_05.png";
// import divx_01 from "../../../../assets/Math/divx_01.png";
// import divx_02 from "../../../../assets/Math/divx_02.png";
// import divx_03 from "../../../../assets/Math/divx_03.png";
// import divx_04 from "../../../../assets/Math/divx_04.png";
// import divx_05 from "../../../../assets/Math/divx_05.png";
// import div_good from "../../../../assets/Math/div_good.png";
// import div_bad from "../../../../assets/Math/div_bad.png";
// import { useNavigate } from 'react-router-dom';

// // Define questions
// const questions = [
//   {
//     questionImage: div_01,
//     answerImages: [div_02, div_03, div_04, div_05],
//     correctAnswer: div_02,
//   },
//   {
//     questionImage: divx_01,
//     answerImages: [divx_02, divx_03, divx_04, divx_05],
//     correctAnswer: divx_02,
//   },
// ];

// const DivisionGamePage = () => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [correctCount, setCorrectCount] = useState(0);
//   const [showFeedback, setShowFeedback] = useState(null);
//   const [gameFinished, setGameFinished] = useState(false);
//   const [elapsedTime, setElapsedTime] = useState(0);

//   // Timer effect
//   useEffect(() => {
//     if (!gameFinished) {
//       const timerInterval = setInterval(() => {
//         setElapsedTime((prev) => prev + 1);
//       }, 1000);
//       return () => clearInterval(timerInterval);
//     }
//   }, [gameFinished]);

//   const currentQuestion = questions[currentQuestionIndex];
//   const { questionImage, answerImages, correctAnswer } = currentQuestion;

//   // Handle answer selection
//   const handleAnswerSelect = (selectedImg) => {
//     if (showFeedback) return;

//     if (selectedImg === correctAnswer) {
//       setCorrectCount((prev) => prev + 1);
//       setShowFeedback("good");
//     } else {
//       setShowFeedback("bad");
//     }

//     setTimeout(() => {
//       setShowFeedback(null);
//       if (currentQuestionIndex < questions.length - 1) {
//         setCurrentQuestionIndex((prev) => prev + 1);
//       } else {
//         setGameFinished(true);
//       }
//     }, 2000);
//   };

//   // Reset game
//   const resetGame = () => {
//     setCurrentQuestionIndex(0);
//     setCorrectCount(0);
//     setShowFeedback(null);
//     setGameFinished(false);
//     setElapsedTime(0);
//   };

//   const navigate = useNavigate();
//   // Navigate to main menu (placeholder)
//   const goToMainMenu = () => {
//     navigate("/math-funny-game-menu");
//   };

//   return (
//     <div className="division-game-page">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700&display=swap');

//         .division-game-page {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           height: 100vh;
//           width: 100vw;
//           background-image: url(${backgroundImage});
//           background-size: cover;
//           background-position: center;
//           font-family: 'Baloo 2', cursive;
//           position: relative;
//           overflow: hidden;
//         }
//         .floating-element {
//           position: absolute;
//           width: 20px;
//           height: 20px;
//           border-radius: 50%;
//           animation: float 5s ease-in-out infinite;
//           z-index: 0;
//         }
//         .floating-element.orange { background-color: #ff5722; }
//         .floating-element.blue { background-color: #2196F3; }
//         .floating-element.green { background-color: #4CAF50; }
//         @keyframes float {
//           0% { transform: translate(0, 0); }
//           50% { transform: translate(10px, -20px); }
//           100% { transform: translate(0, 0); }
//         }
//         .header {
//           position: relative;
//           z-index: 1;
//           display: flex;
//           justify-content: space-between;
//           width: 100%;
//           max-width: 800px;
//           margin-bottom: 20px;
//           font-size: 1.2rem;
//           color: #333;
//           background: rgba(255, 255, 255, 0.8);
//           padding: 10px 20px;
//           border-radius: 10px;
//         }
//         .question-section {
//           position: relative;
//           z-index: 1;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           gap: 50px;
//         }
//         .answer-column {
//           display: flex;
//           flex-direction: column;
//           gap: 50px;
//         }
//         .question-column {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//         }
//         .question-card {
//           width: 300px;
//           height: auto;
//           border: 3px solid #2196F3;
//           border-radius: 10px;
//           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//         }
//         .answer-card {
//           width: 200px;
//           height: auto;
//           cursor: pointer;
//           border: 2px solid #ccc;
//           border-radius: 8px;
//           transition: transform 0.2s, border-color 0.2s;
//         }
//         .answer-card:hover {
//           transform: scale(1.05);
//           border-color: #2196F3;
//         }
//         .feedback-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100vw;
//           height: 100vh;
//           background: rgba(0, 0, 0, 0.7);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 1000;
//         }
//         .feedback-image {
//           width: 300px;
//           height: auto;
//           animation: fadeIn 0.5s;
//         }
//         .final-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100vw;
//           height: 100vh;
//           background: rgba(0, 0, 0, 0.7);
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 1000;
//         }
//         .final-message {
//           background: linear-gradient(135deg, #ffeb3b, #fbc02d);
//           padding: 40px;
//           border: 5px solid #2196F3;
//           border-radius: 20px;
//           text-align: center;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
//           font-family: 'Baloo 2', cursive;
//         }
//         .final-icon {
//           font-size: 3rem;
//           margin-bottom: 10px;
//         }
//         .final-message h2 {
//           font-size: 2.5rem;
//           color: #2196F3;
//           margin-bottom: 20px;
//         }
//         .final-message p {
//           font-size: 1.5rem;
//           margin-bottom: 20px;
//         }
//         .button-container {
//           display: flex;
//           justify-content: center;
//           gap: 20px;
//           margin-top: 20px;
//         }
//         .button-container button {
//           padding: 15px 30px;
//           font-size: 1.5rem;
//           background: linear-gradient(135deg, #2196F3, #1976D2);
//           color: white;
//           border: none;
//           border-radius: 10px;
//           cursor: pointer;
//           transition: background 0.3s, transform 0.3s;
//           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//         }
//         .button-container button:hover {
//           background: linear-gradient(135deg, #1976D2, #1565C0);
//           transform: scale(1.05);
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//       `}</style>

//       {/* Floating Background Elements */}
//       <div className="floating-element orange" style={{ top: '10%', left: '20%', animationDelay: '0s' }}></div>
//       <div className="floating-element blue" style={{ top: '30%', left: '50%', animationDelay: '2s' }}></div>
//       <div className="floating-element green" style={{ top: '50%', left: '80%', animationDelay: '4s' }}></div>
//       <div className="floating-element orange" style={{ top: '30%', left: '10%', animationDelay: '1s' }}></div>
//       <div className="floating-element orange" style={{ top: '80%', left: '5%', animationDelay: '1s' }}></div>
//       <div className="floating-element blue" style={{ top: '90%', left: '90%', animationDelay: '2s' }}></div>
//       <div className="floating-element orange" style={{ top: '5%', left: '10%', animationDelay: '0s' }}></div>
//       <div className="floating-element blue" style={{ top: '60%', left: '10%', animationDelay: '2s' }}></div>
//       <div className="floating-element green" style={{ top: '75%', left: '12%', animationDelay: '4s' }}></div>
//       <div className="floating-element orange" style={{ top: '30%', left: '97%', animationDelay: '1s' }}></div>
//       <div className="floating-element green" style={{ top: '10%', left: '90%', animationDelay: '1s' }}></div>
//       <div className="floating-element orange" style={{ top: '70%', left: '89%', animationDelay: '1s' }}></div>
//       <div className="floating-element blue" style={{ top: '90%', left: '80%', animationDelay: '2s' }}></div>

//       {/* Feedback Overlay */}
//       {showFeedback && (
//         <div className="feedback-overlay">
//           <img
//             src={showFeedback === "good" ? div_good : div_bad}
//             alt={showFeedback === "good" ? "Correct" : "Incorrect"}
//             className="feedback-image"
//           />
//         </div>
//       )}

//       {/* Final Summary Overlay */}
//       {gameFinished && (
//         <div className="final-overlay">
//           <Confetti width={window.innerWidth} height={window.innerHeight} />
//           <div className="final-message">
//             <span className="final-icon">🏆</span>
//             <h2>අවසන් !</h2>
//             <p>
//             ඔයා {questions.length} න් {correctCount} ක් හරි !
//             </p>
//             <div className="button-container">
//               <button onClick={goToMainMenu}>ප්‍රධාන මෙනුවට </button>
//               <button onClick={resetGame}>නැවත උත්සාහ කරමු</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Game Content */}
//       <div className="header">
//         <span>
//         ප්‍රශ්නය  {currentQuestionIndex + 1} න් {questions.length}
//         </span>
//         <span>වෙලාව : {elapsedTime}තත්පර</span>
//       </div>

//       <div className="question-section">
//         <div className="answer-column left">
//           {answerImages.slice(0, 2).map((img, idx) => (
//             <img
//               key={idx}
//               src={img}
//               className="answer-card"
//               onClick={() => handleAnswerSelect(img)}
//               alt="Answer option"
//             />
//           ))}
//         </div>
//         <div className="question-column">
//           <img
//             src={questionImage}
//             className="question-card"
//             alt="Division question"
//           />
//         </div>
//         <div className="answer-column right">
//           {answerImages.slice(2, 4).map((img, idx) => (
//             <img
//               key={idx}
//               src={img}
//               className="answer-card"
//               onClick={() => handleAnswerSelect(img)}
//               alt="Answer option"
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DivisionGamePage;

import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import backgroundImage from "../../../../assets/background_images/Activity_back3.png";

// Import game-related images
import div_01 from "../../../../assets/Math/div_01.png";
import div_02 from "../../../../assets/Math/div_02.png";
import div_03 from "../../../../assets/Math/div_03.png";
import div_04 from "../../../../assets/Math/div_04.png";
import div_05 from "../../../../assets/Math/div_05.png";
import divx_01 from "../../../../assets/Math/divx_01.png";
import divx_02 from "../../../../assets/Math/divx_02.png";
import divx_03 from "../../../../assets/Math/divx_03.png";
import divx_04 from "../../../../assets/Math/divx_04.png";
import divx_05 from "../../../../assets/Math/divx_05.png";
import div_good from "../../../../assets/Math/div_good.png";
import div_bad from "../../../../assets/Math/div_bad.png";
import { useNavigate } from "react-router-dom";

// Define questions
const questions = [
  {
    questionImage: div_01,
    answerImages: [div_02, div_03, div_04, div_05],
    correctAnswer: div_02,
  },
  {
    questionImage: divx_01,
    answerImages: [divx_02, divx_03, divx_04, divx_05],
    correctAnswer: divx_02,
  },
];

const DivisionGamePage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Timer effect
  useEffect(() => {
    if (!gameFinished) {
      const timerInterval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [gameFinished]);

  const currentQuestion = questions[currentQuestionIndex];
  const { questionImage, answerImages, correctAnswer } = currentQuestion;

  // Handle answer selection
  const handleAnswerSelect = (selectedImg) => {
    if (showFeedback) return;

    if (selectedImg === correctAnswer) {
      setCorrectCount((prev) => prev + 1);
      setShowFeedback("good");
    } else {
      setShowFeedback("bad");
    }

    setTimeout(() => {
      setShowFeedback(null);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        setGameFinished(true);
      }
    }, 2000);
  };

  // Reset game
  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setCorrectCount(0);
    setShowFeedback(null);
    setGameFinished(false);
    setElapsedTime(0);
  };

  const navigate = useNavigate();
  // Navigate to main menu (placeholder)
  const goToMainMenu = () => {
    navigate("/math-funny-game-menu");
  };

  return (
    <div className="division-game-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700&display=swap');

        .division-game-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100vw;
          background-image: url(${backgroundImage});
          background-size: cover;
          background-position: center;
          font-family: 'Baloo 2', cursive;
          position: relative;
          overflow: hidden;
        }
        .floating-element {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          animation: float 5s ease-in-out infinite;
          z-index: 0;
        }
        .floating-element.orange { background-color: #ff5722; }
        .floating-element.blue { background-color: #2196F3; }
        .floating-element.green { background-color: #4CAF50; }
        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(10px, -20px); }
          100% { transform: translate(0, 0); }
        }
        .header {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: space-between;
          width: 100%;
          max-width: 800px;
          margin-bottom: 20px;
          font-size: 1.2rem;
          color: #333;
          background: rgba(255, 255, 255, 0.8);
          padding: 10px 20px;
          border-radius: 10px;
        }
        .question-section {
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 50px;
        }
        .answer-column {
          display: flex;
          flex-direction: column;
          gap: 50px;
        }
        .question-column {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .question-card {
          width: 300px;
          height: auto;
          border: 3px solid #2196F3;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .answer-card {
          width: 200px;
          height: auto;
          cursor: pointer;
          border: 2px solid #ccc;
          border-radius: 8px;
          transition: transform 0.2s, border-color 0.2s;
        }
        .answer-card:hover {
          transform: scale(1.05);
          border-color: #2196F3;
        }
        .feedback-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .feedback-image {
          width: 300px;
          height: auto;
          animation: fadeIn 0.5s;
        }
        .final-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .final-message {
          background: linear-gradient(135deg, #ffeb3b, #fbc02d);
          padding: 40px;
          border: 5px solid #2196F3;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          font-family: 'Baloo 2', cursive;
        }
        .final-icon {
          font-size: 3rem;
          margin-bottom: 10px;
        }
        .final-message h2 {
          font-size: 2.5rem;
          color: #2196F3;
          margin-bottom: 20px;
        }
        .final-message p {
          font-size: 1.5rem;
          margin-bottom: 20px;
        }
        .button-container {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;
        }
        .button-container button {
          padding: 15px 30px;
          font-size: 1.5rem;
          background: linear-gradient(135deg, #2196F3, #1976D2);
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .button-container button:hover {
          background: linear-gradient(135deg, #1976D2, #1565C0);
          transform: scale(1.05);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* Floating Background Elements */}
      <div
        className="floating-element orange"
        style={{ top: "10%", left: "20%", animationDelay: "0s" }}
      ></div>
      <div
        className="floating-element blue"
        style={{ top: "30%", left: "50%", animationDelay: "2s" }}
      ></div>
      <div
        className="floating-element green"
        style={{ top: "50%", left: "80%", animationDelay: "4s" }}
      ></div>
      <div
        className="floating-element orange"
        style={{ top: "30%", left: "10%", animationDelay: "1s" }}
      ></div>
      <div
        className="floating-element orange"
        style={{ top: "80%", left: "5%", animationDelay: "1s" }}
      ></div>
      <div
        className="floating-element blue"
        style={{ top: "90%", left: "90%", animationDelay: "2s" }}
      ></div>
      <div
        className="floating-element orange"
        style={{ top: "5%", left: "10%", animationDelay: "0s" }}
      ></div>
      <div
        className="floating-element blue"
        style={{ top: "60%", left: "10%", animationDelay: "2s" }}
      ></div>
      <div
        className="floating-element green"
        style={{ top: "75%", left: "12%", animationDelay: "4s" }}
      ></div>
      <div
        className="floating-element orange"
        style={{ top: "30%", left: "97%", animationDelay: "1s" }}
      ></div>
      <div
        className="floating-element green"
        style={{ top: "10%", left: "90%", animationDelay: "1s" }}
      ></div>
      <div
        className="floating-element orange"
        style={{ top: "70%", left: "89%", animationDelay: "1s" }}
      ></div>
      <div
        className="floating-element blue"
        style={{ top: "90%", left: "80%", animationDelay: "2s" }}
      ></div>

      {/* Feedback Overlay */}
      {showFeedback && (
        <div className="feedback-overlay">
          <img
            src={showFeedback === "good" ? div_good : div_bad}
            alt={showFeedback === "good" ? "Correct" : "Incorrect"}
            className="feedback-image"
          />
        </div>
      )}

      {/* Final Summary Overlay */}
      {gameFinished && (
        <div className="final-overlay">
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <div className="final-message">
            <span className="final-icon">🏆</span>
            <h2>අවසන් !</h2>
            <p>
              ඔයා {questions.length} න් {correctCount} ක් හරි !
            </p>
            <div className="button-container">
              <button onClick={goToMainMenu}>ප්‍රධාන මෙනුවට </button>
              <button onClick={resetGame}>නැවත උත්සාහ කරමු</button>
            </div>
          </div>
        </div>
      )}

      {/* Game Content */}
      <div className="header">
        <span>
          ප්‍රශ්නය {currentQuestionIndex + 1} න් {questions.length}
        </span>
        <span>වෙලාව : {elapsedTime}තත්පර</span>
      </div>

      <div className="question-section">
        <div className="answer-column left">
          {answerImages.slice(0, 2).map((img, idx) => (
            <img
              key={idx}
              src={img}
              className="answer-card"
              onClick={() => handleAnswerSelect(img)}
              alt="Answer option"
            />
          ))}
        </div>
        <div className="question-column">
          <img
            src={questionImage}
            className="question-card"
            alt="Division question"
          />
        </div>
        <div className="answer-column right">
          {answerImages.slice(2, 4).map((img, idx) => (
            <img
              key={idx}
              src={img}
              className="answer-card"
              onClick={() => handleAnswerSelect(img)}
              alt="Answer option"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DivisionGamePage;

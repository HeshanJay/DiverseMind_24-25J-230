import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import correctSound from "../../../../assets/Audios/design_sounds/correct.mp3";
import incorrectSound from "../../../../assets/Audios/design_sounds/incorrect.mp3";
import backgroundImage from "../../../../assets/background_images/bg_23.png";
import balloonRed from "../../../../assets/Math/baloon-red.png";
import balloonBlue from "../../../../assets/Math/baloon-blue.png";
import balloonGreen from "../../../../assets/Math/baloon-green.png";
import balloonYellow from "../../../../assets/Math/baloon-yellow.png";
import cloudImage from "../../../../assets/Math/cloud_new.png";
import starImage from "../../../../assets/Math/star_new.png";
import clownImage from "../../../../assets/Math/clown_new.png";

const MathMultiplicationGamePage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [problem, setProblem] = useState(generateProblem());
  const [feedback, setFeedback] = useState(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);

  const navigate = useNavigate(); // Add navigation hook
  const totalQuestions = 5;
  const balloonImages = [balloonRed, balloonBlue, balloonGreen, balloonYellow];

  // Generate a multiplication problem
  function generateProblem() {
    const num1 = Math.floor(Math.random() * 100) + 1;
    const num2 = Math.floor(Math.random() * 5) + 1;
    const correctAnswer = num1 * num2;
    const options = generateOptions(correctAnswer);
    return { num1, num2, correctAnswer, options };
  }

  // Generate answer options
  function generateOptions(correctAnswer) {
    const options = [correctAnswer];
    while (options.length < 4) {
      const distractor = correctAnswer + Math.floor(Math.random() * 10) - 5;
      if (
        distractor >= 0 &&
        !options.includes(distractor) &&
        distractor !== correctAnswer
      ) {
        options.push(distractor);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  }

  // Handle balloon click
  const handleBalloonClick = (option, index) => {
    if (isAnswering) return;
    setIsAnswering(true);

    if (option === problem.correctAnswer) {
      new Audio(correctSound).play();
      setScore(score + 10);
      setFeedback({ type: "correct", index });
      setTimeout(() => {
        setFeedback(null);
        if (currentQuestion < totalQuestions) {
          setCurrentQuestion(currentQuestion + 1);
          setProblem(generateProblem());
        } else {
          setIsGameComplete(true);
        }
        setIsAnswering(false);
      }, 1000);
    } else {
      new Audio(incorrectSound).play();
      setFeedback({ type: "incorrect", index });
      setTimeout(() => {
        setFeedback(null);
        setIsAnswering(false);
      }, 1000);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(1);
    setScore(0);
    setProblem(generateProblem());
    setFeedback(null);
    setIsAnswering(false);
    setIsGameComplete(false);
  };

  // Add navigation function
  const goToMainMenu = () => {
    navigate("/math-funny-game-menu");
  };

  return (
    <div className="mmg-multiplication-game-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bubblegum+Sans&display=swap');

        .mmg-multiplication-game-page {
          height: 100vh;
          background: rgba(0, 0, 0, 0.2);
          overflow: hidden;
          position: relative;
        }

        .mmg-game-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          background: url(${backgroundImage}) no-repeat center/cover;
          font-family: 'Bubblegum Sans', cursive;
          padding: 20px;
          position: relative;
        }

        .mmg-cloud {
          position: absolute;
          width: 150px;
          animation: mmg-drift 10s infinite linear;
        }
        .mmg-cloud:nth-child(1) { top: 10%; left: 5%; }
        .mmg-cloud:nth-child(2) { top: 20%; right: 10%; animation-delay: 2s; }

        .mmg-star {
          position: absolute;
          width: 50px;
          animation: mmg-twinkle 2s infinite;
        }
        .mmg-star:nth-child(3) { top: 15%; left: 60%; }
        .mmg-star:nth-child(4) { top: 40%; right: 20%; animation-delay: 1s; }

        .mmg-clown {
          position: absolute;
          width: 180px;
          bottom: 40px;
          left: 20px;
          animation: mmg-bounce 1.5s infinite;
        }

        .mmg-header {
          display: flex;
          justify-content: space-between;
          width: 90%;
          max-width: 700px;
          padding: 15px 25px;
          background: #FFD700;
          border-radius: 20px;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
          font-size: 2rem;
          color: #FF4500;
          margin-bottom: 20px;
          z-index: 1;
        }

        .mmg-problem {
          font-size: 4rem;
          font-weight: bold;
          color: #32CD32;
          text-shadow: 2px 2px 6px #000;
          background: rgba(255, 255, 255, 0.8);
          padding: 15px 30px;
          border-radius: 25px;
          margin-bottom: 30px;
          animation: mmg-pulse 2s infinite;
          z-index: 1;
        }

        .mmg-balloons {
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
          z-index: 1;
        }

        .mmg-balloon {
          width: 170px;
          height: 200px;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: transform 0.3s ease;
          animation: mmg-float 3s infinite ease-in-out;
          position: relative;
        }

        .mmg-balloon:hover {
          transform: scale(1.15);
        }

        .mmg-balloon.popped {
          animation: mmg-pop 0.5s forwards;
          pointer-events: none;
        }

        .mmg-balloon.shake {
          animation: mmg-shake 0.5s ease;
        }

        .mmg-balloon-text {
          font-size: 2.8rem;
          font-weight: bold;
          color: #fff;
          text-shadow: 2px 2px 4px #000;
          position: absolute;
          top: 40%;
          transform: translateY(-50%);
        }

        .mmg-game-complete {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #FF69B4, #FFD700);
          padding: 40px;
          border-radius: 30px;
          text-align: center;
          color: #fff;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
          animation: mmg-slideIn 0.5s ease;
          z-index: 2;
        }

        .mmg-game-complete h2 {
          font-size: 2rem;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px #000;
        }

        .mmg-game-complete p {
          font-size: 2rem;
          margin-bottom: 25px;
        }

        .mmg-game-complete-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 3;
        }

        .mmg-button-container {
          display: flex;
          gap: 20px;
          justify-content: center;
        }

        .mmg-game-complete button {
          padding: 15px 30px;
          font-size: 1.2rem;
          background-color: #32CD32;
          color: #fff;
          border: none;
          border-radius: 15px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .mmg-game-complete button:hover {
          background-color: #228B22;
          transform: scale(1.1);
        }

        @keyframes mmg-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }

        @keyframes mmg-pop {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(0); opacity: 0; }
        }

        @keyframes mmg-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-15px); }
          75% { transform: translateX(15px); }
        }

        @keyframes mmg-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes mmg-drift {
          0% { transform: translateX(0); }
          50% { transform: translateX(50px); }
          100% { transform: translateX(0); }
        }

        @keyframes mmg-twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes mmg-bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-20px); }
          60% { transform: translateY(-10px); }
        }

        @keyframes mmg-slideIn {
          0% { transform: translate(-50%, -70%); opacity: 0; }
          100% { transform: translate(-50%, -50%); opacity: 1; }
        }

        @media (max-width: 600px) {
          .mmg-header { font-size: 1.5rem; padding: 10px 15px; }
          .mmg-problem { font-size: 3rem; padding: 10px 20px; }
          .mmg-balloon { width: 100px; height: 130px; }
          .mmg-balloon-text { font-size: 1.8rem; }
          .mmg-game-complete h2 { font-size: 2.5rem; }
          .mmg-game-complete p { font-size: 1.8rem; }
          .mmg-game-complete button { font-size: 1.5rem; padding: 10px 20px; }
          .mmg-cloud { width: 100px; }
          .mmg-star { width: 30px; }
          .mmg-clown { width: 80px; }
        }
      `}</style>

      <div className="mmg-game-container">
        <img src={cloudImage} alt="Cloud" className="mmg-cloud" />
        <img src={cloudImage} alt="Cloud" className="mmg-cloud" />
        <img src={starImage} alt="Star" className="mmg-star" />
        <img src={starImage} alt="Star" className="mmg-star" />
        <img src={clownImage} alt="Clown" className="mmg-clown" />

        <div className="mmg-header">
          <span>
            🎈 ප්‍රශ්නය : {currentQuestion} / {totalQuestions}
          </span>
          <span>⭐ ලකුණු : {score}</span>
        </div>

        <div className="mmg-problem">
          {problem.num1} × {problem.num2} = ?
        </div>

        <div className="mmg-balloons">
          {problem.options.map((option, index) => (
            <div
              key={index}
              className={`mmg-balloon ${
                feedback && feedback.index === index
                  ? feedback.type === "correct"
                    ? "popped"
                    : "shake"
                  : ""
              }`}
              style={{ backgroundImage: `url(${balloonImages[index]})` }}
              onClick={() => handleBalloonClick(option, index)}
            >
              <span className="mmg-balloon-text">{option}</span>
            </div>
          ))}
        </div>

        {isGameComplete && (
          <div className="mmg-game-complete-overlay">
            <div className="mmg-game-complete">
              <h2>🎉 ඔන්න පුංචි දක්ෂයෝ.. බැලුම් තරගය දිනුම් ! 🎉</h2>
              <p>ඔබේ ලකුණු : {score} තරු ! 🌟</p>
              <div className="mmg-button-container">
                <button onClick={resetGame}>නැවත සෙල්ලම් කරමු! 🎈</button>
                <button onClick={goToMainMenu}>ප්‍රධාන මෙනුවට 🎲</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MathMultiplicationGamePage;

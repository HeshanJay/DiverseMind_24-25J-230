import React, { useState, useEffect } from "react";
import correctSound from "../../../../assets/Audios/design_sounds/correct.mp3";
import incorrectSound from "../../../../assets/Audios/design_sounds/incorrect.mp3";
import levelUpSound from "../../../../assets/Audios/design_sounds/level_up.mp3";
import characterUnlockSound from "../../../../assets/Audios/design_sounds/character_unlock.mp3";
import backgroundImage from "../../../../assets/background_images/Activity_back3.png";
import character1 from "../../../../assets/characters/angel.png";
import character2 from "../../../../assets/characters/knight.png";
import character3 from "../../../../assets/characters/kid.png";
import bearKid from "../../../../assets/Math/bear_kid.png";
import popBoardWood from "../../../../assets/Math/pop_board_wood.png";
import popBoardWood1 from "../../../../assets/Math/pop_board_wood1.png";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const MathAdditionGamePage = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);
  const [problem, setProblem] = useState(generateProblem(currentLevel));
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [stars, setStars] = useState(0);
  const [unlockedCharacters, setUnlockedCharacters] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [feedbackIcon, setFeedbackIcon] = useState(null);
  const [showCharacterUnlock, setShowCharacterUnlock] = useState(false);
  const [celebrationCharacter, setCelebrationCharacter] = useState(null);
  const [isOverDropZone, setIsOverDropZone] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTutorial, setShowTutorial] = useState(
    !localStorage.getItem("hasPlayed")
  );

  function generateProblem(level) {
    let num1, num2;
    if (level <= 3) {
      num1 = Math.floor(Math.random() * 90) + 10;
      num2 = Math.floor(Math.random() * 90) + 10;
    } else {
      num1 = Math.floor(Math.random() * 900) + 100;
      num2 = Math.floor(Math.random() * 900) + 100;
    }
    const answer = num1 + num2;
    const cards = generateAnswerCards(answer);
    return { num1, num2, answer, cards };
  }

  function generateAnswerCards(correctAnswer) {
    const cards = [correctAnswer];
    while (cards.length < 4) {
      const randomAnswer = correctAnswer + Math.floor(Math.random() * 20) - 10;
      if (!cards.includes(randomAnswer)) cards.push(randomAnswer);
    }
    return cards.sort(() => Math.random() - 0.5);
  }

  const playSound = (sound) => {
    if (!isMuted) new Audio(sound).play();
  };

  const checkAnswer = (answer) => {
    if (answer === problem.answer) {
      playSound(correctSound);
      setScore(score + 10);
      setStars((prev) => Math.min(prev + 1, 3));
      setFeedback("correct");
      setFeedbackIcon("correct");
      setTimeout(() => {
        setFeedback(null);
        setFeedbackIcon(null);
        if (currentQuestion === 2) {
          unlockCharacter();
        } else {
          setCurrentQuestion(currentQuestion + 1);
          setProblem(generateProblem(currentLevel));
        }
        setSelectedAnswer(null);
      }, 1000);
    } else {
      playSound(incorrectSound);
      setHealth(health - 1);
      setFeedback("incorrect");
      setFeedbackIcon("incorrect");
      if (health === 1) setIsGameOver(true);
      setTimeout(() => {
        setFeedback(null);
        setFeedbackIcon(null);
        setSelectedAnswer(null);
      }, 1000);
    }
  };

  const handleDragStart = (e, answer) => setSelectedAnswer(answer);
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsOverDropZone(true);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsOverDropZone(false);
    checkAnswer(selectedAnswer);
  };

  const handleCardClick = (answer) => {
    setSelectedAnswer(answer);
    checkAnswer(answer);
  };

  const unlockCharacter = () => {
    const characters = [
      { name: "සුරගන", image: character1 },
      { name: "ආරක්ෂකයා", image: character2 },
      { name: "ළමයා", image: character3 },
    ];
    const newCharacter = characters[unlockedCharacters.length];
    if (newCharacter) {
      setUnlockedCharacters([...unlockedCharacters, newCharacter]);
      setCelebrationCharacter(newCharacter);
      setShowCharacterUnlock(true);
      playSound(characterUnlockSound);
    }
  };

  const nextLevel = () => {
    if (currentLevel < 3) {
      setCurrentLevel(currentLevel + 1);
      setCurrentQuestion(1);
      setIsLevelComplete(false);
      setProblem(generateProblem(currentLevel + 1));
      playSound(levelUpSound);
    } else {
      setShowConfetti(true);
      setIsGameOver(true);
      setIsLevelComplete(false); // Added this line to hide the level complete section
    }
  };

  const resetGame = () => {
    setCurrentLevel(1);
    setCurrentQuestion(1);
    setScore(0);
    setHealth(3);
    setStars(0);
    setUnlockedCharacters([]);
    setIsGameOver(false);
    setIsLevelComplete(false);
    setProblem(generateProblem(1));
    setShowConfetti(false);
    setFeedback(null);
    setFeedbackIcon(null);
    setShowCharacterUnlock(false);
    setCelebrationCharacter(null);
  };

  const navigate = useNavigate();
  const goToMainMenu = () => {
    navigate("/math-funny-game-menu");
    // Replace with actual navigation logic, e.g., history.push('/') if using React Router
  };

  useEffect(() => {
    setProblem(generateProblem(currentLevel));
  }, [currentLevel]);

  return (
    <div
      className="magp-math-addition-game-page"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Corrected: Enclose in backticks
    >
      {/* Inline scoped CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;700&display=swap');

        .magp-math-addition-game-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-size: cover;
          background-position: center;
          font-family: 'Baloo 2', cursive;
          padding: 20px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }

        .magp-math-addition-game-page .magp-game-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 900px;
          padding: 15px;
          background: linear-gradient(135deg, #ffecb1, #90ff3b);
          border-radius: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          margin-bottom: 20px;
        }

        .magp-math-addition-game-page .magp-game-stats {
          display: flex;
          gap: 15px;
          font-size: 1.2rem;
          color: #333;
        }

        .magp-math-addition-game-page .magp-controls {
          display: flex;
          align-items: center;
        }

        .magp-math-addition-game-page .magp-mute-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0 10px;
        }

        .magp-math-addition-game-page .magp-unlocked-characters h3 {
          color: #D81B60;
          font-size: 1.2rem;
          margin-bottom: 5px;
        }

        .magp-math-addition-game-page .magp-character-list {
          display: flex;
          gap: 10px;
        }

        .magp-math-addition-game-page .magp-character-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 3px solid #2196F3;
          transition: transform 0.3s ease;
        }

        .magp-math-addition-game-page .magp-character-avatar.magp-cheer {
          animation: magp-bounce 0.5s ease;
        }

        .magp-math-addition-game-page .magp-character-avatar.magp-sad {
          animation: magp-shake 0.5s ease;
        }

        .magp-math-addition-game-page .magp-game-content {
          background: rgba(255, 255, 255, 0.9);
          padding: 25px;
          border-radius: 20px;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
          text-align: center;
          animation: magp-slideIn 0.5s ease;
          position: relative;
          width: 100%;
          max-width: 600px;
        }

        .magp-math-addition-game-page .magp-game-content h2 {
          color: #4CAF50;
          font-size: 2rem;
          margin-bottom: 15px;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
        }

        .magp-math-addition-game-page .magp-problem {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          font-size: 2.5rem;
          font-weight: bold;
          color: #2196F3;
          margin-bottom: 20px;
        }

        .magp-math-addition-game-page .magp-answer-box {
          width: 120px;
          height: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #FFEB3B;
          border: 4px dashed #FFC107;
          border-radius: 10px;
          font-size: 2rem;
          color: #333;
          transition: all 0.3s ease;
          position: relative;
        }

        .magp-math-addition-game-page .magp-answer-box.magp-over-drop-zone {
          border-color: #4CAF50;
          box-shadow: 0 0 10px #4CAF50;
        }

        .magp-math-addition-game-page .magp-answer-box.magp-correct-feedback {
          animation: magp-bounce 0.5s ease;
          background: #4CAF50;
          color: white;
        }

        .magp-math-addition-game-page .magp-answer-box.magp-incorrect-feedback {
          animation: magp-shake 0.5s ease;
          background: #F44336;
          color: white;
        }

        .magp-math-addition-game-page .magp-feedback-icon {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 2.5rem;
          animation: magp-fadeInOut 1s ease;
        }

        .magp-math-addition-game-page .magp-feedback-icon.correct { color: green; }
        .magp-math-addition-game-page .magp-feedback-icon.incorrect { color: red; }

        .magp-math-addition-game-page .magp-answer-cards {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 20px;
        }

        .magp-math-addition-game-page .magp-answer-card {
          width: 80px;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #2196F3;
          color: white;
          font-size: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .magp-math-addition-game-page .magp-answer-card:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
        }

        .magp-math-addition-game-page .magp-answer-card:focus {
          outline: 2px solid #4CAF50;
        }

        .magp-math-addition-game-page .magp-tutorial-modal,
        .magp-math-addition-game-page .magp-character-unlock-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .magp-math-addition-game-page .magp-modal-content {
          background: url(${popBoardWood1}) no-repeat center center;
          background-size: cover;
          padding: 30px;
          border-radius: 20px;
          text-align: center;
          animation: magp-popIn 0.5s ease;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(255, 255, 0, 0.5);
        }

        .magp-math-addition-game-page .magp-celebration-character {
          width: 120px;
          height: 180px;
          margin: 10px 0;
          animation: magp-character-appear 1s ease;
        }

        .magp-math-addition-game-page .magp-level-complete,
        .magp-math-addition-game-page .magp-game-over {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 40px;
          border-radius: 20px;
          text-align: center;
          color: white;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
          animation: magp-slideIn 0.5s ease;
        }

        .magp-math-addition-game-page .magp-game-over {
          background: linear-gradient(135deg, #F44336, #E57373);
        }

        .magp-math-addition-game-page .magp-level-complete {
          background: url(${popBoardWood}) no-repeat center center;
          background-size: cover;
        }

        .magp-math-addition-game-page .magp-level-complete > *:nth-child(odd),
        .magp-math-addition-game-page .magp-game-over > *:nth-child(odd) {
          opacity: 0;
          animation: slideInLeft 0.5s ease forwards;
        }

        .magp-math-addition-game-page .magp-level-complete > *:nth-child(even),
        .magp-math-addition-game-page .magp-game-over > *:nth-child(even) {
          opacity: 0;
          animation: slideInRight 0.5s ease forwards;
        }

        .magp-math-addition-game-page .magp-level-complete > *:nth-child(1),
        .magp-math-addition-game-page .magp-game-over > *:nth-child(1) {
          animation-delay: 0s;
        }

        .magp-math-addition-game-page .magp-level-complete > *:nth-child(2),
        .magp-math-addition-game-page .magp-game-over > *:nth-child(2) {
          animation-delay: 0.2s;
        }

        .magp-math-addition-game-page .magp-level-complete > *:nth-child(3),
        .magp-math-addition-game-page .magp-game-over > *:nth-child(3) {
          animation-delay: 0.4s;
        }

        .magp-math-addition-game-page .magp-level-complete > *:nth-child(4),
        .magp-math-addition-game-page .magp-game-over > *:nth-child(4) {
          animation-delay: 0.6s;
        }

        .magp-math-addition-game-page .magp-button-container {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;
        }

        .magp-math-addition-game-page .magp-bear-kid {
          display: block;
          margin: 0 auto 20px auto;
          width: 100px;
          height: auto;
          animation: magp-bounce-in 0.5s ease, magp-bob 2s ease-in-out 0.5s infinite;
        }

        @keyframes magp-bounce-in {
          0% {
            transform: scale(0) translateY(-100px);
            opacity: 0;
          }
          60% {
            transform: scale(1.1) translateY(20px);
            opacity: 1;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @keyframes magp-bob {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .magp-math-addition-game-page .magp-animate-fade-in {
          opacity: 0;
          animation: fadeIn 0.5s ease forwards;
        }

        .magp-math-addition-game-page button {
          padding: 10px 20px;
          font-size: 1.2rem;
          color: white;
          background: linear-gradient(135deg, #2196F3, #1976D2);
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .magp-math-addition-game-page button:hover {
          background: linear-gradient(135deg, #1976D2, #1565C0);
          transform: scale(1.05);
        }

        .magp-math-addition-game-page button:active {
          transform: scale(0.95);
        }

        .magp-math-addition-game-page .magp-feedback-announcement {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }

        .magp-level-complete-modal,
        .magp-game-over-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        @keyframes magp-bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-20px); }
          60% { transform: translateY(-10px); }
        }

        @keyframes magp-shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        @keyframes magp-slideIn {
          from { transform: translate(-50%, -60%); opacity: 0; }
          to { transform: translate(-50%, -50%); opacity: 1; }
        }

        @keyframes magp-popIn {
          0% { transform: scale(0); opacity: 0; }
          80% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes magp-fadeInOut {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes magp-character-appear {
          0% { transform: scale(0) rotate(0deg); }
          100% { transform: scale(1) rotate(360deg); }
        }

        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 768px) {
          .magp-math-addition-game-page .magp-game-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .magp-math-addition-game-page .magp-game-stats {
            flex-direction: column;
            gap: 8px;
            font-size: 1rem;
          }
          .magp-math-addition-game-page .magp-controls { margin: 10px 0; }
          .magp-math-addition-game-page .magp-unlocked-characters { margin-top: 10px; }
          .magp-math-addition-game-page .magp-problem { font-size: 1.8rem; }
          .magp-math-addition-game-page .magp-answer-box { width: 80px; height: 50px; font-size: 1.5rem; }
          .magp-math-addition-game-page .magp-answer-card { width: 60px; height: 60px; font-size: 1.2rem; }
          .magp-math-addition-game-page .magp-game-content h2 { font-size: 1.5rem; }
        }
      `}</style>

      {showConfetti && <Confetti />}
      {showTutorial && (
        <div className="magp-tutorial-modal">
          <div className="magp-modal-content">
            <h2
              className="magp-animate-fade-in"
              style={{ animationDelay: "0s" }}
            >
              ඔන්න පුංචි දක්ෂයෝ! තරගයට පිළිගන්නවා
            </h2>
            <p
              className="magp-animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              Drag or click an answer card to the box to solve the addition
              problem.
            </p>
            <button
              className="magp-animate-fade-in"
              style={{ animationDelay: "0.4s" }}
              onClick={() => {
                setShowTutorial(false);
                localStorage.setItem("hasPlayed", "true");
              }}
            >
              Got It!
            </button>
          </div>
        </div>
      )}
      {showCharacterUnlock && celebrationCharacter && (
        <div className="magp-character-unlock-modal">
          <Confetti />
          <div className="magp-modal-content">
            <h2>ඔයා දක්ෂයි ..! {celebrationCharacter.name}!</h2>
            <img
              src={celebrationCharacter.image}
              alt={celebrationCharacter.name}
              className="magp-celebration-character"
            />
            <button
              onClick={() => {
                setShowCharacterUnlock(false);
                setIsLevelComplete(true);
              }}
            >
              ඉදිරියට!
            </button>
          </div>
        </div>
      )}

      <div className="magp-game-header">
        <div className="magp-game-stats">
          <span>මට්ටම: {currentLevel}</span>
          <span>ලකුණු : {score}</span>
          <span>අවස්ථා : {"❤".repeat(health)}</span>
          <span>තාරකා : {"⭐".repeat(stars)}</span>
          <span>ප්‍රශ්න: {currentQuestion}/2</span>
        </div>
        <div className="magp-controls">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="magp-mute-btn"
          >
            {isMuted ? "🔇" : "🔊"}
          </button>
        </div>
        <div className="magp-unlocked-characters">
          <h3>ලබාගත් ප්‍රසාද:</h3>
          <div className="magp-character-list">
            {unlockedCharacters.map((char, idx) => (
              <img
                key={idx}
                src={char.image}
                alt={char.name}
                className={`magp-character-avatar ${
                  feedback === "correct"
                    ? "magp-cheer"
                    : feedback === "incorrect"
                    ? "magp-sad"
                    : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="magp-game-content">
        <h2>එන්න අපි ඔයාගේ හැකියාවන් බලමු !</h2>
        <div
          className="magp-problem"
          aria-label={`What is ${problem.num1} plus ${problem.num2}?`}
        >
          <span>{problem.num1}</span>
          <span>+</span>
          <span>{problem.num2}</span>
          <span>=</span>
          <div
            className={`magp-answer-box ${
              isOverDropZone ? "magp-over-drop-zone" : ""
            } ${feedback === "correct" ? "magp-correct-feedback" : ""} ${
              feedback === "incorrect" ? "magp-incorrect-feedback" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={() => setIsOverDropZone(false)}
            onDrop={handleDrop}
            role="region"
            aria-label="Drop your answer here"
          >
            {selectedAnswer !== null ? selectedAnswer : "?"}
            {feedbackIcon === "correct" && (
              <span className="magp-feedback-icon correct">✔</span>
            )}
            {feedbackIcon === "incorrect" && (
              <span className="magp-feedback-icon incorrect">❌</span>
            )}
          </div>
        </div>
        <div className="magp-answer-cards">
          {problem.cards.map((card, idx) => (
            <div
              key={idx}
              className="magp-answer-card"
              draggable
              onDragStart={(e) => handleDragStart(e, card)}
              onClick={() => handleCardClick(card)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") handleCardClick(card);
              }}
            >
              {card}
            </div>
          ))}
        </div>
        <div aria-live="polite" className="magp-feedback-announcement">
          {feedback === "correct" && "Correct! Well done!"}
          {feedback === "incorrect" && "Oops, try again!"}
        </div>
      </div>

      {isLevelComplete && (
        <div className="magp-level-complete-modal">
          <div className="magp-level-complete">
            <img src={bearKid} alt="Bear Kid" className="magp-bear-kid" />
            <h2
              className="magp-animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              විශිෂ්ටයි පුංචි දක්ෂයෝ !
            </h2>
            <p
              className="magp-animate-fade-in"
              style={{ animationDelay: "0.7s" }}
            >
              ඔබේ මට්ටම {currentLevel} !
            </p>
            <p
              className="magp-animate-fade-in"
              style={{ animationDelay: "0.9s" }}
            >
              ඔයා තරු {stars} ක් අරන්! 🌟
            </p>
            <button
              className="magp-animate-fade-in"
              style={{ animationDelay: "1.1s" }}
              onClick={nextLevel}
            >
              {currentLevel < 3 ? "ඊළග තරගයට " : "සමරමු !"}
            </button>
          </div>
        </div>
      )}

      {isGameOver && (
        <div className="magp-game-over">
          <h2>
            {currentLevel === 3
              ? "ඉතා හොදයි ඔයා දක්ෂයෙක් !"
              : "නැවත උත්සාහා කරමු !"}
          </h2>
          <p> ඔබේ ලකුණ : {score}</p>
          <div className="magp-button-container">
            <button onClick={resetGame}>නැවත කරමු</button>
            <button onClick={goToMainMenu}>ප්‍රධාන මෙනුවට </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MathAdditionGamePage;

import React, { useState, useEffect } from "react";
import Confetti from "react-confetti"; // Added import
import correctSound from "../../../../assets/Audios/design_sounds/correct.mp3";
import incorrectSound from "../../../../assets/Audios/design_sounds/incorrect.mp3";
import levelUpSound from "../../../../assets/Audios/design_sounds/level_up.mp3";
import treasureMapImage from "../../../../assets/background_images/Activity_back4.png";
import coinImage from "../../../../assets/Math/coins_map.png";
import gemImage from "../../../../assets/Math/gems_map.png";
import nothingImage from "../../../../assets/Math/nothing_map.png";
import replayIcon from "../../../../assets/Math/replayx.png";
import homeIcon from "../../../../assets/Math/homexx.png";
import { useNavigate } from "react-router-dom";

const MathSubtractionGamePage = () => {
  // State variables (unchanged)
  const [currentLevel, setCurrentLevel] = useState(1);
  const [treasuresFound, setTreasuresFound] = useState(0);
  const [score, setScore] = useState(0);
  const [problem, setProblem] = useState(generateProblem(1));
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isLevelFailed, setIsLevelFailed] = useState(false);

  const treasuresNeeded = 2;
  const gridSize = 4;
  const treasureImages = [coinImage, gemImage];

  const initializeGrid = () => {
    const newGrid = Array(gridSize)
      .fill()
      .map(() => Array(gridSize).fill({ revealed: false, content: null }));
    return newGrid;
  };

  const [grid, setGrid] = useState(() => initializeGrid());

  function generateProblem(level) {
    let a, b;
    if (level === 1) {
      a = Math.floor(Math.random() * 20) + 10;
      b = Math.floor(Math.random() * 10) + 1;
    } else if (level === 2) {
      a = Math.floor(Math.random() * 90) + 10;
      b = Math.floor(Math.random() * a);
    } else {
      a = Math.floor(Math.random() * 900) + 100;
      b = Math.floor(Math.random() * a);
    }
    return { a, b, correctAnswer: a - b };
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAnswering || !userAnswer) return;
    setIsAnswering(true);

    const answer = parseInt(userAnswer);
    if (answer === problem.correctAnswer) {
      new Audio(correctSound).play();
      setScore(score + 10);
      setFeedback("හොදයි! ඔයා දක්ෂයි!");
      revealTreasure();
    } else {
      new Audio(incorrectSound).play();
      const newWrongAttempts = wrongAttempts + 1;
      setWrongAttempts(newWrongAttempts);
      if (newWrongAttempts >= 5) {
        setIsLevelFailed(true);
      } else {
        setFeedback("වැරදී! කමක් නැහැ නැවත උත්සාහ කරමු!");
        setTimeout(() => {
          setFeedback(null);
          setUserAnswer("");
          setIsAnswering(false);
        }, 1000);
      }
    }
  };

  const revealTreasure = () => {
    const newGrid = [...grid];
    let unrevealedCells = [];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (!newGrid[i][j].revealed) {
          unrevealedCells.push([i, j]);
        }
      }
    }

    if (unrevealedCells.length === 0) return;

    const [row, col] =
      unrevealedCells[Math.floor(Math.random() * unrevealedCells.length)];
    const isTreasure = Math.random() < 0.8;
    newGrid[row][col] = {
      revealed: true,
      content: isTreasure
        ? treasureImages[Math.floor(Math.random() * treasureImages.length)]
        : nothingImage,
    };
    setGrid(newGrid);

    if (isTreasure) {
      setTreasuresFound(treasuresFound + 1);
      if (treasuresFound + 1 >= treasuresNeeded) {
        setIsLevelComplete(true);
      }
    }

    setTimeout(() => {
      setFeedback(null);
      setUserAnswer("");
      setProblem(generateProblem(currentLevel));
      setIsAnswering(false);
    }, 1000);
  };

  const nextLevel = () => {
    new Audio(levelUpSound).play();
    if (currentLevel < 3) {
      setCurrentLevel(currentLevel + 1);
      setTreasuresFound(0);
      setGrid(initializeGrid());
      setIsLevelComplete(false);
      setProblem(generateProblem(currentLevel + 1));
      setWrongAttempts(0);
    } else {
      setIsGameOver(true);
    }
  };

  const resetLevel = () => {
    setTreasuresFound(0);
    setGrid(initializeGrid());
    setProblem(generateProblem(currentLevel));
    setWrongAttempts(0);
    setIsLevelFailed(false);
    setIsAnswering(false);
    setFeedback(null);
    setUserAnswer("");
  };

  const resetGame = () => {
    setCurrentLevel(1);
    setTreasuresFound(0);
    setScore(0);
    setProblem(generateProblem(1));
    setUserAnswer("");
    setFeedback(null);
    setIsAnswering(false);
    setGrid(initializeGrid());
    setIsLevelComplete(false);
    setIsGameOver(false);
    setWrongAttempts(0);
  };

  const navigate = useNavigate();
  const goHome = () => {
    navigate("/math-funny-game-menu");
  };

  useEffect(() => {
    setProblem(generateProblem(currentLevel));
  }, [currentLevel]);

  return (
    <div className="math-subtraction-game-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pirata+One&display=swap');

        .math-subtraction-game-page {
          font-size: 16px;
        }

        .math-subtraction-game-page .mtg-game-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100vh;
          background-size: cover;
          background-position: center;
          font-family: 'Pirata One', cursive;
          padding: 20px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }

        .mtg-game-container.level-1 .mtg-header {
          background: rgba(139, 69, 19, 0.8);
          border-color: #FFD700;
        }
        .mtg-game-container.level-2 .mtg-header {
          background: rgba(70, 130, 180, 0.8);
          border-color: #87CEEB;
        }
        .mtg-game-container.level-3 .mtg-header {
          background: rgba(178, 34, 34, 0.8);
          border-color: #FF6347;
        }
        .mtg-game-container.level-1 .mtg-grid-cell {
          background: rgba(245, 222, 179, 0.7);
          border-color: #3c2f2f;
        }
        .mtg-game-container.level-2 .mtg-grid-cell {
          background: rgba(176, 196, 222, 0.7);
          border-color: #4682B4;
        }
        .mtg-game-container.level-3 .mtg-grid-cell {
          background: rgba(255, 160, 122, 0.7);
          border-color: #B22222;
        }
        .mtg-game-container.level-1 .mtg-grid-cell.revealed {
          background: rgba(139, 69, 19, 0.5);
        }
        .mtg-game-container.level-2 .mtg-grid-cell.revealed {
          background: rgba(70, 130, 180, 0.5);
        }
        .mtg-game-container.level-3 .mtg-grid-cell.revealed {
          background: rgba(178, 34, 34, 0.5);
        }
        .mtg-game-container.level-1 button {
          background-color: #8b4513;
          border-color: #3c2f2f;
        }
        .mtg-game-container.level-2 button {
          background-color: #4682B4;
          border-color: #4682B4;
        }
        .mtg-game-container.level-3 button {
          background-color: #B22222;
          border-color: #B22222;
        }
        .mtg-game-container.level-1 button:hover {
          background-color: #a0522d;
        }
        .mtg-game-container.level-2 button:hover {
          background-color: #5f9ea0;
        }
        .mtg-game-container.level-3 button:hover {
          background-color: #cd5c5c;
        }

        .math-subtraction-game-page .mtg-header {
          display: flex;
          justify-content: space-between;
          width: 90vw;
          max-width: 800px;
          padding: 10px;
          border: 3px solid;
          border-radius: 10px;
          color: #fff;
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .math-subtraction-game-page .mtg-grid {
          width: 80vmin;
          height: 80vmin;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2vmin;
          margin-bottom: 30px;
        }

        .math-subtraction-game-page .mtg-grid-cell {
          border: 2px dashed;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: background 0.5s ease;
        }

        .math-subtraction-game-page .mtg-treasure {
          max-width: 80%;
          max-height: 80%;
          animation: math-mtg-reveal 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }

        .math-subtraction-game-page .mtg-problem-container {
          text-align: center;
        }

        .math-subtraction-game-page .mtg-problem {
          font-size: 2.5rem;
          color: #fff;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px #000;
        }

        .math-subtraction-game-page .mtg-input {
          padding: 10px;
          font-size: 1.5rem;
          width: clamp(100px, 30vw, 200px);
          border: 2px solid #3c2f2f;
          border-radius: 5px;
          margin-right: 10px;
          font-family: 'Pirata One', cursive;
        }

        .math-subtraction-game-page button {
          padding: 10px 20px;
          font-size: 1.5rem;
          color: #fff;
          border: 2px solid;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .math-subtraction-game-page .mtg-feedback {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          padding: 15px 30px;
          font-size: 2rem;
          color: #fff;
          border: 2px solid #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          border-radius: 10px;
          animation: math-mtg-fadeInOut 1.5s ease;
        }

        .math-subtraction-game-page .mtg-feedback.correct {
          background-color: #228b22;
        }

        .math-subtraction-game-page .mtg-feedback.incorrect {
          background-color: #b22222;
        }

        .math-subtraction-game-page .mtg-level-complete,
        .math-subtraction-game-page .mtg-game-over,
        .math-subtraction-game-page .mtg-level-failed {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(74, 127, 21, 0.9);
          padding: 30px;
          border: 3px solidrgb(254, 7, 7);
          border-radius: 15px;
          text-align: center;
          color: #fff;
        }

        .math-subtraction-game-page .mtg-level-complete h2,
        .math-subtraction-game-page .mtg-game-over h2,
        .math-subtraction-game-page .mtg-level-failed h2 {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        .math-subtraction-game-page .mtg-level-complete p,
        .math-subtraction-game-page .mtg-game-over p,
        .math-subtraction-game-page .mtg-level-failed p {
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .math-subtraction-game-page .mtg-game-over-buttons {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .math-subtraction-game-page .mtg-icon {
          width: 34px;
          height: 34px;
          margin-right: 2px;
        }

        /* Added styles for overlay and celebration */
        .mtg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          z-index: 10;
        }

        .math-subtraction-game-page .mtg-game-over {
          z-index: 11;
          animation: celebration-appear 0.5s ease-out;
        }

        @keyframes math-mtg-reveal {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes math-mtg-fadeInOut {
          0% { opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes celebration-appear {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @media (max-width: 600px) {
          .math-subtraction-game-page {
            font-size: 14px;
          }
        }

        @media (min-width: 1200px) {
          .math-subtraction-game-page {
            font-size: 18px;
          }
        }
      `}</style>

      <div
        className={`mtg-game-container level-${currentLevel}`}
        tyle={{ backgroundImage: `url(${treasureMapImage})` }}
      >
        <div className="mtg-header">
          <span>ඔබේ මට්ටම : {currentLevel}</span>
          <span>ලකුණු : {score}</span>
          <span>
            නිධාන: {treasuresFound} / {treasuresNeeded}
          </span>
        </div>

        <div className="mtg-grid">
          {grid.map((row, rowIdx) =>
            row.map((cell, colIdx) => (
              <div
                key={`<span class="math-inline">\{rowIdx\}\-</span>{colIdx}`}
                className={`mtg-grid-cell ${cell.revealed ? "revealed" : ""}`}
              >
                {cell.revealed && cell.content && (
                  <img
                    src={cell.content}
                    alt="Treasure"
                    className="mtg-treasure"
                  />
                )}
              </div>
            ))
          )}
        </div>

        <div className="mtg-problem-container">
          <div className="mtg-problem">
            {problem.a} - {problem.b} = ?
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="mtg-input"
              placeholder="පිළිතුර ඇතුලත් කරන්න"
              disabled={isAnswering}
            />
            <button type="submit" disabled={isAnswering}>
              නිදන් හාරමු!
            </button>
          </form>
        </div>

        {feedback && (
          <div
            className={`mtg-feedback ${
              feedback.includes("Correct") ? "correct" : "incorrect"
            }`}
          >
            {feedback}
          </div>
        )}

        {isLevelComplete && !isGameOver && (
          <div className="mtg-level-complete">
            <h2>මට්ටම {currentLevel} හරි !</h2>
            <p>විශිෂ්ටයි ඔයා ඔක්කොම වටිනා දේවල් හොයාගෙන !</p>
            <button onClick={nextLevel}>
              {currentLevel < 3 ? "ඉදිරියට" : "Claim Your Bounty!"}
            </button>
          </div>
        )}

        {isLevelFailed && !isGameOver && (
          <div className="mtg-level-failed">
            <h2>වැරදීම් වැඩියි!</h2>
            <p>අඩුපාඩු හදාගමු </p>
            <button onClick={resetLevel}>නැවත උත්සාහ කරමු</button>
          </div>
        )}

        {isGameOver && (
          <>
            <div className="mtg-overlay"></div>
            <div className="mtg-game-over">
              <h2>සුබ පැතුම් දක්ෂ නිදන් සොයන්න්නෝ !</h2>
              <p>අවසන් ලකුණු : {score}</p>
              <div className="mtg-game-over-buttons">
                <button onClick={resetGame}>නැවත සොයමු</button>
                <button onClick={goHome}>මෙණුවට යමු</button>
              </div>
            </div>
            <Confetti
              numberOfPieces={200}
              colors={["#FFD700", "#C0C0C0", "#B8860B"]}
              style={{ zIndex: 12 }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MathSubtractionGamePage;

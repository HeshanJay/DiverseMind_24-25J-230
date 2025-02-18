import React, { useState, useEffect } from "react";
import backgroundImage from "../../../assets/background_images/baord.png";

const INITIAL_TIMER = 40;
const MAX_ROUNDS = 5;
const SCORE_INCREMENT = 10;

const ColorChange3 = () => {
  const [rgbColor, setRgbColor] = useState(generateRandomColor());
  const [options, setOptions] = useState(generateColorOptions(rgbColor));
  const [feedback, setFeedback] = useState("");
  const [feedbackClass, setFeedbackClass] = useState("");
  const [timer, setTimer] = useState(INITIAL_TIMER);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    () => parseInt(localStorage.getItem("bestScore")) || 0
  );
  const [gameOver, setGameOver] = useState(false);

  // Generate a random RGB color
  function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  // Generate random color options including the correct one
  function generateColorOptions(correctColor) {
    const options = new Set([correctColor]);
    while (options.size < 8) {
      options.add(generateRandomColor());
    }
    return Array.from(options).sort(() => Math.random() - 0.5);
  }

  // Reset for a new round
  const resetRound = () => {
    if (round < MAX_ROUNDS) {
      const newColor = generateRandomColor();
      setRgbColor(newColor);
      setOptions(generateColorOptions(newColor));

      // Clear feedback after a short delay
      setTimeout(() => {
        setFeedback("");
        setFeedbackClass("");
      }, 1000);

      setTimer(INITIAL_TIMER);
      setRound((prevRound) => prevRound + 1);
    } else {
      setGameOver(true);
    }
  };

  // Handle user's guess
  const handleGuess = (guess) => {
    if (gameOver) return;

    if (guess === rgbColor) {
      setFeedback("✔ Correct!");
      setFeedbackClass("correct");
      const newScore = score + SCORE_INCREMENT;
      setScore(newScore);

      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem("bestScore", newScore);
      }
      resetRound();
    } else {
      setFeedback("✗ Wrong!");
      setFeedbackClass("wrong");
    }
  };

  // Timer countdown
  useEffect(() => {
    if (gameOver || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        const newTimer = prevTimer - 0.1;
        return newTimer > 0 ? newTimer : 0;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [timer, gameOver]);

  // Handle timeout
  useEffect(() => {
    if (timer <= 0 && !gameOver) {
      setFeedback("✗ Timeout!");
      setFeedbackClass("timeout");
      resetRound();
    }
  }, [timer, gameOver]);

  // Restart game when game over
  const restartGame = () => {
    const newColor = generateRandomColor();
    setRgbColor(newColor);
    setOptions(generateColorOptions(newColor));
    setFeedback("");
    setFeedbackClass("");
    setTimer(INITIAL_TIMER);
    setRound(1);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="text-center p-10 font-sans bg-white/80 rounded shadow-md max-w-lg">
        <div className="flex justify-around max-w-md mx-auto mb-4">
          <div>
            <p>TIME</p>
            <h2>{timer.toFixed(1)}</h2>
          </div>
          <div>
            <p>ROUND</p>
            <h2>
              {round}/{MAX_ROUNDS}
            </h2>
          </div>
          <div>
            <p>SCORE</p>
            <h2>{score}</h2>
          </div>
          <div>
            <p>BEST</p>
            <h2>{bestScore}</h2>
          </div>
        </div>
        {feedback && (
          <div className="mb-4 text-2xl font-bold">
            <span
              className={
                feedbackClass === "correct"
                  ? "text-green-600"
                  : feedbackClass === "wrong" || feedbackClass === "timeout"
                  ? "text-red-600"
                  : ""
              }
            >
              {feedback}
            </span>
          </div>
        )}
        {!gameOver ? (
          <>
            <div
              className="p-5 m-5 max-w-sm mx-auto rounded-xl"
              style={{ backgroundColor: rgbColor }}
            >
              <h2 className="text-white">What KOLOR is this?</h2>
            </div>
            <div className="grid grid-cols-4 gap-5 w-full max-w-md mx-auto">
              {options.map((color) => (
                <button
                  key={color}
                  onClick={() => handleGuess(color)}
                  className="w-24 h-24 rounded-full shadow-md border-0 cursor-pointer"
                  style={{ backgroundColor: color }}
                  aria-label={`Choose color ${color}`}
                ></button>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-10">
            <h2 className="text-2xl">Game Over! Thanks for playing.</h2>
            <p>
              Your Total Score: <strong>{score}</strong>
            </p>
            <button
              onClick={restartGame}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Restart Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorChange3;

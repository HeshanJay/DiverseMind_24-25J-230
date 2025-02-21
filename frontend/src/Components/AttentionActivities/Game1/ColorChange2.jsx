import React, { useState, useEffect } from "react";
import backgroundImage from "../../../assets/background_images/colorimg4.png";
import { IoMdRefresh } from "react-icons/io";
import { GiGamepad } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";

const INITIAL_TIMER = 40;
const MAX_ROUNDS = 5;
const SCORE_INCREMENT = 10;

const ColorChange2 = () => {
  const [rgbColor, setRgbColor] = useState(generateRandomColor());
  const [options, setOptions] = useState(generateColorOptions(rgbColor));
  const [feedback, setFeedback] = useState("");
  const [feedbackClass, setFeedbackClass] = useState("");
  const [timer, setTimer] = useState(INITIAL_TIMER);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(
    () => parseInt(localStorage.getItem("colorChange2BestScore")) || 0
  );
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); // New state to track if the game has started

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
    while (options.size < 6) {
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
      setFeedback("✔ නිවැරදි!");
      setFeedbackClass("correct");
      const newScore = score + SCORE_INCREMENT;
      setScore(newScore);

      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem("colorChange2BestScore", newScore); // Save specific to ColorChange2
      }
      resetRound();
    } else {
      setFeedback("✗ වැරදි!");
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
      setFeedback("✗ කාලය අවසන්!");
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

  // Handler for starting the game
  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image with brightness filter */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: "brightness(50%)",
        }}
      />

      {/* Intro Overlay before the game starts */}
      {!gameStarted && !gameOver && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black bg-opacity-50 p-4">
          <h1 className="text-5xl font-bold text-yellow-300 mb-4">
            දෙවැනි අදිරයෙන් විනෝද වෙමු!
          </h1>
          <p className="text-xl text-white mb-6 max-w-lg">
            මෙම ක්‍රිඩාවේ ඔබ කළ යුත්තේ නිවැරදි වර්ණය හඳුනා ගැනීම. මෙහි කාලය ගැන
            සැලකිලිමත් වීම අනිවාර්යයි. අදිරයෙන් අදිරය අභ්‍යාස සංකිරණය වන බව මතක
            තබා ගන්න.ඔබ සුදානම් ද?
          </p>
          <button
            onClick={handleStartGame}
            className="px-6 py-3 bg-green-500 rounded-full text-2xl text-white hover:bg-green-600 transition duration-200"
          >
            ආරම්භ කරමු
          </button>
        </div>
      )}

      {/* Top Bar: TIME, ROUND, SCORE, BEST */}
      {gameStarted && (
        <div className="absolute top-0 left-0 right-0 z-50 text-white flex justify-center items-center font-bold text-2xl space-x-8 p-4">
          <div>
            <p>කාලය</p>
            <center>
              <h2>{timer.toFixed(1)}</h2>
            </center>
          </div>
          <div>
            <p>වාර</p>
            <h2>
              <center>
                {round}/{MAX_ROUNDS}{" "}
              </center>
            </h2>
          </div>
          <div>
            <p>ලකුණු</p>
            <center>
              <h2>{score}</h2>
            </center>
          </div>
          <div>
            <p>වැඩිම ලකුණු</p>
            <center>
              <h2>{bestScore}</h2>
            </center>
          </div>
        </div>
      )}

      {/* Feedback fixed at top right */}
      {gameStarted && feedback && (
        <div
          className={`fixed top-4 right-4 text-4xl font-bold ${
            feedbackClass === "correct"
              ? "text-green-600"
              : feedbackClass === "wrong" || feedbackClass === "timeout"
              ? "text-red-600"
              : ""
          }`}
        >
          {feedback}
        </div>
      )}

      {/* Main Content */}
      {gameStarted && (
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="relative text-center p-5 font-sans">
            {!gameOver ? (
              <>
                <div
                  className="p-5 m-5 max-w-sm mx-auto rounded-xl"
                  style={{ backgroundColor: rgbColor }}
                >
                  <h2 className="text-white">මෙම වර්ණය කුමක් ද?</h2>
                </div>
                <div className="grid grid-cols-3 gap-5 w-full max-w-xs mx-auto">
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
              <div className="mt-10 text-center p-4">
                <h2 className="text-3xl font-bold text-yellow-300">
                  ක්‍රිඩාව අවසන් !
                </h2>
                <p className="text-xl text-yellow-300 mt-2">
                  ඔබේ ලකුණු: <strong>{score}</strong>
                </p>
                <div className="flex justify-center gap-4 mt-6">
                  {/* Restart button */}
                  <button
                    onClick={restartGame}
                    className="w-16 h-16 bg-green-400 rounded-full shadow-md flex items-center justify-center hover:bg-green-500 transition"
                    aria-label="Restart Game"
                  >
                    <IoMdRefresh size={32} color="#fff" />
                  </button>
                  {/* Button directing to attentiongame1 */}
                  <button
                    onClick={() => (window.location.href = "/attentiongame1")}
                    className="w-16 h-16 bg-blue-400 rounded-full shadow-md flex items-center justify-center hover:bg-blue-500 transition"
                    aria-label="Attention Game"
                  >
                    <GiGamepad size={32} color="#fff" />
                  </button>
                  {/* Next button directing to /attentionInterventions */}
                  <button
                    onClick={() =>
                      (window.location.href = "/attentionInterventions")
                    }
                    className="w-16 h-16 bg-red-400 rounded-full shadow-md flex items-center justify-center hover:bg-red-500 transition"
                    aria-label="Next"
                  >
                    <FaArrowRight size={32} color="#fff" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorChange2;

import React, { useState, useEffect } from "react";
import backgroundImage from "../../../assets/background_images/bb3.jpg";
import popupboard from "../../../assets/Attention/note2.png";
import zebraImage from "../../../assets/Attention/zebra.png";
import elephantImage from "../../../assets/Attention/lion.png";
import b2Image from "../../../assets/Attention/b7.png";
import feebackImage from "../../../assets/Attention/t4.png";
import clickSound from "../../../assets/Audios/click_sound.mp3";
import correctSound from "../../../assets/Audios/correct_answer.mp3";
import wrongSound from "../../../assets/Audios/wrong_answer.mp3";
import timeoutSound from "../../../assets/Audios/timeout.mp3";
import gameoverSound from "../../../assets/Audios/celebrate.mp3";
import { FaRedo, FaArrowRight, FaEllipsisH } from "react-icons/fa";

const INITIAL_TIMER = 40;
const MAX_ROUNDS = 5;
const SCORE_INCREMENT = 10;

const ColorChange = () => {
  const [rgbColor, setRgbColor] = useState(generateRandomColor());
  const [options, setOptions] = useState(generateColorOptions(rgbColor));
  const [feedback, setFeedback] = useState("");
  const [feedbackClass, setFeedbackClass] = useState("");
  const [timer, setTimer] = useState(INITIAL_TIMER);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Function to play the click sound (only for start button)
  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  // Function to play correct answer sound
  const playCorrectSound = () => {
    const audio = new Audio(correctSound);
    audio.play();
  };

  // Function to play wrong answer sound
  const playWrongSound = () => {
    const audio = new Audio(wrongSound);
    audio.play();
  };

  // Function to play timeout sound
  const playTimeoutSound = () => {
    const audio = new Audio(timeoutSound);
    audio.play();
  };

  // Function to play game over sound
  const playGameOverSound = () => {
    const audio = new Audio(gameoverSound);
    audio.play();
  };

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
    while (options.size < 4) {
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
      setTimeout(() => {
        setFeedback("");
        setFeedbackClass("");
      }, 1000);
      setTimer(INITIAL_TIMER);
      setRound((prevRound) => prevRound + 1);
    } else {
      playGameOverSound(); // Play game over sound when game ends
      setGameOver(true);
    }
  };

  // Handle user's guess
  const handleGuess = (guess) => {
    if (gameOver) return;

    if (guess === rgbColor) {
      playCorrectSound(); // Play correct answer sound
      setFeedback("✔ නිවැරදි!");
      setFeedbackClass("correct");
      setScore((prevScore) => prevScore + SCORE_INCREMENT);
      resetRound();
    } else {
      playWrongSound(); // Play wrong answer sound
      setFeedback("✗ වැරදි!");
      setFeedbackClass("wrong");
    }
  };

  // Timer countdown (only when the game has started)
  useEffect(() => {
    if (!gameStarted || gameOver || timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        const newTimer = prevTimer - 0.1;
        return newTimer > 0 ? newTimer : 0;
      });
    }, 10);
    return () => clearInterval(interval);
  }, [gameStarted, timer, gameOver]);

  // Handle timeout
  useEffect(() => {
    if (!gameStarted) return;
    if (timer <= 0 && !gameOver) {
      playTimeoutSound(); // Play timeout sound
      setFeedback("✗ කාලය අවසන්!");
      setFeedbackClass("timeout");
      resetRound();
    }
  }, [gameStarted, timer, gameOver]);

  // Restart game
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

  // Start game with click sound
  const handleStartGame = () => {
    playClickSound(); // Play click sound ONLY when start button is clicked
    setGameStarted(true);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image (dimmed) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: "brightness(50%)",
        }}
      />

      {/* Intro Overlay (before the game starts) */}
      {!gameStarted && !gameOver && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 bg-black bg-opacity-50">
          <h2 className="text-yellow-500 font-extrabold text-4xl mb-4">
            පලමු අදියරයෙන් විනෝද වෙමු !
          </h2>
          <div className="relative w-[2200px] md:w-[1000px] h-[1100px] mt-4 rounded-xl shadow-lg overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${popupboard})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                opacity: 0.9,
                transform: "translateY(-10px)",
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center p-4 transform translate-y-6">
              <p className="text-white text-lg leading-relaxed mb-4 text-center">
                මෙම ක්‍රිඩාවේ ඔබ කළ යුත්තේ <br />
                නිවැරදි වර්ණය හඳුනා ගැනීම. <br />
                මෙහි කාලය ගැන සැලකිලිමත් වීම <br />
                අනිවාර්යයි. අදිරයෙන් අදිරය අභ්‍යාස <br />
                සංකිරණය වන බව මතක <br />
                තබා ගන්න. <br />
                ඔබ සුදානම් ද?
              </p>
              <button
                onClick={handleStartGame}
                className="mt-10 bg-green-500 text-white font-semibold text-xl px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition"
              >
                ආරම්භ කරමු
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show zebra & timer (only if the game has started and isn't over) */}
      {gameStarted && !gameOver && (
        <div style={{ position: "absolute", top: 0, left: 0, zIndex: 60 }}>
          <div style={{ position: "relative" }}>
            <img
              src={zebraImage}
              alt="Zebra"
              style={{ width: "250px", height: "auto" }}
            />
            {/* Timer: DO NOT MOVE THIS! */}
            <div
              style={{
                position: "absolute",
                bottom: "60px",
                width: "100%",
                textAlign: "center",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              <p style={{ fontSize: "1.5rem", margin: 0 }}>කාලය</p>
              <h2 style={{ fontSize: "1.3rem", margin: 0 }}>
                {timer.toFixed(1)}
              </h2>
            </div>
          </div>

          {/* Elephant (lion) image below zebra */}
          <div style={{ position: "relative" }}>
            <img
              src={elephantImage}
              alt="Elephant"
              style={{ width: "250px", height: "auto", marginTop: "10px" }}
            />
            {/* Place වාර (round) on top-left of the elephant image in black */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "50px",
                color: "black",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              <p style={{ fontSize: "1.5rem", margin: 0 }}>වාර</p>
              <h2 style={{ fontSize: "1.3rem", margin: 0 }}>
                {round}/{MAX_ROUNDS}
              </h2>
            </div>
          </div>
        </div>
      )}

      {/* b2 image with score (only if the game has started and isn't over) */}
      {gameStarted && !gameOver && (
        <div
          style={{
            position: "absolute",
            bottom: "100px",
            right: "20px",
            width: "250px",
            zIndex: 70,
          }}
        >
          <img
            src={b2Image}
            alt="b2"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "70px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "black",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            <p style={{ fontSize: "1.5rem", margin: 0 }}>ලකුණු</p>
            <h2 style={{ fontSize: "1.3rem", margin: 0 }}>{score}</h2>
          </div>
        </div>
      )}

      {/* Feedback at top right (during game) */}
      {gameStarted && !gameOver && feedback && (
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

      {/* Main Game Content (only if gameStarted && !gameOver) */}
      {gameStarted && !gameOver && (
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="bg-white/50 p-6 rounded-xl shadow-lg text-center">
            <div
              className="p-5 m-5 max-w-sm mx-auto rounded-xl"
              style={{ backgroundColor: rgbColor }}
            >
              <h2 className="text-white">මෙම වර්ණය කුමක් ද?</h2>
            </div>
            <div className="flex justify-center flex-wrap gap-5 w-72 mx-auto">
              {options.map((color) => (
                <button
                  key={color}
                  onClick={() => handleGuess(color)}
                  style={{
                    backgroundColor: color,
                    width: "96px",
                    height: "96px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    boxShadow: `
                      inset 2px 2px 5px rgba(0, 0, 0, 0.3),
                      2px 2px 5px rgba(0, 0, 0, 0.3)
                    `,
                    margin: "0 8px",
                    border: "none",
                    outline: "none",
                  }}
                  aria-label={`Choose color ${color}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Game Over Screen */}
      {gameOver && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div
            className="relative bg-center bg-no-repeat bg-contain text-center"
            style={{
              backgroundImage: `url(${feebackImage})`,
              width: "490px",
              height: "490px",
            }}
          >
            {/* 
              "justify-end" to place content near the bottom,
              and some padding-bottom to ensure it's above the bottom edge
            */}
            <div className="absolute inset-0 flex flex-col items-center justify-end p-21 pb-11">
              <h2 className="text-3xl font-bold text-black-300 mt-2">
                ක්‍රිඩාව අවසන් !
              </h2>
              <p className="text-xl text-black-300 mt-2">
                ඔබේ ලකුණු: <strong>{score}</strong>
              </p>
              <div className="flex flex-row gap-4 mt-6">
                <button
                  onClick={restartGame}
                  className="w-16 h-16 flex items-center justify-center bg-blue-500 rounded-full text-white hover:bg-blue-600 transition duration-200"
                  aria-label="Restart Game"
                >
                  <FaRedo size={28} />
                </button>
                <button
                  onClick={() => (window.location.href = "/attentiongame1")}
                  className="w-16 h-16 flex items-center justify-center bg-green-500 rounded-full text-white hover:bg-green-600 transition duration-200"
                  aria-label="Next Game"
                >
                  <FaArrowRight size={28} />
                </button>
                <button
                  onClick={() =>
                    (window.location.href = "/attentionInterventions")
                  }
                  className="w-16 h-16 flex items-center justify-center bg-purple-500 rounded-full text-white hover:bg-purple-600 transition duration-200"
                  aria-label="More Options"
                >
                  <FaEllipsisH size={28} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/*         Utility Functions        */

function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generateColorOptions(correctColor) {
  const options = new Set([correctColor]);
  while (options.size < 4) {
    options.add(generateRandomColor());
  }
  return Array.from(options).sort(() => Math.random() - 0.5);
}

export default ColorChange;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaRedo, FaArrowRight, FaEllipsisH } from "react-icons/fa";
import MarioImg from "../../../assets/background_images/AttentionGames/Game3/stadium3.png";
import MontyMole from "../../../assets/background_images/AttentionGames/Game3/moly1.png";
import Pipe from "../../../assets/background_images/AttentionGames/Game3/pot1.png";
import PiranhaPlant from "../../../assets/background_images/AttentionGames/Game3/plant1.png";
import Soil from "../../../assets/background_images/AttentionGames/Game3/grass5.jpg";

const Display2 = () => {
  const [currMole, setCurrMole] = useState(null);
  const [currPlant1, setCurrPlant1] = useState(null);
  const [currPlant2, setCurrPlant2] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  const navigate = useNavigate();

  // Refs to avoid stale closures in setInterval callbacks
  const gameOverRef = useRef(gameOver);
  const currMoleRef = useRef(currMole);
  const currPlant1Ref = useRef(currPlant1);
  const currPlant2Ref = useRef(currPlant2);

  // Update refs when state changes
  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);

  useEffect(() => {
    currMoleRef.current = currMole;
  }, [currMole]);

  useEffect(() => {
    currPlant1Ref.current = currPlant1;
  }, [currPlant1]);

  useEffect(() => {
    currPlant2Ref.current = currPlant2;
  }, [currPlant2]);

  // Load bestScore for Display2 from localStorage on mount using a unique key
  useEffect(() => {
    const storedBestScore = localStorage.getItem("bestScoreDisplay2");
    if (storedBestScore) {
      setBestScore(parseInt(storedBestScore, 10));
    }
  }, []);

  // Helper function to generate a random tile index (0-15 for a 4x4 grid)
  const getRandomTile = () => Math.floor(Math.random() * 16);

  // Start the game and intervals after user clicks Start Game
  useEffect(() => {
    if (!gameStarted) return;

    // Reset state when starting the game
    setScore(0);
    setGameOver(false);
    setCurrMole(null);
    setCurrPlant1(null);
    setCurrPlant2(null);

    // Mole interval
    const moleInterval = setInterval(() => {
      if (gameOverRef.current) return;
      const random = getRandomTile();
      // Skip if the random tile is occupied by either plant
      if (random === currPlant1Ref.current || random === currPlant2Ref.current)
        return;
      setCurrMole(random);
    }, 1000);

    // Plant 1 interval
    const plantInterval1 = setInterval(() => {
      if (gameOverRef.current) return;
      const random = getRandomTile();
      // Skip if this tile is where the mole or the second plant is
      if (random === currMoleRef.current || random === currPlant2Ref.current)
        return;
      setCurrPlant1(random);
    }, 2000);

    // Plant 2 interval
    const plantInterval2 = setInterval(() => {
      if (gameOverRef.current) return;
      const random = getRandomTile();
      // Skip if this tile is where the mole or the first plant is
      if (random === currMoleRef.current || random === currPlant1Ref.current)
        return;
      setCurrPlant2(random);
    }, 2000);

    return () => {
      clearInterval(moleInterval);
      clearInterval(plantInterval1);
      clearInterval(plantInterval2);
    };
  }, [gameStarted]);

  // When the game ends, update the best score if necessary and save to localStorage using a unique key.
  useEffect(() => {
    if (gameOver && score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScoreDisplay2", score);
    }
  }, [gameOver, score, bestScore]);

  // Handler for clicking on a tile
  const handleTileClick = (index) => {
    if (gameOver) return;

    if (index === currMole) {
      setScore((prev) => prev + 10);
    } else if (index === currPlant1 || index === currPlant2) {
      setGameOver(true);
    }
  };

  // Handler for starting the game
  const handleStartGame = () => {
    setGameStarted(true);
  };

  // Handler for retrying the game
  const handleRetry = () => {
    // Restart the game by toggling gameStarted off and on.
    setGameStarted(false);
    setTimeout(() => {
      setGameStarted(true);
    }, 0);
  };

  // Determine stars based on score
  const getStars = (score) => {
    let starCount = 0;
    if (score >= 100) starCount = 3;
    else if (score >= 50) starCount = 2;
    else if (score > 0) starCount = 1;
    return Array.from({ length: starCount });
  };

  // Game Over overlay component with horizontal, circled buttons using React Icons
  const GameOverOverlay = () => {
    const stars = getStars(score);
    return (
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black bg-opacity-50 p-4">
        <h2 className="text-5xl font-bold text-yellow-300 mb-4">
          {" "}
          ක්‍රිඩාව අවසන් !
        </h2>
        <p className="text-3xl text-white mb-2">ඔබේ ලකුණු: {score}</p>
        <p className="text-3xl text-white mb-2">වැඩිම ලකුණු: {bestScore}</p>
        <div className="flex mb-6">
          {stars.map((_, index) => (
            <span key={index} className="text-4xl text-yellow-400">
              ⭐
            </span>
          ))}
        </div>
        {/* Horizontal button container */}
        <div className="flex flex-row gap-4">
          <button
            onClick={handleRetry}
            className="w-16 h-16 flex items-center justify-center bg-blue-500 rounded-full text-white hover:bg-blue-600 transition duration-200"
          >
            <FaRedo size={28} />
          </button>
          <button
            onClick={() => navigate("/attentiongame3")}
            className="w-16 h-16 flex items-center justify-center bg-green-500 rounded-full text-white hover:bg-green-600 transition duration-200"
          >
            <FaArrowRight size={28} />
          </button>
          <button
            onClick={() => navigate("/attentionInterventions")}
            className="w-16 h-16 flex items-center justify-center bg-purple-500 rounded-full text-white hover:bg-purple-600 transition duration-200"
          >
            <FaEllipsisH size={28} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image with a dark filter */}
      <div
        className="absolute inset-0 bg-fixed bg-cover"
        style={{
          backgroundImage: `url(${MarioImg})`,
          filter: "brightness(50%)",
        }}
      />

      {/* Intro Overlay before the game starts */}
      {!gameStarted && !gameOver && (
        <div className="relative z-20 flex flex-col items-center justify-center h-screen text-center p-4">
          <h1 className="text-5xl font-bold text-yellow-300 mb-4">
            දෙවැනි අදිරයෙන් විනෝද වෙමු!
          </h1>
          <p className="text-xl text-white mb-6 max-w-lg">
            Hi there, little explorer! In this game, tap on the cute mole to
            score points. But be extra careful – if you tap on one of the grumpy
            plants, the game ends. Ready for some fun?
          </p>
          <button
            onClick={handleStartGame}
            className="px-6 py-3 bg-green-500 rounded-full text-2xl text-white hover:bg-green-600 transition duration-200"
          >
            ආරම්භ කරමු
          </button>
        </div>
      )}

      {/* Game Content */}
      {gameStarted && !gameOver && (
        <div className="relative z-10 flex flex-col items-center py-8">
          <h1 className="text-4xl font-bold text-white mb-4">Score: {score}</h1>
          <div
            id="board"
            className="grid grid-cols-4 grid-rows-4 w-[480px] h-[480px] mx-auto border-4 border-white rounded-2xl bg-cover"
            style={{ backgroundImage: `url(${Soil})` }}
          >
            {Array.from({ length: 16 }, (_, index) => (
              <div
                key={index}
                onClick={() => handleTileClick(index)}
                className="w-[120px] h-[120px] flex items-center justify-center cursor-pointer bg-no-repeat bg-center bg-cover"
                style={{
                  backgroundImage: `url(${Pipe})`,
                  backgroundSize: "contain",
                }}
              >
                {index === currMole && (
                  <img
                    src={MontyMole}
                    alt="mole"
                    className="w-[80px] h-[80px] pointer-events-none select-none"
                    style={{ transform: "translateY(-20%)" }}
                  />
                )}
                {index === currPlant1 && (
                  <img
                    src={PiranhaPlant}
                    alt="plant"
                    className="w-[80px] h-[80px] pointer-events-none select-none"
                    style={{ transform: "translateY(-20%)" }}
                  />
                )}
                {index === currPlant2 && (
                  <img
                    src={PiranhaPlant}
                    alt="plant"
                    className="w-[80px] h-[80px] pointer-events-none select-none"
                    style={{ transform: "translateY(-20%)" }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Game Over Overlay */}
      {gameOver && <GameOverOverlay />}
    </div>
  );
};

export default Display2;

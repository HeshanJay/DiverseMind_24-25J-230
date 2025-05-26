import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaRedo, FaArrowRight, FaEllipsisH } from "react-icons/fa";
import MarioImg from "../../../assets/background_images/AttentionGames/Game3/stadium3.png";
import MontyMole from "../../../assets/background_images/AttentionGames/Game3/moly1.png";
import Pipe from "../../../assets/background_images/AttentionGames/Game3/pot1.png";
import PiranhaPlant from "../../../assets/background_images/AttentionGames/Game3/plant1.png";
import Soil from "../../../assets/background_images/AttentionGames/Game3/grass5.jpg";
import clickSound from "../../../assets/Audios/click_sound.mp3";
import punch from "../../../assets/Audios/punch.mp3";
import gameover from "../../../assets/Audios/gameover.mp3";

// Function to play the click sound
const playClickSound = () => {
  const audio = new Audio(clickSound);
  audio.play();
};

// Function to play the punch sound
const playPunchSound = () => {
  const audio = new Audio(punch);
  audio.play();
};

// Function to play the game over sound
const playGameOverSound = () => {
  const audio = new Audio(gameover);
  audio.play();
};

const Display3 = () => {
  const [currMole, setCurrMole] = useState(null);
  const [currPlants, setCurrPlants] = useState([]); // Array of 5 plant positions
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  const navigate = useNavigate();

  // Refs to avoid stale closures in setInterval callbacks
  const gameOverRef = useRef(gameOver);
  const currMoleRef = useRef(currMole);
  const currPlantsRef = useRef(currPlants);

  // Update refs when state changes
  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);

  useEffect(() => {
    currMoleRef.current = currMole;
  }, [currMole]);

  useEffect(() => {
    currPlantsRef.current = currPlants;
  }, [currPlants]);

  // Load bestScore for Display3 from localStorage using a unique key
  useEffect(() => {
    const storedBestScore = localStorage.getItem("bestScoreDisplay3");
    if (storedBestScore) {
      setBestScore(parseInt(storedBestScore, 10));
    }
  }, []);

  // Play game over sound when game ends
  useEffect(() => {
    if (gameOver) {
      playGameOverSound();
    }
  }, [gameOver]);

  // Helper function to generate a random tile index (0-24 for a 5x5 grid)
  const getRandomTile = () => Math.floor(Math.random() * 25);

  // Helper function to get a random tile excluding provided indices
  const getRandomTileExcluding = (exclusions) => {
    let tile;
    do {
      tile = getRandomTile();
    } while (exclusions.includes(tile));
    return tile;
  };

  // Start the game and intervals after user clicks Start Game
  useEffect(() => {
    if (!gameStarted) return;

    // Reset game state on start
    setScore(0);
    setGameOver(false);
    setCurrMole(null);
    setCurrPlants([]);

    // Mole interval (updates every second)
    const moleInterval = setInterval(() => {
      if (gameOverRef.current) return;
      const random = getRandomTile();
      // If the random tile is occupied by any plant, skip updating
      if (currPlantsRef.current.includes(random)) return;
      setCurrMole(random);
    }, 1000);

    // Plants interval (updates every 2 seconds)
    const plantInterval = setInterval(() => {
      if (gameOverRef.current) return;
      // Exclude the current mole position (if it exists)
      const exclusions =
        currMoleRef.current !== null ? [currMoleRef.current] : [];
      let newPlants = [];
      for (let i = 0; i < 5; i++) {
        newPlants.push(getRandomTileExcluding([...exclusions, ...newPlants]));
      }
      setCurrPlants(newPlants);
    }, 2000);

    return () => {
      clearInterval(moleInterval);
      clearInterval(plantInterval);
    };
  }, [gameStarted]);

  // When the game ends, update the best score if necessary and save to localStorage.
  useEffect(() => {
    if (gameOver && score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScoreDisplay3", score);
    }
  }, [gameOver, score, bestScore]);

  // Handler for clicking on a tile
  const handleTileClick = (index) => {
    if (gameOver) return;

    if (index === currMole) {
      playPunchSound(); // Play punch sound when hitting mole
      setScore((prev) => prev + 10);
    } else if (currPlants.includes(index)) {
      playPunchSound(); // Play punch sound when hitting plant
      setGameOver(true);
    }
  };

  // Handler for starting the game
  const handleStartGame = () => {
    playClickSound(); // Play sound when starting the game
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
      {/* Background image with dark filter */}
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
            තුන්වැනි අදියරයෙන් විනෝද වෙමු!
          </h1>
          <p className="text-xl text-white mb-6 max-w-lg">
            ආයුබෝවන් පුංච් වීරයා, මෙහි ඇති පෝච්චි වලින් මොල් නමැති සත්වයා සහ
            කෝපයට පත් පැළෑටියක් මතු වේ. පැළෑටියට තට්ටු නොකර හැකි ඉක්මනින්
            සත්වයාට තට්ටු කරන්න. ඔබ සූදානම් ද විනෝදවන්න!
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
          <h1 className="text-4xl font-bold text-white mb-4">
            {gameOver ? `GAME OVER: ${score}` : `ලකුණු: ${score}`}
          </h1>
          <div
            id="board"
            className="grid grid-cols-5 grid-rows-5 w-[480px] h-[480px] mx-auto border-4 border-white rounded-2xl bg-cover"
            style={{ backgroundImage: `url(${Soil})` }}
          >
            {Array.from({ length: 25 }, (_, index) => (
              <div
                key={index}
                onClick={() => handleTileClick(index)}
                className="flex items-center justify-center cursor-pointer bg-no-repeat bg-center bg-cover"
                style={{
                  width: "96px",
                  height: "96px",
                  backgroundImage: `url(${Pipe})`,
                  backgroundSize: "contain",
                }}
              >
                {index === currMole && (
                  <img
                    src={MontyMole}
                    alt="mole"
                    className="pointer-events-none select-none"
                    style={{
                      width: "60px",
                      height: "60px",
                      transform: "translateY(-20%)",
                    }}
                  />
                )}
                {currPlants.includes(index) && (
                  <img
                    src={PiranhaPlant}
                    alt="plant"
                    className="pointer-events-none select-none"
                    style={{
                      width: "60px",
                      height: "60px",
                      transform: "translateY(-20%)",
                    }}
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

export default Display3;

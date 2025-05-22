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

const Display1 = () => {
  const [currMole, setCurrMole] = useState(null);
  const [currPlant, setCurrPlant] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  const navigate = useNavigate();

  // Refs to avoid stale closures in setInterval callbacks
  const gameOverRef = useRef(gameOver);
  const currMoleRef = useRef(currMole);
  const currPlantRef = useRef(currPlant);

  // Update refs when state changes
  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);

  useEffect(() => {
    currMoleRef.current = currMole;
  }, [currMole]);

  useEffect(() => {
    currPlantRef.current = currPlant;
  }, [currPlant]);

  // Load bestScore from localStorage on mount
  useEffect(() => {
    const storedBestScore = localStorage.getItem("bestScore");
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

  // Helper function to generate a random tile index (0-8)
  const getRandomTile = () => Math.floor(Math.random() * 9);

  // Start the game and intervals after user clicks Start Game
  useEffect(() => {
    if (!gameStarted) return;

    // Reset score and game over state when starting
    setScore(0);
    setGameOver(false);
    setCurrMole(null);
    setCurrPlant(null);

    const moleInterval = setInterval(() => {
      if (gameOverRef.current) return;
      const random = getRandomTile();
      // If the random tile is where the plant is, skip this cycle
      if (currPlantRef.current === random) return;
      setCurrMole(random);
    }, 1000);

    const plantInterval = setInterval(() => {
      if (gameOverRef.current) return;
      const random = getRandomTile();
      // If the random tile is where the mole is, skip this cycle
      if (currMoleRef.current === random) return;
      setCurrPlant(random);
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
      localStorage.setItem("bestScore", score);
    }
  }, [gameOver, score, bestScore]);

  // Handler for clicking on a tile
  const handleTileClick = (index) => {
    if (gameOver) return;

    if (index === currMole) {
      playPunchSound(); // Play punch sound when hitting mole
      setScore((prev) => prev + 10);
    } else if (index === currPlant) {
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
    // Reset the game by restarting the gameStarted flag.
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

  // Game Over overlay component with horizontal, circled buttons using only React Icons
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
      {/* Background image */}
      <div
        className="absolute inset-0 bg-fixed bg-cover"
        style={{
          backgroundImage: `url(${MarioImg})`,
          filter: "brightness(50%)",
        }}
      />

      {/* Intro Overlay before game starts */}
      {!gameStarted && !gameOver && (
        <div className="relative z-20 flex flex-col items-center justify-center h-screen text-center p-4">
          <h1 className="text-5xl font-bold text-yellow-300 mb-4">
            පලමු අදිරයෙන් විනෝද වෙමු !
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

      {/* Game Content: Only show when game is started and not over */}
      {gameStarted && !gameOver && (
        <div className="relative z-10 flex flex-col items-center py-8">
          <h1 className="text-4xl font-bold text-white mb-4">ලකුණු: {score}</h1>
          <div
            id="board"
            className="grid grid-cols-3 grid-rows-3 w-[480px] h-[480px] mx-auto border-4 border-white rounded-2xl bg-cover"
            style={{ backgroundImage: `url(${Soil})` }}
          >
            {Array.from({ length: 9 }, (_, index) => (
              <div
                key={index}
                onClick={() => handleTileClick(index)}
                className="w-[160px] h-[160px] flex items-center justify-center cursor-pointer bg-no-repeat bg-center bg-cover"
                style={{
                  backgroundImage: `url(${Pipe})`,
                  backgroundSize: "80%",
                }}
              >
                {index === currMole && (
                  <img
                    src={MontyMole}
                    alt="mole"
                    className="w-[100px] h-[100px] pointer-events-none select-none"
                    style={{ transform: "translateY(-20%)" }}
                  />
                )}
                {index === currPlant && (
                  <img
                    src={PiranhaPlant}
                    alt="plant"
                    className="w-[100px] h-[100px] pointer-events-none select-none"
                    style={{ transform: "translateY(-30%)" }}
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

export default Display1;

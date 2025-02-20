import React, { useState, useEffect } from "react";
import Level1_1 from "../../../../assets/background_images/AttentionGames/Game2/Level1_1.png";
import Level1_1_1 from "../../../../assets/background_images/AttentionGames/Game2/Level1_1.1.png";
import BackImage from "../../../../assets/background_images/AttentionGames/Game2/backimg1_game2.png";
import { IoMdRefresh } from "react-icons/io";
import { GiGamepad } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";

const Screen1 = ({ onTileSelect, onTimeout, onGameComplete }) => {
  const [selectedTile, setSelectedTile] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [progress, setProgress] = useState(100);
  const [gameStarted, setGameStarted] = useState(false); // New state for game start
  const [gameEnded, setGameEnded] = useState(false); // New state for game end

  useEffect(() => {
    if (!gameStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onTimeout();
          setGameEnded(true); // Mark the game as ended
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onTimeout, gameStarted]);

  useEffect(() => {
    setProgress((timeLeft / 10) * 100);
  }, [timeLeft]);

  const tiles = [
    { id: 1, image: Level1_1 },
    { id: 2, image: Level1_1 },
    { id: 3, image: Level1_1 },
    { id: 4, image: Level1_1_1 },
  ];

  const handleTileClick = (id) => {
    if (selectedTile !== id) {
      setSelectedTile(id);
      onTileSelect(id);
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleRestart = () => {
    setGameStarted(false);
    setGameEnded(false);
    setSelectedTile(null);
    setTimeLeft(10);
    onGameComplete(); // Reset any game-related states or actions
  };

  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${BackImage})` }}
    >
      {/* Intro Overlay before the game starts */}
      {!gameStarted && !gameEnded && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black bg-opacity-50 p-4">
          <h1 className="text-5xl font-bold text-yellow-300 mb-4">
            Spot the Difference Game!
          </h1>
          <p className="text-xl text-white mb-6 max-w-lg">
            In this game, you need to spot the differences between two images.
            Click on the tiles to find them before time runs out. Ready to
            start?
          </p>
          <button
            onClick={handleStartGame}
            className="px-6 py-3 bg-green-500 rounded-full text-2xl text-white hover:bg-green-600 transition duration-200"
          >
            Start Game!
          </button>
        </div>
      )}

      {/* Game content when the game starts */}
      {gameStarted && !gameEnded && (
        <>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute top-5 right-5 flex items-center justify-center">
            <svg width="80" height="80" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="orange"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="white"
                strokeWidth="10"
                fill="none"
                strokeDasharray="283"
                strokeDashoffset={(283 * (100 - progress)) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
              <circle cx="50" cy="50" r="30" fill="yellow" />
              <text
                x="50"
                y="55"
                textAnchor="middle"
                fontSize="22"
                fill="black"
                fontWeight="bold"
              >
                {timeLeft}s
              </text>
            </svg>
          </div>
          <div className="relative flex gap-6">
            {tiles.map((tile) => (
              <button
                key={tile.id}
                onClick={() => handleTileClick(tile.id)}
                className={`border p-2 shadow-md rounded-lg transition duration-300 hover:bg-green-400 ${
                  selectedTile === tile.id
                    ? "bg-green-500 scale-110"
                    : "bg-white bg-opacity-90"
                }`}
              >
                <img
                  src={tile.image}
                  alt={`Tile ${tile.id}`}
                  className="w-48 h-48 object-cover rounded-md"
                />
              </button>
            ))}
          </div>
        </>
      )}

      {/* Show restart and other buttons once the game is ended */}
      {gameEnded && (
        <div className="absolute bottom-5 flex gap-6 z-40">
          <button
            onClick={handleRestart}
            className="w-16 h-16 bg-green-400 rounded-full shadow-md flex items-center justify-center hover:bg-green-500 transition"
            aria-label="Restart Game"
          >
            <IoMdRefresh size={32} color="#fff" />
          </button>
          <button
            onClick={() => (window.location.href = "/attentiongame2")}
            className="w-16 h-16 bg-blue-400 rounded-full shadow-md flex items-center justify-center hover:bg-blue-500 transition"
            aria-label="Go to Attention Game 2"
          >
            <GiGamepad size={32} color="#fff" />
          </button>
          <button
            onClick={() => (window.location.href = "/attentionInterventions")}
            className="w-16 h-16 bg-red-400 rounded-full shadow-md flex items-center justify-center hover:bg-red-500 transition"
            aria-label="Next"
          >
            <FaArrowRight size={32} color="#fff" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Screen1;

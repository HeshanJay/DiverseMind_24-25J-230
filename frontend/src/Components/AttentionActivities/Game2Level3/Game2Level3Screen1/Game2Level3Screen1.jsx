import React, { useState, useEffect } from "react";
import Level3_1 from "../../../../assets/background_images/AttentionGames/Game2/Level3_1.png";
import Level3_1_1 from "../../../../assets/background_images/AttentionGames/Game2/Level3_1.1.png";
import BackImage from "../../../../assets/background_images/AttentionGames/Game2/backimg1_game2.png";
import IntroImage from "../../../../assets/Attention/intro4.png"; // New import for intro background image
import { IoMdRefresh } from "react-icons/io";
import { GiGamepad } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";

// Replacing the patchy dashed outline with a solid line border
const solidBorderStyle = {
  border: "3px solid orange",
};

const Game2Level3Screen1 = ({ onTileSelect, onTimeout }) => {
  const [selectedTile, setSelectedTile] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [progress, setProgress] = useState(100);
  const [gameStarted, setGameStarted] = useState(false); // New state for game start
  const [gameEnded, setGameEnded] = useState(false); // New state for game end

  useEffect(() => {
    if (!gameStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeout();
          setGameEnded(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onTimeout, gameStarted]);

  useEffect(() => {
    setProgress((timeLeft / 10) * 100);
  }, [timeLeft]);

  const tiles = [
    { id: 1, image: Level3_1 },
    { id: 2, image: Level3_1 },
    { id: 3, image: Level3_1_1 },
    { id: 4, image: Level3_1 },
    { id: 5, image: Level3_1 },
    { id: 6, image: Level3_1 },
    { id: 7, image: Level3_1 },
    { id: 8, image: Level3_1 },
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
  };

  // Conditionally set the container background:
  // Use the intro background if the game hasn't started yet (and game hasn't ended), otherwise use the main game background.
  const containerBackground =
    !gameStarted && !gameEnded ? IntroImage : BackImage;

  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${containerBackground})` }}
    >
      {/* Intro Overlay before the game starts */}
      {!gameStarted && !gameEnded && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="p-8 rounded shadow-lg text-center bg-gray-900"
            style={solidBorderStyle}
          >
            <h1 className="text-5xl font-bold text-yellow-300 mb-4">
              තුන්වැනි අදිරයෙන් විනෝද වෙමු!
            </h1>
            <p className="text-xl text-white mb-6 max-w-lg mx-auto">
              මෙම ක්‍රිඩාවේ ඔබ කළ යුත්තේ නොගලපෙන රූපය සොයාගැනීම. මෙහි කාලය ගැන
              සැලකිලිමත් වීම අනිවාර්යයි. ඔබ සුදානම් ද?
            </p>
            <button
              onClick={handleStartGame}
              className="px-6 py-3 bg-green-500 rounded-full text-2xl text-white hover:bg-green-600 transition duration-200"
            >
              ආරම්භ කරමු
            </button>
          </div>
        </div>
      )}

      {/* Game content when the game starts */}
      {gameStarted && !gameEnded && (
        <>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          {/* Timer */}
          <div className="absolute top-5 right-5">
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

          {/* Tiles */}
          <div className="relative grid grid-cols-4 gap-6">
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

export default Game2Level3Screen1;

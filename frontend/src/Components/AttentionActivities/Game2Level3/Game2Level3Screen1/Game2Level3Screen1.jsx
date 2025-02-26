import React, { useState, useEffect } from "react";
import Level3_1 from "../../../../assets/background_images/AttentionGames/Game2/Level3_1.png";
import Level3_1_1 from "../../../../assets/background_images/AttentionGames/Game2/Level3_1.1.png";
import BackImage from "../../../../assets/background_images/AttentionGames/Game2/backimg1_game2.png";

const Game2Level3Screen1 = ({ onTileSelect, onTimeout }) => {
  const [selectedTile, setSelectedTile] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [progress, setProgress] = useState(100);
  const [gameStarted, setGameStarted] = useState(false); // New state for game start

  useEffect(() => {
    if (!gameStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeout();
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

  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${BackImage})` }}
    >
      {/* Intro Overlay before the game starts */}
      {!gameStarted && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black bg-opacity-50 p-4">
          <h1 className="text-5xl font-bold text-yellow-300 mb-4">
            තුන්වැනි අදිරයෙන් විනෝද වෙමු!
          </h1>
          <p className="text-xl text-white mb-6 max-w-lg">
            මෙම ක්‍රිඩාවේ ඔබ කළ යුත්තේ නොගලපෙන රූපය සොයාගැනීම.මෙහි කාලය ගැන
            සැලකිලිමත් වීම අනිවාර්යයි. ඔබ සුදානම් ද?
          </p>
          <button
            onClick={handleStartGame}
            className="px-6 py-3 bg-green-500 rounded-full text-2xl text-white hover:bg-green-600 transition duration-200"
          >
            ආරම්භ කරමු
          </button>
        </div>
      )}

      {/* Game content when the game starts */}
      {gameStarted && (
        <>
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
    </div>
  );
};

export default Game2Level3Screen1;

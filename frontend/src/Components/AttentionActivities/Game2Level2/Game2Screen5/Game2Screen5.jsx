// Game2Screen5.jsx
import React, { useState, useEffect } from "react";
import Level2_5 from "../../../../assets/background_images/AttentionGames/Game2/Level2_5.png";
import Level2_5_1 from "../../../../assets/background_images/AttentionGames/Game2/Level2_5.1.png";
import BackImage from "../../../../assets/background_images/AttentionGames/Game2/backimg1_game2.png";

const Game2Screen5 = ({ onTileSelect, onTimeout }) => {
  const [selectedTile, setSelectedTile] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onTimeout]);

  useEffect(() => {
    setProgress((timeLeft / 10) * 100);
  }, [timeLeft]);

  // For Game2Screen5, the correct answer is tile id 2.
  const tiles = [
    { id: 1, image: Level2_5 },
    { id: 2, image: Level2_5_1 },
    { id: 3, image: Level2_5 },
    { id: 4, image: Level2_5 },
    { id: 5, image: Level2_5 },
    { id: 6, image: Level2_5 },
  ];

  const handleTileClick = (id) => {
    if (selectedTile !== id) {
      setSelectedTile(id);
      onTileSelect(id);
    }
  };

  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${BackImage})` }}
    >
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
      <div className="relative grid grid-cols-3 gap-6">
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
    </div>
  );
};

export default Game2Screen5;

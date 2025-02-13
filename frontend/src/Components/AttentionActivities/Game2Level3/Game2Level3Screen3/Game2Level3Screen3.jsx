import React, { useState, useEffect } from "react";
import Level3_3 from "../../../../assets/background_images/AttentionGames/Game2/Level3_3.png";
import Level3_3_1 from "../../../../assets/background_images/AttentionGames/Game2/Level3_3.1.png";
import BackImage from "../../../../assets/background_images/AttentionGames/Game2/backimg1_game2.png";

const Game2Level3Screen3 = ({ onTileSelect, onTimeout }) => {
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

  const tiles = [
    { id: 1, image: Level3_3 },
    { id: 2, image: Level3_3_1 },
    { id: 3, image: Level3_3 },
    { id: 4, image: Level3_3 },
  ];

  const handleTileClick = (id) => {
    if (selectedTile !== id) {
      setSelectedTile(id);
      onTileSelect();
    }
  };

  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${BackImage})` }}
    >
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
    </div>
  );
};

export default Game2Level3Screen3;

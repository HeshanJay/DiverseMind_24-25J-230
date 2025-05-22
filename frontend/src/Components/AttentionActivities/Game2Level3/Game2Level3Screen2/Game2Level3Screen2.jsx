import React, { useState, useEffect, useRef } from "react";
import Level3_2 from "../../../../assets/background_images/AttentionGames/Game2/Level3_2.png";
import Level3_2_1 from "../../../../assets/background_images/AttentionGames/Game2/Level3_2.1.png";
import BackImage from "../../../../assets/background_images/AttentionGames/Game2/backimg1_game2.png";
import clickSound from "../../../../assets/Audios/click_sound.mp3";
import selectSound from "../../../../assets/Audios/select.mp3";
import Clock from "../../../../assets/Audios/clock.mp3";
import timeoutSound from "../../../../assets/Audios/timeout.mp3";

const Game2Level3Screen2 = ({ onTileSelect, onTimeout }) => {
  const [selectedTile, setSelectedTile] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [progress, setProgress] = useState(100);

  const clockAudioRef = useRef(null);

  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play().catch(console.error);
  };

  const playSelectSound = () => {
    const audio = new Audio(selectSound);
    audio.play().catch(console.error);
  };

  const playTimeoutSound = () => {
    const audio = new Audio(timeoutSound);
    audio.volume = 0.7;
    audio.play().catch(console.error);
  };

  const playClockAudio = () => {
    if (clockAudioRef.current) {
      clockAudioRef.current.volume = 0.3;
      clockAudioRef.current.loop = true;
      clockAudioRef.current.play().catch(console.error);
    }
  };

  const stopClockAudio = () => {
    if (clockAudioRef.current) {
      clockAudioRef.current.pause();
      clockAudioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    playClockAudio();

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          stopClockAudio();
          setTimeout(() => {
            playTimeoutSound();
            onTimeout();
          }, 200);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      stopClockAudio();
    };
  }, [onTimeout]);

  useEffect(() => {
    setProgress((timeLeft / 10) * 100);
  }, [timeLeft]);

  const tiles = [
    { id: 1, image: Level3_2 },
    { id: 2, image: Level3_2 },
    { id: 3, image: Level3_2 },
    { id: 4, image: Level3_2 },
    { id: 5, image: Level3_2 },
    { id: 6, image: Level3_2_1 },
    { id: 7, image: Level3_2 },
    { id: 8, image: Level3_2 },
  ];

  const handleTileClick = (id) => {
    if (selectedTile !== id) {
      playSelectSound();
      setSelectedTile(id);
      onTileSelect(id);
      playClickSound();
    }
  };

  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${BackImage})` }}
    >
      {/* Preload ticking sound */}
      <audio ref={clockAudioRef} preload="auto">
        <source src={Clock} type="audio/mpeg" />
      </audio>

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
    </div>
  );
};

export default Game2Level3Screen2;

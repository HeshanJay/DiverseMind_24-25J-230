import React, { useState, useEffect, useRef } from "react";
import Level1_1 from "../../../../assets/background_images/AttentionGames/Game2/Level1_1.png";
import Level1_1_1 from "../../../../assets/background_images/AttentionGames/Game2/Level1_1.1.png";
import BackImage from "../../../../assets/background_images/AttentionGames/Game2/backimg1_game2.png";
import IntroImage from "../../../../assets/Attention/intro4.png";
import clickSound from "../../../../assets/Audios/click_sound.mp3";
import selectSound from "../../../../assets/Audios/select.mp3";
import Clock from "../../../../assets/Audios/clock.mp3";
import timeoutSound from "../../../../assets/Audios/timeout.mp3";
import { IoMdRefresh } from "react-icons/io";
import { GiGamepad } from "react-icons/gi";
import { FaArrowRight } from "react-icons/fa";

const solidBorderStyle = {
  border: "3px solid orange",
};

const Screen1 = ({ onTileSelect, onTimeout, onGameComplete }) => {
  const [selectedTile, setSelectedTile] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [progress, setProgress] = useState(100);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  const clockAudioRef = useRef(null);

  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play().catch(console.error);
  };

  const playSelectSound = () => {
    const audio = new Audio(selectSound);
    audio.play().catch(console.error);
  };

  const playClockAudio = () => {
    if (clockAudioRef.current) {
      clockAudioRef.current.volume = 0.3;
      clockAudioRef.current.play().catch(console.error);
    }
  };

  const stopClockAudio = () => {
    if (clockAudioRef.current) {
      clockAudioRef.current.pause();
      clockAudioRef.current.currentTime = 0;
    }
  };

  const playTimeoutSound = () => {
    const audio = new Audio(timeoutSound);
    audio.volume = 0.7;
    audio.play().catch(console.error);
  };

  // Game timer logic
  useEffect(() => {
    if (!gameStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          stopClockAudio(); // Stop clock when time ends
          setTimeout(() => {
            playTimeoutSound();
          }, 200);
          onTimeout();
          setGameEnded(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onTimeout, gameStarted]);

  // Update progress bar
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
      playSelectSound();
      setSelectedTile(id);
      onTileSelect(id);
      playClickSound();
    }
  };

  const handleStartGame = () => {
    playClickSound();
    setGameStarted(true);
    playClockAudio();
  };

  const handleRestart = () => {
    playClickSound();
    stopClockAudio();
    setGameStarted(false);
    setGameEnded(false);
    setSelectedTile(null);
    setTimeLeft(10);
    onGameComplete();
  };

  const handleNavigation = (url) => {
    playClickSound();
    setTimeout(() => {
      stopClockAudio();
      window.location.href = url;
    }, 100);
  };

  const containerBackground =
    !gameStarted && !gameEnded ? IntroImage : BackImage;

  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${containerBackground})` }}
    >
      {/* Preloaded clock audio */}
      <audio ref={clockAudioRef} preload="auto">
        <source src={Clock} type="audio/mpeg" />
      </audio>

      {/* Intro overlay */}
      {!gameStarted && !gameEnded && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="p-8 rounded shadow-lg text-center bg-gray-900"
            style={solidBorderStyle}
          >
            <h1 className="text-5xl font-bold text-yellow-300 mb-4">
              පලමු අදිරයෙන් විනෝද වෙමු !
            </h1>
            <p className="text-xl text-white mb-6 max-w-lg mx-auto">
              මෙම ක්‍රිඩාවේ ඔබ කළ යුත්තේ නොගැලපෙන රූපය සොයාගැනීම. මෙහි කාලය ගැන
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

      {/* Game UI */}
      {gameStarted && !gameEnded && (
        <>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

          {/* Timer circle */}
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

          {/* Tile grid */}
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

      {/* End-of-game buttons */}
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
            onClick={() => handleNavigation("/attentiongame2")}
            className="w-16 h-16 bg-blue-400 rounded-full shadow-md flex items-center justify-center hover:bg-blue-500 transition"
            aria-label="Go to Attention Game 2"
          >
            <GiGamepad size={32} color="#fff" />
          </button>
          <button
            onClick={() => handleNavigation("/attentionInterventions")}
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

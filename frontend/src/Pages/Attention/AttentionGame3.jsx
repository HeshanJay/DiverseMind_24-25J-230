import React from "react";
import { useNavigate } from "react-router-dom";
import game1 from "../../assets/background_images/number1.png";
import game2 from "../../assets/background_images/number2.png";
import game3 from "../../assets/background_images/number3.png";
import backgroundImage from "../../assets/background_images/garden3.png";
import clickSound from "../../assets/Audios/click_sound.mp3";
import wood from "../../assets/Attention/w4.png"; // Import the wood image

const AttentionGame3 = () => {
  const navigate = useNavigate();

  // Function to play the click sound
  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play();
  };

  // Array of game buttons with their corresponding routes
  const games = [
    { image: game1, route: "/attentiongame3level1" },
    { image: game2, route: "/attentiongame3level2" },
    { image: game3, route: "/attentiongame3level3" },
  ];

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Title container styled similarly to AttentionGame2 */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2"
        style={{ top: "-40px" }}
      >
        <img src={wood} alt="Title Background" className="w-64 md:w-72" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-5xl font-bold">අදියරය</span>
        </div>
      </div>

      {/* Game buttons container positioned near the bottom and equally spaced */}
      <div className="absolute bottom-20 w-full flex justify-evenly">
        {games.map((game, index) => (
          <button
            key={index}
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full transition-transform transform hover:scale-110 bg-transparent border-none animate-bounce"
            onClick={() => {
              playClickSound();
              navigate(game.route);
            }}
            style={{
              outline: "none",
              padding: 0,
              margin: 0,
              border: "none",
              background: "none",
            }}
          >
            <img
              src={game.image}
              alt={`Game ${index + 1}`}
              className="w-full h-full object-cover rounded-full"
              style={{ filter: "drop-shadow(0 0 0 transparent)" }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default AttentionGame3;

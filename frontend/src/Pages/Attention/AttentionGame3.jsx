import React from "react";
import { useNavigate } from "react-router-dom";
import game1 from "../../assets/background_images/number1.png";
import game2 from "../../assets/background_images/number2.png";
import game3 from "../../assets/background_images/number3.png";
import backgroundImage from "../../assets/background_images/garden3.png";

const AttentionGame3 = () => {
  const navigate = useNavigate();

  // Array of game buttons with their corresponding routes
  const games = [
    { image: game1, route: "/attentiongame3level1" },
    { image: game2, route: "/attentiongame3level2" },
    { image: game3, route: "/attentiongame3level3" },
  ];

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Title Text */}
      <div className="absolute top-10 text-white text-5xl font-bold">අදිරය</div>

      {/* Content should be on top of the overlay */}
      <div className="relative flex space-x-6">
        {games.map((game, index) => (
          <button
            key={index}
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full transition-transform transform hover:scale-110 bg-transparent border-none animate-bounce"
            onClick={() => navigate(game.route)}
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
              style={{
                filter: "drop-shadow(0 0 0 transparent)", // Removes any shadow effect
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default AttentionGame3;

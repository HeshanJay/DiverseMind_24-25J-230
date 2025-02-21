import React from "react";
import { useNavigate } from "react-router-dom";
import game1 from "../../assets/background_images/game1box11.png";
import game2 from "../../assets/background_images/game1box2.png";
import game3 from "../../assets/background_images/game1box33.png";
import backgroundImage from "../../assets/background_images/square1.png";

const AttentionGame1 = () => {
  const navigate = useNavigate();

  // Array of game buttons with their corresponding routes
  const games = [
    { image: game1, route: "/attentiongame1level1" },
    { image: game2, route: "/attentiongame1level2" },
    { image: game3, route: "/attentiongame1level3" },
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

      {/* Title - Kid-friendly, visible, and attractive */}
      <h1 className="absolute top-12 text-4xl sm:text-5xl font-bold text-white text-center drop-shadow-lg">
        අදිරය
      </h1>

      {/* Content should be on top of the overlay */}
      <div className="relative flex space-x-6">
        {games.map((game, index) => (
          <button
            key={index}
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full transition-transform transform bg-transparent border-none bounce-btn"
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

      {/* Add CSS for continuous bounce animation */}
      <style>
        {`
          .bounce-btn {
            animation: bounce 1s infinite ease-in-out;
          }

          @keyframes bounce {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default AttentionGame1;

import React, { useState } from "react";
import axios from "axios";
import "./ReadingDashboard.css";
import foxImage from "../../../assets/characters/fox.png";
import backgroundImage from "../../../assets/background_images/scorebg2.jpg";

const ReadingDashboard = ({ onNext }) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [instructionStep, setInstructionStep] = useState(1);
  const [playButtonDisabled, setPlayButtonDisabled] = useState(false);

  const startAttentionDetection = async () => {
    try {
      const response = await axios.get("http://localhost:8000/attention/start");
      console.log("Attention detection started:", response.data);
      setCameraActive(true);
      setInstructionStep(2);
      setPlayButtonDisabled(true);
    } catch (error) {
      console.error(
        "Error starting attention detection:",
        error.response || error.message
      );
    }
  };

  return (
    <div
      className="bg-cover bg-center w-screen h-screen flex justify-center items-center relative m-0 p-0"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {cameraActive && (
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      )}

      <div className="absolute top-[25%] left-1/2 transform -translate-x-1/2 p-6 flex flex-col items-center popup-container">
        <h1 className="text-3xl text-center text-white font-extrabold popup-text">
          අවධානය <br /> පරීක්ෂා කරමු
        </h1>

        {/* Kid-friendly "ආරම්භ කරමු" button */}
        <button
          onClick={startAttentionDetection}
          disabled={playButtonDisabled}
          className={`mt-6 px-6 py-3 border-4 border-white text-white rounded-full shadow-lg font-bold text-xl transition-transform duration-300 
            ${
              playButtonDisabled
                ? "bg-gray-500 cursor-not-allowed opacity-50"
                : "bg-yellow-400 hover:scale-110 hover:bg-yellow-500"
            }
          `}
        >
          ආරම්භ කරමු
        </button>
      </div>

      <button
        onClick={cameraActive ? onNext : null}
        disabled={!cameraActive}
        className={`absolute bottom-10 right-28 py-3 px-8 rounded-full shadow-lg font-extrabold text-xl text-white transition-all duration-300 transform 
          ${
            cameraActive
              ? "bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 hover:from-yellow-400 hover:to-purple-400 hover:scale-110 hover:shadow-2xl"
              : "bg-gray-400 cursor-not-allowed opacity-50"
          }
        `}
        aria-label="Next"
      >
        🌟 ඉදිරියට යමු 🚀
      </button>

      {instructionStep === 2 && (
        <div className="absolute bottom-24 right-36 bg-white text-black p-3 rounded-lg shadow-lg animate-fadeIn z-10">
          ✅ Click here to start!
        </div>
      )}

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <img src={foxImage} alt="Fox" className="w-28 monkey-animation" />
      </div>

      {cameraActive && (
        <div className="absolute top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg">
          Camera Active: Attention Detecting...
        </div>
      )}
    </div>
  );
};

export default ReadingDashboard;

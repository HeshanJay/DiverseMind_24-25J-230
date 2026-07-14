import React, { useState } from "react";
<<<<<<< HEAD
import { MdPlayArrow } from "react-icons/md";
=======
>>>>>>> 5206e652eb675fe20bd3b18bad06c8040d33592d
import axios from "axios";
import "./ReadingDashboard.css";
import foxImage from "../../../assets/characters/fox.png";
import backgroundImage from "../../../assets/background_images/scorebg2.jpg";

const ReadingDashboard = ({ onNext }) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [instructionStep, setInstructionStep] = useState(1);
<<<<<<< HEAD
  const [playButtonDisabled, setPlayButtonDisabled] = useState(false); // New state for disabling the play button
=======
  const [playButtonDisabled, setPlayButtonDisabled] = useState(false);
>>>>>>> 5206e652eb675fe20bd3b18bad06c8040d33592d

  const startAttentionDetection = async () => {
    try {
      const response = await axios.get("http://localhost:8000/attention/start");
      console.log("Attention detection started:", response.data);
      setCameraActive(true);
<<<<<<< HEAD
      setInstructionStep(2); // Move to the next step after clicking Play Button
      setPlayButtonDisabled(true); // Disable the Play Button after clicking
=======
      setInstructionStep(2);
      setPlayButtonDisabled(true);
>>>>>>> 5206e652eb675fe20bd3b18bad06c8040d33592d
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
<<<<<<< HEAD
      {/* Dark overlay when camera starts (excluding Next Button & Pop-up) */}
=======
>>>>>>> 5206e652eb675fe20bd3b18bad06c8040d33592d
      {cameraActive && (
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      )}

<<<<<<< HEAD
      {/* Title & Button Section */}
=======
>>>>>>> 5206e652eb675fe20bd3b18bad06c8040d33592d
      <div className="absolute top-[25%] left-1/2 transform -translate-x-1/2 p-6 flex flex-col items-center popup-container">
        <h1 className="text-3xl text-center text-white font-extrabold popup-text">
          අවධානය <br /> පරීක්ෂා කරමු
        </h1>
<<<<<<< HEAD
        {/* Circular Play Button - Kid Friendly (Initially Enabled, Disabled After Click) */}
        <button
          onClick={startAttentionDetection}
          disabled={playButtonDisabled} // Disable button after clicking
          className={`mt-6 w-20 h-20 border-4 border-white text-white rounded-full shadow-lg flex justify-center items-center transition-transform duration-300
            ${
              playButtonDisabled
                ? "bg-gray-500 cursor-not-allowed opacity-50" // Disabled style
                : "bg-yellow-400 hover:scale-110 hover:bg-yellow-500" // Normal style
            }
          `}
        >
          <MdPlayArrow size={40} color="white" />
        </button>
      </div>

      {/* Next Button (Initially Disabled) */}
      <button
        onClick={cameraActive ? onNext : null} // Only allow clicking when cameraActive is true
        disabled={!cameraActive} // Disable button if camera is not active
=======

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
>>>>>>> 5206e652eb675fe20bd3b18bad06c8040d33592d
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

<<<<<<< HEAD
      {/* Step 2 Instruction Popup (Appears after clicking Play Button) */}
      {instructionStep === 2 && (
        <div className="absolute bottom-24 right-36 bg-white text-black p-3 rounded-lg shadow-lg animate-fadeIn z-10">
          ✅ Click here to start!
        </div>
      )}

      {/* Character Image */}
=======
      {instructionStep === 2 && (
        <div className="absolute bottom-24 right-36 bg-white text-black p-3 rounded-lg shadow-lg animate-fadeIn z-10">
          ✅ ආරම්භ කිරීමට මෙතන ක්ලික් කරන්න!
        </div>
      )}

>>>>>>> 5206e652eb675fe20bd3b18bad06c8040d33592d
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <img src={foxImage} alt="Fox" className="w-28 monkey-animation" />
      </div>

<<<<<<< HEAD
      {/* Camera Active Status */}
=======
>>>>>>> 5206e652eb675fe20bd3b18bad06c8040d33592d
      {cameraActive && (
        <div className="absolute top-5 right-5 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg">
          Camera Active: Attention Detecting...
        </div>
      )}
    </div>
  );
};

export default ReadingDashboard;

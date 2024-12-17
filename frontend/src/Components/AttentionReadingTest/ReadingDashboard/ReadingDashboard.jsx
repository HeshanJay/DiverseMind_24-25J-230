import React, { useState } from "react";
import { MdArrowForward } from "react-icons/md";
import axios from "axios";
import "./ReadingDashboard.css";
import monkeyImage from "../../../assets/characters/Monkey.png";
import bunnyImage from "../../../assets/characters/bunny.png";
import foxImage from "../../../assets/characters/fox.png";
import backgroundImage from "../../../assets/background_images/back_img4.jpg";

const ReadingDashboard = ({ onNext }) => {
  const [cameraActive, setCameraActive] = useState(false);

  const startAttentionDetection = async () => {
    try {
      const response = await axios.get("http://localhost:8000/attention/start");
      console.log("Attention detection started:", response.data);
      setCameraActive(true); // Set camera to active state
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
      <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 rounded-xl shadow-lg p-6 flex flex-col items-center">
        <h1 className="text-3xl text-center text-black font-extrabold popup-text">
          අවධානය! <br /> කියවීමේ පරීක්ෂණය
        </h1>
        <button
          onClick={startAttentionDetection}
          className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white text-lg font-bold rounded-full shadow-lg flex items-center space-x-2 hover:scale-105 hover:bg-gradient-to-l transition-transform duration-300"
        >
          <span>ඉදිරියට යන්න</span>
          <MdArrowForward size={24} />
        </button>
      </div>
      <button
        onClick={onNext}
        className="absolute bottom-10 right-28 w-16 h-16 rounded-full shadow-lg flex justify-center items-center bg-gradient-to-r from-blue-400 to-green-500 hover:scale-110 transition-transform duration-300"
        aria-label="Next"
      >
        <MdArrowForward size={40} color="white" />
      </button>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-[200%]">
        <img src={foxImage} alt="Fox" className="w-28 monkey-animation" />
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-[60%]">
        <img src={monkeyImage} alt="Monkey" className="w-28 monkey-animation" />
      </div>
      <div className="absolute bottom-10 left-1/2 transform translate-x-[60%]">
        <img src={bunnyImage} alt="Bunny" className="w-28 monkey-animation" />
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

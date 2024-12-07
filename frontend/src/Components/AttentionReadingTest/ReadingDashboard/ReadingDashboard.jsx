import React from "react";
import { FaArrowRight } from "react-icons/fa"; // Import the right arrow icon from React Icons
import "./ReadingDashboard.css"; // Ensure this file contains your styles
import monkeyImage from "../../../assets/characters/Monkey.png"; // Path to monkey image
import bunnyImage from "../../../assets/characters/bunny.png"; // Path to bunny image
import foxImage from "../../../assets/characters/fox.png"; // Path to fox image
import backgroundImage from "../../../assets/background_images/back_img4.jpg"; // Path to background image

const ReadingDashboard = ({ onNext }) => {
  return (
    <div
      className="bg-cover bg-center w-screen h-screen flex justify-center items-center relative m-0 p-0"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Set the background image
      }}
    >
      {/* Text with a colorful and playful background */}
      <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 rounded-xl shadow-lg p-6">
        <h1 className="text-3xl text-center text-black font-extrabold popup-text">
          අවධානය! <br /> කියවීමේ පරීක්ෂණය
        </h1>
      </div>
      {/* Arrow Button */}
      <button
        onClick={onNext}
        className="absolute bottom-[50%] left-1/2 transform -translate-x-1/2 flex items-center justify-center bg-yellow-400 text-black text-lg rounded-full p-5 shadow-lg hover:bg-yellow-500 hover:scale-110 transition-transform duration-200"
        aria-label="Next"
      >
        <FaArrowRight className="text-2xl" /> {/* Icon for the right arrow */}
      </button>
      {/* Fox image */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-[200%]">
        <img src={foxImage} alt="Fox" className="w-28 monkey-animation" />
      </div>
      {/* Monkey image */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-[60%]">
        <img src={monkeyImage} alt="Monkey" className="w-28 monkey-animation" />
      </div>
      {/* Bunny image */}
      <div className="absolute bottom-10 left-1/2 transform translate-x-[60%]">
        <img src={bunnyImage} alt="Bunny" className="w-28 monkey-animation" />
      </div>
    </div>
  );
};

export default ReadingDashboard;

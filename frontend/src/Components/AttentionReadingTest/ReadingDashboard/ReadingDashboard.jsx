import React from "react";
import { MdArrowForward } from "react-icons/md"; // Import the arrow icon
import "./ReadingDashboard.css"; // Ensure this file contains your updated styles
import monkeyImage from "../../../assets/characters/Monkey.png";
import bunnyImage from "../../../assets/characters/bunny.png";
import foxImage from "../../../assets/characters/fox.png";
import backgroundImage from "../../../assets/background_images/back_img4.jpg";

const ReadingDashboard = ({ onNext }) => {
  return (
    <div
      className="bg-cover bg-center w-screen h-screen flex justify-center items-center relative m-0 p-0"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Text with a colorful and playful background */}
      <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 rounded-xl shadow-lg p-6 flex flex-col items-center">
        <h1 className="text-3xl text-center text-black font-extrabold popup-text">
          අවධානය! <br /> කියවීමේ පරීක්ෂණය
        </h1>

        {/* Pinkish-Purple Gradient Button */}
        <button className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white text-lg font-bold rounded-full shadow-lg flex items-center space-x-2 hover:scale-105 hover:bg-gradient-to-l transition-transform duration-300">
          <span>ඉදිරියට යන්න</span> {/* Child-friendly label */}
          <MdArrowForward size={24} />
        </button>
      </div>

      {/* Arrow Button with updated styles */}
      <button
        onClick={onNext}
        className="absolute bottom-10 right-28 w-16 h-16 rounded-full shadow-lg flex justify-center items-center bg-gradient-to-r from-blue-400 to-green-500 hover:scale-110 transition-transform duration-300"
        aria-label="Next"
      >
        <MdArrowForward size={40} color="white" />
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

import React from "react";
import backgroundImage from "../../../assets/background_images/back_img4.jpg";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import monkeyImage from "../../../assets/characters/Monkey.png";
import bunnyImage from "../../../assets/characters/bunny.png";
import foxImage from "../../../assets/characters/fox.png";

const Passage6 = ({ onPrevious, onNext }) => {
  return (
    <div
      className="bg-cover bg-center w-screen h-screen flex justify-center items-center relative m-0 p-0"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <button className="absolute top-[40%] px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white text-lg font-bold rounded-full shadow-lg flex items-center space-x-2 hover:scale-105 hover:bg-gradient-to-l transition-transform duration-300">
        Click to end
      </button>
      <button
        onClick={onPrevious}
        className="absolute bottom-10 left-28 w-16 h-16 rounded-full shadow-lg flex justify-center items-center bg-gradient-to-r from-purple-400 to-pink-500 hover:scale-110 transition-transform duration-300"
      >
        <MdArrowBack size={40} color="white" />
      </button>

      <button
        onClick={onNext}
        className="absolute bottom-10 right-28 w-16 h-16 rounded-full shadow-lg flex justify-center items-center bg-gradient-to-r from-blue-400 to-green-500 hover:scale-110 transition-transform duration-300"
      >
        <MdArrowForward size={40} color="white" />
      </button>

      {/* Animated Images */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-[200%]">
        <img src={foxImage} alt="Fox" className="w-28 monkey-animation" />
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-[60%]">
        <img src={monkeyImage} alt="Monkey" className="w-28 monkey-animation" />
      </div>
      <div className="absolute bottom-10 left-1/2 transform translate-x-[60%]">
        <img src={bunnyImage} alt="Bunny" className="w-28 monkey-animation" />
      </div>
    </div>
  );
};

export default Passage6;

import React, { useState } from "react";
import backgroundImage from "../../../assets/background_images/back_img4.jpg";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const Passage6 = ({ onPrevious, onNext }) => {
  return (
    <div
      className="bg-cover bg-center w-screen h-screen flex justify-center items-center relative m-0 p-0"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl max-w-3xl text-center border-4 border-yellow-400">
        <h1 className="text-3xl font-extrabold text-yellow-600 mb-6">
          නැවත පැමිණි මියෝගේ වික්‍රමය
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          මියෝගේ වික්‍රමය ගැන පැමිණි ඔබේ අදහස් දක්වන්න. මෙම විෂය ගැන ඔබේ අදහස්
          අපි හොඳින් ඇගයීමට බලාපොරොත්තු වෙමු.
        </p>
      </div>

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
    </div>
  );
};

export default Passage6;

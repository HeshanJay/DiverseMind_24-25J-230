import React from "react";
import "./PassageK.css"; // Additional styling
import backgroundImage from "../../../assets/background_images/back_img4.jpg";
import { MdArrowBack, MdArrowForward } from "react-icons/md"; // Fun arrow icons

const PassageK = ({ onPrevious, onNext }) => {
  return (
    <div
      className="bg-cover bg-center w-screen h-screen flex justify-center items-center relative m-0 p-0"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Main Content Wrapper */}
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl max-w-3xl text-center border-4 border-yellow-400">
        <h1 className="text-3xl font-extrabold text-blue-600 mb-6">අඬන බබා</h1>
        <p className="text-xl text-gray-800 leading-relaxed">
          කැලේ අද්දර ගෙදරක පුංචි බබෙක් හිටියා. ඒ ගෙදර අමිමයිටයි තාත්තටයි
          ආච්චිටයි සීයාටයි හිටියෙ මේ පුංචි බබා විතරයි.
          <br></br>ඒ නිසා එයා ගොඩාක් හුරතල් වුණා. ඉතින් ගෙදර අයත් බබා නළවන්න,
          ඉල්ලන ඉල්ලන දේ දුන්නා. මේ නිසා බබා තව තවත් හුරතල් වුණා. ඇඬුවාම ඕනෙම
          දෙයක් ලැබෙන බව දන්න නිසා, එයා හැම දේටම ඇඬුවා. මේ නිසා අහළ පහළ හැමෝම
          එයාට කීවෙ "අඬන බබා” කියලයි.
        </p>
      </div>

      {/* Previous Button */}
      <button
        onClick={onPrevious}
        className="absolute bottom-10 left-28 w-16 h-16 rounded-full shadow-lg flex justify-center items-center bg-gradient-to-r from-pink-400 to-purple-500 hover:scale-110 transition-transform duration-300"
      >
        <MdArrowBack size={40} color="white" />
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="absolute bottom-10 right-28 w-16 h-16 rounded-full shadow-lg flex justify-center items-center bg-gradient-to-r from-blue-400 to-green-500 hover:scale-110 transition-transform duration-300"
      >
        <MdArrowForward size={40} color="white" />
      </button>
    </div>
  );
};

export default PassageK;

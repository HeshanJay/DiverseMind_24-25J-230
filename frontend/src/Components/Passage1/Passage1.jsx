import React from "react";
import "./Passage1.css"; // Additional styling
import backgroundImage from "../../assets/background_images/back_img4.jpg";
import { MdArrowBack, MdArrowForward } from "react-icons/md"; // Fun arrow icons

const Passage1 = ({ onPrevious, onNext }) => {
  return (
    <div
      className="bg-cover bg-center w-screen h-screen flex justify-center items-center relative m-0 p-0"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Main Content Wrapper */}
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-2xl max-w-3xl text-center border-4 border-yellow-400">
        <h1 className="text-3xl font-extrabold text-blue-600 mb-6">
          අහිංසක පඹරාල
        </h1>
        <p className="text-xl text-gray-800 leading-relaxed">
          හෙනේ මාමාගේ හේනට එහා කරඹ කැලේ එක මීයො රංචුවක් හිටියා. මේ මීයො රංචුවෙන්
          හේනේ මාමාට හරීම කරදරේ.හෙනේ මාමා චුට්ටක් පෙනෙන්න නැති වෙනකල් ඉඳලා මි
          රංචුව හේනට පනිනවා. හෙනේ මාමා මහන්සියෙන් හදාපු වගාව ඔක්කොම පාළු කරනවා එ
          විතර්ක් නෙමෙයි පොළොව හාරලා පැළත් පෙරළනවා.
          <br />
          <br />
          හෙනේ මාමාට මේ ගැන හරි කේන්තියි. ඒත් එක හොර මීයෙක්වත් අල්ලගන්න නම්
          බෑ.හේනෙ මාමාගෙ අඩි සද්දෙ එනකොටම විදුලියක් වගේ පැනලා දුවනවා.
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

export default Passage1;

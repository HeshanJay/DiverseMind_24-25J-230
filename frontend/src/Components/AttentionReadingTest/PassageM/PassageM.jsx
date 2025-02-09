import React from "react";
import "./PassageM.css"; // Additional styling
import backgroundImage from "../../../assets/background_images/back_img4.jpg";
import { MdArrowBack, MdArrowForward } from "react-icons/md"; // Fun arrow icons

const PassageM = ({ onPrevious, onNext }) => {
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
          බුකුං බුකුං
        </h1>
        <p className="text-xl text-gray-800 leading-relaxed">
          හිඹුටු වාරෙට හිඹුටු කැලේ හරිම ලස්සනයි. කහ පාටට ගෙඩි හැදිලා අතුවල
          එල්ලෙනවා. මුළු පළාතම සුවඳයි. මේ කැලේ හිටියා පුංචි වඳුරු පැටියෙක්.
          එයාගෙ අම්මයි තාත්තයි එයාට ආදරේට කීවෙ "බුකුං බුකුං" කියලා. බුකුං බුකුං
          හරිම දඟකාරයා. හැමදේටම කලබලයි. දඟ වැඩ කරන්න ගිහින් බුකුං බුකුං නිතරම
          කරදරේ වැටෙනවා. 'පුතේ, දඟ කරන්නෙ පරෙස්සමින් ! අම්මා නිතරම කියනවා. ඒත්
          බුකුං බුකුංට ඉක්මනට ඒවා අමතක වෙනවා.
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

export default PassageM;

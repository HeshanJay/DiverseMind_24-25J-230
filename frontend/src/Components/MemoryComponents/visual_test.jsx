import React from "react";
import backImg from "../../assets/background_images/back3.jpg";
import img22 from "../../assets/Working_Memory/img22.png";
import img24 from "../../assets/Working_Memory/img24.png";
import { useScores } from "../../context/Score_context";

const VisualTest = ({ onNext, onBack }) => {
  const { setCurrentTestName } = useScores();

  const handleStart = () => {
    setCurrentTestName("visual-test-activity");
    onNext();
  };

  return (
    <div
  className="h-screen w-full bg-cover bg-center relative"
  style={{ backgroundImage: `url(${backImg})` }}
>
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>

  <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
    <div className="flex justify-center w-full relative">
      <div className="bg-gradient-to-r from-blue-300/80 via-green-300/80 to-purple-300/80 p-8 rounded-[2rem] shadow-md w-[620px] h-[400px] relative border-8 border-blue-800">
        <img
          src={img22}
          alt="img22"
          className="absolute top-[-1px] left-[-4px] w-[140px] h-auto"
        />
        <img
          src={img24}
          alt="img24"
          className="absolute top-[-1px] right-[-10px] w-[150px] h-auto"
        />
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 via-blue-500 to-red-500 bg-clip-text text-transparent">
          දෘශ්‍ය විෂමතා පරීක්ෂණය
        </h1>
        <p className="text-2xl md:text-3xl font-semibold text-center text-black mb-6">
          නිවැරදිව උපදෙස් කියවා පිළිතුරු සපයන්න.
        </p>
        <ul className="text-lg md:text-xl mb-8 list-disc list-inside leading-relaxed text-left text-black ml-12">
          <li>ප්‍රශ්න 4 කට පිළිතුරු සැපයිය යුතුයි.</li>
          <li>රූපයේ දැක්වෙන පරිදි නිවැරදි අනුපිළිවෙල තෝරන්න.</li>
          <li>රූපය නිවැරදිව මතක තබා ගැනීමට තත්පර 10 ක් ලබා දේ.</li>
          <li>එක් ප්‍රශ්නයක් සඳහා පිළිතුරු දීමට තත්පර 10 ක් ලබා දේ.</li>
        </ul>
      </div>
    </div>

    <button
      onClick={handleStart}
      className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 font-bold text-white text-xl md:text-2xl px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 hover:rotate-1"
    >
      ආරම්භ කරන්න
    </button>
  </div>
</div>

  );
};

export default VisualTest;

import React from "react";
import backImg from "../../../../assets/WM_Interventions_images/L2_images/animal_img.png";
import squirrel1 from "../../../../assets/WM_Interventions_images/L2_images/squirrel1.png";
import Squirrel from "../../../../assets/WM_Interventions_images/L2_images/Squirrel.png";

const G2_L2_instructionPage = ({ onNext }) => {
  const handleStart = () => {
    onNext(); // Move to the next step
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
        <div className="flex justify-center w-full relative">
          {/* Container box with updated environment gradient */}
          <div className="bg-gradient-to-r from-green-400/90 via-yellow-300/90 to-green-600/90 p-8 rounded-[2rem] shadow-md w-[520px] h-[420px] relative border-8 border-green-800">
            {/* Squirrel Image */}
            <img
              src={Squirrel}
              alt="Squirrel"
              className="absolute -bottom-[15px] -left-[105px] w-[300px] h-[178px] object-contain"
            />

            {/* Bird Image */}
            <img
              src={squirrel1}
              alt="squirrel1"
              className="absolute -top-[-283px] -right-[95px] w-[300px] h-32 object-contain"
            />

            {/* Heading with dark yellow and dark green gradient */}
            <div className="mb-4">
              <h1 className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-yellow-800 via-yellow-900 to-green-900 bg-clip-text text-transparent leading-tight py-2">
                ක්‍රියාකාරකම් 2
              </h1>
            </div>

            {/* Instructions */}
            <div className="-mt-1">
              <p className="text-2xl md:text-3xl font-semibold text-center text-black mb-6">
                උපදෙස් නිවැරදිව කියවා පිළිතුරු සපයන්න.
              </p>
              <ul className="text-lg md:text-xl mb-10 list-disc list-inside leading-relaxed text-left text-black ml-14">
                <li>රූපය නිවැරදිව මතක තබා ගන්න.</li>
                <li>රූපය නැරඹීම සඳහා තත්පර 10 ක් ලබා දේ.</li>
                <li>රූපයට අනුව ප්‍රශ්න වලට පිළිතුරු සපයන්න.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Start Button with new gradient */}
        <button
          onClick={handleStart}
          className="mt-8 bg-gradient-to-r from-green-500 to-yellow-500 font-bold  text-white text-xl md:text-2xl px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 hover:rotate-1"
        >
          ආරම්භ කරන්න
        </button>
      </div>
    </div>
  );
};

export default G2_L2_instructionPage;
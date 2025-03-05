import React from "react";
import snow_back8 from "../../../../assets/WM_Interventions_images/L3_images/snow_back8.jpg";
import snow_penguin1 from "../../../../assets/WM_Interventions_images/L3_images/snow_penguin1.png";
import snow_img30 from "../../../../assets/WM_Interventions_images/L3_images/snow_img30.png";

const G3_L2_instructionPage = ({ onNext }) => {
  const handleStart = () => {
    onNext(); // Move to the next step
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${snow_back8})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
        <div className="flex justify-center w-full relative">
          {/* Container box with updated gradient to match snow background */}
          <div className="bg-gradient-to-r from-blue-100/90 via-blue-200/90 to-blue-300/90 p-8 rounded-[2rem] shadow-md w-[520px] h-[420px] relative border-8 border-blue-800">
            {/* Squirrel Image */}
            <img
              src={snow_img30}
              alt="snow_img30"
              className="absolute -bottom-[8px] -left-[105px] w-[300px] h-[178px] object-contain"
            />

            {/* Bird Image */}
            <img
              src={snow_penguin1}
              alt="snow_penguin1"
              className="absolute -top-[-280px] -right-[90px] w-[300px] h-32 object-contain"
            />

            {/* Heading with gradient matching snow theme */}
            <div className="mb-4">
              <h1 className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-blue-800 via-blue-900 to-gray-900 bg-clip-text text-transparent leading-tight py-2">
                ක්‍රියාකාරකම් 2
              </h1>
            </div>

            {/* Instructions */}
            <div className="-mt-1">
              <p className="text-2xl md:text-3xl font-semibold text-center text-black mb-6">
                උපදෙස් නිවැරදිව කියවා පිළිතුරු සපයන්න.
              </p>
              <ul className="text-lg md:text-xl mb-10 list-disc list-inside leading-relaxed text-left text-black ml-16">
                <li>හඩ පටයට හොඳින් සවන් දෙන්න.</li>
                <li>ඔබට හඩ පටයට දෙවරක් සවන් දිය හැකිය.</li>
                <li>නිවැරදිව පිළිතුරු තෝරන්න.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Start Button with gradient matching snow theme */}
        <button
          onClick={handleStart}
          className="mt-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-xl md:text-2xl px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 hover:rotate-1"
        >
          ආරම්භ කරන්න
        </button>
      </div>
    </div>
  );
};

export default G3_L2_instructionPage;
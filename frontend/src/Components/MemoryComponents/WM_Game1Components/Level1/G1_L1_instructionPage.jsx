import React from "react";
import backImg from "../../../../assets/WM_Interventions_images/L1_images/sea_back9.jpg";
import jellyfish from "../../../../assets/WM_Interventions_images/L1_images/jelly_fish.png";
import jellyfish2 from "../../../../assets/WM_Interventions_images/L1_images/jelly_fish2.png"; // Import the second jellyfish image

const G1_L1_instructionPage = ({ onNext }) => {
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
          {/* Container box with sea-inspired gradient */}
          <div className="bg-gradient-to-r from-blue-200/80 via-cyan-300/80 to-teal-400/80 p-8 rounded-[2rem] shadow-md w-[520px] h-[420px] relative border-8 border-blue-700">
            {/* Jellyfish Image 1 */}
            <img
              src={jellyfish}
              alt="Jellyfish"
              className="absolute top-[-30px] left-[-50px] w-[120px] h-auto transform rotate-[-20deg] animate-float"
            />

            {/* Jellyfish Image 2 */}
            <img
              src={jellyfish2}
              alt="Jellyfish 2"
              className="absolute bottom-[-4px] right-[40px] w-[110px] h-auto transform rotate-[20deg] animate-float-reverse"
            />

            {/* Heading */}
            <div className="mb-4">
              {" "}
              {/* Reduced margin-bottom */}
              <h1 className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-800 bg-clip-text text-transparent leading-tight py-2">
                ක්‍රියාකාරකම් 1
              </h1>
            </div>

            {/* Instructions */}
            <div className="-mt-1">
              {" "}
              {/* Negative margin to move text up */}
              <p className="text-2xl md:text-3xl font-semibold text-center text-black mb-6">
                උපදෙස් නිවැරදිව කියවා පිළිතුරු සපයන්න.
              </p>
              <ul className="text-lg md:text-xl mb-10 list-disc list-inside leading-relaxed text-left text-black ml-16">
                <li>රූපය නිවැරදිව මතක තබා ගන්න.</li>
                <li>රූපය නැරඹීම සඳහා තත්පර 10 ක් ලබා දේ.</li>
                <li>රූපයට අනුව ප්‍රශ්න වලට පිළිතුරු සපයන්න.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Start Button with sea-inspired gradient */}
        <button
          onClick={handleStart}
          className="mt-8 bg-gradient-to-r from-blue-700 to-teal-500 text-white text-xl font-bold md:text-2xl px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 hover:rotate-1"
        >
          ආරම්භ කරන්න
        </button>
      </div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(-20deg);
          }
          50% {
            transform: translateY(-10px) rotate(-20deg);
          }
          100% {
            transform: translateY(0) rotate(-20deg);
          }
        }

        @keyframes floatReverse {
          0% {
            transform: translateY(0) rotate(20deg);
          }
          50% {
            transform: translateY(-10px) rotate(20deg);
          }
          100% {
            transform: translateY(0) rotate(20deg);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: floatReverse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default G1_L1_instructionPage;
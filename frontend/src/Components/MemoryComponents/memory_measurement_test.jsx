// import React from "react";
// import { useNavigate } from "react-router-dom";
// import backImg from "../../assets/background_images/back3.jpg"; 
// import { useScores } from "../../context/Score_context";

// const MemoryMeasurementTest = () => {
//   const navigate = useNavigate();
//   const {
//     currentTestName, 
//     setCurrentTestName
//   } = useScores();

//   const handleStart = () => {
//     navigate("/memory-test-activity"); 
//     setCurrentTestName("memory-test-activity")
//   };

//   return (
//     <div
//       className="h-screen w-full bg-cover bg-center relative"
//       style={{
//         backgroundImage: `url(${backImg})`,
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black bg-opacity-50"></div>

//       {/* Main Content */}
//       <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
//         <h1 className="text-4xl md:text-6xl font-bold mb-6">මතක පරීක්ෂණය</h1>

//         <div className="bg-gray-800 bg-opacity-70 px-8 py-6 rounded-lg shadow-lg text-left max-w-xl w-full">
//           <ul className="text-lg md:text-xl mb-8 list-disc list-inside leading-relaxed ml-11">
//             <li>උපදෙස් නිවැරදිව කියවා පිළිතුරු සපයන්න.</li>
//             <li>ප්‍රශ්න 5 කට පිළිතුරු සැපයිය යුතුයි.</li>
//             <li>එක් ප්‍රශ්නයකට තත්පර 10 ක් ලබා දේ.</li>
//             <li>පින්තූරය මතක තබා ගන්න.</li>
//           </ul>
//           <p className="text-2xl md:text-3xl font-semibold flex items-center justify-center text-center">
//             රූපය නිවැරදිව මතක තබාගෙන, නිවැරදි පිළිතුර තෝරන්න.
//           </p>
//         </div>

//         {/* Start Button */}
//         <button
//           onClick={handleStart}
//           className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl md:text-2xl px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
//         >
//           ආරම්භ කරන්න
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MemoryMeasurementTest;


import React from "react";
import backImg from "../../assets/background_images/back3.jpg";
import img22 from "../../assets/Working_Memory/img22.png";
import img24 from "../../assets/Working_Memory/img24.png";
import { useScores } from "../../context/Score_context";

const MemoryMeasurementTest = ({ onNext, onBack }) => {
  const { setCurrentTestName } = useScores();

  const handleStart = () => {
    setCurrentTestName("memory-test-activity");
    onNext(); // Go to step #5
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backImg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
        <div className="flex justify-center w-full relative">
          {/* Container box with img22 and img24 positioned inside */}
          <div className="bg-gradient-to-r from-blue-300/80 via-green-300/80 to-purple-300/80 p-8 rounded-[2rem] shadow-md w-[620px] h-[400px] relative border-8 border-blue-800">
            {/* Monkey Icon positioned inside the top-left corner */}
            <img
              src={img22}
              alt="img22"
              className="absolute top-[-1px] left-[-4px] w-[140px] h-auto"
            />
            {/* New Image img24 positioned inside the top-right corner */}
            <img
              src={img24}
              alt="img24"
              className="absolute top-[-1px] right-[-10px] w-[150px] h-auto"
            />
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 via-blue-500 to-red-500 bg-clip-text text-transparent">
                     මතක මිනුම් <span className="block">පරීක්ෂණය</span>
                  </h1>

            <p className="text-2xl md:text-3xl font-semibold text-center text-black mb-6">
              උපදෙස් නිවැරදිව කියවා පිළිතුරු සපයන්න.
            </p>
            <ul className="text-lg md:text-xl mb-8 list-disc list-inside leading-relaxed text-left text-black ml-12">
              <li>උපදෙස් නිවැරදිව කියවා පිළිතුරු සපයන්න.</li>
              <li>ප්‍රශ්න 5 කට පිළිතුරු සැපයිය යුතුයි.</li>
              <li>එක් ප්‍රශ්නයකට තත්පර 10 ක් ලබා දේ.</li>
              <li>පින්තූරය මතක තබා ගන්න.</li>
            </ul>
          </div>
        </div>

        <button
          onClick={handleStart}
          className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl md:text-2xl px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 hover:rotate-1"
        >
          ආරම්භ කරන්න
        </button>
      </div>
    </div>
  );
};

export default MemoryMeasurementTest;

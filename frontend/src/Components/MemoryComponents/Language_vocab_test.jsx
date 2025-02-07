// import React from "react";
// import { useNavigate } from "react-router-dom"; 
// import backImg from "../../assets/background_images/back3.jpg"; 
// import { useScores } from "../../context/Score_context";

// const Language_vocab_test = () => {
//   const navigate = useNavigate();
//   const {
//     currentTestName, 
//     setCurrentTestName
//   } = useScores();

//   const handleStart = () => {
    
//     navigate("/language-vocab-activity");
//     setCurrentTestName("Language Vocabulary Test") 
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
//         <h1 className="text-4xl md:text-6xl font-bold mb-6">භාෂා ශබ්ද කෝෂ පරීක්ෂණය</h1>
        
//         {/* Instructions Container */}
//         <div className="bg-gray-800 bg-opacity-70 px-8 py-6 rounded-lg shadow-lg text-left max-w-xl w-full">
//           <ul className="text-lg md:text-xl mb-8 list-disc list-inside leading-relaxed ml-11">
//             <li>උපදෙස් නිවැරදිව කියවා පිළිතුරු සපයන්න.</li>
//             <li>ප්‍රශ්න 5 කට පිළිතුරු සැපයිය යුතුයි</li>
//             <li>එක් ප්‍රශ්නයකට 10 තත්පර ලබා දේ.</li>
//             <li>නිවැරදි පිළිතුර පින්තූරය දෙස බලා මතක තබා ගන්න.</li>
//           </ul>
//           <p className="text-2xl md:text-3xl font-semibold flex items-center justify-center text-center">
//             රූපය නිවැරදිව හඳුනාගෙන, රූපය මගින් විස්තර කරන නිවැරදි
//             වචනය තෝරන්න.
//           </p>
//         </div>

//         {/* Start Button */}
//         <button
//           onClick={handleStart}
//           className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl md:text-2xl px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 hover:rotate-1"
//         >
//           ආරම්භ කරන්න
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Language_vocab_test;

import React from "react";
import backImg from "../../assets/background_images/back3.jpg";
import { useScores } from "../../context/Score_context";

const LanguageVocabTest = ({ onNext, onBack }) => {
  const { setCurrentTestName } = useScores();

  const handleStart = () => {
    setCurrentTestName("Language Vocabulary Test");
    onNext(); // Step #11
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backImg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          භාෂා ශබ්ද කෝෂ පරීක්ෂණය
        </h1>

        <div className="bg-gray-800 bg-opacity-70 px-8 py-6 rounded-lg shadow-lg text-left max-w-xl w-full">
          <ul className="text-lg md:text-xl mb-8 list-disc list-inside leading-relaxed ml-11">
            <li>උපදෙස් නිවැරදිව කියවා පිළිතුරු සපයන්න.</li>
            <li>ප්‍රශ්න 5 කට පිළිතුරු සැපයිය යුතුයි</li>
            <li>එක් ප්‍රශ්නයකට 10 තත්පර ලබා දේ.</li>
            <li>නිවැරදි පිළිතුර පින්තූරය දෙස බලා මතක තබා ගන්න.</li>
          </ul>
          <p className="text-2xl md:text-3xl font-semibold text-center">
            රූපය නිවැරදිව හඳුනාගෙන, නිවැරදි වචනය තෝරන්න.
          </p>
        </div>

        <button
          onClick={handleStart}
          className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl md:text-2xl px-6 py-4 rounded-full shadow-lg hover:shadow-xl"
        >
          ආරම්භ කරන්න
        </button>

      </div>
    </div>
  );
};

export default LanguageVocabTest;

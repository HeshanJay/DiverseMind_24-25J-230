// import React from "react";
// import { Link, Routes, Route } from "react-router-dom"; // Import Routes and Route
// import { useScores } from "../context/Score_context";
 //import backImg from "../../assets/background_images/back3.jpg";

// // Importing all test activity components
// import LanguageVocabTest from "../Components/MemoryComponents/Language_vocab_test";
// import LanguageVocabActivity from "../Components/MemoryComponents/Language_vocab_activity";
// import SpeedMeasurementTest from "../Components/MemoryComponents/Speed_Measurement_Test";
// import SpeedMeasurementActivity from "../Components/MemoryComponents/Speed_Measurement_Activity";
// import MemoryMeasurementTest from "../Components/MemoryComponents/memory_measurement_test";
// import MemoryTestActivity from "../Components/MemoryComponents/memory_test_activity"; 
// import VisualTest from "../Components/MemoryComponents/visual_test";
// import VisualTestActivity from "../Components/MemoryComponents/visual_test_activity";
// import ScoreBoard from "../Components/Score_board"; 
// import AudioMeasurementActivity from "../Components/MemoryComponents/Audio_measurement_activity";
// import AudioTest from "../Components/MemoryComponents/Audio_test"; 

// const MemoryTests = () => {
//   const tests = [
//     { id: 1, name: "දෘශ්‍ය විෂමතා පරීක්ෂණය", link: "/visual-test" },
//     { id: 2, name: "මතක පරීක්ෂණය", link: "/memory-test-activity" },
//     { id: 3, name: "වේගය විශ්ලේෂණ පරීක්ෂණය", link: "/speed-measurement-activity" },
//     { id: 4, name: "ශ්‍රව්‍ය විෂමතා පරීක්ෂණය", link: "/audio-measurement-activity" },
//     { id: 5, name: "භාෂා ශබ්ද කෝෂ දැනුම පරීක්ෂණය", link: "/language-vocab-activity" },
//   ];

//   const { setCurrentTestName } = useScores();

//   return (
//     <div
//       className="h-screen w-full bg-cover bg-center relative"
//       style={{
//         backgroundImage: `url(${backImg})`, 
//       }}
//     >
//       <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//       <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
//         <h1 className="text-white text-4xl md:text-6xl font-bold mb-8 animate-pulse">
//           මතකය පරීක්ෂා කරමු
//         </h1>

//         {/* Test Buttons */}
//         <div className="flex flex-col items-center gap-6">
//           {tests.map((test) => (
//             <Link
//               key={test.id}
//               to={test.link}
//               className="text-lg md:text-2xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 h-16 w-72 flex items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 hover:rotate-1 hover:bg-gradient-to-l"
//               onClick={() => setCurrentTestName(test.name)}
//             >
//               {test.name}
//             </Link>
//           ))}
//         </div>

//         {/* Nested Routes for Test Activities */}
//         <Routes>
//           <Route path="/visual-test" element={<VisualTest />} />
//           <Route path="/speed-measurement-activity" element={<SpeedMeasurementActivity />} />
//           <Route path="/audio-measurement-activity" element={<AudioMeasurementActivity />} />
//           <Route path="/language-vocab-activity" element={<LanguageVocabActivity />} />
//           <Route path="/memory-test-activity" element={<MemoryTestActivity />} />
//           <Route path="/scoreboard" element={<ScoreBoard />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default MemoryTests;


import React from "react";
import backImg from "../../assets/background_images/back3.jpg";
import { useScores } from "../../context/Score_context";

const MemoryTests = ({ onNext }) => {
  const tests = [
    { id: 1, name: "දෘශ්‍ය විෂමතා පරීක්ෂණය" },
    { id: 2, name: "මතක පරීක්ෂණය" },
    { id: 3, name: "වේගය විශ්ලේෂණ පරීක්ෂණය" },
    { id: 4, name: "ශ්‍රව්‍ය විෂමතා පරීක්ෂණය" },
    { id: 5, name: "භාෂා ශබ්ද කෝෂ දැනුම පරීක්ෂණය" },
  ];

  const { setCurrentTestName } = useScores();

  const handleStart = () => {
    setCurrentTestName("දෘශ්‍ය විෂමතා පරීක්ෂණය"); 
    onNext();  
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backImg})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-8 animate-pulse">
          මතකය පරීක්ෂා කරමු
        </h1>

        <div className="flex flex-col items-center gap-6 mb-10">
          {tests.map((test) => (
            <div
              key={test.id}
              className="text-lg md:text-2xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 h-16 w-72 flex items-center justify-center rounded-full shadow-lg"
            >
              {test.name}
            </div>
          ))}
        </div>

        <button
          onClick={handleStart}
          className="text-lg md:text-2xl font-semibold text-white bg-green-500 py-3 px-6 rounded-full shadow-lg hover:bg-green-700 transition-colors"
        >
          ආරම්භ කරමු
        </button>
      </div>
    </div>
  );
};

export default MemoryTests;
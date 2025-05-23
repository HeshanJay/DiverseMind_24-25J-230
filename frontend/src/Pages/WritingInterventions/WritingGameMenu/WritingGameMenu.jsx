// // Game selection
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import backgroundImage from "../../../assets/writing_interventions/background/back5.webp";
// import game1Image from "../../../assets/writing_interventions/buttons/game1-w.png";
// import game2Image from "../../../assets/writing_interventions/buttons/game2-w.png";
// import game3Image from "../../../assets/writing_interventions/buttons/game3-w.png";

// const WritingGameMenu = () => {
//   const navigate = useNavigate();
//   return (
//     <div
//       className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative"
//       style={{ backgroundImage: `url(${backgroundImage})` }}
//     >
//       {/* Dark overlay to improve contrast */}
//       <div className="absolute inset-0 bg-black bg-opacity-40"></div>

//       {/* Content Container */}
//       <div className="relative z-10 flex flex-col items-center">
//         {/* Enhanced Title with shadow and animation */}
//         <h1 className="text-5xl font-extrabold text-yellow-300 mb-12 tracking-wider shadow-lg p-4 rounded-lg bg-black bg-opacity-50 border-b-4 border-yellow-400">
//           ලිවීමේ හැකියා වර්ධනය සඳහා මඟ හුරුව
//         </h1>

//         {/* Horizontal Layout for Buttons */}
//         <div className="flex justify-center gap-10 w-full max-w-5xl">
//           {/* Game 1 */}
//           <div
//             className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110 group"
//             onClick={() => navigate("/writing-game1-level1")}
//           >
//             <div className="relative p-2 bg-purple-800 bg-opacity-70 rounded-full shadow-xl border-4 border-purple-500">
//               <img
//                 src={game1Image}
//                 alt="අකුරු හුරුව"
//                 className="w-48 h-48 object-contain transition-transform duration-300 group-hover:brightness-110"
//               />
//             </div>
//             <div className="mt-4 py-2 px-6 bg-purple-900 bg-opacity-80 rounded-lg shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
//               <p className="text-2xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300">
//                 අකුරු හුරුව
//               </p>
//             </div>
//           </div>

//           {/* Game 2 */}
//           <div
//             className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110 group"
//             onClick={() => navigate("/writing-game2-menu")}
//           >
//             <div className="relative p-2 bg-blue-800 bg-opacity-70 rounded-full shadow-xl border-4 border-blue-500">
//               <img
//                 src={game2Image}
//                 alt="පිල්ලම් හුරුව"
//                 className="w-48 h-48 object-contain transition-transform duration-300 group-hover:brightness-110"
//               />
//             </div>
//             <div className="mt-4 py-2 px-6 bg-blue-900 bg-opacity-80 rounded-lg shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
//               <p className="text-2xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300">
//                 පිල්ලම් හුරුව
//               </p>
//             </div>
//           </div>

//           {/* Game 3 */}
//           <div
//             className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110 group"
//             onClick={() => navigate("/writing-game3-level1")}
//           >
//             <div className="relative p-2 bg-green-800 bg-opacity-70 rounded-full shadow-xl border-4 border-green-500">
//               <img
//                 src={game3Image}
//                 alt="විරාම ලක්ෂණ හුරුව"
//                 className="w-48 h-48 object-contain transition-transform duration-300 group-hover:brightness-110"
//               />
//             </div>
//             <div className="mt-4 py-2 px-6 bg-green-900 bg-opacity-80 rounded-lg shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
//               <p className="text-2xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300">
//                 විරාම ලක්ෂණ හුරුව
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WritingGameMenu;

import React from "react";
import { useNavigate } from "react-router-dom";
import back_image from "../../../assets/writing_interventions/background/back_image.png";
import wovel_symbols from "../../../assets/writing_interventions/buttons/wovel_symbols.png";
import puntuations from "../../../assets/writing_interventions/buttons/puntuation.png";
import letters from "../../../assets/writing_interventions/buttons/letters.png";
import rb from "../../../assets/writing_interventions/buttons/rb.png";
import sq from "../../../assets/writing_interventions/buttons/sq.png";
import zb from "../../../assets/writing_interventions/buttons/zb.png";

const WritingGameMenu = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center p-4"
      style={{
        backgroundImage: `url(${back_image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-5xl font-bold text-white mb-[55px] drop-shadow-2xl bg-clip-text text-transparent animate-pulse relative left-3">
        <span className="bg-black/30 px-4 py-2 rounded-3xl shadow-xl border border-white/90 text-shadow-xl">
          ලිවීමේ හැකියා වර්ධනය සඳහා මඟ හුරුව
        </span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-8xl mx-auto">
        {/* writing Game Card */}
        <div
          onClick={() => navigate("/writing-game1-level1")}
          className="cursor-pointer bg-white/60 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition duration-300 flex flex-col items-center justify-center relative w-90 h-99"
        >
          <img
            src={rb}
            alt="rb"
            className="w-32 h-32 object-contain mb-[-15px]"
          />
          <img
            src={letters}
            alt="writing game"
            className="w-48 h-48 object-contain mb-4 rounded-lg"
          />
          <h2 className="text-center text-3xl font-semibold text-gray-800">
            අකුරු හුරුව
          </h2>
        </div>
        {/* card flip Game Card */}
        <div
          onClick={() => navigate("/writing-game2-ins")}
          className="cursor-pointer bg-white/60 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition duration-300 flex flex-col items-center justify-center relative w-90 h-97"
        >
          <img
            src={sq}
            alt="sq"
            className="w-32 h-32 object-contain mb-[-15px]"
          />
          <img
            src={wovel_symbols}
            alt="card flip Game"
            className="w-48 h-48 object-contain mb-4 rounded-lg"
          />
          <h2 className="text-center text-3xl font-semibold text-gray-800">
            පිල්ලම් හුරුව
          </h2>
        </div>
        {/* puntuation Game Card */}
        <div
          onClick={() => navigate("/writing-game3-level1")}
          className="cursor-pointer bg-white/60 backdrop-blur-sm rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition duration-300 flex flex-col items-center justify-center relative w-90 h-99"
        >
          <img
            src={zb}
            alt="zb"
            className="w-32 h-32 object-contain mb-[-15px]"
          />
          <img
            src={puntuations}
            alt="puntuations Game"
            className="w-48 h-48 object-contain mb-4 rounded-lg"
          />
          <h2 className="text-center text-3xl font-semibold text-gray-800">
            විරාම ලක්ෂණ හුරුව
          </h2>
        </div>
      </div>
    </div>
  );
};

export default WritingGameMenu;

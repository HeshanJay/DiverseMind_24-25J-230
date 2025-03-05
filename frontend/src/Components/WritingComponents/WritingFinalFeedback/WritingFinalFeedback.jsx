// import React, { useState, useEffect } from "react";
// import { MdHome, MdMenu, MdRefresh } from "react-icons/md";
// import backgroundImg from "../../../assets/background_images/feedback.jpg";
// import "./WritingFinalFeedback.css"; // Import the CSS file

// const WritingFinalFeedback = ({
//   finalPredictionData,
//   onGoHome, // function to go Home
//   onGoMenu, // function to go Main Menu
//   onRetry, // function to retry
// }) => {
//   if (!finalPredictionData) return null;

//   // Convert skill_level to a kid-friendly phrase
//   let skillPhrase = "";
//   if (finalPredictionData.skill_level === "Good") {
//     skillPhrase = "ඉතා හොඳයි!";
//   } else if (finalPredictionData.skill_level === "Average") {
//     skillPhrase = "හොඳයි!";
//   } else if (finalPredictionData.skill_level === "Weak") {
//     skillPhrase = "උනන්දු විය යුතුයි!";
//   } else {
//     skillPhrase = "Cannot be determined...";
//   }

//   // Manage whether sprinkles are visible
//   const [showSprinkles, setShowSprinkles] = useState(true);

//   // Generate random sprinkles
//   const sprinkles = Array.from({ length: 30 }).map((_, index) => (
//     <div
//       key={index}
//       className="sprinkle"
//       style={{
//         left: `${Math.random() * 100}vw`,
//         animationDelay: `${Math.random() * 0.5}s`,
//         animationDuration: `${1.5 + Math.random() * 1}s`,
//       }}
//     />
//   ));

//   // Hide sprinkles after ~1.5 seconds (customizable)
//   useEffect(() => {
//     const timer = setTimeout(() => setShowSprinkles(false), 1500);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
//       {/* Background image + overlay */}
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage: `url(${backgroundImg})`,
//           backgroundSize: "cover",
//           backgroundRepeat: "no-repeat",
//         }}
//       />
//       <div className="absolute inset-0 bg-black bg-opacity-50" />

//       {/* Sprinkles, if still shown */}
//       {showSprinkles && <div className="sprinkles-container">{sprinkles}</div>}

//       {/*
//         Popup container with a pop-in animation,
//         and a fixed width of w-[400px] (unchanged from earlier).
//       */}
//       <div className="z-10 popup-box">
//         <div className="relative bg-white p-6 rounded-lg shadow-lg w-[400px]">
//           <h2 className="text-5xl font-bold mb-4 text-center text-green-800">
//             ඔබේ ප්‍රතිඵලය
//           </h2>
//           <p className="text-3xl text-center mb-4 text-purple-700 font-extrabold">
//             {skillPhrase}
//           </p>

//           {/* Icon buttons row at bottom */}
//           <div className="flex justify-around mt-6">
//             {/* Home button */}
//             <button
//               className="bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center
//                          hover:bg-blue-600 transition-colors duration-200"
//               onClick={onGoHome}
//               title="Home"
//             >
//               <MdHome size={30} />
//             </button>

//             {/* Main Menu button */}
//             <button
//               className="bg-orange-400 text-white rounded-full w-14 h-14 flex items-center justify-center
//                          hover:bg-orange-500 transition-colors duration-200"
//               onClick={onGoMenu}
//               title="Main Menu"
//             >
//               <MdMenu size={30} />
//             </button>

//             {/* Retry button */}
//             <button
//               className="bg-pink-500 text-white rounded-full w-14 h-14 flex items-center justify-center
//                          hover:bg-pink-600 transition-colors duration-200"
//               onClick={onRetry}
//               title="Retry"
//             >
//               <MdRefresh size={30} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WritingFinalFeedback;

import React from "react";
import { FaRedoAlt, FaHome, FaBars } from "react-icons/fa";
import backgroundImg from "../../../assets/background_images/feedback.jpg";
import "./WritingFinalFeedback.css";

const WritingFinalFeedback = ({
  finalPredictionData,
  onGoHome,
  onGoMenu,
  onRetry, // used for retry/restart
}) => {
  if (!finalPredictionData) return null;

  // Convert skill_level to a kid-friendly phrase
  let skillPhrase = "";
  if (finalPredictionData.skill_level === "Good") {
    skillPhrase = "ඉතා හොඳයි!";
  } else if (finalPredictionData.skill_level === "Average") {
    skillPhrase = "හොඳයි!";
  } else if (finalPredictionData.skill_level === "Weak") {
    skillPhrase = "උනන්දු විය යුතුයි!";
  } else {
    skillPhrase = "Cannot be determined...";
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative flex flex-col"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Overlay to reduce brightness */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Falling multicolored glowing snow balls */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="snowball"
          style={{
            left: "10%",
            animationDelay: "0s",
            width: "10px",
            height: "10px",
            "--color": "#FF69B4",
          }}
        ></div>
        <div
          className="snowball"
          style={{
            left: "30%",
            animationDelay: "1s",
            width: "15px",
            height: "15px",
            "--color": "#1E90FF",
          }}
        ></div>
        <div
          className="snowball"
          style={{
            left: "50%",
            animationDelay: "2s",
            width: "8px",
            height: "8px",
            "--color": "#FF69B4",
          }}
        ></div>
        <div
          className="snowball"
          style={{
            left: "70%",
            animationDelay: "3s",
            width: "12px",
            height: "12px",
            "--color": "#1E90FF",
          }}
        ></div>
        <div
          className="snowball"
          style={{
            left: "90%",
            animationDelay: "4s",
            width: "20px",
            height: "20px",
            "--color": "#FF69B4",
          }}
        ></div>
      </div>

      {/* Title, feedback message, and celebration */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center pb-10">
        <div className="text-center mt-7">
          <h1
            className="text-6xl font-bold text-white mb-3"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}
          >
            🎉ඔබේ ප්‍රතිඵලය🎉
          </h1>
          <p className="text-4xl text-white font-extrabold mb-4">
            {skillPhrase}
          </p>
        </div>
      </div>

      {/* Navigation buttons positioned at the top-right (adjust as needed) */}
      <div className="absolute right-[280px] top-[200px] flex flex-col items-center gap-6">
        <button
          onClick={() => navigate("/writingtest")}
          className="cursor-pointer bg-gradient-to-r from-cyan-400 to-blue-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-110 transition-transform duration-300"
          title="Retry"
        >
          <FaRedoAlt />
        </button>
        <button
          onClick={() => navigate("/home")}
          className="cursor-pointer bg-gradient-to-r from-yellow-400 to-yellow-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-110 transition-transform duration-300"
          title="Home"
        >
          <FaHome />
        </button>
        <button
          onClick={() => navigate("/screening-menu")}
          className="cursor-pointer bg-gradient-to-r from-pink-400 to-red-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-110 transition-transform duration-300"
          title="Menu"
        >
          <FaBars />
        </button>
      </div>
    </div>
  );
};

export default WritingFinalFeedback;

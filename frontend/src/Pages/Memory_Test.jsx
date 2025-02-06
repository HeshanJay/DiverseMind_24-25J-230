import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import backImg from "../assets/background_images/back3.jpg";
import { useScores } from "../context/Score_context";

const MemoryTests = () => {
  const tests = [
    { id: 1, name: "දෘශ්‍ය විෂමතා පරීක්ෂණය" },
    { id: 2, name: "මතක පරීක්ෂණය" },
    { id: 3, name: "වේගය විශ්ලේෂණ පරීක්ෂණය" },
    { id: 4, name: "ශ්‍රව්‍ය විෂමතා පරීක්ෂණය" },
    { id: 5, name: "භාෂා ශබ්ද කෝෂ දැනුම පරීක්ෂණය" },
  ];

  const {
    currentTestName,
    setCurrentTestName,
  } = useScores();

  const navigate = useNavigate(); // Initialize the navigate function

  
  const handleStartClick = () => {
    navigate("/visual-test"); 
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backImg})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-8 animate-pulse">
          මතකය පරීක්ෂා කරමු
        </h1>

        {/* Start Button on the right bottom */}
        <button
          className="absolute right-8 bottom-8 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-teal-500 h-16 w-48 flex items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 hover:rotate-2"
          onClick={handleStartClick} // Use handleStartClick to navigate
        >
          ආරම්භ කරන්න
        </button>

        {/* Test Buttons */}
        <div className="flex flex-col items-center gap-6">
          {tests.map((test) => (
            <Link
              key={test.id}
              to={test.link}
              className="text-lg md:text-2xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 h-16 w-72 flex items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 hover:rotate-1 hover:bg-gradient-to-l"
              onClick={() => setCurrentTestName(test.name)}
            >
              {test.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryTests;

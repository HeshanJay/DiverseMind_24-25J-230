import React from "react";
import memoryBoard from "../../assets/Working_Memory/memory_board1.png";
import { useScores } from "../../context/Score_context";

const MemoryTests = ({ onNext }) => {
  const { setCurrentTestName } = useScores();

  const handleStart = () => {
    setCurrentTestName("මතක පරීක්ෂණය");
    onNext();
  };

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${memoryBoard})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col justify-between items-center h-full text-center pb-8">
        <div className="mt-auto mb-40 space-y-6" style={{ width: "100%" }}>
          <h1 className="text-white text-7xl md:text-7xl font-bold">
            <div
              style={{
                textAlign: "right",
                paddingRight: "400px",
              }}
            >
              <span className="bg-gradient-to-r from-emerald-200 via-green-200 to-teal-200 text-transparent bg-clip-text drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                මතකය පරීක්ෂා
              </span>
            </div>
            <div
              style={{
                paddingLeft: "20px",
              }}
            >
              <span className="bg-gradient-to-l from-emerald-200 via-green-200 to-teal-200 text-transparent bg-clip-text drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                කරමු
              </span>
            </div>
          </h1>
        </div>
        <button
          onClick={handleStart}
          style={{
            marginLeft: "auto",
            marginRight: "505px",
            marginTop: "-20px",
            padding: "15px 48px",
            border: "2px solid rgb(110 231 183)",
            transform: "scale(1)",
          }}
          className="mb-8 text-2xl font-bold text-white 
           rounded-full shadow-2xl
           bg-gradient-to-br from-[#15803d] via-[#34d399] to-[#075985]
           hover:bg-gradient-to-bl hover:from-[#16a34a] hover:via-[#10b981] hover:to-[#0369a1]
           transition-all duration-500 hover:scale-110
           animate-pulse-slow"
        >
          ආරම්භ කරමු
        </button>
      </div>
    </div>
  );
};

export default MemoryTests;

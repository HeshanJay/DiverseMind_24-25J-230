import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import backImg from "../assets/background_images/back3.jpg";

const MemoryTests = () => {
  const tests = [
    { id: 1, name: "දෘශ්‍ය විෂමතා පරීක්ෂණය", link:"/visual-test" },
    { id: 2, name: "මතක පරීක්ෂණය", link:"/memory-measurement-test" }, 
    { id: 3, name: "වේගය විශ්ලේෂණ පරීක්ෂණය", link: "/speed-measurement-test" },
    { id: 4, name: "ශ්‍රව්‍ය විෂමතා පරීක්ෂණය", link: "/audio-test" },
    { id: 5, name: "භාෂා ශබ්ද කෝෂ දැනුම පරීක්ෂණය", link: "/language-vocab-test" },
  ];

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
        <div className="flex flex-col items-center gap-6">
          {tests.map((test) => (
            <Link
              key={test.id}
              to={test.link}
              className="text-lg md:text-2xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 h-16 w-72 flex items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 hover:rotate-1 hover:bg-gradient-to-l"
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



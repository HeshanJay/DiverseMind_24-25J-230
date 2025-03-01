import React from "react";
import { FaPencilAlt, FaBrain, FaCalculator, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import backgroundImg from "../../assets/background_images/menu_back4.webp";

// Import design icons (adjust the file extensions if needed)
import writing1 from "../../assets/design_images/writing1.png";
import attention1 from "../../assets/design_images/attention1.png";
import math1 from "../../assets/design_images/math1.png";
import memory1 from "../../assets/design_images/memory1.png";
import writing2 from "../../assets/design_images/writing2.png";
import attention2 from "../../assets/design_images/attention2.png";
import math2 from "../../assets/design_images/math2.png";
import memory2 from "../../assets/design_images/memory2.png";
import writing3 from "../../assets/design_images/writing3.png";
import attention3 from "../../assets/design_images/attention3.png";
import math3 from "../../assets/design_images/math3.png";
import memory3 from "../../assets/design_images/memory3.png";

import "./ScreeningMenu.css";

const ScreeningMenu = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* --- Floating Icons --- */}
      {/* Left Side Icons */}
      <div className="absolute left-[2%] top-[20%] animate-float w-10 h-10">
        <img src={writing1} alt="writing1" className="w-full h-full" />
      </div>
      <div className="absolute left-[2%] top-[50%] animate-float-delayed w-10 h-10">
        <img src={attention1} alt="attention1" className="w-full h-full" />
      </div>
      <div className="absolute left-[2%] top-[80%] animate-float w-10 h-10">
        <img src={math1} alt="math1" className="w-full h-full" />
      </div>

      {/* Right Side Icons */}
      <div className="absolute right-[2%] top-[20%] animate-float-delayed w-10 h-10">
        <img src={memory1} alt="memory1" className="w-full h-full" />
      </div>
      <div className="absolute right-[2%] top-[50%] animate-float w-10 h-10">
        <img src={writing2} alt="writing2" className="w-full h-full" />
      </div>
      <div className="absolute right-[2%] top-[80%] animate-float-delayed w-10 h-10">
        <img src={attention2} alt="attention2" className="w-full h-full" />
      </div>

      {/* Top Side Icons */}
      <div className="absolute top-[2%] left-[20%] animate-float w-10 h-10">
        <img src={math2} alt="math2" className="w-full h-full" />
      </div>
      <div className="absolute top-[2%] left-[50%] animate-float-delayed w-10 h-10">
        <img src={memory2} alt="memory2" className="w-full h-full" />
      </div>
      <div className="absolute top-[2%] left-[80%] animate-float w-10 h-10">
        <img src={writing3} alt="writing3" className="w-full h-full" />
      </div>

      {/* Bottom Side Icons */}
      <div className="absolute bottom-[2%] left-[20%] animate-float-delayed w-10 h-10">
        <img src={attention3} alt="attention3" className="w-full h-full" />
      </div>
      <div className="absolute bottom-[2%] left-[50%] animate-float w-10 h-10">
        <img src={math3} alt="math3" className="w-full h-full" />
      </div>
      <div className="absolute bottom-[2%] left-[80%] animate-float-delayed w-10 h-10">
        <img src={memory3} alt="memory3" className="w-full h-full" />
      </div>

      {/* --- Title --- */}
      <h1 className="animate-bounceIn text-5xl font-bold text-white text-shadow-lg bg-gradient-to-r from-amber-400 to-orange-600 px-8 py-4 rounded-2xl border-4 border-white text-center mb-20 transform-gpu">
        <span className="animate-spin-slow inline-block mr-4"></span>
        ඔබේ හැකියාවන් පරීක්ෂා කරමු!
        <span className="animate-wiggle inline-block ml-4"></span>
      </h1>

      {/* --- Menu Buttons --- */}
      <div className="flex flex-wrap justify-center items-center gap-8 max-w-[90%]">
        {[
          {
            path: "/writingtest",
            color: "from-green-400 to-green-600",
            icon: <FaPencilAlt className="text-5xl mb-2 text-white" />,
            text: "ලිවීමේ හැකියා පරීක්‍ෂා කරමු",
            gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG93cHNlMTY0YXU5aWxldWt2bGhiYTNuMDg0enU5aDJiaTIwcXVicSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/bXL4rsrE3Jwkh5nl0Q/giphy.gif",
          },
          {
            path: "/attentionreadingtest",
            color: "from-blue-400 to-blue-600",
            icon: <FaEye className="text-5xl mb-2 text-white" />,
            text: "අවධානය පරීක්ෂා කරමු",
            gif: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXpxdno3N3VxcTI0bjhoNWhoMDZiZ244ejBiYWgyMXh6bThmcDhxbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/m1DTSDg8TM0JxWwPjY/giphy.gif",
          },
          {
            path: "/math",
            color: "from-purple-400 to-purple-600",
            icon: <FaCalculator className="text-5xl mb-2 text-white" />,
            text: "ගණිත හැකියා පරීක්‍ෂා කරමු",
            gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExazU4OWc5aGs1a2tqdGtoeHJ6bjQxZWd6ZDBlYXkwa2g4aXFsaW50NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ls9BbFKwDUWxpjbS5l/giphy.gif",
          },
          {
            path: "/working-memory",
            color: "from-red-400 to-red-600",
            icon: <FaBrain className="text-5xl mb-2 text-white" />,
            text: "මතක ශක්තිය පරීක්‍ෂා කරමු",
            gif: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMG1idzQxMTlyeWd5ajFhY240OXl1anNnNWx0aWdkcm9mYmp2YjF6NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XueUE4FyLZID0W2A9Q/giphy.gif",
          },
        ].map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className={`relative flex flex-col items-center text-center w-[220px] h-[160px] bg-gradient-to-r ${item.color} text-white text-2xl font-bold p-4 rounded-2xl border-3 border-white shadow-md hover:scale-110 hover:bg-gradient-to-l transition-all duration-300 group overflow-hidden`}
          >
            <div className="absolute inset-0 w-full h-full">
              <img
                src={item.gif}
                alt="animation"
                className="w-full h-full object-cover opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              />
            </div>
            {item.icon}
            <span className="relative z-10">{item.text}</span>
            <div className="absolute -bottom-2 -right-2 text-3xl opacity-70 animate-bounce-slow"></div>
          </button>
        ))}
      </div>

      {/* --- Floating Bubbles (among the icons) --- */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: `${Math.random() * 10 + 10}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ScreeningMenu;

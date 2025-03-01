import React from "react";
import { FaRedoAlt, FaHome, FaBars } from "react-icons/fa";
import img5 from "../../assets/Working_Memory/img8.png";
import img12 from "../../assets/Working_Memory/img12.png"; // Animated celebration image
import { useNavigate } from "react-router-dom";

const MemoryFinal_Feedback = ({ predictionResult, onGoHome, onGoMenu, onRetry, onRestart }) => {
  const navigate = useNavigate();
  let feedbackText = "ප්‍රතිපල ලබා ගැනෙමින්...";

  if (predictionResult) {
    const prediction = predictionResult.trim().toLowerCase();
    if (prediction === "normal") {
      feedbackText = "ඉතා හොඳයි!";
    } else if (prediction === "medium") {
      feedbackText = "හොඳයි!";
    } else if (prediction === "low") {
      feedbackText = "උනන්දු විය යුතුයි!";
    }
  }
  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed relative flex flex-col" style={{ backgroundImage: `url(${img5})` }}>
      
      {/* ✅ Added an Overlay to Reduce Opacity */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div> 

      {/* Falling multicolored glowing snow balls */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="snowball" style={{ left: "10%", animationDelay: "0s", width: "10px", height: "10px", "--color": "#FF69B4" }}></div>
        <div className="snowball" style={{ left: "30%", animationDelay: "1s", width: "15px", height: "15px", "--color": "#1E90FF" }}></div>
        <div className="snowball" style={{ left: "50%", animationDelay: "2s", width: "8px", height: "8px", "--color": "#FF69B4" }}></div>
        <div className="snowball" style={{ left: "70%", animationDelay: "3s", width: "12px", height: "12px", "--color": "#1E90FF" }}></div>
        <div className="snowball" style={{ left: "90%", animationDelay: "4s", width: "20px", height: "20px", "--color": "#FF69B4" }}></div>
      </div>

      {/* Title, Feedback, and Animated Celebration Image */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center pb-10">
        <div className="text-center mt-7">
          <h1 className="text-4xl font-bold text-white mb-3" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}>
            🎉ඔබේ ප්‍රතිඵලය🎉
          </h1>

          {/* ✅ Navigation Buttons are Now Below the Heading */}
          <div className="absolute right-[250px] top-[200px] flex flex-col items-center gap-6">
            <button onClick={onRestart} className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-105 transition-transform duration-300">
              <FaRedoAlt />
            </button>
            <button onClick={onGoHome || (() => navigate("/home"))} className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-105 transition-transform duration-300">
              <FaHome />
            </button>
            <button onClick={onGoMenu || (() => navigate("/menu"))} className="bg-gradient-to-r from-pink-400 to-red-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg hover:scale-105 transition-transform duration-300">
              <FaBars />
            </button>
          </div>



          <h2 className="text-5xl font-bold text-white mt-6" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.7)" }}>
            {feedbackText}
          </h2>
        </div>
        <div className="flex justify-center mt-16">
          <img src={img12} alt="Celebration" className="w-24 h-auto animate-bounce mt-1" />
        </div>
      </div>

      {/* Snowball Animations */}
      <style>{`
        .snowball {
          position: absolute;
          top: -50px;
          background: linear-gradient(to bottom, #ff69b4, #1e90ff); /* 🎀 Pink to Blue Gradient */
          border-radius: 50%;
          animation: fall 5s linear infinite, pulse 2s ease-in-out infinite;
          opacity: 0.9;
        }
        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 5px 2px var(--color); }
          50% { box-shadow: 0 0 15px 5px var(--color); }
        }
      `}</style>
    </div>
  );
};

export default MemoryFinal_Feedback;

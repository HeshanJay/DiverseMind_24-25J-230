import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRedo, FaArrowRight, FaEllipsisH } from "react-icons/fa";
import "./WritingGame1ScoreBoard.css";

import goldenPencil from "../../../assets/writing_interventions/icons/golden_pencil.png";
import backgroundImage from "../../../assets/writing_interventions/background/back6.webp";

/* ─── NEW: click-sound ─── */
import clickSound from "../../../assets/Audios/click_sound.mp3";

const WritingGame1ScoreBoard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, goldenPensCount, bestScore } = location.state || {
    score: 0,
    goldenPensCount: 0,
    bestScore: 0,
  };

  /* ─── set-up simple audio helper ─── */
  const clickRef = useRef(null);
  const play = (r) => {
    if (r.current) {
      r.current.currentTime = 0;
      r.current.play();
    }
  };

  useEffect(() => {
    clickRef.current = new Audio(clickSound);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-6 relative"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${backgroundImage})`,
      }}
    >
      {/* Score Board Content */}
      <div className="bg-white bg-opacity-70 p-6 rounded-lg mb-8 shadow-xl">
        <h2 className="text-5xl font-bold text-purple-800">ලකුණු පුවරුව</h2>
      </div>

      <div className="bg-white bg-opacity-70 p-8 rounded-xl shadow-2xl mb-8 text-center space-y-6">
        <p className="text-4xl text-orange-700 font-bold mb-4">
          මුළු ලකුණු: {score}
        </p>

        <div className="flex justify-center items-center text-3xl">
          <span className="mr-4 text-yellow-800 font-semibold">ත්‍යාග:</span>
          <div className="flex bg-opacity-70 bg-green-100 px-4 py-2 rounded-full">
            {[...Array(goldenPensCount)].map((_, i) => (
              <img
                key={`filled-${i}`}
                src={goldenPencil}
                alt="Golden Pencil"
                className="w-12 h-12 mx-1 transform hover:scale-110 transition-transform"
              />
            ))}
          </div>
        </div>

        <p className="text-3xl text-blue-800 font-bold">
          හොඳම ලකුණු: {bestScore}
        </p>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-6 mt-8">
        <button
          onClick={() => {
            play(clickRef);
            navigate("/writing-game1-level1");
          }}
          className="nav-button bg-blue-600 hover:bg-blue-700"
        >
          <FaRedo size={28} />
        </button>

        <button
          onClick={() => {
            play(clickRef);
            navigate("/writing-game2-menu");
          }}
          className="nav-button bg-green-600 hover:bg-green-700"
        >
          <FaArrowRight size={28} />
        </button>

        <button
          onClick={() => {
            play(clickRef);
            navigate("/writing-game-menu");
          }}
          className="nav-button bg-purple-600 hover:bg-purple-700"
        >
          <FaEllipsisH size={28} />
        </button>
      </div>
    </div>
  );
};

export default WritingGame1ScoreBoard;

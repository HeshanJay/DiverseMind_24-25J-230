import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaRedo, FaArrowRight, FaEllipsisH } from "react-icons/fa";
import "./WritingGame3ScoreBoard.css";

/* ─── NEW: click-sound ─── */
import clickSound from "../../../assets/Audios/click_sound.mp3";

const WritingGame3ScoreBoard = ({ totalPoints, stars }) => {
  const navigate = useNavigate();

  /* simple audio helper */
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

  /* build star string */
  const filledStars = "⭐".repeat(stars);
  const emptyStars = "☆".repeat(6 - stars);

  return (
    <div className="scoreboard-wrapper">
      <div className="scoreboard-container">
        <h2 className="scoreboard-title">🎉 ලකුණු පුවරුව 🎉</h2>

        <div className="scoreboard-info">
          <p className="scoreboard-points">
            මුළු ලකුණු: <span>{totalPoints}</span> / 30
          </p>
          <p className="scoreboard-stars">
            ත්‍යාග: {filledStars}
            {emptyStars}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="nav-btn-row">
          <button
            onClick={() => {
              play(clickRef);
              navigate("/writing-game3-level1", { replace: true });
              navigate(0); // refresh (v6.4+)
            }}
            className="nav-button bg-blue"
            title="නැවත සිට අරඹන්න"
          >
            <FaRedo size={24} />
          </button>

          <button
            onClick={() => {
              play(clickRef);
              navigate("/writing-game-menu");
            }}
            className="nav-button bg-green"
            title="ඊළඟ ක්‍රීඩාව"
          >
            <FaArrowRight size={24} />
          </button>

          <button
            onClick={() => {
              play(clickRef);
              navigate("/writing-game-menu");
            }}
            className="nav-button bg-purple"
            title="මුල් මෙනුව"
          >
            <FaEllipsisH size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WritingGame3ScoreBoard;

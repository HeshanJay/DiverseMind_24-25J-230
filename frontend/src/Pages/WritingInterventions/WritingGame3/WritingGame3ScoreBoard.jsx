import React from "react";
import "./WritingGame3ScoreBoard.css";

const WritingGame3ScoreBoard = ({ totalPoints, stars }) => {
  // Create star display: filled stars for earned, empty for the remaining out of 6.
  const filledStars = "⭐".repeat(stars);
  const emptyStars = "☆".repeat(6 - stars);

  return (
    <div className="scoreboard-container">
      <h2 className="scoreboard-title">Score Board</h2>
      <div className="scoreboard-info">
        <p className="scoreboard-points">Total Points: {totalPoints} / 30</p>
        <p className="scoreboard-stars">
          Stars: {filledStars}
          {emptyStars}
        </p>
      </div>
    </div>
  );
};

export default WritingGame3ScoreBoard;

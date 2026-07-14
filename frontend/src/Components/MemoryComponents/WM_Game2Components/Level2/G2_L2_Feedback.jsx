import React from 'react';
import PropTypes from 'prop-types';
import { FaRedo, FaArrowRight, FaEllipsisH } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import jungle_feedback1 from "../../../../assets/WM_Interventions_images/L2_images/jungle_feedback1.png";

const G2_L2_Feedback = ({ activity1Score = 0, activity2Score = 0, handleRetry }) => {
  const totalScore = activity1Score + activity2Score;
  const maxScore = 24;
  const percentage = (totalScore / maxScore) * 100;
  const roundedPercentage = Math.round(percentage);
  const navigate = useNavigate();

  let message;
  let celebration = false;

  if (totalScore === maxScore) {
    message = "විශිෂ්ටයි! ඔබ සාර්ථකයි 🎉";
    celebration = true;
  } else if (totalScore >= 18) {
    message = "ඉතා හොඳයි! ඔබ එය හොඳින් කළා";
  } else if (totalScore >= 12) {
    message = "හොඳයි! ඔබ එය හොඳින් කළා";
  } else {
    message = "ඔබේ උත්සහය හොඳයි, නැවත උත්සාහ කරන්න!";
  }

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${jungle_feedback1})` }}
    >
      {celebration && (
        <img
          src={fish20}
          alt="Celebration"
          className="w-48 h-48 mb-8 animate-bounce"
        />
      )}

      <div className="bg-gradient-to-r from-green-200/90 via-emerald-300/100 to-lime-400/90 p-8 rounded-[2rem] shadow-md w-[520px] h-[520px] relative border-8 border-green-700">
        <h1 className="text-5xl font-bold mb-8 text-center text-blue-900">
          ලකුණු පුවරුව
        </h1>

        {/* Score Box */}
        <div className="bg-white/60 p-6 rounded-2xl shadow-lg mb-8 w-[70%] mx-auto">
          <div className="text-2xl text-green-800 text-center font-bold">
            <span className="font-semibold">ක්‍රියාකාරකම 1:</span> {activity1Score}/12
          </div>
          <div className="text-2xl text-green-800 text-center font-bold mt-4">
            <span className="font-semibold">ක්‍රියාකාරකම 2:</span> {activity2Score}/12
          </div>
          <div className="text-3xl font-bold mt-4 text-purple-800 text-center">
            සම්පූර්ණ ලකුණු: {totalScore}/24
          </div>
        </div>

        <p className="text-3xl mb-6 text-blue-900 text-center font-bold">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleRetry}
            className="w-16 h-16 flex items-center justify-center bg-blue-500 rounded-full text-white hover:bg-blue-600 transition duration-200"
          >
            <FaRedo size={28} />
          </button>
          <button
            onClick={() => navigate("/WM_Game2Menu")}
            className="w-16 h-16 flex items-center justify-center bg-green-500 rounded-full text-white hover:bg-green-600 transition duration-200"
          >
            <FaArrowRight size={28} />
          </button>
          <button
            onClick={() => navigate("/WM_Menu")}
            className="w-16 h-16 flex items-center justify-center bg-purple-500 rounded-full text-white hover:bg-purple-600 transition duration-200"
          >
            <FaEllipsisH size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

G2_L2_Feedback.propTypes = {
  activity1Score: PropTypes.number,
  activity2Score: PropTypes.number,
  handleRetry: PropTypes.func,
};

export default G2_L2_Feedback;
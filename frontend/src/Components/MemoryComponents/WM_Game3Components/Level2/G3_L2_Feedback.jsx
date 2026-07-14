import React from 'react';
import PropTypes from 'prop-types';
import { FaRedo, FaArrowRight, FaEllipsisH } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import snowBack_feedback from "../../../../assets/WM_Interventions_images/L3_images/snowBack_feedback.jpg";

const G3_L2_Feedback = ({ totalScore, handleRetry }) => {
  const navigate = useNavigate();
  const maxScore = 25;

  const filledStars = (() => {
    if (totalScore === 25) return 5;
    if (totalScore >= 20) return 4;
    if (totalScore >= 15) return 3;
    if (totalScore >= 10) return 2;
    return 1;
  })();

  const feedbackMessage = () => {
    if (totalScore === 25) return "විශිෂ්ටයි! ඔබ සාර්ථකයි";
    if (totalScore >= 20) return "ඉතාමත් හොඳයි! ඔබ ඉතා හොඳින් කළා";
    if (totalScore >= 15) return "හොඳයි! ඔබ එය හොඳින් කළා";
    if (totalScore >= 10) return "සාමාන්යයි! තවත් පුහුණුව අවශ්යයි";
    return "ඔබේ උත්සහය හොඳයි! නැවත උත්සාහ කරන්න!";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
         style={{ backgroundImage: `url(${snowBack_feedback})` }}>

<div className="bg-gradient-to-br from-blue-100/80 via-gray-10/70 to-blue-50/90 p-8 rounded-[2rem] shadow-lg w-[520px] h-[420px] relative border-8 border-cyan-300/60 backdrop-blur-sm">
  {/* Header */}
  <h1 className="text-5xl font-bold mb-8 text-center text-slate-1000/90">
    ලකුණු පුවරුව
  </h1>

  {/* Score Display */}
  <p className="text-4xl mb-7 text-slate-900/85 text-center font-bold">
    ඔබේ ලකුණු: {totalScore} / 25
  </p>

  {/* Feedback Message */}
  <p className="text-2xl mb-6 text-slate-700/90 text-center font-semibold">
    {feedbackMessage()}
  </p>
        <div className="flex justify-center mb-8">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-12 h-12 mx-1 ${
                index < filledStars ? "text-yellow-400" : "text-gray-200"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleRetry}
            className="w-16 h-16 flex items-center justify-center bg-blue-500 rounded-full text-white hover:bg-blue-600 transition duration-200"
          >
            <FaRedo size={28} />
          </button>
          <button
            onClick={() => navigate("/WM_Game3Menu")}
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

G3_L2_Feedback.propTypes = {
  totalScore: PropTypes.number.isRequired,
  handleRetry: PropTypes.func.isRequired
};

export default G3_L2_Feedback;
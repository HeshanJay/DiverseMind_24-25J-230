import React from 'react'
import PropTypes from 'prop-types'
import { FaRedo, FaArrowRight, FaEllipsisH } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import jungle_feedback1 from "../../../../assets/WM_Interventions_images/L2_images/jungle_feedback1.png"

const G2_L1_Feedback = ({ totalScore = 0, handleRetry }) => {
  const navigate = useNavigate()
  const totalMarks = 25

  // Star rating logic
  const filledStars = (() => {
    if (totalScore === 25) return 5
    if (totalScore >= 20) return 4
    if (totalScore >= 10) return 3
    return 1
  })()

  // Feedback message logic
  const feedbackMessage = () => {
    if (totalScore === 25) return "විශිෂ්ටයි! ඔබ සාර්ථකයි"
    if (totalScore >= 20) return "ඉතා හොඳයි! ඔබ එය හොඳින් කළා"
    if (totalScore >= 10) return "හොඳයි! ඔබ එය හොඳින් කළා"
    return "ඔබේ උත්සහය හොඳයි! නැවත උත්සාහ කරන්න!"
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
         style={{ backgroundImage: `url(${jungle_feedback1})` }}>
      
      {totalScore === 25 && (
        <img src={fish20} alt="Celebration" className="w-48 h-48 mb-8 animate-bounce" />
      )}

      <div className="bg-gradient-to-r from-green-200/90 via-emerald-300/100 to-lime-400/90 p-8 rounded-[2rem] shadow-md w-[520px] h-[460px] relative border-8 border-green-700">
        <h1 className="text-5xl font-bold mb-8 text-center text-green-900">
          ලකුණු පුවරුව
        </h1>

        {/* Score Display */}
        <p className="text-4xl mb-7 text-blue-800 text-center font-bold">
          ඔබේ ලකුණු: {totalScore} / 25
        </p>

        {/* Feedback Message */}
        <p className="text-3xl mb-6 text-green-900 text-center font-bold">
          {feedbackMessage()}
        </p>

        {/* Star Rating */}
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
  )
}

G2_L1_Feedback.propTypes = {
  totalScore: PropTypes.number,
  handleRetry: PropTypes.func,
}

export default G2_L1_Feedback;
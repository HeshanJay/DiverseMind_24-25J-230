import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../../../assets/background_images/Activity_back7.png';

const MathInstruction4 = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/math-funny-game-menu'); // Navigate to previous page
  };

  const handleForward = () => {
    navigate('/math-multiplication-game'); // Navigate to the game page
  };

  return (
    <div
      className="mi4-math-instruction-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Inline CSS for styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wght@400;500;700&display=swap');

        .mi4-math-instruction-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-size: cover;
          background-position: center;
          padding: 20px;
          box-sizing: border-box;
          font-family: 'Noto Sans Sinhala', sans-serif;
          animation: mi4-fadeIn 1s ease-in, mi4-translateEffect 15s ease-in-out infinite;
          overflow: auto;
          position: relative;
        }

        /* Dark overlay for readability */
        .mi4-math-instruction-page::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          z-index: 0;
        }

        /* Ensure content stays above overlay */
        .mi4-math-instruction-page > * {
          position: relative;
          z-index: 1;
        }

        .mi4-title {
          font-size: 3rem;
          font-weight: 700;
          color: #FF6347; /* Tomato red */
          text-shadow: 2px 2px 4px #000;
          margin-bottom: 20px;
          letter-spacing: 1px;
        }

        .mi4-instruction {
          background: rgba(255, 255, 255, 0.85);
          padding: 20px;
          border-radius: 10px;
          border: 4px solid #32CD32; /* Lime green border */
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          max-width: 60%;
          text-align: center;
          font-size: 1.2rem;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .mi4-instruction p {
          line-height: 1.5;
          letter-spacing: 0.5px;
        }

        .mi4-encouragement {
          font-size: 1.5rem;
          color: #4169E1; /* Royal blue */
          font-style: italic;
          margin-bottom: 30px;
          font-weight: 600;
          position: relative;
        }

        .mi4-encouragement::before,
        .mi4-encouragement::after {
          content: '✨';
          font-size: 1.5rem;
          position: absolute;
          top: 40%;
          transform: translateY(-50%);
        }

        .mi4-encouragement::before {
          left: -30px;
        }

        .mi4-encouragement::after {
          right: -30px;
        }

        .mi4-buttons {
          display: flex;
          justify-content: space-between;
          width: 100%;
          max-width: 90%;
          position: absolute;
          bottom: 30px;
          padding: 0 20px;
          box-sizing: border-box;
        }

        .mi4-back-button,
        .mi4-forward-button {
          padding: 10px 20px;
          font-size: 1.2rem;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          border: 2px solid #FFD700;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
        }

        .mi4-back-button {
          background-color: #FF6347;
          color: #fff;
        }

        .mi4-back-button:hover {
          background-color: #FF4500;
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        }

        .mi4-forward-button {
          background-color: #32CD32;
          color: #fff;
        }

        .mi4-forward-button:hover {
          background-color: #228B22;
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        }

        .mi4-back-button::before {
          content: '←';
          margin-right: 5px;
        }

        .mi4-forward-button::after {
          content: '→';
          margin-left: 5px;
        }

        @keyframes mi4-fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes mi4-translateEffect {
          0% { background-position: 49% 50%; }
          50% { background-position: 51% 50%; }
          100% { background-position: 49% 50%; }
        }

        /* Responsive adjustments */
        @media (max-width: 600px) {
          .mi4-title {
            font-size: 2rem;
          }
          .mi4-instruction {
            font-size: 1rem;
          }
          .mi4-encouragement {
            font-size: 1.8rem;
          }
          .mi4-back-button,
          .mi4-forward-button {
            font-size: 1rem;
            padding: 8px 16px;
          }
          .mi4-buttons {
            bottom: 20px;
            max-width: 95%;
          }
        }
      `}</style>

      <h1 className="mi4-title">ගණිත එකතු ක්‍රීඩාව !</h1>
      <div className="mi4-instruction">
        <p>
          මේකෙදි පුංචි ඔයාලට තියෙන්නේ ඔයාලා ඉගෙනගෙන තියෙන එකතුකිරීම පාවිච්චි කරලා නිවැරදි උත්තර දෙන එක. 
          මේකේ ප්‍රශ්නය පුවරුවේ පේනවා, පහළිනන් තියෙන උත්තර කාඩ් වලින් නිවැරදි කාඩ් එක තෝරන්න 
          හෝ කාඩය අරන් ගිහින් හිස්තැනෙන් තියන්න තමයි තියෙන්නේ.
        </p>
        <div className="mi4-encouragement">
          <p>හරිම ලේසියි !</p>
        </div>
      </div>
      <div className="mi4-buttons">
        <button className="mi4-back-button" onClick={handleBack}>
          ආපසු
        </button>
        <button className="mi4-forward-button" onClick={handleForward}>
          ඉදිරියට
        </button>
      </div>
    </div>
  );
};

export default MathInstruction4;
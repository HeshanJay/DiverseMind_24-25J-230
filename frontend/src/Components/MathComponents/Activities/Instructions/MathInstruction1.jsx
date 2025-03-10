import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../../../assets/background_images/Activity_back5.png';

const MathInstruction1 = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/math-funny-game-menu'); // Replace with your actual previous page route
  };

  const handleForward = () => {
    navigate('/math-addition-game'); // Replace with your actual game page route
  };

  return (
    <div
      className="mi1-math-instruction-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Inline scoped CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wght@400;500;700&display=swap');

        .mi1-math-instruction-page {
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
          animation: mi1-fadeIn 1s ease-in, kenBurns 20s ease infinite;
          overflow: auto;
          position: relative;
        }

        /* Dark overlay to darken the background image */
        .mi1-math-instruction-page::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          z-index: 0;
        }

        /* Ensure all content appears above the overlay */
        .mi1-math-instruction-page > * {
          position: relative;
          z-index: 1;
        }

        .mi1-title {
          font-size: 3rem;
          font-weight: 700;
          color: #FFD700;
          text-shadow: 2px 2px 4px #000;
          margin-bottom: 20px;
          letter-spacing: 1px;
        }

        .mi1-instruction {
          background: rgba(255, 255, 255, 0.8);
          padding: 20px;
          border-radius: 10px;
          border-width: 4px;
          border-color: #FF4500;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          max-width: 60%;
          text-align: center;
          font-size: 1.2rem;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .mi1-instruction p {
          line-height: 1.5;
          letter-spacing: 0.5px;
        }

        .mi1-encouragement {
          font-size: 1.5rem;
          color: #FF69B4;
          font-style: italic;
          margin-bottom: 30px;
          font-weight: 600;
          position: relative;
        }

        .mi1-encouragement::before,
        .mi1-encouragement::after {
          content: '✨';
          font-size: 1.5rem;
          position: absolute;
          top: 40%;
          transform: translateY(-50%);
        }

        .mi1-encouragement::before {
          left: -30px;
        }

        .mi1-encouragement::after {
          right: -30px;
        }

        .mi1-buttons {
          display: flex;
          justify-content: space-between;
          width: 100%;
          max-width: 90%;
          position: absolute;
          bottom: 30px;
          padding: 0 20px;
          box-sizing: border-box;
        }

        .mi1-back-button,
        .mi1-forward-button {
          padding: 10px 20px;
          font-size: 1.2rem;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          border-style: solid;
          border-width: 2px;
        }

        .mi1-back-button {
          background-color: #FF6347;
          color: #fff;
          border-color: #FFD700;
        }

        .mi1-back-button:hover {
          background-color: #FF4500;
        }

        .mi1-forward-button {
          background-color: #32CD32;
          color: #fff;
          border-color: #FFD700;
        }

        .mi1-forward-button:hover {
          background-color: #228B22;
        }

        .mi1-back-button::before {
          content: '←';
          margin-right: 5px;
        }

        .mi1-forward-button::after {
          content: '→';
          margin-left: 5px;
        }

        @keyframes mi1-fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Ken Burns effect for a beautiful background animation */
        @keyframes kenBurns {
          0% {
            background-size: 110%;
            background-position: center;
          }
          50% {
            background-size: 105%;
            background-position: center;
          }
          100% {
            background-size: 110%;
            background-position: center;
          }
        }

        /* Responsive styling for smaller screens */
        @media (max-width: 600px) {
          .mi1-title {
            font-size: 2rem;
          }
          .mi1-instruction {
            font-size: 1rem;
          }
          .mi1-encouragement {
            font-size: 1.8rem;
          }
          .mi1-back-button,
          .mi1-forward-button {
            font-size: 1rem;
            padding: 8px 16px;
          }
          .mi1-buttons {
            bottom: 20px;
            max-width: 95%;
          }
        }
      `}</style>

      <h1 className="mi1-title">ගණිත එකතු ක්‍රීඩාව !</h1>
      <div className="mi1-instruction">
        <p>
          මේකෙදි පුංචි ඔයාලට තියෙන්නේ ඔයාලා ඉගෙනගෙන තියෙන එකතුකිරීම පාවිච්චි කරලා නිවැරදි උත්තර දෙන එක. 
          මේකේ ප්‍රශ්නය පුවරුවේ පේනවා, පහළිනන් තියෙන උත්තර කාඩ් වලින් නිවැරදි කාඩ් එක තෝරන්න 
          හෝ කාඩය අරන් ගිහින් හිස්තැනෙන් තියන්න තමයි තියෙන්නේ.
        </p>
        <div className="mi1-encouragement">
          <p>හරිම ලේසියි !</p>
        </div>
      </div>
      <div className="mi1-buttons">
        <button className="mi1-back-button" onClick={handleBack}>
          ආපසු
        </button>
        <button className="mi1-forward-button" onClick={handleForward}>
          ඉදිරියට
        </button>
      </div>
    </div>
  );
};

export default MathInstruction1;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../../../assets/background_images/Activity_back6.png';

const MathInstruction2 = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/math-funny-game-menu'); // Navigates back to MathInstruction1
  };

  const handleForward = () => {
    navigate('/math-substraction-game'); // Navigates to the game page
  };

  return (
    <div
      className="mi2-math-instruction-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Inline scoped CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wght@400;500;700&display=swap');

        .mi2-math-instruction-page {
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
          animation: mi2-fadeIn 1s ease-in;
          overflow: auto;
          position: relative;
        }

        /* Darker overlay to distinguish from MathInstruction1 */
        .mi2-math-instruction-page::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 0;
        }

        /* Ensure content appears above the overlay */
        .mi2-math-instruction-page > * {
          position: relative;
          z-index: 1;
        }

        .mi2-title {
          font-size: 3rem;
          font-weight: 700;
          color: #00CED1; /* Changed from gold to dark turquoise */
          text-shadow: 2px 2px 4px #000;
          margin-bottom: 20px;
          letter-spacing: 1px;
        }

        .mi2-instruction {
          background: rgba(255, 255, 255, 0.8);
          padding: 20px;
          border-radius: 10px;
          border-width: 4px;
          border-color: #4169E1; /* Changed from orange-red to royal blue */
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          max-width: 60%;
          text-align: center;
          font-size: 1.2rem;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .mi2-instruction p {
          line-height: 1.5;
          letter-spacing: 0.5px;
        }

        .mi2-encouragement {
          font-size: 1.5rem;
          color: #9370DB; /* Changed from hot pink to medium purple */
          font-style: italic;
          margin-bottom: 30px;
          font-weight: 600;
          position: relative;
        }

        .mi2-encouragement::before,
        .mi2-encouragement::after {
          content: '✨';
          font-size: 1.5rem;
          position: absolute;
          top: 40%;
          transform: translateY(-50%);
        }

        .mi2-encouragement::before {
          left: -30px;
        }

        .mi2-encouragement::after {
          right: -30px;
        }

        .mi2-buttons {
          display: flex;
          justify-content: space-between;
          width: 100%;
          max-width: 90%;
          position: absolute;
          bottom: 30px;
          padding: 0 20px;
          box-sizing: border-box;
        }

        .mi2-back-button,
        .mi2-forward-button {
          padding: 10px 20px;
          font-size: 1.2rem;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
          border-style: solid;
          border-width: 2px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Added shadow for depth */
        }

        .mi2-back-button {
          background-color: #FF6347;
          color: #fff;
          border-color: #FFD700;
        }

        .mi2-back-button:hover {
          background-color: #FF4500;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Enhanced shadow on hover */
        }

        .mi2-forward-button {
          background-color: #32CD32;
          color: #fff;
          border-color: #FFD700;
        }

        .mi2-forward-button:hover {
          background-color: #228B22;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* Enhanced shadow on hover */
        }

        .mi2-back-button::before {
          content: '←';
          margin-right: 5px;
        }

        .mi2-forward-button::after {
          content: '→';
          margin-left: 5px;
        }

        @keyframes mi2-fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Responsive styling for smaller screens */
        @media (max-width: 600px) {
          .mi2-title {
            font-size: 2rem;
          }
          .mi2-instruction {
            font-size: 1rem;
          }
          .mi2-encouragement {
            font-size: 1.8rem;
          }
          .mi2-back-button,
          .mi2-forward-button {
            font-size: 1rem;
            padding: 8px 16px;
          }
          .mi2-buttons {
            bottom: 20px;
            max-width: 95%;
          }
        }
      `}</style>

      <h1 className="mi2-title">අඩු කරමේ ක්‍රීඩාව !</h1>
      <div className="mi2-instruction">
        <p>
        මේකෙදි පුංචි ඔයාට තියෙන්නේ වටිනා දේවල් හොයන එක. පුවරුවේ පෙනෙන අඩු කිරීමෙ ප්‍රශ්නයට නිවැරදි උත්තරය හිස්තැනට ඇතුලත් කරන්න තියෙන්නේ. ඔයා හරි උත්තර දුන්නොත් ඔයාට නිධානයක් හම්බුවෙයි. වැරදි උත්තරයක් දුන්නොත් හම්බුවෙන්නේ නැහැ.
        </p>
        <div className="mi2-encouragement">
          <p>එන්න අපි නිධන් හොයමු !</p>
        </div>
      </div>
      <div className="mi2-buttons">
        <button className="mi2-back-button" onClick={handleBack}>
          ආපසු
        </button>
        <button className="mi2-forward-button" onClick={handleForward}>
          ඉදිරියට
        </button>
      </div>
    </div>
  );
};

export default MathInstruction2;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../../../assets/background_images/Activity_back9.png';

const MathInstruction3 = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/math-funny-game-menu'); // Navigates back to MathInstruction2
  };

  const handleForward = () => {
    navigate('/math-division-game'); // Navigates to the game page
  };

  return (
    <div
      className="mi3-math-instruction-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Inline scoped CSS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wght@400;500;700&display=swap');

        .mi3-math-instruction-page {
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
          animation: mi3-fadeIn 1s ease-in, mi3-zoomEffect 10s ease-in-out infinite;
          overflow: auto;
          position: relative;
        }

        /* Dark overlay to darken the background image */
        .mi3-math-instruction-page::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          z-index: 0;
        }

        /* Ensure all content appears above the overlay */
        .mi3-math-instruction-page > * {
          position: relative;
          z-index: 1;
        }

        .mi3-title {
          font-size: 3rem;
          font-weight: 700;
          color: #FFD700;
          text-shadow: 2px 2px 4px #000;
          margin-bottom: 20px;
          letter-spacing: 1px;
        }

        .mi3-instruction {
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

        .mi3-instruction p {
          line-height: 1.5;
          letter-spacing: 0.5px;
        }

        .mi3-encouragement {
          font-size: 1.5rem;
          color: #FF69B4;
          font-style: italic;
          margin-bottom: 30px;
          font-weight: 600;
          position: relative;
        }

        .mi3-encouragement::before,
        .mi3-encouragement::after {
          content: '✨';
          font-size: 1.5rem;
          position: absolute;
          top: 40%;
          transform: translateY(-50%);
        }

        .mi3-encouragement::before {
          left: -30px;
        }

        .mi3-encouragement::after {
          right: -30px;
        }

        .mi3-buttons {
          display: flex;
          justify-content: space-between;
          width: 100%;
          max-width: 90%;
          position: absolute;
          bottom: 30px;
          padding: 0 20px;
          box-sizing: border-box;
        }

        .mi3-back-button,
        .mi3-forward-button {
          padding: 10px 20px;
          font-size: 1.2rem;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          border-style: solid;
          border-width: 2px;
        }

        .mi3-back-button {
          background-color: #FF6347;
          color: #fff;
          border-color: #FFD700;
        }

        .mi3-back-button:hover {
          background-color: #FF4500;
        }

        .mi3-forward-button {
          background-color: #32CD32;
          color: #fff;
          border-color: #FFD700;
        }

        .mi3-forward-button:hover {
          background-color: #228B22;
        }

        .mi3-back-button::before {
          content: '←';
          margin-right: 5px;
        }

        .mi3-forward-button::after {
          content: '→';
          margin-left: 5px;
        }

        @keyframes mi3-fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes mi3-zoomEffect {
          0% {
            background-size: 100%;
          }
          50% {
            background-size: 110%;
          }
          100% {
            background-size: 100%;
          }
        }

        /* Responsive styling for smaller screens */
        @media (max-width: 600px) {
          .mi3-title {
            font-size: 2rem;
          }
          .mi3-instruction {
            font-size: 1rem;
          }
          .mi3-encouragement {
            font-size: 1.8rem;
          }
          .mi3-back-button,
          .mi3-forward-button {
            font-size: 1rem;
            padding: 8px 16px;
          }
          .mi3-buttons {
            bottom: 20px;
            max-width: 95%;
          }
        }
      `}</style>

      <h1 className="mi3-title">ගණිත බෙදීමෙ සෙල්ලම !</h1>
      <div className="mi3-instruction">
        <p>
          මේකෙදි මැද්දේ තියෙන කාඩය හිස්තැන් පුරවන්නයි තියෙන්නේ. මැද්දේ කාඩය වටේ පිළිතුරු කාඩ 4 ක් තියෙයි. 
          ඉන්  නිවැරදි පිළිතුර සහිත කාඩය තෝරන්නයි තියෙන්නේ
        </p>
        <div className="mi3-encouragement">
          <p>හරිම ලේසියි !</p>
        </div>
      </div>
      <div className="mi3-buttons">
        <button className="mi3-back-button" onClick={handleBack}>
          ආපසු
        </button>
        <button className="mi3-forward-button" onClick={handleForward}>
          ඉදිරියට
        </button>
      </div>
    </div>
  );
};

export default MathInstruction3;
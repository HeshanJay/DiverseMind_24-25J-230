import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../../../assets/background_images/Activity_back8.png';

const MathInstruction5 = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/math-funny-game-menu'); // Navigate to previous page
  };

  const handleForward = () => {
    navigate('/math-fraction-game'); // Navigate to the game page
  };

  return (
    <div
      className="mi5-math-instruction-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Inline CSS for styling */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wght@400;500;700&display=swap');

        .mi5-math-instruction-page {
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
          animation: mi5-fadeIn 1s ease-in, mi5-verticalTranslate 15s ease-in-out infinite;
          overflow: auto;
          position: relative;
        }

        /* Dark overlay for readability */
        .mi5-math-instruction-page::before {
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
        .mi5-math-instruction-page > * {
          position: relative;
          z-index: 1;
        }

        .mi5-title {
          font-size: 3rem;
          font-weight: 700;
          color: #4B0082; /* Indigo */
          text-shadow: 2px 2px 4px #000;
          margin-bottom: 20px;
          letter-spacing: 1px;
        }

        .mi5-instruction {
          background: rgba(255, 255, 255, 0.85);
          padding: 20px;
          border-radius: 10px;
          border: 4px dashed #FF7F50; /* Coral dashed border */
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          max-width: 60%;
          text-align: center;
          font-size: 1.2rem;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .mi5-instruction p {
          line-height: 1.5;
          letter-spacing: 0.5px;
        }

        .mi5-encouragement {
          font-size: 1.5rem;
          color: #008080; /* Teal */
          font-style: italic;
          margin-bottom: 30px;
          font-weight: 600;
          position: relative;
        }

        .mi5-encouragement::before,
        .mi5-encouragement::after {
          content: '✨';
          font-size: 1.5rem;
          position: absolute;
          top: 40%;
          transform: translateY(-50%);
        }

        .mi5-encouragement::before {
          left: -30px;
        }

        .mi5-encouragement::after {
          right: -30px;
        }

        .mi5-buttons {
          display: flex;
          justify-content: space-between;
          width: 100%;
          max-width: 90%;
          position: absolute;
          bottom: 30px;
          padding: 0 20px;
          box-sizing: border-box;
        }

        .mi5-back-button,
        .mi5-forward-button {
          padding: 10px 20px;
          font-size: 1.2rem;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.3s ease;
          border: 2px dotted #FFD700; /* Dotted gold border */
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .mi5-back-button {
          background-color: #FF7F50; /* Coral */
          color: #fff;
        }

        .mi5-back-button:hover {
          background-color: #FF6347;
          transform: scale(1.05); /* Slight scale on hover */
        }

        .mi5-forward-button {
          background-color: #008080; /* Teal */
          color: #fff;
        }

        .mi5-forward-button:hover {
          background-color: #006666;
          transform: scale(1.05); /* Slight scale on hover */
        }

        .mi5-back-button::before {
          content: '←';
          margin-right: 5px;
        }

        .mi5-forward-button::after {
          content: '→';
          margin-left: 5px;
        }

        @keyframes mi5-fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes mi5-verticalTranslate {
          0% { background-position: 50% 49%; }
          50% { background-position: 50% 51%; }
          100% { background-position: 50% 49%; }
        }

        /* Responsive adjustments */
        @media (max-width: 600px) {
          .mi5-title {
            font-size: 2rem;
          }
          .mi5-instruction {
            font-size: 1rem;
          }
          .mi5-encouragement {
            font-size: 1.8rem;
          }
          .mi5-back-button,
          .mi5-forward-button {
            font-size: 1rem;
            padding: 8px 16px;
          }
          .mi5-buttons {
            bottom: 20px;
            max-width: 95%;
          }
        }
      `}</style>

      <h1 className="mi5-title">ගණිත භාග ක්‍රීඩාව !</h1>
      <div className="mi5-instruction">
        <p>
          මේකෙදි පුංචි ඔයාලට තියෙන්නේ ඔයාලා ඉගෙනගෙන තියෙන භාග දැනුම පාවිච්චි කරලා නිවැරදි උත්තර දෙන එක. 
          පිගාගේ ඉතිරි වෙලා තියෙන පීසා කෑලි ගණන භාගයක් ලෙස නිවැරදිව දක්වලා තියෙන කාඩය තේරුවොත් වලස් පුංචාට කන්න පුළුවන්. වාරදුනොත් වලස් පුංචා බඩගින්නේ 
        </p>
        <div className="mi5-encouragement">
          <p>වළස් පුංචාගේ බඩ පුරවමු!  !</p>
        </div>
      </div>
      <div className="mi5-buttons">
        <button className="mi5-back-button" onClick={handleBack}>
          ආපසු
        </button>
        <button className="mi5-forward-button" onClick={handleForward}>
          ඉදිරියට
        </button>
      </div>
    </div>
  );
};

export default MathInstruction5;
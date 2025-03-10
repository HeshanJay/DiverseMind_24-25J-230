import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './MathFractionGame.css';
import pizza1 from '../../../../assets/Math/pizza_1.png';
import pizza2 from '../../../../assets/Math/pizza_2.png';
import pizza3 from '../../../../assets/Math/pizza_3.png';
import pizza4 from '../../../../assets/Math/pizza_4.png';
import pizza5 from '../../../../assets/Math/pizza_5.png';
import fractionCard1 from '../../../../assets/Math/fraction_card1.png';
import fractionCard2 from '../../../../assets/Math/fraction_card2.png';
import fractionCard10 from '../../../../assets/Math/fraction_card10.png';
import fractionCard4 from '../../../../assets/Math/fraction_card4.png';
import fractionCard3 from '../../../../assets/Math/fraction_card3.png';
import fractionCard8 from '../../../../assets/Math/fraction_card8.png';
import fractionCard5 from '../../../../assets/Math/fraction_card5.png';
import fractionCard6 from '../../../../assets/Math/fraction_card6.png';
import fractionCard7 from '../../../../assets/Math/fraction_card7.png';
import fractionCard9 from '../../../../assets/Math/fraction_card9.png';
import happyBear from '../../../../assets/Math/bearkid_happy.png';
import cryBear from '../../../../assets/Math/bearkid_cry.png';
import eatBear from '../../../../assets/Math/bearkid_eat.png';
import sadBear from '../../../../assets/Math/bearkid_cryy.png';
import hungryBear from '../../../../assets/Math/bearkid_hungry.png';
import background from '../../../../assets/background_images/bg-wallpaper_21.png';

const questions = [
  {
    image: pizza1,
    options: [fractionCard4, fractionCard10, fractionCard3, fractionCard8],
    correct: fractionCard10,
  },
  {
    image: pizza2,
    options: [fractionCard9, fractionCard10, fractionCard1, fractionCard4],
    correct: fractionCard4,
  },
  {
    image: pizza3,
    options: [fractionCard3, fractionCard4, fractionCard7, fractionCard6],
    correct: fractionCard3,
  },
  {
    image: pizza4,
    options: [fractionCard7, fractionCard5, fractionCard9, fractionCard2],
    correct: fractionCard2,
  },
  {
    image: pizza5,
    options: [fractionCard10, fractionCard2, fractionCard5, fractionCard3],
    correct: fractionCard2,
  },
];

const MathFractionActivityPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupImage, setPopupImage] = useState(null);
  const [popupCorrectOption, setPopupCorrectOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  

  const navigate = useNavigate(); 
  const handleAnswer = (selectedOption) => {
    if (showPopup || isTransitioning) return;

    const currentQuestion = questions[currentQuestionIndex];
    const correct = selectedOption === currentQuestion.correct;
    
    setIsCorrect(correct);
    if (correct) {
      setScore(prev => prev + 1);
      setPopupImage(happyBear);
      setPopupCorrectOption(null);
    } else {
      setPopupImage(cryBear);
      setPopupCorrectOption(currentQuestion.correct);
    }
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      setIsTransitioning(true);
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
          setIsTransitioning(false);
        } else {
          setShowResult(true);
        }
      }, 500);
    }, 2000);
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setShowPopup(false);
    setPopupImage(null);
    setIsTransitioning(false);
    setPopupCorrectOption(null);
  };

  const goToMainMenu = () => {
    navigate("/math-funny-game-menu");
  };

  const Popup = ({ image, show, isCorrect, correctOption }) => {
    if (!show) return null;
    return (
      <>
        <div className="mfa-popup-overlay"></div>
        <div className="mfa-popup-container">
          <div className="mfa-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`mfa-particle mfa-particle-${i}`} />
            ))}
          </div>
          <div className={`mfa-popup-content ${isCorrect ? 'mfa-correct' : 'mfa-incorrect'}`}>
            <img src={image} alt="Popup" className="mfa-popup-image" />
            {!isCorrect && correctOption && (
              <div className="mfa-correct-answer">
                <p>නිවැරදි පිළිතුර:</p>
                <img src={correctOption} alt="Correct Option" className="mfa-correct-option-image" />
              </div>
            )}
            <div className="mfa-popup-text">
              {isCorrect ? 'පිළිතුර නිවැරදියි !' : 'පිළිතුර වැරදියි !'}
            </div>
          </div>
        </div>
      </>
    );
  };

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div className="mfa-main" style={{ backgroundImage: `url(${background})` }}>
  <img src={hungryBear} alt="Hungry Bear" className="mfa-hungry-bear" />
  {showResult ? (
    <div className="mfa-result-popup">
      <h2 className="mfa-result-score">
        නිවැරදි ප්‍රතිචාර: {score} / {questions.length}
      </h2>
      <p className="mfa-result-message">
        {score >= 4 ? 'සුබ පැතුම්! ඔබට හොඳින් කළා!' : 'නැවත උත්සාහ කරන්න!'}
      </p>
      <img
        src={score >= 4 ? eatBear : sadBear}
        alt="Result"
        className="mfa-result-image"
      />
      <div><button className="mfa-restart-button" onClick={restartGame}>
        නැවත උත්සාහ කරන්න
      </button></div>
      
      <button className="mfa-restart-button" onClick={goToMainMenu}>
        ප්‍රධාන මෙනුවට
      </button>
    </div>
  ) : (
    <>
      <div className="mfa-progress">
        <span className="mfa-question-progress">ප්‍රශ්නය {currentQuestionIndex + 1} / {questions.length}</span>
        <span className="mfa-score">ලකුනු: {score}</span>
      </div>
      <div className={`mfa-game-container ${isTransitioning ? 'mfa-transition-out' : 'mfa-transition-in'}`}>
        <img
          src={currentQuestion.image}
          alt="Question"
          className="mfa-question-image"
        />
        {currentQuestion.options.map((option, index) => (
          <img
            key={index}
            src={option}
            alt={`Option ${index + 1}`}
            className={`mfa-card mfa-card-${['top', 'left', 'right', 'bottom'][index]}`}
            onClick={() => handleAnswer(option)}
          />
        ))}
      </div>
    </>
  )}
  <Popup image={popupImage} show={showPopup} isCorrect={isCorrect} correctOption={popupCorrectOption} />
</div>
  );
};

export default MathFractionActivityPage;

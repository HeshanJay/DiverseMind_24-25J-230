import React, { useState, useEffect, useCallback, useRef } from "react";
import "./Activity1.css";
import WritingGame3ScoreBoard from "../../../../Pages/WritingInterventions/WritingGame3/WritingGame3ScoreBoard"; // Adjust path as needed

// Import icon images
import pIcon from "../../../../assets/writing_interventions/punctuations/p.png"; // for "."
import kIcon from "../../../../assets/writing_interventions/punctuations/k.png"; // for ","
import eIcon from "../../../../assets/writing_interventions/punctuations/e.png"; // for "!"
import quIcon from "../../../../assets/writing_interventions/punctuations/qu.png"; // for "?"
import qIcon from "../../../../assets/writing_interventions/punctuations/q.png"; // for '"'
import bIcon from "../../../../assets/writing_interventions/punctuations/b.png"; // for "()"

// Define default levels as an array of objects where each object contains a phrase and its correct answer
const defaultLevels = [
  { phrase: "මෙය වාක්‍යයක අවසානය හැඟ වීම සඳහා යෙදේ.", answer: "." },
  {
    phrase: "වාක්‍යයක් අවසාන වීමට පෙර තබන විරාමය සඳහා මෙය යෙදේ.",
    answer: ",",
  },
  {
    phrase:
      "යම් විශ්මයක් දැනවීමට, ප්‍රාර්ථනයක් හැඟවීමට, සතුටක් දැනවීමට හෝ ශෝකයක් හැඟවීමට මෙය භාවිතා කෙරේ.",
    answer: "!",
  },
  {
    phrase: "කිසියම් ප්‍රශ්න අසන වාක්‍යයක් අවසානයේ මෙය යෙදේ.",
    answer: "?",
  },
  {
    phrase:
      "යමෙකු විසින් කළ ප්‍රකාශයක් හෝ යම් උපුටා ගැනීමක් සඳහා වන කොටසක් පෙන්වීම සඳහා මෙය භාවිතා කෙරේ.",
    answer: '"',
  },
  {
    phrase:
      "ප්‍රකාශනයක යම් තැනක අර්ථය පැහැදිලි කිරීමට හෝ අමතර තොරතුරක් දැක්වීමට වචනයක් හෝ වාක්‍යයක් හෝ වාක්‍ය කීපයක් හෝ ඒ අතරට යෙදීමේදී මෙය භාවිතා කෙරේ.",
    answer: "()",
  },
];

const Activity1 = () => {
  // Game states
  const [currentLevel, setCurrentLevel] = useState(1);
  const [levels, setLevels] = useState(defaultLevels);
  const [score, setScore] = useState(0); // score for current phrase (max 5)
  const [incorrectCount, setIncorrectCount] = useState(0); // wrong clicks for current phrase
  const [totalPoints, setTotalPoints] = useState(0); // accumulated points (max 30)
  const [stars, setStars] = useState(0); // stars earned (max 6)
  const [isGameActive, setIsGameActive] = useState(false);
  // (Feedback is no longer displayed)
  const [feedback, setFeedback] = useState("");

  // Popup states
  const [showPhrasePopup, setShowPhrasePopup] = useState(false);
  const [manualPopup, setManualPopup] = useState(false);
  const [showNextLevelPopup, setShowNextLevelPopup] = useState(false);
  const [showRetryPopup, setShowRetryPopup] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  // Timer reference for auto-dismiss
  const popupTimeoutRef = useRef(null);

  // All punctuation marks that might fall
  const punctuationMarks = [".", ",", '"', "!", "?", "()"];

  // Mapping punctuation marks to icon images rendered as an <img> tag
  const punctuationIcons = {
    ".": `<img src="${pIcon}" alt="." class="falling-icon" />`,
    ",": `<img src="${kIcon}" alt="," class="falling-icon" />`,
    "!": `<img src="${eIcon}" alt="!" class="falling-icon" />`,
    "?": `<img src="${quIcon}" alt="?" class="falling-icon" />`,
    '"': `<img src="${qIcon}" alt='"' class="falling-icon" />`,
    "()": `<img src="${bIcon}" alt="()" class="falling-icon" />`,
  };

  // Create a falling punctuation element
  const createFallingElement = useCallback(() => {
    const container = document.querySelector(".activity1-game-area");
    if (!container) return;

    const mark =
      punctuationMarks[Math.floor(Math.random() * punctuationMarks.length)];
    const element = document.createElement("div");
    element.className = "activity1-falling-mark";
    element.style.left = `${Math.random() * 80 + 10}%`;
    element.innerHTML = punctuationIcons[mark];

    // When clicked, check if it's the correct answer for the current phrase
    if (levels[currentLevel - 1]) {
      element.onclick = () => {
        if (mark === levels[currentLevel - 1].answer) {
          setScore((s) => s + 1);
        } else {
          setIncorrectCount((c) => c + 1);
        }
        element.remove();
      };
    }

    container.appendChild(element);
    setTimeout(() => element.remove(), 5000);
  }, [currentLevel, punctuationMarks, punctuationIcons, levels]);

  // Start falling punctuation if game is active
  useEffect(() => {
    if (isGameActive) {
      const interval = setInterval(createFallingElement, 1000);
      return () => clearInterval(interval);
    }
  }, [isGameActive, createFallingElement]);

  // Monitor clicks for the current phrase.
  // The phrase ends if:
  // - 5 correct clicks (score >= 5)
  // - OR 3 wrong clicks (incorrectCount >= 3)
  // - OR total clicks (score + incorrectCount) reach 8.
  useEffect(() => {
    if (isGameActive) {
      const totalClicks = score + incorrectCount;
      if (score >= 5 || incorrectCount >= 3 || totalClicks >= 8) {
        // Add current phrase's points to totalPoints
        setTotalPoints((prev) => prev + score);
        // If perfect (5/5), add a star
        if (score === 5) {
          setStars((prev) => prev + 1);
        }
        if (currentLevel < levels.length) {
          setIsGameActive(false);
          // Move to next phrase after a short delay
          setTimeout(() => {
            setCurrentLevel((prev) => prev + 1);
            setScore(0);
            setIncorrectCount(0);
            // For subsequent phrases, always show the popup with a close button
            setManualPopup(true);
            setShowPhrasePopup(true);
          }, 500);
        } else {
          // Final phrase completed: show final popup with finish button
          setIsGameActive(false);
          setShowNextLevelPopup(true);
        }
      }
    }
  }, [score, incorrectCount, isGameActive, currentLevel, levels.length]);

  // Start the game (triggered on "පටන් ගන්න")
  const startLevel = () => {
    // Shuffle levels so that phrases and answers are shuffled together
    const shuffledLevels = [...defaultLevels].sort(() => Math.random() - 0.5);
    setLevels(shuffledLevels);
    setCurrentLevel(1);
    setScore(0);
    setIncorrectCount(0);
    setTotalPoints(0);
    setStars(0);
    setGameFinished(false);

    // For the initial popup, show the popup with a close button
    setShowPhrasePopup(true);
    setManualPopup(true);
    popupTimeoutRef.current = setTimeout(() => {
      dismissPopup();
    }, 5000);
  };

  // Dismiss the phrase popup and resume game
  const dismissPopup = () => {
    setShowPhrasePopup(false);
    setIsGameActive(true);
    if (popupTimeoutRef.current) {
      clearTimeout(popupTimeoutRef.current);
      popupTimeoutRef.current = null;
    }
  };

  // Manually show the phrase popup during gameplay (this popup includes a close button)
  const manualShowPhrase = () => {
    setManualPopup(true);
    setShowPhrasePopup(true);
  };

  // When the final level is completed and the user clicks "අවසන් කරන්න"
  const handleFinalNextLevel = () => {
    setShowNextLevelPopup(false);
    setGameFinished(true);
  };

  // Retry handler (if needed)
  const handleRetry = () => {
    setShowRetryPopup(false);
    setScore(0);
    setIncorrectCount(0);
    setFeedback("");
    setIsGameActive(true);
  };

  // If gameFinished, render the score board page instead of the game
  if (gameFinished) {
    return <WritingGame3ScoreBoard totalPoints={totalPoints} stars={stars} />;
  }

  return (
    <div className="activity1-game-container">
      {currentLevel === 1 &&
      !isGameActive &&
      !showPhrasePopup &&
      !showNextLevelPopup &&
      !showRetryPopup &&
      score === 0 ? (
        <div className="initial-screen">
          <div className="title-box">
            <h2>විරාම ලක්ෂණ හුරුව</h2>
          </div>
          <button onClick={startLevel}>පටන් ගන්න</button>
        </div>
      ) : (
        <>
          <div className="title-box">
            <h2>පථය {currentLevel}</h2>
          </div>
          {isGameActive && (
            <div className="activity1-controls">
              <div className="lives-box">
                {Array.from({ length: 3 }, (_, i) => (
                  <span key={i} className="chance-icon">
                    {i < 3 - incorrectCount ? "❤️" : "♡"}
                  </span>
                ))}
              </div>
              <div className="score-box">
                <span>ලකුණු: {score}/5</span>
              </div>
              <button onClick={manualShowPhrase}>පද පෙළ නැවත බලන්න</button>
            </div>
          )}
          {isGameActive && <div className="activity1-game-area" />}
        </>
      )}
      {showPhrasePopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{levels[currentLevel - 1]?.phrase}</p>
            <button onClick={dismissPopup}>ඉවත් වෙන්න</button>
          </div>
        </div>
      )}
      {showRetryPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>වැරදි උත්සාහ වැඩි විය. නැවත උත්සාහ කරන්න!</p>
            <button onClick={handleRetry}>නැවත ආරම්භ කරන්න</button>
          </div>
        </div>
      )}
      {showNextLevelPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            {currentLevel === levels.length ? (
              <p>ඔබ සියලුම පෙළ සාර්ථකව නිම කළා! අවසන් කරන්න.</p>
            ) : (
              <p>ඔබ සියලුම පෙළ සාර්ථකව නිම කළා! ඊළඟ මට්ටමට යන්න.</p>
            )}
            <button onClick={handleFinalNextLevel}>
              {currentLevel === levels.length ? "අවසන් කරන්න" : "ඊළඟ මට්ටම"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity1;

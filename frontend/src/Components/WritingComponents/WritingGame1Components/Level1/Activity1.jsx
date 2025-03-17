import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaRedo } from "react-icons/fa";

// Import all letter images
import a1 from "../../../../assets/writing_interventions/letters/a1.png";
import a2 from "../../../../assets/writing_interventions/letters/a2.png";
import l1 from "../../../../assets/writing_interventions/letters/l1.png";
import l2 from "../../../../assets/writing_interventions/letters/l2.png";
import i1 from "../../../../assets/writing_interventions/letters/i1.png";
import i2 from "../../../../assets/writing_interventions/letters/i2.png";
import u1 from "../../../../assets/writing_interventions/letters/u1.png";
import u2 from "../../../../assets/writing_interventions/letters/u2.png";
import t1 from "../../../../assets/writing_interventions/letters/t1.png";
import t2 from "../../../../assets/writing_interventions/letters/t2.png";
import m1 from "../../../../assets/writing_interventions/letters/m1.png";
import m2 from "../../../../assets/writing_interventions/letters/m2.png";
import d1 from "../../../../assets/writing_interventions/letters/d1.png";
import d2 from "../../../../assets/writing_interventions/letters/d2.png";
import r1 from "../../../../assets/writing_interventions/letters/r1.png";
import r2 from "../../../../assets/writing_interventions/letters/r2.png";
import g1 from "../../../../assets/writing_interventions/letters/g1.png";
import g2 from "../../../../assets/writing_interventions/letters/g2.png";
import s1 from "../../../../assets/writing_interventions/letters/s1.png";
import s2 from "../../../../assets/writing_interventions/letters/s2.png";
import h1 from "../../../../assets/writing_interventions/letters/h1.png";
import h2 from "../../../../assets/writing_interventions/letters/h2.png";
import k1 from "../../../../assets/writing_interventions/letters/k1.png";
import k2 from "../../../../assets/writing_interventions/letters/k2.png";
import th1 from "../../../../assets/writing_interventions/letters/th1.png";

// Golden pencil image for rewards
import goldenPencil from "../../../../assets/writing_interventions/icons/golden_pencil.png";

// Import background image
import background from "../../../../assets/writing_interventions/background/back6.webp";

// Helper function to shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const allLetterPics = [
  { id: 1, type: "Letter A", isCorrect: true, src: a1 },
  { id: 2, type: "Letter A", isCorrect: false, src: a2 },
  { id: 3, type: "Letter L", isCorrect: true, src: l1 },
  { id: 4, type: "Letter L", isCorrect: false, src: l2 },
  { id: 5, type: "Letter I", isCorrect: true, src: i1 },
  { id: 6, type: "Letter I", isCorrect: false, src: i2 },
  { id: 7, type: "Letter U", isCorrect: true, src: u1 },
  { id: 8, type: "Letter U", isCorrect: false, src: u2 },
  { id: 9, type: "Letter T", isCorrect: true, src: t1 },
  { id: 10, type: "Letter T", isCorrect: false, src: t2 },
  { id: 11, type: "Letter M", isCorrect: true, src: m1 },
  { id: 12, type: "Letter M", isCorrect: false, src: m2 },
  { id: 13, type: "Letter D", isCorrect: true, src: d1 },
  { id: 14, type: "Letter D", isCorrect: false, src: d2 },
  { id: 15, type: "Letter R", isCorrect: true, src: r1 },
  { id: 16, type: "Letter R", isCorrect: false, src: r2 },
  { id: 17, type: "Letter G", isCorrect: true, src: g1 },
  { id: 18, type: "Letter G", isCorrect: false, src: g2 },
  { id: 19, type: "Letter S", isCorrect: true, src: s1 },
  { id: 20, type: "Letter S", isCorrect: false, src: s2 },
  { id: 21, type: "Letter H", isCorrect: true, src: h1 },
  { id: 22, type: "Letter H", isCorrect: false, src: h2 },
  { id: 23, type: "Letter K", isCorrect: true, src: k1 },
  { id: 24, type: "Letter K", isCorrect: false, src: k2 },
  { id: 25, type: "Letter TH", isCorrect: true, src: th1 },
];

const Activity1 = () => {
  const navigate = useNavigate();

  // Best score is read from localStorage (default to 0)
  const [bestScore, setBestScore] = useState(() => {
    const stored = localStorage.getItem("bestScore");
    return stored ? Number(stored) : 0;
  });

  // Track whether the game has started or not.
  const [gameStarted, setGameStarted] = useState(false);

  // Shuffle letters at the start of the game.
  const [allLetters, setAllLetters] = useState(shuffleArray(allLetterPics));
  // Maintain a deck of letters that have not yet been processed.
  const [remainingLetters, setRemainingLetters] = useState(allLetters);
  const currentLetter = remainingLetters[0];
  const [score, setScore] = useState(0);
  // Lives tracking (3 hearts)
  const [lives, setLives] = useState(3);
  // Show game over modal
  const [showGameOver, setShowGameOver] = useState(false);
  // Show game completion modal
  const [showGameCompletion, setShowGameCompletion] = useState(false);
  // Pop-up feedback (emoji)
  const [popUp, setPopUp] = useState("");
  // Controls catch zone color based on answer.
  const [selectionResult, setSelectionResult] = useState(null);
  // Indicates if answer buttons are allowed.
  const [canAnswer, setCanAnswer] = useState(false);
  // Prevent multiple answers for the same letter.
  const [answered, setAnswered] = useState(false);
  // Tracking consecutive correct answers (combo)
  const [combo, setCombo] = useState(0);
  // Golden pencils unlocks tracking
  const [goldenPensCount, setGoldenPensCount] = useState(0);
  const [showRewardPopup, setShowRewardPopup] = useState(false);
  const [rewardMessage, setRewardMessage] = useState("");
  // New state for explicitly tracking reward visibility
  const [rewardVisible, setRewardVisible] = useState(false);
  // Freeze letter in the catch zone if a correct answer is given.
  const [freezeLetter, setFreezeLetter] = useState(false);
  // Control letter visibility—if missed, the letter will be hidden.
  const [letterVisible, setLetterVisible] = useState(true);
  // Processed letter count to track game completion.
  const [processedLetterCount, setProcessedLetterCount] = useState(0);

  // Timer refs to control catch window and next-letter timing.
  const enableTimeoutRef = useRef(null);
  const disableTimeoutRef = useRef(null);
  const finishTimeoutRef = useRef(null);
  const nextLetterTimeoutRef = useRef(null);
  const rewardTimeoutRef = useRef(null);
  // Record when the letter animation starts.
  const letterStartTimeRef = useRef(null);

  // CSS formerly in Activity1.css — now inlined here
  const customCSS = `
/* The moving letter animation:
   - Starts off-screen left.
   - At 50% (around 3.5s into the 7s animation) the letter is centered in the catch zone.
   - Ends off-screen right.
   - Added rotation for playful effect
*/
@keyframes moveLetter {
  0% {
    left: -150px;
    transform: translateY(-50%) rotate(-5deg);
  }
  25% {
    transform: translateY(-50%) rotate(5deg);
  }
  50% {
    left: calc(50% - 64px);
    transform: translateY(-50%) rotate(-5deg);
  }
  75% {
    transform: translateY(-50%) rotate(5deg);
  }
  100% {
    left: 110%;
    transform: translateY(-50%) rotate(-5deg);
  }
}

/* Position the letter vertically centered */
.letter {
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  z-index: 20;
}

/* Pop-up animation for feedback - bigger and more dramatic for kids */
@keyframes popInOut {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -80%) scale(2);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -100%) scale(1.5);
  }
}

.popup {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 4rem;
  animation: popInOut 1s ease-out forwards;
  pointer-events: none;
}

/* Add a mock Comic Sans-like font fallback */
.font-comic {
  font-family: "Comic Sans MS", "Chalkboard SE", "Comic Neue", sans-serif;
}

/* Additional animations for Tailwind extension */
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

/* One-time bounce animation for the game over modal */
@keyframes bounceOnce {
  0% {
    transform: scale(0.8);
  }
  70% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.animate-bounce-once {
  animation: bounceOnce 0.5s ease-out forwards;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Cloud animations */
@keyframes floatClouds {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}

.absolute.top-4.left-20 {
  animation: floatClouds 8s infinite ease-in-out;
}

.absolute.top-2.left-12 {
  animation: floatClouds 10s infinite ease-in-out;
}

.absolute.top-6.right-32 {
  animation: floatClouds 7s infinite ease-in-out reverse;
}

.absolute.top-4.right-24 {
  animation: floatClouds 12s infinite ease-in-out reverse;
}

/* Button hover and active states */
button:hover:not(:disabled) {
  transform: scale(1.05);
  transition: all 0.2s;
}

button:active:not(:disabled) {
  transform: scale(0.95);
  transition: all 0.1s;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Focus rings for accessibility */
button:focus {
  outline: 4px solid rgba(99, 102, 241, 0.4);
}

/* Additional transition effects */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Shadow effects */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.drop-shadow-lg {
  filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.04))
    drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1));
}

/* Golden pen reward animation */
@keyframes shine {
  0% {
    background-position: -100px;
  }
  40%,
  100% {
    background-position: 320px;
  }
}

.golden-pen {
  background: linear-gradient(
    90deg,
    rgba(255, 215, 0, 0),
    rgba(255, 215, 0, 0.8),
    rgba(255, 215, 0, 0)
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  animation: shine 2s infinite linear;
}

/* Heart beat animation for lives */
@keyframes heartBeat {
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.2);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.2);
  }
  70% {
    transform: scale(1);
  }
}

.animate-heartbeat {
  animation: heartBeat 1.5s infinite;
}

/* Disabled button styles */
.disabled\\:opacity-50:disabled {
  opacity: 0.5;
}

.disabled\\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

/* Restart button styling */
.restart-container {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
}

.restart-button {
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #e53935;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
}

.restart-button:hover {
  background-color: #d32f2f;
  transform: scale(1.05);
}

.restart-button:active {
  transform: scale(0.95);
}

/* Best score display */
.best-score-container {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;
  background: rgba(255, 255, 255, 0.8);
  padding: 6px 12px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.best-score-text {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c5f2d;
}
`;

  // Utility function to force cleanup of reward popup
  const forceCleanupRewardPopup = () => {
    // Force close any popups
    setShowRewardPopup(false);
    setRewardVisible(false);

    // Clear any pending timeouts
    if (rewardTimeoutRef.current) {
      clearTimeout(rewardTimeoutRef.current);
      rewardTimeoutRef.current = null;
    }
  };

  // Navigate to scoreboard with score, golden pencils, and best score.
  const goToScoreBoard = () => {
    navigate("/writing-game1-scoreBoard", {
      state: {
        score,
        goldenPensCount,
        bestScore, // Passing best score here
      },
    });
  };

  // Restart function to go back to the instructions.
  const handleRestart = () => {
    forceCleanupRewardPopup();
    setGameStarted(false);
    setScore(0);
    setLives(3);
    setCombo(0);
    setGoldenPensCount(0);
    setProcessedLetterCount(0);
    setRemainingLetters(shuffleArray(allLetterPics));
    clearTimeout(enableTimeoutRef.current);
    clearTimeout(disableTimeoutRef.current);
    clearTimeout(finishTimeoutRef.current);
    clearTimeout(nextLetterTimeoutRef.current);
    clearTimeout(rewardTimeoutRef.current);
    setShowRewardPopup(false);
  };

  // Update best score if current score exceeds it.
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore", score);
    }
  }, [score, bestScore]);

  // Update golden pencil unlocks only when a new milestone is reached.
  useEffect(() => {
    const comboMilestones = [5, 10, 15, 20, 25];
    const reachedCount = comboMilestones.filter((m) => combo >= m).length;

    if (reachedCount > goldenPensCount) {
      // Update the golden pencil count
      setGoldenPensCount(reachedCount);

      // Set the reward message
      setRewardMessage(
        `🏆 ${reachedCount}${getOrdinalSuffix(
          reachedCount
        )} Golden Pencil Unlocked! ✨`
      );

      // Clear any existing timers
      if (rewardTimeoutRef.current) {
        clearTimeout(rewardTimeoutRef.current);
        rewardTimeoutRef.current = null;
      }

      // Show the popup
      setRewardVisible(true);
      setShowRewardPopup(true);
      setPopUp("🎉");

      // Set a timeout to hide it after exactly 3 seconds
      rewardTimeoutRef.current = setTimeout(() => {
        setShowRewardPopup(false);
        setRewardVisible(false);
      }, 3000);
    }

    // Always clean up on unmount or when dependencies change
    return () => {
      if (rewardTimeoutRef.current) {
        clearTimeout(rewardTimeoutRef.current);
        rewardTimeoutRef.current = null;
      }
    };
  }, [combo, goldenPensCount]);

  // Update pop-up feedback
  useEffect(() => {
    if (popUp) {
      const timer = setTimeout(() => {
        setPopUp("");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [popUp]);

  // Helper function to get ordinal suffix.
  const getOrdinalSuffix = (num) => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return "st";
    if (j === 2 && k !== 12) return "nd";
    if (j === 3 && k !== 13) return "rd";
    return "th";
  };

  // Check if all letters have been processed.
  useEffect(() => {
    if (processedLetterCount >= 25) {
      setShowGameCompletion(true);
    }
  }, [processedLetterCount]);

  // Remove the current letter from the deck and update processed count.
  const goToNextLetter = () => {
    setProcessedLetterCount((prev) => prev + 1);
    setRemainingLetters((prev) => {
      const newDeck = prev.slice(1);
      return newDeck.length === 0 ? shuffleArray(allLetterPics) : newDeck;
    });
  };

  // Schedule showing the next letter after a given delay.
  const scheduleNextLetter = (delay) => {
    nextLetterTimeoutRef.current = setTimeout(() => {
      goToNextLetter();
    }, delay);
  };

  // Animate the letter and control the catch zone when the game is started.
  useEffect(() => {
    if (!gameStarted) return;

    // Clean up any existing reward popups when starting a new letter
    forceCleanupRewardPopup();

    setAnswered(false);
    setPopUp("");
    setCanAnswer(false);
    setSelectionResult(null);
    setFreezeLetter(false);
    setLetterVisible(true);
    letterStartTimeRef.current = Date.now();

    clearTimeout(enableTimeoutRef.current);
    clearTimeout(disableTimeoutRef.current);
    clearTimeout(finishTimeoutRef.current);
    clearTimeout(nextLetterTimeoutRef.current);

    // Define the catch zone as active from 3300ms to 3700ms.
    enableTimeoutRef.current = setTimeout(() => {
      setCanAnswer(true);
    }, 3300);

    disableTimeoutRef.current = setTimeout(() => {
      setCanAnswer(false);
    }, 3700);

    finishTimeoutRef.current = setTimeout(() => {
      if (!answered) {
        setPopUp("😢");
        setSelectionResult(null);
        setCombo(0);
        setLetterVisible(false);
      }
      scheduleNextLetter(1000);
    }, 7000);

    return () => {
      clearTimeout(enableTimeoutRef.current);
      clearTimeout(disableTimeoutRef.current);
      clearTimeout(finishTimeoutRef.current);
      clearTimeout(nextLetterTimeoutRef.current);
    };
  }, [remainingLetters, gameStarted]);

  // Handle answer selection.
  const handleAnswer = (answer) => {
    clearTimeout(finishTimeoutRef.current);
    const elapsed = Date.now() - letterStartTimeRef.current;
    const catchBegin = 3300;
    const catchEnd = 3700;
    if (elapsed < catchBegin) {
      setPopUp("⏰");
      setSelectionResult(null);
      setAnswered(true);
      scheduleNextLetter(1000);
      return;
    }
    if (elapsed > catchEnd) {
      setPopUp("⌛");
      setSelectionResult(null);
      setAnswered(true);
      scheduleNextLetter(1000);
      return;
    }
    if (
      (answer === "correct" && currentLetter.isCorrect) ||
      (answer === "incorrect" && !currentLetter.isCorrect)
    ) {
      setPopUp("🎉");
      setSelectionResult("correct");
      setScore((prev) => prev + 4); // Award 4 points for a correct answer
      setCombo((prev) => prev + 1);
      setFreezeLetter(true);
    } else {
      setPopUp("❌");
      setSelectionResult("incorrect");
      setCombo(0);
      setLives((prev) => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setTimeout(() => {
            setShowGameOver(true);
          }, 500);
        }
        return newLives;
      });
    }
    setAnswered(true);
    scheduleNextLetter(1000);
  };

  // Render hearts based on remaining lives.
  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < lives; i++) {
      hearts.push(
        <span key={i} className="text-2xl text-red-500 animate-pulse">
          ❤️
        </span>
      );
    }
    return hearts;
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 font-comic"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Inject the inlined custom CSS */}
      <style dangerouslySetInnerHTML={{ __html: customCSS }} />

      {gameStarted && (
        <div className="restart-container">
          <button
            onClick={handleRestart}
            className="nav-button bg-green-600 hover:bg-green-700"
          >
            <FaRedo size={28} />
          </button>
        </div>
      )}
      {gameStarted && (
        <div className="best-score-container">
          <span className="best-score-text">හොඳම ලකුණු: {bestScore}</span>
        </div>
      )}
      {!gameStarted ? (
        // Instructions Screen with Game Title
        <div className="flex flex-col items-center bg-white bg-opacity-90 p-8 rounded-lg shadow-md text-center">
          <h1 className="text-6xl font-bold text-purple-700 mb-4">
            අකුරු ඇල්ලීමේ අභියෝගය
          </h1>
          <br />
          <p className="text-lg text-gray-700 mb-4">
            👀 තිරය ​​හරහා අකුරු චලනය වන ආකාරය නරඹන්න!
            <br />
            👆 නිවැරදි අකුරු සඳහා "නිවැරදි" සහ වැරදි සඳහා "වැරදි" ක්ලික් කරන්න!
            <br />
            ⭐ විශේෂ ත්‍යාග අගුළු ඇරීමට අඛණ්ඩව 5, 10, 15, 20, සහ 25 ලබා ගන්න!
            <br />
            ❤️ ඔබට අවස්ථා 3ක් තිබෙනවා - ප්‍රවේශම් වන්න!
          </p>
          <br />
          <button
            onClick={() => setGameStarted(true)}
            className="px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl text-2xl transform transition-transform duration-200 hover:scale-105 shadow-lg border-4 border-blue-700"
          >
            ආරම්භ කරන්න
          </button>
        </div>
      ) : (
        // Game Board
        <div className="relative w-full max-w-6xl">
          {/* Score display */}
          <div className="flex justify-between items-center mb-4 px-4">
            <div className="bg-yellow-100 rounded-full py-2 px-6 border-4 border-yellow-400 shadow-lg flex items-center">
              <span className="text-2xl font-bold text-yellow-600 mr-2">
                ලකුණු : {score} {score > 0 && "⭐"}
              </span>
              <div className="ml-4 flex">{renderHearts()}</div>
            </div>
            {combo > 0 && (
              <div className="bg-pink-100 rounded-full py-2 px-6 border-4 border-pink-400 shadow-lg">
                <span className="text-2xl font-bold text-pink-600 animate-pulse">
                  අඛණ්ඩතාවය: {combo}🔥
                </span>
              </div>
            )}
            {goldenPensCount > 0 && (
              <div className="bg-amber-100 rounded-full py-2 px-6 border-4 border-amber-400 shadow-lg flex items-center">
                <span className="text-2xl font-bold text-amber-600 mr-2">
                  ත්‍යාග:
                </span>
                {[...Array(goldenPensCount)].map((_, i) => (
                  <img
                    key={i}
                    src={goldenPencil}
                    alt="Golden Pencil"
                    className="w-6 h-6 mx-1"
                  />
                ))}
              </div>
            )}
          </div>

          {/* The long lane with the catch zone */}
          <div className="relative w-full h-64 bg-sky-200 overflow-hidden rounded-3xl shadow-xl border-4 border-blue-400">
            {/* Cloud decorations */}
            <div className="absolute top-4 left-20 w-24 h-12 bg-white rounded-full"></div>
            <div className="absolute top-2 left-12 w-16 h-10 bg-white rounded-full"></div>
            <div className="absolute top-6 right-32 w-20 h-10 bg-white rounded-full"></div>
            <div className="absolute top-4 right-24 w-14 h-8 bg-white rounded-full"></div>
            {/* Dotted line at bottom center */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 border-b-2 border-dotted border-blue-400"></div>
            {/* Fixed catch zone with dynamic color */}
            <div
              className={`absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-40 h-full border-4 flex items-center justify-center transition-colors duration-300 ${
                selectionResult === "correct"
                  ? "bg-green-200 border-green-500 animate-pulse"
                  : selectionResult === "incorrect"
                  ? "bg-red-200 border-red-500"
                  : "bg-white border-blue-500 border-dashed"
              }`}
            >
              <span className="text-xl font-bold text-center px-2 text-blue-800">
                අල්ලා ගැනීමේ කලාපය 🎯
              </span>
              {popUp && <div className="popup z-50">{popUp}</div>}
            </div>
            {/* Moving letter image (stopped when game complete) */}
            {!showGameCompletion && letterVisible && currentLetter && (
              <div
                key={currentLetter.id}
                className={`absolute letter transition-all duration-300 ${
                  !freezeLetter && "hover:scale-110"
                }`}
                style={
                  freezeLetter
                    ? { left: "calc(50% - 64px)" }
                    : { animation: "moveLetter 7s linear" }
                }
              >
                <img
                  src={currentLetter.src}
                  alt={currentLetter.type}
                  className={`w-32 h-32 object-contain drop-shadow-lg ${
                    freezeLetter && selectionResult === "correct"
                      ? "animate-bounce"
                      : ""
                  }`}
                />
              </div>
            )}
            {/* Grass at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-green-400 z-10"></div>
          </div>

          {/* Answer buttons */}
          <div className="mt-6 flex justify-around">
            <button
              onClick={() => handleAnswer("correct")}
              disabled={lives <= 0}
              className="px-6 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-xl transform transition-transform duration-200 hover:scale-105 shadow-lg border-4 border-green-700 active:scale-95 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              නිවැරදි! 👍
            </button>
            <button
              onClick={() => handleAnswer("incorrect")}
              disabled={lives <= 0}
              className="px-6 py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl text-xl transform transition-transform duration-200 hover:scale-105 shadow-lg border-4 border-red-700 active:scale-95 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              වැරදි! 👎
            </button>
          </div>

          {/* Modified Golden Pencil Reward Popup */}
          {rewardVisible && showRewardPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-40">
              <div className="max-w-md mx-auto bg-yellow-100 p-6 rounded-xl border-4 border-yellow-500 shadow-xl animate-scale-in">
                <span className="text-2xl font-bold text-yellow-700 block text-center">
                  {rewardMessage}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Game Over Modal */}
      {showGameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl border-8 border-red-500 max-w-md w-full animate-bounce-once">
            <h2 className="text-3xl font-bold text-center text-red-600 mb-4">
              Game Over! 😢
            </h2>
            <p className="text-xl text-center mb-6">
              You ran out of lives! Your score: {score}
            </p>
            <div className="flex justify-center">
              <button
                onClick={goToScoreBoard}
                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl text-xl transform transition-transform duration-200 hover:scale-105 shadow-lg border-4 border-blue-700"
              >
                See Final Score 🏆
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Completion Modal */}
      {showGameCompletion && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl border-8 border-green-500 max-w-md w-full animate-bounce-once">
            <h2 className="text-3xl font-bold text-center text-green-600 mb-4">
              Game Completed! 🎉
            </h2>
            <p className="text-xl text-center mb-6">
              Great job! You've completed all 25 letters!
              <br />
              Your final score: {score}
              <br />
              Golden Pens:{" "}
              {[...Array(goldenPensCount)].map((_, i) => (
                <img
                  key={i}
                  src={goldenPencil}
                  alt="Golden Pencil"
                  className="w-6 h-6 inline-block mx-1"
                />
              ))}
            </p>
            <div className="flex justify-center">
              <button
                onClick={goToScoreBoard}
                className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl text-xl transform transition-transform duration-200 hover:scale-105 shadow-lg border-4 border-blue-700"
              >
                See Final Score 🏆
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity1;

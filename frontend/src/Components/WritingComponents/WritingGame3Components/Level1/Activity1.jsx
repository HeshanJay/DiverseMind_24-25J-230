import React, { useState, useEffect, useCallback, useRef } from "react";
import "./Activity1.css";
import WritingGame3ScoreBoard from "../../../../Pages/WritingInterventions/WritingGame3/WritingGame3ScoreBoard";

// Import icon images
import pIcon from "../../../../assets/writing_interventions/punctuations/p.png";
import kIcon from "../../../../assets/writing_interventions/punctuations/k.png";
import eIcon from "../../../../assets/writing_interventions/punctuations/e.png";
import quIcon from "../../../../assets/writing_interventions/punctuations/qu.png";
import qIcon from "../../../../assets/writing_interventions/punctuations/q.png";
import bIcon from "../../../../assets/writing_interventions/punctuations/b.png";

// Opening-screen background
import instructionsBg from "../../../../assets/writing_interventions/punctuations/instructions3.1.png";

import clickSound from "../../../../assets/Audios/click_sound.mp3";
import soundCorrect from "../../../../assets/Audios/p_correct.wav";
import soundWrong from "../../../../assets/Audios/p_wrong.wav";
import soundFinish from "../../../../assets/Audios/p_finish.wav";

const defaultLevels = [
  { phrase: "මෙය වාක්‍යයක අවසානය හැඟ වීම සඳහා යෙදේ.", answer: "." },
  { phrase: "වාක්‍යයක් අවසාන වීමට පෙර තබන විරාමය සඳහා මෙය යෙදේ.", answer: "," },
  {
    phrase:
      "යම් විශ්මයක් දැනවීමට, ප්‍රාර්ථනයක් හැඟවීමට, සතුටක් දැනවීමට හෝ ශෝකයක් හැඟවීමට මෙය භාවිතා කෙරේ.",
    answer: "!",
  },
  { phrase: "කිසියම් ප්‍රශ්න අසන වාක්‍යයක් අවසානයේ මෙය යෙදේ.", answer: "?" },
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
  const [currentLevel, setCurrentLevel] = useState(1);
  const [levels, setLevels] = useState(defaultLevels);
  const [score, setScore] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [stars, setStars] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [showPhrasePopup, setShowPhrasePopup] = useState(false);
  const [manualPopup, setManualPopup] = useState(false);
  const [showNextLevelPopup, setShowNextLevelPopup] = useState(false);
  const [showRetryPopup, setShowRetryPopup] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const popupTimeoutRef = useRef(null);
  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);
  const finishSoundRef = useRef(null);

  const punctuationMarks = [".", ",", '"', "!", "?", "()"];
  const punctuationIcons = {
    ".": `<img src="${pIcon}" alt="." class="falling-icon" />`,
    ",": `<img src="${kIcon}" alt="," class="falling-icon" />`,
    "!": `<img src="${eIcon}" alt="!" class="falling-icon" />`,
    "?": `<img src="${quIcon}" alt="?" class="falling-icon" />`,
    '"': `<img src="${qIcon}" alt='"' class="falling-icon" />`,
    "()": `<img src="${bIcon}" alt="()" class="falling-icon" />`,
  };

  const createFallingElement = useCallback(() => {
    const container = document.querySelector(".activity1-game-area");
    if (!container) return;
    const mark =
      punctuationMarks[Math.floor(Math.random() * punctuationMarks.length)];
    const element = document.createElement("div");
    element.className = "activity1-falling-mark";
    element.style.left = `${Math.random() * 80 + 10}%`;
    element.innerHTML = punctuationIcons[mark];
    if (levels[currentLevel - 1]) {
      element.onclick = () => {
        if (mark === levels[currentLevel - 1].answer) {
          playCorrect(); // 🔊 right answer
          setScore((s) => s + 1);
        } else {
          playWrong(); // 🔊 wrong answer
          setIncorrectCount((c) => c + 1);
        }
        element.remove();
      };
    }
    container.appendChild(element);
    setTimeout(() => element.remove(), 5000);
  }, [currentLevel, levels]);

  useEffect(() => {
    if (isGameActive) {
      const interval = setInterval(createFallingElement, 1000);
      return () => clearInterval(interval);
    }
  }, [isGameActive, createFallingElement]);

  useEffect(() => {
    if (isGameActive) {
      const totalClicks = score + incorrectCount;
      if (score >= 5 || incorrectCount >= 3 || totalClicks >= 8) {
        setTotalPoints((p) => p + score);
        if (score === 5) setStars((s) => s + 1);
        if (currentLevel < levels.length) {
          setIsGameActive(false);
          setTimeout(() => {
            setCurrentLevel((l) => l + 1);
            setScore(0);
            setIncorrectCount(0);
            setManualPopup(true);
            setShowPhrasePopup(true);
          }, 500);
        } else {
          setIsGameActive(false);
          setShowNextLevelPopup(true);
        }
      }
    }
  }, [score, incorrectCount, isGameActive, currentLevel, levels.length]);

  const startLevel = () => {
    setLevels([...defaultLevels].sort(() => Math.random() - 0.5));
    setCurrentLevel(1);
    setScore(0);
    setIncorrectCount(0);
    setTotalPoints(0);
    setStars(0);
    setGameFinished(false);
    setShowPhrasePopup(true);
    setManualPopup(true);
    popupTimeoutRef.current = setTimeout(dismissPopup, 5000);
  };

  const dismissPopup = () => {
    setShowPhrasePopup(false);
    setIsGameActive(true);
    clearTimeout(popupTimeoutRef.current);
  };

  const manualShowPhrase = () => {
    setManualPopup(true);
    setShowPhrasePopup(true);
  };

  const handleRetry = () => {
    setShowRetryPopup(false);
    setScore(0);
    setIncorrectCount(0);
    setIsGameActive(true);
  };

  const handleFinalNext = () => {
    playFinish(); // 🔊 celebration sound
    setShowNextLevelPopup(false);
    setGameFinished(true);
  };
  const clickSoundRef = useRef(null);

  useEffect(() => {
    clickSoundRef.current = new Audio(clickSound);
    clickSoundRef.current.volume = 0.6; // softer than full blast
  }, []);

  const handleStartClick = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0; // rewind for rapid re-clicks
      clickSoundRef.current.play();
    }
    startLevel(); // the function you already had
  };

  const playClick = () => {
    if (clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0; // rewind for rapid taps
      clickSoundRef.current.play();
    }
  };

  const handleManualShowPhrase = () => {
    playClick();
    manualShowPhrase();
  };

  const handleDismissPopupClick = () => {
    playClick();
    dismissPopup();
  };

  useEffect(() => {
    correctSoundRef.current = new Audio(soundCorrect);
    wrongSoundRef.current = new Audio(soundWrong);
    finishSoundRef.current = new Audio(soundFinish);
    correctSoundRef.current.volume = 0.7;
    wrongSoundRef.current.volume = 0.7;
    finishSoundRef.current.volume = 0.8;
  }, []);

  const playCorrect = () => {
    if (correctSoundRef.current) {
      correctSoundRef.current.currentTime = 0;
      correctSoundRef.current.play();
    }
  };

  const playWrong = () => {
    if (wrongSoundRef.current) {
      wrongSoundRef.current.currentTime = 0;
      wrongSoundRef.current.play();
    }
  };

  const playFinish = () => {
    if (finishSoundRef.current) {
      finishSoundRef.current.currentTime = 0;
      finishSoundRef.current.play();
    }
  };

  if (gameFinished)
    return <WritingGame3ScoreBoard totalPoints={totalPoints} stars={stars} />;

  return (
    <div className="activity1-game-container">
      {currentLevel === 1 &&
      !isGameActive &&
      !showPhrasePopup &&
      !showNextLevelPopup &&
      !showRetryPopup &&
      score === 0 ? (
        <div
          className="initial-screen"
          style={{ backgroundImage: `url(${instructionsBg})` }}
        >
          <div className="board-content">
            <h2>විරාම ලක්ෂණ හුරුව</h2>
            <p className="intro-text">
              අදාළ පැහැදිලි කිරීමට අනුව තිරයේ වැටෙන නිවැරදි විරාම ලක්ෂණය මත
              ක්ලික් කරන්න. ඔබට ලැබෙන්නේ අවස්ථා තුනකි. වැරදි එකක් මත ක්ලික්
              කළොත් අවස්ථාවක් අහිමි වේ. නිවැරදි ක්ලික් කිරීමට ලකුණුු ලැබේ.
            </p>
            <button className="initial-btn" onClick={handleStartClick}>
              පටන් ගන්න
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="title-box">
            <h2 className="level-heading">අදියර {currentLevel}</h2>
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
              <button onClick={handleManualShowPhrase}>
                පද පෙළ නැවත බලන්න
              </button>
            </div>
          )}
          {isGameActive && <div className="activity1-game-area" />}
        </>
      )}

      {showPhrasePopup && (
        <div className="modal-overlay">
          <div className="modal-content phrase-popup">
            <h3>පද පෙළ</h3>
            <p>{levels[currentLevel - 1]?.phrase}</p>
            <button onClick={handleDismissPopupClick}>ඉවත් වෙන්න</button>
          </div>
        </div>
      )}

      {showRetryPopup && (
        <div className="modal-overlay">
          <div className="modal-content retry-popup">
            <h3>උත්සාහය නැවතත්!</h3>
            <p>වැඩි වැරදි ඇති විය. නැවත උත්සාහ කරන්න!</p>
            <button onClick={handleRetry}>🔄 නැවත ආරම්භ කරන්න</button>
          </div>
        </div>
      )}

      {showNextLevelPopup && (
        <div className="modal-overlay">
          <div className="modal-content next-level-popup">
            <h3>සාර්ථකයි! 🎉</h3>
            {currentLevel === levels.length ? (
              <p>සියලුම අදියර සම්පූර්ණ කළා!</p>
            ) : (
              <p>ඊළඟ අදියරට යන්න...</p>
            )}
            <button onClick={handleFinalNext}>
              {currentLevel === levels.length ? "අවසන් කරන්න" : "ඊළඟ මට්ටම"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity1;

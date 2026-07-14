import React, { useState, useEffect, useRef } from "react";
import backgroundImage from "../../../../assets/writing_interventions/background/back11.webp";
import chestimage from "../../../../assets/writing_interventions/cards/chest.png";
import popupimage from "../../../../assets/writing_interventions/popups/popupimage.webp";
import popupimage2 from "../../../../assets/writing_interventions/popups/popupimage2.webp";

import { useNavigate } from "react-router-dom";
import { FaRedo, FaArrowRight, FaEllipsisH } from "react-icons/fa";

import flipSound from "../../../../assets/Audios/v_flip.mp3";
import correctSound from "../../../../assets/Audios/v_correct.wav";
import wrongSound from "../../../../assets/Audios/v_wrong.wav";
import timeSound from "../../../../assets/Audios/v_time.wav";
import finishSound from "../../../../assets/Audios/v_finish.wav";
import clickSound from "../../../../assets/Audios/click_sound.mp3";

const cardStyles = `
  .card {
    perspective: 1000px;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    position: relative;
    cursor: pointer;
    border: none;
    outline: none;
    background: transparent;
  }
  .card.flipped {
    transform: rotateY(180deg);
  }
  .front,
  .back {
    position: absolute;
    width: 100%;
    height: 100%;
    white-space: normal;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    transition: transform 0.6s;
    border: none;
    outline: none;
  }
  .back {
    transform: rotateY(0deg);
    background-color: #3b82f6;
    color: white;
    z-index: 1;
  }
  .front {
    transform: rotateY(180deg);
    background-color: white;
    color: #2563eb;
    z-index: 2;
  }
  .matched .front {
    background-color: #d1fae5;
  }
  @keyframes pop-in {
    0% { transform: scale(0); opacity: 0; }
    90% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes stars {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(3); opacity: 0; }
  }
  .animate-pop-in { animation: pop-in 0.3s ease-out; }
  .stars-animation {
    position: absolute;
    width: 100px;
    height: 100px;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="%23FFD700" d="M12 0l3.09 6.26L22 7.27l-5 4.87 1.18 6.88L12 16l-6.18 3.02L7 12.14 2 7.27l6.91-1.01L12 0z"/></svg>');
    animation: stars 1.5s ease-out infinite;
    opacity: 0;
  }
  @keyframes magicStar {
    0% { transform: scale(0.5); opacity: 0; }
    50% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(0.5); opacity: 0; }
  }
  .magic-star { animation: magicStar 1.5s ease-in-out infinite; }

  .celebration-animation {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .celebration-star {
    font-size: 8rem;
    animation: star-pop 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    transform-origin: center;
  }
  .celebration-item {
    position: absolute;
    font-size: 2rem;
    opacity: 0;
    animation: celebration-flow 1.5s ease-out both;
  }
  @keyframes star-pop {
    0% { transform: scale(0); opacity: 0; }
    80% { transform: scale(1.2); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes celebration-flow {
    0%   { opacity: 1; transform: translate(0, 0)   scale(1) rotate(0deg); }
    100% { opacity: 0; transform:
            translate(calc(var(--dx) * 300px), calc(var(--dy) * 300px))
            scale(0.5) rotate(360deg); }
  }
  .item-0 { --dx: 0.5;  --dy: -0.5; color: #FFD700; }
  .item-1 { --dx: -0.5; --dy: -0.5; color: #FF69B4; }
  .item-2 { --dx: 0.3;  --dy: 0.7;  color: #7FFF00; }
  .item-3 { --dx: -0.3; --dy: 0.7;  color: #00BFFF; }
`;

/* -------------------------- card data – EXACT copy -------------------------- */
const consonants = [
  { id: 1, content: "ක්", type: "consonant", combined: "ක" },
  { id: 2, content: "ක්", type: "consonant", combined: "ක" },
  { id: 3, content: "ද්", type: "consonant", combined: "ද" },
  { id: 4, content: "ද්", type: "consonant", combined: "ද" },
  { id: 5, content: "ට්", type: "consonant", combined: "ට" },
  { id: 6, content: "ට්", type: "consonant", combined: "ට" },
  { id: 7, content: "ග්", type: "consonant", combined: "ග" },
  { id: 8, content: "ග්", type: "consonant", combined: "ග" },
];

const vowels = [
  {
    id: 9,
    content: "ආ",
    type: "vowel",
    matra: "ා",
    expectedVowelName: "ඇලපිල්ල",
  },
  {
    id: 10,
    content: "ඇ",
    type: "vowel",
    matra: "ැ",
    expectedVowelName: "කෙටි ඇදපිල්ල",
  },
  {
    id: 11,
    content: "ඈ",
    type: "vowel",
    matra: "ෑ",
    expectedVowelName: "දික් ඇදපිල්ල",
  },
  {
    id: 12,
    content: "ඉ",
    type: "vowel",
    matra: "ි",
    expectedVowelName: "කෙටි ඉස්පිල්ල",
  },
  {
    id: 13,
    content: "ඊ",
    type: "vowel",
    matra: "ී",
    expectedVowelName: "දික් ඉස්පිල්ල",
  },
  {
    id: 14,
    content: " ඒ ",
    type: "vowel",
    matra: "ේ",
    expectedVowelName: "කොම්බුව සහිත හල්කිරීමේ ලකුණ",
  },
  {
    id: 15,
    content: " ඔ ",
    type: "vowel",
    matra: "ො",
    expectedVowelName: "කොම්බුව සහිත ඇලපිල්ල",
  },
  {
    id: 16,
    content: "ඕ",
    type: "vowel",
    matra: "ෝ",
    expectedVowelName: "කොම්බුව, ඇලපිල්ල සහිත හල්කිරීමේ ලකුණ",
  },
];

const vowelNames = [
  { id: 17, content: "ඇලපිල්ල", type: "vowelName" },
  { id: 18, content: "කෙටි ඇදපිල්ල", type: "vowelName" },
  { id: 19, content: "දික් ඇදපිල්ල", type: "vowelName" },
  { id: 20, content: "කෙටි ඉස්පිල්ල", type: "vowelName" },
  { id: 21, content: "දික් ඉස්පිල්ල", type: "vowelName" },
  { id: 22, content: "කොම්බුව සහිත හල්කිරීමේ ලකුණ", type: "vowelName" },
  { id: 23, content: "කොම්බුව සහිත ඇලපිල්ල", type: "vowelName" },
  {
    id: 24,
    content: "කොම්බුව, ඇලපිල්ල සහිත හල්කිරීමේ ලකුණ",
    type: "vowelName",
  },
];

/* -------------------------- shuffle helpers (unchanged) --------------------- */
const shuffle = (arr) => {
  let i = arr.length,
    r;
  while (i) {
    r = Math.floor(Math.random() * i--);
    [arr[i], arr[r]] = [arr[r], arr[i]];
  }
  return arr;
};
const initializeCards = () =>
  shuffle([...consonants, ...vowels, ...vowelNames]);

function Activity1() {
  const navigate = useNavigate();

  /* 🔊 refs for audio */
  const flipRef = useRef(null);
  const correctRef = useRef(null);
  const wrongRef = useRef(null);
  const timeRef = useRef(null);
  const finishRef = useRef(null);
  const clickRef = useRef(null);
  const play = (ref) => {
    if (ref.current) {
      ref.current.currentTime = 0;
      ref.current.play();
    }
  };

  useEffect(() => {
    flipRef.current = new Audio(flipSound);
    correctRef.current = new Audio(correctSound);
    wrongRef.current = new Audio(wrongSound);
    timeRef.current = new Audio(timeSound);
    finishRef.current = new Audio(finishSound);
    clickRef.current = new Audio(clickSound);
  }, []);

  const [cards, setCards] = useState(initializeCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300);
  const [showMatch, setShowMatch] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const getStars = (s) =>
    s === 80
      ? 5
      : s === 60
      ? 4
      : s === 50
      ? 3
      : s === 40
      ? 2
      : s === 30
      ? 1
      : 0;
  const starRating = getStars(score);

  /* timer */
  useEffect(() => {
    const t = setInterval(() => {
      if (!gameOver && timeLeft > 0) setTimeLeft((tl) => tl - 1);
    }, 1000);
    return () => clearInterval(t);
  }, [gameOver, timeLeft]);

  /* end-of-game check */
  useEffect(() => {
    if (timeLeft === 0 || score === 80) {
      setGameOver(true);
      setGameWon(score === 80);
      score === 80 ? play(finishRef) : play(timeRef);
    }
  }, [timeLeft, score]);

  /* ------------- card click handler with sounds ------------- */
  const handleCardClick = (id) => {
    if (gameOver || flippedCards.length === 3 || matchedPairs.includes(id))
      return;

    play(flipRef);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 3) {
      const sel = newFlipped.map((cid) => cards.find((c) => c.id === cid));
      const count = { consonant: 0, vowel: 0, vowelName: 0 };
      sel.forEach((c) => {
        count[c.type]++;
      });

      if (count.consonant === 1 && count.vowel === 1 && count.vowelName === 1) {
        const consonantCard = sel.find((c) => c.type === "consonant");
        const vowelCard = sel.find((c) => c.type === "vowel");
        const vowelNameCard = sel.find((c) => c.type === "vowelName");

        if (vowelCard.expectedVowelName === vowelNameCard.content) {
          play(correctRef);

          const combo = consonantCard.combined + vowelCard.matra;
          setShowMatch({
            consonant: consonantCard.content,
            vowel: vowelCard.content,
            result: combo,
            vowelName: vowelNameCard.content,
          });

          setTimeout(() => {
            setMatchedPairs((prev) => [...prev, ...newFlipped]);
            setScore((prev) => prev + 10);
            setFlippedCards([]);
            setShowMatch(null);
          }, 2000);
          return;
        }
      }
      /* wrong selection */
      play(wrongRef);
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  /* reset */
  const resetGame = () => {
    play(clickRef);
    setCards(initializeCards());
    setFlippedCards([]);
    setMatchedPairs([]);
    setScore(0);
    setTimeLeft(300);
    setGameOver(false);
    setGameWon(false);
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const ss = (s % 60).toString().padStart(2, "0");
    return `${m}:${ss}`;
  };

  /* =============================================================================
     RENDER
  ============================================================================= */
  return (
    <div
      className="min-h-screen p-8 pb-16"
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        overflowY: "auto",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: cardStyles }} />

      <div className="max-w-4xl mx-auto">
        {/* ---------- header ---------- */}
        <div className="text-center mb-8">
          <h1 className="text-7xl font-extrabold text-white mb-2 drop-shadow-2xl">
            නිවැරදි පිල්ලම තෝරමු
          </h1>
          <p className="text-4xl font-semibold text-white mb-6 drop-shadow-md">
            අදියර 3
          </p>
          <div className="flex justify-center gap-8">
            <div className="bg-white/90 px-6 py-2 rounded-full shadow-md">
              <p className="text-2xl font-semibold text-blue-700">
                ලකුණු: {score}
              </p>
            </div>
            <div className="bg-white/90 px-6 py-2 rounded-full shadow-md">
              <p className="text-2xl font-semibold text-blue-700">
                ඉතිරිවී ඇති කාලය: {formatTime(timeLeft)}
              </p>
            </div>
          </div>
        </div>

        {/* ---------- card grid ---------- */}
        <div
          className="grid grid-cols-6 gap-x-14 gap-y-4 mb-12 px-4"
          style={{ marginTop: "-40px", marginBottom: "40px" }}
        >
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`card h-36 w-36 text-xl font-bold whitespace-normal ${
                flippedCards.includes(card.id) || matchedPairs.includes(card.id)
                  ? "flipped"
                  : ""
              } ${matchedPairs.includes(card.id) ? "matched" : ""}`}
              disabled={matchedPairs.includes(card.id)}
            >
              <div className="front absolute w-full h-full bg-white text-sky-600 rounded-lg shadow-lg flex items-center justify-center text-2xl">
                {card.content}
              </div>
              <div className="back absolute w-full h-full bg-sky-500 rounded-lg shadow-lg flex items-center justify-center">
                <img
                  src={chestimage}
                  alt="Chest"
                  className="object-cover w-full h-full"
                />
              </div>
            </button>
          ))}
        </div>

        {/* ---------- correct combo celebration ---------- */}
        {showMatch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="celebration-animation">
              <div className="celebration-star">🎉</div>
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`celebration-item item-${i % 4}`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {i % 2 ? "⭐" : "✨"}
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-blue-100 p-10 rounded-2xl text-4xl text-blue-800 font-bold text-center z-10 animate-pop-in shadow-lg transform hover:scale-105">
              {showMatch.consonant} + {showMatch.vowel} = {showMatch.result},{" "}
              {showMatch.vowelName}
            </div>
          </div>
        )}

        {/* ---------- end-of-game popup ---------- */}
        {gameOver && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div
              className="p-12 rounded-lg text-center animate-pop-in shadow-lg"
              style={{
                maxWidth: "90%",
                width: "400px",
                backgroundImage: `linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url(${
                  gameWon ? popupimage : popupimage2
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h2
                className="text-4xl font-extrabold mb-4"
                style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.6)" }}
              >
                {gameWon ? "සුභ පැතුම්!" : "කාලය ඉවරයි!"}
              </h2>

              {starRating > 0 && (
                <div className="flex justify-center mb-4 text-3xl text-yellow-500">
                  {Array.from({ length: starRating }).map((_, i) => (
                    <span key={i} className="magic-star">
                      ⭐
                    </span>
                  ))}
                </div>
              )}

              <p
                className="text-2xl font-semibold mb-4"
                style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}
              >
                අවසාන ලකුණු: {score}
              </p>

              {/* ---------- icon navigation buttons ---------- */}
              <div className="flex justify-center gap-6 mt-8">
                {/* restart */}
                <button
                  onClick={() => {
                    play(clickRef);
                    resetGame();
                  }}
                  className="w-14 h-14 flex items-center justify-center rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-lg transition-colors"
                  title="නැවත උත්සාහ කරන්න"
                >
                  <FaRedo size={28} />
                </button>

                {/* go back to Game-2 menu */}
                <button
                  onClick={() => {
                    play(clickRef);
                    setTimeout(
                      () => navigate("/writing-game2-menu", { replace: true }),
                      80
                    );
                  }}
                  className="w-14 h-14 flex items-center justify-center rounded-full text-white bg-green-600 hover:bg-green-700 shadow-lg transition-colors"
                  title="ඊළඟ මෙනුව"
                >
                  <FaArrowRight size={28} />
                </button>

                {/* main menu */}
                <button
                  onClick={() => {
                    play(clickRef);
                    setTimeout(
                      () => navigate("/writing-game-menu", { replace: true }),
                      80
                    );
                  }}
                  className="w-14 h-14 flex items-center justify-center rounded-full text-white bg-purple-600 hover:bg-purple-700 shadow-lg transition-colors"
                  title="මුල් මෙනුව"
                >
                  <FaEllipsisH size={28} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Activity1;

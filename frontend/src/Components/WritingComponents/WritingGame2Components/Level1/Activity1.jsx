import React, { useState, useEffect } from "react";
import backgroundImage from "../../../../assets/writing_interventions/background/back11.webp";
import chestimage from "../../../../assets/writing_interventions/cards/chest.png";
import popupimage from "../../../../assets/writing_interventions/popups/popupimage.webp";
import popupimage2 from "../../../../assets/writing_interventions/popups/popupimage2.webp";

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
    0% {
      transform: scale(0);
      opacity: 0;
    }
    90% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  @keyframes stars {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(3);
      opacity: 0;
    }
  }
  .animate-pop-in {
    animation: pop-in 0.3s ease-out;
  }
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
  .magic-star {
    animation: magicStar 1.5s ease-in-out infinite;
  }

  .sparkle-animation {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

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
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(1) rotate(0deg);
  }
  100% {
    opacity: 0;
    transform: 
      translate(
        calc(var(--dx) * 300px), 
        calc(var(--dy) * 300px)
      )
      scale(0.5)
      rotate(360deg);
  }
}

/* Different directions */
.item-0 { --dx: 0.5; --dy: -0.5; color: #FFD700; }
.item-1 { --dx: -0.5; --dy: -0.5; color: #FF69B4; }
.item-2 { --dx: 0.3; --dy: 0.7; color: #7FFF00; }
.item-3 { --dx: -0.3; --dy: 0.7; color: #00BFFF; }
`;

const consonants = [
  { id: 1, content: "ක්", type: "consonant", combined: "ක" },
  { id: 2, content: "ක්", type: "consonant", combined: "ක" },
  { id: 3, content: "ද්", type: "consonant", combined: "ද" },
  { id: 4, content: "ද්", type: "consonant", combined: "ද" },
  { id: 5, content: "ට්", type: "consonant", combined: "ට" },
  { id: 6, content: "ට්", type: "consonant", combined: "ට" },
];

const vowels = [
  { id: 7, content: "ආ", type: "vowel", matra: "ා" },
  { id: 8, content: "ඇ", type: "vowel", matra: "ැ" },
  { id: 9, content: "එ", type: "vowel", matra: "ෙ" },
  { id: 10, content: "ඉ", type: "vowel", matra: "ි" },
  { id: 11, content: "උ", type: "vowel", matra: "ු" },
  { id: 12, content: "ඔ", type: "vowel", matra: "ො" },
];

function Activity1({ onNext }) {
  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  const initializeCards = () => shuffle([...consonants, ...vowels]);

  const [cards, setCards] = useState(initializeCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showMatch, setShowMatch] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!gameOver && timeLeft > 0) setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [gameOver, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 || score === 30) {
      setGameOver(true);
      setGameWon(score === 30);
    }
  }, [timeLeft, score]);

  const handleCardClick = (id) => {
    if (gameOver || flippedCards.length === 2 || matchedPairs.includes(id))
      return;

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard.type !== secondCard.type) {
        const consonant =
          firstCard.type === "consonant" ? firstCard : secondCard;
        const vowel = firstCard.type === "vowel" ? firstCard : secondCard;
        const combination = consonant.combined + vowel.matra;

        setShowMatch({
          consonant: consonant.content,
          vowel: vowel.content,
          result: combination,
        });

        setTimeout(() => {
          setMatchedPairs((prev) => [...prev, firstId, secondId]);
          setScore((prev) => prev + 5);
          setFlippedCards([]);
          setShowMatch(null);
        }, 2000);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  const resetGame = () => {
    setCards(initializeCards());
    setFlippedCards([]);
    setMatchedPairs([]);
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setGameWon(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const starRating = score === 30 ? 3 : score === 25 ? 2 : score === 20 ? 1 : 0;

  return (
    <div
      className="min-h-screen p-8 pb-16 bg-slate-100 overflow-y-auto"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: cardStyles }} />

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-extrabold text-white mb-2 drop-shadow-2xl">
            නිවැරදි පිල්ලම තෝරමු
          </h1>
          <p className="text-4xl font-semibold text-white mb-6 drop-shadow-md">
            අදියර 1
          </p>
          <div className="flex justify-center gap-8">
            <div className="bg-white/90 px-6 py-2 rounded-full shadow-md">
              <p className="text-2xl font-semibold text-blue-700">
                ලකුණු: {score}
              </p>
            </div>
            <div className="bg-white/90 px-6 py-2 rounded-full shadow-md">
              <p className="text-2xl font-semibold text-blue-700">
                ඉතිරි කාලය: {formatTime(timeLeft)}
              </p>
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-4 gap-4 mb-12"
          style={{
            marginTop: "-40px",
            marginBottom: "40px",
          }}
        >
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`card h-24 w-full ${
                flippedCards.includes(card.id) || matchedPairs.includes(card.id)
                  ? "flipped"
                  : ""
              } ${matchedPairs.includes(card.id) ? "matched" : ""}`}
              disabled={matchedPairs.includes(card.id)}
            >
              <div className="front absolute w-full h-full bg-white text-sky-600 rounded-lg shadow-lg flex items-center justify-center text-5xl">
                {card.content}
              </div>
              <div className="back absolute w-full h-full bg-sky-500 rounded-lg shadow-lg flex items-center justify-center">
                <img
                  src={chestimage}
                  alt="chest"
                  style={{ width: "100%", height: "100%" }}
                  className="object-contain"
                />
              </div>
            </button>
          ))}
        </div>

        {showMatch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="celebration-animation">
              {/* Main burst */}
              <div className="celebration-star">🎉</div>

              {/* Floating emojis */}
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
            <div className="bg-gradient-to-br from-blue-400 to-blue-100 p-10 rounded-2xl text-4xl text-blue-800 font-bold text-center z-10 animate-pop-in shadow-lg transform transition-all hover:scale-105">
              {showMatch.consonant} + {showMatch.vowel} = {showMatch.result}
            </div>
          </div>
        )}

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
              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition-colors"
                >
                  නැවත උත්සාහ කරන්න
                </button>
                {(score >= 20 || gameWon) && (
                  <button
                    onClick={() =>
                      (window.location.href = "/writing-game2-level2")
                    }
                    className="bg-yellow-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-yellow-600 transition-colors"
                  >
                    ඊලඟ අදියරය
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Activity1;

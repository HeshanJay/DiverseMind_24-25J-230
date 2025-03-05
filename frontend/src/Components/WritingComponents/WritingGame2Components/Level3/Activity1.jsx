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

// Fisher-Yates shuffle algorithm
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

const initializeCards = () =>
  shuffle([...consonants, ...vowels, ...vowelNames]);

function Activity1({ onNext }) {
  const [cards, setCards] = useState(initializeCards());
  // Store the ids of cards flipped in the current turn (max 3)
  const [flippedCards, setFlippedCards] = useState([]);
  // Store ids of cards that have been correctly matched
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  // Timer set to 300 seconds (5 minutes)
  const [timeLeft, setTimeLeft] = useState(300);
  const [showMatch, setShowMatch] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Helper function to determine star rating based on score
  // Fix: Use equality (===) instead of assignment (=)
  const getStars = (score) => {
    if (score === 80) return 5;
    else if (score === 60) return 4;
    else if (score === 50) return 3;
    else if (score === 40) return 2;
    else if (score === 30) return 1;
    else return 0;
  };

  // Calculate star rating
  const starRating = getStars(score);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!gameOver && timeLeft > 0) {
        setTimeLeft((t) => t - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [gameOver, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 || score === 80) {
      setGameOver(true);
      setGameWon(score === 80);
    }
  }, [timeLeft, score]);

  const handleCardClick = (id) => {
    // Do nothing if game is over, already 3 cards are flipped, or the card is already matched.
    if (gameOver || flippedCards.length === 3 || matchedPairs.includes(id))
      return;

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 3) {
      // Retrieve the three flipped cards.
      const selectedCards = newFlipped.map((cardId) =>
        cards.find((c) => c.id === cardId)
      );
      // Count card types.
      const count = { consonant: 0, vowel: 0, vowelName: 0 };
      selectedCards.forEach((card) => {
        count[card.type] = (count[card.type] || 0) + 1;
      });
      // Check if exactly one of each type is present.
      if (count.consonant === 1 && count.vowel === 1 && count.vowelName === 1) {
        const consonantCard = selectedCards.find((c) => c.type === "consonant");
        const vowelCard = selectedCards.find((c) => c.type === "vowel");
        const vowelNameCard = selectedCards.find((c) => c.type === "vowelName");
        // Check if the vowel name card matches the vowel card's expected name.
        if (vowelCard.expectedVowelName === vowelNameCard.content) {
          const combination = consonantCard.combined + vowelCard.matra;
          setShowMatch({
            consonant: consonantCard.content,
            vowel: vowelCard.content,
            result: combination,
            vowelName: vowelNameCard.content,
          });
          setTimeout(() => {
            setMatchedPairs((prev) => [...prev, ...newFlipped]);
            // Increase score by 10 for a correct match
            setScore((prev) => prev + 10);
            setFlippedCards([]);
            setShowMatch(null);
          }, 2000);
          return;
        }
      }
      // If the three flipped cards do not form a valid match, flip them back.
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  };

  const resetGame = () => {
    setCards(initializeCards());
    setFlippedCards([]);
    setMatchedPairs([]);
    setScore(0);
    setTimeLeft(300);
    setGameOver(false);
    setGameWon(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

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

        {/* Grid with 6 columns and 4 rows - with balanced margins top and bottom */}
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
              {showMatch.consonant} + {showMatch.vowel} = {showMatch.result},{" "}
              {showMatch.vowelName}
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
                {gameWon ? "Congratulations!" : "Time's Up!"}
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
                Final Score: {score}
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition-colors"
                >
                  Retry
                </button>
                {(score >= 20 || gameWon) && (
                  <button
                    onClick={() =>
                      (window.location.href = "/writing-game2-menu")
                    }
                    className="bg-yellow-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-yellow-600 transition-colors"
                  >
                    Main Menu
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

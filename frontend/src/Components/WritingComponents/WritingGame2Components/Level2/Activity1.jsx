import React, { useState, useEffect } from "react";
import backgroundImage from "../../../../assets/background_images/menu_back3.webp";
import "./Activity1.css";

// Eight consonant cards: two each for "ක්", "ද්", "ට්", and "ග්"
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

// Eight vowel cards with their corresponding matras
const vowels = [
  { id: 9, content: "ඇ", type: "vowel", matra: "ැ" }, // e.g. ක් + ඇ = කැ, etc.
  { id: 10, content: "ඈ", type: "vowel", matra: "ෑ" }, // e.g. ක් + ඈ = කෑ, etc.
  { id: 11, content: "ඊ", type: "vowel", matra: "ී" }, // e.g. ක් + ඊ = කී, etc.
  { id: 12, content: "ඒ", type: "vowel", matra: "ේ" }, // e.g. ක් + ඒ = කේ, etc.
  { id: 13, content: "ඌ", type: "vowel", matra: "ූ" }, // e.g. ක් + ඌ = කූ, etc.
  { id: 14, content: "ඓ", type: "vowel", matra: "ෛ" }, // e.g. ක් + ඓ = කෛ, etc.
  { id: 15, content: "ඖ", type: "vowel", matra: "ෞ" }, // e.g. ක් + ඖ = කෞ, etc.
  { id: 16, content: "ඕ", type: "vowel", matra: "ෝ" }, // e.g. ක් + ඕ = කෝ, etc.
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

const initializeCards = () => {
  return shuffle([...consonants, ...vowels]);
};

function Activity1({ onNext }) {
  const [cards, setCards] = useState(initializeCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // Timer set to 30 seconds (adjust if needed)
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
    if (timeLeft === 0 || score === 8) {
      setGameOver(true);
      setGameWon(score === 8);
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

      // Check only if one card is a consonant and the other is a vowel.
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
          setScore((prev) => prev + 1);
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
    setTimeLeft(30);
    setGameOver(false);
    setGameWon(false);
  };

  return (
    <div
      className="min-h-screen p-8 bg-slate-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-sky-600 mb-4">
            නිවැරදි පිල්ලම තෝරමු
          </h1>
          <div className="flex justify-center gap-8">
            <p className="text-lg text-gray-600">ලකුණු: {score}</p>
            <p className="text-lg text-gray-600">
              ඉතිරිවී ඇති කාලය: {timeLeft}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`card h-24 w-full text-3xl font-bold ${
                flippedCards.includes(card.id) || matchedPairs.includes(card.id)
                  ? "flipped"
                  : ""
              } ${matchedPairs.includes(card.id) ? "matched" : ""}`}
              disabled={matchedPairs.includes(card.id)}
            >
              <div className="front absolute w-full h-full bg-white text-sky-600 rounded-lg shadow-lg flex items-center justify-center">
                {card.content}
              </div>
              <div className="back absolute w-full h-full bg-sky-500 text-white rounded-lg shadow-lg flex items-center justify-center">
                ?
              </div>
            </button>
          ))}
        </div>

        {showMatch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="stars-animation"></div>
            <div className="bg-white p-8 rounded-lg text-4xl text-center z-10 animate-pop-in">
              {showMatch.consonant} + {showMatch.vowel} = {showMatch.result}
            </div>
          </div>
        )}

        {gameOver && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg text-center animate-pop-in">
              <h2 className="text-2xl font-bold mb-4">
                {gameWon ? "Congratulations!" : "Time's Up!"}
              </h2>
              <p className="text-xl mb-4">Final Score: {score}</p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 transition-colors"
                >
                  Retry
                </button>
                {(score >= 1 || gameWon) && (
                  <button
                    onClick={onNext}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    Next Level
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

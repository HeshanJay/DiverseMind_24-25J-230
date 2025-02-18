import React, { useState, useEffect } from "react";
import backgroundImage from "../../../../assets/background_images/menu_back3.webp";
import "./Activity1.css";

const consonants = [
  { id: 1, content: "ක්", type: "consonant", combined: "ක" },
  { id: 2, content: "ක්", type: "consonant", combined: "ක" },
  { id: 3, content: "ක්", type: "consonant", combined: "ක" },
  { id: 4, content: "ක්", type: "consonant", combined: "ක" },
  { id: 5, content: "ක්", type: "consonant", combined: "ක" },
  { id: 6, content: "ක්", type: "consonant", combined: "ක" },
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
  // Shuffle function using the Fisher-Yates algorithm
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

  const [cards, setCards] = useState(initializeCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
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
    if (timeLeft === 0 || score === 6) {
      setGameOver(true);
      setGameWon(score === 6);
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

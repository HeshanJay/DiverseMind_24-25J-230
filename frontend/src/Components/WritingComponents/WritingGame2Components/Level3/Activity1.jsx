import React, { useState, useEffect } from "react";
import backgroundImage from "../../../../assets/background_images/menu_back3.webp";
import "./Activity1.css";

// --- Consonant Cards (8 cards) ---
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

// --- Vowel Symbol Cards (8 cards) ---
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

// --- Vowel Name Cards (8 cards) ---
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

const initializeCards = () => {
  return shuffle([...consonants, ...vowels, ...vowelNames]);
};

function Activity1({ onNext }) {
  const [cards, setCards] = useState(initializeCards());
  // Store the ids of cards flipped in the current turn (max 3)
  const [flippedCards, setFlippedCards] = useState([]);
  // Store ids of cards that have been correctly matched
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  // Timer set to 600 seconds (10 minutes)
  const [timeLeft, setTimeLeft] = useState(600);
  const [showMatch, setShowMatch] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!gameOver && timeLeft > 0) {
        setTimeLeft((t) => t - 1);
      }
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
            setScore((prev) => prev + 1);
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
    setTimeLeft(600);
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
      <div className="max-w-4xl mx-auto">
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

        {/* Grid with 6 columns and 4 rows; moved up with a negative margin */}
        <div
          className="grid grid-cols-6 gap-4 mb-8"
          style={{ marginTop: "-20px" }}
        >
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`card h-36 w-full text-xl font-bold whitespace-normal ${
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
              {showMatch.consonant} + {showMatch.vowel} = {showMatch.result},{" "}
              {showMatch.vowelName}
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

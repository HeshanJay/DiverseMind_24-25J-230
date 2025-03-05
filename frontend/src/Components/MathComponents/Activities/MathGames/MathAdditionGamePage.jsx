import React, { useState, useEffect } from "react";
import "./MathAdditionGamePage.css"; // Import the updated CSS file
import correctSound from "../../../../assets/Audios/design_sounds/correct.mp3";
import incorrectSound from "../../../../assets/Audios/design_sounds/incorrect.mp3";
import levelUpSound from "../../../../assets/Audios/design_sounds/level_up.mp3";
import characterUnlockSound from "../../../../assets/Audios/design_sounds/character_unlock.mp3";
import backgroundImage from "../../../../assets/background_images/bg_23.png";
import character1 from "../../../../assets/characters/angel.png";
import character2 from "../../../../assets/characters/knight.png";
import character3 from "../../../../assets/characters/kid.png";
import Confetti from "react-confetti";

const MathAdditionGamePage = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(3);
  const [problem, setProblem] = useState(generateProblem(currentLevel));
  const [answerCards, setAnswerCards] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [stars, setStars] = useState(0);
  const [unlockedCharacters, setUnlockedCharacters] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showCharacterUnlock, setShowCharacterUnlock] = useState(false);
  const [celebrationCharacter, setCelebrationCharacter] = useState(null);

  function generateProblem(level) {
    let num1, num2;
    if (level <= 3) {
      num1 = Math.floor(Math.random() * 90) + 10;
      num2 = Math.floor(Math.random() * 90) + 10;
    } else {
      num1 = Math.floor(Math.random() * 900) + 100;
      num2 = Math.floor(Math.random() * 900) + 100;
    }
    const answer = num1 + num2;
    const cards = generateAnswerCards(answer);
    return { num1, num2, answer, cards };
  }

  function generateAnswerCards(correctAnswer) {
    const cards = [correctAnswer];
    while (cards.length < 4) {
      const randomAnswer = correctAnswer + Math.floor(Math.random() * 20) - 10;
      if (!cards.includes(randomAnswer)) {
        cards.push(randomAnswer);
      }
    }
    return cards.sort(() => Math.random() - 0.5);
  }

  const handleDragStart = (e, answer) => {
    setSelectedAnswer(answer);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (selectedAnswer === problem.answer) {
      new Audio(correctSound).play();
      setScore(score + 10);
      setStars((prevStars) => Math.min(prevStars + 1, 3));
      setFeedback("correct");

      setTimeout(() => {
        setFeedback(null);
        if (currentQuestion === 2) {
          unlockCharacter();
        } else {
          setCurrentQuestion(currentQuestion + 1);
          setProblem(generateProblem(currentLevel));
        }
        setSelectedAnswer(null);
      }, 1000);
    } else {
      new Audio(incorrectSound).play();
      setHealth(health - 1);
      setFeedback("incorrect");
      if (health === 1) setIsGameOver(true);
      setTimeout(() => {
        setFeedback(null);
        setSelectedAnswer(null);
      }, 1000);
    }
  };

  const unlockCharacter = () => {
    const characters = [
      { name: "Angel", image: character1 },
      { name: "Knight", image: character2 },
      { name: "Kid", image: character3 },
    ];
    const newCharacter = characters[unlockedCharacters.length];
    if (newCharacter) {
      setUnlockedCharacters([...unlockedCharacters, newCharacter]);
      setCelebrationCharacter(newCharacter);
      setShowCharacterUnlock(true);
      new Audio(characterUnlockSound).play();
    }
  };

  const nextLevel = () => {
    if (currentLevel < 3) {
      setCurrentLevel(currentLevel + 1);
      setCurrentQuestion(1);
      setIsLevelComplete(false);
      setProblem(generateProblem(currentLevel + 1));
    } else {
      setShowConfetti(true);
      setIsGameOver(true);
    }
  };

  const resetGame = () => {
    setCurrentLevel(1);
    setCurrentQuestion(1);
    setScore(0);
    setHealth(3);
    setStars(0);
    setUnlockedCharacters([]);
    setIsGameOver(false);
    setIsLevelComplete(false);
    setProblem(generateProblem(1));
    setShowConfetti(false);
    setFeedback(null);
    setShowCharacterUnlock(false);
    setCelebrationCharacter(null);
  };

  useEffect(() => {
    setProblem(generateProblem(currentLevel));
  }, [currentLevel]);

  return (
    <div
      className="magp-math-addition-game-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {showCharacterUnlock && <Confetti />}
      {showCharacterUnlock && celebrationCharacter && (
        <div className="magp-character-unlock-modal">
          <div className="magp-modal-content">
            <h2>You Unlocked {celebrationCharacter.name}!</h2>
            <img
              src={celebrationCharacter.image}
              alt={celebrationCharacter.name}
              className="magp-celebration-character"
            />
            <button
              onClick={() => {
                setShowCharacterUnlock(false);
                setIsLevelComplete(true);
              }}
            >
              Yay!
            </button>
          </div>
        </div>
      )}

      <div className="magp-game-header">
        <div className="magp-game-stats">
          <span>Level: {currentLevel}</span>
          <span>Score: {score}</span>
          <span>Health: {"❤️".repeat(health)}</span>
          <span>Stars: {"⭐".repeat(stars)}</span>
        </div>
        <div className="magp-unlocked-characters">
          <h3>Unlocked Friends:</h3>
          <div className="magp-character-list">
            {unlockedCharacters.map((character, index) => (
              <img
                key={index}
                src={character.image}
                alt={character.name}
                className="magp-character-avatar"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="magp-game-content">
        <h2>Let’s Solve This!</h2>
        <div className="magp-problem">
          <span>{problem.num1}</span>
          <span>+</span>
          <span>{problem.num2}</span>
          <span>=</span>
          <div
            className={`magp-answer-box ${feedback === "correct" ? "magp-correct-feedback" : ""} ${
              feedback === "incorrect" ? "magp-incorrect-feedback" : ""
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {selectedAnswer !== null ? selectedAnswer : "?"}
          </div>
        </div>
        <div className="magp-answer-cards">
          {problem.cards.map((card, index) => (
            <div
              key={index}
              className="magp-answer-card"
              draggable
              onDragStart={(e) => handleDragStart(e, card)}
            >
              {card}
            </div>
          ))}
        </div>
      </div>

      {isLevelComplete && (
        <div className="magp-level-complete">
          <h2>Level {currentLevel} Done!</h2>
          <p>You got {stars} stars! 🌟</p>
          <button onClick={nextLevel}>
            {currentLevel < 3 ? "Next Adventure" : "Celebrate!"}
          </button>
        </div>
      )}

      {isGameOver && (
        <div className="magp-game-over">
          <h2>{currentLevel === 3 ? "You’re a Math Hero!" : "Oops, Try Again!"}</h2>
          <p>Your Score: {score}</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default MathAdditionGamePage;



// import React, { useState, useEffect } from "react";
// import "./MathAdditionGamePage.css"; // Import the CSS file
// import correctSound from "../../../../assets/Audios/design_sounds/correct.mp3";
// import incorrectSound from "../../../../assets/Audios/design_sounds/incorrect.mp3";
// import levelUpSound from "../../../../assets/Audios/design_sounds/level_up.mp3";
// import characterUnlockSound from "../../../../assets/Audios/design_sounds/character_unlock.mp3";
// import backgroundImage from "../../../../assets/background_images/bg_23.png"; // Add a game background image
// import character1 from "../../../../assets/characters/angel.png"; // Add character images
// import character2 from "../../../../assets/characters/knight.png";
// import character3 from "../../../../assets/characters/kid.png";
// import Confetti from "react-confetti"; // For celebration animation

// const MathAdditionGamePage = () => {
//   const [currentLevel, setCurrentLevel] = useState(1);
//   const [currentQuestion, setCurrentQuestion] = useState(1);
//   const [score, setScore] = useState(0);
//   const [health, setHealth] = useState(3);
//   const [problem, setProblem] = useState(generateProblem(currentLevel));
//   const [answerCards, setAnswerCards] = useState([]);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [stars, setStars] = useState(0);
//   const [unlockedCharacters, setUnlockedCharacters] = useState([]);
//   const [isGameOver, setIsGameOver] = useState(false);
//   const [isLevelComplete, setIsLevelComplete] = useState(false);
//   const [showConfetti, setShowConfetti] = useState(false); // For celebration animation

//   // Generate a random addition problem based on the level
//   function generateProblem(level) {
//     let num1, num2;
//     if (level <= 3) {
//       // Two-digit numbers for levels 1-3
//       num1 = Math.floor(Math.random() * 90) + 10;
//       num2 = Math.floor(Math.random() * 90) + 10;
//     } else {
//       // Three-digit numbers for levels 4+
//       num1 = Math.floor(Math.random() * 900) + 100;
//       num2 = Math.floor(Math.random() * 900) + 100;
//     }
//     const answer = num1 + num2;
//     const cards = generateAnswerCards(answer);
//     return { num1, num2, answer, cards };
//   }

//   // Generate answer cards with one correct and random incorrect answers
//   function generateAnswerCards(correctAnswer) {
//     const cards = [correctAnswer];
//     while (cards.length < 4) {
//       const randomAnswer = correctAnswer + Math.floor(Math.random() * 20) - 10;
//       if (!cards.includes(randomAnswer)) {
//         cards.push(randomAnswer);
//       }
//     }
//     return cards.sort(() => Math.random() - 0.5); // Shuffle the cards
//   }

//   // Handle drag start
//   const handleDragStart = (e, answer) => {
//     setSelectedAnswer(answer);
//   };

//   // Handle drag over
//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   // Handle drop
//   const handleDrop = (e) => {
//     e.preventDefault();
//     if (selectedAnswer === problem.answer) {
//       // Correct answer
//       new Audio(correctSound).play();
//       setScore(score + 10);
//       setStars((prevStars) => {
//         const newStars = prevStars + 1;
//         if (newStars <= 3) {
//           return newStars;
//         }
//         return prevStars;
//       });
//     } else {
//       // Incorrect answer
//       new Audio(incorrectSound).play();
//       setHealth(health - 1);
//       if (health === 1) {
//         setIsGameOver(true);
//       }
//     }

//     // Check if the current level is complete
//     if (currentQuestion === 2) {
//       setIsLevelComplete(true);
//       unlockCharacter();
//     } else {
//       setCurrentQuestion(currentQuestion + 1);
//     }

//     // Reset selected answer and generate a new problem
//     setSelectedAnswer(null);
//     setProblem(generateProblem(currentLevel));
//   };

//   // Unlock a new character
//   const unlockCharacter = () => {
//     const characters = [
//       { name: "Angel", image: character1 },
//       { name: "Knight", image: character2 },
//       { name: "Kid", image: character3 },
//     ];
//     const newCharacter = characters[unlockedCharacters.length];
//     if (newCharacter) {
//       setUnlockedCharacters([...unlockedCharacters, newCharacter]);
//       new Audio(characterUnlockSound).play();
//     }
//   };

//   // Move to the next level
//   const nextLevel = () => {
//     if (currentLevel < 3) {
//       setCurrentLevel(currentLevel + 1);
//       setCurrentQuestion(1);
//       setIsLevelComplete(false);
//       setProblem(generateProblem(currentLevel + 1));
//     } else {
//       // Game completed
//       setShowConfetti(true); // Show confetti
//       setIsGameOver(true);
//     }
//   };

//   // Reset the game
//   const resetGame = () => {
//     setCurrentLevel(1);
//     setCurrentQuestion(1);
//     setScore(0);
//     setHealth(3);
//     setStars(0);
//     setUnlockedCharacters([]);
//     setIsGameOver(false);
//     setIsLevelComplete(false);
//     setProblem(generateProblem(1));
//     setShowConfetti(false); // Hide confetti
//   };

//   useEffect(() => {
//     setProblem(generateProblem(currentLevel));
//   }, [currentLevel]);

//   return (
//     <div
//       className="math-addition-game-page"
//       style={{ backgroundImage: `url(${backgroundImage})` }}
//     >
//       {/* Confetti Animation */}
//       {showConfetti && <Confetti />}

//       {/* Game Header */}
//       <div className="game-header">
//         <div className="game-stats">
//           <span>Level: {currentLevel}</span>
//           <span>Score: {score}</span>
//           <span>Health: {"❤️".repeat(health)}</span>
//           <span>Stars: {"⭐".repeat(stars)}</span>
//         </div>
//         <div className="unlocked-characters">
//           <h3>Unlocked Characters:</h3>
//           <div className="character-list">
//             {unlockedCharacters.map((character, index) => (
//               <img
//                 key={index}
//                 src={character.image}
//                 alt={character.name}
//                 className="character-avatar"
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Game Content */}
//       <div className="game-content">
//         <h2>Solve the Addition Problem:</h2>
//         <div className="problem">
//           <span>{problem.num1}</span>
//           <span>+</span>
//           <span>{problem.num2}</span>
//           <span>=</span>
//           <div
//             className="answer-box"
//             onDragOver={handleDragOver}
//             onDrop={handleDrop}
//           >
//             {selectedAnswer !== null ? selectedAnswer : "Drop Answer Here"}
//           </div>
//         </div>
//         <div className="answer-cards">
//           {problem.cards.map((card, index) => (
//             <div
//               key={index}
//               className="answer-card"
//               draggable
//               onDragStart={(e) => handleDragStart(e, card)}
//             >
//               {card}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Level Complete Screen */}
//       {isLevelComplete && (
//         <div className="level-complete">
//           <h2>Level {currentLevel} Complete!</h2>
//           <p>You earned {stars} stars!</p>
//           <button onClick={nextLevel}>
//             {currentLevel < 3 ? "Next Level" : "Finish Game"}
//           </button>
//         </div>
//       )}

//       {/* Game Over Screen */}
//       {isGameOver && (
//         <div className="game-over">
//           <h2>{currentLevel === 3 ? "Game Completed!" : "Game Over!"}</h2>
//           <p>Your final score: {score}</p>
//           <button onClick={resetGame}>Play Again</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MathAdditionGamePage;
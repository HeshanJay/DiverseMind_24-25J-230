import React, { useState, useEffect } from "react";
import ReadingDashboard from "../Components/ReadingDashboard/ReadingDashboard";
import Passage1 from "../Components/Passage1/Passage1";
import Passage2 from "../Components/Passage2/Passage2";
import Passage3 from "../Components/Passage3/Passage3";
import Passage4 from "../Components/Passage4/Passage4";
import Passage5 from "../Components/Passage5/Passage5";
import ScoreBoard from "../Components/ScoreBoard/ScoreBoard";

const AttentionReadingTest = () => {
  const [currentComponent, setCurrentComponent] = useState(
    localStorage.getItem("currentComponent") || "ReadingDashboard"
  );

  // Initialize score to 0
  const [score, setScore] = useState(0);

  useEffect(() => {
    localStorage.setItem("currentComponent", currentComponent);
  }, [currentComponent]);

  const handleStartReading = () => setCurrentComponent("Passage1");

  const handleNext = (isCorrect) => {
    // Increment score only if the answer is correct
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    // Navigate through components
    switch (currentComponent) {
      case "Passage1":
        setCurrentComponent("Passage2");
        break;
      case "Passage2":
        setCurrentComponent("Passage3");
        break;
      case "Passage3":
        setCurrentComponent("Passage4");
        break;
      case "Passage4":
        setCurrentComponent("Passage5");
        break;
      case "Passage5":
        setCurrentComponent("ScoreBoard");
        break;
      default:
        break;
    }
  };

  const handlePrevious = () => {
    setCurrentComponent("ReadingDashboard");
  };

  const handleRestart = () => {
    setCurrentComponent("ReadingDashboard");
    setScore(0);
    localStorage.removeItem("currentComponent");
  };

  return (
    <div>
      {currentComponent === "ReadingDashboard" && (
        <ReadingDashboard onNext={handleStartReading} />
      )}
      {currentComponent === "Passage1" && (
        <Passage1
          onPrevious={handlePrevious}
          onNext={() => handleNext(false)} // No score for Passage1
        />
      )}
      {currentComponent === "Passage2" && (
        <Passage2
          onNext={(isCorrect) => handleNext(isCorrect)}
          onPrevious={handlePrevious}
        />
      )}
      {currentComponent === "Passage3" && (
        <Passage3
          onNext={(isCorrect) => handleNext(isCorrect)}
          onPrevious={handlePrevious}
        />
      )}
      {currentComponent === "Passage4" && (
        <Passage4
          onNext={(isCorrect) => handleNext(isCorrect)}
          onPrevious={handlePrevious}
        />
      )}
      {currentComponent === "Passage5" && (
        <Passage5
          onNext={(isCorrect) => handleNext(isCorrect)}
          onPrevious={handlePrevious}
        />
      )}
      {currentComponent === "ScoreBoard" && (
        <ScoreBoard
          score={score}
          totalQuestions={4}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default AttentionReadingTest;

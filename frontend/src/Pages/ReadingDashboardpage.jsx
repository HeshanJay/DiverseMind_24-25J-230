import React, { useState, useEffect } from "react";
import ReadingDashboard from "../Components/AttentionReadingTest/ReadingDashboard/ReadingDashboard";
import Passage1 from "../Components/AttentionReadingTest/Passage1/Passage1";
import Passage2 from "../Components/AttentionReadingTest/Passage2/Passage2";
import Passage3 from "../Components/AttentionReadingTest/Passage3/Passage3";
import Passage4 from "../Components/AttentionReadingTest/Passage4/Passage4";
import Passage5 from "../Components/AttentionReadingTest/Passage5/Passage5";
import PassageM from "../Components/AttentionReadingTest/PassageM/PassageM"; // New PassageM
import Passage6 from "../Components/AttentionReadingTest/Passage6/Passage6";
import ScoreBoard from "../Components/AttentionReadingTest/ScoreBoard/ScoreBoard";

const AttentionReadingTest = () => {
  const [currentComponent, setCurrentComponent] = useState(
    localStorage.getItem("currentComponent") || "ReadingDashboard"
  );

  const [score, setScore] = useState(0);

  useEffect(() => {
    localStorage.setItem("currentComponent", currentComponent);
  }, [currentComponent]);

  const handleStartReading = () => setCurrentComponent("Passage1");

  const handleNext = (isCorrect) => {
    if (
      ["Passage2", "Passage3", "Passage4", "Passage5"].includes(
        currentComponent
      ) &&
      isCorrect
    ) {
      setScore((prevScore) => prevScore + 1);
    }

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
        setCurrentComponent("PassageM"); // Go to PassageM instead of Passage6
        break;
      case "PassageM":
        setCurrentComponent("Passage6"); // After PassageM, go to Passage6
        break;
      case "Passage6":
        setCurrentComponent("ScoreBoard");
        break;
      default:
        break;
    }
  };

  const handlePrevious = () => {
    switch (currentComponent) {
      case "Passage2":
        setCurrentComponent("Passage1");
        break;
      case "Passage3":
        setCurrentComponent("Passage2");
        break;
      case "Passage4":
        setCurrentComponent("Passage3");
        break;
      case "Passage5":
        setCurrentComponent("Passage4");
        break;
      case "PassageM":
        setCurrentComponent("Passage5"); // Go back to Passage5 from PassageM
        break;
      case "Passage6":
        setCurrentComponent("PassageM"); // Go back to PassageM from Passage6
        break;
      case "ScoreBoard":
        setCurrentComponent("Passage6");
        break;
      default:
        setCurrentComponent("ReadingDashboard");
        break;
    }
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
          onNext={(isCorrect) => handleNext(isCorrect)}
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
      {currentComponent === "PassageM" && (
        <PassageM
          onNext={(isCorrect) => handleNext(isCorrect)}
          onPrevious={() => setCurrentComponent("Passage5")}
        />
      )}
      {currentComponent === "Passage6" && (
        <Passage6
          onNext={(isCorrect) => handleNext(isCorrect)}
          onPrevious={() => setCurrentComponent("PassageM")}
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

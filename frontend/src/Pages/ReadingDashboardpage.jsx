import React, { useState, useEffect } from "react";
import ReadingDashboard from "../Components/AttentionReadingTest/ReadingDashboard/ReadingDashboard";
import Passage1 from "../Components/AttentionReadingTest/Passage1/Passage1";
import Passage2 from "../Components/AttentionReadingTest/Passage2/Passage2";
import Passage3 from "../Components/AttentionReadingTest/Passage3/Passage3";
import Passage4 from "../Components/AttentionReadingTest/Passage4/Passage4";
import Passage5 from "../Components/AttentionReadingTest/Passage5/Passage5";
import PassageM from "../Components/AttentionReadingTest/PassageM/PassageM";
import PassageM1 from "../Components/AttentionReadingTest/PassageM1/PassageM1";
import PassageM2 from "../Components/AttentionReadingTest/PassageM2/PassageM2";
import PassageM3 from "../Components/AttentionReadingTest/PassageM3/PassageM3";
import PassageK from "../Components/AttentionReadingTest/PassageK/PassageK"; // New PassageK
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

  const handleNext = (isCorrect) => {
    // Ensure only Passage2, Passage3, Passage4, and Passage5 contribute to the score
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
        setCurrentComponent("PassageM");
        break;
      case "PassageM":
        setCurrentComponent("PassageM1");
        break;
      case "PassageM1":
        setCurrentComponent("PassageM2");
        break;
      case "PassageM2":
        setCurrentComponent("PassageM3");
        break;
      case "PassageM3":
        setCurrentComponent("PassageK");
        break;
      case "PassageK":
        setCurrentComponent("Passage6");
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
        setCurrentComponent("Passage5");
        break;
      case "PassageM1":
        setCurrentComponent("PassageM");
        break;
      case "PassageM2":
        setCurrentComponent("PassageM1");
        break;
      case "PassageM3":
        setCurrentComponent("PassageM2");
        break;
      case "PassageK":
        setCurrentComponent("PassageM3");
        break;
      case "Passage6":
        setCurrentComponent("PassageK");
        break;
      case "ScoreBoard":
        setCurrentComponent("Passage6");
        break;
      default:
        setCurrentComponent("ReadingDashboard");
        break;
    }
  };

  return (
    <div>
      {currentComponent === "ReadingDashboard" && (
        <ReadingDashboard onNext={() => setCurrentComponent("Passage1")} />
      )}
      {currentComponent === "Passage1" && (
        <Passage1 onPrevious={handlePrevious} onNext={handleNext} />
      )}
      {currentComponent === "Passage2" && (
        <Passage2 onNext={handleNext} onPrevious={handlePrevious} />
      )}
      {currentComponent === "Passage3" && (
        <Passage3 onNext={handleNext} onPrevious={handlePrevious} />
      )}
      {currentComponent === "Passage4" && (
        <Passage4 onNext={handleNext} onPrevious={handlePrevious} />
      )}
      {currentComponent === "Passage5" && (
        <Passage5 onNext={handleNext} onPrevious={handlePrevious} />
      )}
      {currentComponent === "PassageM" && (
        <PassageM
          onNext={() => setCurrentComponent("PassageM1")}
          onPrevious={() => setCurrentComponent("Passage5")}
        />
      )}
      {currentComponent === "PassageM1" && (
        <PassageM1
          onNext={() => setCurrentComponent("PassageM2")}
          onPrevious={() => setCurrentComponent("PassageM")}
        />
      )}
      {currentComponent === "PassageM2" && (
        <PassageM2
          onNext={() => setCurrentComponent("PassageM3")}
          onPrevious={() => setCurrentComponent("PassageM1")}
        />
      )}
      {currentComponent === "PassageM3" && (
        <PassageM3
          onNext={() => setCurrentComponent("PassageK")}
          onPrevious={() => setCurrentComponent("PassageM2")}
        />
      )}
      {currentComponent === "PassageK" && (
        <PassageK
          onNext={() => setCurrentComponent("Passage6")}
          onPrevious={() => setCurrentComponent("PassageM3")}
        />
      )}
      {currentComponent === "Passage6" && (
        <Passage6
          onNext={handleNext}
          onPrevious={() => setCurrentComponent("PassageK")}
        />
      )}
      {currentComponent === "ScoreBoard" && (
        <ScoreBoard
          score={score}
          totalQuestions={4} // Ensures only Passage2, Passage3, Passage4, and Passage5 are counted
          onRestart={() => setCurrentComponent("ReadingDashboard")}
        />
      )}
    </div>
  );
};

export default AttentionReadingTest;

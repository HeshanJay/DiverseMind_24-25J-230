import React, { useState, useEffect } from "react";
import ReadingDashboard from "../Components/ReadingDashboard/ReadingDashboard";
import Passage1 from "../Components/Passage1/Passage1";
import Passage2 from "../Components/Passage2/Passage2";
import Passage3 from "../Components/Passage3/Passage3";
import Passage4 from "../Components/Passage4/Passage4";
import Passage5 from "../Components/Passage5/Passage5";
import ScoreBoard from "../Components/ScoreBoard/ScoreBoard";

const AttentionReadingTest = () => {
  // Load the current component from localStorage or default to "ReadingDashboard"
  const [currentComponent, setCurrentComponent] = useState(
    localStorage.getItem("currentComponent") || "ReadingDashboard"
  );

  const [answers, setAnswers] = useState([]);
  const correctAnswers = ["C", "B", "C", "B"]; // Answers for Passage2, Passage3, Passage4, Passage5

  // Update localStorage whenever the current component changes
  useEffect(() => {
    localStorage.setItem("currentComponent", currentComponent);
  }, [currentComponent]);

  // Handler to start the test (go to Passage1)
  const handleStartReading = () => setCurrentComponent("Passage1");

  // Handler for navigating to the next passage
  const handleNext = (answer) => {
    if (currentComponent !== "Passage1") {
      // Only track answers for MCQ passages (Passage2 to Passage5)
      setAnswers((prev) => [...prev, answer]);
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
        setCurrentComponent("ScoreBoard");
        break;
      default:
        break;
    }
  };

  // Handler for navigating to the previous passage
  const handlePrevious = () => {
    if (currentComponent !== "Passage1") {
      answers.pop(); // Remove the last answer for MCQ passages
      setAnswers([...answers]);
    }

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
      default:
        setCurrentComponent("ReadingDashboard");
        break;
    }
  };

  // Handler for restarting the test
  const handleRestart = () => {
    setCurrentComponent("ReadingDashboard");
    setAnswers([]);
    localStorage.removeItem("currentComponent"); // Clear localStorage
  };

  // Calculate the score
  const calculateScore = () => {
    // Compare user answers to correct answers starting from Passage2
    return answers.filter((answer, index) => answer === correctAnswers[index])
      .length;
  };

  return (
    <div>
      {currentComponent === "ReadingDashboard" && (
        <ReadingDashboard onNext={handleStartReading} />
      )}
      {currentComponent === "Passage1" && (
        <Passage1
          onPrevious={handlePrevious}
          onNext={() => handleNext()} // No answer needed for Passage1
        />
      )}
      {currentComponent === "Passage2" && (
        <Passage2
          onPrevious={handlePrevious}
          onNext={(answer) => handleNext(answer)}
        />
      )}
      {currentComponent === "Passage3" && (
        <Passage3
          onPrevious={handlePrevious}
          onNext={(answer) => handleNext(answer)}
        />
      )}
      {currentComponent === "Passage4" && (
        <Passage4
          onPrevious={handlePrevious}
          onNext={(answer) => handleNext(answer)}
        />
      )}
      {currentComponent === "Passage5" && (
        <Passage5
          onPrevious={handlePrevious}
          onNext={(answer) => handleNext(answer)}
        />
      )}
      {currentComponent === "ScoreBoard" && (
        <ScoreBoard
          score={calculateScore()}
          totalQuestions={correctAnswers.length}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default AttentionReadingTest;

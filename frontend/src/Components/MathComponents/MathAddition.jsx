import React, { useRef, useEffect, useState } from "react";
import "./MathAddition.css";
import additionImage1 from "../../assets/Math/addition1.png";
import additionImage2 from "../../assets/Math/addition2.png";
import substractionImage1 from "../../assets/Math/substraction1.png";
import substractionImage2 from "../../assets/Math/substraction2.png";
import divisionImage1 from "../../assets/Math/division1.png";
import divisionImage2 from "../../assets/Math/division2.png";
import multiplicationImage1 from "../../assets/Math/multiplication1.png";
import multiplicationImage2 from "../../assets/Math/multiplication2.png";
import fractionImage1 from "../../assets/Math/fraction1.png";
import fractionImage2 from "../../assets/Math/fraction2.png";
import timeBoardImage from "../../assets/characters/time_board.png";
import axios from "axios";
import MathFinalFeedback from "./MathFinalFeedback";

const MathAddition = () => {
  const inputRef = useRef(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [currentTopic, setCurrentTopic] = useState("addition");
  const [scores, setScores] = useState([]);
  const [timeData, setTimeData] = useState({
    addition_time: 0,
    substraction_time: 0,
    division_time: 0,
    multiplication_time: 0,
    fraction_time: 0,
    addition_score: 0,
    substraction_score: 0,
    division_score: 0,
    multiplication_score: 0,
    fraction_score: 0,
  });
  const [timer, setTimer] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  const [showFinalFeedback, setShowFinalFeedback] = useState(false);
  const [predictionResult, setPredictionResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent duplicate submissions

  // Navigation functions (replace with your actual navigation if needed)
  const onGoHome = () => console.log("Go Home clicked");
  const onGoMenu = () => console.log("Main Menu clicked");
  const onRetry = () => console.log("Retry clicked");

  // Mapping function: update the backend result to the desired text.
  const mapPredictionToText = (prediction) => {
    switch (prediction) {
      case 0:
        return "ඉතා හොඳයි!";
      case 1:
        return "හොඳයි!";
      case 2:
        return "උනන්දු විය යුතුයි!";
      default:
        return "Unknown Result";
    }
  };

  const questions = {
    addition: {
      images: [additionImage1, additionImage2],
      answers: ["564", "3037"],
    },
    substraction: {
      images: [substractionImage1, substractionImage2],
      answers: ["32", "116"],
    },
    division: {
      images: [divisionImage1, divisionImage2],
      answers: ["24", "25"],
    },
    multiplication: {
      images: [multiplicationImage1, multiplicationImage2],
      answers: ["86", "340"],
    },
    fraction: {
      images: [fractionImage1, fractionImage2],
      answers: ["2", "4"],
    },
  };

  const topicOrder = [
    "addition",
    "substraction",
    "division",
    "multiplication",
    "fraction",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(Math.round((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentQuestion]);

  const handleInput = (e) => {
    if (!/^\d*$/.test(e.target.value)) {
      e.target.value = e.target.value.replace(/\D/g, "");
    }
  };

  const handleNextQuestion = async () => {
    const userAnswer = inputRef.current.value.trim();
    const currentAnswers = questions[currentTopic].answers;
    const isCorrect =
      userAnswer === currentAnswers[currentQuestion - 1] ? 1 : 0;

    setScores([...scores, isCorrect]);

    if (currentQuestion < 2) {
      setCurrentQuestion(currentQuestion + 1);
      inputRef.current.value = "";
    } else {
      // Compute score for the current topic
      const topicScore = scores.reduce((sum, score) => sum + score, isCorrect);

      // Create a local updatedTimeData object to include the latest results
      const updatedTimeData = {
        ...timeData,
        [`${currentTopic}_time`]: timer,
        [`${currentTopic}_score`]: topicScore,
      };

      // If there are more topics, move to the next topic
      const currentTopicIndex = topicOrder.indexOf(currentTopic);
      if (currentTopicIndex < topicOrder.length - 1) {
        const nextTopic = topicOrder[currentTopicIndex + 1];
        setCurrentTopic(nextTopic);
        setCurrentQuestion(1);
        setStartTime(Date.now());
        setTimer(0);
        setScores([]);
        inputRef.current.value = "";
        // Update state with the latest values (optional, for consistency)
        setTimeData(updatedTimeData);
      } else {
        // Final topic completed – compute total values
        const totalTime = topicOrder.reduce(
          (sum, topic) => sum + (updatedTimeData[`${topic}_time`] || 0),
          0
        );
        const totalAccuracy = topicOrder.reduce(
          (sum, topic) => sum + (updatedTimeData[`${topic}_score`] || 0),
          0
        );

        const requestData = {
          ...updatedTimeData,
          total_time: totalTime,
          total_accuracy: totalAccuracy,
        };

        // Prevent duplicate submission
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
<<<<<<< HEAD
          console.log("Sending Data:", requestData);
          const response = await axios.post("http://127.0.0.1:8000/math-prediction/", requestData);
          const mappedResult = mapPredictionToText(response.data.prediction); // Convert result
          setPredictionResult(mappedResult); // Set mapped result
          setShowPopup(true); // Show popup
=======
          console.log("Sending Data for Prediction:", requestData);

          // Step 1: Get Prediction Outcome
          const predictionResponse = await axios.post(
            "http://127.0.0.1:8000/math-prediction/",
            requestData
          );
          const predictionOutcome = predictionResponse.data.prediction;
          const mappedResult = mapPredictionToText(predictionOutcome);
          setPredictionResult(mappedResult);

          // Step 2: Save Math Results (Including Prediction Outcome)
          const studentId = localStorage.getItem("student_id");
          const finalData = {
            ...requestData,
            // Use the values from updatedTimeData (ensuring latest results)
            addition_score: updatedTimeData.addition_score,
            substraction_score: updatedTimeData.substraction_score,
            division_score: updatedTimeData.division_score,
            multiplication_score: updatedTimeData.multiplication_score,
            fraction_score: updatedTimeData.fraction_score,
            skillPhrase: mappedResult,
            student_id: studentId, // include student ID here
          };

          await axios.post(
            "http://127.0.0.1:8000/save-math-results/",
            finalData
          );

          setShowFinalFeedback(true);
>>>>>>> 5206e652eb675fe20bd3b18bad06c8040d33592d
        } catch (error) {
          console.error("Error:", error);
          setPredictionResult("Error: Unable to process results.");
          setShowFinalFeedback(true);
        }
      }
    }
  };

  const currentImages = questions[currentTopic].images;

  // If the final feedback state is active, render the MathFinalFeedback component.
  if (showFinalFeedback) {
    return (
      <MathFinalFeedback
        skillPhrase={predictionResult}
        onGoHome={onGoHome}
        onGoMenu={onGoMenu}
        onRetry={onRetry}
      />
    );
  }

  return (
    <div className="math-addition">
      {/* Timer */}
      <div className="timer-container">
        <img src={timeBoardImage} alt="Timer Board" className="timer-board" />
        <div className="timer-text">
          කාලය: <br /> {timer} තත්පර
        </div>
      </div>

      <div className="activity-card">
        <h2 className="activity-card-heading">ක්‍රියාකාරකම</h2>
      </div>

      <div className="math-addition-heading-container">
        <h1 className="math-addition-heading">
          {currentTopic === "addition"
            ? "සංඛ්‍යා එකතුකර පිළිතුර ඇතුළත් කරන්න "
            : currentTopic === "substraction"
            ? "සංඛ්‍යා අඩුකර පිළිතුර ඇතුළත් කරන්න"
            : currentTopic === "division"
            ? "සංඛ්‍යා බෙදා පිළිතුර ඇතුළත් කරන්න "
            : currentTopic === "multiplication"
            ? "සංඛ්‍යා ගුණකර පිළිතුර ඇතුළත් කරන්න"
            : "අදුරු කර ඇති කොටස කවර භාගයක් ද ? "}
        </h1>
      </div>

      <div className="math-addition-card">
        <img
          src={currentQuestion === 1 ? currentImages[0] : currentImages[1]}
          alt={`${currentTopic} Illustration`}
          className="math-addition-image"
        />
      </div>

      <div className="answer-card">
        {currentTopic === "fraction" ? (
          <div className="fraction-answer">
            <label className="answer-label" htmlFor="answer">
              පිළිතුර
            </label>
            <span className="fraction-numerator">1</span>
            <span className="fraction-divider">/</span>
            <input
              type="text"
              id="denominator"
              ref={inputRef}
              className="fraction-denominator-input"
              onInput={handleInput}
            />
          </div>
        ) : (
          <>
            <label className="answer-label" htmlFor="answer">
              පිළිතුර
            </label>
            <input
              type="text"
              id="answer"
              ref={inputRef}
              className="answer-input"
              onInput={handleInput}
            />
          </>
        )}
      </div>
      {/* Buttons */}
      <div className="button-container">
        <button className="custom-button" onClick={handleNextQuestion}>
          {currentQuestion === 1 ? "අවසන්" : "අවසානය"}
        </button>
      </div>
    </div>
  );
};

export default MathAddition;

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

  // State for popup
  const [showPopup, setShowPopup] = useState(false);
  const [predictionResult, setPredictionResult] = useState("");

    // Map backend result to frontend text
    const mapPredictionToText = (prediction) => {
      switch (prediction) {
        case 0:
          return "සාමාන්‍යයි";
        case 1:
          return "මධ්‍යම";
        case 2:
          return "අවධානම්";
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

  const topicOrder = ["addition", "substraction", "division", "multiplication", "fraction"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(Math.round((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    inputRef.current.focus();
  }, [currentQuestion]);

  const handleInput = (e) => {
    if (!/^\d*$/.test(e.target.value)) {
      e.target.value = e.target.value.replace(/\D/g, "");
    }
  };

  const handleNextQuestion = async () => {
    const userAnswer = inputRef.current.value.trim();
    const currentAnswers = questions[currentTopic].answers;
    const isCorrect = userAnswer === currentAnswers[currentQuestion - 1] ? 1 : 0;

    setScores([...scores, isCorrect]);

    if (currentQuestion < 2) {
      // Move to the next question
      setCurrentQuestion(currentQuestion + 1);
      inputRef.current.value = "";
    } else {
      // Save time for the current topic
      const topicScore = scores.reduce((sum, score) => sum + score, isCorrect);
      setTimeData((prevData) => ({
        ...prevData,
        [`${currentTopic}_time`]: timer,
        [`${currentTopic}_score`]: topicScore,
      }));
      // setTimeData({
      //   ...timeData,
      //   [`${currentTopic}_time`]: timer,
      //   [`${currentTopic}_score`]: scores.reduce((sum, score) => sum + score, isCorrect),
      // });

      const currentTopicIndex = topicOrder.indexOf(currentTopic);
      if (currentTopicIndex < topicOrder.length - 1) {
        // Move to the next topic
        const nextTopic = topicOrder[currentTopicIndex + 1];
        setCurrentTopic(nextTopic);
        setCurrentQuestion(1);
        setStartTime(Date.now());
        setTimer(0);
        setScores([]);
        inputRef.current.value = "";
      } else {
        // All topics completed
        const totalTime = topicOrder.reduce(
          (sum, topic) => sum + (timeData[`${topic}_time`] || 0),
          timer
        );
        const totalAccuracy = topicOrder.reduce(
          (sum, topic) => sum + (timeData[`${topic}_score`] || 0),
          0
        );
        // const totalTime = Object.values(timeData).reduce((sum, value) => sum + (value || 0), timer);
        // const totalAccuracy =
        //   Object.values(timeData)
        //     .filter((key) => key.includes("_score"))
        //     .reduce((sum, score) => sum + score, 0) / (topicOrder.length * 2);

        const requestData = {
          ...timeData,
          total_time: totalTime,
          total_accuracy: totalAccuracy,
        };

        // Send data to backend for prediction
        // try {
        //   const response = await axios.post("http://127.0.0.1:8000/predict/", requestData);
        //   alert(`Prediction Result: ${response.data.prediction}`);
        // } catch (error) {
        //   console.error("Error making prediction:", error);
        // }
        try {
          console.log("Sending Data:", requestData);
          const response = await axios.post("http://127.0.0.1:8000/predict/", requestData);
          const mappedResult = mapPredictionToText(response.data.prediction); // Convert result
          setPredictionResult(mappedResult); // Set mapped result
          setShowPopup(true); // Show popup
        } catch (error) {
          console.error("Error making prediction:", error);
          setPredictionResult("Error: Unable to get prediction.");
          setShowPopup(true);
        }
      }
    }
  };

  const currentImages = questions[currentTopic].images;

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
      {/* <div className="answer-card">
        <label className="answer-label" htmlFor="answer">
          පිළිතුර
        </label>
        <input
          type="text"
          id="answer"
          ref={inputRef}
          className="answer-input"
          placeholder="Enter your answer here"
          onInput={handleInput}
        />
      </div> */}

      {/* Buttons */}
      <div className="button-container">
        <button className="custom-button" onClick={handleNextQuestion}>
          {currentQuestion === 1 ? "අවසන්" : "අවසානය"}
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>වාර්ථාව </h2>
            <p>{
            predictionResult}</p>
            <button className="close-popup" onClick={() => setShowPopup(false)}>
            හරි 
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default MathAddition;


























// import React, { useRef, useEffect, useState } from "react";
// import "./MathAddition.css";
// import additionImage1 from "../../assets/Math/addition1.png";
// import additionImage2 from "../../assets/Math/addition2.png";
// import substractionImage1 from "../../assets/Math/substraction1.png";
// import substractionImage2 from "../../assets/Math/substraction2.png";
// import divisionImage1 from "../../assets/Math/division1.png";
// import divisionImage2 from "../../assets/Math/division2.png";
// import multiplicationImage1 from "../../assets/Math/multiplication1.png";
// import multiplicationImage2 from "../../assets/Math/multiplication2.png";
// import fractionImage1 from "../../assets/Math/fraction1.png";
// import fractionImage2 from "../../assets/Math/fraction2.png";
// import timeBoardImage from "../../assets/characters/time_board.png";

// const MathAddition = () => {
//   const inputRef = useRef(null);
//   const [currentQuestion, setCurrentQuestion] = useState(1);
//   const [currentTopic, setCurrentTopic] = useState("addition");
//   const [scores, setScores] = useState([]);
//   const [timer, setTimer] = useState(0); // Timer state
//   const [startTime, setStartTime] = useState(Date.now());

//   const questions = {
//     addition: {
//       images: [additionImage1, additionImage2],
//       answers: ["564", "3037"],
//     },
//     substraction: {
//       images: [substractionImage1, substractionImage2],
//       answers: ["32", "116"],
//     },
//     division: {
//       images: [divisionImage1, divisionImage2],
//       answers: ["24", "25"],
//     },
//     multiplication: {
//       images: [multiplicationImage1, multiplicationImage2],
//       answers: ["86", "340"],
//     },
//     fraction: {
//       images: [fractionImage1, fractionImage2],
//       answers: ["2", "4"],
//     },
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimer(Math.round((Date.now() - startTime) / 1000));
//     }, 1000);

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, [startTime]);

//   useEffect(() => {
//     inputRef.current.focus();
//   }, [currentQuestion]);

//   const handleInput = (e) => {
//     if (!/^\d*$/.test(e.target.value)) {
//       e.target.value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
//     }
//   };

//   const handleNextQuestion = () => {
//     const userAnswer = inputRef.current.value.trim(); // Get user input
//     const currentAnswers = questions[currentTopic].answers;
//     const isCorrect = userAnswer === currentAnswers[currentQuestion - 1] ? 1 : 0;

//     setScores([...scores, isCorrect]);

//     if (currentQuestion < 2) {
//       // Move to the next question in the current topic
//       setCurrentQuestion(currentQuestion + 1);
//       inputRef.current.value = ""; // Clear the input
//     } else {
//       // Finish the current topic
//       const totalScore = scores.reduce((sum, score) => sum + score, isCorrect);
//       const totalElapsedTime = Math.round((Date.now() - startTime) / 1000);
//       alert(`අවසාන ලකුණු: ${totalScore}\nමුලු කාලය: ${totalElapsedTime} තත්පර`);

//       // Move to the next topic
//       const topicOrder = ["addition", "substraction", "division", "multiplication", "fraction"];
//       const currentTopicIndex = topicOrder.indexOf(currentTopic);

//       if (currentTopicIndex < topicOrder.length - 1) {
//         const nextTopic = topicOrder[currentTopicIndex + 1];
//         setCurrentTopic(nextTopic);
//         setCurrentQuestion(1);
//         setStartTime(Date.now());
//         setTimer(0);
//         setScores([]);
//         inputRef.current.value = ""; // Clear the input
//       } else {
//         alert("All topics completed!");
//       }
//     }
//   };

//   const currentImages = questions[currentTopic].images;

//   return (
//     <div className="math-addition">
//       {/* Timer */}
//       <div className="timer-container">
//         <img src={timeBoardImage} alt="Timer Board" className="timer-board" />
//         <div className="timer-text">
//           කාලය: <br /> {timer} තත්පර
//         </div>
//       </div>

//       {/* Activity Card */}
//       <div className="activity-card">
//         <h2 className="activity-card-heading">ක්‍රියාකාරකම</h2>
//       </div>

//       {/* Page Heading */}
//       <h1 className="math-addition-heading">
//         {currentTopic === "addition"
//           ? "සංඛ්‍යා එකතු කරන්න"
//           : currentTopic === "substraction"
//           ? "අඩු කරන්න"
//           : currentTopic === "division"
//           ? "බෙදන්න"
//           : currentTopic === "multiplication"
//           ? "ගුණ කරන්න"
//           : "භාගයක් කරන්න"}
//       </h1>

//       {/* Customizable Box/Card */}
//       <div className="math-addition-card">
//         <img
//           src={currentQuestion === 1 ? currentImages[0] : currentImages[1]}
//           alt={`${currentTopic} Illustration`}
//           className="math-addition-image"
//         />
//       </div>

//       {/* Answer Card */}
//       <div className="answer-card">
//         <label className="answer-label" htmlFor="answer">
//           පිළිතුර
//         </label>
//         <input
//           type="text"
//           id="answer"
//           ref={inputRef}
//           className="answer-input"
//           placeholder="Enter your answer here"
//           onInput={handleInput}
//         />
//       </div>

//       {/* Buttons */}
//       <div className="button-container">
//         <button className="custom-button" onClick={handleNextQuestion}>
//           {currentQuestion === 1 ? "අවසන්" : "අවසානය"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MathAddition;




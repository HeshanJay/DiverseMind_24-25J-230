import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa"; // Import FaPlay
import backImg from "../assets/background_images/back7.png"; // Background image for the audio page
import backImgAnswer from "../assets/background_images/back12.jpg"; // Background image for the answers page
import audio1 from "../assets/Audios/1.mp3"; // Question 1 audio
import audio2 from "../assets/Audios/2.mp3"; // Question 2 audio
import audio3 from "../assets/Audios/3.mp3"; // Question 3 audio
import audio4 from "../assets/Audios/4.mp3"; // Question 4 audio
import audio5 from "../assets/Audios/5.mp3"; // Question 5 audio
import ScoreBoard from "../Components/Score_board"; // Import the ScoreBoard component
import { useNavigate } from "react-router-dom"; 

const AudioMeasurementActivity = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1); // Track the current question number
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // Whether audio is playing
  const [showAnswers, setShowAnswers] = useState(false); // To show answers after audio plays twice
  const [timer, setTimer] = useState(15); // Timer for the answer phase
  const [audioPlayedCount, setAudioPlayedCount] = useState(0); // Track how many times the audio has played
  const [score, setScore] = useState(0); // Track score
  const [isQuizCompleted, setIsQuizCompleted] = useState(false); // To check if quiz is completed
  const navigate = useNavigate(); // Hook for navigation

  const audioFiles = [audio1, audio2, audio3, audio4, audio5]; // Audio files for all 5 questions

  // Answer options for each question
  const answers = [
    [
      "1. අමරගේ පියා පොල් කැඩුවේය.",
      "2. නිමල්ගේ පියා පොල් කැඩුවේය.",
      "3. අමරගේ පියා පොල් කැඩුවාය.",
      "4. අමරගේ පියා ගල් කැඩුවේය.",
    ],
    [
      "1. නිමල්ගේ මව බත් පිසුවාය.",
      "2. නිමල්ගේ මව කිරිබත් පිසුවේය.",
      "3. නිමලාගේ මව කිරිබත් පිසුවාය.",
      "4. නිමල්ගේ මව කිරිබත් පිසුවාය.",
    ],
    [
      "1. නිමල් අමල් සමඟ පාඩම් කරයි.",
      "2. සුනිමල් නිමල් සමඟ පාඩම් කරයි.",
      "3. නිමල් සුනිමල් සමඟ පාඩම් කරයි.",
      "4. නිමල් සුනිමල් සමඟ පාඩම් කරති.",
    ],
    [
      "1. නිර්මලාගේ මව විමලා වන අතර විමලාගේ මව අමලා වේ.",
      "2. නිර්මලාගේ මව විමලා වන අතර විමලාගේ මව කමලා වේ.",
      "3. නිර්මලාගේ මව කමලා වන අතර විමලාගේ මව විමලා වේ.",
      "4. නිර්මලාගේ මව විමලා වන අතර අමලාගේ මව කමලා වේ.",
    ],
    [
      "1. මහනුවර සිට බදුල්ල බලා ධාවනය වන දුම්රිය පස්වරු 5.30 වන විට 6 වන වේදිකාවට ළගා වනු ඇත.",
      "2. මහනුවර සිට කොළඹ බලා ධාවනය වන දුම්රිය පස්වරු 6.30 වන විට 6 වන වේදිකාවට ළගා වනු ඇත.",
      "3. මහනුවර සිට කොළඹ බලා ධාවනය වන දුම්රිය පස්වරු 5.30 වන විට 7 වන වේදිකාවට ළගා වනු ඇත.",
      "4. මහනුවර සිට කොළඹ බලා ධාවනය වන දුම්රිය පස්වරු 5.30 වන විට 6 වන වේදිකාවට ළගා වනු ඇත.",
    ],
  ];

  // Answer options for the user to select (numbered options)
  const correctAnswers = [0, 3, 2, 1, 3];
  const answerOptions = ["1", "2", "3", "4"];

  // Handle playing the audio twice (Only plays twice, no more)
  useEffect(() => {
    if (audioPlayedCount < 2 && isAudioPlaying) {
      const audio = new Audio(audioFiles[currentQuestion - 1]); // Get the current question's audio
      audio.play();

      audio.onended = () => {
        setAudioPlayedCount((prev) => prev + 1); // Increment audio play count
        if (audioPlayedCount + 1 >= 2) {
          setShowAnswers(true); // Show answers after audio played twice
        }
      };
    }
  }, [isAudioPlaying, currentQuestion, audioPlayedCount]);

  // Start the audio (plays exactly 2 times)
  const handleStartAudio = () => {
    setIsAudioPlaying(true);
    setShowAnswers(false); // Hide answers initially
    setTimer(15); // Set the timer to 15 seconds for each question
    setAudioPlayedCount(0); // Reset the audio play count for this question
  };

  // Handle answer selection
  const handleAnswerClick = (index) => {
    if (index === correctAnswers[currentQuestion - 1]) {
      setScore((prevScore) => prevScore + 1); // Increment score if correct
    }
    if (currentQuestion < 5) {
      setCurrentQuestion(currentQuestion + 1); // Move to the next question
      setShowAnswers(false);
      setIsAudioPlaying(false);
    } else {
      setIsQuizCompleted(true); // Mark the quiz as completed
      // Navigate to Language Vocabulary Test after 5 seconds
      setTimeout(() => {
        navigate("/language-vocab-test"); // Ensure the route exists in your router
      }, 5000);
    }
  };
  
  
  // Timer countdown when answers are displayed
  useEffect(() => {
    if (showAnswers) {
      const timerId = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(timerId); // Stop timer when it reaches 0
            if (currentQuestion < 5) {
              setCurrentQuestion(currentQuestion + 1); // Move to next question if time runs out
              setShowAnswers(false); // Hide answers for the next question
              setIsAudioPlaying(false); // Stop audio and reset for next question
            }
          }
          return prev - 1;
        });
      }, 1000); // Timer decrements every second
      return () => clearInterval(timerId); // Cleanup timer when the component unmounts
    }
  }, [showAnswers, currentQuestion]);

  return (
    <>
      {isQuizCompleted ? (
        <ScoreBoard score={score} totalQuestions={5} onRestart={() => window.location.reload()} />
      ) : (
        <div
          className="relative z-10 flex flex-col justify-center items-center"
          style={{
            backgroundImage: showAnswers ? `url('${backImgAnswer}')` : `url('${backImg}')`, // Background image based on whether answers are shown
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            height: "100vh",
            width: "100vw",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center">
            {/* Title: Before Audio */}
            {!isAudioPlaying && !showAnswers && (
              <h1 className="text-4xl font-bold mb-6">අවධානයෙන් සවන් දෙන්න</h1>
            )}

            {/* While Audio is Playing */}
            {isAudioPlaying && !showAnswers && (
              <h1 className="text-4xl font-bold mb-6">අවධානයෙන් සවන් දෙන්න</h1>
            )}

            

            {/* Audio Control (Play Button) */}
            {!isAudioPlaying && !showAnswers && (
              <button
                onClick={handleStartAudio}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-4xl w-32 h-32 rounded-full flex items-center justify-center transform transition-all hover:scale-110"
              >
                <FaPlay className="m-auto" />
              </button>
            )}

            {/* While Audio is Playing (play icon button remains visible) */}
            {isAudioPlaying && !showAnswers && (
              <button
                disabled
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-4xl w-32 h-32 rounded-full flex items-center justify-center transform transition-all hover:scale-110"
              >
                <FaPlay className="m-auto" />
              </button>
            )}

         {/* Answer Display */}
{showAnswers && (
  <>
    {/* Main Container for Answers */}
    <div className="bg-gray-800 bg-opacity-70 p-4 rounded-lg mb-6 w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-white text-center">
        නිවැරදි පිළිතුර තෝරන්න
      </h2>

      {/* Answer Buttons in a Table */}
      <table className="w-full text-lg border-separate border-spacing-2">
        <tbody>
          {answers[currentQuestion - 1].map((answer, index) => {
            const rowIndex = Math.floor(index / 2); // Calculate row index (2 items per row)
            const colIndex = index % 2; // Calculate column index (2 items per row)

            if (colIndex === 0) {
              return (
                <tr key={rowIndex}>
                  <td className="p-3">
                    <button
                      onClick={() => handleAnswerClick(index)} // Clicking calls handleAnswerClick with this answer index
                      className="w-96 py-3 rounded-md text-lg font-semibold bg-gradient-to-r from-green-400 to-blue-400 text-white hover:scale-105 transition-transform"
                    >
                      {answer}
                    </button>
                  </td>
                  {answers[currentQuestion - 1][index + 1] && (
                    <td className="p-3">
                      <button
                        onClick={() => handleAnswerClick(index + 1)} // Next answer in the same row
                        className="w-96 py-3 rounded-md text-lg font-semibold bg-gradient-to-r from-green-400 to-blue-400 text-white hover:scale-105 transition-transform"
                      >
                        {answers[currentQuestion - 1][index + 1]}
                      </button>
                    </td>
                  )}
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>

    
    {/* Timer */}
    {showAnswers && (
      <div className="text-lg font-bold bg-gradient-to-r from-teal-400 to-cyan-600 px-4 py-3 rounded-md shadow-lg mt-4">
        කාලය: {timer} තත්පර
      </div>
    )}
  </>
)}


          </div>
        </div>
      )}
    </>
  );
};

export default AudioMeasurementActivity;

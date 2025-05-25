import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MathSubstractionGuidancePage.css"; // Import the CSS file
import bgWallpaper from "../../../../assets/background_images/bg-wallpaper_21.png";
import substractionVideo1 from "../../../../assets/Math/Substraction_1.mp4";
import substractionVideo2 from "../../../../assets/Math/Substraction_2.mp4";
import Confetti from "react-confetti"; // Import confetti library

const MathSubstractionGuidancePage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false); // State for confetti

  // Array of video sources
  const videoSources = [substractionVideo1, substractionVideo2];

  // Handle video end
  const handleVideoEnd = () => {
    setIsVideoEnded(true);
    setShowConfetti(true); // Show confetti when video ends
  };

  // Handle next button click
  const handleNextClick = () => {
    if (currentVideoIndex < videoSources.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1); // Go to the next video
      setIsVideoEnded(false); // Reset the video ended state
      setShowConfetti(false); // Hide confetti
    }
  };

  // Handle previous button click
  const handlePreviousClick = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1); // Go to the previous video
      setIsVideoEnded(false); // Reset the video ended state
      setShowConfetti(false); // Hide confetti
    }
  };

  // Handle replay button click
  const handleReplayClick = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0; // Restart the video
      videoRef.current.play();
      setIsVideoEnded(false);
      setShowConfetti(false); // Hide confetti
    }
  };

  // Handle finish button click
  const handleFinishClick = () => {
    navigate("/math-substraction-game"); // Navigate to the next activity page
  };

  // Hide confetti after 3 seconds
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000); // Confetti lasts for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div className="math-substraction-guidance-page" style={{ backgroundImage: `url(${bgWallpaper})` }}>
      {/* Confetti Animation */}
      {showConfetti && <Confetti />}

      <div className="video-container">
        <video
          ref={videoRef}
          className="guidance-video"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          key={currentVideoIndex} // Force re-render when video changes
        >
          <source src={videoSources[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Show "Previous" button if not on the first video */}
        {currentVideoIndex > 0 && (
          <button className="previous-button" onClick={handlePreviousClick}>
            ආපසු
          </button>
        )}

        {/* Show "Replay" button if the video has ended */}
        {isVideoEnded && (
          <button className="replay-button" onClick={handleReplayClick}>
            නැවත නරඹන්න
          </button>
        )}

        {/* Show "Next" button if the video has ended and it's not the last video */}
        {isVideoEnded && currentVideoIndex < videoSources.length - 1 && (
          <button className="next-button" onClick={handleNextClick}>
            ඉදිරියට
          </button>
        )}

        {/* Show "Finish" button if it's the last video */}
        {isVideoEnded && currentVideoIndex === videoSources.length - 1 && (
          <button className="finish-button" onClick={handleFinishClick}>
            අවසන්
          </button>
        )}
      </div>

      {/* Progress Indicator */}
      {/* <div className="progress-indicator">
        {videoSources.map((_, index) => (
          <div
            key={index}
            className={`progress-circle ${currentVideoIndex === index ? "active" : ""}`}
          ></div>
        ))}
      </div> */}
    </div>
  );
};

export default MathSubstractionGuidancePage;
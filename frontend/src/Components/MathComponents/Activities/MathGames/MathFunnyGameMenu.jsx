import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from "../../../../assets/background_images/bg-wallpaper_21.png";
import woodBackground from '../../../../assets/Math/woodRoundx.png'; 
import additionIcon from '../../../../assets/Math/additionx.png'; 
import subtractionIcon from '../../../../assets/Math/substractionx.png'; 
import divisionIcon from '../../../../assets/Math/divisionx.png'; 
import multiplicationIcon from '../../../../assets/Math/multiplicationx.png'; 
import fractionsIcon from '../../../../assets/Math/fractionx.png'; 

const MathFunnyGameMenu = () => {
    const navigate = useNavigate();
  
    // Function to handle navigation to instruction pages
    const handleNavigation = (path) => {
      navigate(path);
    };
  
    return (
      <div className="math-funny-game-menu" style={{ backgroundImage: `url(${backgroundImage})` }}>
        {/* Inline CSS for styling */}
        <style>{`
          .math-funny-game-menu {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-size: cover;
            background-position: center;
            padding: 20px;
            box-sizing: border-box;
            font-family: 'Comic Sans MS', cursive, sans-serif;
            position: relative;
          }
  
          /* Dark overlay to darken the background slightly */
          .math-funny-game-menu::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5); /* Dark overlay */
            z-index: 0;
          }
  
          /* Ensure content is above overlay */
          .math-funny-game-menu > * {
            position: relative;
            z-index: 1;
          }
  
          .menu-title {
            font-size: 3.5rem;
            color: #FFD700; /* Bright gold */
            text-shadow: 3px 3px 6px #000; /* Stronger shadow for highlight */
            margin-bottom: 40px;
            animation: bounce 2s infinite; /* Bouncing title */
          }
  
          .menu-container {
            display: flex;
            flex-direction: column;
            gap: 40px; /* Space between rows */
            max-width: 80%;
          }
  
          .menu-row-1 {
            display: grid;
            grid-template-columns: repeat(3, 1fr); /* 3 items in first row */
            gap: 20px;
          }
  
          .menu-row-2 {
            display: flex;
            justify-content: center;
            gap: 60px; /* Wider spacing for 2 items in second row */
            max-width: 50%; /* Restrict width for better centering */
            margin: 0 auto; /* Center the row */
          }
  
          .menu-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
  
          .menu-item:hover {
            transform: scale(1.1); /* Enlarge on hover */
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.5); /* White glow for highlight */
            animation: wiggle 0.5s infinite; /* Wiggle on hover */
          }
  
          .symbol-container {
            background-image: url(${woodBackground}); /* Wooden background */
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            width: 120px; /* Adjust size as needed */
            height: 120px; /* Adjust size as needed */
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%; /* Circular shape */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Shadow for depth */
          }
  
          .symbol-container img {
            width: 80px; /* Symbol size inside wood */
            height: 80px;
          }
  
          .menu-item p {
            font-size: 1.4rem;
            color: #fff; /* White text for contrast */
            font-weight: bold;
            text-shadow: 1px 1px 3px #000; /* Shadow for readability */
            margin-top: 10px; /* Space between image and text */
          }
  
          /* Animation keyframes */
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-20px); }
            60% { transform: translateY(-10px); }
          }
  
          @keyframes wiggle {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(5deg); }
            75% { transform: rotate(-5deg); }
            100% { transform: rotate(0deg); }
          }
  
          /* Responsive design */
          @media (max-width: 768px) {
            .menu-row-1 {
              grid-template-columns: repeat(2, 1fr); /* 2 columns for tablets */
            }
            .menu-row-2 {
              gap: 40px; /* Adjust spacing for tablets */
            }
          }
  
          @media (max-width: 480px) {
            .menu-row-1 {
              grid-template-columns: 1fr; /* 1 column for mobile */
            }
            .menu-row-2 {
              flex-direction: column; /* Stack items vertically */
              gap: 20px;
            }
            .menu-title {
              font-size: 2rem; /* Smaller title on mobile */
            }
            .symbol-container {
              width: 100px; /* Smaller size on mobile */
              height: 100px;
            }
            .symbol-container img {
              width: 60px;
              height: 60px;
            }
          }
        `}</style>
  
        {/* Menu Title */}
        <h1 className="menu-title">එන්න අපි විනෝද වෙමු !</h1>
  
        {/* Menu Container with Two Rows */}
        <div className="menu-container">
          {/* First Row: 3 Items */}
          <div className="menu-row-1">
            <div
              className="menu-item"
              onClick={() => handleNavigation('/math-instruction1')}
            >
              <div className="symbol-container">
                <img src={additionIcon} alt="Addition" />
              </div>
              <p>එකතු කිරීමේ සෙල්ලම</p>
            </div>
            <div
              className="menu-item"
              onClick={() => handleNavigation('/math-instruction2')}
            >
              <div className="symbol-container">
                <img src={subtractionIcon} alt="Subtraction" />
              </div>
              <p>අඩු කරමේ සෙල්ලම</p>
            </div>
            <div
              className="menu-item"
              onClick={() => handleNavigation('/math-instruction3')}
            >
              <div className="symbol-container">
                <img src={divisionIcon} alt="Division" />
              </div>
              <p>බෙදීමේ සෙල්ලම</p>
            </div>
          </div>
  
          {/* Second Row: 2 Items */}
          <div className="menu-row-2">
            <div
              className="menu-item"
              onClick={() => handleNavigation('/math-instruction4')}
            >
              <div className="symbol-container">
                <img src={multiplicationIcon} alt="Multiplication" />
              </div>
              <p>ගුණ කිරිමේ සෙල්ලම</p>
            </div>
            <div
              className="menu-item"
              onClick={() => handleNavigation('/math-instruction5')}
            >
              <div className="symbol-container">
                <img src={fractionsIcon} alt="Fractions" />
              </div>
              <p>භාග සෙල්ලම</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default MathFunnyGameMenu;
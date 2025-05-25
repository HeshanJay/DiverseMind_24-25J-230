import React from "react";
import { useNavigate } from "react-router-dom";
import "./home_page.css";
import backImg13 from "../../assets/background_images/background_13.png";
import teacherIcon from "../../assets/forest-theme/teacher-icon.png";
import studentIcon from "../../assets/forest-theme/student-icon.png";

const HomePage = () => {
  const navigate = useNavigate();

  const handleTeacherClick = () => {
    navigate("/login");
  };

  const handleStudentClick = () => {
    navigate("/student-entrance");
  };

  return (
    <div
      className="home-page-container"
      style={{
        backgroundImage: `url(${backImg13})`,
      }}
    >
      <div className="overlay">
        <div className="home-content">
          <h1 className="welcome-title">
            DiverseMind වෙත සාදරයෙන් පිළිගනිමු !
          </h1>
          <p className="welcome-subtitle">
            ඔබේ මාර්ගය තෝරාගෙන ත්‍රාසජනක ගමනක් ආරම්භ කරන්න!
          </p>

          <div className="options-container">
            <div className="option-card" onClick={handleTeacherClick}>
              <img src={teacherIcon} alt="Teacher" className="option-icon" />
              <h2>ගුරු ගිණුම</h2>
            </div>

            <div className="option-card" onClick={handleStudentClick}>
              <img src={studentIcon} alt="Student" className="option-icon" />
              <h2>ළමා ගිණුම</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="animation-container">
        <div className="leaf leaf1"></div>
        <div className="leaf leaf2"></div>
        <div className="leaf leaf3"></div>
        <div className="leaf leaf4"></div>
      </div>
    </div>
  );
};

export default HomePage;

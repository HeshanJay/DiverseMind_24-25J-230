import React from "react";
import Game3Level1Activity1 from "../../../Components/WritingComponents/WritingGame3Components/Level1/Activity1";
import backgroundImage from "../../../assets/writing_interventions/background/back14.jpeg";
import icon1 from "../../../assets/writing_interventions/icons/p1.png";
import icon2 from "../../../assets/writing_interventions/icons/p2.png";
import icon3 from "../../../assets/writing_interventions/icons/p3.png";
import icon4 from "../../../assets/writing_interventions/icons/p4.png";
import icon5 from "../../../assets/writing_interventions/icons/p5.png";
import icon6 from "../../../assets/writing_interventions/icons/p6.png";

const WritingGame3Level1 = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        height: "100%",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        margin: 0,
        padding: 0,
        overflow: "auto",
      }}
    >
      {/* Left Side Icons */}
      <div
        style={{
          position: "fixed",
          left: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          zIndex: 1000,
        }}
      >
        {[icon1, icon2, icon3].map((icon, index) => (
          <img
            key={`left-${index}`}
            src={icon}
            alt={`Icon ${index + 1}`}
            style={{
              width: "100px",
              height: "100px",
              cursor: "pointer",
              animation: `float 3s ease-in-out infinite ${index * 0.3}s`,
            }}
            className="icon-hover-effect"
          />
        ))}
      </div>

      {/* Right Side Icons */}
      <div
        style={{
          position: "fixed",
          right: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          zIndex: 1000,
        }}
      >
        {[icon4, icon5, icon6].map((icon, index) => (
          <img
            key={`right-${index}`}
            src={icon}
            alt={`Icon ${index + 4}`}
            style={{
              width: "100px",
              height: "100px",
              cursor: "pointer",
              animation: `float 3s ease-in-out infinite ${index * 0.3}s`,
            }}
            className="icon-hover-effect"
          />
        ))}
      </div>

      <Game3Level1Activity1 />

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }

          .icon-hover-effect:hover {
            transform: scale(1.1);
            filter: drop-shadow(0 0 10px rgba(255, 223, 0, 0.8));
            transition: all 0.3s ease-in-out;
          }

          .icon-hover-effect {
            transition: all 0.3s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default WritingGame3Level1;

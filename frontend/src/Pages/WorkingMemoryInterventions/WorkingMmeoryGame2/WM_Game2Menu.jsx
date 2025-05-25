import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import jungle_menu from "../../../assets/WM_Interventions_images/menu_images/jungle_menu.png";
import jungle_icon1 from "../../../assets/WM_Interventions_images/menu_images/jungle_icon1.png";
import jungle_icon2 from "../../../assets/WM_Interventions_images/menu_images/jungle_icon2.png";
import jungle_icon3 from "../../../assets/WM_Interventions_images/menu_images/jungle_icon3.png";
import monkey1 from "../../../assets/WM_Interventions_images/menu_images/monkey1.png";
import monkey5 from "../../../assets/WM_Interventions_images/menu_images/monkey5.png";
import monkey3 from "../../../assets/WM_Interventions_images/menu_images/monkey3.png";
import clickSound from "../../../assets/Audios/click_sound.mp3";

function WM_Game2Menu() {
  const navigate = useNavigate();
  const clickAudio = useRef(new Audio(clickSound));

  const handleClick = (path) => {
    clickAudio.current.currentTime = 0;
    clickAudio.current.play().catch(() => {});
    navigate(path);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${jungle_menu})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      {/* Level 3 */}
      <img
        src={jungle_icon3}
        alt="Jungle Icon 3"
        onClick={() => handleClick("/working-memory-game2/Level3/*")}
        style={{
          position: "absolute",
          top: "190px",
          right: "270px",
          width: "180px",
          height: "auto",
          cursor: "pointer",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />

      {/* Level 2 */}
      <img
        src={jungle_icon2}
        alt="Jungle Icon 2"
        onClick={() => handleClick("/working-memory-game2/Level2/*")}
        style={{
          position: "absolute",
          top: "160px",
          left: "550px",
          width: "180px",
          height: "auto",
          cursor: "pointer",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />

      {/* Level 1 */}
      <img
        src={jungle_icon1}
        alt="Jungle Icon 1"
        onClick={() => handleClick("/working-memory-game2/Level1/*")}
        style={{
          position: "absolute",
          top: "190px",
          left: "290px",
          width: "190px",
          height: "auto",
          cursor: "pointer",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />

      {/* Decorative monkeys */}
      <img
        src={monkey5}
        alt="Monkey"
        style={{
          position: "absolute",
          bottom: "120px",
          left: "20%",
          transform: "translateX(-50%)",
          width: "240px",
          height: "auto",
        }}
      />
      <img
        src={monkey3}
        alt="Monkey"
        style={{
          position: "absolute",
          bottom: "130px",
          left: "82%",
          transform: "translateX(-50%)",
          width: "205px",
          height: "auto",
        }}
      />
      <img
        src={monkey1}
        alt="Monkey"
        style={{
          position: "absolute",
          bottom: "60px",
          left: "49%",
          transform: "translateX(-50%)",
          width: "280px",
          height: "auto",
          animation: "bounce 2s ease-in-out infinite",
        }}
      />

      {/* Bounce keyframes */}
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateX(-50%) translateY(0); }
            50% { transform: translateX(-50%) translateY(-20px); }
          }
        `}
      </style>
    </div>
  );
}

export default WM_Game2Menu;

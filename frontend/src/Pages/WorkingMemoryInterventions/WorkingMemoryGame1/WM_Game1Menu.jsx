import React from "react";
import { useNavigate } from "react-router-dom";
import sea_menu_back1 from "../../../assets/WM_Interventions_images/menu_images/sea_menu_back1.png";
import sea1_icon from "../../../assets/WM_Interventions_images/menu_images/sea1_icon.png";
import sea2_icon from "../../../assets/WM_Interventions_images/menu_images/sea2_icon.png";
import sea3_icon from "../../../assets/WM_Interventions_images/menu_images/sea3_icon.png";
import star1 from "../../../assets/WM_Interventions_images/menu_images/star1.png";

function WM_Game1Menu() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url(${sea_menu_back1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        height: "100vh",
        position: "relative",
      }}
    >
      <img
        src={sea3_icon}
        alt="Sea Icon 3"
        onClick={() => navigate("/working-memory-game1/Level3/*")}
        style={{
          position: "absolute",
          top: "180px",
          right: "130px",
          width: "200px",
          height: "auto",
          cursor: "pointer",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
      <img
        src={sea2_icon}
        alt="Sea Icon 2"
        onClick={() => navigate("/working-memory-game1/Level2/*")}
        style={{
          position: "absolute",
          top: "140px",
          left: "580px",
          width: "190px",
          height: "auto",
          cursor: "pointer",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
      <img
        src={sea1_icon}
        alt="Sea Icon 1"
        onClick={() => navigate("/working-memory-game1/Level1/*")}
        style={{
          position: "absolute",
          top: "180px",
          left: "200px",
          width: "200px",
          height: "auto",
          cursor: "pointer",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />

      <img
        src={star1}
        alt="Starfish"
        style={{
          position: "absolute",
          bottom: "150px",
          left: "52%",
          transform: "translateX(-50%)",
          width: "130px",
          height: "auto",
          animation: "float 3s ease-in-out infinite",
        }}
      />
    </div>
  );
}

export default WM_Game1Menu;

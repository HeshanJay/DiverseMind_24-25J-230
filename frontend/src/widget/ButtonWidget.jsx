import React from "react";
import PropTypes from "prop-types";
import buttonImage from "../assets/other/button_yellow.png"; // Import the button background image

const ButtonWidget = ({
  text = "Button",
  fontSize = "16px",
  fontWeight = "bold",
  fontColor = "#FFF",
  width = "200px",
  height = "60px",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundImage: `url(${buttonImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        outline: "none",
        backgroundColor: "transparent", 
      }}
    >
      <span
        style={{
          fontFamily: "'Comic Sans MS', sans-serif",
          fontSize,
          fontWeight,
          color: fontColor,
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        {text}
      </span>
    </button>
  );
};

// Prop validation for the component
ButtonWidget.propTypes = {
  text: PropTypes.string, 
  fontSize: PropTypes.string,
  fontWeight: PropTypes.string, 
  fontColor: PropTypes.string, 
  width: PropTypes.string, 
  height: PropTypes.string, 
  onClick: PropTypes.func, 
};

export default ButtonWidget;

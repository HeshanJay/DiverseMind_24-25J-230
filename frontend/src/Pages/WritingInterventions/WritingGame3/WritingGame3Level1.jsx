import React from "react";
import Game3Level1Activity1 from "../../../Components/WritingComponents/WritingGame3Components/Level1/Activity1";
import backgroundImage from "../../../assets/background_images/game3_back8.webp";

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
      <Game3Level1Activity1 />
    </div>
  );
};

export default WritingGame3Level1;

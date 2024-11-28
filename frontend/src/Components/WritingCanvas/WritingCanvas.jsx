import React, { useRef, useEffect } from "react";
import backgroundImg from "../../assets/background_images/back_img1.jpg";
import "./WritingCanvas.css";
import monkeyImage from "../../assets/characters/Monkey.png";

const letterFormation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set initial canvas style
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Horizontal guide lines
    context.strokeStyle = "#ddd";
    for (let i = 50; i < canvas.height; i += 50) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(canvas.width, i);
      context.stroke();
    }
  }, []);

  const handleMouseDraw = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.fillStyle = "black";
    context.beginPath();
    context.arc(x, y, 2, 0, 2 * Math.PI);
    context.fill();
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="border-4 border-blue-500 bg-white rounded-lg shadow-lg"
        onMouseMove={(e) => {
          if (e.buttons === 1) handleMouseDraw(e);
        }}
      ></canvas>
    </div>
  );
};

export default letterFormation;

/* <div className="background">
<h1 className="text-xl font-bold text-red-500">අකුරු හුරුව</h1>
<img src={monkeyImage} alt="Monkey" className="monkey-img" />
</div> */

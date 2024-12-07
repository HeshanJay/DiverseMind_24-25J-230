import React, { useRef, useEffect, useState } from "react";
import "./WritingCanvas_AarohanaAkshara2.css";
import backgroundImg from "../../assets/background_images/back_img1.jpg";
import monkeyImage from "../../assets/characters/Monkey.png";
import pencilImage from "../../assets/design_images/pencil.png";
import eraserImage from "../../assets/design_images/eraser.png";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const WritingCanvas_AarohanaAkshara2 = ({ onNext, onBack }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set initial canvas style
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw 3 horizontal guide lines
    context.strokeStyle = "#4A90E2"; // Darker, more visible blue color
    context.lineWidth = 2; // Thicker line for better visibility
    const lineSpacing = canvas.height / 4; // Dividing into 4 equal parts
    for (let i = 1; i <= 3; i++) {
      const y = lineSpacing * i;
      context.beginPath();
      context.moveTo(20, y); // Add padding for aesthetics
      context.lineTo(canvas.width - 20, y);
      context.stroke();
    }

    // Draw a decorative border around the canvas
    context.strokeStyle = "#4A90E2"; // Blue frame
    context.lineWidth = 8;
    context.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    const handleTouchMove = (e) => {
      e.preventDefault(); // Prevent default touch action
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      draw(touch.clientX - rect.left, touch.clientY - rect.top);
    };

    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      canvas.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const startDrawing = (x, y) => {
    setIsDrawing(true);
    setLastPosition({ x, y });
  };

  const draw = (x, y) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.strokeStyle = "black";
    context.lineWidth = 3;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(lastPosition.x, lastPosition.y);
    context.lineTo(x, y);
    context.stroke();

    setLastPosition({ x, y });
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    startDrawing(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseMove = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    draw(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleTouchStart = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    startDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  const handleTouchMove = (e) => {
    e.preventDefault(); // Prevent scrolling while drawing
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    draw(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  const endDrawing = () => {
    setIsDrawing(false);
    setLastPosition({ x: 0, y: 0 });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Title and Box */}
      <div className="absolute top-14 w-full flex justify-center">
        <div className="bg-gradient-to-r from-blue-300/80 to-green-300/80 p-8 rounded-3xl shadow-lg w-[620px] h-[510px] relative border-4 border-green-600">
          {/* Title Positioned on Top */}
          <div className="absolute top-6 w-full flex justify-center">
            <div className="text-6xl font-extrabold text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500">
                ආරෝහණ අක්ෂර
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Speech Bubble */}
      <div
        className="speech-bubble"
        style={{ zIndex: 20 }} // Ensure speech bubble stays above everything
      >
        ආයුබෝවන්! "ර" අකුර නිවැරදිව ලියමු.
      </div>

      {/* Monkey Image with animation */}
      <img
        src={monkeyImage}
        alt="Monkey"
        className="monkey-img"
        style={{ zIndex: 20 }}
      />

      {/* Canvas Container */}
      <div className="mt-20 relative" style={{ zIndex: 10 }}>
        {/* Button on Top of Canvas */}
        <button
          className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-400 via-green-400 to-teal-400 text-white text-xl font-extrabold py-2 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          style={{ zIndex: 20 }}
        >
          <span className="bg-white text-blue-500 font-bold text-2xl py-1 px-3 rounded-md shadow-md">
            "ර"
          </span>
          අකුර ලියන්න
        </button>

        {/* Pencil and Eraser */}
        {/* Pencil */}
        <div className="absolute left-1 top-[10%] transform -translate-y-1/2 flex items-center">
          <img
            src={pencilImage}
            alt="Pencil"
            className="w-20 h-45 hover:scale-110 transition-transform duration-200"
            style={{ cursor: "pointer" }}
          />
        </div>

        {/* Eraser */}
        <div className="absolute left-1 top-[90%] transform -translate-y-1/2 flex items-center">
          <img
            src={eraserImage}
            alt="Eraser"
            className="w-16 h-16 hover:scale-110 transition-transform duration-200"
            style={{ cursor: "pointer" }}
          />
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          width={580}
          height={300}
          className="border-4 border-blue-500 bg-white rounded-lg shadow-lg touch-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={endDrawing}
          style={{ zIndex: 10 }}
        ></canvas>
      </div>

      {/* Previous Button */}
      <button
        onClick={onBack}
        className="absolute bottom-10 left-28 w-16 h-16 rounded-full shadow-lg flex justify-center items-center bg-gradient-to-r from-pink-400 to-purple-500 hover:scale-110 transition-transform duration-300"
      >
        <MdArrowBack size={40} color="white" />
      </button>

      {/* Other Buttons */}
      <div className="absolute bottom-8" style={{ left: "450px", zIndex: 20 }}>
        <button className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-pink-500 text-white font-bold text-xl py-3 px-6 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110">
          🩹 මකන්න
        </button>
      </div>
      <div className="absolute bottom-8" style={{ left: "650px", zIndex: 20 }}>
        <button
          className="bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 hover:from-yellow-400 hover:to-purple-400 text-white text-xl font-extrabold py-3 px-8 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
          onClick={() => {
            const canvas = canvasRef.current;
            const image = canvas.toDataURL("image/png"); // Capture canvas as base64 image
            console.log("Captured Image Data URL:", image); // Log the image to the console
            onNext(); // Move to the next component
          }}
        >
          🌟 ඉදිරියට යමු 🚀
        </button>
      </div>
    </div>
  );
};

export default WritingCanvas_AarohanaAkshara2;

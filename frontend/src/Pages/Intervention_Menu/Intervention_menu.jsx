import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import inter_back from "../../assets/background_images/inter_back.png";
import door from "../../assets/background_images/door.png";
import t_menu from "../../assets/background_images/t_menu.png";
import beaver2 from "../../assets/background_images/beaver2.png";
import elephant1 from "../../assets/background_images/elephant1.png";
import mon from "../../assets/background_images/mon.png";
import inter_back3 from "../../assets/background_images/inter_back3.png";
import WD from "../../assets/background_images/WD.png";
import lion1 from "../../assets/background_images/lion1.png";
import home from "../../assets/background_images/home.png";
import snail1 from "../../assets/background_images/snail1.png";

// Enhanced Fireworks Animation Component
const FireworksAnimation = () => {
  const generateFirework = (index) => {
    const color = `hsl(${Math.random() * 360}, 100%, 75%)`;
    const style = {
      "--x": `${Math.random() * 100}%`,
      "--y": `${Math.random() * 100}%`,
      "--delay": `${Math.random() * 2}s`,
      "--duration": `${0.5 + Math.random() * 2}s`,
      "--size": `${5 + Math.random() * 10}px`,
      "--color": color,
      "--spread": `${50 + Math.random() * 100}px`,
    };

    return (
      <div key={index} className="firework" style={style}>
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              "--angle": `${i * 22.5}deg`,
              "--distance": `${30 + Math.random() * 70}px`,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[9998]">
      {[...Array(200)].map((_, index) => generateFirework(index))}
    </div>
  );
};

function Intervention_menu() {
  const navigate = useNavigate();
  const [intermediateScreen, setIntermediateScreen] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(inter_back);

  const handleDoorClick = (door) => {
    setBackgroundImage(inter_back3);

    switch (door) {
      case "writing":
        setIntermediateScreen({
          background: inter_back3,
          image: t_menu,
          text: "ලිවීමේ පුහුණුව සඳහා\nසුබ පැතුම්!",
          navigateTo: "/writing-game-menu",
          imageStyle: {
            width: "280px",
            height: "300px",
            position: "absolute",
            bottom: "240px",
            left: "245px",
          },
          gradient: "bg-gradient-to-r from-black to-black",
        });
        break;
      case "attention":
        setIntermediateScreen({
          background: inter_back3,
          image: beaver2,
          text: "අවධානය පුහුණුව සඳහා\nසුබ පැතුම්!",
          navigateTo: "/attentionInterventions",
          imageStyle: {
            width: "300px",
            height: "190px",
            position: "absolute",
            bottom: "330px",
            right: "150px",
          },
          gradient: "bg-gradient-to-r from-black to-black",
        });
        break;
      case "maths":
        setIntermediateScreen({
          background: inter_back3,
          image: elephant1,
          text: "ගණිත පුහුණුව සඳහා\nසුබ පැතුම්!",
          navigateTo: "/math-choice",
          imageStyle: {
            width: "240px",
            height: "260px",
            position: "absolute",
            bottom: "290px",
            left: "280px",
          },
          gradient: "bg-gradient-to-r from-black to-black",
        });
        break;
      case "memory":
        setIntermediateScreen({
          background: inter_back3,
          image: mon,
          text: "මතක පුහුණුව සඳහා\nසුබ පැතුම්!",
          navigateTo: "/WM_Menu",
          imageStyle: {
            width: "230px",
            height: "200px",
            position: "absolute",
            bottom: "310px",
            right: "190px",
          },
          gradient: "bg-gradient-to-r from-black to-black",
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (intermediateScreen) {
      const timer = setTimeout(() => {
        navigate(intermediateScreen.navigateTo);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [intermediateScreen, navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <style>
        {`
  .firework {
    position: absolute;
    top: var(--y);
    left: var(--x);
    animation: 
      explode var(--duration) ease-out infinite,
      pulse 0.8s ease-in-out infinite;
    animation-delay: var(--delay);
    z-index: 9999;
    width: var(--size);
    height: var(--size);
  }

  .particle {
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--color);
    border-radius: 50%;
    animation: 
      particleMove 1s ease-out forwards,
      fadeOut 1s ease-out forwards;
    box-shadow: 0 0 20px var(--color);
    transform-origin: center center;
  }

  @keyframes explode {
    0% { transform: scale(0); opacity: 1; }
    100% { transform: scale(1); opacity: 0; }
  }

  @keyframes particleMove {
    0% { transform: translate(0, 0) scale(1); }
    100% { 
      transform: 
        translate(
          calc(var(--distance) * cos(var(--angle))), 
          calc(var(--distance) * sin(var(--angle)))
        ) scale(1);
    }
  }

  @keyframes fadeOut {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); filter: brightness(1); }
    50% { transform: scale(1.5); filter: brightness(1.5); }
  }

  .firework::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300%;
    height: 300%;
    background: radial-gradient(circle, var(--color) 0%, transparent 80%);
    transform: translate(-50%, -50%);
    opacity: 0.4;
    z-index: -1;
  }
`}
      </style>
      {/* Navigation Buttons */}
      <div className="fixed bottom-10 left-10 z-50">
        <div
          className="bg-gradient-to-r from-purple-700/90 via-yellow-500/90 to-green-400/90 p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"
          onClick={() => navigate(-1)}
        >
          <span className="text-black text-3xl font-bold">←</span>
        </div>
      </div>

      <div className="fixed bottom-10 right-10 z-50">
        <div
          className="bg-gradient-to-r from-purple-700/90 via-yellow-500/90 to-green-400/90 p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"
          onClick={() => navigate("/")}
        >
          <img src={home} alt="Home" className="h-8 w-8" />
        </div>
      </div>

      {intermediateScreen ? (
        <div
          className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${intermediateScreen.background})`,
            opacity: 1,
          }}
        >
          <FireworksAnimation />

          {/* Add Snail Image Here */}
          <div className="absolute bottom-[10px] left-[420px] transform -translate-x-1/2 z-30">
            <img
              src={snail1}
              alt="Snail"
              className="w-[150px] h-[150px] animate-bounce-slow"
            />
          </div>
          <div className="text-center w-full h-full">
            <img
              src={intermediateScreen.image}
              alt="Activity"
              style={{
                width: intermediateScreen.imageStyle.width,
                height: intermediateScreen.imageStyle.height,
                position: intermediateScreen.imageStyle.position,
                bottom: intermediateScreen.imageStyle.bottom,
                left: intermediateScreen.imageStyle.left,
                right: intermediateScreen.imageStyle.right,
              }}
            />
            {/* Text Container with Thick Border */}
            <div
              className="relative mx-auto bg-gradient-to-r from-green-900 to-blue-900 p-6 rounded-lg shadow-lg "
              style={{
                backgroundImage: `url(${WD})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "700px",
                height: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bottom: "-105px",
                left: "50px",
              }}
            >
              <p
                className={`font-bold bg-clip-text text-transparent ${intermediateScreen.gradient} mt-[-55px]`}
                style={{ fontSize: "42px", whiteSpace: "pre-line" }}
              >
                {intermediateScreen.text}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full h-full relative">
          {/* Title Container */}
          <div className="absolute top-[-155px] bg-gradient-to-r from-green-600/90 via-yellow-500/100 to-green-600/90 p-4 rounded-2xl shadow-lg z-10 border-4 border-white">
            <h1 className="text-white text-4xl font-bold">කාණ්ඩ මගහුරුව</h1>
          </div>

          {/* Door Container with Hover Effects */}
          <div className="flex-1 flex items-center justify-center mt-[-50px]">
            <div className="flex space-x-8">
              <div
                className="relative cursor-pointer w-70 h-70 hover:scale-110 transition-transform duration-300"
                onClick={() => handleDoorClick("writing")}
              >
                <img src={door} alt="Door" className="w-full h-full" />
                <span className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold text-center">
                  ලිවීම
                  <br />
                  සඳහා
                  <br />
                  මගහුරුව
                </span>
              </div>

              <div
                className="relative cursor-pointer w-70 h-70 hover:scale-110 transition-transform duration-300"
                onClick={() => handleDoorClick("attention")}
              >
                <img src={door} alt="Door" className="w-full h-full" />
                <span className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold text-center">
                  අවධානය
                  <br />
                  සඳහා
                  <br />
                  මගහුරුව
                </span>
              </div>

              <div
                className="relative cursor-pointer w-70 h-70 hover:scale-110 transition-transform duration-300"
                onClick={() => handleDoorClick("maths")}
              >
                <img src={door} alt="Door" className="w-full h-full" />
                <span className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold text-center">
                  ගණිතය
                  <br />
                  සඳහා
                  <br />
                  මගහුරුව
                </span>
              </div>

              <div
                className="relative cursor-pointer w-70 h-70 hover:scale-110 transition-transform duration-300"
                onClick={() => handleDoorClick("memory")}
              >
                <img src={door} alt="Door" className="w-full h-full" />
                <span className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold text-center">
                  මතකය
                  <br />
                  සඳහා
                  <br />
                  මගහුරුව
                </span>
              </div>
            </div>
          </div>

          {/* Lion Image */}
          <div className="absolute bottom-[-200px] left-1/2 transform -translate-x-1/2">
            <img
              src={lion1}
              alt="Lion"
              className="w-70 h-60 object-cover rounded-full shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Intervention_menu;

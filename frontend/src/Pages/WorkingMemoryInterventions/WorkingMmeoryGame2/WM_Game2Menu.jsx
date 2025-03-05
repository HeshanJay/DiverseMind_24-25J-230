import React from 'react';
import { useNavigate } from 'react-router-dom';
import jungle_menu from "../../../assets/WM_Interventions_images/menu_images/jungle_menu.png";
import jungle_icon1 from "../../../assets/WM_Interventions_images/menu_images/jungle_icon1.png";
import jungle_icon2 from "../../../assets/WM_Interventions_images/menu_images/jungle_icon2.png";
import jungle_icon3 from "../../../assets/WM_Interventions_images/menu_images/jungle_icon3.png";
import monkey1 from "../../../assets/WM_Interventions_images/menu_images/monkey1.png";
import monkey5 from "../../../assets/WM_Interventions_images/menu_images/monkey5.png";
import monkey3 from "../../../assets/WM_Interventions_images/menu_images/monkey3.png";

function WM_Game2Menu() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url(${jungle_menu})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        position: 'relative'
      }}
    >
      {/* jungle_icon3 at the top-right corner */}
      <img
        src={jungle_icon3}
        alt="Jungle Icon 3"
        onClick={() => navigate('/working-memory-game2/Level3/*')}
        style={{
          position: 'absolute',
          top: '230px',
          right: '240px',
          width: '180px',
          height: 'auto',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      />

      {/* jungle_icon2 at the top-center */}
      <img
        src={jungle_icon2}
        alt="Jungle Icon 2"
        onClick={() => navigate('/working-memory-game2/Level2/*')}
        style={{
          position: 'absolute',
          top: '190px',
          left: '505px',
          width: '180px',
          height: 'auto',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      />

      {/* jungle_icon1 at the top-left corner */}
      <img
        src={jungle_icon1}
        alt="Jungle Icon 1"
        onClick={() => navigate('/working-memory-game2/Level1/*')}
        style={{
          position: 'absolute',
          top: '230px',
          left: '260px',
          width: '190px',
          height: 'auto',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      />
     
     {/* monkey image at the bottom center with bouncing animation */}
<img
src={monkey5}
alt="Monkey"
style={{
  position: 'absolute',
  bottom: '161px', // Adjust bottom position as needed
  left: '20%', // Center horizontally
  transform: 'translateX(-50%)', // Center horizontally
  width: '240px', // Adjust size as needed
  height: 'auto',

}}
      />
      {/* monkey image at the bottom center with bouncing animation */}
<img
src={monkey3}
alt="Monkey"
style={{
  position: 'absolute',
  bottom: '170px', // Adjust bottom position as needed
  left: '82%', // Center horizontally
  transform: 'translateX(-50%)', // Center horizontally
  width: '205px', // Adjust size as needed
  height: 'auto',
}}
      />
{/* monkey image at the bottom center with bouncing animation */}
<img
src={monkey1}
alt="Monkey"
style={{
  position: 'absolute',
  bottom: '115px', // Adjust bottom position as needed
  left: '49%', // Center horizontally
  transform: 'translateX(-50%)', // Center horizontally
  width: '280px', // Adjust size as needed
  height: 'auto',
  animation: 'bounce 2s ease-in-out infinite', // Add bouncing animation
}}
      />

      {/* Define the bounce animation */}
      <style>
        {`
          @keyframes bounce {
            0%, 100% {
              transform: translateX(-50%) translateY(0);
            }
            50% {
              transform: translateX(-50%) translateY(-20px);
            }
          }
        `}
      </style>
    </div>
  );
}

export default WM_Game2Menu;







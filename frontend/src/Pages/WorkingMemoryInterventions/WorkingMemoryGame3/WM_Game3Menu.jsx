import React from 'react';
import { useNavigate } from 'react-router-dom';
import snow_menu1 from "../../../assets/WM_Interventions_images/menu_images/snow_menu1.jpg"; 
import snowNb_icon1 from "../../../assets/WM_Interventions_images/menu_images/snowNb_icon1.png";
import snowNb_icon2 from "../../../assets/WM_Interventions_images/menu_images/snowNb_icon2.png";
import snowNb_icon3 from "../../../assets/WM_Interventions_images/menu_images/snowNb_icon3.png";
import penguin_menu from "../../../assets/WM_Interventions_images/menu_images/penguin_menu.png";
import penguin_3 from "../../../assets/WM_Interventions_images/menu_images/penguin_3.png";

function WM_Game1Menu() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url(${snow_menu1})`, // Use sea_menu_back1 here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        position: 'relative'
      }}
    >
      {/* sea_icon3 at the top-right corner */}
      <img
        src={snowNb_icon3}
        alt="Sea Icon 3"
        onClick={() => navigate('/working-memory-game3/Level3/*')} // Navigate to Level 3
        style={{
          position: 'absolute',
          top: '120px', // Adjust top position as needed
          right: '330px', // Adjust right position as needed
          width: '190px', // Adjust size as needed
          height: 'auto',
          cursor: 'pointer',
          transition: 'transform 0.2s ease', // Add transition for smooth animation
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')} // Scale up on hover
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} // Scale back to normal
      />

      {/* sea2_icon at the top-center */}
      <img
        src={snowNb_icon2}
        alt="Sea Icon 2"
        onClick={() => navigate('/working-memory-game3/Level2/*')} // Navigate to Level 2
        style={{
          position: 'absolute',
          top: '250px', // Adjust top position as needed
          left: '400px', // Adjust left position as needed
          width: '190px', // Adjust size as needed
          height: 'auto',
          cursor: 'pointer',
          transition: 'transform 0.2s ease', // Add transition for smooth animation
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')} // Scale up on hover
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} // Scale back to normal
      />

      {/* sea1_icon at the top-left corner */}
      <img
        src={snowNb_icon1}
        alt="Sea Icon 1"
        onClick={() => navigate('/working-memory-game3/Level1/*')} // Navigate to Level 1
        style={{
          position: 'absolute',
          top: '400px', // Adjust top position as needed
          left: '650px', // Adjust left position as needed
          width: '190px', // Adjust size as needed
          height: 'auto',
          cursor: 'pointer',
          transition: 'transform 0.2s ease', // Add transition for smooth animation
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')} // Scale up on hover
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} // Scale back to normal
      />
       {/* star1 image at the bottom with animation */}
       <img
        src={penguin_menu}
        alt="penguin"
        style={{
          position: 'absolute',
          bottom: '340px', // Adjust bottom position as needed
          left: '70%', // Center horizontally
          width: '200px', // Adjust size as needed
          height: 'auto',
        }}
      />
      {/* star1 image at the bottom with animation */}
      <img
        src={penguin_3}
        alt="penguin_3"
        style={{
          position: 'absolute',
          bottom: '5px', // Adjust bottom position as needed
          left: '25%', // Center horizontally
          width: '150px', // Adjust size as needed
          height: 'auto',
          animation: 'bounce 2s ease-in-out infinite', 
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

export default WM_Game1Menu;

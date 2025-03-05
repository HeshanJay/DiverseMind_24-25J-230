import React from 'react';
import { useNavigate } from 'react-router-dom';
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
        backgroundImage: `url(${sea_menu_back1})`, // Use sea_menu_back1 here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        position: 'relative'
      }}
    >
      {/* sea_icon3 at the top-right corner */}
      <img
        src={sea3_icon}
        alt="Sea Icon 3"
        onClick={() => navigate('/working-memory-game1/Level3/*')} // Navigate to Level 3
        style={{
          position: 'absolute',
          top: '220px', // Adjust top position as needed
          right: '130px', // Adjust right position as needed
          width: '200px', // Adjust size as needed
          height: 'auto',
          cursor: 'pointer',
          transition: 'transform 0.2s ease', // Add transition for smooth animation
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')} // Scale up on hover
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} // Scale back to normal
      />

      {/* sea2_icon at the top-center */}
      <img
        src={sea2_icon}
        alt="Sea Icon 2"
        onClick={() => navigate('/working-memory-game1/Level2/*')} // Navigate to Level 2
        style={{
          position: 'absolute',
          top: '180px', // Adjust top position as needed
          left: '530px', // Adjust left position as needed
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
        src={sea1_icon}
        alt="Sea Icon 1"
        onClick={() => navigate('/working-memory-game1/Level1/*')} // Navigate to Level 1
        style={{
          position: 'absolute',
          top: '220px', // Adjust top position as needed
          left: '200px', // Adjust left position as needed
          width: '200px', // Adjust size as needed
          height: 'auto',
          cursor: 'pointer',
          transition: 'transform 0.2s ease', // Add transition for smooth animation
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')} // Scale up on hover
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} // Scale back to normal
      />

      {/* star1 image at the bottom with animation */}
      <img
        src={star1}
        alt="Starfish"
        style={{
          position: 'absolute',
          bottom: '150px', // Adjust bottom position as needed
          left: '52%', // Center horizontally
          transform: 'translateX(-50%)', // Center horizontally
          width: '130px', // Adjust size as needed
          height: 'auto',
          animation: 'float 3s ease-in-out infinite', // Add floating animation
        }}
      />
    </div>
  );
}

export default WM_Game1Menu;
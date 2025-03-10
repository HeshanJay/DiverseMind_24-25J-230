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
        backgroundImage: `url(${snow_menu1})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        position: 'relative'
      }}
    >
     
      <img
        src={snowNb_icon3}
        alt="Sea Icon 3"
        onClick={() => navigate('/working-memory-game3/Level3/*')} 
        style={{
          position: 'absolute',
          top: '120px', 
          right: '330px', 
          width: '190px', 
          height: 'auto',
          cursor: 'pointer',
          transition: 'transform 0.2s ease', 
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')} 
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} 
      />

      <img
        src={snowNb_icon2}
        alt="Sea Icon 2"
        onClick={() => navigate('/working-memory-game3/Level2/*')}
        style={{
          position: 'absolute',
          top: '250px', 
          left: '400px', 
          width: '190px', 
          height: 'auto',
          cursor: 'pointer',
          transition: 'transform 0.2s ease', 
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')} 
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} 
      />

      <img
        src={snowNb_icon1}
        alt="Sea Icon 1"
        onClick={() => navigate('/working-memory-game3/Level1/*')} 
        style={{
          position: 'absolute',
          top: '400px', 
          left: '650px', 
          width: '190px', 
          height: 'auto',
          cursor: 'pointer',
          transition: 'transform 0.2s ease', 
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')} 
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')} 
      />
      
       <img
        src={penguin_menu}
        alt="penguin"
        style={{
          position: 'absolute',
          bottom: '340px', 
          left: '70%', 
          width: '200px', 
          height: 'auto',
        }}
      />
    
      <img
        src={penguin_3}
        alt="penguin_3"
        style={{
          position: 'absolute',
          bottom: '5px', 
          left: '25%',
          width: '150px',
          height: 'auto',
          animation: 'bounce 2s ease-in-out infinite', 
        }}
      />
    
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

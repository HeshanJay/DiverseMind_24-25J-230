import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import screen_In_back from '../../assets/background_images/screen_In_back.png';
import tortoise from '../../assets/background_images/tortoise.png';
import tortoise2 from '../../assets/background_images/tortoise2.png';
import screeningImage from '../../assets/background_images/screening.png';
import interventionImage from '../../assets/background_images/intervention1.png';
import RB2 from '../../assets/background_images/RB2.png';
import SQ_greeting from '../../assets/background_images/SQ_greeting.png';
import home from '../../assets/background_images/home.png';

function ScreeningandInterventions() {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate(); 

  const handleSelection = (option) => {
    setSelectedOption(option);
    setTimeout(() => {
      if (option === 'screening') {
        navigate('/screening-menu'); 
      } else if (option === 'intervention') {
        navigate('/interventions-menu'); 
      }
    }, 2000);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center relative flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${screen_In_back})` }}
    >
      {/* Home Button - Left Side */}
      <div className="fixed bottom-10 left-10 z-50">
        <div 
          className="bg-gradient-to-r from-purple-700/90 via-yellow-500/90 to-green-400/90 p-3 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"
          onClick={() => navigate('/')}
        >
          <img 
            src={home} 
            alt="Home" 
            className="h-8 w-8"
          />
        </div>
      </div>

      {/* Floating Bubbles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              fontSize: `${Math.random() * 10 + 10}px`,
            }}
          />
        ))}
      </div>

      {/* Page Title - Activity */}
      <div className="absolute top-6 left-[620px] transform -translate-x-1/2 z-50">
        <div className="bg-gradient-to-r from-purple-500 to-blue-700 text-white text-3xl font-bold text-center p-4 rounded-2xl border-4 border-white shadow-lg w-[300px] h-[75px]">
          කාණ්ඩය තෝරන්න
        </div>
      </div>

      {/* Right Side - Screening Container */}
      <div className="absolute right-[32px]">  
        <div className="relative">
          {selectedOption === 'screening' ? (
            <div 
              className="absolute z-50"
              style={{ 
                transform: 'translateY(100px) translateX(-50px)',
                width: '220px',
                minHeight: '260px'
              }}
            >
              <img 
                src={SQ_greeting} 
                alt="Greeting" 
                className="w-[650px] h-[250px] transform translate-x-[-340px] translate-y-[-180px]"
              />
              <div className="absolute top-[4px] left-[-239px] transform -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-2xl font-bold text-black mb-[-1px]">
                  සුභ පැතුම්.
                </p>
                <p className="text-2xl font-semibold text-black">
                  ඔබට පුළුවන්.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div 
                onClick={() => handleSelection('screening')}
                className="absolute cursor-pointer group transition-all duration-300 ease-out"
                style={{ 
                  transform: 'translateY(-131px) translateX(-113px)',
                  width: '220px',
                  minHeight: '260px',
                  zIndex: 10
                }}
              >
                <div 
                  className="p-4 rounded-lg shadow-lg backdrop-blur-sm border-2 border-white
                    transform transition-all duration-300 
                    group-hover:scale-105 group-hover:shadow-2xl group-hover:-translate-y-2
                    active:scale-95 active:shadow-lg"
                  style={{ 
                    background: 'linear-gradient(to right, rgba(189, 120, 276, 0.7), rgba(16, 185, 129, 0.7))',
                  }}
                >
                  <h2 className="text-2xl text-center font-bold text-white mb-4">Screening</h2>
                  <div className="overflow-hidden rounded-xl h-30">
                    <img 
                      src={screeningImage} 
                      alt="Screening" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <img 
                src={tortoise} 
                alt="Right Tortoise" 
                className="w-[250px] h-[140px] relative"
                style={{ 
                  transform: 'translateY(120px) translateX(-130px)',
                  marginRight: '20px'
                }}
              />
            </>
          )}
        </div>
      </div>

      {/* Left Side - Interventions Container */}
      <div className="absolute left-[32px]"> 
        <div className="relative">
          {selectedOption === 'intervention' ? (
            <div 
              className="absolute z-50"
              style={{ 
                transform: 'translateY(60px) translateX(240px)',
                width: '220px',
                minHeight: '260px'
              }}
            >
              <img 
                src={SQ_greeting} 
                alt="Greeting" 
                className="w-[650px] h-[250px] transform translate-x-[-5px] translate-y-[-140px]"
              />
              <div className="absolute top-[45px] left-[97px] transform -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-2xl font-bold text-black mb-[-1px]">
                  සුභ පැතුම්,
                </p>
                <p className="text-2xl font-semibold text-black ">
                  ඔබට පුළුවන්.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div 
                onClick={() => handleSelection('intervention')}
                className="absolute cursor-pointer group transition-all duration-300 ease-out"
                style={{ 
                  transform: 'translateY(-130px) translateX(230px)',
                  width: '220px',
                  minHeight: '260px',
                  zIndex: 10
                }}
              >
                <div 
                  className="p-4 rounded-lg shadow-lg backdrop-blur-sm border-2 border-white
                    transform transition-all duration-300 
                    group-hover:scale-105 group-hover:shadow-2xl group-hover:-translate-y-2
                    active:scale-95 active:shadow-lg"
                  style={{ 
                    background: 'linear-gradient(to right, rgba(59, 100, 246, 0.7), rgba(66, 195, 149, 0.8))',
                  }}
                >
                  <h2 className="text-2xl text-center font-bold text-white mb-4">Interventions</h2>
                  <div className="overflow-hidden rounded-xl h-30">
                    <img 
                      src={interventionImage} 
                      alt="Interventions" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <img 
                src={tortoise2} 
                alt="Left Tortoise" 
                className="w-[250px] h-[140px] relative"
                style={{ 
                  transform: 'translateY(120px) translateX(210px)'
                }} 
              />
            </>
          )}
        </div>
      </div>

      {/* Animated Bunny */}
      <div className="absolute bottom-20 left-[610px] -translate-x-1/2 z-50">
        <img 
          src={RB2} 
          alt="Cheering Bunny" 
          className="w-[500px] h-[300px]"
        />
      </div>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0) translateX(0); }
            70% { transform: translateY(-20px) translateX(20px); }
            100% { transform: translateY(0) translateX(0); }
          }
          .animate-float {
            animation: float 5s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}

export default ScreeningandInterventions;
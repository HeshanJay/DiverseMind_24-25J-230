import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MathActivityEntrencePage.css';
import blueBird from '../../assets/Math/blue_bird_cartoon.gif';

const MathActivityEntrancePage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/MathMenu');
  };

  return (
    <div className="entrance-container">
      <div className="content-wrapper">
        <div className="bird-container">
          <img
            src={blueBird}
            alt="Blue Bird"
            className="blue-bird"
          />
          <div className="thinking-bubble">
            <p className="typing-text">
              යාලුවනේ එන්න අපි ගණිතය ඉගෙන ගනිමින් කැලේ ඇවිදිමු..
            </p>
          </div>
        </div>
        <button className="navigate-button" onClick={handleNavigate}>
          ඉදිරියට යමු
        </button>
      </div>
    </div>
  );
};

export default MathActivityEntrancePage;



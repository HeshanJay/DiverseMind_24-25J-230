import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import './MathMenu.css';
import woodRound from '../../assets/design_images/math_activity/wood-round.png';
import woodRectangle from '../../assets/design_images/math_activity/wood-rectangle.png';
import addSymbol from '../../assets/design_images/math_activity/add_symbol.png';
import subSymbol from '../../assets/design_images/math_activity/sub_symbol.png';
import mulSymbol from '../../assets/design_images/math_activity/mul_symbol.png';
import divSymbol from '../../assets/design_images/math_activity/div_symbol.png';
import fracSymbol from '../../assets/design_images/math_activity/frac_symbol.png';
import menuHoverSound from '../../assets/Audios/design_sounds/menu_hover.mp3';

const MathMenu = () => {
  const titleAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 500,
  });

  const buttonAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    delay: 1000,
  });

  const playHoverSound = () => {
    const audio = new Audio(menuHoverSound);
    audio.play();
  };

  return (
    <div className="forest-theme">
      <animated.h1 style={titleAnimation}>
        නිවැරදිව ගණිතය ඉගෙන ගනිමින්
      </animated.h1>
      <animated.h1 style={titleAnimation}>
        වනාන්තරයේ ඇවිදිමු
      </animated.h1>
      <animated.p style={titleAnimation}>
      ගමන් මග තෝරන්න :
      </animated.p>
      <animated.div className="menu-buttons" style={buttonAnimation}>
        <button 
          onClick={() => window.location.href = '/math-addition-guidance'}
          onMouseEnter={playHoverSound}
        >
          <div className="symbol-container">
            <img src={addSymbol} alt="Addition" className="button-symbol" />
          </div>
          <span className="button-text">එකතු කිරීම හදුනා ගනිමු</span>
        </button>
        <button 
          onClick={() => window.location.href = '/subtraction'}
          onMouseEnter={playHoverSound}
        >
          <div className="symbol-container">
            <img src={subSymbol} alt="Subtraction" className="button-symbol" />
          </div>
          <span className="button-text">අඩු කිරීම හදුනා ගනිමු</span>
        </button>
        <button 
          onClick={() => window.location.href = '/multiplication'}
          onMouseEnter={playHoverSound}
        >
          <div className="symbol-container">
            <img src={mulSymbol} alt="Multiplication" className="button-symbol" />
          </div>
          <span className="button-text">ගුන කිරීම හදුනා ගනිමු</span>
        </button>
        <button 
          onClick={() => window.location.href = '/division'}
          onMouseEnter={playHoverSound}
        >
          <div className="symbol-container">
            <img src={divSymbol} alt="Division" className="button-symbol" />
          </div>
          <span className="button-text">බෙදීම හදුනා ගනිමු</span>
        </button>
        <button 
          onClick={() => window.location.href = '/fractions'}
          onMouseEnter={playHoverSound}
        >
          <div className="symbol-container">
            <img src={fracSymbol} alt="Fractions" className="button-symbol" />
          </div>
          <span className="button-text">භාග හදුනා ගනිමු</span>
        </button>
      </animated.div>
    </div>
  );
};

export default MathMenu;


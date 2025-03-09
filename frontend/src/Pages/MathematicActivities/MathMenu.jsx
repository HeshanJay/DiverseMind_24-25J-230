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
    <div className="math-menu-forest-theme">
      <animated.div className="title-container">
        <animated.h1 style={titleAnimation} className="math-menu-title1">
          නිවැරදිව ගණිතය ඉගෙන ගනිමින්
        </animated.h1>
        <animated.h2 style={titleAnimation} className="math-menu-title2">
          වනාන්තරයේ ඇවිදිමු
        </animated.h2>
      </animated.div>
      <animated.div className="math-menu-buttons" style={buttonAnimation}>
        <div className="math-menu-button-row">
          <button
            onClick={() => window.location.href = '/math-addition-guidance'}
            onMouseEnter={playHoverSound}
            className="math-menu-button"
          >
            <div className="math-menu-symbol-container">
              <img src={addSymbol} alt="Addition" className="math-menu-button-symbol" />
            </div>
            <span className="math-menu-button-text">එකතු කිරීම හදුනා ගනිමු</span>
          </button>
          <button
            onClick={() => window.location.href = '/math-substraction-guidance'}
            onMouseEnter={playHoverSound}
            className="math-menu-button"
          >
            <div className="math-menu-symbol-container">
              <img src={subSymbol} alt="Subtraction" className="math-menu-button-symbol" />
            </div>
            <span className="math-menu-button-text">අඩු කිරීම හදුනා ගනිමු</span>
          </button>
        </div>
        <div className="math-menu-button-row">
          <button
            onClick={() => window.location.href = '/math-multiplication-guidance'}
            onMouseEnter={playHoverSound}
            className="math-menu-button"
          >
            <div className="math-menu-symbol-container">
              <img src={mulSymbol} alt="Multiplication" className="math-menu-button-symbol" />
            </div>
            <span className="math-menu-button-text">ගුන කිරීම හදුනා ගනිමු</span>
          </button>
          <button
            onClick={() => window.location.href = '/math-division-guidance'}
            onMouseEnter={playHoverSound}
            className="math-menu-button"
          >
            <div className="math-menu-symbol-container">
              <img src={divSymbol} alt="Division" className="math-menu-button-symbol" />
            </div>
            <span className="math-menu-button-text">බෙදීම හදුනා ගනිමු</span>
          </button>
        </div>
        <div className="math-menu-button-row math-menu-centered">
          <button
            onClick={() => window.location.href = '/fractions'}
            onMouseEnter={playHoverSound}
            className="math-menu-button"
          >
            <div className="math-menu-symbol-container">
              <img src={fracSymbol} alt="Fractions" className="math-menu-button-symbol" />
            </div>
            <span className="math-menu-button-text">භාග හදුනා ගනිමු</span>
          </button>
        </div>
      </animated.div>
    </div>
  );
};

export default MathMenu;



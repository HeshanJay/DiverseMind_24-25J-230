import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loadingVideo from '../../assets/loading_vid/loading_video.mp4';
import './SplashScreen.css';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home-page');
    }, 6000); 
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <video className="video-bg" autoPlay muted playsInline>
        <source src={loadingVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default SplashScreen;



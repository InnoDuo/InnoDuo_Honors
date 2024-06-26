// src/AlertBanner.jsx
import React, {useContext} from 'react';
import '../../assets/css/alertbanner.css'; // We'll create this file next for styling
import { ThemeContext } from '../../context/theme';

const AlertBanner = ({ message, type, onClose }) => {
  if (!message) return null; // Don't render anything if there's no message
  const { defaultTheme } = useContext(ThemeContext);

  const getAlertClass = () => {
    switch (defaultTheme) {
      case 'light':
        return 'alert-error';
      case 'dark':
        return 'alert-info';
      default:
        return 'alert-info';
    }
  };

  return (
    <div className={`alert-banner ${getAlertClass(type)}`}>
      <span className="alert-message">{message}</span>
      <button className="round-button" onClick={()=>window.location.href='https://www.caldwell.edu/academics/honors-program/'}>
        Want the official site? 
        <br />Click Here 
      </button>
      <button className="alert-close" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default AlertBanner;

// src/AlertBanner.jsx
import React from 'react';
import '../assets/css/alertbanner.css'; // We'll create this file next for styling

const AlertBanner = ({ message, type, onClose }) => {
  if (!message) return null; // Don't render anything if there's no message

  const getAlertClass = (type) => {
    switch (type) {
      case 'success':
        return 'alert-success';
      case 'error':
        return 'alert-error';
      case 'warning':
        return 'alert-warning';
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

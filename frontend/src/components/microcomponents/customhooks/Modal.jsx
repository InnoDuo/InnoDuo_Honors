import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1050, // High z-index to ensure it covers other content
    }}>
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '5px',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
        <button onClick={onClose} style={{ float: 'right', fontSize: '1.25rem' }}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;

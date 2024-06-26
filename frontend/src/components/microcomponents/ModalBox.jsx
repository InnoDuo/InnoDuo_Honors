import React, { useState } from "react";
import Modal from "react-modal";

// learnings: Modal Component, isOpen attribute, overlay response(onRequestClose), remove error in console, styling

Modal.setAppElement("#root");
const ModalBox = ({title, message}) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            background: "grey",
          },
          content: {
            color: "#8D2A2A",
          },
        }}
      >
        <div style={{
            width: '100%',
            // backgroundColor: 'red',
            paddingRight: '5px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
        }}>
          <button onClick={() => setModalIsOpen(false)} style={{fontSize: '2rem', color:'#000000'}}>&times;</button>
        </div>
        <div className="main-content">

        <h3 style={{fontSize: '2rem'}}>{title}</h3>
        <p style={{color: "#000000"}}>
{          message
}        </p>
        </div>
      </Modal>
  );
};

export default ModalBox;
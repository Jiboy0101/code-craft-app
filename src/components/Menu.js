import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faMapLocationDot, faBell, faCircleQuestion, faCircleInfo } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const customModalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Change the background color here
    },
    content: {
      border: '1px solid #ccc',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
  };

function Menu() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="menu">
      <FontAwesomeIcon onClick={openModal} icon={faBars} size="2xl" style={{color: "#ffc800",}} />
      <Modal className='menu-content'
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={customModalStyles} // Apply the custom styles here
      >
        <h2 className='title-menu'>Menu</h2>
        <FontAwesomeIcon className='close' onClick={closeModal} icon={faXmark} size='2xl' />
        <div>
        <FontAwesomeIcon className='map' icon={faMapLocationDot} size="2xl" style={{color: "#ffffff",}} />
        <FontAwesomeIcon className='bell' icon={faBell} size="2xl" style={{color: "#ffffff",}} />      
        <FontAwesomeIcon icon={faCircleQuestion} size="2xl" style={{color: "#ffffff",}} />
        <FontAwesomeIcon className='info-icon' icon={faCircleInfo} size="2xl" style={{color: "#ffffff",}} />
        </div>
      </Modal>
    </div>
  );
}

export default Menu;

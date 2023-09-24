import React from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './MapDisplay.css';
import pupMap from '../pictures/map.jpg';

Modal.setAppElement('#root');

const customMapModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    border: 'none',
    padding: '0',
    width: '470px',
    height: '720px',
    position: 'relative',
  },
};

function MapDisplay({ isOpen, onClose }) {
  const closePopup = () => {
    onClose();
  };
  
  return (
    <Modal
      className="common-frame"
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Map Modal"
      style={customMapModalStyles}
    >
      <div className="popup-title">
      <span>Map</span>
      </div>
      <FontAwesomeIcon className="close" onClick={closePopup} icon={faXmark} size="2x" />
      <div className="map-container">
      <img src={pupMap} alt="PUP Map" className="map-image" />
      </div>
      <div className="text">2023 | ISKA | PUP Lopez Quezon</div>
    </Modal>
  );
}

export default MapDisplay; //48
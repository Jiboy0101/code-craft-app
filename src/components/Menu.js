import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faMapLocationDot, faBell, faCircleQuestion, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import './Menu.css';

Modal.setAppElement('#root');

const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    border: 'none',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
};

function Menu() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

  const openMenu = () => {
    setMenuIsOpen(true);
  };

  const closeMenu = () => {
    setMenuIsOpen(false);
  };

  const openPopup = (content) => {
    setPopupContent(content);
    setPopupIsOpen(true);
    closeMenu();
  };

  const closePopup = () => {
    setPopupIsOpen(false);
    openMenu();
  };

  return (
    <div className="menu">
      <FontAwesomeIcon onClick={openMenu} icon={faBars} size="2x" style={{ color: '#ffc800' }} />
      <Modal
        className="menu-content"
        isOpen={menuIsOpen}
        onRequestClose={closeMenu}
        contentLabel="Menu Modal"
        style={customModalStyles} // Apply the custom styles here
      >
        <h2 className="title-menu">MENU</h2>
        <div className="close-container">
        <FontAwesomeIcon className="close" onClick={closePopup} icon={faXmark} size="2x" />
        </div>
        <div className="grid-buttons">
          <div className="button-container">
            <button onClick={() => openPopup("Map")}>
              <FontAwesomeIcon icon={faMapLocationDot} size="2x" style={{ color: '#f0c908' }} className="icon" />
              <span>MAP</span>
            </button>
          </div>
          <div className="button-container">
            <button onClick={() => openPopup("Reminders")}>
              <FontAwesomeIcon icon={faBell} size="2x" style={{ color: '#f0c908' }} className="icon" />
              <span>REMINDERS</span>
            </button>
          </div>
          <div className="button-container">
            <button onClick={() => openPopup("Help")}>
              <FontAwesomeIcon icon={faCircleQuestion} size="2x" style={{ color: '#f0c908' }} className="icon" />
              <span>HELP</span>
            </button>
          </div>
          <div className="button-container">
            <button onClick={() => openPopup("Information")}>
              <FontAwesomeIcon icon={faCircleInfo} size="2x" style={{ color: '#f0c908' }} className="icon" />
              <span>INFORMATION</span>
            </button>
          </div>
        </div>
        <h3 className="text">2023 | ISKA | PUP Lopez Quezon</h3>
      </Modal>

      {popupContent && (
        <Modal
          className="popup-modal"
          isOpen={popupIsOpen}
          onRequestClose={closePopup}
          contentLabel={`${popupContent} Modal`}
          style={customModalStyles}
        >
          <h2 className="popup-title">{popupContent}</h2>
          <div className="close-container">
          <FontAwesomeIcon className="close" onClick={closePopup} icon={faXmark} size="2x" />
          </div>          {/* Content for each pop-up frame */}
          {popupContent === "Map" && (
            <div>
              <p>This is the Map pop-up frame content.</p>
              {/* Add map-related content or components here */}
            </div>
          )}

          {popupContent === "Reminders" && (
            <div>
              <p>In using the voice command, clear voice is required to ensure that ISKA will respond accurately with the request.</p> 
              <p>The “Hey ISKA” phrase is needed in every command.</p>
              <p>Keywords can be used in the type command for a more efficient usage.</p>
              <p>ISKA’s voice varies from different android devices.</p>
              <p>ISKA will only respond to limited commands, a phrase “Sorry, I currently do not have any information about that” is displayed if questions/ queries asked are not available in the application.</p>
              {/* Add reminders-related content or components here */}
            </div>
          )}

          {popupContent === "Help" && (
            <div>
              <p>This is the Help pop-up frame content.</p>
              {/* Add help-related content or components here */}
            </div>
          )}

          {popupContent === "Information" && (
            <div>
              <p>“ISKA” is an web-based application that aims to serve as PUPLQ virtual assistant that attends to the queries people commonly asked about the institutions.</p>
              <p>There are two (2) ways to give command.</p>
              <p>First by typing a command even just by using a keyword in the provided textbox, click the send button and then ISKA will answer the queries of the user.</p>
              <p>Second, is by tapping the button to enable the microphone and give a voice command by starting with “Hey ISKA!” in every command.</p>
              <p>You can just also click the suggested buttons for easy navigation.</p>
              {/* Add information-related content or components here */}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

export default Menu;